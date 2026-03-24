import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { SKILLS_EXTRACTION_PROMPT, SKILLS_MAP_PROMPT, ROLE_MATCHING_PROMPT, fillPrompt } from '../../../lib/ai-prompts'
import rolesCatalog from '../../../data/roles-catalog.json'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

// POST: Iniciar procesamiento del assessment
export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      email, 
      name, 
      country, 
      cv_text, 
      cv_file_url,
      intake_answers,
      utm_source,
      utm_campaign,
      utm_medium
    } = body

    if (!email) {
      return Response.json({ error: 'Email requerido' }, { status: 400 })
    }

    // 1. Create or find user
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          name: name || null,
          country: country || 'ES',
          source: utm_source || 'organic',
          utm_source,
          utm_campaign,
          utm_medium
        })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating user:', createError)
        return Response.json({ error: 'Error creando usuario' }, { status: 500 })
      }
      user = newUser
    }

    // 2. Create profile with intake data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        cv_raw_text: cv_text || null,
        cv_file_url: cv_file_url || null,
        intake_answers: intake_answers || {}
      })
      .select()
      .single()

    if (profileError) {
      console.error('Error creating profile:', profileError)
      return Response.json({ error: 'Error guardando perfil' }, { status: 500 })
    }

    // 3. Create assessment job for polling
    const { data: job, error: jobError } = await supabase
      .from('assessment_jobs')
      .insert({
        user_id: user.id,
        status: 'processing',
        current_step: 'extracting_skills'
      })
      .select()
      .single()

    // 4. Start async processing (don't await - let it run in background)
    processAssessmentAsync(user.id, profile.id, job.id, cv_text, intake_answers, country, name)

    return Response.json({ 
      userId: user.id,
      jobId: job.id,
      status: 'processing'
    })

  } catch (err) {
    console.error('Process assessment error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// GET: Check status of processing
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const jobId = searchParams.get('jobId')

  if (!userId && !jobId) {
    return Response.json({ error: 'userId o jobId requerido' }, { status: 400 })
  }

  try {
    let query = supabase.from('assessment_jobs').select('*')
    
    if (jobId) {
      query = query.eq('id', jobId)
    } else {
      query = query.eq('user_id', userId).order('started_at', { ascending: false }).limit(1)
    }

    const { data: job, error } = await query.single()

    if (error || !job) {
      return Response.json({ status: 'not_found' }, { status: 404 })
    }

    return Response.json({
      status: job.status,
      currentStep: job.current_step,
      skillsCount: job.skills_count || 0,
      rolesMatched: job.roles_matched || 0,
      completedAt: job.completed_at
    })

  } catch (err) {
    console.error('Status check error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// Async processing function (runs in background)
async function processAssessmentAsync(userId, profileId, jobId, cvText, intakeAnswers, country, userName) {
  try {
    // Update status: extracting skills
    await updateJobStatus(jobId, 'processing', 'extracting_skills')

    // Format assessment responses for the prompt
    const assessmentText = formatAssessmentResponses(intakeAnswers)
    
    // Step 1: Extract skills
    const skillsPrompt = fillPrompt(SKILLS_EXTRACTION_PROMPT, {
      cv_text: cvText || 'No se proporcionó CV',
      assessment_responses: assessmentText,
      country: country || 'ES'
    })

    const skillsResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: skillsPrompt }]
    })

    const extractedSkills = parseJsonResponse(skillsResponse.content[0].text)
    const skillsCount = (extractedSkills.hard_skills?.length || 0) + 
                       (extractedSkills.soft_skills?.length || 0) +
                       (extractedSkills.domain_knowledge?.length || 0)

    await updateJobStatus(jobId, 'processing', 'generating_map', skillsCount)

    // Step 2: Generate skills map
    const mapPrompt = fillPrompt(SKILLS_MAP_PROMPT, {
      user_name: userName || 'Profesional',
      extracted_skills: JSON.stringify(extractedSkills, null, 2),
      assessment_responses: assessmentText
    })

    const mapResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: mapPrompt }]
    })

    const skillsMap = parseJsonResponse(mapResponse.content[0].text)

    // Save skills map to database
    const { data: savedMap, error: mapError } = await supabase
      .from('skills_maps')
      .insert({
        user_id: userId,
        profile_id: profileId,
        hard_skills: extractedSkills.hard_skills || [],
        soft_skills: extractedSkills.soft_skills || [],
        domain_knowledge: extractedSkills.domain_knowledge || [],
        narrative_text: skillsMap.narrative_text,
        summary_one_liner: skillsMap.summary_one_liner,
        radar_data: skillsMap.radar_data,
        status: 'done'
      })
      .select()
      .single()

    if (mapError) {
      console.error('Error saving skills map:', mapError)
    }

    await updateJobStatus(jobId, 'processing', 'matching_roles', skillsCount)

    // Step 3: Match with roles (process top 10 roles for speed, full 20 for better matches)
    const allSkills = {
      hard_skills: extractedSkills.hard_skills || [],
      soft_skills: extractedSkills.soft_skills || [],
      domain_knowledge: extractedSkills.domain_knowledge || []
    }

    let rolesMatched = 0
    const matchPromises = rolesCatalog.map(async (role) => {
      const matchPrompt = fillPrompt(ROLE_MATCHING_PROMPT, {
        user_skills: JSON.stringify(allSkills, null, 2),
        user_country: country || 'ES',
        role: JSON.stringify(role, null, 2)
      })

      try {
        const matchResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-5-20250514',
          max_tokens: 2000,
          messages: [{ role: 'user', content: matchPrompt }]
        })

        const match = parseJsonResponse(matchResponse.content[0].text)
        
        // Save role match
        await supabase.from('role_matches').insert({
          user_id: userId,
          skills_map_id: savedMap?.id,
          role_id: role.id,
          match_percentage: match.match_percentage || 0,
          match_type: match.match_type || 'opportunity',
          why_you_fit: match.why_you_fit,
          gaps: match.gaps || [],
          strengths: match.strengths || [],
          user_status: 'pending'
        })

        rolesMatched++
        return match
      } catch (err) {
        console.error(`Error matching role ${role.id}:`, err)
        return null
      }
    })

    // Wait for all matches to complete
    await Promise.all(matchPromises)

    // Update job as completed
    await supabase
      .from('assessment_jobs')
      .update({
        status: 'done',
        current_step: 'completed',
        skills_count: skillsCount,
        roles_matched: rolesMatched,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId)

  } catch (err) {
    console.error('Async processing error:', err)
    await supabase
      .from('assessment_jobs')
      .update({
        status: 'error',
        error_message: err.message
      })
      .eq('id', jobId)
  }
}

