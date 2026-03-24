#!/usr/bin/env node
/**
 * Carrera.negoia.com - Job Processor
 * 
 * Este script es ejecutado por el agente D-Business cuando recibe un evento CARRERA_ANALYZE.
 * Lee el perfil de Supabase, construye los prompts, y el agente procesa con Claude.
 * 
 * Uso: node process-carrera-job.js <jobId> <userId>
 * 
 * NOTA: Este script NO llama a la API de Anthropic directamente.
 * Solo prepara los datos y los prompts. El agente D-Business los procesa con Claude.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment
const envPath = resolve(__dirname, '../.env.local');
let envVars = {};
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, ...value] = line.split('=');
      if (key) envVars[key.trim()] = value.join('=').trim();
    }
  });
} catch (e) {
  console.error('Warning: Could not load .env.local');
}

// Initialize Supabase
const supabase = createClient(
  envVars.SUPABASE_URL || process.env.SUPABASE_URL,
  envVars.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY
);

// Load roles catalog
const rolesCatalog = JSON.parse(
  readFileSync(resolve(__dirname, '../data/roles-catalog.json'), 'utf-8')
);

// Get command line arguments
const args = process.argv.slice(2);
const jobId = args[0];
const userId = args[1];

if (!jobId || !userId) {
  console.error('Usage: node process-carrera-job.js <jobId> <userId>');
  process.exit(1);
}

// Log function
function log(msg) {
  console.log(`[carrera-job ${new Date().toISOString()}] ${msg}`);
}

// Update job status in Supabase
async function updateJobStatus(status, step, data = {}) {
  const update = { 
    status, 
    current_step: step,
    ...data
  };
  
  const { error } = await supabase
    .from('assessment_jobs')
    .update(update)
    .eq('id', jobId);
    
  if (error) {
    log(`Error updating job status: ${error.message}`);
  }
}

// Format assessment responses for prompts
function formatAssessmentResponses(answers) {
  if (!answers || typeof answers !== 'object') return 'Sin respuestas adicionales';
  
  const lines = [];
  if (answers.proudest_achievement) lines.push(`Logro más importante: ${answers.proudest_achievement}`);
  if (answers.what_makes_different) lines.push(`Lo que me diferencia: ${answers.what_makes_different}`);
  if (answers.work_preference) lines.push(`Prefiero trabajar con: ${answers.work_preference}`);
  if (answers.productive_environment) lines.push(`Entorno productivo: ${answers.productive_environment}`);
  if (answers.greatest_strength) lines.push(`Mayor fortaleza: ${answers.greatest_strength}`);
  if (answers.next_role_change) lines.push(`Qué quiero diferente: ${answers.next_role_change}`);
  if (answers.job_search_status) lines.push(`Estado de búsqueda: ${answers.job_search_status}`);
  if (answers.role_in_mind) lines.push(`Rol en mente: ${answers.role_in_mind}`);
  if (answers.cv_description) lines.push(`Descripción de trayectoria: ${answers.cv_description}`);
  
  return lines.length > 0 ? lines.join('\n') : 'Sin respuestas adicionales';
}

// Main processing function
async function main() {
  log(`Starting job processing: jobId=${jobId}, userId=${userId}`);
  
  try {
    // 1. Load user and profile from Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (userError || !user) {
      throw new Error(`User not found: ${userError?.message || 'unknown'}`);
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (profileError || !profile) {
      throw new Error(`Profile not found: ${profileError?.message || 'unknown'}`);
    }
    
    log(`Loaded profile for ${user.name || user.email}`);
    
    // 2. Prepare data for prompts
    const cvText = profile.cv_raw_text || 'No se proporcionó CV';
    const intakeAnswers = profile.intake_answers || {};
    const country = user.country || 'ES';
    const userName = user.name || 'Profesional';
    
    const assessmentText = formatAssessmentResponses(intakeAnswers);
    
    // 3. Output the prepared prompts to a JSON file for the agent to process
    const jobData = {
      jobId,
      userId,
      profileId: profile.id,
      user: {
        name: userName,
        email: user.email,
        country
      },
      cvText,
      assessmentText,
      intakeAnswers,
      rolesCatalog: rolesCatalog.map(r => ({
        id: r.id,
        title: r.title,
        title_es: r.title_es,
        category: r.category
      })),
      fullRolesCatalog: rolesCatalog,
      timestamp: new Date().toISOString()
    };
    
    // Write job data to temp file for the agent to read
    const jobDataPath = `/tmp/carrera-job-${jobId}.json`;
    writeFileSync(jobDataPath, JSON.stringify(jobData, null, 2));
    
    log(`Job data written to ${jobDataPath}`);
    
    // Update job status
    await updateJobStatus('processing', 'data_prepared', {
      job_data_path: jobDataPath
    });
    
    // 4. Output the data that the agent will use
    // The agent will read this output and process with Claude
    console.log('\n=== CARRERA JOB DATA FOR AGENT ===');
    console.log(JSON.stringify({
      status: 'ready_for_processing',
      jobDataPath,
      userName,
      email: user.email,
      country,
      cvLength: cvText.length,
      assessmentLength: assessmentText.length,
      rolesCount: rolesCatalog.length
    }, null, 2));
    console.log('=== END JOB DATA ===\n');
    
    log('Job data prepared successfully. Agent should now process with Claude.');
    
  } catch (err) {
    log(`Error: ${err.message}`);
    await updateJobStatus('error', 'preparation_failed', {
      error_message: err.message
    });
    process.exit(1);
  }
}

main();
