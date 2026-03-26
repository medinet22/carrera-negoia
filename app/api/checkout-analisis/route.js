import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Price IDs from environment variables
const PRICE_IDS = {
  basico: process.env.STRIPE_PRICE_BASICO,
  completo: process.env.STRIPE_PRICE_COMPLETO
}

export async function POST(request) {
  try {
    const { email, nombre, situacion_actual, linkedin_url, cv_url, cv_filename, pack } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email requerido' }, { status: 400 })
    }

    // Determine price ID based on selected plan (default to basico)
    const selectedPlan = pack === 'completo' ? 'completo' : 'basico'
    const priceId = PRICE_IDS[selectedPlan]

    if (!priceId) {
      console.error('Missing STRIPE_PRICE_* env variable for plan:', selectedPlan)
      return Response.json({ error: 'Configuración de precios no válida' }, { status: 500 })
    }

    // 1. Guardar en Supabase con estado pendiente_pago
    const { data: solicitud, error: dbError } = await supabase
      .from('analisis_solicitudes')
      .insert({
        email,
        nombre: nombre || null,
        situacion_actual: situacion_actual || null,
        linkedin_url: linkedin_url || null,
        cv_url: cv_url || null,
        plan: selectedPlan,
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
    // Build metadata (Stripe has 500 char limit per value)
    const metadata = {
      nombre: (nombre || '').substring(0, 100),
      situacion_actual: (situacion_actual || '').substring(0, 450),
      linkedin_url: (linkedin_url || '').substring(0, 200),
      cv_url: (cv_url || '').substring(0, 450),
      cv_filename: (cv_filename || '').substring(0, 100),
      solicitud_id: solicitud?.id || '',
      plan: selectedPlan
    }

    const checkoutParams = new URLSearchParams({
      'mode': 'payment',
      'success_url': `https://carrera.negoia.com/analisis-carrera/gracias?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `https://carrera.negoia.com/analisis-carrera?plan=${selectedPlan}`,
      'customer_email': email,
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1'
    })

    // Add metadata
    Object.entries(metadata).forEach(([key, value]) => {
      if (value) {
        checkoutParams.append(`metadata[${key}]`, value)
      }
    })

    const checkoutResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: checkoutParams
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
