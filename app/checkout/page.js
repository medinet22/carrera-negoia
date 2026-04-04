'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const plans = {
  basic: {
    id: 'basic',
    name: 'Plan Básico',
    price: 29,
    features: [
      'Acceso completo a todos los roles compatibles',
      'Datos detallados: día a día, pros/contras, salarios',
      'Sistema de selección y descarte de roles',
      'Gap analysis por cada rol seleccionado',
      'Plan de estudio para cerrar gaps',
      'Links a ofertas de empleo pre-configurados'
    ]
  },
  complete: {
    id: 'complete',
    name: 'Plan Completo',
    price: 39,
    popular: true,
    features: [
      'Todo lo del Plan Básico +',
      'CV genérico optimizado (ATS + HR ready)',
      'CVs específicos por cada rol seleccionado',
      'Cartas de presentación personalizadas',
      'Bullets de LinkedIn listos para copiar',
      'Elevator pitch de 30 segundos'
    ]
  }
}

const appearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#6366f1',
    colorBackground: '#0f172a',
    colorText: '#f8fafc',
    colorTextSecondary: '#94a3b8',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    borderRadius: '8px',
  },
  rules: {
    '.Input': {
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      padding: '14px 16px'
    },
    '.Input:focus': {
      borderColor: '#6366f1',
      boxShadow: 'none'
    },
    '.Label': {
      color: '#94a3b8',
      fontSize: '13px',
      fontWeight: '600',
      marginBottom: '8px'
    }
  }
}

const checkoutStyles = `
  .checkout-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #f8fafc;
    padding: 20px;
  }
  
  .checkout-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .checkout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 40px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 40px;
  }
  
  .checkout-logo {
    font-size: 24px;
    font-weight: 800;
    color: #f8fafc;
    text-decoration: none;
  }
  
  .checkout-logo span {
    color: #a5b4fc;
  }
  
  .checkout-security-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #10b981;
  }
  
  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }
  
  @media (max-width: 768px) {
    .checkout-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .checkout-summary {
      order: 2;
    }
    .checkout-payment {
      order: 1;
    }
    .checkout-header {
      padding: 16px 0 24px;
      margin-bottom: 24px;
    }
    .checkout-container {
      padding: 12px;
    }
  }
  
  .checkout-plan-card {
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 20px;
    padding: 32px;
    position: relative;
  }
  
  @media (max-width: 768px) {
    .checkout-plan-card {
      padding: 24px 20px;
    }
  }
  
  .checkout-popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 16px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
  
  .checkout-plan-name {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 16px;
    margin-top: 8px;
  }
  
  @media (max-width: 768px) {
    .checkout-plan-name {
      font-size: 24px;
    }
  }
  
  .checkout-price-container {
    margin-bottom: 4px;
  }
  
  .checkout-price-amount {
    font-size: 48px;
    font-weight: 900;
  }
  
  @media (max-width: 768px) {
    .checkout-price-amount {
      font-size: 40px;
    }
  }
  
  .checkout-price-currency {
    font-size: 20px;
    color: rgba(255,255,255,0.6);
  }
  
  .checkout-price-note {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 24px;
  }
  
  .checkout-divider {
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 24px 0;
  }
  
  .checkout-features-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.6);
    margin-bottom: 16px;
  }
  
  .checkout-features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .checkout-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
    font-size: 15px;
    color: rgba(255,255,255,0.85);
  }
  
  .checkout-check-icon {
    color: #10b981;
    font-weight: 700;
    flex-shrink: 0;
  }
  
  .checkout-roi-box {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 16px;
    padding: 24px;
    margin-top: 24px;
  }
  
  @media (max-width: 768px) {
    .checkout-roi-box {
      padding: 20px 16px;
    }
  }
  
  .checkout-roi-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 20px;
    color: rgba(255,255,255,0.9);
  }
  
  .checkout-roi-numbers {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    .checkout-roi-numbers {
      flex-direction: column;
      gap: 16px;
    }
    .checkout-roi-arrow {
      transform: rotate(90deg);
    }
  }
  
  .checkout-roi-item {
    text-align: center;
  }
  
  .checkout-roi-label {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 4px;
  }
  
  .checkout-roi-value {
    font-size: 24px;
    font-weight: 800;
  }
  
  .checkout-roi-value-green {
    color: #10b981;
  }
  
  .checkout-roi-value-big {
    font-size: 28px;
    color: #10b981;
  }
  
  .checkout-roi-arrow {
    font-size: 20px;
    color: rgba(255,255,255,0.3);
  }
  
  .checkout-payment-section {
    margin-bottom: 24px;
  }
  
  .checkout-section-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  
  .checkout-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 20px;
    color: #f87171;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }
  
  .checkout-pay-button {
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4);
    margin-bottom: 16px;
    transition: all 0.2s;
  }
  
  .checkout-pay-button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 32px rgba(16, 185, 129, 0.5);
  }
  
  .checkout-pay-button:disabled {
    background: #4b5563;
    cursor: wait;
    box-shadow: none;
  }
  
  .checkout-security-note {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
  }
  
  .checkout-guarantee {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 20px;
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 14px;
  }
  
  @media (max-width: 768px) {
    .checkout-guarantee {
      padding: 16px;
    }
  }
  
  .checkout-guarantee-icon {
    font-size: 24px;
    flex-shrink: 0;
  }
  
  .checkout-guarantee-title {
    color: #10b981;
    font-weight: 700;
    margin: 0 0 4px 0;
  }
  
  .checkout-guarantee-text {
    margin: 0;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
  }
  
  .checkout-loading-card {
    background: rgba(255,255,255,0.03);
    border-radius: 16px;
    padding: 60px 40px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.05);
  }
  
  .checkout-loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255,255,255,0.1);
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: checkout-spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  @keyframes checkout-spin {
    to { transform: rotate(360deg); }
  }
  
  .checkout-error-card {
    background: rgba(239, 68, 68, 0.08);
    border-radius: 16px;
    padding: 40px;
    text-align: center;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
  
  .checkout-retry-button {
    margin-top: 20px;
    padding: 12px 24px;
    background: #6366f1;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .checkout-retry-button:hover {
    background: #4f46e5;
  }
  
  .checkout-change-plan {
    text-align: center;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  
  .checkout-change-plan-link {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-size: 14px;
  }
  
  .checkout-change-plan-link:hover {
    color: rgba(255,255,255,0.7);
  }
  
  .checkout-loading-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #f8fafc;
  }
`

