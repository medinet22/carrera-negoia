#!/usr/bin/env node
/**
 * Test del pipeline de IA de carrera.negoia.com
 * Simula el proceso completo con datos de María García
 * Ejecutar con: node scripts/test-ai-pipeline.js
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables manually
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    if (key) envVars[key.trim()] = value.join('=').trim();
  }
});

// Import prompts
import { 
  SKILLS_EXTRACTION_PROMPT, 
  SKILLS_MAP_PROMPT, 
  ROLE_MATCHING_PROMPT,
  CV_GENERATION_PROMPT,
  fillPrompt 
} from '../lib/ai-prompts.js';

// Import roles catalog
const rolesCatalog = JSON.parse(readFileSync(resolve(__dirname, '../data/roles-catalog.json'), 'utf-8'));

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: envVars.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY
});

// Test data: María García
const testUser = {
  name: 'María García',
  email: 'test-maria@carrera-test.com',
  country: 'ES',
  cv_text: `María García López
Directora de Cuentas Senior | 12 años de experiencia B2B

EXPERIENCIA:
- Directora de Cuentas | Empresa Tech SaaS | 2019-2026 (7 años)
  • Gestión de cartera de 35 cuentas enterprise (€2M ARR)
  • Lideré equipo de 4 account managers
  • Reduje churn de 18% a 8% en 18 meses
  • Implementé proceso de QBR que mejoró NPS de 42 a 67

- Account Manager Senior | Agencia Digital | 2015-2019 (4 años)
  • Portfolio de 20 clientes (€800K revenue)
  • Upsell promedio del 35% año a año
  • Premio "Mejor AM" 2017 y 2018

- Account Manager Junior | Startup B2B | 2014-2015 (1 año)
  • Onboarding de nuevos clientes
  • Soporte en propuestas comerciales

EDUCACIÓN:
- Grado en ADE | Universidad Complutense Madrid | 2010-2014

HABILIDADES:
- CRM: Salesforce (avanzado), HubSpot (intermedio)
- Análisis: Excel avanzado, básico de SQL
- Idiomas: Español nativo, Inglés C1, Francés B1
- Herramientas: Slack, Notion, Jira, Looker`,
  
  intake_answers: {
    proudest_achievement: "Restructuré el proceso de renovaciones de contratos y pasamos de perder 3-4 cuentas al mes a solo 1. Ahorré €400K en ARR en un año.",
    what_makes_different: "Soy la que mejor entiende el negocio del cliente. No vendo el producto, vendo resultados. Los clientes me llaman a mí directamente cuando tienen un problema.",
    work_preference: "Personas",
    productive_environment: "Reuniones + estrategia + relaciones, no trabajo solo",
    greatest_strength: "Que conecto muy bien con los clientes y que siempre encuentro una solución",
    next_role_change: "Más impacto estratégico. Quiero estar en la mesa donde se toman decisiones, no solo ejecutar.",
    job_search_status: "Explorando opciones",
    role_in_mind: "Algo como Customer Success Director o Head of Accounts, pero también me han hablado de que podría hacer bien Product o Operations. No lo tengo claro."
  }
};

// Format assessment responses for prompts
function formatAssessmentResponses(answers) {
  const lines = [];
  if (answers.proudest_achievement) lines.push(`Logro más importante: ${answers.proudest_achievement}`);
  if (answers.what_makes_different) lines.push(`Lo que me diferencia: ${answers.what_makes_different}`);
  if (answers.work_preference) lines.push(`Prefiero trabajar con: ${answers.work_preference}`);
  if (answers.productive_environment) lines.push(`Entorno productivo: ${answers.productive_environment}`);
  if (answers.greatest_strength) lines.push(`Mayor fortaleza: ${answers.greatest_strength}`);
  if (answers.next_role_change) lines.push(`Qué quiero diferente: ${answers.next_role_change}`);
  if (answers.job_search_status) lines.push(`Estado de búsqueda: ${answers.job_search_status}`);
  if (answers.role_in_mind) lines.push(`Rol en mente: ${answers.role_in_mind}`);
  return lines.join('\n');
}

// Parse JSON response from Claude
function parseJsonResponse(text) {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                      text.match(/```\s*([\s\S]*?)\s*```/) ||
                      [null, text];
    const jsonStr = jsonMatch[1] || text;
    return JSON.parse(jsonStr.trim());
  } catch (err) {
    console.error('❌ Error parsing JSON response:', err.message);
    console.error('Raw text (first 500 chars):', text.substring(0, 500));
    return null;
  }
}

// Main test function
async function runTest() {
  console.log('═'.repeat(60));
  console.log('🧪 TEST PIPELINE IA — carrera.negoia.com');
  console.log('═'.repeat(60));
  console.log(`👤 Usuario: ${testUser.name}`);
  console.log(`📧 Email: ${testUser.email}`);
  console.log(`🌍 País: ${testUser.country}`);
  console.log('═'.repeat(60));
  
  const assessmentText = formatAssessmentResponses(testUser.intake_answers);
  
  // ============================================
  // PASO 1: EXTRACCIÓN DE HABILIDADES
  // ============================================
  console.log('\n📊 PASO 1: EXTRACCIÓN DE HABILIDADES');
  console.log('─'.repeat(60));
  
  const skillsPrompt = fillPrompt(SKILLS_EXTRACTION_PROMPT, {
    cv_text: testUser.cv_text,
    assessment_responses: assessmentText,
    country: testUser.country
  });
  
  console.log('⏳ Llamando a Claude para extraer habilidades...');
  const startSkills = Date.now();
  
  const skillsResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: skillsPrompt }]
  });
  
  const skillsTime = Date.now() - startSkills;
  const extractedSkills = parseJsonResponse(skillsResponse.content[0].text);
  
  if (!extractedSkills) {
    console.error('❌ FALLO en extracción de habilidades');
    return;
  }
  
  console.log(`✅ Extracción completada en ${skillsTime}ms`);
  console.log(`\n🔧 Hard Skills (${extractedSkills.hard_skills?.length || 0}):`);
  extractedSkills.hard_skills?.forEach(s => {
    console.log(`   • ${s.name_es} — Nivel ${s.level}/5 (${s.confidence})`);
    console.log(`     Evidencia: "${s.evidence?.substring(0, 80)}..."`);
  });
  
  console.log(`\n💡 Soft Skills (${extractedSkills.soft_skills?.length || 0}):`);
  extractedSkills.soft_skills?.forEach(s => {
    console.log(`   • ${s.name_es} — Nivel ${s.level}/5 (${s.confidence})`);
    console.log(`     Evidencia: "${s.evidence?.substring(0, 80)}..."`);
  });
  
  console.log(`\n🏢 Conocimiento de Dominio (${extractedSkills.domain_knowledge?.length || 0}):`);
  extractedSkills.domain_knowledge?.forEach(s => {
    console.log(`   • ${s.name_es} — Nivel ${s.level}/5`);
  });
  
  // ============================================
  // PASO 2: GENERACIÓN DEL MAPA DE HABILIDADES
  // ============================================
  console.log('\n\n📝 PASO 2: MAPA DE HABILIDADES');
  console.log('─'.repeat(60));
  
  const mapPrompt = fillPrompt(SKILLS_MAP_PROMPT, {
    user_name: testUser.name,
    extracted_skills: JSON.stringify(extractedSkills, null, 2),
    assessment_responses: assessmentText
  });
  
  console.log('⏳ Llamando a Claude para generar narrativa...');
  const startMap = Date.now();
  
  const mapResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: mapPrompt }]
  });
  
  const mapTime = Date.now() - startMap;
  const skillsMap = parseJsonResponse(mapResponse.content[0].text);
  
  if (!skillsMap) {
    console.error('❌ FALLO en generación de mapa');
    return;
  }
  
  console.log(`✅ Mapa generado en ${mapTime}ms`);
  console.log(`\n📌 One-liner:`);
  console.log(`   "${skillsMap.summary_one_liner}"`);
  
  console.log(`\n📖 NARRATIVA (primeros 3 párrafos):`);
  console.log('─'.repeat(60));
  const paragraphs = skillsMap.narrative_text?.split('\n\n').slice(0, 3).join('\n\n');
  console.log(paragraphs);
  console.log('─'.repeat(60));
  
  console.log(`\n📊 Radar Data:`);
  skillsMap.radar_data?.forEach(d => {
    const bar = '█'.repeat(Math.floor(d.value / 10)) + '░'.repeat(10 - Math.floor(d.value / 10));
    console.log(`   ${d.axis.padEnd(20)} ${bar} ${d.value}`);
  });
  
  // ============================================
  // PASO 3: MATCHING DE ROLES
  // ============================================
  console.log('\n\n🎯 PASO 3: MATCHING DE ROLES');
  console.log('─'.repeat(60));
  
  // Select top 5 most relevant roles for María
  const relevantRoleIds = ['csm-001', 'pm-001', 'ops-001', 'am-001', 'revops-001'];
  const rolesToMatch = rolesCatalog.filter(r => relevantRoleIds.includes(r.id));
  
  const allSkills = {
    hard_skills: extractedSkills.hard_skills || [],
    soft_skills: extractedSkills.soft_skills || [],
    domain_knowledge: extractedSkills.domain_knowledge || []
  };
  
  const matches = [];
  
  for (const role of rolesToMatch) {
    console.log(`\n⏳ Evaluando: ${role.title_es}...`);
    const startMatch = Date.now();
    
    const matchPrompt = fillPrompt(ROLE_MATCHING_PROMPT, {
      user_skills: JSON.stringify(allSkills, null, 2),
      user_country: testUser.country,
      role: JSON.stringify(role, null, 2)
    });
    
    const matchResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 2500,
      messages: [{ role: 'user', content: matchPrompt }]
    });
    
    const matchTime = Date.now() - startMatch;
    const match = parseJsonResponse(matchResponse.content[0].text);
    
    if (match) {
      matches.push({ ...match, role_title: role.title_es, role_id: role.id });
      console.log(`   ✅ ${match.match_percentage}% match (${matchTime}ms)`);
    }
  }
  
  // Sort by match percentage
  matches.sort((a, b) => b.match_percentage - a.match_percentage);
  
  console.log('\n\n🏆 TOP 3 ROLES PARA MARÍA:');
  console.log('═'.repeat(60));
  
  matches.slice(0, 3).forEach((m, i) => {
    const medal = ['🥇', '🥈', '🥉'][i];
    console.log(`\n${medal} #${i + 1}: ${m.role_title}`);
    console.log(`   Match: ${m.match_percentage}% (${m.match_type})`);
    console.log(`\n   📌 Por qué encajas:`);
    console.log(`   ${m.why_you_fit}`);
    
    console.log(`\n   ✅ Fortalezas:`);
    m.strengths?.slice(0, 3).forEach(s => {
      console.log(`      • ${s.skill}: Nivel ${s.user_level}/${s.required_level}`);
    });
    
    console.log(`\n   📚 Gaps a cerrar:`);
    m.gaps?.slice(0, 2).forEach(g => {
      console.log(`      • ${g.skill}: Nivel ${g.current_level}→${g.required_level}`);
      console.log(`        Cómo: ${g.how_to_close}`);
      console.log(`        Tiempo: ~${g.time_weeks} semanas`);
    });
  });
  
  // ============================================
  // PASO 4: GENERACIÓN DE CV
  // ============================================
  console.log('\n\n📄 PASO 4: GENERACIÓN DE CV');
  console.log('─'.repeat(60));
  
  const topRole = rolesCatalog.find(r => r.id === matches[0].role_id);
  
  const cvPrompt = fillPrompt(CV_GENERATION_PROMPT, {
    user_profile: JSON.stringify({
      name: testUser.name,
      email: testUser.email,
      country: testUser.country,
      cv_text: testUser.cv_text,
      intake_answers: testUser.intake_answers,
      skills: skillsMap
    }, null, 2),
    target_role: JSON.stringify(topRole, null, 2),
    skills_map: JSON.stringify(skillsMap, null, 2)
  });
  
  console.log(`⏳ Generando CV para: ${topRole.title_es}...`);
  const startCv = Date.now();
  
  const cvResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: cvPrompt }]
  });
  
  const cvTime = Date.now() - startCv;
  const cvData = parseJsonResponse(cvResponse.content[0].text);
  
  if (!cvData) {
    console.error('❌ FALLO en generación de CV');
    return;
  }
  
  console.log(`✅ CV generado en ${cvTime}ms`);
  
  console.log('\n═'.repeat(60));
  console.log('CV GENERADO PARA MARÍA GARCÍA');
  console.log('═'.repeat(60));
  
  if (cvData.full_text) {
    console.log(cvData.full_text);
  } else {
    console.log(`\n${cvData.header?.name?.toUpperCase()}`);
    console.log(`${cvData.header?.location} | ${cvData.header?.email}`);
    console.log(`\nRESUMEN:`);
    console.log(cvData.summary);
    console.log(`\nHABILIDADES:`);
    console.log(cvData.skills_section?.join(' • '));
    console.log(`\nEXPERIENCIA:`);
    cvData.experience?.forEach(exp => {
      console.log(`\n${exp.title} | ${exp.company} | ${exp.dates}`);
      exp.bullets?.forEach(b => console.log(`  • ${b}`));
    });
  }
  
  // ============================================
  // EVALUACIÓN FINAL
  // ============================================
  console.log('\n\n'.padEnd(61, '═'));
  console.log('📋 EVALUACIÓN DE CALIDAD');
  console.log('═'.repeat(60));
  
  // Criterio 1: Habilidades precisas
  const hasChurnReduction = extractedSkills.hard_skills?.some(s => 
    s.evidence?.toLowerCase().includes('churn') || s.name_es?.toLowerCase().includes('retención')
  ) || extractedSkills.soft_skills?.some(s => 
    s.evidence?.toLowerCase().includes('churn') || s.evidence?.toLowerCase().includes('retención')
  );
  
  const hasTeamLeadership = extractedSkills.soft_skills?.some(s => 
    s.name_es?.toLowerCase().includes('liderazgo') && s.level >= 3
  );
  
  console.log('\n1️⃣ PRECISIÓN DE HABILIDADES:');
  console.log(`   ${hasChurnReduction ? '✅' : '❌'} Captura "reducción de churn" como habilidad`);
  console.log(`   ${hasTeamLeadership ? '✅' : '❌'} Identifica liderazgo de equipos`);
  console.log(`   ${extractedSkills.hard_skills?.some(s => s.name_es?.includes('Salesforce')) ? '✅' : '❌'} Diferencia skills técnicas (Salesforce)`);
  
  // Criterio 2: Narrativa personal
  const narrativeHasSpecifics = skillsMap.narrative_text?.includes('€400K') || 
                                 skillsMap.narrative_text?.includes('NPS') ||
                                 skillsMap.narrative_text?.includes('18%') ||
                                 skillsMap.narrative_text?.includes('35 cuentas');
  
  console.log('\n2️⃣ NARRATIVA PERSONAL:');
  console.log(`   ${narrativeHasSpecifics ? '✅' : '❌'} Menciona logros específicos (€400K, NPS, etc.)`);
  console.log(`   ${skillsMap.narrative_text?.includes('María') ? '✅' : '❌'} Es personalizada (menciona a María)`);
  
  // Criterio 3: Matching inteligente
  const csmMatch = matches.find(m => m.role_id === 'csm-001');
  const pmMatch = matches.find(m => m.role_id === 'pm-001');
  
  console.log('\n3️⃣ MATCHING INTELIGENTE:');
  console.log(`   ${csmMatch && csmMatch.match_percentage >= 80 ? '✅' : '❌'} CSM tiene ≥80% match (actual: ${csmMatch?.match_percentage}%)`);
  console.log(`   ${pmMatch && pmMatch.match_percentage >= 60 && pmMatch.match_percentage <= 80 ? '✅' : '❌'} PM tiene match razonable 60-80% (actual: ${pmMatch?.match_percentage}%)`);
  console.log(`   ${csmMatch?.why_you_fit?.includes('cartera') || csmMatch?.why_you_fit?.includes('relacion') ? '✅' : '❌'} "Por qué encajas" es específico a María`);
  
  // Criterio 4: Gap analysis
  const gapsAreSpecific = csmMatch?.gaps?.some(g => 
    g.how_to_close?.includes('curso') || 
    g.how_to_close?.includes('certificación') ||
    g.how_to_close?.includes('Gainsight') ||
    g.how_to_close?.includes('libro')
  );
  
  console.log('\n4️⃣ GAP ANALYSIS ACCIONABLE:');
  console.log(`   ${gapsAreSpecific ? '✅' : '❌'} Recursos específicos (cursos, certificaciones)`);
  console.log(`   ${csmMatch?.gaps?.every(g => g.time_weeks > 0) ? '✅' : '❌'} Timeline estimado realista`);
  
  // Criterio 5: CV profesional
  const cvHasQuantifiedBullets = cvData.experience?.some(exp => 
    exp.bullets?.some(b => /\d+%|\€\d+|\d+M|\d+ cuentas/.test(b))
  );
  
  console.log('\n5️⃣ CV PROFESIONAL:');
  console.log(`   ${cvData.summary?.includes(topRole.title_es) || cvData.summary?.toLowerCase().includes('customer') ? '✅' : '❌'} Orientado al rol (${topRole.title_es})`);
  console.log(`   ${cvHasQuantifiedBullets ? '✅' : '❌'} Bullets con datos cuantificados (STAR format)`);
  console.log(`   ${!cvData.full_text?.includes('|') || cvData.full_text?.split('|').length < 10 ? '✅' : '❌'} ATS-friendly (sin tablas/columnas complejas)`);
  
  console.log('\n═'.repeat(60));
  console.log('🏁 TEST COMPLETADO');
  console.log('═'.repeat(60));
}

// Run the test
runTest().catch(err => {
  console.error('❌ Error fatal:', err);
  process.exit(1);
});
