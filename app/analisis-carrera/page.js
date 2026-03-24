'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { track } from '../lib/analytics'

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

  const handleCvChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamaño (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setCvError('El archivo es demasiado grande. Máximo 5MB.')
      return
    }

    // Validar tipo
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
        track('cv_upload_success', { filename: file.name })
      } else if (data.fallback === 'email') {
        setCvUrl(null)
        setCvError('Sube el CV correctamente o adjúntalo por email después del pago.')
        track('cv_upload_fallback', { filename: file.name })
      }
    } catch (err) {
      setCvError('Error subiendo el CV. Puedes adjuntarlo por email después.')
      track('cv_upload_error', { error: 'network' })
    }

    setCvUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email) {
      setError('El email es obligatorio')
      return
    }

    track('checkout_start', { product: 'analisis_carrera', price: 29, has_cv: !!cvUrl })
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
        track('checkout_redirect', { product: 'analisis_carrera' })
        window.location.href = data.url
      } else {
        setError('Error al procesar. Inténtalo de nuevo.')
        track('checkout_error', { product: 'analisis_carrera', error: data.error })
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.')
      track('checkout_error', { product: 'analisis_carrera', error: 'network' })
    }

    setLoading(false)
  }

  return (
    <>
      {/* Hero simplificado - sin box verde */}
      <section className="hero" style={{ 
        paddingTop: '40px', 
        paddingBottom: '24px', 
        paddingLeft: '16px', 
        paddingRight: '16px',
        minHeight: 'auto'
      }}>
        <div className="hero-content" style={{ maxWidth: '700px' }}>
          <Link href="/" style={{ 
            color: '#94a3b8', 
            fontSize: '14px', 
            textDecoration: 'none', 
            marginBottom: '16px', 
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px'
          }}>
            ← Volver a inicio
          </Link>

          <span className="badge" style={{ 
            background: '#059669', 
            color: '#fff',
            marginBottom: '12px'
          }}>
            <span className="badge-dot" style={{ background: '#fff' }}></span>
            €29 · Entrega en 48h
          </span>
          
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            marginBottom: '12px'
          }}>
            Análisis de Carrera <span className="highlight">Personalizado</span>
          </h1>
          
          <p className="subtitle" style={{ 
            maxWidth: '600px',
            fontSize: 'clamp(1rem, 3vw, 1.15rem)',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            Un experto analiza tu situación con IA y te entrega un informe completo: 
            tus habilidades reales, 5 roles que encajan contigo, y un plan de acción de 30 días.
          </p>
        </div>
      </section>

      {/* Qué incluye */}
      <section style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', 
          gap: '16px'
        }}>
          
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', color: '#1e293b', fontWeight: '600' }}>Mapa de Habilidades</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              10-15 habilidades que ya tienes (técnicas + interpersonales), con nivel de dominio y dónde son más valiosas.
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💼</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', color: '#1e293b', fontWeight: '600' }}>5 Roles que Encajan</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Roles del mercado real donde tu perfil tiene ventaja, con % de match y qué gaps cubrir para cada uno.
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📋</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', color: '#1e293b', fontWeight: '600' }}>Plan de Acción 30 Días</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Próximos pasos concretos: qué aprender, qué actualizar en tu CV, y cómo posicionarte en el mercado.
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💎</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', color: '#1e293b', fontWeight: '600' }}>Tu Habilidad Oculta</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Esa competencia que usas a diario pero no pones en tu CV porque te parece "obvia". Spoiler: no lo es.
            </p>
          </div>

        </div>
      </section>

      {/* Formulario de compra con CV upload */}
      <section id="formulario" style={{ padding: '40px 16px', maxWidth: '500px', margin: '0 auto', scrollMarginTop: '20px' }}>
        <div className="form-card" style={{ 
          background: '#fff', 
          border: '2px solid #2563eb', 
          boxShadow: '0 4px 24px rgba(37,99,235,0.1)',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          <div className="form-header">
            <h2 className="form-title" style={{ fontSize: '20px', color: '#1e293b' }}>Solicitar mi Análisis</h2>
            <p className="form-subtitle" style={{ fontSize: '14px', marginBottom: '8px', color: '#64748b' }}>
              Completa tus datos y te redirigimos al pago seguro.
            </p>
            <div style={{ 
              display: 'inline-block', 
              background: '#ecfdf5', 
              color: '#059669', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              fontWeight: '700',
              fontSize: '18px'
            }}>
              €29 · Pago único
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
            
            {/* Nombre */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Nombre (opcional)
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Email *
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                LinkedIn (opcional)
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/tu-perfil"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            {/* CV Upload */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Tu CV (PDF o Word · recomendado)
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ 
                  border: cvFile ? '2px solid #059669' : '2px dashed #d1d5db', 
                  borderRadius: '8px', 
                  padding: '20px', 
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: cvFile ? '#f0fdf4' : '#fafafa',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleCvChange}
                  style={{ display: 'none' }}
                />
                {cvUploading ? (
                  <p style={{ margin: 0, color: '#6366f1', fontSize: '14px' }}>Subiendo...</p>
                ) : cvFile ? (
                  <div>
                    <p style={{ margin: '0 0 4px 0', color: '#059669', fontSize: '14px', fontWeight: '600' }}>
                      ✅ {cvFile.name}
                    </p>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                      Haz clic para cambiar
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: '0 0 4px 0', color: '#374151', fontSize: '14px' }}>
                      📄 Haz clic para subir tu CV
                    </p>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
                      PDF o Word · Máx 5MB
                    </p>
                  </div>
                )}
              </div>
              {cvError && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{cvError}</p>
              )}
              <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '12px', lineHeight: '1.5' }}>
                Sin CV, trabajamos con lo que nos cuentes. Pero cuanto más nos des, mejor el análisis.
              </p>
            </div>

            {/* Situación actual */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Cuéntanos tu situación actual (recomendado)
              </label>
              <textarea
                placeholder='Ej: "Llevo 12 años en marketing de una empresa grande. Me pagan bien pero llevo 2 años sintiéndome estancado. No sé si seguir o cambiar de sector."'
                value={formData.situacion_actual}
                onChange={(e) => setFormData({ ...formData, situacion_actual: e.target.value })}
                rows={4}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.5' }}
              />
            </div>

            {error && (
              <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>{error}</p>
            )}

            {/* Garantía visible */}
            <div style={{ 
              background: '#f0fdf4', 
              border: '1px solid #bbf7d0', 
              borderRadius: '8px', 
              padding: '12px', 
              marginTop: '4px'
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#166534', lineHeight: '1.5' }}>
                🔒 <strong>Garantía de satisfacción</strong> — Si no te aporta claridad, te devolvemos el €29. Sin preguntas.
              </p>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ 
                marginTop: '8px', 
                padding: '16px', 
                fontSize: '16px', 
                fontWeight: '600',
                minHeight: '52px',
                width: '100%',
                borderRadius: '8px'
              }}
            >
              {loading ? 'Procesando...' : 'Solicitar mi Análisis por €29 →'}
            </button>

            {/* Seguridad Stripe */}
            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b', textAlign: 'center', lineHeight: '1.4' }}>
              🔐 Pago 100% seguro vía Stripe. No guardamos datos de tarjeta.
            </p>
          </form>

          <div className="form-footer" style={{ marginTop: '16px', color: '#64748b' }}>
            📧 Recibes tu análisis PDF en 48h por email
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section style={{ padding: '40px 16px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '20px', color: '#1e293b', fontWeight: '600' }}>
          Cómo funciona
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ background: '#2563eb', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', flexShrink: 0, fontSize: '14px' }}>1</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>Completas el formulario y pagas</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>Stripe procesa tu pago de forma segura. Recibes confirmación inmediata por email.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ background: '#2563eb', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', flexShrink: 0, fontSize: '14px' }}>2</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>D + IA analiza tu perfil</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>Usamos tu CV y situación para extraer habilidades ocultas y encontrar roles que encajan.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ background: '#059669', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', flexShrink: 0, fontSize: '14px' }}>3</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>Recibes tu análisis en 48h</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>PDF de 5-10 páginas con tu mapa de habilidades, roles recomendados, y plan de acción concreto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 16px', maxWidth: '700px', margin: '0 auto 40px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '20px', color: '#1e293b', fontWeight: '600' }}>
          Preguntas frecuentes
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>¿Por qué €29 y no €200 como un coach?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
              Usamos IA para acelerar el análisis y un experto humano para validar. El resultado es el mismo (o mejor), a una fracción del precio.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>¿Qué pasa si no tengo CV actualizado?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
              No pasa nada. Cuéntanos tu situación en el formulario y trabajamos con eso. El CV enriquece el análisis, pero no es imprescindible.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>¿Y si no me gusta el resultado?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
              Si el análisis no te aporta claridad, te devolvemos el dinero. Sin preguntas. (Hasta ahora: 0 devoluciones solicitadas.)
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 NegoIA · carrera.negoia.com</p>
      </footer>
    </>
  )
}
