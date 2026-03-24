'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function UpgradeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('basic')

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

  const handleCheckout = async (plan) => {
    if (!userId) {
      router.push('/start')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout-platform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plan })
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error iniciando el pago. Inténtalo de nuevo.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Error de conexión')
    } finally {
      setLoading(false)
    }
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
        {/* Sunk cost message */}
        <div style={styles.sunkCost}>
          <p style={styles.sunkCostText}>
            ⏱️ Ya has invertido 15 minutos en tu análisis de carrera. No dejes que se pierda.
          </p>
        </div>

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
