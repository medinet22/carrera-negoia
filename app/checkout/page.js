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
      <div style={styles.paymentSection}>
        <h2 style={styles.sectionTitle}>Método de pago</h2>
        <PaymentElement 
          options={{
            layout: { type: 'tabs', defaultCollapsed: false },
            defaultValues: { billingDetails: { address: { country: 'ES' } } }
          }}
        />
      </div>

      {error && (
        <div style={styles.error}>
          <span>⚠️</span> {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || loading}
        style={styles.payButton(loading)}
      >
        {loading ? 'Procesando...' : `Pagar €${planData.price} — Acceso inmediato`}
      </button>

      <div style={styles.securityNote}>
        <span>🔒</span> Pago seguro cifrado · Sin suscripción · Acceso permanente
      </div>

      <div style={styles.guarantee}>
        <span style={{ fontSize: '24px' }}>🛡️</span>
        <div>
          <strong style={{ color: '#10b981' }}>Garantía 14 días</strong>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
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

    // Fetch PaymentIntent
    const initPayment = async () => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, plan })
        })

        const data = await res.json()
        
        if (data.error) {
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
      <div style={styles.container}>
        <div style={styles.loading}>Redirigiendo...</div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <a href="https://carrera.negoia.com" style={styles.logo}>
            carrera<span style={{ color: '#a5b4fc' }}>.</span>ia
          </a>
          <div style={styles.securityBadge}>
            <span>🔒</span> Pago 100% seguro
          </div>
        </div>

        <div style={styles.grid}>
          {/* Izquierda: Resumen del plan */}
          <div style={styles.summaryColumn}>
            <div style={styles.planCard}>
              {planData.popular && (
                <div style={styles.popularBadge}>Más popular</div>
              )}
              <h1 style={styles.planName}>{planData.name}</h1>
              <div style={styles.priceContainer}>
                <span style={styles.priceAmount}>€{planData.price}</span>
                <span style={styles.priceCurrency}> EUR</span>
              </div>
              <p style={styles.priceNote}>Pago único · Acceso permanente</p>

              <div style={styles.divider}></div>

              <h3 style={styles.featuresTitle}>Incluye:</h3>
              <ul style={styles.featuresList}>
                {planData.features.map((feature, i) => (
                  <li key={i} style={styles.featureItem}>
                    <span style={styles.checkIcon}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ROI Calculator */}
            <div style={styles.roiBox}>
              <h4 style={styles.roiTitle}>💰 Si esto te ayuda a conseguir un trabajo con €5.000 más de salario...</h4>
              <div style={styles.roiNumbers}>
                <div style={styles.roiItem}>
                  <div style={styles.roiLabel}>Inversión</div>
                  <div style={styles.roiValue}>€{planData.price}</div>
                </div>
                <div style={styles.roiArrow}>→</div>
                <div style={styles.roiItem}>
                  <div style={styles.roiLabel}>Incremento</div>
                  <div style={{ ...styles.roiValue, color: '#10b981' }}>€5.000</div>
                </div>
                <div style={styles.roiArrow}>=</div>
                <div style={styles.roiItem}>
                  <div style={styles.roiLabel}>ROI</div>
                  <div style={{ ...styles.roiValue, color: '#10b981', fontSize: '28px' }}>
                    {Math.round((5000 / planData.price) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Derecha: Formulario de pago */}
          <div style={styles.paymentColumn}>
            {loading ? (
              <div style={styles.loadingCard}>
                <div style={styles.loadingSpinner}></div>
                <p>Preparando formulario de pago...</p>
              </div>
            ) : error ? (
              <div style={styles.errorCard}>
                <p>❌ {error}</p>
                <button 
                  onClick={() => router.push(`/upgrade?userId=${userId}`)}
                  style={styles.retryButton}
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
        <div style={styles.changePlan}>
          <a href={`/upgrade?userId=${userId}`} style={styles.changePlanLink}>
            ← Cambiar plan
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={styles.container}>
        <div style={styles.loading}>Cargando...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#f8fafc',
    padding: '20px'
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0 40px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '40px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#f8fafc',
    textDecoration: 'none'
  },
  securityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#10b981'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start'
  },
  summaryColumn: {},
  paymentColumn: {},
  planCard: {
    background: 'rgba(99, 102, 241, 0.08)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '20px',
    padding: '32px',
    position: 'relative'
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '6px 16px',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  planName: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '16px',
    marginTop: '8px'
  },
  priceContainer: {
    marginBottom: '4px'
  },
  priceAmount: {
    fontSize: '48px',
    fontWeight: '900'
  },
  priceCurrency: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.6)'
  },
  priceNote: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '24px'
  },
  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
    margin: '24px 0'
  },
  featuresTitle: {
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '16px'
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '12px',
    fontSize: '15px',
    color: 'rgba(255,255,255,0.85)'
  },
  checkIcon: {
    color: '#10b981',
    fontWeight: '700'
  },
  roiBox: {
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '24px'
  },
  roiTitle: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '20px',
    color: 'rgba(255,255,255,0.9)'
  },
  roiNumbers: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  roiItem: {
    textAlign: 'center'
  },
  roiLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '4px'
  },
  roiValue: {
    fontSize: '24px',
    fontWeight: '800'
  },
  roiArrow: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.3)'
  },
  paymentSection: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px'
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    padding: '14px 16px',
    marginBottom: '20px',
    color: '#f87171',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px'
  },
  payButton: (loading) => ({
    width: '100%',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    background: loading ? '#4b5563' : 'linear-gradient(135deg, #10b981, #059669)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    cursor: loading ? 'wait' : 'pointer',
    boxShadow: '0 4px 24px rgba(16, 185, 129, 0.4)',
    marginBottom: '16px'
  }),
  securityNote: {
    textAlign: 'center',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px'
  },
  guarantee: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
    padding: '20px',
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '14px'
  },
  loadingCard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '60px 40px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  errorCard: {
    background: 'rgba(239, 68, 68, 0.08)',
    borderRadius: '16px',
    padding: '40px',
    textAlign: 'center',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  },
  retryButton: {
    marginTop: '20px',
    padding: '12px 24px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  changePlan: {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  changePlanLink: {
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '14px'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#f8fafc'
  }
}

// Add global keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @media (max-width: 768px) {
      .checkout-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `
  document.head.appendChild(style)
}
