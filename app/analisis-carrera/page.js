'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function AnalisisCarreraContent() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan') || searchParams.get('pack')
  
  const [selectedPlan, setSelectedPlan] = useState(planParam === 'completo' ? 'completo' : 'basico')
  const [formData, setFormData] = useState({
    email: '',
    situacion_actual: ''
  })
  const [cvFile, setCvFile] = useState(null)
  const [cvUploading, setCvUploading] = useState(false)
  const [cvUrl, setCvUrl] = useState(null)
  const [cvError, setCvError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (planParam === 'completo') {
      setSelectedPlan('completo')
    } else if (planParam === 'basico') {
      setSelectedPlan('basico')
    }
  }, [planParam])

  const plans = {
    basico: {
      nombre: 'Plan Básico',
      precio: 29,
      entrega: '48h',
      items: [
        'Acceso a todos los roles con datos completos',
        'Salarios por país, día a día real, pros/contras',
        'Sistema de selección y descarte',
        'Gap analysis por cada rol',
        'Plan de estudio concreto',
        'Entrega en 48h'
      ]
    },
    completo: {
      nombre: 'Plan Completo',
      precio: 39,
      entrega: '24h',
      items: [
        'Todo lo del Plan Básico +',
        'CV genérico ATS-ready',
        'CVs específicos por rol seleccionado',
        'Cartas de presentación personalizadas',
        'Bullets de LinkedIn optimizados',
        'Elevator pitch escrito',
        'Entrega prioritaria en 24h'
      ]
    }
  }

  const currentPlan = plans[selectedPlan]

  const inputStyles = {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#f8fafc',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  }

  const handleCvChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setCvError('El archivo es demasiado grande. Máximo 5MB.')
      return
    }

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(file.type)) {
      setCvError('Solo aceptamos PDF o Word (.doc, .docx)')
      return
    }

    setCvFile(file)
    setCvError('')
    setCvUploading(true)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const res = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formDataUpload
      })

      const data = await res.json()

      if (data.url) {
        setCvUrl(data.url)
      } else {
        setCvUrl(null)
        setCvError('Error subiendo el CV. Puedes adjuntarlo por email después.')
      }
    } catch (err) {
      setCvError('Error subiendo el CV. Puedes adjuntarlo por email después.')
    }

    setCvUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email) {
      setError('El email es obligatorio')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout-analisis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          situacion_actual: formData.situacion_actual,
          cv_url: cvUrl,
          cv_filename: cvFile?.name || null,
          pack: selectedPlan,
          precio: currentPlan.precio
        })
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Error al procesar. Inténtalo de nuevo.')
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.')
    }

    setLoading(false)
  }

  return (
    <>
      <section style={{ 
        minHeight: '100vh',
        padding: '40px 20px',
        background: '#0a0a0f'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Back link */}
          <Link href="/" style={{ 
            color: '#94a3b8', 
            fontSize: '14px', 
            textDecoration: 'none', 
            marginBottom: '32px', 
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px'
          }}>
            ← Volver al inicio
          </Link>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#f8fafc', 
              marginBottom: '12px',
              fontWeight: '700'
            }}>
              Desbloquea tu análisis completo
            </h1>
            <p style={{ 
              color: '#94a3b8', 
              fontSize: '16px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Accede a todos los roles, datos de salarios, gap analysis, y documentos listos para aplicar.
            </p>
            {/* Social proof badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '16px',
              padding: '8px 14px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: '20px',
              fontSize: '13px',
              color: '#a5b4fc'
            }}>
              <span style={{ fontSize: '14px' }}>📊</span>
              <span>12 profesionales esta semana</span>
            </div>
          </div>

          {/* Grid layout */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            
            {/* Columna izquierda - Selección de plan + Lo que recibes */}
            <div>
              {/* Selector de Plan */}
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  color: '#f8fafc', 
                  marginBottom: '16px',
                  fontWeight: '600'
                }}>
                  Elige tu plan
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Plan Básico */}
                  <div 
                    onClick={() => setSelectedPlan('basico')}
                    style={{ 
                      background: selectedPlan === 'basico' ? 'rgba(99,102,241,0.1)' : '#13131a',
                      border: selectedPlan === 'basico' ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ 
                        width: '22px', 
                        height: '22px', 
                        borderRadius: '50%', 
                        border: selectedPlan === 'basico' ? '6px solid #6366f1' : '2px solid rgba(255,255,255,0.3)',
                        background: selectedPlan === 'basico' ? '#fff' : 'transparent',
                        transition: 'all 0.2s'
                      }} />
                      <div>
                        <p style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Plan Básico</p>
                        <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Todos los roles + datos + gap analysis</p>
                      </div>
                    </div>
                    <span style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700' }}>€29</span>
                  </div>

                  {/* Plan Completo */}
                  <div 
                    onClick={() => setSelectedPlan('completo')}
                    style={{ 
                      background: selectedPlan === 'completo' ? 'rgba(99,102,241,0.1)' : '#13131a',
                      border: selectedPlan === 'completo' ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    <span style={{ 
                      position: 'absolute',
                      top: '-10px',
                      right: '16px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Más elegido</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ 
                        width: '22px', 
                        height: '22px', 
                        borderRadius: '50%', 
                        border: selectedPlan === 'completo' ? '6px solid #6366f1' : '2px solid rgba(255,255,255,0.3)',
                        background: selectedPlan === 'completo' ? '#fff' : 'transparent',
                        transition: 'all 0.2s'
                      }} />
                      <div>
                        <p style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Plan Completo</p>
                        <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Todo + CVs + cartas + prioridad 24h</p>
                      </div>
                    </div>
                    <span style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700' }}>€39</span>
                  </div>
                </div>
              </div>

              {/* Lo que recibes */}
              <div style={{ 
                position: 'sticky',
                top: '40px'
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  color: '#f8fafc', 
                  marginBottom: '18px',
                  fontWeight: '600'
                }}>
                  Lo que recibes con el {currentPlan.nombre}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {currentPlan.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0 }}>✓</span>
                      <span style={{ color: '#e2e8f0', fontSize: '15px', lineHeight: '1.5' }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Comparativa */}
                <div style={{ 
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  marginBottom: '20px'
                }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#c7d2fe', lineHeight: '1.5' }}>
                    <strong>Un coach de carrera cobra €300/sesión.</strong> Sin garantías. Sin entrega concreta.
                  </p>
                </div>

                {/* Garantía */}
                <div style={{ 
                  background: 'rgba(34, 197, 94, 0.08)', 
                  border: '1px solid rgba(34, 197, 94, 0.2)', 
                  borderRadius: '12px', 
                  padding: '16px 18px'
                }}>
                  <p style={{ margin: '0 0 6px 0', color: '#22c55e', fontSize: '14px', fontWeight: '600' }}>
                    🛡️ Garantía sin preguntas
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                    Si no encuentras valor → te devolvemos el dinero. Sin formulario.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha - Formulario */}
            <div style={{ 
              background: '#13131a',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '20px',
              padding: '32px 28px',
              boxShadow: '0 4px 24px rgba(99,102,241,0.08)'
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                color: '#f8fafc', 
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                Completa tu pedido
              </h3>
              <p style={{ 
                color: '#64748b', 
                fontSize: '14px', 
                marginBottom: '24px' 
              }}>
                Estos datos nos ayudan a personalizar tu análisis
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#f8fafc', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={inputStyles}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Situación actual */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#f8fafc', marginBottom: '8px' }}>
                    Cuéntanos tu situación (opcional)
                  </label>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', lineHeight: '1.5' }}>
                    ¿Qué te hizo buscar un análisis de carrera? Esto nos ayuda a personalizar mejor.
                  </p>
                  <textarea
                    placeholder="Ej: 12 años en marketing, me siento estancado y no sé si seguir en el mismo sector..."
                    value={formData.situacion_actual}
                    onChange={(e) => setFormData({ ...formData, situacion_actual: e.target.value })}
                    rows={4}
                    style={{ 
                      ...inputStyles, 
                      resize: 'vertical', 
                      lineHeight: '1.5' 
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#f8fafc', marginBottom: '8px' }}>
                    CV (opcional, pero recomendado)
                  </label>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px', lineHeight: '1.5' }}>
                    Lo usamos para identificar habilidades ocultas. No tiene que estar actualizado.
                  </p>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ 
                      border: cvFile ? '2px solid #22c55e' : '2px dashed rgba(255,255,255,0.15)', 
                      borderRadius: '10px', 
                      padding: '24px', 
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: cvFile ? 'rgba(34, 197, 94, 0.06)' : 'rgba(255,255,255,0.02)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      style={{ display: 'none' }}
                    />
                    {cvUploading ? (
                      <p style={{ margin: 0, color: '#6366f1', fontSize: '14px' }}>Subiendo...</p>
                    ) : cvFile ? (
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#22c55e', fontSize: '14px', fontWeight: '600' }}>
                          ✓ {cvFile.name}
                        </p>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                          Clic para cambiar
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '14px' }}>
                          Clic para subir tu CV
                        </p>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                          PDF o Word · Máx 5MB
                        </p>
                      </div>
                    )}
                  </div>
                  {cvError && (
                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>{cvError}</p>
                  )}
                </div>

                {error && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{error}</p>
                )}

                {/* Resumen del pedido */}
                <div style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '10px', 
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '14px' }}>{currentPlan.nombre}</span>
                    <span style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700' }}>€{currentPlan.precio}</span>
                  </div>
                  <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '12px' }}>
                    Entrega en {currentPlan.entrega} · Pago único · Garantía de devolución
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    padding: '18px', 
                    fontSize: '17px', 
                    fontWeight: '600',
                    minHeight: '58px',
                    width: '100%',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    background: loading ? '#4b5563' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: '#fff',
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
                    marginTop: '4px',
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Procesando...' : `Pagar €${currentPlan.precio} → ${currentPlan.nombre}`}
                </button>

                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', textAlign: 'center', lineHeight: '1.4' }}>
                  Pago 100% seguro vía Stripe · No guardamos datos de tarjeta
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ 
        padding: '32px 20px', 
        background: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <p style={{ textAlign: 'center', color: '#475569', fontSize: '13px', margin: 0 }}>
          © 2026 NegoIA · carrera.negoia.com
        </p>
      </footer>
    </>
  )
}

function LoadingFallback() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0f'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid rgba(99,102,241,0.2)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Cargando...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default function AnalisisCarrera() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnalisisCarreraContent />
    </Suspense>
  )
}
