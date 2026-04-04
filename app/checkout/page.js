'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Stripe appearance — tema night igual que negoia
const stripeAppearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#6366f1',
    colorBackground: '#1e293b',
    colorText: '#f8fafc',
    colorTextSecondary: '#94a3b8',
    colorDanger: '#ef4444',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    borderRadius: '10px',
    spacingUnit: '4px'
  },
  rules: {
    '.Input': { backgroundColor: '#0f172a', border: '1px solid #334155', padding: '14px 16px' },
    '.Input:focus': { borderColor: '#6366f1', boxShadow: 'none' },
    '.Label': { color: '#94a3b8', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }
  }
}

// Componente de formulario (dentro de Elements)
function PaymentForm({ plan, userId, price }) {
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

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success?userId=${userId}&plan=${plan}`,
      },
      redirect: 'if_required'
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
    } else if (paymentIntent?.status === 'succeeded') {
      router.push(`/success?userId=${userId}&plan=${plan}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{
        layout: { type: 'tabs', defaultCollapsed: false },
        defaultValues: { billingDetails: { address: { country: 'ES' } } }
      }} />
      
      {error && (
        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#fca5a5', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: '100%',
          marginTop: '24px',
          padding: '18px',
          background: loading ? '#374151' : 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(16,185,129,0.35)',
          transition: 'all 0.2s'
        }}
      >
        {loading ? 'Procesando...' : `💳 Pagar €${price} ahora`}
      </button>

      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
        🔒 Stripe cifrado · Sin suscripción · Acceso permanente
      </div>
    </form>
  )
}

// Componente principal
function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'complete'
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)
  const [initError, setInitError] = useState(null)
  const [initLoading, setInitLoading] = useState(true)

  const planData = {
    basic: { name: 'Plan Básico', price: 29, features: ['Acceso a todos los roles compatibles','Datos: día a día, pros/contras, salarios','Gap analysis por rol','Plan de estudio','Links a ofertas pre-configurados'] },
    complete: { name: 'Plan Completo', price: 39, popular: true, features: ['Todo lo del Plan Básico +','CV genérico optimizado (ATS + HR ready)','CVs específicos por rol','Cartas de presentación','LinkedIn bullets','Elevator pitch 30s'] }
  }[plan] || { name: 'Plan Completo', price: 39, features: [] }

  useEffect(() => {
    if (!userId) { router.push('/start'); return }

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, plan })
    })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        // Usuario no existe → redirigir
        router.push('/upgrade')
        return
      }
      setStripePromise(loadStripe(data.publishableKey))
      setClientSecret(data.clientSecret)
      setInitLoading(false)
    })
    .catch(() => {
      setInitError('Error de conexión. Inténtalo de nuevo.')
      setInitLoading(false)
    })
  }, [])

  // CSS con media queries (inline style no permite MQ)
  const css = `
    .co-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    @media (max-width: 768px) { 
      .co-grid { grid-template-columns: 1fr; gap: 32px; }
      .co-summary { order: 2; }
      .co-payment { order: 1; }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', padding: '24px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '32px', borderBottom: '1px solid #1e293b', marginBottom: '48px' }}>
            <a href="/" style={{ fontSize: '22px', fontWeight: '800', color: '#f8fafc', textDecoration: 'none' }}>
              carrera<span style={{ color: '#6366f1' }}>.</span>ia
            </a>
            <div style={{ fontSize: '14px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔒 Pago 100% seguro
            </div>
          </div>

          <div className="co-grid">
            {/* Resumen del plan */}
            <div className="co-summary">
              <div style={{ background: '#1e293b', borderRadius: '20px', padding: '32px', border: plan === 'complete' ? '1px solid rgba(99,102,241,0.3)' : '1px solid #334155' }}>
                {planData.popular && (
                  <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#6366f1,#a855f7)', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>
                    MÁS POPULAR
                  </div>
                )}
                <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>{planData.name}</h1>
                <div style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 4px' }}>€{planData.price}</div>
                <div style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px' }}>Pago único · Acceso permanente</div>
                
                <div style={{ borderTop: '1px solid #334155', paddingTop: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>INCLUYE</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {planData.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '15px', color: '#cbd5e1' }}>
                        <span style={{ color: '#10b981', fontWeight: '700', flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Garantía */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px' }}>
                <span style={{ fontSize: '24px' }}>🛡️</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>Garantía 14 días</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Si no te convence, te devolvemos el dinero. Sin preguntas.</div>
                </div>
              </div>
            </div>

            {/* Formulario de pago */}
            <div className="co-payment">
              <div style={{ background: '#1e293b', borderRadius: '20px', padding: '32px', border: '1px solid #334155' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', marginTop: 0 }}>Método de pago</h2>
                
                {initLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Preparando formulario seguro...</div>
                  </div>
                ) : initError ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ color: '#fca5a5', marginBottom: '16px' }}>{initError}</div>
                    <a href={`/upgrade?userId=${userId}`} style={{ color: '#6366f1', textDecoration: 'none' }}>← Volver</a>
                  </div>
                ) : clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: stripeAppearance, locale: 'es' }}>
                    <PaymentForm plan={plan} userId={userId} price={planData.price} />
                  </Elements>
                ) : null}
              </div>

              {/* Link cambiar plan */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a href={`/upgrade?userId=${userId}`} style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>
                  ← Cambiar plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', color:'#f8fafc' }}>Cargando...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
