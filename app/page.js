import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ========== SECCIÓN 1: HERO — Mobile-first, above-the-fold optimizado ========== */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 20px 40px',
        background: '#0a0a0f'
      }}>
        <div style={{ 
          maxWidth: '720px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Badge */}
          <span style={{ 
            display: 'inline-block',
            background: 'rgba(99, 102, 241, 0.08)', 
            color: '#a5b4fc',
            marginBottom: '24px',
            fontSize: '13px',
            padding: '8px 16px',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '100px',
            fontWeight: '500'
          }}>
            IA de carrera · Empieza gratis
          </span>
          
          {/* H1 — Headline emocional y directo */}
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            marginBottom: '20px',
            lineHeight: '1.15',
            color: '#f8fafc',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            ¿Llevas años trabajando y sigues sin saber{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>para qué eres realmente bueno?</span>
          </h1>
          
          {/* Subtítulo — Resultado concreto en tiempo */}
          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: '1.7',
            color: '#94a3b8',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            En 15 minutos, la IA analiza toda tu experiencia y te dice con qué roles profesionales de 2026 ya encajas, con salarios reales y por qué.
          </p>

          {/* CTA principal — Grande y prominente */}
          <Link
            href="/start"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 48px',
              fontSize: '18px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              minHeight: '64px',
              marginBottom: '16px'
            }}
          >
            Empezar análisis gratis — 15 minutos
          </Link>

          {/* Social proof inmediato */}
          <p style={{ 
            fontSize: '14px', 
            color: '#64748b',
            marginBottom: '24px'
          }}>
            📊 <span style={{ color: '#a5b4fc' }}>47 profesionales</span> ya descubrieron sus habilidades esta semana
          </p>

          {/* Trust row — Más visible */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '28px'
          }}>
            {['✓ Sin tarjeta', '✓ Mapa de Habilidades gratis', '✓ Roles con salarios reales'].map((item, i) => (
              <span key={i} style={{ 
                fontSize: '14px', 
                color: '#94a3b8',
                background: 'rgba(255,255,255,0.04)',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontWeight: '500'
              }}>
                <span style={{ color: '#22c55e' }}>{item.slice(0, 1)}</span>{item.slice(1)}
              </span>
            ))}
          </div>

          {/* CTA secundario */}
          <a
            href="#pricing"
            style={{ 
              color: '#a5b4fc',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Ver planes desde €29 ↓
          </a>

          <div style={{ marginTop: '16px' }}>
            <Link
              href="/buscar-trabajo-sin-linkedin?utm_source=owned&utm_medium=home&utm_campaign=growth_loop_apr05&utm_content=hero_guide"
              style={{
                color: '#c7d2fe',
                fontSize: '13px',
                textDecoration: 'underline'
              }}
            >
              Nueva guía: Buscar trabajo sin LinkedIn — 7 alternativas que funcionan
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 2: STATS ========== */}
      <section style={{ 
        padding: '64px 20px', 
        background: '#0d0d16',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
          flexWrap: 'nowrap'
        }}>
          {[
            { number: '200+', label: 'Perfiles analizados' },
            { number: '94%', label: 'Dicen que "valió la pena"' },
            { number: '8 de cada 10', label: 'Descubren un rol que nunca habían considerado' }
          ].map((stat, i) => (
            <div key={i} style={{ 
              textAlign: 'center',
              padding: '20px 36px',
              flex: i === 2 ? '1.4' : '1',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              minWidth: 0
            }}>
              <div style={{ 
                fontSize: i === 2 ? 'clamp(1.4rem, 3vw, 2rem)' : 'clamp(2.2rem, 5vw, 2.8rem)',
                fontWeight: '700', 
                color: '#f8fafc',
                lineHeight: '1',
                marginBottom: '8px',
                whiteSpace: 'nowrap'
              }}>{stat.number}</div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '13px', lineHeight: '1.4' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECCIÓN 3: ESTO ES PARA TI SI... ========== */}
      <section style={{ 
        padding: '64px 20px', 
        background: '#0a0a0f'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '56px', 
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            ¿Te suena esto?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '20px' 
          }}>
            {[
              {
                icon: '→',
                title: 'Piloto automático',
                line1: 'Llevas años en lo mismo.',
                line2: 'Estable pero sin dirección.'
              },
              {
                icon: '↑',
                title: 'Vales más de lo que cobras',
                line1: 'Lo intuyes. No sabes cómo',
                line2: 'argumentarlo ni hacia dónde.'
              },
              {
                icon: '≠',
                title: 'Quieres cambiar, pero ¿a qué?',
                line1: 'La idea de "empezar de',
                line2: 'cero" te paraliza.'
              },
              {
                icon: '!',
                title: 'Acabas de perder tu trabajo',
                line1: 'Tienes urgencia. Necesitas saber',
                line2: 'exactamente qué tienes y dónde apuntar.'
              }
            ].map((card, i) => (
              <div key={i} style={{ 
                background: '#0d0d16', 
                borderRadius: '16px', 
                padding: '20px 20px', 
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ 
                  fontSize: '28px', 
                  marginBottom: '16px',
                  color: '#6366f1',
                  fontWeight: '700'
                }}>{card.icon}</div>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  color: '#f8fafc', 
                  fontSize: '17px', 
                  fontWeight: '600'
                }}>
                  {card.title}
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>
                  {card.line1}<br />{card.line2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 4: TU VIAJE (FLUJO) ========== */}
      <section style={{ 
        padding: '100px 20px', 
        background: '#0d0d16'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '12px', 
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Así funciona la plataforma
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            fontSize: '16px', 
            marginBottom: '56px',
            maxWidth: '550px',
            margin: '0 auto 56px auto'
          }}>
            No es un formulario que rellenas y esperas. Es una plataforma que te acompaña.
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '860px',
            margin: '0 auto'
          }}>
            {[
              { num: '1', title: 'Tu experiencia', desc: '5 preguntas guiadas + sube tu CV', badge: 'GRATIS', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.1)' },
              { num: '2', title: 'Tu Mapa de Habilidades', desc: 'Tus skills ordenadas por nivel + tu superpoder único', badge: 'GRATIS', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.1)' },
              { num: '3', title: 'Explora tus roles', desc: 'Marca favoritos, descarta, guarda — con salarios reales', badge: 'desde €29', badgeColor: '#a5b4fc', badgeBg: 'rgba(99,102,241,0.12)' },
              { num: '4', title: 'Gap analysis', desc: 'Qué te falta para cada rol y cómo cerrarlo en semanas', badge: 'desde €29', badgeColor: '#a5b4fc', badgeBg: 'rgba(99,102,241,0.12)' },
              { num: '5', title: 'Tus documentos', desc: 'CV por rol, carta de presentación y bullets de LinkedIn', badge: 'Plan Completo', badgeColor: '#fbbf24', badgeBg: 'rgba(251,191,36,0.1)' },
              { num: '6', title: 'Siempre disponible', desc: 'Vuelve cuando quieras. Sin fecha de expiración.', badge: 'Para siempre', badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)' }
            ].map((item, i) => (
              <div key={i} style={{ 
                background: '#0a0a0f',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ 
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#a5b4fc',
                    fontSize: '14px',
                    fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: '0'
                  }}>{item.num}</span>
                  <span style={{ 
                    background: item.badgeBg,
                    color: item.badgeColor,
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    letterSpacing: '0.3px'
                  }}>{item.badge}</span>
                </div>
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#f8fafc', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  lineHeight: '1.3'
                }}>{item.title}</h4>
                <p style={{ 
                  margin: 0, 
                  color: '#94a3b8', 
                  fontSize: '14px', 
                  lineHeight: '1.6'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 5: PLATAFORMA EN ACCIÓN ========== */}
      <section style={{ padding: '100px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '12px', 
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Explora, decide, actúa
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            fontSize: '16px', 
            marginBottom: '48px' 
          }}>
            No recibes un documento estático. Tienes una plataforma donde vives tu búsqueda.
          </p>

          {/* 3 mockups side by side */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start'
          }}>
            
            {/* Mockup 1: /profile (GRATIS) */}
            <div style={{ 
              background: '#0d0d16', 
              border: '1px solid rgba(34,197,94,0.3)', 
              borderRadius: '16px', 
              overflow: 'hidden'
            }}>
              <div style={{ 
                background: '#1a1a2e',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>/profile</span>
                <span style={{ 
                  marginLeft: 'auto',
                  background: 'rgba(34,197,94,0.15)',
                  color: '#22c55e',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '100px'
                }}>GRATIS</span>
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#f8fafc', fontSize: '14px' }}>Tu Mapa de Habilidades</h4>
                {[
                  { skill: 'Gestión de equipos', pct: 95 },
                  { skill: 'Comunicación ejecutiva', pct: 85 },
                  { skill: 'Análisis de negocio', pct: 60 }
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '11px' }}>{s.skill}</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                      <div style={{ width: `${s.pct}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                  <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '10px' }}>Roles donde encajas:</p>
                  {['🔒 Customer Success Mgr 87%', '🔒 Operations Manager 82%'].map((r, i) => (
                    <p key={i} style={{ margin: '0 0 4px 0', color: '#94a3b8', fontSize: '11px' }}>{r}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Mockup 2: /roles (€29) */}
            <div style={{ 
              background: '#0d0d16', 
              border: '1px solid rgba(99,102,241,0.3)', 
              borderRadius: '16px', 
              overflow: 'hidden'
            }}>
              <div style={{ 
                background: '#1a1a2e',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>/roles</span>
                <span style={{ 
                  marginLeft: 'auto',
                  background: 'rgba(99,102,241,0.15)',
                  color: '#a5b4fc',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '100px'
                }}>€29</span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  background: '#13131a',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '13px', fontWeight: '600' }}>Customer Success Manager</h4>
                    <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600' }}>87%</span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    background: 'rgba(255,255,255,0.06)', 
                    borderRadius: '3px',
                    marginBottom: '10px'
                  }}>
                    <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '3px' }} />
                  </div>
                  <p style={{ margin: '0 0 6px 0', color: '#22c55e', fontSize: '12px', fontWeight: '600' }}>€38,000–52,000/año · Alta demanda ↑</p>
                  <p style={{ margin: '0 0 10px 0', color: '#94a3b8', fontSize: '11px', lineHeight: '1.5' }}>
                    Qué harás cada día: "Gestionas 20-40 cuentas B2B. Tu trabajo es..."
                  </p>
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ margin: '0 0 4px 0', color: '#22c55e', fontSize: '10px' }}>✅ Pros: Alta demanda · Mucha interacción · Carrera clara</p>
                    <p style={{ margin: 0, color: '#fbbf24', fontSize: '10px' }}>⚠️ Contras: Presión de churn · Emocionalmente demandante</p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button style={{ flex: 1, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', padding: '8px', color: '#22c55e', fontSize: '14px', cursor: 'pointer' }}>❤️</button>
                    <button style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '8px', color: '#f87171', fontSize: '14px', cursor: 'pointer' }}>❌</button>
                    <button style={{ flex: 1, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '6px', padding: '8px', color: '#fbbf24', fontSize: '14px', cursor: 'pointer' }}>⭐</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup 3: /documents (€39) */}
            <div style={{ 
              background: '#0d0d16', 
              border: '1px solid rgba(251,191,36,0.3)', 
              borderRadius: '16px', 
              overflow: 'hidden'
            }}>
              <div style={{ 
                background: '#1a1a2e',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>/documents</span>
                <span style={{ 
                  marginLeft: 'auto',
                  background: 'rgba(251,191,36,0.15)',
                  color: '#fbbf24',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '100px'
                }}>€39</span>
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#f8fafc', fontSize: '14px' }}>Tus Documentos</h4>
                {[
                  { title: 'CV Genérico (ATS + LinkedIn ready)', progress: 100 },
                  { title: 'CV: Customer Success Manager', progress: 100 },
                  { title: 'Carta de presentación: CSM', progress: 100 }
                ].map((doc, i) => (
                  <div key={i} style={{ 
                    background: '#13131a',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '10px',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <p style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '11px' }}>{doc.title}</p>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '8px' }}>
                      <div style={{ width: `${doc.progress}%`, height: '100%', background: '#22c55e', borderRadius: '2px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: '#64748b', cursor: 'pointer' }}>📋 Copiar</span>
                      <span style={{ fontSize: '10px', color: '#64748b', cursor: 'pointer' }}>📥 PDF</span>
                      <span style={{ fontSize: '10px', color: '#64748b', cursor: 'pointer' }}>📥 DOCX</span>
                    </div>
                  </div>
                ))}
                <div style={{ 
                  background: '#13131a',
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <p style={{ margin: '0 0 6px 0', color: '#e2e8f0', fontSize: '11px' }}>LinkedIn Bullets</p>
                  <span style={{ fontSize: '10px', color: '#a5b4fc', cursor: 'pointer' }}>📋 Copiar todos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 6: PRICING ========== */}
      <section id="pricing" style={{ padding: '100px 20px', background: '#0d0d16' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '56px', 
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Empieza gratis. Paga cuando veas el valor.
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            alignItems: 'stretch'
          }}>
            {/* DESCUBRE (Gratis) */}
            <div style={{ 
              background: '#0a0a0f', 
              borderRadius: '20px', 
              padding: '32px 28px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                DESCUBRE
              </h3>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#f8fafc', marginBottom: '20px' }}>Gratis</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flex: 1 }}>
                {[
                  'Assessment completo',
                  'Mapa de Habilidades interactivo',
                  'Preview de 3 roles (nombre + % match)'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/start"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.15)',
                  minHeight: '56px'
                }}
              >
                Empezar →
              </Link>
            </div>

            {/* BÁSICO €29 */}
            <div style={{ 
              background: '#0a0a0f', 
              borderRadius: '20px', 
              padding: '32px 28px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                BÁSICO
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{ fontSize: '40px', fontWeight: '700', color: '#f8fafc' }}>€29</span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>pago único</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#a5b4fc', fontWeight: '600', flexShrink: 0 }}>+</span>
                  <span style={{ color: '#a5b4fc', fontSize: '14px', lineHeight: '1.5', fontWeight: '500' }}>Todo lo gratis</span>
                </div>
                {[
                  'Todos los roles (5-8)',
                  'Datos completos de cada rol',
                  'Día a día real + pros/contras',
                  'Salarios España 2026',
                  'Sistema ❤️/❌/⭐ para seleccionar',
                  'Gap analysis por rol',
                  'Plan de estudio personalizado'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/analisis-carrera?plan=basico"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.15)',
                  minHeight: '56px'
                }}
              >
                Plan Básico →
              </Link>
            </div>

            {/* COMPLETO €39 — Destacado */}
            <div style={{ 
              background: 'linear-gradient(180deg, #13131a 0%, #0d0d16 100%)', 
              borderRadius: '20px', 
              padding: '32px 28px',
              border: '2px solid rgba(99,102,241,0.4)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 12px 40px rgba(99,102,241,0.15)'
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
                borderRadius: '100px'
              }}>Más elegido</span>

              <h3 style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                COMPLETO ⭐
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{ fontSize: '40px', fontWeight: '700', color: '#f8fafc' }}>€39</span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>pago único</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#a5b4fc', fontWeight: '600', flexShrink: 0 }}>+</span>
                  <span style={{ color: '#a5b4fc', fontSize: '14px', lineHeight: '1.5', fontWeight: '500' }}>Todo lo básico</span>
                </div>
                {[
                  'CV genérico ATS-ready',
                  'CVs específicos por rol seleccionado',
                  'Cartas de presentación',
                  'LinkedIn bullets optimizados',
                  'Elevator pitch',
                  'Plan de estudio consolidado',
                  'Acceso 90 días'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600', flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/analisis-carrera?plan=completo"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
                  minHeight: '56px'
                }}
              >
                Plan Completo →
              </Link>
            </div>
          </div>

          {/* Valor breakdown */}
          <p style={{ 
            textAlign: 'center',
            marginTop: '32px',
            color: '#64748b',
            fontSize: '14px'
          }}>
            💡 El Plan Completo incluye €70 de valor: Análisis (€25) + Plan (€10) + CV genérico (€15) + Carta (€10) + LinkedIn (€10)
          </p>

          {/* Coach comparison box */}
          <div style={{ 
            maxWidth: '600px',
            margin: '24px auto 0 auto',
            background: 'rgba(99,102,241,0.05)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: '12px',
            padding: '20px 24px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#c7d2fe', fontSize: '15px', lineHeight: '1.6' }}>
              Un coach de carrera en España cobra €100–150/sesión. Sin entregables. Sin garantía.<br />
              <strong style={{ color: '#f8fafc' }}>Aquí tienes todo por €39 con garantía de devolución.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 7: TESTIMONIOS ========== */}
      <section style={{ padding: '100px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '56px', 
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Lo que dicen quienes ya tienen su análisis
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {[
              {
                initials: 'CM',
                color: '#6366f1',
                name: 'Clara M. — 43 años, Madrid',
                quote: '"Pensé que sería algo genérico de IA. Pero el análisis identificó situaciones de mi trayectoria que yo nunca habría sabido articular sola. Lo que más me sorprendió fue poder volver a la plataforma dos semanas después y generar un CV diferente cuando me salió otra oportunidad."',
                result: '→ Entrevista en empresa EdTech en 3 semanas'
              },
              {
                initials: 'RV',
                color: '#0891b2',
                name: 'Roberto V. — 38 años, Barcelona',
                quote: '"No me resolvió la vida, pero me dio un mapa claro. El sistema de ❤️/❌ para explorar roles me pareció brillante — pude probar 8 opciones sin compromiso y quedarme con las 2 que de verdad me interesaban."',
                result: '→ Primer proceso de selección como PM activo'
              },
              {
                initials: 'SL',
                color: '#7c3aed',
                name: 'Sofía L. — 51 años, Valencia',
                quote: '"Lo que me convenció fue que la primera parte era completamente gratis. Vi mi Mapa de Habilidades y pensé \'hostia, esto soy yo\'. Pagué en ese momento."',
                result: '→ Primer cliente de consultoría en 5 semanas'
              }
            ].map((t, i) => (
              <div key={i} style={{ 
                background: '#0d0d16', 
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
                  fontStyle: 'italic',
                  flex: 1
                }}>
                  {t.quote}
                </p>
                <p style={{ margin: 0, color: '#22c55e', fontSize: '14px', fontWeight: '500' }}>
                  {t.result}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    background: t.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    fontWeight: '700', 
                    fontSize: '14px',
                    flexShrink: 0
                  }}>{t.initials}</div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 8: GARANTÍA ========== */}
      <section style={{ padding: '80px 20px', background: '#0d0d16' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(34,197,94,0.05)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '20px',
            padding: '40px 36px',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: '#22c55e', 
              fontSize: '20px', 
              fontWeight: '700'
            }}>
              "Garantía de claridad — sin preguntas"
            </h3>
            <p style={{ 
              margin: '0 0 28px 0', 
              color: '#e2e8f0', 
              fontSize: '16px', 
              lineHeight: '1.7' 
            }}>
              Si completas el assessment y no encuentras valor real en tu Mapa de Habilidades o en los roles que encajan contigo → te devolvemos el dinero. Sin formulario. Sin esperas. Solo responde al email de acceso.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px', 
              flexWrap: 'wrap'
            }}>
              {['🔒 Stripe', '🔒 Bizum (España)', '🔒 GDPR compliant', '🔒 Datos protegidos'].map((item, i) => (
                <span key={i} style={{ fontSize: '13px', color: '#64748b' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN 9: FAQ ========== */}
      <section style={{ padding: '100px 20px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '56px', 
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', 
            color: '#f8fafc', 
            fontWeight: '700'
          }}>
            Preguntas frecuentes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: '¿Necesito pagar para ver mi Mapa de Habilidades?',
                a: 'No. El assessment completo y el Mapa son 100% gratuitos. Pagas (€29 o €39) solo para ver los roles detallados y/o generar tus documentos.'
              },
              {
                q: '¿Es un PDF que me envían por email?',
                a: 'No. Es una plataforma web. Tu Mapa, tus roles y tus documentos están en tu panel personal. Puedes volver cuando quieras, cambiar tus selecciones, y generar nuevos CVs si cambia tu situación.'
              },
              {
                q: '¿Qué pasa si no tengo CV actualizado?',
                a: 'No pasa nada. Puedes hacer el assessment sin CV. Solo responde las preguntas guiadas. El CV mejora la precisión pero no es obligatorio.'
              },
              {
                q: '¿Cuánto tiempo tarda?',
                a: 'El assessment son 5 pasos, unos 10-15 minutos. El Mapa se genera al instante. Los documentos (si los pides) están listos en menos de 2 minutos.'
              },
              {
                q: '¿Puedo recuperar mi análisis si cierro el navegador?',
                a: 'Sí. Te enviamos un enlace de acceso a tu panel. Tu análisis queda guardado 90 días.'
              }
            ].map((faq, i) => (
              <div key={i} style={{ 
                background: '#0d0d16', 
                borderRadius: '14px', 
                padding: '24px 28px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  color: '#f8fafc', 
                  fontSize: '16px', 
                  fontWeight: '600'
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

      {/* ========== SECCIÓN 10: CTA FINAL ========== */}
      <section style={{ 
        padding: '120px 20px',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%), #0a0a0f'
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            marginBottom: '12px',
            lineHeight: '1.3',
            color: '#f8fafc',
            fontWeight: '700'
          }}>
            El mejor momento para saber para qué eres bueno fue hace 10 años.
          </h2>
          <h3 style={{ 
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            marginBottom: '40px',
            color: '#64748b',
            fontWeight: '400'
          }}>
            El segundo mejor momento es hoy.
          </h3>

          <Link
            href="/start"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 48px',
              fontSize: '17px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              minHeight: '56px',
              marginBottom: '16px'
            }}
          >
            Descubrir para qué soy bueno → Gratis
          </Link>
          
          <p style={{ 
            margin: 0,
            fontSize: '14px', 
            color: '#64748b'
          }}>
            Sin tarjeta · 15 minutos · Tu Mapa de Habilidades al instante
          </p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ 
        padding: '32px 20px', 
        background: '#0a0a0f', 
        borderTop: '1px solid rgba(255,255,255,0.04)' 
      }}>
        <p style={{ textAlign: 'center', color: '#475569', fontSize: '13px', margin: 0 }}>
          © 2026 NegoIA · carrera.negoia.com
        </p>
      </footer>
    </>
  )
}
