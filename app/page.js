'use client'
import Link from 'next/link'
import { track } from './lib/analytics'

export default function Home() {
  return (
    <>
      {/* ========== HERO - UN SOLO CTA ========== */}
      <section className="hero" style={{ 
        paddingTop: '48px', 
        paddingBottom: '40px',
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: 'auto',
        background: 'linear-gradient(to bottom, #f8fafc, #ffffff)'
      }}>
        <div className="hero-content" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <span className="badge" style={{ 
            background: '#059669', 
            color: '#fff',
            marginBottom: '20px',
            fontSize: '14px',
            padding: '8px 16px'
          }}>
            Análisis de Carrera con IA — €29 · Entrega en 48h
          </span>
          
          {/* H1 - Gancho emocional */}
          <h1 style={{ 
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            marginBottom: '16px',
            lineHeight: '1.25',
            color: '#1e293b',
            fontWeight: '700'
          }}>
            ¿Llevas años trabajando y no sabes exactamente <span className="highlight">para qué eres bueno</span>?
          </h1>
          
          {/* Subtitle - Propuesta clara */}
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.15rem)',
            marginBottom: '28px',
            lineHeight: '1.65',
            color: '#475569',
            maxWidth: '560px',
            margin: '0 auto 28px auto'
          }}>
            Mandas tu CV + tu situación. En 48h recibes: tus habilidades reales, 
            5 roles que encajan contigo, y un plan de 30 días. Todo por €29.
          </p>

          {/* Beneficios - 3 items */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            marginBottom: '28px',
            textAlign: 'left',
            maxWidth: '400px',
            margin: '0 auto 28px auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
              <span style={{ color: '#374151', fontSize: '15px', lineHeight: '1.5' }}>
                Tus 10-15 habilidades reales (incluyendo las que no sabes que tienes)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
              <span style={{ color: '#374151', fontSize: '15px', lineHeight: '1.5' }}>
                5 roles del mercado donde tienes ventaja
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
              <span style={{ color: '#374151', fontSize: '15px', lineHeight: '1.5' }}>
                Plan de acción concreto de 30 días
              </span>
            </div>
          </div>

          {/* CTA ÚNICO */}
          <Link
            href="/analisis-carrera"
            className="btn btn-primary"
            style={{ 
              display: 'block',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              padding: '18px 24px',
              fontSize: '17px',
              fontWeight: '600',
              textDecoration: 'none',
              textAlign: 'center',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
            onClick={() => track('cta_click', { cta_id: 'hero_main_cta', destination: '/analisis-carrera' })}
          >
            → Quiero mi Análisis de Carrera €29
          </Link>

          {/* Subtexto bajo CTA */}
          <p style={{ 
            marginTop: '12px', 
            fontSize: '13px', 
            color: '#64748b',
            textAlign: 'center'
          }}>
            Entrega en 48h. Garantía total de satisfacción.
          </p>

        </div>
      </section>

      {/* ========== PRUEBA SOCIAL ========== */}
      <section style={{ 
        padding: '32px 20px', 
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ 
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            <div style={{ fontSize: '32px', position: 'absolute', top: '-12px', left: '20px' }}>"</div>
            <p style={{ 
              fontStyle: 'italic', 
              color: '#374151', 
              fontSize: '15px', 
              lineHeight: '1.7',
              marginBottom: '12px',
              paddingTop: '8px'
            }}>
              Descubrí que tenía habilidades de gestión que nunca había puesto en valor. 
              El plan de 30 días me ayudó a pedir el ascenso que llevaba 2 años postergando.
            </p>
            <p style={{ 
              color: '#64748b', 
              fontSize: '13px', 
              margin: 0,
              fontWeight: '500'
            }}>
              — Laura M., 41 años
            </p>
            <p style={{ 
              color: '#94a3b8', 
              fontSize: '11px', 
              margin: '4px 0 0 0',
              fontStyle: 'italic'
            }}>
              Testimonio representativo del resultado esperado
            </p>
          </div>
        </div>
      </section>

      {/* ========== CÓMO FUNCIONA ========== */}
      <section style={{ padding: '48px 20px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '32px', 
          fontSize: '22px', 
          color: '#1e293b', 
          fontWeight: '700'
        }}>
          Cómo funciona
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ 
              background: '#6366f1', 
              color: '#fff', 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '700', 
              flexShrink: 0,
              fontSize: '16px'
            }}>1</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>
                Mandas tu CV y situación actual
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                2 minutos. Cuéntanos dónde estás y qué te preocupa.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ 
              background: '#6366f1', 
              color: '#fff', 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '700', 
              flexShrink: 0,
              fontSize: '16px'
            }}>2</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>
                D + IA analiza tu perfil en profundidad
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Extraemos habilidades ocultas, identificamos patrones, y encontramos tu ventaja.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ 
              background: '#059669', 
              color: '#fff', 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '700', 
              flexShrink: 0,
              fontSize: '16px'
            }}>3</div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>
                Recibes tu informe PDF en 48h
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Habilidades, roles, plan de acción. Accionable desde el minuto 1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GARANTÍA ========== */}
      <section style={{ 
        padding: '32px 20px', 
        background: '#f0fdf4',
        borderTop: '1px solid #bbf7d0',
        borderBottom: '1px solid #bbf7d0'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ 
            margin: 0, 
            fontSize: '16px', 
            color: '#166534',
            lineHeight: '1.6'
          }}>
            🔒 <strong>Garantía total:</strong> Si no te aporta claridad → te devolvemos el €29. Sin preguntas.
          </p>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section style={{ padding: '48px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '22px', 
            marginBottom: '16px', 
            color: '#1e293b',
            fontWeight: '700'
          }}>
            Deja de adivinar.<br/>
            <span className="highlight">Empieza a saber.</span>
          </h2>
          
          <Link
            href="/analisis-carrera"
            className="btn btn-primary"
            style={{ 
              display: 'block',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              padding: '18px 24px',
              fontSize: '17px',
              fontWeight: '600',
              textDecoration: 'none',
              textAlign: 'center',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
            onClick={() => track('cta_click', { cta_id: 'footer_main_cta', destination: '/analisis-carrera' })}
          >
            → Quiero mi Análisis de Carrera €29
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ padding: '24px 20px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
          © 2026 NegoIA · carrera.negoia.com
        </p>
      </footer>
    </>
  )
}
