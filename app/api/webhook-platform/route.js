import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Lazy initialization to avoid build errors
let stripe = null
function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return stripe
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_PLATFORM

export async function POST(request) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    let event
    
    // Verify webhook signature
    const stripeInstance = getStripe()
    if (webhookSecret && signature && stripeInstance) {
      try {
        event = stripeInstance.webhooks.constructEvent(rawBody, signature, webhookSecret)
      } catch (err) {
        console.error('Webhook signature verification failed:', err.message)
        return Response.json({ error: 'Invalid signature' }, { status: 401 })
      }
    } else {
      // Fallback for development (NOT recommended in production)
      console.warn('⚠️ Webhook signature not verified - STRIPE_WEBHOOK_SECRET_PLATFORM not set')
      event = JSON.parse(rawBody)
    }
    
    // Only handle checkout.session.completed
    if (event.type !== 'checkout.session.completed') {
      return Response.json({ received: true })
    }

    const session = event.data.object
    const userId = session.metadata?.user_id
    const plan = session.metadata?.plan
    const orderId = session.metadata?.order_id

    if (!userId || !plan) {
      console.error('Missing userId or plan in webhook metadata')
      return Response.json({ error: 'Missing metadata' }, { status: 400 })
    }

    // Update order to paid
    if (orderId) {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          stripe_payment_intent: session.payment_intent,
          paid_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (updateError) {
        console.error('Error updating order:', updateError)
      }
    } else {
      // Create new order if not exists
      const { error: insertError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          plan,
          amount_cents: session.amount_total,
          currency: session.currency?.toUpperCase() || 'EUR',
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent,
          status: 'paid',
          paid_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('Error creating order:', insertError)
      }
    }

    // Send confirmation email
    if (process.env.RESEND_API_KEY) {
      const { data: user } = await supabase
        .from('users')
        .select('email, name')
        .eq('id', userId)
        .single()

      if (user?.email) {
        const planName = plan === 'complete' ? 'Plan Completo' : 'Plan Básico'
        
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Carrera IA <d@negoia.com>',
            to: [user.email],
            subject: `✅ Pago confirmado — ${planName} de Carrera IA`,
            html: `
              <div style="font-family:Inter,system-ui,sans-serif;background:#f6f8fb;padding:24px;">
                <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                  <div style="background:#6366f1;padding:20px 24px;">
                    <h1 style="margin:0;font-size:20px;color:#fff;">¡Pago confirmado! ✅</h1>
                  </div>
                  <div style="padding:24px;">
                    <p style="font-size:15px;line-height:1.6;">Hola${user.name ? ` ${user.name}` : ''},</p>
                    <p style="font-size:15px;line-height:1.6;">Tu ${planName} ya está activo. Ya puedes explorar todos tus roles compatibles.</p>
                    
                    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:16px;margin:20px 0;">
                      <p style="margin:0;font-weight:600;color:#0369a1;">Próximos pasos:</p>
                      <ol style="margin:12px 0 0 0;padding-left:20px;font-size:14px;line-height:1.8;color:#374151;">
                        <li>Explora tus roles compatibles</li>
                        <li>Marca tus favoritos para crear tu plan de transición</li>
                        ${plan === 'complete' ? '<li>Genera tu CV y carta personalizados para cada rol</li>' : ''}
                      </ol>
                    </div>

                    <a href="https://carrera.negoia.com/roles?userId=${userId}" 
                       style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:600;margin-top:16px;">
                      Ver mis roles →
                    </a>

                    <p style="font-size:14px;color:#6b7280;margin-top:24px;">Si tienes preguntas, responde a este email.</p>
                  </div>
                </div>
              </div>
            `
          })
        })
      }
    }

    return Response.json({ received: true })

  } catch (err) {
    console.error('Platform webhook error:', err)
    return Response.json({ error: 'Webhook error' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200 })
}
