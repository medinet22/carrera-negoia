import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ========== STRIPE TEST/LIVE SWITCH ==========
const isTestMode = process.env.STRIPE_MODE === 'test' || process.env.NODE_ENV === 'development'

const STRIPE_CONFIG = {
  secretKey: isTestMode 
    ? process.env.STRIPE_SECRET_KEY_TEST 
    : process.env.STRIPE_SECRET_KEY,
  publishableKey: isTestMode
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
}

const PLAN_PRICES = {
  basic: { amount: 2900, name: 'Plan Básico', currency: 'eur' },
  complete: { amount: 3900, name: 'Plan Completo', currency: 'eur' }
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

    // Create PaymentIntent
    const intentParams = new URLSearchParams({
      'amount': PLAN_PRICES[plan].amount.toString(),
      'currency': PLAN_PRICES[plan].currency,
      'receipt_email': user.email,
      'metadata[user_id]': userId,
      'metadata[plan]': plan,
      'metadata[order_id]': order?.id || '',
      'metadata[mode]': isTestMode ? 'test' : 'live',
      'metadata[user_name]': user.name || '',
      'automatic_payment_methods[enabled]': 'true'
    })

    const intentResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_CONFIG.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: intentParams
    })

    const paymentIntent = await intentResponse.json()

    if (paymentIntent.error) {
      console.error('Stripe error:', paymentIntent.error)
      return Response.json({ error: 'Error creando payment intent' }, { status: 500 })
    }

    // Update order with payment intent ID
    if (order?.id) {
      await supabase
        .from('orders')
        .update({ stripe_payment_intent: paymentIntent.id })
        .eq('id', order.id)
    }

    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PaymentIntent] Mode: ${isTestMode ? 'TEST' : 'LIVE'}, Plan: ${plan}, User: ${userId}`)
    }

    return Response.json({ 
      clientSecret: paymentIntent.client_secret,
      publishableKey: STRIPE_CONFIG.publishableKey
    })

  } catch (err) {
    console.error('Create payment intent error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
