'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function AnalisisCarrera() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    linkedin_url: '',
    situacion_actual: ''
  })
  const [cvFile, setCvFile] = useState(null)
  const [cvUploading, setCvUploading] = useState(false)
  const [cvUrl, setCvUrl] = useState(null)
  const [cvError, setCvError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

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
          ...formData,
          cv_url: cvUrl,
          cv_filename: cvFile?.name || null
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
      {/* ========== HERO ========== */}
      <section className="hero" style={{ 
        paddingTop: '40px', 
        paddingBottom: '32px', 
        paddingLeft: '20px', 
        paddingRight: '20px',
        minHeight: 'auto'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link href="/" style={{ 
            color: '#94a3b8', 
            fontSize: '14px', 
            textDecoration: 'none', 
            marginBottom: '20px', 
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px'
          }}>
            ← Volver al inicio
          </Link>

          <span style={{ 
            display: 'inline-block',
            background: 'rgba(34, 197, 94, 0.15)', 
            color: '#22c55e',
            marginBottom: '16px',
            fontSize: '14px',
            padding: '10px 18px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '24px'
          }}>
            €29 · Entrega en 48h · Garantía de satisfacción
          </span>
          
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            marginBottom: '16px',
            color: '#f8fafc',
            fontWeight: '700',
            lineHeight: '1.3'
          }}>
            Análisis de Carrera <span style={{ color: '#818cf8' }}>Personalizado</span>
          </h1>
          
          <p style={{ 
            maxWidth: '600px',
            fontSize: 'clamp(1rem, 3vw, 1.15rem)',
            marginBottom: '0',
            lineHeight: '1.7',
            color: '#94a3b8'
          }}>
            Un experto + IA analiza tu perfil y te entrega: mapa de habilidades, 5 roles que encajan, plan de 30 días.
          </p>
        </div>
      </section>

      {/* ========== QUÉ INCLUYE ========== */}
      <section style={{ padding: '32px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '16px'
          }}>
            
            <div style={{ 
              background: '#13131a', 
              borderRadius: '12px', 
              padding: '20px', 
              border: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#f8fafc', fontWeight: '600' }}>
                Mapa de Habilidades
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                10-15 habilidades que ya tienes, con nivel de dominio.
              </p>
            </div>

            <div style={{ 
              background: '#13131a', 
              borderRadius: '12px', 
              padding: '20px', 
              border: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>💼</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#f8fafc', fontWeight: '600' }}>
                5 Roles que Encajan
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                Roles del mercado donde tu perfil tiene ventaja.
              </p>
            </div>

            <div style={{ 
              background: '#13131a', 
              borderRadius: '12px', 
              padding: '20px', 
              border: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>📋</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#f8fafc', fontWeight: '600' }}>
                Plan de Acción 30 días
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                Próximos pasos concretos para avanzar.
              </p>
            </div>

            <div style={{ 
              background: '#13131a', 
              borderRadius: '12px', 
              padding: '20px', 
              border: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>💎</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#f8fafc', fontWeight: '600' }}>
                Tu Habilidad Oculta
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                Esa competencia que usas pero no valoras.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========== FORMULARIO ========== */}
      <section id="formulario" style={{ padding: '48px 20px', background: '#0a0a0f' }}>
        <div style={{ 
          maxWidth: '480px', 
          margin: '0 auto',
          background: '#1a1a24',
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: '16px',
          padding: '28px 24px',
          boxShadow: '0 4px 24px rgba(99,102,241,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '22px', 
            color: '#f8fafc', 
            marginBottom: '8px',
            fontWeight: '700'
          }}>
            Solicitar mi Análisis
          </h2>
          
          <div style={{ 
            display: 'inline-block', 
            background: 'rgba(34, 197, 94, 0.15)', 
            color: '#22c55e', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            fontWeight: '700',
            fontSize: '18px',
            marginBottom: '24px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            €29 · Pago único
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Nombre */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
                Nombre (opcional)
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
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

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
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

            {/* LinkedIn */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
                LinkedIn (opcional)
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/tu-perfil"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
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

            {/* CV Upload */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
                Tu CV (PDF o Word · recomendado)
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ 
                  border: cvFile ? '2px solid #22c55e' : '2px dashed rgba(255,255,255,0.15)', 
                  borderRadius: '8px', 
                  padding: '20px', 
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: cvFile ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.03)',
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
                      ✅ {cvFile.name}
                    </p>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                      Haz clic para cambiar
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '14px' }}>
                      📄 Haz clic para subir tu CV
                    </p>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                      PDF o Word · Máx 5MB
                    </p>
                  </div>
                )}
              </div>
              {cvError && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{cvError}</p>
              )}
            </div>

            {/* Situación actual */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
                Cuéntanos tu situación actual (recomendado)
              </label>
              <textarea
                placeholder='Ej: "Llevo 12 años en marketing. Me pagan bien pero me siento estancado. No sé si seguir o cambiar."'
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

            {error && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{error}</p>
            )}

            {/* Garantía */}
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)', 
              borderRadius: '8px', 
              padding: '12px'
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#22c55e', lineHeight: '1.5' }}>
                🔒 <strong>Garantía de satisfacción</strong> — Si no te aporta claridad, te devolvemos el €29.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '18px', 
                fontSize: '17px', 
                fontWeight: '600',
                minHeight: '52px',
                width: '100%',
                borderRadius: '10px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? '#4b5563' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
              }}
            >
              {loading ? 'Procesando...' : 'Solicitar mi Análisis por €29 →'}
            </button>

            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', textAlign: 'center', lineHeight: '1.4' }}>
              🔐 Pago 100% seguro vía Stripe · No guardamos datos de tarjeta
            </p>
          </form>
        </div>
      </section>

      {/* ========== CÓMO FUNCIONA ========== */}
      <section style={{ padding: '48px 20px', background: '#13131a' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '22px', color: '#f8fafc', fontWeight: '700' }}>
            Cómo funciona
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#6366f1', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0, fontSize: '14px' }}>1</div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Completas el formulario y pagas</h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Stripe procesa tu pago de forma segura. Confirmación inmediata.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#6366f1', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0, fontSize: '14px' }}>2</div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Analizamos tu perfil con IA</h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Usamos tu CV y situación para extraer habilidades ocultas.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#22c55e', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0, fontSize: '14px' }}>3</div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Recibes tu análisis en 48h</h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>PDF de 5-10 páginas con habilidades, roles y plan de acción.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section style={{ padding: '48px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '28px', fontSize: '22px', color: '#f8fafc', fontWeight: '700' }}>
            Preguntas frecuentes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#13131a', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>¿Por qué €29 y no €200 como un coach?</h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                Usamos IA para acelerar el análisis y un experto humano para validar. El resultado es el mismo (o mejor), a una fracción del precio.
              </p>
            </div>

            <div style={{ background: '#13131a', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>¿Qué pasa si no tengo CV actualizado?</h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                No pasa nada. Cuéntanos tu situación en el formulario y trabajamos con eso. El CV enriquece, pero no es imprescindible.
              </p>
            </div>

            <div style={{ background: '#13131a', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>¿Y si no me gusta el resultado?</h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                Si el análisis no te aporta claridad, te devolvemos el dinero. Sin preguntas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ 
        padding: '24px 20px', 
        background: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
          © 2026 NegoIA · carrera.negoia.com
        </p>
      </footer>
    </>
  )
}
