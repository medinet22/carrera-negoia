import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Endpoint para recibir respuestas de discovery
export async function POST(request) {
  try {
    const data = await request.json()
    
    const email = data.email || data.contact

    const { error } = await supabase
      .from('carrera_discovery')
      .insert({
        contact_method: data.source || 'web_form',
        contact_info: email,
        pain_points: data.pain_points,
        current_solutions: data.current_solutions,
        willingness_to_pay: data.willingness_to_pay,
        price_mentioned: data.price ? parseInt(data.price) : null,
        would_buy: data.would_buy === 'yes' || data.would_buy === true,
        notes: data.notes || data.extra_comments
      })

    if (error) {
      console.error('Supabase error:', error)
    }

    // Enviar email de valor tras responder encuesta
    if (email && process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Carrera IA <d@negoia.com>',
            to: [email],
            subject: '🎯 Siguiente paso: mini plan de 3 acciones para esta semana',
            html: `
              <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f8fb;padding:24px;color:#111827;">
                <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                  <div style="background:#0f172a;padding:20px 24px;">
                    <h1 style="margin:0;font-size:20px;line-height:1.3;color:#ffffff;">Gracias por completar la encuesta 🎯</h1>
                    <p style="margin:6px 0 0 0;color:#cbd5e1;font-size:14px;">Aquí tienes valor inmediato para avanzar esta semana</p>
                  </div>

                  <div style="padding:24px;">
                    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;">Con base en lo que vimos en perfiles como el tuyo, este mini plan de 3 acciones te dará claridad rápida:</p>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin:0 0 18px 0;">
                      <ol style="margin:0;padding-left:18px;line-height:1.8;color:#1f2937;">
                        <li><strong>Lista 3 habilidades reales</strong> que ya usas cada semana (aunque no estén en tu CV).</li>
                        <li><strong>Elige 2 roles objetivo</strong> y compara requisitos reales en ofertas.</li>
                        <li><strong>Reescribe tu titular profesional</strong> en una frase: “Ayudo a X a lograr Y con Z”.</li>
                      </ol>
                    </div>

                    <p style="margin:0 0 10px 0;font-size:14px;color:#374151;line-height:1.6;">Nuestro siguiente correo te llegará con acceso beta priorizado y próximos pasos personalizados según tus respuestas.</p>
                    <p style="margin:0;font-size:13px;color:#6b7280;">Gracias por ayudarnos a construir algo útil de verdad.</p>
                  </div>
                </div>
              </div>
            `
          })
        })
      } catch (mailErr) {
        console.error('Resend post-discovery error:', mailErr)
      }
    }

    return Response.json({ success: true, message: 'Gracias por tu tiempo. Te contactaremos pronto.' })
  } catch (err) {
    console.error('API error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET para ver respuestas (protegido por token simple)
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  // Token simple para acceso
  if (token !== 'carrera-discovery-2026') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('carrera_discovery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ discoveries: data })
}
