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
    subject: `¡Pago confirmado, ${firstName || 'profesional'}! Tu análisis avanzado está listo 🚀`,
    html: `
<div style="font-family:-apple-system,'Inter',system-ui,sans-serif;background:#f5f5f7;padding:32px 16px;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="text-align:center;padding:0 0 20px;">
      <span style="font-size:22px;font-weight:800;color:#4f46e5;">carrera<span style="color:#a5b4fc">.</span>ia</span>
    </div>
    <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
      <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:36px 32px;text-align:center;">
        <div style="width:64px;height:64px;background:rgba(255,255,255,.15);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px;">✅</div>
        <h1 style="margin:0;font-size:24px;color:#fff;font-weight:700;">¡Pago confirmado!</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px;">${planName} · Acceso permanente</p>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;color:#111827;line-height:1.6;margin:0 0 8px;">Hola${firstName ? ` <strong>${firstName}</strong>` : ''},</p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 24px;">Tu acceso ya está activo. Ahora puedes explorar todos tus roles compatibles y construir tu plan de transición profesional.</p>
        
        <!-- Tienes desbloqueado -->
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:0 0 24px;">
          <p style="margin:0 0 12px;font-weight:700;color:#065f46;font-size:14px;">✨ Tienes desbloqueado:</p>
          <ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:2.2;">
            <li>Roles compatibles con % de match real</li>
            <li>Gap analysis con recursos concretos</li>
            <li>Plan de acción semana a semana</li>
            ${isComplete ? `
            <li><strong>CV genérico ATS-ready optimizado</strong></li>
            <li><strong>CV específico + carta de presentación por rol</strong></li>
            <li><strong>LinkedIn bullets listos para copiar</strong></li>
            ` : ''}
          </ul>
        </div>

        <!-- Próximos pasos -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:0 0 28px;">
          <p style="margin:0 0 16px;font-weight:700;color:#1e293b;font-size:15px;">📋 Próximos pasos:</p>
          <div style="display:flex;gap:12px;margin-bottom:12px;">
            <div style="width:28px;height:28px;background:linear-gradient(135deg,#6366f1,#4f46e5);border-radius:50%;color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</div>
            <div style="font-size:14px;color:#374151;"><strong>Explora tus roles compatibles</strong><br><span style="color:#6b7280;">Mira todos los roles que encajan con tu perfil</span></div>
          </div>
          <div style="display:flex;gap:12px;margin-bottom:12px;">
            <div style="width:28px;height:28px;background:linear-gradient(135deg,#6366f1,#4f46e5);border-radius:50%;color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</div>
            <div style="font-size:14px;color:#374151;"><strong>Selecciona los que te interesan</strong><br><span style="color:#6b7280;">Añade a favoritos para comparar</span></div>
          </div>
          ${isComplete ? `
          <div style="display:flex;gap:12px;">
            <div style="width:28px;height:28px;background:linear-gradient(135deg,#6366f1,#4f46e5);border-radius:50%;color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">3</div>
            <div style="font-size:14px;color:#374151;"><strong>Genera tu CV personalizado</strong><br><span style="color:#6b7280;">Crea CVs específicos para cada rol con un clic</span></div>
          </div>
          ` : ''}
        </div>

        <div style="text-align:center;">
          <a href="https://carrera.negoia.com/roles?userId=${userId}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;text-decoration:none;padding:18px 48px;border-radius:12px;font-weight:700;font-size:16px;box-shadow:0 4px 14px rgba(99,102,241,0.3);">Explorar mis roles →</a>
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

// Sale notification email to d@negoia.com
const sendSaleNotification = async (email, name, plan, amount) => {
  const planName = plan === 'complete' ? 'Completo' : 'Básico'
  await sendEmail('d@negoia.com', 
    `🎯 Nueva venta Carrera.IA — ${planName} — €${amount}`,
    `<h2>Nueva venta en carrera.negoia.com</h2>
     <p><strong>Email:</strong> ${email}</p>
     <p><strong>Nombre:</strong> ${name || 'No proporcionado'}</p>
     <p><strong>Plan:</strong> ${planName}</p>
     <p><strong>Importe:</strong> €${amount}</p>`
  )
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

    // Handle both checkout.session.completed (legacy) and payment_intent.succeeded (new)
    if (event.type === 'checkout.session.completed') {
      // Legacy Stripe Checkout flow
      const session = event.data.object
      const userId = session.metadata?.user_id
      const plan = session.metadata?.plan
      const orderId = session.metadata?.order_id
      const mode = session.metadata?.mode || 'live'

      if (!userId || !plan) return Response.json({ error: 'Missing metadata' }, { status: 400 })

      console.log(`[Webhook] Checkout completed - Mode: ${mode}, Plan: ${plan}, User: ${userId}`)

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
        await sendSaleNotification(user.email, user.name, plan, session.amount_total / 100)
      }

      return Response.json({ received: true })
    }

    if (event.type === 'payment_intent.succeeded') {
      // New PaymentElement flow
      const paymentIntent = event.data.object
      const userId = paymentIntent.metadata?.user_id
      const plan = paymentIntent.metadata?.plan
      const orderId = paymentIntent.metadata?.order_id
      const mode = paymentIntent.metadata?.mode || 'live'
      const userName = paymentIntent.metadata?.user_name

      if (!userId || !plan) {
        console.log('[Webhook] payment_intent.succeeded without user metadata, skipping')
        return Response.json({ received: true })
      }

      console.log(`[Webhook] Payment succeeded - Mode: ${mode}, Plan: ${plan}, User: ${userId}`)

      // Update order to paid
      if (orderId) {
        await supabase.from('orders').update({
          status: 'paid',
          stripe_payment_intent: paymentIntent.id,
          paid_at: new Date().toISOString()
        }).eq('id', orderId)
      } else {
        // Create order if not exists
        await supabase.from('orders').insert({
          user_id: userId, 
          plan,
          amount_cents: paymentIntent.amount,
          currency: paymentIntent.currency?.toUpperCase() || 'EUR',
          stripe_payment_intent: paymentIntent.id,
          status: 'paid',
          paid_at: new Date().toISOString()
        })
      }

      // Send confirmation email
      const { data: user } = await supabase.from('users').select('email, name').eq('id', userId).single()
      if (user?.email) {
        const { subject, html } = emailPagoConfirmado(user.name || userName, userId, plan)
        await sendEmail(user.email, subject, html)
        await sendSaleNotification(user.email, user.name || userName, plan, paymentIntent.amount / 100)
      }

      return Response.json({ received: true })
    }

    // Handle payment_intent.payment_failed for logging
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object
      console.log(`[Webhook] Payment failed - User: ${paymentIntent.metadata?.user_id}, Error: ${paymentIntent.last_payment_error?.message}`)
      return Response.json({ received: true })
    }

    return Response.json({ received: true })
  } catch (err) {
    console.error('Platform webhook error:', err)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}

export async function OPTIONS() { return new Response(null, { status: 200 }) }
