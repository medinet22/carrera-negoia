import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Lazy initialization to avoid build errors
let stripe = null
function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return stripe
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    let event
    
    // Verify webhook signature if secret is configured
    const stripeInstance = getStripe()
    if (webhookSecret && signature && stripeInstance) {
      try {
        event = stripeInstance.webhooks.constructEvent(rawBody, signature, webhookSecret)
      } catch (err) {
        console.error('Webhook signature verification failed:', err.message)
        return Response.json({ error: 'Invalid signature' }, { status: 401 })
      }
    } else {
      // Fallback for development (NOT recommended in production)
      console.warn('⚠️ Webhook signature not verified - STRIPE_WEBHOOK_SECRET not set')
      event = JSON.parse(rawBody)
    }
    
    // Only handle checkout.session.completed
    if (event.type !== 'checkout.session.completed') {
      return Response.json({ received: true })
    }
    
    const session = event.data.object
    const email = session.customer_email
    const nombre = session.metadata?.nombre || ''
    const situacion = session.metadata?.situacion_actual || ''
    const linkedinUrl = session.metadata?.linkedin_url || ''
    const cvUrl = session.metadata?.cv_url || ''
    const cvFilename = session.metadata?.cv_filename || ''
    const solicitudId = session.metadata?.solicitud_id

    // 1. Actualizar estado en Supabase
    if (solicitudId) {
      await supabase
        .from('analisis_solicitudes')
        .update({ 
          estado: 'pagado',
          pagado_at: new Date().toISOString()
        })
        .eq('id', solicitudId)
    } else {
      // Buscar por email y actualizar
      await supabase
        .from('analisis_solicitudes')
        .update({ 
          estado: 'pagado',
          pagado_at: new Date().toISOString()
        })
        .eq('email', email)
        .eq('estado', 'pendiente_pago')
    }

    // 2. Enviar notificación a d@negoia.com
    if (process.env.RESEND_API_KEY) {
      // Build CV info section
      const cvSection = cvUrl 
        ? `<p><strong>CV:</strong> <a href="${cvUrl}">📎 ${cvFilename || 'Descargar CV'}</a></p>`
        : `<p><strong>CV:</strong> No proporcionado (pedir por email)</p>`
      
      const linkedinSection = linkedinUrl
        ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>`
        : `<p><strong>LinkedIn:</strong> No proporcionado</p>`

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Carrera IA <d@negoia.com>',
          to: ['d@negoia.com'],
          subject: `🎯 Nuevo análisis vendido — ${nombre || email}`,
          html: `
            <div style="font-family:Inter,system-ui,sans-serif;padding:20px;max-width:600px;">
              <h1 style="color:#059669;margin-bottom:24px;">💰 Nueva venta de Análisis de Carrera</h1>
              
              <div style="background:#f8fafc;padding:20px;border-radius:12px;margin-bottom:20px;">
                <h2 style="margin:0 0 16px 0;font-size:18px;color:#1e293b;">Datos del cliente</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Nombre:</strong> ${nombre || '(no proporcionado)'}</p>
                ${linkedinSection}
                ${cvSection}
              </div>

              <div style="background:#f0fdf4;padding:20px;border-radius:12px;margin-bottom:20px;border:1px solid #bbf7d0;">
                <h2 style="margin:0 0 12px 0;font-size:16px;color:#166534;">📝 Situación actual del cliente:</h2>
                <div style="white-space:pre-wrap;color:#374151;line-height:1.6;">${situacion || '(no proporcionada — pedir más info por email)'}</div>
              </div>

              <div style="background:#fef3c7;padding:16px;border-radius:12px;margin-bottom:20px;border:1px solid #fcd34d;">
                <p style="margin:0;font-size:15px;color:#92400e;">
                  <strong>⏰ ACCIÓN REQUERIDA:</strong><br/>
                  Entregar análisis PDF en 48h al email: <strong>${email}</strong>
                </p>
              </div>

              <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-top:20px;">
                <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">
                  <strong>Stripe Session:</strong> ${session.id}
                </p>
                <p style="margin:0;font-size:13px;color:#64748b;">
                  <strong>Monto:</strong> €${(session.amount_total / 100).toFixed(2)}
                </p>
              </div>
            </div>
          `
        })
      })

      // 3. Enviar confirmación al cliente
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Carrera IA <d@negoia.com>',
          to: [email],
          subject: '✅ Pago recibido — Tu Análisis de Carrera está en proceso',
          html: `
            <div style="font-family:Inter,system-ui,sans-serif;background:#f6f8fb;padding:24px;">
              <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                <div style="background:#059669;padding:20px 24px;">
                  <h1 style="margin:0;font-size:20px;color:#fff;">¡Pago recibido! ✅</h1>
                </div>
                <div style="padding:24px;">
                  <p style="font-size:15px;line-height:1.6;">Hola${nombre ? ` ${nombre}` : ''},</p>
                  <p style="font-size:15px;line-height:1.6;">Tu Análisis de Carrera Personalizado está en proceso. En menos de <strong>48 horas</strong> recibirás tu informe completo.</p>
                  
                  ${!cvUrl ? `
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin:20px 0;">
                    <p style="margin:0 0 8px 0;font-weight:600;color:#166534;">📎 Siguiente paso (opcional pero recomendado):</p>
                    <p style="margin:0;font-size:14px;color:#15803d;">Responde a este email adjuntando tu CV para un análisis más preciso. Si no tienes CV actualizado, no te preocupes — trabajaremos con la información que nos diste.</p>
                  </div>
                  ` : `
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin:20px 0;">
                    <p style="margin:0;font-size:14px;color:#15803d;">✅ Ya recibimos tu CV. Tienes todo listo.</p>
                  </div>
                  `}

                  <p style="font-size:15px;line-height:1.6;"><strong>¿Qué recibirás?</strong></p>
                  <ul style="font-size:14px;line-height:1.8;color:#374151;">
                    <li>Mapa de tus habilidades (técnicas + interpersonales)</li>
                    <li>5 roles que encajan con tu perfil</li>
                    <li>Análisis de gaps y próximos pasos concretos</li>
                    <li>Plan de acción de 30 días</li>
                  </ul>

                  <p style="font-size:14px;color:#6b7280;margin-top:20px;">Si tienes preguntas, responde a este email directamente.</p>
                </div>
              </div>
            </div>
          `
        })
      })
    }

    return Response.json({ received: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}

// Allow Stripe to send webhooks without CORS issues
export async function OPTIONS() {
  return new Response(null, { status: 200 })
}