async function updateJobStatus(jobId, status, step, skillsCount = null) {
  const update = { status, current_step: step }
  if (skillsCount !== null) update.skills_count = skillsCount
  
  await supabase
    .from('assessment_jobs')
    .update(update)
    .eq('id', jobId)
}

function formatAssessmentResponses(answers) {
  if (!answers || typeof answers !== 'object') return 'Sin respuestas adicionales'
  
  const lines = []
  if (answers.proudest_achievement) {
    lines.push(`Logro más importante: ${answers.proudest_achievement}`)
  }
  if (answers.what_makes_different) {
    lines.push(`Lo que me diferencia: ${answers.what_makes_different}`)
  }
  if (answers.work_preference) {
    lines.push(`Prefiero trabajar con: ${answers.work_preference}`)
  }
  if (answers.productive_environment) {
    lines.push(`Entorno productivo: ${answers.productive_environment}`)
  }
  if (answers.greatest_strength) {
    lines.push(`Mayor fortaleza: ${answers.greatest_strength}`)
  }
  if (answers.next_role_change) {
    lines.push(`Qué quiero diferente: ${answers.next_role_change}`)
  }
  if (answers.job_search_status) {
    lines.push(`Estado de búsqueda: ${answers.job_search_status}`)
  }
  if (answers.role_in_mind) {
    lines.push(`Rol en mente: ${answers.role_in_mind}`)
  }
  if (answers.cv_description) {
    lines.push(`Descripción de trayectoria: ${answers.cv_description}`)
  }
  
  return lines.length > 0 ? lines.join('\n') : 'Sin respuestas adicionales'
}

function parseJsonResponse(text) {
  try {
    // Try to find JSON in the response (handle markdown code blocks)
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                      text.match(/```\s*([\s\S]*?)\s*```/) ||
                      [null, text]
    
    const jsonStr = jsonMatch[1] || text
    return JSON.parse(jsonStr.trim())
  } catch (err) {
    console.error('Error parsing JSON response:', err)
    console.error('Raw text:', text.substring(0, 500))
    return {}
  }
}
