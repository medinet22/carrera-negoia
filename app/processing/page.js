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
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [showSlowMessage, setShowSlowMessage] = useState(false)

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Poll for status with BACKOFF pattern
  // 0-30s: poll every 2s
  // 30-60s: poll every 5s
  // 60s+: poll every 10s + show "taking longer" message
  // 5min+: show error with retry button
  useEffect(() => {
    if (!userId && !jobId) {
      router.push('/start')
      return
    }

    let pollCount = 0
    let timeoutId = null
    const startTime = Date.now()

    const getPollingInterval = () => {
      const elapsed = (Date.now() - startTime) / 1000
      if (elapsed < 30) return 2000      // 0-30s: every 2s
      if (elapsed < 60) return 5000      // 30-60s: every 5s
      return 10000                        // 60s+: every 10s
    }

    const pollStatus = async () => {
      pollCount++
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000)
      setElapsedSeconds(elapsedSec)
      
      // Show slow message after 60s
      if (elapsedSec > 60 && !showSlowMessage) {
        setShowSlowMessage(true)
      }
      
      // Auto-error after 5 minutes
      if (elapsedSec > 300) {
        setError('El análisis está tardando demasiado. Por favor, inténtalo de nuevo.')
        return
      }

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
          return // Stop polling
        } else if (data.status === 'error') {
          setError(data.error || data.message || 'Ha ocurrido un error')
          return // Stop polling
        } else {
          setCurrentStep(data.currentStep || 'processing')
          setSkillsCount(data.skillsCount || 0)
          setRolesMatched(data.rolesMatched || 0)
        }
        
        // Schedule next poll with backoff
        timeoutId = setTimeout(pollStatus, getPollingInterval())
      } catch (err) {
        console.error('Polling error:', err)
        // On network error, retry with longer interval
        timeoutId = setTimeout(pollStatus, 10000)
      }
    }

    // Initial poll
    pollStatus()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [userId, jobId, router, showSlowMessage])

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
    const isTimeout = error.includes('tardando') || error.includes('timeout')
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ ...styles.spinner, background: isTimeout ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            {isTimeout ? '⏰' : '❌'}
          </div>
          <h2 style={styles.title}>{isTimeout ? 'Análisis en progreso' : 'Ha ocurrido un error'}</h2>
          <p style={styles.subtitle}>{error}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                setError(null)
                setElapsedSeconds(0)
                setShowSlowMessage(false)
                // Re-trigger the useEffect by updating state
                window.location.reload()
              }}
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
              🔄 Reintentar
            </button>
            <button 
              onClick={() => router.push('/start')}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Empezar de nuevo
            </button>
          </div>
          {isTimeout && (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>
              A veces el análisis tarda más con CVs largos. Prueba a reintentar.
            </p>
          )}
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
          <div style={{ marginTop: '24px' }}>
            <p style={styles.loadingDots}>
              {showSlowMessage 
                ? `⏳ Esto está tardando más de lo esperado... (${elapsedSeconds}s)`
                : 'Esto suele tardar entre 30 segundos y 2 minutos'}
            </p>
            {showSlowMessage && (
              <p style={{ 
                fontSize: '13px', 
                color: 'rgba(255,255,255,0.4)', 
                marginTop: '8px' 
              }}>
                No cierres esta página. Si pasan más de 5 minutos, podrás reintentar.
              </p>
            )}
          </div>
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
