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

/**
 * Send notification when skills map analysis is complete
 * @param {string} email - User email
 * @param {string} userName - User name
 * @param {string} userId - User ID for the profile link
 * @returns {Promise<{success: boolean}>}
 */
export async function sendAnalysisCompleteNotification(email, userName, userId) {
  const subject = '🗺️ Tu Mapa de Habilidades está listo'
  const profileUrl = `https://carrera.negoia.com/profile?userId=${userId}`
  
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 40px 30px; border-radius: 16px;">
      
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="font-size: 48px; margin-bottom: 16px;">🧠</div>
        <h1 style="color: #f8fafc; margin: 0; font-size: 28px; font-weight: 700;">
          ${userName || 'Hola'}, tu análisis está listo
        </h1>
      </div>
      
      <div style="background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 16px; line-height: 1.6;">
          Hemos analizado tu CV y tus respuestas para crear tu <strong>Mapa de Habilidades</strong> personalizado.
        </p>
      </div>
      
      <div style="margin-bottom: 32px;">
        <h3 style="color: #a5b4fc; margin-bottom: 16px; font-size: 16px;">Lo que encontrarás:</h3>
        <ul style="color: rgba(255,255,255,0.75); line-height: 1.8; padding-left: 20px; margin: 0;">
          <li>Tu <strong>Superpoder</strong> — la combinación única de habilidades que te diferencia</li>
          <li>Tus <strong>Top 3 Roles</strong> compatibles con tu perfil</li>
          <li><strong>Índice de Empleabilidad</strong> — y cómo mejorarlo</li>
          <li><strong>Lo que otros ven en ti</strong> — tu percepción externa</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${profileUrl}" 
           style="display: inline-block; 
                  background: linear-gradient(135deg, #6366f1, #4f46e5); 
                  color: white; 
                  padding: 16px 40px; 
                  border-radius: 12px; 
                  text-decoration: none; 
                  font-size: 18px; 
                  font-weight: 700;">
          Ver mi Mapa de Habilidades →
        </a>
      </div>
      
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; text-align: center; margin: 0;">
          ¿Preguntas? Responde a este email.<br>
          — El equipo de Carrera IA
        </p>
      </div>
    </div>
  `
  return sendEmail(email, subject, html)
}

/**
 * Email template generator for the webhook notification
 * Used by the D-Business agent when analysis completes
 */
export function emailMapaListo(userName, userId) {
  const profileUrl = `https://carrera.negoia.com/profile?userId=${userId}`
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 40px 30px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
        <h1 style="color: #f8fafc; margin: 0; font-size: 28px; font-weight: 700;">
          ${userName || 'Hola'}, tu Mapa está listo
        </h1>
      </div>
      <p style="color: rgba(255,255,255,0.85); font-size: 16px; line-height: 1.6; text-align: center;">
        Hemos terminado de analizar tu perfil. Tu Mapa de Habilidades te espera.
      </p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${profileUrl}" 
           style="display: inline-block; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 18px; font-weight: 700;">
          Ver mi Mapa →
        </a>
      </div>
    </div>
  `
}

export default sendEmail
