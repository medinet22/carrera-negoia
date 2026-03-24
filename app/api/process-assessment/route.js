import { createClient } from '@supabase/supabase-js'
import { 
  isValidEmail, 
  isValidCountry, 
  validatePayloadSize, 
  checkRateLimit,
  validateIntakeAnswers,
  validateCvText,
  sanitizeForPrompt
} from '../../../lib/validation'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Webhook URL for VPS OpenClaw trigger
// In production, this would be the public IP or domain of the VPS
const WEBHOOK_URL = process.env.CARRERA_WEBHOOK_URL || 'http://46.224.55.15:4243/trigger'
const WEBHOOK_SECRET = process.env.CARRERA_WEBHOOK_SECRET || 'carrera-negoia-2026'

// POST: Iniciar procesamiento del assessment
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate payload size (max 500KB)
    if (!validatePayloadSize(body, 500)) {
      return Response.json({ error: 'Payload demasiado grande' }, { status: 413 })
    }
    
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

    // Validate email
    if (!email || !isValidEmail(email)) {
      return Response.json({ error: 'Email inválido' }, { status: 400 })
    }
    
    // Rate limiting: max 3 assessments per email per hour
    const rateLimit = checkRateLimit(`assessment:${email}`, 3, 3600000)
    if (!rateLimit.allowed) {
      return Response.json({ 
        error: 'Has enviado demasiadas solicitudes. Intenta de nuevo más tarde.',
        retryAfter: Math.ceil(rateLimit.resetMs / 1000)
      }, { status: 429 })
    }
    
    // Validate and sanitize inputs
    const validatedCountry = isValidCountry(country) ? country : 'ES'
    const validatedCvText = validateCvText(cv_text)
    const validatedIntake = validateIntakeAnswers(intake_answers)
    const validatedName = name ? sanitizeForPrompt(name.slice(0, 100)) : null

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
          name: validatedName,
          country: validatedCountry,
          source: utm_source ? sanitizeForPrompt(utm_source.slice(0, 50)) : 'organic',
          utm_source: utm_source ? sanitizeForPrompt(utm_source.slice(0, 50)) : null,
          utm_campaign: utm_campaign ? sanitizeForPrompt(utm_campaign.slice(0, 100)) : null,
          utm_medium: utm_medium ? sanitizeForPrompt(utm_medium.slice(0, 50)) : null
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
        cv_raw_text: validatedCvText || null,
        cv_file_url: cv_file_url || null,
        intake_answers: validatedIntake
      })
      .select()
      .single()

    if (profileError) {
      console.error('Error creating profile:', profileError)
      return Response.json({ error: 'Error guardando perfil' }, { status: 500 })
    }

    // 3. Create assessment job with pending status
    const { data: job, error: jobError } = await supabase
      .from('assessment_jobs')
      .insert({
        user_id: user.id,
        status: 'pending',
        current_step: 'queued'
      })
      .select()
      .single()

    if (jobError) {
      console.error('Error creating job:', jobError)
      return Response.json({ error: 'Error creando job' }, { status: 500 })
    }

    // 4. Trigger OpenClaw processing via webhook
    // This is non-blocking - we don't wait for the webhook response
    triggerOpenClawProcessing(job.id, user.id, profile.id).catch(err => {
      console.error('Error triggering OpenClaw:', err.message)
      // Job remains in 'pending' state - agent can pick it up via polling
    })

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

// Trigger OpenClaw processing via webhook (non-blocking)
async function triggerOpenClawProcessing(jobId, userId, profileId) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': WEBHOOK_SECRET
      },
      body: JSON.stringify({ jobId, userId, profileId })
    })
    
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Webhook returned ${response.status}: ${text}`)
    }
    
    console.log(`OpenClaw processing triggered for job ${jobId}`)
    
  } catch (err) {
    console.error('Webhook trigger failed:', err.message)
    
    // Update job status to indicate webhook failure
    // The job can still be picked up by the agent via polling
    await supabase
      .from('assessment_jobs')
      .update({
        current_step: 'webhook_failed',
        error_message: `Webhook trigger failed: ${err.message}. Job will be processed via polling.`
      })
      .eq('id', jobId)
    
    throw err
  }
}
