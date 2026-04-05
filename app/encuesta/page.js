'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './encuesta.module.css'
import { track } from '../lib/analytics'

export default function Encuesta() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [answers, setAnswers] = useState({
    email: '',
    situation: '',
    frustration: '',
    tried_solutions: [],
    paid_before: '',
    would_pay: '',
    price_range: '',
    urgency: '',
    goal: ''
  })

  const handleChange = (field) => (e) => {
    setAnswers(prev => ({ ...prev, [field]: e.target.value }))
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const p = new URLSearchParams(window.location.search)
    const email = p.get('email')
    if (email) {
      setAnswers(prev => ({ ...prev, email }))
    }
  }, [])

  const toggleCheckbox = (field, value) => {
    setAnswers(prev => {
      const current = prev[field] || []
      return {
        ...prev,
        [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      }
    })
  }

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = async () => {
    if (!isValidEmail(answers.email || '')) {
      setEmailError('Introduce un email válido (ejemplo@dominio.com)')
      return
    }

    track('signup_start', { source: 'encuesta', step })
    setLoading(true)
    try {
      await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'discovery_form',
          email: answers.email,
          pain_points: `Situación: ${answers.situation} | Frustración: ${answers.frustration} | Urgencia: ${answers.urgency}`,
          current_solutions: answers.tried_solutions.join(', '),
          willingness_to_pay: answers.would_pay,
          price: answers.price_range,
          would_buy: answers.would_pay === 'definitely' || answers.would_pay === 'probably',
          notes: `Objetivo: ${answers.goal}`
        })
      })
      track('signup_complete', { source: 'encuesta' })
      setSubmitted(true)
    } catch (err) {
      track('signup_error', { source: 'encuesta' })
      console.error(err)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className={styles.surveyPage}>
        <div className={styles.surveyContainer}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <h1>¡Listo! Gracias por responder</h1>
            <p>En base a tus respuestas, te enviaremos próximos pasos y acceso beta por email.</p>
            <Link href="/" className={styles.btn}>Volver a la página principal →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.surveyPage}>
      <div className={styles.surveyContainer}>
        <header className={styles.surveyHeader}>
          <span className={styles.surveyBadge}>⏱️ 90 segundos · +340 profesionales ya lo hicieron</span>
          <h1>Descubre qué roles encajan contigo</h1>
          <p>Responde 3 preguntas y recibe recomendaciones personalizadas. Nada genérico.</p>
          {answers.email && <p className={styles.hint}>📩 Email detectado: <strong>{answers.email}</strong></p>}
        </header>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <div className={styles.questionGroup}>
          {step === 1 && (
            <>
              <h2>¿Qué describe mejor tu situación?</h2>
              <div className={styles.options}>
                {[
                  ['stuck', 'Llevo años en lo mismo y estoy estancado'],
                  ['searching', 'Estoy buscando trabajo y no sé cómo vender mi perfil'],
                  ['considering', 'Quiero cambiar de carrera, pero no sé hacia dónde'],
                  ['recently_unemployed', 'Perdí mi trabajo recientemente']
                ].map(([value, label]) => (
                  <label key={value} className={`${styles.option} ${answers.situation === value ? styles.selected : ''}`}>
                    <input type="radio" name="situation" value={value} checked={answers.situation === value} onChange={handleChange('situation')} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <h2>¿Qué te frustra más ahora?</h2>
              <div className={styles.options}>
                {[
                  ['cv', 'No sé cómo enfocar mi CV'],
                  ['direction', 'No sé qué rol me encaja'],
                  ['interviews', 'No sé venderme en entrevistas'],
                  ['confidence', 'Me falta claridad y confianza']
                ].map(([value, label]) => (
                  <label key={value} className={`${styles.option} ${answers.frustration === value ? styles.selected : ''}`}>
                    <input type="radio" name="frustration" value={value} checked={answers.frustration === value} onChange={handleChange('frustration')} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <button type="button" className={`${styles.btn} ${styles.btnNext}`} onClick={() => { track('cta_click', { cta_id: 'encuesta_step1_next' }); setStep(2) }} disabled={!answers.situation || !answers.frustration}>
                Siguiente →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>¿Qué has probado ya? (puedes marcar varias)</h2>
              <div className={styles.options}>
                {['Nada todavía', 'Tests de personalidad', 'Rehacer CV', 'Cursos online', 'Coach de carrera', 'Aplicar a ofertas al azar'].map((opt) => (
                  <label key={opt} className={`${styles.option} ${answers.tried_solutions.includes(opt) ? styles.selected : ''}`}>
                    <input type="checkbox" checked={answers.tried_solutions.includes(opt)} onChange={() => toggleCheckbox('tried_solutions', opt)} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <h2>¿Qué urgencia tienes para resolverlo?</h2>
              <div className={styles.options}>
                {[
                  ['high', 'Alta (este mes)'],
                  ['medium', 'Media (1-3 meses)'],
                  ['low', 'Baja (sin prisa)']
                ].map(([value, label]) => (
                  <label key={value} className={`${styles.option} ${answers.urgency === value ? styles.selected : ''}`}>
                    <input type="radio" name="urgency" value={value} checked={answers.urgency === value} onChange={handleChange('urgency')} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className={styles.btnGroup}>
                <button type="button" className={`${styles.btn} ${styles.btnBack}`} onClick={() => { track('cta_click', { cta_id: 'encuesta_step2_back' }); setStep(1) }}>← Atrás</button>
                <button type="button" className={`${styles.btn} ${styles.btnNext}`} onClick={() => { track('cta_click', { cta_id: 'encuesta_step2_next' }); setStep(3) }} disabled={!answers.urgency}>
                  Siguiente →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Si una IA te diera claridad de roles + plan concreto, ¿pagarías?</h2>
              <div className={styles.options}>
                {[
                  ['definitely', 'Definitivamente sí'],
                  ['probably', 'Probablemente sí'],
                  ['maybe', 'Depende del precio'],
                  ['no', 'No']
                ].map(([value, label]) => (
                  <label key={value} className={`${styles.option} ${answers.would_pay === value ? styles.selected : ''}`}>
                    <input type="radio" name="would_pay" value={value} checked={answers.would_pay === value} onChange={handleChange('would_pay')} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {(answers.would_pay === 'definitely' || answers.would_pay === 'probably' || answers.would_pay === 'maybe') && (
                <>
                  <h2>¿Qué precio te parecería razonable?</h2>
                  <div className={`${styles.options} ${styles.horizontal}`}>
                    {['19', '29', '49', '79'].map(price => (
                      <label key={price} className={`${styles.option} ${styles.price} ${answers.price_range === price ? styles.selected : ''}`}>
                        <input type="radio" name="price_range" value={price} checked={answers.price_range === price} onChange={handleChange('price_range')} />
                        <span>€{price}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              <h2>¿Qué resultado te haría decir "esto valió la pena"?</h2>
              <div className={styles.options}>
                {[
                  ['cv_ready', 'Tener un CV mucho más claro y fuerte'],
                  ['role_clarity', 'Saber qué roles me encajan realmente'],
                  ['interview_confidence', 'Sentirme listo para entrevistas'],
                  ['action_plan', 'Un plan concreto de 30 días']
                ].map(([value, label]) => (
                  <label key={value} className={`${styles.option} ${answers.goal === value ? styles.selected : ''}`}>
                    <input type="radio" name="goal" value={value} checked={answers.goal === value} onChange={handleChange('goal')} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {!answers.email && (
                <>
                  <h2>Tu email</h2>
                  <input type="email" className={styles.input} placeholder="tu@email.com" value={answers.email} onChange={(e)=>{handleChange('email')(e); if(!e.target.value || isValidEmail(e.target.value)) setEmailError('')}} onBlur={()=>{ if(answers.email && !isValidEmail(answers.email)) setEmailError('Introduce un email válido (ejemplo@dominio.com)') }} />
                  {emailError && <p className={styles.hint} style={{color:'#f87171'}}>{emailError}</p>}
                </>
              )}

              <p className={styles.hint}>📬 Te enviaremos solo el resumen + siguientes pasos. Cero spam.</p>
              <div className={styles.btnGroup}>
                <button type="button" className={`${styles.btn} ${styles.btnBack}`} onClick={() => { track('cta_click', { cta_id: 'encuesta_step3_back' }); setStep(2) }}>← Atrás</button>
                <button type="button" className={`${styles.btn} ${styles.btnSubmit}`} onClick={() => { track('cta_click', { cta_id: 'encuesta_submit' }); handleSubmit() }} disabled={loading || !answers.would_pay || !answers.goal || !answers.email}>
                  {loading ? 'Enviando...' : 'Enviar y recibir próximos pasos'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
