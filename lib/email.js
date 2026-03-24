/**
 * @fileoverview Centralized email sending via Resend API
 * @module lib/email
 */

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'Carrera IA <d@negoia.com>'

/**
 * Send an email using the Resend API
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email body in HTML format
 * @param {Object} [options] - Optional parameters
 * @param {string} [options.from] - Sender address (defaults to Carrera IA)
 * @param {string} [options.replyTo] - Reply-to address
 * @param {string[]} [options.cc] - CC recipients
 * @param {string[]} [options.bcc] - BCC recipients
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export async function sendEmail(to, subject, html, options = {}) {
  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Email] Would send:', { to, subject })
    }
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const body = {
      from: options.from || DEFAULT_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(options.replyTo && { reply_to: options.replyTo }),
      ...(options.cc && { cc: options.cc }),
      ...(options.bcc && { bcc: options.bcc }),
    }

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { 
        success: false, 
        error: errorData.message || `HTTP ${response.status}` 
      }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Email] Send error:', err)
    }
    return { success: false, error: err.message }
  }
}

/**
 * Send a transactional email for payment confirmation
 * @param {string} email - User email
 * @param {string} userName - User name
 * @param {string} plan - Plan purchased
 * @returns {Promise<{success: boolean}>}
 */
export async function sendPaymentConfirmation(email, userName, plan) {
  const subject = '✅ Pago confirmado — Tu análisis de carrera está listo'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">¡Gracias por tu compra, ${userName || 'profesional'}!</h1>
      <p>Tu pago ha sido procesado correctamente.</p>
      <p><strong>Plan:</strong> ${plan === 'complete' ? 'Completo' : 'Básico'}</p>
      <p>Ya puedes acceder a todos los roles compatibles con tu perfil.</p>
      <p style="margin-top: 24px;">
        <a href="https://carrera.negoia.com/profile" 
           style="background: linear-gradient(135deg, #6366f1, #4f46e5); 
                  color: white; padding: 12px 24px; 
                  border-radius: 8px; text-decoration: none;">
          Ver mi perfil →
        </a>
      </p>
      <p style="color: #666; margin-top: 32px;">
        ¿Dudas? Responde a este email.
      </p>
    </div>
  `
  return sendEmail(email, subject, html)
}

/**
 * Send internal notification for new sale
 * @param {Object} saleData - Sale information
 * @returns {Promise<{success: boolean}>}
 */
export async function sendSaleNotification(saleData) {
  const subject = `🎯 Nueva venta Carrera.IA — ${saleData.plan} — €${saleData.amount}`
  const html = `
    <h2>Nueva venta en carrera.negoia.com</h2>
    <p><strong>Email:</strong> ${saleData.email}</p>
    <p><strong>Nombre:</strong> ${saleData.name || 'No proporcionado'}</p>
    <p><strong>Plan:</strong> ${saleData.plan}</p>
    <p><strong>Importe:</strong> €${saleData.amount}</p>
    <p><strong>País:</strong> ${saleData.country || 'ES'}</p>
  `
  return sendEmail('d@negoia.com', subject, html)
}

export default sendEmail
