import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Price IDs for the platform plans (replace with actual Stripe price IDs)
const PRICE_IDS = {
  basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_platform',
  complete: process.env.STRIPE_PRICE_COMPLETE || 'price_complete_platform'
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

    // Create Stripe Checkout Session
    const checkoutParams = new URLSearchParams({
      'mode': 'payment',
      'success_url': `https://carrera.negoia.com/roles?userId=${userId}&session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `https://carrera.negoia.com/upgrade?userId=${userId}`,
      'customer_email': user.email,
      'line_items[0][price_data][currency]': 'eur',
      'line_items[0][price_data][unit_amount]': PLAN_PRICES[plan].amount.toString(),
      'line_items[0][price_data][product_data][name]': `Carrera IA - ${PLAN_PRICES[plan].name}`,
      'line_items[0][price_data][product_data][description]': plan === 'complete' 
        ? 'Acceso completo a roles + documentos personalizados' 
        : 'Acceso completo a todos los roles compatibles',
      'line_items[0][quantity]': '1',
      'metadata[user_id]': userId,
      'metadata[plan]': plan,
      'metadata[order_id]': order?.id || ''
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

    // Update order with session ID
    if (order?.id) {
      await supabase
        .from('orders')
        .update({ stripe_session_id: session.id })
        .eq('id', order.id)
    }

    return Response.json({ url: session.url })

  } catch (err) {
    console.error('Checkout platform API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
