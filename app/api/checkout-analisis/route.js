import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const PRICE_ID = 'price_1TEImJKHITR2cWbKWAN3XNQh'

export async function POST(request) {
  try {
    const { email, nombre, situacion_actual } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email requerido' }, { status: 400 })
    }

    // 1. Guardar en Supabase con estado pendiente_pago
    const { data: solicitud, error: dbError } = await supabase
      .from('analisis_solicitudes')
      .insert({
        email,
        nombre: nombre || null,
        situacion_actual: situacion_actual || null,
        estado: 'pendiente_pago',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Continue anyway - Stripe is the source of truth
    }

    // 2. Crear Stripe Checkout Session
    const checkoutResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'success_url': `https://carrera.negoia.com/analisis-carrera/gracias?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': 'https://carrera.negoia.com/analisis-carrera',
        'customer_email': email,
        'line_items[0][price]': PRICE_ID,
        'line_items[0][quantity]': '1',
        'metadata[nombre]': nombre || '',
        'metadata[situacion_actual]': (situacion_actual || '').substring(0, 500),
        'metadata[solicitud_id]': solicitud?.id || ''
      })
    })

    const session = await checkoutResponse.json()

    if (session.error) {
      console.error('Stripe error:', session.error)
      return Response.json({ error: 'Error creando checkout' }, { status: 500 })
    }

    // 3. Actualizar Supabase con session_id
    if (solicitud?.id) {
      await supabase
        .from('analisis_solicitudes')
        .update({ stripe_session_id: session.id })
        .eq('id', solicitud.id)
    }

    return Response.json({ url: session.url })

  } catch (err) {
    console.error('Checkout API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
