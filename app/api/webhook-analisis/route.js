import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Simplified webhook - no signature verification for Wizard of Oz
// In production, verify with STRIPE_WEBHOOK_SECRET
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Only handle checkout.session.completed
    if (body.type !== 'checkout.session.completed') {
      return Response.json({ received: true })
    }

    const session = body.data.object
    const email = session.customer_email
    const nombre = session.metadata?.nombre || ''
    const situacion = session.metadata?.situacion_actual || ''
    const solicitudId = session.metadata?.solicitud_id

    // 1. Actualizar estado en Supabase
    if (solicitudId) {
      await supabase
        .from('analisis_solicitudes')
        .update({ estado: 'pagado' })
        .eq('id', solicitudId)
    } else {
      // Buscar por email y actualizar
      await supabase
        .from('analisis_solicitudes')
        .update({ estado: 'pagado' })
        .eq('email', email)
        .eq('estado', 'pendiente_pago')
    }

    // 2. Enviar notificación a d@negoia.com
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Carrera IA <d@negoia.com>',
          to: ['d@negoia.com'],
          subject: `🎉 VENTA Análisis Carrera — ${email}`,
          html: `
            <div style="font-family:Inter,sans-serif;padding:20px;">
              <h1 style="color:#059669;">Nueva venta de Análisis de Carrera</h1>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Nombre:</strong> ${nombre || '(no proporcionado)'}</p>
              <p><strong>Situación actual:</strong></p>
              <div style="background:#f3f4f6;padding:15px;border-radius:8px;white-space:pre-wrap;">${situacion || '(no proporcionada)'}</div>
              <p style="margin-top:20px;"><strong>Stripe Session:</strong> ${session.id}</p>
              <p><strong>Monto:</strong> €${(session.amount_total / 100).toFixed(2)}</p>
              <hr style="margin:20px 0;border:1px solid #e5e7eb;"/>
              <p><strong>Próximos pasos:</strong></p>
              <ol>
                <li>El cliente debe enviar su CV respondiendo al email de confirmación</li>
                <li>Procesar con Claude usando el template Mini-Mapa</li>
                <li>Entregar PDF en menos de 48h</li>
              </ol>
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
            <div style="font-family:Inter,sans-serif;background:#f6f8fb;padding:24px;">
              <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                <div style="background:#059669;padding:20px 24px;">
                  <h1 style="margin:0;font-size:20px;color:#fff;">¡Pago recibido! ✅</h1>
                </div>
                <div style="padding:24px;">
                  <p style="font-size:15px;line-height:1.6;">Hola${nombre ? ` ${nombre}` : ''},</p>
                  <p style="font-size:15px;line-height:1.6;">Tu Análisis de Carrera Personalizado está en proceso. En menos de <strong>48 horas</strong> recibirás tu informe completo.</p>
                  
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin:20px 0;">
                    <p style="margin:0 0 8px 0;font-weight:600;color:#166534;">📎 Siguiente paso (opcional pero recomendado):</p>
                    <p style="margin:0;font-size:14px;color:#15803d;">Responde a este email adjuntando tu CV para un análisis más preciso. Si no tienes CV actualizado, no te preocupes — trabajaremos con la información que nos diste.</p>
                  </div>

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
