'use client'
import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const plans = {
  basic: {
    name: 'Plan Básico',
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
    name: 'Plan Completo',
    features: [
      'Acceso completo a todos los roles compatibles',
      'Datos detallados: día a día, pros/contras, salarios',
      'Gap analysis y plan de estudio',
      'CV genérico optimizado (ATS + HR ready)',
      'CVs específicos por cada rol seleccionado',
      'Cartas de presentación personalizadas',
      'Bullets de LinkedIn listos para copiar',
      'Elevator pitch de 30 segundos'
    ]
  }
}

// Simple confetti effect using CSS animations
function Confetti() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const colors = ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']
    const confetti = []
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2
      })
    }
    
    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      confetti.forEach(piece => {
        piece.y += piece.speed
        piece.x += Math.sin(piece.angle) * 0.5
        piece.angle += piece.spin
        
        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate(piece.angle)
        ctx.fillStyle = piece.color
        ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h)
        ctx.restore()
        
        // Reset when off screen
        if (piece.y > canvas.height + 20) {
          piece.y = -20
          piece.x = Math.random() * canvas.width
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Stop after 5 seconds
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }, 5000)
    
    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(timeout)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100
      }}
    />
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const plan = searchParams.get('plan') || 'complete'
  const [showConfetti, setShowConfetti] = useState(true)
  
  const planData = plans[plan] || plans.complete
  const isComplete = plan === 'complete'

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={styles.container}>
      {showConfetti && <Confetti />}
      
      <div style={styles.inner}>
        {/* Success animation */}
        <div style={styles.successIcon}>
          <div style={styles.checkCircle}>
            <span style={styles.checkMark}>✓</span>
          </div>
        </div>

        {/* Main message */}
        <h1 style={styles.title}>¡Pago confirmado!</h1>
        <p style={styles.subtitle}>Tu acceso está activado. Vamos a por ello 🚀</p>

        {/* Plan info card */}
        <div style={styles.planCard}>
          <div style={styles.planHeader}>
            <span style={styles.planBadge}>{planData.name}</span>
            <span style={styles.accessBadge}>Acceso permanente</span>
          </div>
          
          <h3 style={styles.unlockedTitle}>Ahora tienes desbloqueado:</h3>
          <ul style={styles.featuresList}>
            {planData.features.map((feature, i) => (
              <li key={i} style={styles.featureItem}>
                <span style={styles.checkIcon}>✅</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next steps */}
        <div style={styles.stepsCard}>
          <h3 style={styles.stepsTitle}>📋 Próximos pasos</h3>
          <div style={styles.stepsList}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <div>
                <strong>Explora tus roles compatibles</strong>
                <p style={styles.stepDesc}>Mira todos los roles que encajan con tu perfil y elige los que más te interesan</p>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <div>
                <strong>Selecciona tus favoritos</strong>
                <p style={styles.stepDesc}>Añade a favoritos los roles que te gusten para comparar y decidir</p>
              </div>
            </div>
            {isComplete && (
              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div>
                  <strong>Genera tu CV personalizado</strong>
                  <p style={styles.stepDesc}>Crea CVs específicos para cada rol con un clic</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <a 
          href={`/roles?userId=${userId}`}
          style={styles.ctaButton}
        >
          Explorar mis roles compatibles →
        </a>

        {/* Support note */}
        <p style={styles.supportNote}>
          ¿Dudas? Escribe a <a href="mailto:d@negoia.com" style={styles.emailLink}>d@negoia.com</a>
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={styles.container}>
        <div style={styles.loading}>Cargando...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#f8fafc',
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center'
  },
  successIcon: {
    marginBottom: '32px'
  },
  checkCircle: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
    animation: 'scaleIn 0.5s ease-out'
  },
  checkMark: {
    fontSize: '48px',
    color: '#fff',
    fontWeight: '700'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '40px'
  },
  planCard: {
    background: 'rgba(99, 102, 241, 0.08)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '20px',
    padding: '28px',
    marginBottom: '24px',
    textAlign: 'left'
  },
  planHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  planBadge: {
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700'
  },
  accessBadge: {
    background: 'rgba(16, 185, 129, 0.15)',
    color: '#10b981',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600'
  },
  unlockedTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'rgba(255,255,255,0.9)'
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
    fontSize: '14px',
    color: 'rgba(255,255,255,0.85)'
  },
  checkIcon: {
    fontSize: '14px'
  },
  stepsCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '28px',
    marginBottom: '32px',
    textAlign: 'left'
  },
  stepsTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  step: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start'
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    flexShrink: 0
  },
  stepDesc: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)'
  },
  ctaButton: {
    display: 'inline-block',
    width: '100%',
    padding: '20px 40px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '14px',
    fontSize: '18px',
    fontWeight: '700',
    boxShadow: '0 4px 24px rgba(99, 102, 241, 0.4)',
    marginBottom: '24px'
  },
  supportNote: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)'
  },
  emailLink: {
    color: '#6366f1',
    textDecoration: 'none'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#f8fafc'
  }
}

// Add keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes scaleIn {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
  `
  document.head.appendChild(style)
}
