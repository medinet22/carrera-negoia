import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '../../../lib/validation'

/**
 * POST /api/generate-documents
 * 
 * Genera documentos (CVs, cartas, LinkedIn bullets) para el usuario.
 * 
 * IMPORTANTE: Este endpoint NO llama directamente a la API de Anthropic.
 * 
 * Flujo:
 * 1. Si ya existen documentos para el usuario → devolverlos (cache)
 * 2. Si no existen → crear job 'pending' y trigger al webhook VPS
 * 3. El agente D-Business procesa el job con Claude (vía suscripción OpenClaw)
 * 4. Frontend hace polling hasta status='done'
 * 
 * Para testing: usar /api/test-populate que inserta documentos hardcodeados.
 */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// VPS webhook URL
const WEBHOOK_URL = process.env.CARRERA_WEBHOOK_URL || 'http://46.224.55.15:4243/trigger-documents'

export async function POST(request) {
  try {
    const { userId, forceRegenerate = false } = await request.json()

    if (!userId) {
      return Response.json({ error: 'userId requerido' }, { status: 400 })
    }
    
    // Rate limiting: max 3 document generations per user per hour
    const rateLimit = checkRateLimit(`docs:${userId}`, 3, 3600000)
    if (!rateLimit.allowed) {
      return Response.json({ 
        error: 'Has generado documentos recientemente. Intenta más tarde.',
        retryAfter: Math.ceil(rateLimit.resetMs / 1000)
      }, { status: 429 })
    }

    // Check if user has complete plan
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .in('plan', ['complete', 'completo'])
      .limit(1)

    if (!orders || orders.length === 0) {
      return Response.json({ error: 'Plan Completo requerido' }, { status: 403 })
    }

    // Smart caching: check if docs exist AND skills_map hasn't changed
    if (!forceRegenerate) {
      const { data: existingDocs } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (existingDocs && existingDocs.length > 0) {
        // Check if skills_map has been updated since documents were generated
        const { data: skillsMap } = await supabase
          .from('skills_maps')
          .select('updated_at')
          .eq('user_id', userId)
          .single()

        const oldestDoc = existingDocs[existingDocs.length - 1]
        const docCreatedAt = new Date(oldestDoc.created_at).getTime()
        const skillsUpdatedAt = skillsMap?.updated_at 
          ? new Date(skillsMap.updated_at).getTime() 
          : 0

        // If documents are newer than skills_map update, return cached
        if (docCreatedAt > skillsUpdatedAt) {
          const docAge = Date.now() - docCreatedAt
          const MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days (was 24 hours)
          
          if (docAge < MAX_AGE) {
            return Response.json({ 
              status: 'done',
              documents: existingDocs,
              cached: true,
              cacheAge: Math.round(docAge / (1000 * 60 * 60)) + 'h'
            })
          }
        }
        // Skills were updated after docs → need regeneration (fall through)
      }
    }

    // Check for pending job
    const { data: pendingJob } = await supabase
      .from('document_generation_jobs')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .single()

    if (pendingJob) {
      return Response.json({ 
        status: 'processing',
        jobId: pendingJob.id,
        message: 'Ya hay una generación en curso'
      })
    }

    // Create new document generation job
    const { data: job, error: jobError } = await supabase
      .from('document_generation_jobs')
      .insert({
        user_id: userId,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (jobError) {
      // Table might not exist - fallback to inline generation message
      console.error('Job creation error:', jobError)
      return Response.json({ 
        status: 'pending',
        message: 'Generación de documentos solicitada. Intenta de nuevo en unos minutos.',
        fallback: true
      })
    }

    // Trigger webhook for async processing
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          userId,
          type: 'documents'
        })
      })
    } catch (webhookError) {
      console.error('Webhook trigger failed:', webhookError)
      // Update job status to failed
      await supabase
        .from('document_generation_jobs')
        .update({ status: 'failed', error: 'Webhook trigger failed' })
        .eq('id', job.id)
      
      return Response.json({ 
        status: 'error',
        message: 'Error al iniciar generación. Intenta de nuevo.',
        jobId: job.id
      }, { status: 500 })
    }

    return Response.json({ 
      status: 'processing',
      jobId: job.id,
      message: 'Generación de documentos iniciada'
    })

  } catch (err) {
    console.error('Generate documents API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// GET endpoint for polling job status
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const jobId = searchParams.get('jobId')

    if (!userId) {
      return Response.json({ error: 'userId requerido' }, { status: 400 })
    }

    // If jobId provided, check specific job
    if (jobId) {
      const { data: job } = await supabase
        .from('document_generation_jobs')
        .select('*')
        .eq('id', jobId)
        .single()

      if (!job) {
        return Response.json({ error: 'Job no encontrado' }, { status: 404 })
      }

      if (job.status === 'done') {
        // Fetch generated documents
        const { data: documents } = await supabase
          .from('documents')
          .select('*')
          .eq('user_id', userId)
          .gte('created_at', job.created_at)
          .order('created_at', { ascending: false })

        return Response.json({ 
          status: 'done',
          documents: documents || []
        })
      }

      return Response.json({ 
        status: job.status,
        jobId: job.id
      })
    }

    // Otherwise, just get existing documents
    const { data: documents } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return Response.json({ 
      status: documents?.length ? 'done' : 'none',
      documents: documents || []
    })

  } catch (err) {
    console.error('Get documents error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
