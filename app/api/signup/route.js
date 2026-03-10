import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 })
    }

    // Insert into waitlist table
    const { error } = await supabase
      .from('carrera_waitlist')
      .upsert({
        email,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      })

    if (error) {
      console.error('Supabase error:', error)
    }

    // Optional welcome email via Resend (if key is configured)
    if (process.env.RESEND_API_KEY) {
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
            subject: '✅ Estás dentro — beta de Carrera IA',
            html: `
              <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f8fb;padding:24px;color:#111827;">
                <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                  <div style="background:#0f172a;padding:20px 24px;">
                    <h1 style="margin:0;font-size:20px;line-height:1.3;color:#ffffff;">Bienvenido a Carrera IA ✅</h1>
                    <p style="margin:6px 0 0 0;color:#cbd5e1;font-size:14px;">Ya estás en la lista beta</p>
                  </div>

                  <div style="padding:24px;">
                    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;">¡Gracias por apuntarte! Para priorizar tu perfil y darte una experiencia útil desde el primer día, necesitamos una encuesta rápida.</p>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin:0 0 18px 0;">
                      <p style="margin:0 0 8px 0;font-size:14px;"><strong>Siguiente paso (2 minutos):</strong> completa la encuesta de diagnóstico.</p>
                      <a href="https://carrera.negoia.com/encuesta?email=${encodeURIComponent(email)}&utm_source=welcome_email&utm_medium=email&utm_campaign=beta_onboarding" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;font-size:14px;">Completar encuesta</a>
                    </div>

                    <p style="margin:0 0 10px 0;font-size:14px;color:#374151;line-height:1.6;">Cuando termines, te enviaremos próximos pasos y acceso beta según tu perfil.</p>
                    <p style="margin:0;font-size:13px;color:#6b7280;">Si el botón no funciona, copia y pega este enlace:<br/>
                      <span style="word-break:break-all;">https://carrera.negoia.com/encuesta?email=${encodeURIComponent(email)}&utm_source=welcome_email&utm_medium=email&utm_campaign=beta_onboarding</span>
                    </p>
                  </div>
                </div>
              </div>
            `
          })
        })
      } catch (mailErr) {
        console.error('Resend error:', mailErr)
      }
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
