import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ========== STRIPE TEST/LIVE SWITCH (PATRÓN BRIEFINTEL) ==========
const isTestMode = process.env.STRIPE_MODE === 'test' || process.env.NODE_ENV === 'development'

const STRIPE_CONFIG = {
  secretKey: isTestMode 
    ? process.env.STRIPE_SECRET_KEY_TEST 
    : process.env.STRIPE_SECRET_KEY,
  publishableKey: isTestMode
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  prices: {
    basic: isTestMode 
      ? process.env.STRIPE_PRICE_BASICO_TEST 
      : process.env.STRIPE_PRICE_BASICO,
    complete: isTestMode 
      ? process.env.STRIPE_PRICE_COMPLETO_TEST 
      : process.env.STRIPE_PRICE_COMPLETO
  }
}

const PLAN_PRICES = {
  basic: { amount: 2900, name: 'Plan Básico' },
  complete: { amount: 3900, name: 'Plan Completo' }
}

export async function POST(request) {
  try {
    const { userId, plan } = await request.json()

    if (!userId) {
      return Response.json({ error: 'userId requerido' }, { status: 400 })
    }

    if (!plan || !['basic', 'complete'].includes(plan)) {
      return Response.json({ error: 'Plan inválido' }, { status: 400 })
    }

    // Verificar que tenemos la key de Stripe
    if (!STRIPE_CONFIG.secretKey) {
      console.error('Stripe secret key not configured')
      return Response.json({ error: 'Error de configuración de pago' }, { status: 500 })
    }

    // Get user email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return Response.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Create order in pending state
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        plan,
        amount_cents: PLAN_PRICES[plan].amount,
        currency: 'EUR',
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
    }

    // Determine success/cancel URLs based on environment
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://carrera.negoia.com'

    // Create Stripe Checkout Session using the configured price
    const priceId = STRIPE_CONFIG.prices[plan]
    
    const checkoutParams = new URLSearchParams({
      'mode': 'payment',
      'success_url': `${baseUrl}/roles?userId=${userId}&session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${baseUrl}/upgrade?userId=${userId}`,
      'customer_email': user.email,
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'metadata[user_id]': userId,
      'metadata[plan]': plan,
      'metadata[order_id]': order?.id || '',
      'metadata[mode]': isTestMode ? 'test' : 'live'
    })

    const checkoutResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_CONFIG.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: checkoutParams
    })

    const session = await checkoutResponse.json()

    if (session.error) {
      console.error('Stripe error:', session.error)
      return Response.json({ error: 'Error creando checkout' }, { status: 500 })
    }

    // Update order with session ID
    if (order?.id) {
      await supabase
        .from('orders')
        .update({ stripe_session_id: session.id })
        .eq('id', order.id)
    }

    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Checkout] Mode: ${isTestMode ? 'TEST' : 'LIVE'}, Plan: ${plan}, User: ${userId}`)
    }

    return Response.json({ url: session.url })

  } catch (err) {
    console.error('Checkout platform API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
