import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

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
  webhookSecret: isTestMode
    ? process.env.STRIPE_WEBHOOK_SECRET_TEST
    : process.env.STRIPE_WEBHOOK_SECRET
}

let stripe = null
function getStripe() {
  if (!stripe && STRIPE_CONFIG.secretKey) {
    stripe = new Stripe(STRIPE_CONFIG.secretKey)
  }
  return stripe
}

const sendEmail = async (to, subject, html) => {
  if (!process.env.RESEND_API_KEY) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Carrera IA <d@negoia.com>', to: [to], subject, html })
  })
}

const emailPagoConfirmado = (name, userId, plan) => {
  const firstName = name ? name.split(' ')[0] : ''
  const planName = plan === 'complete' ? 'Plan Completo' : 'Plan Básico'
  const isComplete = plan === 'complete'
  return {
    subject: `¡Acceso activado! Tu análisis avanzado está listo 🚀`,
    html: `
<div style="font-family:-apple-system,'Inter',system-ui,sans-serif;background:#f5f5f7;padding:32px 16px;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="text-align:center;padding:0 0 20px;">
      <span style="font-size:22px;font-weight:800;color:#4f46e5;">carrera<span style="color:#a5b4fc">.</span>ia</span>
    </div>
    <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
      <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:36px 32px;text-align:center;">
        <div style="width:64px;height:64px;background:rgba(255,255,255,.15);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px;">✅</div>
        <h1 style="margin:0;font-size:22px;color:#fff;font-weight:700;">Pago confirmado</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px;">${planName}</p>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;color:#111827;line-height:1.6;margin:0 0 8px;">Hola${firstName ? ` <strong>${firstName}</strong>` : ''},</p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 24px;">Tu acceso ya está activo. Ahora puedes explorar todos tus roles compatibles y construir tu plan de transición.</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:0 0 28px;">
          <p style="margin:0 0 12px;font-weight:700;color:#065f46;font-size:14px;">Tienes desbloqueado:</p>
          <ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:2.2;">
            <li>✅ Roles compatibles con % de match real</li>
            <li>✅ Gap analysis con recursos concretos</li>
            <li>✅ Plan de acción semana a semana</li>
            ${isComplete ? '<li>✅ CV genérico ATS-ready optimizado</li><li>✅ CV específico + carta de presentación por rol</li><li>✅ LinkedIn bullets listos para copiar</li>' : ''}
          </ul>
        </div>
        <div style="text-align:center;">
          <a href="https://carrera.negoia.com/roles?userId=${userId}" style="display:inline-block;background:linear-gradient(135deg,#059669,#0d9488);color:#fff;text-decoration:none;padding:16px 40px;border-radius:12px;font-weight:700;font-size:15px;">Explorar mis roles →</a>
        </div>
        <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;text-align:center;">Acceso permanente. Sin fecha de expiración.</p>
      </div>
    </div>
    <div style="text-align:center;padding:20px 0 0;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">carrera.negoia.com · Responde este email si tienes preguntas</p>
    </div>
  </div>
</div>`
  }
}

export async function POST(request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')
    const webhookSecret = STRIPE_CONFIG.webhookSecret

    let event
    const stripeInstance = getStripe()
    
    if (webhookSecret && signature && stripeInstance) {
      try {
        event = stripeInstance.webhooks.constructEvent(rawBody, signature, webhookSecret)
      } catch (err) {
        console.error('Webhook signature failed:', err.message)
        return Response.json({ error: 'Invalid signature' }, { status: 401 })
      }
    } else {
      event = JSON.parse(rawBody)
    }

    if (event.type !== 'checkout.session.completed') return Response.json({ received: true })

    const session = event.data.object
    const userId = session.metadata?.user_id
    const plan = session.metadata?.plan
    const orderId = session.metadata?.order_id
    const mode = session.metadata?.mode || 'live' // Track test vs live payments

    if (!userId || !plan) return Response.json({ error: 'Missing metadata' }, { status: 400 })

    // Log para debugging
    console.log(`[Webhook] Payment received - Mode: ${mode}, Plan: ${plan}, User: ${userId}`)

    if (orderId) {
      await supabase.from('orders').update({
        status: 'paid',
        stripe_payment_intent: session.payment_intent,
        paid_at: new Date().toISOString()
      }).eq('id', orderId)
    } else {
      await supabase.from('orders').insert({
        user_id: userId, plan,
        amount_cents: session.amount_total,
        currency: session.currency?.toUpperCase() || 'EUR',
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        status: 'paid',
        paid_at: new Date().toISOString()
      })
    }

    const { data: user } = await supabase.from('users').select('email, name').eq('id', userId).single()
    if (user?.email) {
      const { subject, html } = emailPagoConfirmado(user.name, userId, plan)
      await sendEmail(user.email, subject, html)
    }

    return Response.json({ received: true })
  } catch (err) {
    console.error('Platform webhook error:', err)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}

export async function OPTIONS() { return new Response(null, { status: 200 }) }
