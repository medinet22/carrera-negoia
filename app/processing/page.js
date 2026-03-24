'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function ProcessingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  const jobId = searchParams.get('jobId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_job_id') : null)
  
  const [status, setStatus] = useState('processing')
  const [currentStep, setCurrentStep] = useState('extracting_skills')
  const [skillsCount, setSkillsCount] = useState(0)
  const [rolesMatched, setRolesMatched] = useState(0)
  const [error, setError] = useState(null)
  const [dots, setDots] = useState('')

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Poll for status
  useEffect(() => {
    if (!userId && !jobId) {
      router.push('/start')
      return
    }

    const pollStatus = async () => {
      try {
        const params = new URLSearchParams()
        if (jobId) params.set('jobId', jobId)
        if (userId) params.set('userId', userId)
        
        const res = await fetch(`/api/process-assessment?${params}`)
        const data = await res.json()

        if (data.status === 'done') {
          setStatus('done')
          setCurrentStep('completed')
          setSkillsCount(data.skillsCount || 0)
          setRolesMatched(data.rolesMatched || 0)
          
          // Redirect after a moment to show completion
          setTimeout(() => {
            router.push(`/profile?userId=${userId}`)
          }, 1500)
        } else if (data.status === 'error') {
          setError(data.error || 'Ha ocurrido un error')
        } else {
          setCurrentStep(data.currentStep || 'processing')
          setSkillsCount(data.skillsCount || 0)
          setRolesMatched(data.rolesMatched || 0)
        }
      } catch (err) {
        console.error('Polling error:', err)
      }
    }

    // Initial poll
    pollStatus()

    // Continue polling every 2 seconds
    const interval = setInterval(pollStatus, 2000)
    return () => clearInterval(interval)
  }, [userId, jobId, router])

  const steps = [
    { id: 'extracting_skills', label: 'Analizando tu CV', icon: '📄' },
    { id: 'generating_map', label: 'Extrayendo habilidades', icon: '🔍' },
    { id: 'matching_roles', label: 'Generando tu Mapa', icon: '🗺️' },
    { id: 'completed', label: 'Calculando compatibilidad con roles', icon: '🎯' }
  ]

  const getStepStatus = (stepId) => {
    const stepOrder = ['extracting_skills', 'generating_map', 'matching_roles', 'completed']
    const currentIndex = stepOrder.indexOf(currentStep)
    const stepIndex = stepOrder.indexOf(stepId)
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return status === 'done' ? 'completed' : 'active'
    return 'pending'
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      maxWidth: '500px',
      width: '100%',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '24px',
      padding: '48px 40px',
      border: '1px solid rgba(255,255,255,0.05)',
      textAlign: 'center'
    },
    spinner: {
      width: '80px',
      height: '80px',
      margin: '0 auto 32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      animation: status === 'done' ? 'none' : 'pulse 2s infinite'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#f8fafc',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '40px'
    },
    stepsContainer: {
      textAlign: 'left',
      marginBottom: '32px'
    },
    step: (stepStatus) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      marginBottom: '8px',
      borderRadius: '12px',
      background: stepStatus === 'active' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
      border: stepStatus === 'active' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }),
    stepIcon: (stepStatus) => ({
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      background: stepStatus === 'completed' ? 'linear-gradient(135deg, #10b981, #059669)' :
                  stepStatus === 'active' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' :
                  'rgba(255,255,255,0.1)',
      color: '#fff'
    }),
    stepLabel: (stepStatus) => ({
      fontSize: '15px',
      fontWeight: stepStatus === 'active' ? '600' : '400',
      color: stepStatus === 'pending' ? 'rgba(255,255,255,0.4)' : '#f8fafc'
    }),
    counter: {
      display: 'inline-block',
      padding: '12px 20px',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      marginTop: '16px'
    },
    counterNumber: {
      fontSize: '24px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    counterLabel: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.6)',
      marginLeft: '8px'
    },
    loadingDots: {
      marginTop: '24px',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)'
    }
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ ...styles.spinner, background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            ❌
          </div>
          <h2 style={styles.title}>Ha ocurrido un error</h2>
          <p style={styles.subtitle}>{error}</p>
          <button 
            onClick={() => router.push('/start')}
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
      
      <div style={styles.card}>
        <div style={styles.spinner}>
          {status === 'done' ? '✅' : '🧠'}
        </div>
        
        <h2 style={styles.title}>
          {status === 'done' ? '¡Listo!' : 'Analizando tu perfil'}
        </h2>
        <p style={styles.subtitle}>
          {status === 'done' 
            ? 'Tu Mapa de Habilidades está listo. Redirigiendo...' 
            : 'Nuestra IA está trabajando en tu Mapa de Habilidades'}
        </p>

        <div style={styles.stepsContainer}>
          {steps.map((step) => {
            const stepStatus = getStepStatus(step.id)
            return (
              <div key={step.id} style={styles.step(stepStatus)}>
                <div style={styles.stepIcon(stepStatus)}>
                  {stepStatus === 'completed' ? '✓' : step.icon}
                </div>
                <span style={styles.stepLabel(stepStatus)}>
                  {step.label}
                  {stepStatus === 'active' && dots}
                </span>
              </div>
            )
          })}
        </div>

        {skillsCount > 0 && (
          <div style={styles.counter}>
            <span style={styles.counterNumber}>{skillsCount}</span>
            <span style={styles.counterLabel}>habilidades identificadas</span>
          </div>
        )}

        {rolesMatched > 0 && (
          <div style={{ ...styles.counter, marginLeft: '12px' }}>
            <span style={styles.counterNumber}>{rolesMatched}</span>
            <span style={styles.counterLabel}>roles analizados</span>
          </div>
        )}

        {status !== 'done' && (
          <p style={styles.loadingDots}>
            Esto suele tardar entre 30 segundos y 2 minutos
          </p>
        )}
      </div>
    </div>
  )
}

export default function ProcessingPage() {
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
      <ProcessingContent />
    </Suspense>
  )
}
