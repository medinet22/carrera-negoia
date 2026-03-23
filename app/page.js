'use client'
import { useState } from 'react'
import Link from 'next/link'
import { track } from './lib/analytics'

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (emailValue) => {
    if (!emailValue) return
    track('signup_start', { source: 'home_form' })
    setLoading(true)

    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
      })
      track('signup_complete', { source: 'home_form' })
      setSubmitted(true)
    } catch (err) {
      track('signup_error', { source: 'home_form' })
      console.error(err)
    }
    setLoading(false)
  }

  const SignupForm = ({ buttonText = "Descubrir mis habilidades →" }) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    if (submitted) {
      return (
        <div className="success-card">
          <h3>¡Estás dentro! 🎉</h3>
          <p>Te enviamos un email de bienvenida con el enlace a la encuesta. Si no te llega en 2-3 minutos, revisa spam/promociones.</p>
        </div>
      )
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!isValidEmail(email)) {
            setEmailError('Introduce un email válido (ejemplo@dominio.com)')
            return
          }
          setEmailError('')
          handleSubmit(email)
        }}
        className="form-group"
      >
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => {
            const v = e.target.value
            setEmail(v)
            if (!v || isValidEmail(v)) setEmailError('')
          }}
          onBlur={() => {
            if (email && !isValidEmail(email)) {
              setEmailError('Introduce un email válido (ejemplo@dominio.com)')
            }
          }}
          required
          autoComplete="email"
          inputMode="email"
        />
        {emailError && <p style={{ color: '#f87171', marginTop: '-6px', marginBottom: '8px', fontSize: '0.88rem' }}>{emailError}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Un momento...' : buttonText}
        </button>
      </form>
    )
  }

  return (
    <>
      {/* ========== HERO (AIDA Framework) ========== */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">
            <span className="badge-dot"></span>
            🎯 Primeros 100 accesos gratis — Análisis personalizado
          </span>
          
          {/* ATENCIÓN: Gancho que conecta con el dolor inmediato */}
          <h1>
            Llevas años trabajando y{' '}
            <span className="highlight">no sabes qué poner en el CV</span>
          </h1>
          
          {/* INTERÉS: Reformular el problema y crear curiosidad */}
          <p className="subtitle">
            El problema no es que no tengas habilidades. Es que las que más vales 
            <strong> no sabes nombrarlas</strong>. Están ahí, las usas cada día, 
            pero cuando alguien te pregunta "¿en qué eres bueno?" te quedas en blanco.
          </p>

          {/* DESEO: Promesa concreta y creíble */}
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">30-50</div>
              <div className="stat-label">habilidades que ya tienes</div>
            </div>
            <div className="stat">
              <div className="stat-number">2 min</div>
              <div className="stat-label">para ver tus 10 top</div>
            </div>
            <div className="stat">
              <div className="stat-number">€0</div>
              <div className="stat-label">sin crear cuenta</div>
            </div>
          </div>

          {/* ACCIÓN: CTA claro con valor inmediato */}
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">Descubre tus habilidades invisibles</h2>
              <p className="form-subtitle">
                Responde 5 preguntas rápidas → recibe tu Mini-Mapa de Habilidades personalizado en tu email. Sin spam. Sin tarjeta.
              </p>
            </div>
            <SignupForm buttonText="Ver mis habilidades ocultas →" />
            <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
              <Link
                href="/encuesta?utm_source=landing&utm_medium=cro_cta&utm_campaign=aida_hero&utm_content=encuesta_rapida"
                className="btn btn-secondary"
                style={{ display: 'inline-block', textDecoration: 'none' }}
                onClick={() => track('cta_click', { cta_id: 'hero_encuesta', destination: '/encuesta' })}
              >
                Empezar con la encuesta rápida (90 seg) →
              </Link>
            </div>
            <div className="form-footer">
              🔒 Tus datos están seguros. Borrado en 1 clic.
            </div>
          </div>
        </div>
      </section>

      {/* ========== PAIN POINTS ========== */}
      <section className="pain-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">¿Te suena familiar?</span>
            <h2 className="section-title">El problema no eres tú. Es que nadie te enseñó a verte.</h2>
            <p className="section-subtitle">
              Después de años trabajando, sabes hacer muchas cosas. Pero cuando te preguntan "¿en qué eres bueno?", te quedas en blanco.
            </p>
          </div>

          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">😔</div>
              <h3>"No sé qué poner en mi CV que me haga destacar"</h3>
              <p>Has hecho mil cosas pero no sabes cómo contarlas. Tu CV parece genérico y tú sabes que no lo eres.</p>
            </div>

            <div className="pain-card">
              <div className="pain-icon">🔄</div>
              <h3>"Llevo 10 años en lo mismo y no sé qué más puedo hacer"</h3>
              <p>Sientes que estás atrapado en un rol que ya no te llena, pero no ves alternativas reales a las que puedas saltar.</p>
            </div>

            <div className="pain-card">
              <div className="pain-icon">🎭</div>
              <h3>"En las entrevistas no sé venderme"</h3>
              <p>Sabes que vales, pero cuando toca explicarlo te trabas. Ves a gente con menos experiencia conseguir mejores puestos.</p>
            </div>

            <div className="pain-card">
              <div className="pain-icon">❓</div>
              <h3>"No sé si buscar otro trabajo o aguantar aquí"</h3>
              <p>La incertidumbre paraliza. Sin claridad sobre qué quieres y qué puedes hacer, cualquier cambio da miedo.</p>
            </div>

            <div className="pain-card">
              <div className="pain-icon">📋</div>
              <h3>"He hecho tests de personalidad y no sirven para nada"</h3>
              <p>Te dicen que eres "INTJ" o "tipo azul" pero eso no se traduce en roles reales ni en oportunidades de trabajo.</p>
            </div>

            <div className="pain-card">
              <div className="pain-icon">💸</div>
              <h3>"Un coach de carrera cuesta €200/hora"</h3>
              <p>Y necesitas 5-10 sesiones para llegar a algún sitio. €2000 que no tienes, para resultados que no están garantizados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Cómo funciona</span>
            <h2 className="section-title">De "no sé" a "ahora lo veo claro" en 3 pasos</h2>
            <p className="section-subtitle">
              Sin formularios interminables. Sin esperar semanas. Sin humo motivacional.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <span className="step-time">5 minutos</span>
              <h3>Cuéntanos tu historia</h3>
              <p>Sube tu CV o responde unas preguntas sobre tu experiencia. No necesitas que esté perfecto ni actualizado.</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <span className="step-time">15 minutos</span>
              <h3>La IA analiza todo</h3>
              <p>Extraemos habilidades que ni sabías que tenías. Las categorizamos, las puntuamos, y las conectamos con el mercado real.</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <span className="step-time">Inmediato</span>
              <h3>Recibes tu mapa completo</h3>
              <p>Habilidades descubiertas, roles que encajan, gaps a cubrir, y materiales listos para usar. Accionable desde el minuto 1.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Qué obtienes</span>
            <h2 className="section-title">Claridad que cuesta menos que una sesión de coach</h2>
            <p className="section-subtitle">
              Empieza gratis. Paga solo si quieres profundizar.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <div className="pricing-name">Mapa de Habilidades</div>
                <div className="pricing-price">Gratis</div>
                <div className="pricing-desc">Para empezar a verte</div>
              </div>
              <ul className="pricing-features">
                <li>Análisis de tu experiencia con IA</li>
                <li>Lista de habilidades duras y blandas</li>
                <li>Puntuación de confianza por habilidad</li>
                <li>Resumen compartible en redes</li>
                <li>Descarga en PDF</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => { track('cta_click', { cta_id: 'focus_signup_email' }); document.querySelector('.form-card input[type="email"]').focus() }}>
                Empezar gratis →
              </button>
            </div>

            <div className="pricing-card featured">
              <span className="pricing-badge">Más popular</span>
              <div className="pricing-header">
                <div className="pricing-name">Pack Básico</div>
                <div className="pricing-price">€29 <span>pago único</span></div>
                <div className="pricing-desc">Para saber hacia dónde ir</div>
              </div>
              <ul className="pricing-features">
                <li>Todo lo del plan Gratis</li>
                <li>Mapa de Roles personalizado (10-15 roles)</li>
                <li>Match % con cada rol</li>
                <li>Análisis de gaps por rol</li>
                <li>Rangos salariales por país</li>
                <li>Links a ofertas reales de cada rol</li>
              </ul>
              <button className="btn btn-primary" onClick={() => { track('cta_click', { cta_id: 'focus_signup_email' }); document.querySelector('.form-card input[type="email"]').focus() }}>
                Reservar mi lugar →
              </button>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <div className="pricing-name">Pack Completo</div>
                <div className="pricing-price">€49 <span>pago único</span></div>
                <div className="pricing-desc">Para conseguir el trabajo</div>
              </div>
              <ul className="pricing-features">
                <li>Todo lo del Pack Básico</li>
                <li>CV optimizado para cada rol top</li>
                <li>Carta de presentación personalizada</li>
                <li>Elevator pitch escrito</li>
                <li>Guía de entrevista por rol</li>
                <li>30 días de actualizaciones</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => { track('cta_click', { cta_id: 'focus_signup_email' }); document.querySelector('.form-card input[type="email"]').focus() }}>
                Reservar mi lugar →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VS COMPARISON ========== */}
      <section className="vs-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Comparativa clara</span>
            <h2 className="section-title">❌ Lo típico vs ✅ Con Carrera IA</h2>
          </div>

          <div className="vs-pairs">
            <div className="vs-pair-row">
              <div className="vs-card">
                <h3><span className="vs-bad">✗</span> Tests de personalidad</h3>
                <p>Te dicen que eres "creativo" o "analítico" pero no te dicen qué hacer con eso. Cero conexión con roles reales. Resultados que guardas en un cajón.</p>
              </div>
              <div className="vs-card">
                <h3><span className="vs-good">✓</span> Con Carrera IA</h3>
                <p>Analizamos TU experiencia real. Te decimos exactamente qué roles encajan, qué habilidades tienes, y qué te falta. Accionable desde el día 1.</p>
              </div>
            </div>

            <div className="vs-pair-row">
              <div className="vs-card">
                <h3><span className="vs-bad">✗</span> Coaches de carrera</h3>
                <p>€200-500 por hora. Necesitas 5-10 sesiones. Semanas de espera. Depende de la calidad del coach. €2000+ y meses para tener claridad.</p>
              </div>
              <div className="vs-card">
                <h3><span className="vs-good">✓</span> Con Carrera IA</h3>
                <p>€29-49 una vez. Resultados en 15 minutos. Sin depender de nadie. La misma claridad por el precio de una cena.</p>
              </div>
            </div>

            <div className="vs-pair-row">
              <div className="vs-card">
                <h3><span className="vs-bad">✗</span> Hacerlo tú solo</h3>
                <p>Horas mirando ofertas sin saber si encajas. CV que envías sin respuesta. Síndrome del impostor que no te deja ver lo que vales.</p>
              </div>
              <div className="vs-card">
                <h3><span className="vs-good">✓</span> Con Carrera IA</h3>
                <p>IA entrenada para ver lo que tú no ves. Extrae habilidades de entre líneas. Te muestra el valor que llevas años ignorando.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Preguntas frecuentes</span>
            <h2 className="section-title">Lo que probablemente te estás preguntando</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">¿Qué recibo al dejar mi correo?</h3>
              <p className="faq-answer">Recibes un email de bienvenida con acceso a la encuesta de diagnóstico y los siguientes pasos para ser beta tester. Cuando se active tu turno, te avisamos por email para generar tu Mapa de Habilidades.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">¿Funciona si llevo muchos años en el mismo trabajo?</h3>
              <p className="faq-answer">Especialmente bien. Cuanto más tiempo llevas, más habilidades has desarrollado sin darte cuenta. La IA es muy buena extrayendo competencias "invisibles" de experiencias largas.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">¿Y si mi CV está desactualizado o mal hecho?</h3>
              <p className="faq-answer">No importa. No evaluamos el formato ni la presentación. Extraemos la información de fondo: qué has hecho, dónde, cuánto tiempo. Con eso es suficiente.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">¿Mis datos están seguros?</h3>
              <p className="faq-answer">Sí. No compartimos tu información con nadie. No vendemos datos. Tu CV y resultados solo los ves tú. Puedes pedir que borremos todo en cualquier momento.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">¿Funciona para cualquier sector o país?</h3>
              <p className="faq-answer">Sí. Tenemos datos de salarios y roles para España, México, Argentina, Colombia y el resto de Latinoamérica. El catálogo de roles cubre tech, negocio, operaciones, creativos, y más.</p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">¿Puedo pagar el pack de €49 después de probar el gratis?</h3>
              <p className="faq-answer">Por supuesto. Empieza gratis, ve tu Mapa de Habilidades, y si quieres profundizar con roles y CVs, desbloqueas el pack que prefieras en cualquier momento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="cta-section">
        <div className="cta-content container">
          <h2>Deja de adivinar.<br/><span className="highlight">Empieza a saber.</span></h2>
          <p className="subtitle">
            Los primeros 100 reciben el Mapa de Habilidades completamente gratis.<br/>
            Sin trucos. Sin tarjeta. Sin letra pequeña.
          </p>
          
          <div className="form-card" style={{background: 'transparent', border: 'none', boxShadow: 'none'}}>
            <SignupForm buttonText="Reservar mi lugar gratis →" />
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer>
        <div style={{marginBottom: '14px'}}>
          <strong>Recursos:</strong>{' '}
          <a href="/como-identificar-habilidades" style={{marginRight: '10px'}}>Cómo identificar habilidades</a>
          <a href="/cambio-carrera-profesional" style={{marginRight: '10px'}}>Cambio de carrera</a>
          <a href="/test-habilidades-profesionales" style={{marginRight: '10px'}}>Test habilidades</a>
          <a href="/orientacion-laboral-gratis-online" style={{marginRight: '10px'}}>Orientación laboral gratis</a>
          <a href="/encuesta">Encuesta</a>
        </div>
        <p>© 2026 NegoIA · Hecho para profesionales que merecen más</p>
      </footer>
    </>
  )
}
