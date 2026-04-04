'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// NO importar nada de @stripe/react-stripe-js

const planData = {
  basic: {
    name: 'Plan Básico', price: 29,
    features: ['Acceso a todos los roles compatibles','Datos: día a día, pros/contras, salarios','Gap analysis por rol','Plan de estudio personalizado','Links a ofertas pre-configurados']
  },
  complete: {
    name: 'Plan Completo', price: 39, popular: true,
    features: ['Todo lo del Plan Básico +','CV genérico optimizado (ATS + HR ready)','CVs específicos por cada rol','Cartas de presentación personalizadas','LinkedIn bullets listos para copiar','Elevator pitch de 30 segundos']
  }
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'complete'
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const stripeRef = useRef(null)
  const elementsRef = useRef(null)
  const [paymentReady, setPaymentReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [payError, setPayError] = useState(null)
  const [initError, setInitError] = useState(null)
  const [initLoading, setInitLoading] = useState(true)
  
  const plan_data = planData[plan] || planData.complete

  useEffect(() => {
    if (!userId) { router.push('/start'); return }

    const initPayment = async () => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, plan })
        })
        const data = await res.json()
        
        if (data.error) {
          if (data.error.includes('no encontrado') || data.error.includes('not found')) {
            router.push('/upgrade')
            return
          }
          setInitError(data.error)
          setInitLoading(false)
          return
        }

        const { loadStripe } = await import('@stripe/stripe-js')
        const stripe = await loadStripe(data.publishableKey)
        stripeRef.current = stripe

        const elements = stripe.elements({
          clientSecret: data.clientSecret,
          appearance: {
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
          },
          locale: 'es'
        })
        elementsRef.current = elements

        const paymentElement = elements.create('payment', {
          layout: { type: 'tabs', defaultCollapsed: false },
          defaultValues: { billingDetails: { address: { country: 'ES' } } }
        })
        paymentElement.mount('#payment-element')
        setPaymentReady(true)
        setInitLoading(false)
      } catch (err) {
        console.error('Init payment error:', err)
        setInitError('Error al inicializar el pago. Inténtalo de nuevo.')
        setInitLoading(false)
      }
    }

    initPayment()
  }, [userId, plan, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripeRef.current || !elementsRef.current || submitting) return
    setSubmitting(true)
    setPayError(null)

    const { error, paymentIntent } = await stripeRef.current.confirmPayment({
      elements: elementsRef.current,
      confirmParams: {
        return_url: `${window.location.origin}/success?userId=${userId}&plan=${plan}`
      },
      redirect: 'if_required'
    })

    if (error) {
      setPayError(error.message)
      setSubmitting(false)
    } else if (paymentIntent?.status === 'succeeded') {
      router.push(`/success?userId=${userId}&plan=${plan}`)
    }
  }

  const css = `
    .co-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    @media (max-width: 768px) { 
      .co-grid { grid-template-columns: 1fr; gap: 24px; }
      .co-summary { order: 2; }
      .co-payment { order: 1; }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div style={{ minHeight:'100vh', background:'#0f172a', color:'#f8fafc', padding:'24px 20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'24px', borderBottom:'1px solid #1e293b', marginBottom:'40px' }}>
            <a href="/" style={{ fontSize:'22px', fontWeight:'800', color:'#f8fafc', textDecoration:'none' }}>
              carrera<span style={{ color:'#6366f1' }}>.</span>ia
            </a>
            <div style={{ fontSize:'14px', color:'#10b981', display:'flex', alignItems:'center', gap:'6px' }}>
              🔒 Pago 100% seguro
            </div>
          </div>

          <div className="co-grid">
            {/* Resumen del plan */}
            <div className="co-summary">
              <div style={{ background:'#1e293b', borderRadius:'20px', padding:'28px', border: plan === 'complete' ? '1px solid rgba(99,102,241,0.4)' : '1px solid #334155' }}>
                {plan_data.popular && (
                  <div style={{ display:'inline-block', background:'linear-gradient(135deg,#6366f1,#a855f7)', padding:'4px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', marginBottom:'16px' }}>
                    MÁS POPULAR
                  </div>
                )}
                <h1 style={{ fontSize:'24px', fontWeight:'800', margin:'0 0 8px' }}>{plan_data.name}</h1>
                <div style={{ fontSize:'48px', fontWeight:'900', margin:'0 0 4px', lineHeight:'1' }}>€{plan_data.price}</div>
                <div style={{ fontSize:'14px', color:'#64748b', margin:'0 0 24px' }}>Pago único · Acceso permanente</div>
                <div style={{ borderTop:'1px solid #334155', paddingTop:'20px' }}>
                  <div style={{ fontSize:'12px', fontWeight:'700', color:'#64748b', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'14px' }}>INCLUYE</div>
                  <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                    {plan_data.features.map((f, i) => (
                      <li key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start', marginBottom:'10px', fontSize:'15px', color:'#cbd5e1' }}>
                        <span style={{ color:'#10b981', fontWeight:'700', flexShrink:0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ marginTop:'16px', display:'flex', gap:'12px', alignItems:'flex-start', padding:'18px', background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'14px' }}>
                <span style={{ fontSize:'22px' }}>🛡️</span>
                <div>
                  <div style={{ fontWeight:'700', color:'#10b981', marginBottom:'4px', fontSize:'15px' }}>Garantía 14 días</div>
                  <div style={{ fontSize:'13px', color:'#64748b' }}>Si no te convence, te devolvemos el dinero. Sin preguntas.</div>
                </div>
              </div>
            </div>

            {/* Formulario de pago */}
            <div className="co-payment">
              <div style={{ background:'#1e293b', borderRadius:'20px', padding:'28px', border:'1px solid #334155' }}>
                <h2 style={{ fontSize:'18px', fontWeight:'700', marginBottom:'24px', marginTop:0 }}>Método de pago</h2>
                
                {initLoading && (
                  <div style={{ textAlign:'center', padding:'40px 0', color:'#64748b', fontSize:'14px' }}>
                    ⏳ Preparando formulario seguro...
                  </div>
                )}
                
                {initError && (
                  <div style={{ textAlign:'center', padding:'20px 0' }}>
                    <div style={{ color:'#fca5a5', marginBottom:'16px', fontSize:'15px' }}>{initError}</div>
                    <a href={`/upgrade?userId=${userId}`} style={{ color:'#6366f1', textDecoration:'none', fontSize:'14px' }}>← Volver al plan</a>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: initError ? 'none' : 'block' }}>
                  {/* Stripe monta aquí el iframe con los campos de tarjeta */}
                  <div id="payment-element" style={{ minHeight:'180px' }} />
                  
                  {payError && (
                    <div style={{ marginTop:'16px', padding:'12px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'10px', color:'#fca5a5', fontSize:'14px' }}>
                      ⚠️ {payError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!paymentReady || submitting}
                    style={{
                      width:'100%',
                      marginTop:'24px',
                      padding:'18px',
                      background: (!paymentReady || submitting) ? '#374151' : 'linear-gradient(135deg,#10b981,#059669)',
                      color:'#fff',
                      border:'none',
                      borderRadius:'12px',
                      fontSize:'18px',
                      fontWeight:'700',
                      cursor: (!paymentReady || submitting) ? 'not-allowed' : 'pointer',
                      boxShadow: (!paymentReady || submitting) ? 'none' : '0 4px 20px rgba(16,185,129,0.35)',
                      transition:'all 0.2s'
                    }}
                  >
                    {submitting ? 'Procesando...' : `💳 Pagar €${plan_data.price} ahora`}
                  </button>

                  <div style={{ textAlign:'center', marginTop:'12px', fontSize:'13px', color:'#64748b' }}>
                    🔒 Stripe cifrado · Sin suscripción · Acceso permanente
                  </div>
                </form>
              </div>

              <div style={{ textAlign:'center', marginTop:'16px' }}>
                <a href={`/upgrade?userId=${userId}`} style={{ color:'#64748b', fontSize:'14px', textDecoration:'none' }}>
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
    <Suspense fallback={
      <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', color:'#f8fafc', fontFamily:'sans-serif' }}>
        <div>Cargando...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
