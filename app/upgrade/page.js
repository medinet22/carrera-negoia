'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function UpgradeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('complete')
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 })
  const [showTimer, setShowTimer] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Timer de expiración real (48h desde que se guardó el jobId)
  // Solo mostrar si hay fecha guardada en localStorage
  useEffect(() => {
    const jobCreated = typeof window !== 'undefined' ? localStorage.getItem('carrera_job_created') : null
    
    // Si no hay fecha guardada, NO mostrar el timer
    if (!jobCreated) {
      setShowTimer(false)
      return
    }
    
    const expiresAt = new Date(jobCreated).getTime() + (48 * 60 * 60 * 1000)

    const updateTimer = () => {
      const now = Date.now()
      const diff = expiresAt - now
      
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        setShowTimer(false) // Ocultar si expiró
        return
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeLeft({ hours, minutes, seconds })
      setShowTimer(true)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const plans = {
    basic: {
      id: 'basic',
      name: 'Plan Básico',
      price: 29,
      priceId: 'price_basic_platform', // Replace with actual Stripe price ID
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
      priceId: 'price_complete_platform', // Replace with actual Stripe price ID
      popular: true,
      features: [
        'Todo lo del Plan Básico +',
        'CV genérico optimizado (ATS + HR ready)',
        'CVs específicos por cada rol seleccionado',
        'Cartas de presentación personalizadas',
        'Bullets de LinkedIn listos para copiar',
        'Elevator pitch de 30 segundos',
        'Entrega prioritaria'
      ]
    }
  }

  const handleCheckout = (plan) => {
    if (!userId) {
      router.push('/start')
      return
    }

    // Redirect to integrated checkout page
    router.push(`/checkout?plan=${plan}&userId=${userId}`)
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f8fafc',
      padding: '40px 20px'
    },
    inner: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    sunkCost: {
      textAlign: 'center',
      padding: '20px 24px',
      background: 'rgba(251, 191, 36, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      marginBottom: '40px'
    },
    sunkCostText: {
      fontSize: '16px',
      color: '#fbbf24',
      fontWeight: '500'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    title: {
      fontSize: '36px',
      fontWeight: '800',
      marginBottom: '12px'
    },
    subtitle: {
      fontSize: '18px',
      color: 'rgba(255,255,255,0.7)'
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    },
    planCard: (isPopular, isSelected) => ({
      background: isPopular ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '32px',
      border: isSelected 
        ? '2px solid #6366f1' 
        : isPopular 
          ? '1px solid rgba(99, 102, 241, 0.3)' 
          : '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }),
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
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    planPrice: {
      marginBottom: '24px'
    },
    priceAmount: {
      fontSize: '48px',
      fontWeight: '800'
    },
    priceCurrency: {
      fontSize: '20px',
      color: 'rgba(255,255,255,0.6)'
    },
    priceNote: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '4px'
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      marginBottom: '24px'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '12px',
      fontSize: '15px',
      color: 'rgba(255,255,255,0.85)'
    },
    featureIcon: {
      color: '#10b981',
      fontSize: '16px',
      marginTop: '2px'
    },
    ctaButton: (isPrimary, isLoading) => ({
      width: '100%',
      padding: '16px 32px',
      borderRadius: '12px',
      border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.2)',
      background: isPrimary ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '700',
      cursor: isLoading ? 'wait' : 'pointer',
      opacity: isLoading ? 0.7 : 1
    }),
    guarantee: {
      textAlign: 'center',
      marginTop: '32px'
    },
    guaranteeBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 24px',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '12px'
    },
    guaranteeText: {
      fontSize: '14px',
      color: '#10b981'
    },
    comparison: {
      marginTop: '48px',
      padding: '32px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    comparisonTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '24px',
      textAlign: 'center'
    },
    comparisonItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    comparisonLabel: {
      fontSize: '15px'
    },
    comparisonValue: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#10b981'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Timer de expiración + sunk cost message - solo mostrar si hay fecha guardada */}
        {showTimer && (
          <div style={{
            textAlign: 'center',
            padding: '24px',
            background: timeLeft.hours < 12 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(251, 191, 36, 0.1)',
            borderRadius: '16px',
            border: timeLeft.hours < 12 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(251, 191, 36, 0.3)',
            marginBottom: '40px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '12px' 
            }}>
              <span style={{ fontSize: '24px' }}>⏰</span>
              <span style={{ 
                fontSize: '28px', 
                fontWeight: '800',
                fontFamily: 'monospace',
                color: timeLeft.hours < 12 ? '#ef4444' : '#fbbf24'
              }}>
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <p style={{ 
              fontSize: '15px', 
              color: timeLeft.hours < 12 ? '#fca5a5' : '#fbbf24',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Tu análisis expira en {timeLeft.hours}h — los datos de tu assessment se procesan en tiempo real
            </p>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <span 
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                ¿Por qué 48h?
              </span>
              {showTooltip && (
                <span style={{
                  position: 'absolute',
                  marginTop: '80px',
                  padding: '12px 16px',
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '280px',
                  textAlign: 'left',
                  zIndex: 10
                }}>
                  Tu CV y respuestas se procesan con IA de Claude (cuesta ~€0.15). 
                  Mantenemos los resultados 48h — pasado ese tiempo, se eliminan y tendrías que repetir el assessment.
                </span>
              )}
            </p>
          </div>
        )}

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Desbloquea tu futuro profesional</h1>
          <p style={styles.subtitle}>
            Accede a todos los roles compatibles y sal con un plan de acción claro
          </p>
        </div>

        {/* Plans */}
        <div style={styles.plansGrid}>
          {Object.values(plans).map(plan => (
            <div 
              key={plan.id}
              style={styles.planCard(plan.popular, selectedPlan === plan.id)}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div style={styles.popularBadge}>Más popular</div>
              )}
              
              <h3 style={styles.planName}>{plan.name}</h3>
              
              <div style={styles.planPrice}>
                <span style={styles.priceAmount}>€{plan.price}</span>
                <span style={styles.priceCurrency}> EUR</span>
                <p style={styles.priceNote}>Pago único · Acceso permanente</p>
              </div>

              <ul style={styles.featuresList}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={styles.featureItem}>
                    <span style={styles.featureIcon}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                style={styles.ctaButton(plan.popular, loading)}
                onClick={(e) => {
                  e.stopPropagation()
                  handleCheckout(plan.id)
                }}
                disabled={loading}
              >
                {loading ? 'Procesando...' : `Elegir ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div style={styles.guarantee}>
          <div style={styles.guaranteeBadge}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <span style={styles.guaranteeText}>
              Garantía de satisfacción de 14 días. Si no te convence, te devolvemos el dinero.
            </span>
          </div>
        </div>

        {/* ROI Calculator - NEW */}
        <div style={{
          marginTop: '48px',
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
          borderRadius: '20px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>
            💰 Calculadora de ROI
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
            Si este análisis te ayuda a conseguir un trabajo con solo €5.000 más de salario anual...
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '16px'
          }}>
            <div style={{ 
              padding: '20px 32px', 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '12px',
              minWidth: '140px'
            }}>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                Inversión
              </div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#f8fafc' }}>€39</div>
            </div>
            <div style={{ fontSize: '28px', color: 'rgba(255,255,255,0.4)' }}>→</div>
            <div style={{ 
              padding: '20px 32px', 
              background: 'rgba(16, 185, 129, 0.2)', 
              borderRadius: '12px',
              minWidth: '140px'
            }}>
              <div style={{ fontSize: '14px', color: '#10b981', marginBottom: '4px' }}>
                Incremento salarial
              </div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981' }}>€5.000</div>
            </div>
            <div style={{ fontSize: '28px', color: 'rgba(255,255,255,0.4)' }}>=</div>
            <div style={{ 
              padding: '20px 32px', 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))', 
              borderRadius: '12px',
              border: '2px solid #10b981',
              minWidth: '160px'
            }}>
              <div style={{ fontSize: '14px', color: '#10b981', marginBottom: '4px' }}>
                ROI
              </div>
              <div style={{ 
                fontSize: '40px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                12.720%
              </div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            Y eso sin contar el valor de encontrar un trabajo que realmente te motive 🚀
          </p>
        </div>

        {/* Comparison vs alternatives */}
        <div style={styles.comparison}>
          <h3 style={styles.comparisonTitle}>Compara con las alternativas</h3>
          
          <div style={styles.comparisonItem}>
            <span style={styles.comparisonLabel}>Sesión con coach de carrera</span>
            <span style={{ ...styles.comparisonValue, color: 'rgba(255,255,255,0.5)' }}>€150-300</span>
          </div>
          <div style={styles.comparisonItem}>
            <span style={styles.comparisonLabel}>Curso de reorientación profesional</span>
            <span style={{ ...styles.comparisonValue, color: 'rgba(255,255,255,0.5)' }}>€200-500</span>
          </div>
          <div style={styles.comparisonItem}>
            <span style={styles.comparisonLabel}>Carrera IA — Plan Completo</span>
            <span style={styles.comparisonValue}>€39 (una vez)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc'
      }}>
        <p>Cargando...</p>
      </div>
    }>
      <UpgradeContent />
    </Suspense>
  )
}