function CheckoutForm({ plan, userId }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success?userId=${userId}&plan=${plan}`,
      },
      redirect: 'if_required'
    })

    if (submitError) {
      setError(submitError.message)
      setLoading(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      router.push(`/success?userId=${userId}&plan=${plan}&pi=${paymentIntent.id}`)
    }
  }

  const planData = plans[plan] || plans.complete

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-payment-section">
        <h2 className="checkout-section-title">Método de pago</h2>
        <PaymentElement 
          options={{
            layout: { type: 'tabs', defaultCollapsed: false },
            defaultValues: { billingDetails: { address: { country: 'ES' } } }
          }}
        />
      </div>

      {error && (
        <div className="checkout-error">
          <span>⚠️</span> {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="checkout-pay-button"
      >
        {loading ? 'Procesando...' : `Pagar €${planData.price} — Acceso inmediato`}
      </button>

      <div className="checkout-security-note">
        <span>🔒</span> Pago seguro cifrado · Sin suscripción · Acceso permanente
      </div>

      <div className="checkout-guarantee">
        <span className="checkout-guarantee-icon">🛡️</span>
        <div>
          <p className="checkout-guarantee-title">Garantía 14 días</p>
          <p className="checkout-guarantee-text">
            Si no te convence, te devolvemos el dinero. Sin preguntas.
          </p>
        </div>
      </div>
    </form>
  )
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'complete'
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      router.push('/start')
      return
    }

    const initPayment = async () => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, plan })
        })

        const data = await res.json()
        
        if (data.error) {
          // Si el usuario no existe, redirigir silenciosamente
          if (data.error.includes('Usuario no encontrado') || data.error.includes('not found')) {
            router.push('/upgrade')
            return
          }
          setError(data.error)
          setLoading(false)
          return
        }

        setStripePromise(loadStripe(data.publishableKey))
        setClientSecret(data.clientSecret)
        setLoading(false)
      } catch (err) {
        console.error('Payment init error:', err)
        setError('Error iniciando el pago. Inténtalo de nuevo.')
        setLoading(false)
      }
    }

    initPayment()
  }, [userId, plan, router])

  const planData = plans[plan] || plans.complete

  if (!userId) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: checkoutStyles }} />
        <div className="checkout-container">
          <div className="checkout-loading-page">Redirigiendo...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: checkoutStyles }} />
      <div className="checkout-container">
        <div className="checkout-inner">
          {/* Header */}
          <div className="checkout-header">
            <a href="https://carrera.negoia.com" className="checkout-logo">
              carrera<span>.</span>ia
            </a>
            <div className="checkout-security-badge">
              <span>🔒</span> Pago 100% seguro
            </div>
          </div>

          <div className="checkout-grid">
            {/* Izquierda: Resumen del plan */}
            <div className="checkout-summary">
              <div className="checkout-plan-card">
                {planData.popular && (
                  <div className="checkout-popular-badge">Más popular</div>
                )}
                <h1 className="checkout-plan-name">{planData.name}</h1>
                <div className="checkout-price-container">
                  <span className="checkout-price-amount">€{planData.price}</span>
                  <span className="checkout-price-currency"> EUR</span>
                </div>
                <p className="checkout-price-note">Pago único · Acceso permanente</p>

                <div className="checkout-divider"></div>

                <h3 className="checkout-features-title">Incluye:</h3>
                <ul className="checkout-features-list">
                  {planData.features.map((feature, i) => (
                    <li key={i} className="checkout-feature-item">
                      <span className="checkout-check-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ROI Calculator */}
              <div className="checkout-roi-box">
                <h4 className="checkout-roi-title">💰 Si esto te ayuda a conseguir un trabajo con €5.000 más de salario...</h4>
                <div className="checkout-roi-numbers">
                  <div className="checkout-roi-item">
                    <div className="checkout-roi-label">Inversión</div>
                    <div className="checkout-roi-value">€{planData.price}</div>
                  </div>
                  <div className="checkout-roi-arrow">→</div>
                  <div className="checkout-roi-item">
                    <div className="checkout-roi-label">Incremento</div>
                    <div className="checkout-roi-value checkout-roi-value-green">€5.000</div>
                  </div>
                  <div className="checkout-roi-arrow">=</div>
                  <div className="checkout-roi-item">
                    <div className="checkout-roi-label">ROI</div>
                    <div className="checkout-roi-value checkout-roi-value-big">
                      {Math.round((5000 / planData.price) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Derecha: Formulario de pago */}
            <div className="checkout-payment">
              {loading ? (
                <div className="checkout-loading-card">
                  <div className="checkout-loading-spinner"></div>
                  <p>Preparando formulario de pago...</p>
                </div>
              ) : error ? (
                <div className="checkout-error-card">
                  <p style={{ marginBottom: '16px' }}>😕 Algo salió mal</p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
                    {error.includes('Stripe') || error.includes('config') 
                      ? 'Error de configuración de pago. Por favor, inténtalo de nuevo.'
                      : error
                    }
                  </p>
                  <button 
                    onClick={() => router.push(`/upgrade?userId=${userId}`)}
                    className="checkout-retry-button"
                  >
                    Volver a intentar
                  </button>
                </div>
              ) : clientSecret && stripePromise ? (
                <Elements 
                  stripe={stripePromise} 
                  options={{ clientSecret, appearance, locale: 'es' }}
                >
                  <CheckoutForm plan={plan} userId={userId} />
                </Elements>
              ) : null}
            </div>
          </div>

          {/* Change plan link */}
          <div className="checkout-change-plan">
            <a href={`/upgrade?userId=${userId}`} className="checkout-change-plan-link">
              ← Cambiar plan
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <>
        <style dangerouslySetInnerHTML={{ __html: checkoutStyles }} />
        <div className="checkout-container">
          <div className="checkout-loading-page">Cargando...</div>
        </div>
      </>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
