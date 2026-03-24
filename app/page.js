import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ========== HERO - DARK THEME ========== */}
      <section className="hero" style={{ 
        paddingTop: '60px', 
        paddingBottom: '60px',
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: 'auto'
      }}>
        <div className="hero-content" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <span className="badge" style={{ 
            background: 'rgba(34, 197, 94, 0.15)', 
            color: '#22c55e',
            marginBottom: '24px',
            fontSize: '14px',
            padding: '10px 18px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '24px',
            display: 'inline-block'
          }}>
            Análisis de Carrera con IA — €29 · Entrega en 48h
          </span>
          
          {/* H1 */}
          <h1 style={{ 
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            marginBottom: '20px',
            lineHeight: '1.3',
            color: '#f8fafc',
            fontWeight: '700'
          }}>
            ¿Llevas años trabajando y no sabes exactamente <span style={{ color: '#818cf8' }}>para qué eres bueno</span>?
          </h1>
          
          {/* Subtitle */}
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.15rem)',
            marginBottom: '32px',
            lineHeight: '1.7',
            color: '#94a3b8',
            maxWidth: '560px',
            margin: '0 auto 32px auto'
          }}>
            Mandas tu CV y tu situación actual. En 48h recibes un informe completo: tus habilidades reales, 5 roles que encajan contigo, y un plan de acción de 30 días.
          </p>

          {/* Beneficios */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '14px', 
            marginBottom: '32px',
            textAlign: 'left',
            maxWidth: '440px',
            margin: '0 auto 32px auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>✅</span>
              <span style={{ color: '#f8fafc', fontSize: '15px', lineHeight: '1.5' }}>
                Tus 10-15 habilidades reales (incluyendo las que no sabes que tienes)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>✅</span>
              <span style={{ color: '#f8fafc', fontSize: '15px', lineHeight: '1.5' }}>
                5 roles del mercado donde tienes ventaja competitiva
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>✅</span>
              <span style={{ color: '#f8fafc', fontSize: '15px', lineHeight: '1.5' }}>
                Plan de acción concreto de 30 días
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/analisis-carrera"
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
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
            }}
          >
            → Quiero mi Análisis de Carrera — €29
          </Link>

          {/* Subtexto */}
          <p style={{ 
            marginTop: '14px', 
            fontSize: '13px', 
            color: '#64748b',
            textAlign: 'center'
          }}>
            Entrega en 48h · Garantía de satisfacción · Pago seguro
          </p>

        </div>
      </section>

      {/* ========== CÓMO FUNCIONA ========== */}
      <section style={{ 
        padding: '60px 20px', 
        background: '#13131a'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '40px', 
            fontSize: '24px', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Cómo funciona
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ 
                background: '#6366f1', 
                color: '#fff', 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700', 
                flexShrink: 0,
                fontSize: '18px'
              }}>📝</div>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '17px', fontWeight: '600' }}>
                  Rellenas el formulario (2 min)
                </h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>
                  Cuéntanos tu situación y sube tu CV si tienes
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ 
                background: '#6366f1', 
                color: '#fff', 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700', 
                flexShrink: 0,
                fontSize: '18px'
              }}>🔍</div>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '17px', fontWeight: '600' }}>
                  Analizamos tu perfil con IA (48h)
                </h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>
                  Extraemos habilidades ocultas y encontramos tu ventaja real
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ 
                background: '#22c55e', 
                color: '#fff', 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: '700', 
                flexShrink: 0,
                fontSize: '18px'
              }}>📬</div>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '17px', fontWeight: '600' }}>
                  Recibes tu informe PDF
                </h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>
                  Con mapa de habilidades, roles recomendados y plan de acción
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIO ========== */}
      <section style={{ 
        padding: '60px 20px', 
        background: '#0a0a0f'
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ 
            fontStyle: 'italic', 
            color: '#94a3b8', 
            fontSize: '17px', 
            lineHeight: '1.8',
            marginBottom: '16px'
          }}>
            "Descubrí habilidades de gestión que tenía y nunca había valorado. El plan de 30 días me ayudó a pedir el ascenso que llevaba 2 años postergando."
          </p>
          <p style={{ 
            color: '#64748b', 
            fontSize: '14px', 
            margin: 0
          }}>
            — Laura M., 41 años, Marketing Manager
          </p>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section style={{ 
        padding: '60px 20px', 
        background: '#13131a',
        borderTop: '1px solid rgba(99, 102, 241, 0.2)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '24px', 
            marginBottom: '20px', 
            color: '#f8fafc',
            fontWeight: '700',
            lineHeight: '1.4'
          }}>
            ¿Listo para saber para qué eres realmente bueno?
          </h2>
          
          <Link
            href="/analisis-carrera"
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
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
            }}
          >
            → Quiero mi Análisis de Carrera — €29
          </Link>

          {/* Garantía */}
          <p style={{ 
            marginTop: '16px', 
            fontSize: '14px', 
            color: '#22c55e',
            textAlign: 'center'
          }}>
            🔒 Si el análisis no te aporta claridad → devolvemos el €29. Sin preguntas.
          </p>
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
