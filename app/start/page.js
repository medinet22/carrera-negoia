'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StartAssessment() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [skillsCount, setSkillsCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cvUploading, setCvUploading] = useState(false)
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    country: 'ES',
    cv_file: null,
    cv_url: null,
    cv_text: '',
    cv_description: '',
    proudest_achievement: '',
    what_makes_different: '',
    work_preference: '',
    productive_environment: '',
    greatest_strength: '',
    next_role_change: '',
    job_search_status: '',
    role_in_mind: ''
  })

  const totalSteps = 5

  // Simulate skills counter based on filled fields
  useEffect(() => {
    let count = 0
    if (formData.cv_text || formData.cv_url) count += 5
    if (formData.cv_description && formData.cv_description.length > 50) count += 3
    if (formData.proudest_achievement && formData.proudest_achievement.length > 30) count += 2
    if (formData.what_makes_different && formData.what_makes_different.length > 30) count += 2
    if (formData.greatest_strength && formData.greatest_strength.length > 20) count += 2
    if (formData.work_preference) count += 1
    if (formData.productive_environment) count += 1
    if (formData.next_role_change && formData.next_role_change.length > 30) count += 2
    setSkillsCount(count)
  }, [formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 5MB.')
      return
    }

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(file.type)) {
      alert('Solo aceptamos PDF o Word (.doc, .docx)')
      return
    }

    setCvUploading(true)
    try {
      const uploadData = new FormData()
      uploadData.append('file', file)

      const res = await fetch('/api/upload-cv', {
        method: 'POST',
        body: uploadData
      })

      const result = await res.json()
      if (result.url) {
        handleInputChange('cv_url', result.url)
        handleInputChange('cv_text', result.text || '')
        handleInputChange('cv_file', file.name)
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Error subiendo el CV')
    } finally {
      setCvUploading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!formData.email) {
      alert('Por favor, introduce tu email')
      return
    }

    setLoading(true)
    try {
      // Save to localStorage for recovery
      localStorage.setItem('carrera_user_email', formData.email)
      localStorage.setItem('carrera_user_name', formData.name)
      localStorage.setItem('carrera_user_country', formData.country)

      const res = await fetch('/api/process-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          country: formData.country,
          cv_text: formData.cv_text,
          cv_file_url: formData.cv_url,
          intake_answers: {
            cv_description: formData.cv_description,
            proudest_achievement: formData.proudest_achievement,
            what_makes_different: formData.what_makes_different,
            work_preference: formData.work_preference,
            productive_environment: formData.productive_environment,
            greatest_strength: formData.greatest_strength,
            next_role_change: formData.next_role_change,
            job_search_status: formData.job_search_status,
            role_in_mind: formData.role_in_mind
          }
        })
      })

      const result = await res.json()
      if (result.userId) {
        localStorage.setItem('carrera_user_id', result.userId)
        localStorage.setItem('carrera_job_id', result.jobId)
        router.push(`/processing?userId=${result.userId}&jobId=${result.jobId}`)
      } else {
        alert('Error procesando tu assessment. Por favor, inténtalo de nuevo.')
      }
    } catch (err) {
      console.error('Submit error:', err)
      alert('Error de conexión. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.email && formData.name
      case 2: return formData.cv_url || formData.cv_description.length > 50
      case 3: return formData.proudest_achievement.length > 20
      case 4: return formData.work_preference && formData.greatest_strength
      case 5: return formData.next_role_change.length > 20
      default: return true
    }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f8fafc',
      padding: '20px'
    },
    inner: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    progressBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px',
      padding: '20px 0'
    },
    progressDot: (active, completed) => ({
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      background: completed ? 'linear-gradient(135deg, #10b981, #059669)' : 
                  active ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 
                  'rgba(255,255,255,0.1)',
      color: (completed || active) ? '#fff' : 'rgba(255,255,255,0.5)',
      transition: 'all 0.3s ease'
    }),
    progressLine: (completed) => ({
      flex: 1,
      height: '2px',
      background: completed ? '#10b981' : 'rgba(255,255,255,0.1)',
      margin: '0 8px',
      transition: 'all 0.3s ease'
    }),
    skillsCounter: {
      textAlign: 'center',
      padding: '16px',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '12px',
      marginBottom: '30px',
      border: '1px solid rgba(99, 102, 241, 0.3)'
    },
    socialProof: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '8px'
    },
    skillsNumber: {
      fontSize: '28px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    card: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '40px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '32px'
    },
    inputGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      color: 'rgba(255,255,255,0.8)'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(255,255,255,0.05)',
      color: '#f8fafc',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(255,255,255,0.05)',
      color: '#f8fafc',
      fontSize: '16px',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(30, 41, 59, 0.9)',
      color: '#f8fafc',
      fontSize: '16px',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    radioOption: (selected) => ({
      padding: '16px',
      borderRadius: '10px',
      border: selected ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
      background: selected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }),
    uploadArea: (hasFile) => ({
      border: hasFile ? '2px solid #10b981' : '2px dashed rgba(255,255,255,0.2)',
      borderRadius: '12px',
      padding: '32px',
      textAlign: 'center',
      cursor: 'pointer',
      background: hasFile ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
      transition: 'all 0.2s'
    }),
    buttonRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '32px',
      gap: '16px'
    },
    buttonSecondary: {
      padding: '14px 28px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'transparent',
      color: '#f8fafc',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    buttonPrimary: (disabled) => ({
      padding: '14px 28px',
      borderRadius: '10px',
      border: 'none',
      background: disabled ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: disabled ? 'rgba(255,255,255,0.5)' : '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      flex: 1
    }),
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 12px',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '8px',
      fontSize: '13px',
      color: '#10b981',
      marginTop: '12px'
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 style={styles.title}>Tu Punto de Partida</h2>
            <p style={styles.subtitle}>Empecemos conociéndote un poco</p>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                style={styles.input}
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Cómo te llamas? *</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Desde dónde nos escribes?</label>
              <select
                style={styles.select}
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <option value="ES">🇪🇸 España</option>
                <option value="MX">🇲🇽 México</option>
                <option value="CO">🇨🇴 Colombia</option>
                <option value="AR">🇦🇷 Argentina</option>
                <option value="OTHER">🌎 Otro país</option>
              </select>
            </div>
          </>
        )

      case 2:
        return (
          <>
            <h2 style={styles.title}>Tu Experiencia</h2>
            <p style={styles.subtitle}>Cuéntanos sobre tu trayectoria profesional</p>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sube tu CV (opcional pero recomendado)</label>
              <div 
                style={styles.uploadArea(!!formData.cv_url)}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={handleCvUpload}
                />
                {cvUploading ? (
                  <p>⏳ Subiendo...</p>
                ) : formData.cv_url ? (
                  <>
                    <p style={{ fontSize: '24px', marginBottom: '8px' }}>✅</p>
                    <p>{formData.cv_file || 'CV subido correctamente'}</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: '24px', marginBottom: '8px' }}>📄</p>
                    <p>Arrastra tu CV aquí o haz clic para subir</p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                      PDF o Word, máximo 5MB
                    </p>
                  </>
                )}
              </div>
              <div style={styles.badge}>
                🔒 Tu CV nunca se comparte con terceros
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                {formData.cv_url ? 'O añade algo más sobre tu experiencia' : 'Sin CV, describe brevemente tu trayectoria *'}
              </label>
              <textarea
                style={styles.textarea}
                placeholder="Ej: 8 años en marketing digital, últimos 4 liderando equipos de 5 personas en agencias..."
                value={formData.cv_description}
                onChange={(e) => handleInputChange('cv_description', e.target.value)}
              />
            </div>
          </>
        )

      case 3:
        return (
          <>
            <h2 style={styles.title}>Tus Logros</h2>
            <p style={styles.subtitle}>Cuéntanos de lo que estás orgulloso/a</p>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>¿De qué logro profesional estás más orgulloso/a? *</label>
              <textarea
                style={styles.textarea}
                placeholder="Ej: Lideré un proyecto que incrementó las ventas un 40% en 6 meses..."
                value={formData.proudest_achievement}
                onChange={(e) => handleInputChange('proudest_achievement', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Qué hace tu trabajo actual diferente al de tus compañeros?</label>
              <textarea
                style={styles.textarea}
                placeholder="Ej: Soy el único que conecta con clientes difíciles, todos me pasan sus casos..."
                value={formData.what_makes_different}
                onChange={(e) => handleInputChange('what_makes_different', e.target.value)}
              />
            </div>
          </>
        )

      case 4:
        return (
          <>
            <h2 style={styles.title}>Tu Estilo</h2>
            <p style={styles.subtitle}>Cómo te gusta trabajar</p>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Prefieres trabajar con...? *</label>
              <div style={styles.radioGroup}>
                {['Personas', 'Datos', 'Ideas', 'Procesos', 'Mezcla de todo'].map(option => (
                  <div 
                    key={option}
                    style={styles.radioOption(formData.work_preference === option)}
                    onClick={() => handleInputChange('work_preference', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿En qué entorno te sientes más productivo/a?</label>
              <div style={styles.radioGroup}>
                {['Oficina tradicional', 'Remoto 100%', 'Híbrido', 'Me adapto bien a todo'].map(option => (
                  <div 
                    key={option}
                    style={styles.radioOption(formData.productive_environment === option)}
                    onClick={() => handleInputChange('productive_environment', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Cuál es tu mayor fortaleza según quienes trabajan contigo? *</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Ej: Comunicación, liderazgo, resolver problemas..."
                value={formData.greatest_strength}
                onChange={(e) => handleInputChange('greatest_strength', e.target.value)}
              />
            </div>
          </>
        )

      case 5:
        return (
          <>
            <h2 style={styles.title}>Tus Ambiciones</h2>
            <p style={styles.subtitle}>¿Qué buscas en tu próximo paso?</p>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Qué quieres que sea diferente en tu próximo rol? *</label>
              <textarea
                style={styles.textarea}
                placeholder="Ej: Quiero más autonomía, mejor equilibrio trabajo-vida, liderar un equipo más grande..."
                value={formData.next_role_change}
                onChange={(e) => handleInputChange('next_role_change', e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Cómo describirías tu situación actual?</label>
              <div style={styles.radioGroup}>
                {['Buscando activamente', 'Explorando opciones', 'Solo curioso/a'].map(option => (
                  <div 
                    key={option}
                    style={styles.radioOption(formData.job_search_status === option)}
                    onClick={() => handleInputChange('job_search_status', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>¿Tienes algún rol en mente o partes desde cero?</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Ej: Product Manager, no tengo claro, algo en tech..."
                value={formData.role_in_mind}
                onChange={(e) => handleInputChange('role_in_mind', e.target.value)}
              />
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Progress bar */}
        <div style={styles.progressBar}>
          {[1, 2, 3, 4, 5].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 4 ? 1 : 'none' }}>
              <div style={styles.progressDot(currentStep === step, currentStep > step)}>
                {currentStep > step ? '✓' : step}
              </div>
              {i < 4 && <div style={styles.progressLine(currentStep > step)} />}
            </div>
          ))}
        </div>

        {/* Skills counter */}
        {skillsCount > 0 && (
          <div style={styles.skillsCounter}>
            <span>→ </span>
            <span style={styles.skillsNumber}>{skillsCount}</span>
            <span> habilidades identificadas hasta ahora</span>
            <div style={styles.socialProof}>🟢 12 personas completaron su mapa hoy</div>
          </div>
        )}

        {/* Form card */}
        <div style={styles.card}>
          {renderStep()}

          {/* Navigation */}
          <div style={styles.buttonRow}>
            {currentStep > 1 && (
              <button style={styles.buttonSecondary} onClick={prevStep}>
                ← Anterior
              </button>
            )}
            {currentStep < totalSteps ? (
              <button 
                style={styles.buttonPrimary(!canProceed())}
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Siguiente →
              </button>
            ) : (
              <button 
                style={styles.buttonPrimary(!canProceed() || loading)}
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
              >
                {loading ? 'Procesando...' : 'Generar mi Mapa de Habilidades →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
