import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ========== SECCIÓN 1: HERO ========== */}
      <section style={{ 
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 60px',
        background: '#0a0a0f'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <span style={{ 
            display: 'inline-block',
            background: 'rgba(99, 102, 241, 0.1)', 
            color: '#a5b4fc',
            marginBottom: '28px',
            fontSize: '13px',
            padding: '10px 20px',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '100px',
            fontWeight: '500',
            letterSpacing: '0.02em'
          }}>
            Plataforma interactiva de carrera · No es un PDF
          </span>
          
          {/* H1 */}
          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            marginBottom: '24px',
            lineHeight: '1.15',
            color: '#f8fafc',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Llevas años trabajando.{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Aún no sabes para qué eres realmente bueno.</span>
          </h1>
          
          {/* Subtítulo */}
          <p style={{ 
            fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
            lineHeight: '1.7',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto 24px auto'
          }}>
            En 15 minutos descubre tu Mapa de Habilidades <strong style={{ color: '#22c55e' }}>gratis</strong>. 
            Después explora roles donde encajas, selecciona los que te interesan, y genera tus CVs cuando estés listo.
          </p>

          {/* Anchor de valor: comparativa con coach */}
          <p style={{ 
            fontSize: '14px',
            color: '#fbbf24',
            marginBottom: '32px',
            padding: '10px 20px',
            background: 'rgba(251,191,36,0.08)',
            border: '1px solid rgba(251,191,36,0.2)',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            💡 Lo que un coach cobra en €300 por sesión, aquí desde €29 (pago único)
          </p>

          {/* CTAs */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '28px'
          }}>
            <Link
              href="/start"
              style={{ 
                display: 'inline-block',
                padding: '18px 48px',
                fontSize: '17px',
                fontWeight: '600',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(99, 102, 241, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Descubrir para qué soy bueno → Gratis
            </Link>
            <a
              href="#como-funciona"
              style={{ 
                color: '#a5b4fc',
                fontSize: '15px',
                textDecoration: 'none',
                padding: '8px 16px',
                transition: 'color 0.2s'
              }}
            >
              Ver cómo funciona la plataforma
            </a>
          </div>

          {/* Trust signals */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '28px', 
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Tu Mapa de Habilidades gratis
            </span>
            <span style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Explora roles interactivamente
            </span>
            <span style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Vuelve cuando quieras
            </span>
          </div>

        </div>
      </section>

      {/* ========== SECCIÓN 2: SOCIAL PROOF / NÚMEROS ========== */}
      <section style={{ 
        padding: '64px 20px', 
        background: '#13131a',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '24px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
              fontWeight: '700', 
              color: '#f8fafc',
              lineHeight: '1',
              marginBottom: '8px'
            }}>200+</div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>perfiles analizados</p>
          </div>
          <div>
            <div style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
              fontWeight: '700', 
              color: '#f8fafc',
              lineHeight: '1',
              marginBottom: '8px'
            }}>94%</div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>dicen "me ayudó a decidir"</p>
          </div>
          <div>
            <div style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
              fontWeight: '700', 
              color: '#f8fafc',
              lineHeight: '1',
              marginBottom: '8px'
            }}>15 min</div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>para tu Mapa gratis</p>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 3: ESTO ES PARA TI SI... ========== */}
      <section style={{ 
        padding: '100px 20px', 
        background: '#0a0a0f'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '16px', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Esto es para ti si...
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            fontSize: '16px', 
            marginBottom: '56px',
            maxWidth: '600px',
            margin: '0 auto 56px auto'
          }}>
            ¿Te reconoces en alguno de estos perfiles?
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '20px' 
          }}>
            {/* Arquetipo 1 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'border-color 0.2s'
            }}>
              <div style={{ 
                fontSize: '32px', 
                marginBottom: '16px',
                filter: 'grayscale(0.3)'
              }}>🛞</div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                color: '#f8fafc', 
                fontSize: '17px', 
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                El que lleva años en piloto automático
              </h3>
              <p style={{ 
                margin: 0, 
                color: '#94a3b8', 
                fontSize: '15px', 
                lineHeight: '1.6' 
              }}>
                Experiencia, buen sueldo, pero sientes que podrías dar más. No sabes exactamente más de qué.
              </p>
            </div>

            {/* Arquetipo 2 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ 
                fontSize: '32px', 
                marginBottom: '16px',
                filter: 'grayscale(0.3)'
              }}>🧭</div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                color: '#f8fafc', 
                fontSize: '17px', 
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                El que quiere cambiar pero no sabe a qué
              </h3>
              <p style={{ 
                margin: 0, 
                color: '#94a3b8', 
                fontSize: '15px', 
                lineHeight: '1.6' 
              }}>
                Tienes claro que quieres salir, no tienes claro a dónde. Miedo a empezar de cero.
              </p>
            </div>

            {/* Arquetipo 3 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ 
                fontSize: '32px', 
                marginBottom: '16px',
                filter: 'grayscale(0.3)'
              }}>💎</div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                color: '#f8fafc', 
                fontSize: '17px', 
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                El que sabe que vale más de lo que le pagan
              </h3>
              <p style={{ 
                margin: 0, 
                color: '#94a3b8', 
                fontSize: '15px', 
                lineHeight: '1.6' 
              }}>
                Lo intuyes. Pero no sabes cómo argumentarlo, ni ante quién, ni hacia qué rol.
              </p>
            </div>

            {/* Arquetipo 4 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ 
                fontSize: '32px', 
                marginBottom: '16px',
                filter: 'grayscale(0.3)'
              }}>🚀</div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                color: '#f8fafc', 
                fontSize: '17px', 
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                El que está en transición activa
              </h3>
              <p style={{ 
                margin: 0, 
                color: '#94a3b8', 
                fontSize: '15px', 
                lineHeight: '1.6' 
              }}>
                Ya decidiste cambiar. Necesitas saber exactamente qué ofrecer y dónde apuntar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 4: CÓMO FUNCIONA (FLUJO PLATAFORMA) ========== */}
      <section id="como-funciona" style={{ 
        padding: '100px 20px', 
        background: '#13131a'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '16px', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Tu viaje en la plataforma
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            fontSize: '15px', 
            marginBottom: '56px',
            maxWidth: '500px',
            margin: '0 auto 56px auto'
          }}>
            No es un formulario → PDF. Es una plataforma donde exploras, decides, y vuelves cuando quieras.
          </p>
          
          {/* Flujo visual */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            position: 'relative'
          }}>
            {/* Paso 1: Assessment */}
            <div style={{ 
              background: '#0a0a0f',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(34,197,94,0.3)',
              textAlign: 'center'
            }}>
              <div style={{ 
                background: 'rgba(34,197,94,0.15)',
                color: '#22c55e',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>GRATIS</div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📝</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                1. Assessment
              </h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                Sube CV + responde 5 preguntas tipo coach (15 min)
              </p>
            </div>

            {/* Paso 2: Mi Perfil */}
            <div style={{ 
              background: '#0a0a0f',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(34,197,94,0.3)',
              textAlign: 'center'
            }}>
              <div style={{ 
                background: 'rgba(34,197,94,0.15)',
                color: '#22c55e',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>GRATIS</div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎯</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                2. Mi Perfil
              </h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                Tu Mapa de Habilidades + texto narrativo + preview de 3 roles
              </p>
            </div>

            {/* Paso 3: Explorar Roles */}
            <div style={{ 
              background: '#0a0a0f',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(99,102,241,0.4)',
              textAlign: 'center'
            }}>
              <div style={{ 
                background: 'rgba(99,102,241,0.15)',
                color: '#a5b4fc',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>DESDE €29</div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔍</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                3. Explorar Roles
              </h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                5-8 roles con salarios, pros/contras, día a día real
              </p>
            </div>

            {/* Paso 4: Seleccionar */}
            <div style={{ 
              background: '#0a0a0f',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(99,102,241,0.4)',
              textAlign: 'center'
            }}>
              <div style={{ 
                background: 'rgba(99,102,241,0.15)',
                color: '#a5b4fc',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>INCLUIDO</div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>❤️</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                4. Seleccionar
              </h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                ❤️ Me interesa · ❌ Descartar · ⭐ Prioridad
              </p>
            </div>

            {/* Paso 5: Plan de Acción */}
            <div style={{ 
              background: '#0a0a0f',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(99,102,241,0.4)',
              textAlign: 'center'
            }}>
              <div style={{ 
                background: 'rgba(99,102,241,0.15)',
                color: '#a5b4fc',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>INCLUIDO</div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📊</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                5. Mis Selecciones
              </h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                Gap analysis + plan de estudio + links a ofertas reales
              </p>
            </div>

            {/* Paso 6: Documentos */}
            <div style={{ 
              background: '#0a0a0f',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(251,191,36,0.4)',
              textAlign: 'center'
            }}>
              <div style={{ 
                background: 'rgba(251,191,36,0.15)',
                color: '#fbbf24',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '100px',
                display: 'inline-block',
                marginBottom: '12px'
              }}>PLAN COMPLETO</div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>
                6. Mis Documentos
              </h4>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                CVs por rol + cartas + pitch (cuando estés listo)
              </p>
            </div>
          </div>

          {/* Mensaje clave */}
          <div style={{ 
            marginTop: '40px',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '12px',
            padding: '20px 24px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#c7d2fe', fontSize: '15px', lineHeight: '1.6' }}>
              <strong style={{ color: '#f8fafc' }}>La plataforma es tuya.</strong> Vuelve cuando quieras a revisar tus roles, actualizar tus selecciones, o generar nuevos documentos.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 5: PREVIEW DEL PRODUCTO (INTERACTIVO) ========== */}
      <section style={{ padding: '100px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '12px', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Así se ve la plataforma
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            fontSize: '15px', 
            marginBottom: '48px' 
          }}>
            Interfaz real — esto es lo que vas a usar
          </p>

          {/* Preview de 3 pantallas */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start'
          }}>
            
            {/* Pantalla 1: Mi Perfil (GRATIS) */}
            <div style={{ 
              background: 'linear-gradient(180deg, #0d0d16 0%, #111118 100%)', 
              border: '2px solid rgba(34,197,94,0.35)', 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
              {/* Browser bar */}
              <div style={{ 
                background: '#1a1a24',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div style={{ 
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  carrera.negoia.com/profile
                </div>
              </div>
              
              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Mi Perfil</h3>
                  <span style={{ 
                    background: 'rgba(34,197,94,0.15)',
                    color: '#22c55e',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '100px'
                  }}>GRATIS</span>
                </div>

                {/* Skills mini */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { skill: 'Gestión de equipos', level: 'EXPERTO', pct: 95, color: '#22c55e' },
                    { skill: 'Comunicación ejecutiva', level: 'EXPERTO', pct: 90, color: '#22c55e' },
                    { skill: 'Análisis y datos', level: 'AVANZADO', pct: 75, color: '#a5b4fc' },
                    { skill: 'Negociación B2B', level: 'COMPETENTE', pct: 55, color: '#fbbf24' }
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: '#e2e8f0', fontSize: '12px' }}>{s.skill}</span>
                        <span style={{ color: s.color, fontSize: '10px', fontWeight: '700' }}>{s.level}</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                        <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview roles bloqueado */}
                <div style={{ 
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px 14px'
                }}>
                  <p style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '12px' }}>Roles donde encajas &gt;80%:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#e2e8f0', fontSize: '13px' }}>Customer Success Manager</span>
                      <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600' }}>87%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#e2e8f0', fontSize: '13px' }}>Project Manager Senior</span>
                      <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600' }}>84%</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      filter: 'blur(4px)',
                      userSelect: 'none'
                    }}>
                      <span style={{ color: '#e2e8f0', fontSize: '13px' }}>Head of Operations</span>
                      <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600' }}>81%</span>
                    </div>
                  </div>
                  <button style={{ 
                    marginTop: '12px',
                    width: '100%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    🔓 Ver todos los roles — €29
                  </button>
                </div>
              </div>
            </div>

            {/* Pantalla 2: Explorar Roles (PAGADO) */}
            <div style={{ 
              background: 'linear-gradient(180deg, #0d0d16 0%, #111118 100%)', 
              border: '2px solid rgba(99,102,241,0.35)', 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
              {/* Browser bar */}
              <div style={{ 
                background: '#1a1a24',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div style={{ 
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  carrera.negoia.com/roles
                </div>
              </div>
              
              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Explorar Roles</h3>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>3 de 7</span>
                </div>

                {/* Rol card con acciones */}
                <div style={{ 
                  background: '#13131a',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>Customer Success Manager</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600' }}>87% match</span>
                        <span style={{ 
                          background: 'rgba(34,197,94,0.15)',
                          color: '#22c55e',
                          fontSize: '10px',
                          fontWeight: '600',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>Alta demanda</span>
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ margin: '0 0 12px 0', color: '#94a3b8', fontSize: '12px', lineHeight: '1.5' }}>
                    Gestionas cartera de 20-40 cuentas B2B. Onboarding, adoption, renovaciones...
                  </p>
                  
                  <div style={{ 
                    background: 'rgba(34,197,94,0.08)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#64748b', fontSize: '10px' }}>SALARIO ESPAÑA</span>
                    <span style={{ display: 'block', color: '#22c55e', fontSize: '14px', fontWeight: '700' }}>€38,000–52,000/año</span>
                  </div>

                  {/* Acciones interactivas */}
                  <div style={{ 
                    display: 'flex',
                    gap: '8px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <button style={{ 
                      flex: 1,
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#f87171',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}>❌</button>
                    <button style={{ 
                      flex: 1,
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#22c55e',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}>❤️</button>
                    <button style={{ 
                      flex: 1,
                      background: 'rgba(251,191,36,0.1)',
                      border: '1px solid rgba(251,191,36,0.3)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#fbbf24',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}>⭐</button>
                  </div>
                </div>

                <p style={{ margin: 0, color: '#64748b', fontSize: '11px', textAlign: 'center' }}>
                  ❌ Descartar · ❤️ Me interesa · ⭐ Prioridad
                </p>
              </div>
            </div>

            {/* Pantalla 3: Mis Selecciones (PAGADO) */}
            <div style={{ 
              background: 'linear-gradient(180deg, #0d0d16 0%, #111118 100%)', 
              border: '2px solid rgba(99,102,241,0.35)', 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
              {/* Browser bar */}
              <div style={{ 
                background: '#1a1a24',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div style={{ 
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  carrera.negoia.com/selected
                </div>
              </div>
              
              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: '600' }}>Mis Selecciones</h3>
                  <span style={{ 
                    background: 'rgba(34,197,94,0.15)',
                    color: '#22c55e',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '100px'
                  }}>2 ROLES</span>
                </div>

                {/* Rol seleccionado */}
                <div style={{ 
                  background: '#13131a',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid rgba(34,197,94,0.3)',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#f8fafc', fontSize: '13px', fontWeight: '600' }}>Customer Success Manager</span>
                    <span style={{ color: '#fbbf24', fontSize: '14px' }}>⭐</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ 
                      background: 'rgba(34,197,94,0.1)',
                      color: '#22c55e',
                      fontSize: '10px',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>✓ Gap analysis listo</span>
                    <span style={{ 
                      background: 'rgba(99,102,241,0.1)',
                      color: '#a5b4fc',
                      fontSize: '10px',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>📄 CV disponible</span>
                  </div>
                </div>

                {/* Gap analysis preview */}
                <div style={{ 
                  background: 'rgba(251,191,36,0.08)',
                  border: '1px solid rgba(251,191,36,0.2)',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '16px'
                }}>
                  <p style={{ margin: '0 0 8px 0', color: '#fbbf24', fontSize: '12px', fontWeight: '600' }}>⚠ 2 gaps identificados</p>
                  <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#94a3b8', fontSize: '12px', lineHeight: '1.6' }}>
                    <li>Certificación Customer Success (recomendado)</li>
                    <li>Experiencia con Salesforce/HubSpot</li>
                  </ul>
                </div>

                {/* CTA a documentos */}
                <button style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  📄 Generar CV para este rol
                </button>
              </div>
            </div>
          </div>

          <p style={{ 
            textAlign: 'center',
            margin: '32px 0 0 0', 
            color: '#475569', 
            fontSize: '13px' 
          }}>
            Capturas reales de la plataforma. Tu perfil estará completamente personalizado.
          </p>
        </div>
      </section>

      {/* ========== SECCIÓN 6: PRICING ========== */}
      <section id="pricing" style={{ padding: '100px 20px', background: '#13131a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '16px', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Elige tu nivel de acceso
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            fontSize: '15px', 
            marginBottom: '56px' 
          }}>
            Empieza gratis. Desbloquea más cuando veas valor.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            alignItems: 'stretch'
          }}>
            {/* GRATIS */}
            <div style={{ 
              background: '#0a0a0f', 
              borderRadius: '20px', 
              padding: '28px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                color: '#f8fafc', 
                fontSize: '18px', 
                fontWeight: '700' 
              }}>Gratis</h3>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: '700', 
                color: '#f8fafc',
                marginBottom: '4px'
              }}>€0</div>
              <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>
                Sin tarjeta · Acceso inmediato
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flex: 1 }}>
                {[
                  'Assessment completo (15 min)',
                  'Tu Mapa de Habilidades interactivo',
                  'Texto narrativo de tu perfil',
                  'Preview de 3 roles (nombre + % match)',
                  'Acceso permanente a tu perfil'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/start"
                style={{ 
                  display: 'block',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '10px',
                  background: 'transparent',
                  color: '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s'
                }}
              >
                Empezar gratis →
              </Link>
            </div>

            {/* BÁSICO €29 */}
            <div style={{ 
              background: '#0a0a0f', 
              borderRadius: '20px', 
              padding: '28px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                color: '#f8fafc', 
                fontSize: '18px', 
                fontWeight: '700' 
              }}>Básico</h3>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: '700', 
                color: '#f8fafc',
                marginBottom: '4px'
              }}>€29</div>
              <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>
                Pago único · Acceso permanente
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flex: 1 }}>
                {[
                  'Todo lo gratis +',
                  'Acceso a todos los roles (5-8)',
                  'Salarios reales por país',
                  'Día a día, pros/contras honestos',
                  'Sistema ❤️/❌/⭐ para seleccionar',
                  'Gap analysis por rol seleccionado',
                  'Plan de estudio personalizado',
                  'Links a ofertas reales (LinkedIn, InfoJobs)'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/start?plan=basico"
                style={{ 
                  display: 'block',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '10px',
                  background: 'transparent',
                  color: '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s'
                }}
              >
                Empezar → desbloquear €29
              </Link>
            </div>

            {/* COMPLETO €39 */}
            <div style={{ 
              background: 'linear-gradient(180deg, #1a1a24 0%, #13131a 100%)', 
              borderRadius: '20px', 
              padding: '28px',
              border: '2px solid rgba(99,102,241,0.4)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(99,102,241,0.15)'
            }}>
              <span style={{ 
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '5px 14px',
                borderRadius: '100px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Más elegido</span>

              <h3 style={{ 
                margin: '0 0 8px 0', 
                color: '#f8fafc', 
                fontSize: '18px', 
                fontWeight: '700' 
              }}>Completo</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ 
                  fontSize: '36px', 
                  fontWeight: '700', 
                  color: '#f8fafc'
                }}>€39</span>
                <span style={{ 
                  fontSize: '16px', 
                  color: '#64748b', 
                  textDecoration: 'line-through'
                }}>€70</span>
              </div>
              <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '14px' }}>
                Pago único · Acceso permanente + documentos
              </p>
              {/* Desglose de valor */}
              <div style={{ 
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '16px',
                fontSize: '12px',
                color: '#94a3b8',
                lineHeight: '1.5'
              }}>
                <span style={{ color: '#22c55e', fontWeight: '600' }}>Valor real €70:</span> Análisis €25 + Plan €10 + CV €15 + Carta €10 + LinkedIn €10
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flex: 1 }}>
                {[
                  'Todo lo del Básico +',
                  'Sección "Mis Documentos" desbloqueada',
                  'CV genérico ATS-ready',
                  'CVs específicos por cada rol seleccionado',
                  'Cartas de presentación por rol',
                  'Bullets optimizados para LinkedIn',
                  'Elevator pitch (texto copiable)',
                  'Regenerar documentos cuando quieras'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/start?plan=completo"
                style={{ 
                  display: 'block',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
                  transition: 'all 0.2s'
                }}
              >
                Empezar → desbloquear €39
              </Link>
            </div>
          </div>

          {/* Garantía + Trust Signals */}
          <div style={{ 
            maxWidth: '700px',
            margin: '48px auto 0 auto',
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '16px',
            padding: '28px 32px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#22c55e', fontSize: '17px', fontWeight: '700' }}>
              🛡️ Tu compra está 100% protegida
            </h4>
            <p style={{ margin: '0 0 20px 0', color: '#e2e8f0', fontSize: '15px', lineHeight: '1.6' }}>
              Si no encuentras valor en tu análisis, te devolvemos el dinero. Sin preguntas, sin formularios.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '24px', 
              flexWrap: 'wrap',
              paddingTop: '16px',
              borderTop: '1px solid rgba(34,197,94,0.2)'
            }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#22c55e' }}>✓</span> Pago seguro con Stripe
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#22c55e' }}>✓</span> Bizum disponible
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#22c55e' }}>✓</span> Cumplimos GDPR
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#22c55e' }}>✓</span> Tus datos nunca se venden
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 7: TESTIMONIOS ========== */}
      <section style={{ 
        padding: '100px 20px', 
        background: '#0a0a0f'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '56px', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Lo que dicen quienes lo han usado
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {/* Testimonio 1 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#e2e8f0', 
                fontSize: '15px', 
                lineHeight: '1.75', 
                fontStyle: 'italic' 
              }}>
                "Lo mejor es que no termina. Puedo volver, cambiar mis selecciones, generar otro CV si me sale una oportunidad diferente. No es un PDF que miras una vez y olvidas."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: '#6366f1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#fff', 
                  fontWeight: '700', 
                  fontSize: '15px',
                  flexShrink: 0
                }}>CM</div>
                <div>
                  <p style={{ margin: 0, color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>Clara M., 43 años</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Ex-Responsable de Formación</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#e2e8f0', 
                fontSize: '15px', 
                lineHeight: '1.75', 
                fontStyle: 'italic' 
              }}>
                "El sistema de ❤️/❌ para explorar roles es adictivo. Descarté 3 opciones que parecían buenas en papel pero el día a día no me cuadraba. Eso vale los €29."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: '#0891b2', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#fff', 
                  fontWeight: '700', 
                  fontSize: '15px',
                  flexShrink: 0
                }}>RV</div>
                <div>
                  <p style={{ margin: 0, color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>Roberto V., 38 años</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Ing. de Proyectos en transición</p>
                </div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div style={{ 
              background: '#13131a', 
              borderRadius: '16px', 
              padding: '28px', 
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#e2e8f0', 
                fontSize: '15px', 
                lineHeight: '1.75', 
                fontStyle: 'italic' 
              }}>
                "Ver mi Mapa gratis me convenció de pagar. No me pidieron tarjeta antes de mostrarme algo de valor. Eso me generó confianza."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: '#7c3aed', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#fff', 
                  fontWeight: '700', 
                  fontSize: '15px',
                  flexShrink: 0
                }}>SL</div>
                <div>
                  <p style={{ margin: 0, color: '#f8fafc', fontSize: '15px', fontWeight: '600' }}>Sofía L., 51 años</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Dir. de RRHH → consultora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 8: FAQ ========== */}
      <section style={{ padding: '100px 20px', background: '#13131a' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '56px', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Preguntas frecuentes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                q: '¿Es un PDF que me envían por email?',
                a: 'No, es una plataforma web interactiva. No recibes un documento estático — accedes a tu perfil personal donde puedes explorar roles, seleccionar los que te interesan, ver gaps de cada uno, y generar documentos cuando estés listo. Los CVs y cartas sí son descargables, pero la experiencia es una app, no un PDF.'
              },
              {
                q: '¿Tengo que pagar para ver mi Mapa de Habilidades?',
                a: 'No. El Mapa de Habilidades (radar interactivo + texto narrativo + preview de 3 roles) es 100% gratis. Solo pagas si quieres explorar todos los roles con datos completos y usar el sistema de selección.'
              },
              {
                q: '¿Qué pasa si cambio de opinión sobre los roles?',
                a: 'Puedes cambiar tus selecciones cuando quieras. Si descartaste un rol y luego lo quieres reconsiderar, simplemente vuelves y lo marcas como "Me interesa". La plataforma es tuya.'
              },
              {
                q: '¿Cuál es la diferencia entre el Plan Básico y el Completo?',
                a: 'El Básico te da acceso a explorar todos los roles, seleccionar los que te interesan, y ver el gap analysis y plan de estudio. El Completo añade la sección "Mis Documentos" donde generas CVs específicos por rol, cartas de presentación, y tu elevator pitch.'
              },
              {
                q: '¿Cuánto tiempo tengo acceso?',
                a: 'Para siempre. No es una suscripción. Pagas una vez y tienes acceso permanente a tu nivel desbloqueado.'
              }
            ].map((faq, i) => (
              <div key={i} style={{ 
                background: '#0a0a0f', 
                borderRadius: '14px', 
                padding: '24px 28px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  color: '#f8fafc', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>{faq.q}</h4>
                <p style={{ 
                  margin: 0, 
                  color: '#94a3b8', 
                  fontSize: '15px', 
                  lineHeight: '1.7' 
                }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 9: CTA FINAL ========== */}
      <section style={{ padding: '100px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ 
            fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
            marginBottom: '32px',
            lineHeight: '1.35',
            color: '#f8fafc',
            fontWeight: '700'
          }}>
            El mejor momento para saber para qué eres bueno fue hace 10 años.{' '}
            <span style={{ color: '#a5b4fc' }}>El segundo mejor es hoy.</span>
          </h2>

          {/* CTAs */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '28px'
          }}>
            <Link
              href="/start"
              style={{ 
                display: 'inline-block',
                padding: '18px 48px',
                fontSize: '17px',
                fontWeight: '600',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(99, 102, 241, 0.35)'
              }}
            >
              Descubrir para qué soy bueno → Gratis
            </Link>
            <span style={{ 
              color: '#64748b',
              fontSize: '14px',
              padding: '8px 16px'
            }}>
              15 minutos · Sin tarjeta · Tu Mapa gratis inmediatamente
            </span>
          </div>

          {/* Trust signals */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '24px', 
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Acceso permanente
            </span>
            <span style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Vuelve cuando quieras
            </span>
            <span style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Garantía de devolución
            </span>
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
