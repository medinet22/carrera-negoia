'use client'
import { useState } from 'react'
import Link from 'next/link'
import { track } from '../lib/analytics'

export default function AnalisisCarrera() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    situacion_actual: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email) {
      setError('El email es obligatorio')
      return
    }

    track('checkout_start', { product: 'analisis_carrera', price: 29 })
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout-analisis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
      {/* Hero */}
      <section className="hero" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        <div className="hero-content">
          <Link href="/" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Volver a inicio
          </Link>

          <span className="badge" style={{ background: '#059669', color: '#fff' }}>
            <span className="badge-dot" style={{ background: '#fff' }}></span>
            Entrega en 48h — Solo €29
          </span>
          
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
            Análisis de Carrera <span className="highlight">Personalizado</span>
          </h1>
          
          <p className="subtitle" style={{ maxWidth: '600px' }}>
            Un experto analiza tu situación con IA y te entrega un informe completo: 
            tus habilidades reales, 5 roles que encajan contigo, y un plan de acción de 30 días.
          </p>
        </div>
      </section>

      {/* Qué incluye */}
      <section style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🎯</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>Mapa de Habilidades</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              10-15 habilidades que ya tienes (técnicas + interpersonales), con nivel de dominio y dónde son más valiosas.
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>💼</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>5 Roles que Encajan</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Roles del mercado real donde tu perfil tiene ventaja, con % de match y qué gaps cubrir para cada uno.
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📋</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>Plan de Acción 30 Días</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Próximos pasos concretos: qué aprender, qué actualizar en tu CV, y cómo posicionarte en el mercado.
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>💎</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>Tu Habilidad Oculta</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Esa competencia que usas a diario pero no pones en tu CV porque te parece "obvia". Spoiler: no lo es.
            </p>
          </div>

        </div>
      </section>

      {/* Formulario de compra */}
      <section style={{ padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <div className="form-card" style={{ background: '#fff', border: '2px solid #2563eb', boxShadow: '0 4px 24px rgba(37,99,235,0.1)' }}>
          <div className="form-header">
            <h2 className="form-title" style={{ fontSize: '20px' }}>Solicitar mi Análisis</h2>
            <p className="form-subtitle" style={{ fontSize: '14px', marginBottom: '8px' }}>
              Completa tus datos y te redirigimos al pago seguro.
            </p>
            <div style={{ 
              display: 'inline-block', 
              background: '#ecfdf5', 
              color: '#059669', 
              padding: '6px 12px', 
              borderRadius: '6px', 
              fontWeight: '600',
              fontSize: '16px'
            }}>
              €29 · Pago único
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Nombre (opcional)
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }}
              />
            </div>

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
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Cuéntanos tu situación actual (opcional)
              </label>
              <textarea
                placeholder="Ej: Llevo 12 años en banca, me siento estancado y no sé qué roles me permitirían usar mis habilidades de otra forma..."
                value={formData.situacion_actual}
                onChange={(e) => setFormData({ ...formData, situacion_actual: e.target.value })}
                rows={4}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', resize: 'vertical' }}
              />
            </div>

            {error && (
              <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>{error}</p>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ marginTop: '8px', padding: '14px', fontSize: '16px' }}
            >
              {loading ? 'Procesando...' : 'Pagar €29 y solicitar análisis →'}
            </button>
          </form>

          <div className="form-footer" style={{ marginTop: '16px' }}>
            🔒 Pago seguro con Stripe · Entrega en 48h por email
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '22px', color: '#1e293b' }}>
          Cómo funciona
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ background: '#2563eb', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', flexShrink: 0 }}>1</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>Completas el formulario y pagas</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Stripe procesa tu pago de forma segura. Recibes confirmación inmediata por email.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ background: '#2563eb', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', flexShrink: 0 }}>2</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>Nos envías tu CV (opcional)</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Responde al email de confirmación con tu CV adjunto. Si no tienes, trabajamos con lo que nos contaste.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ background: '#059669', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', flexShrink: 0 }}>3</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>Recibes tu análisis en 48h</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>PDF de 5-10 páginas con tu mapa de habilidades, roles recomendados, y plan de acción concreto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto 60px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '22px', color: '#1e293b' }}>
          Preguntas frecuentes
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>¿Por qué €29 y no €200 como un coach?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              Usamos IA para acelerar el análisis y un experto humano para validar. El resultado es el mismo (o mejor), a una fracción del precio.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>¿Qué pasa si no tengo CV actualizado?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
              No pasa nada. Cuéntanos tu situación en el formulario y trabajamos con eso. El CV enriquece el análisis, pero no es imprescindible.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>¿Y si no me gusta el resultado?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
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
