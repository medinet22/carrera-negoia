'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ProfileContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [loading, setLoading] = useState(true)
  const [skillsMap, setSkillsMap] = useState(null)
  const [topRoles, setTopRoles] = useState([])
  const [user, setUser] = useState(null)
  const [hasPaid, setHasPaid] = useState(false)
  const [error, setError] = useState(null)
  const [shareCopied, setShareCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Mi Mapa de Habilidades', url })
      } else {
        await navigator.clipboard.writeText(url)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      } catch {}
    }
  }

  useEffect(() => {
    if (!userId) {
      router.push('/start')
      return
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/profile?userId=${userId}`)
        const data = await res.json()
        
        if (data.error) {
          setError(data.error)
          return
        }

        setUser(data.user)
        setSkillsMap(data.skillsMap)
        setTopRoles(data.topRoles || [])
        setHasPaid(data.hasPaid || false)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Error cargando tu perfil')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, router])

  const getLevelLabel = (level) => {
    if (level >= 5) return { text: 'REFERENTE', color: '#10b981' }
    if (level >= 4) return { text: 'EXPERTO', color: '#6366f1' }
    if (level >= 3) return { text: 'AVANZADO', color: '#8b5cf6' }
    if (level >= 2) return { text: 'COMPETENTE', color: '#f59e0b' }
    return { text: 'EN DESARROLLO', color: '#94a3b8' }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f8fafc',
      padding: '20px',
      overflowX: 'hidden'
    },
    inner: {
      maxWidth: '900px',
      margin: '0 auto',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    title: {
      fontSize: 'clamp(24px, 6vw, 32px)',
      fontWeight: '800',
      wordBreak: 'break-word'
    },
    shareBtn: {
      padding: '12px 24px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'transparent',
      color: '#f8fafc',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    oneLiner: {
      fontSize: '18px',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '32px',
      fontStyle: 'italic'
    },
    card: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: 'clamp(16px, 4vw, 32px)',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '24px',
      maxWidth: '100%',
      boxSizing: 'border-box',
      wordBreak: 'break-word'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    // Superpower Card - Special styling
    superpowerCard: {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      marginBottom: '24px',
      position: 'relative',
      overflow: 'hidden'
    },
    superpowerGlow: {
      position: 'absolute',
      top: '-50%',
      right: '-20%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
      pointerEvents: 'none'
    },
    superpowerTitle: {
      fontSize: '28px',
      fontWeight: '800',
      marginBottom: '12px',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block'
    },
    superpowerDescription: {
      fontSize: '16px',
      lineHeight: '1.7',
      color: 'rgba(255,255,255,0.85)',
      marginBottom: '16px'
    },
    superpowerSkills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    superpowerSkillChip: {
      padding: '6px 14px',
      borderRadius: '20px',
      background: 'rgba(99, 102, 241, 0.2)',
      border: '1px solid rgba(99, 102, 241, 0.4)',
      fontSize: '13px',
      fontWeight: '500'
    },
    // Employability Index Card
    employabilityCard: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '24px'
    },
    employabilityHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px'
    },
    employabilityScore: {
      fontSize: 'clamp(36px, 10vw, 56px)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    employabilityLabel: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    employabilityBar: {
      width: '100%',
      height: '12px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '6px',
      overflow: 'hidden',
      marginBottom: '24px'
    },
    employabilityBarFill: (score) => ({
      width: `${score}%`,
      height: '100%',
      background: `linear-gradient(135deg, ${score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}, ${score >= 70 ? '#06b6d4' : score >= 50 ? '#eab308' : '#f97316'})`,
      borderRadius: '6px',
      transition: 'width 1s ease-out'
    }),
    improvementsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    improvementItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '10px',
      border: '1px solid rgba(16, 185, 129, 0.2)'
    },
    improvementAction: {
      fontSize: '14px',
      flex: 1
    },
    improvementPoints: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#10b981',
      background: 'rgba(16, 185, 129, 0.2)',
      padding: '4px 10px',
      borderRadius: '6px'
    },
    // What others see
    whatOthersSeeCard: {
      background: 'rgba(251, 191, 36, 0.1)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      marginBottom: '24px'
    },
    whatOthersSeeQuote: {
      fontSize: '18px',
      fontStyle: 'italic',
      lineHeight: '1.7',
      color: 'rgba(255,255,255,0.9)',
      position: 'relative',
      paddingLeft: '24px'
    },
    quoteIcon: {
      position: 'absolute',
      left: 0,
      top: '-4px',
      fontSize: '24px',
      color: '#fbbf24',
      opacity: 0.6
    },
    // Fear addressed card
    fearCard: {
      background: 'rgba(139, 92, 246, 0.1)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      marginBottom: '24px'
    },
    fearTitle: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '12px'
    },
    fearQuote: {
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#f472b6',
      marginBottom: '16px'
    },
    fearReality: {
      fontSize: '15px',
      lineHeight: '1.7',
      color: 'rgba(255,255,255,0.85)'
    },
    radarContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    narrativeText: {
      fontSize: '16px',
      lineHeight: '1.8',
      color: 'rgba(255,255,255,0.85)',
      whiteSpace: 'pre-wrap'
    },
    skillsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    skillItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    skillName: {
      fontSize: '15px',
      fontWeight: '600'
    },
    skillLevel: (color) => ({
      fontSize: '12px',
      fontWeight: '700',
      color: color,
      padding: '4px 10px',
      background: `${color}20`,
      borderRadius: '6px'
    }),
    skillBar: (level, color) => ({
      width: '120px',
      height: '8px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginRight: '12px'
    }),
    skillBarFill: (level, color) => ({
      width: `${(level / 5) * 100}%`,
      height: '100%',
      background: color,
      borderRadius: '4px'
    }),
    skillEvidence: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '6px'
    },
    // Market Comparison Badge - NEW
    marketComparison: {
      fontSize: '11px',
      color: '#10b981',
      background: 'rgba(16, 185, 129, 0.15)',
      padding: '3px 8px',
      borderRadius: '4px',
      marginTop: '6px',
      display: 'inline-block'
    },
    rolesPreview: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
      gap: '16px'
    },
    roleCard: (locked) => ({
      padding: '24px',
      background: locked ? 'rgba(255,255,255,0.02)' : 'rgba(99, 102, 241, 0.1)',
      borderRadius: '16px',
      border: locked ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(99, 102, 241, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }),
    roleBlur: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1
    },
    lockIcon: {
      fontSize: '24px'
    },
    roleTitle: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    roleMatch: {
      fontSize: 'clamp(24px, 6vw, 32px)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px'
    },
    roleSalary: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.6)'
    },
    ctaSection: {
      textAlign: 'center',
      padding: '48px 32px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
      borderRadius: '20px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      marginTop: '32px'
    },
    ctaTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '12px'
    },
    ctaSubtitle: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '24px'
    },
    ctaButton: {
      padding: '16px 40px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none'
    }
  }

  // Simple radar chart using CSS
  const RadarChart = ({ data }) => {
    if (!data || data.length === 0) return null
    
    const maxValue = 100
    const centerX = 150
    const centerY = 150
    const maxRadius = 120
    
    const angleStep = (2 * Math.PI) / data.length
    
    const getPoint = (value, index) => {
      const angle = angleStep * index - Math.PI / 2
      const radius = (value / maxValue) * maxRadius
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      }
    }
    
    const points = data.map((d, i) => getPoint(d.value, i))
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
    
    return (
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map(level => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / maxValue) * maxRadius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines and labels */}
        {data.map((d, i) => {
          const endPoint = getPoint(100, i)
          const labelPoint = getPoint(115, i)
          return (
            <g key={i}>
              <line
                x1={centerX}
                y1={centerY}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {d.axis}
              </text>
            </g>
          )
        })}
        
        {/* Data polygon */}
        <path
          d={pathData}
          fill="rgba(99, 102, 241, 0.3)"
          stroke="#6366f1"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="#6366f1"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
      </svg>
    )
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.inner, textAlign: 'center', paddingTop: '100px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>🧠</div>
          <p>Cargando tu perfil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.inner, textAlign: 'center', paddingTop: '100px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>😕</div>
          <p>{error}</p>
          <Link href="/start" style={{ ...styles.ctaButton, marginTop: '24px' }}>
            Empezar de nuevo
          </Link>
        </div>
      </div>
    )
  }

  const allSkills = [
    ...(skillsMap?.hard_skills || []).map(s => ({ ...s, type: 'hard' })),
    ...(skillsMap?.soft_skills || []).map(s => ({ ...s, type: 'soft' }))
  ].sort((a, b) => b.level - a.level).slice(0, 8)

  // Extract superpower, employability, and fear from skillsMap
  const superpower = skillsMap?.superpower
  const whatOthersSee = skillsMap?.what_others_see
  const fearAddressed = skillsMap?.fear_addressed
  const employabilityIndex = skillsMap?.employability_index

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Tu Mapa de Habilidades</h1>
          <button style={styles.shareBtn} onClick={handleShare}>
            {shareCopied ? '✅ ¡Enlace copiado!' : '🔗 Compartir'}
          </button>
        </div>

        {/* One-liner */}
        {skillsMap?.summary_one_liner && (
          <p style={styles.oneLiner}>"{skillsMap.summary_one_liner}"</p>
        )}

        {/* SUPERPOWER SECTION - NEW */}
        {superpower && (
          <div style={styles.superpowerCard}>
            <div style={styles.superpowerGlow} />
            <h3 style={styles.cardTitle}>⚡ Tu Superpoder</h3>
            <div style={styles.superpowerTitle}>
              {superpower.title_es || superpower.title}
            </div>
            <p style={styles.superpowerDescription}>
              {superpower.description_short || superpower.description}
            </p>
            {superpower.rare_combination && (
              <div style={styles.superpowerSkills}>
                {superpower.rare_combination.map((skill, i) => (
                  <span key={i} style={styles.superpowerSkillChip}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EMPLOYABILITY INDEX - NEW */}
        {employabilityIndex && (
          <div style={styles.employabilityCard}>
            <div style={styles.employabilityHeader}>
              <div>
                <div style={styles.employabilityLabel}>Índice de Empleabilidad</div>
                <div style={styles.employabilityScore}>{employabilityIndex.score}/100</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                  Para roles:
                </div>
                <div style={{ fontSize: '14px' }}>
                  {employabilityIndex.target_roles?.slice(0, 3).join(', ')}
                </div>
              </div>
            </div>
            
            <div style={styles.employabilityBar}>
              <div style={styles.employabilityBarFill(employabilityIndex.score)} />
            </div>

            {employabilityIndex.improvements && employabilityIndex.improvements.length > 0 && (
              <>
                <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                  Cómo mejorar tu score:
                </h4>
                <div style={styles.improvementsList}>
                  {employabilityIndex.improvements.slice(0, 3).map((imp, i) => (
                    <div key={i} style={styles.improvementItem}>
                      <span style={styles.improvementAction}>{imp.action}</span>
                      <span style={styles.improvementPoints}>+{imp.points} pts</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* What Others See - NEW */}
        {whatOthersSee && (
          <div style={styles.whatOthersSeeCard}>
            <h3 style={styles.cardTitle}>👁️ Lo que otros ven en ti</h3>
            <p style={styles.whatOthersSeeQuote}>
              <span style={styles.quoteIcon}>"</span>
              {whatOthersSee}
            </p>
          </div>
        )}

        {/* Fear Addressed - NEW */}
        {fearAddressed && fearAddressed.fear && (
          <div style={styles.fearCard}>
            <h3 style={styles.cardTitle}>💜 El miedo que tienes (y por qué es infundado)</h3>
            <div style={styles.fearTitle}>Mencionaste:</div>
            <p style={styles.fearQuote}>"{fearAddressed.fear}"</p>
            <p style={styles.fearReality}>
              <strong>La realidad:</strong> {fearAddressed.reality}
            </p>
            {fearAddressed.reframe && (
              <p style={{ ...styles.fearReality, marginTop: '12px', color: '#a78bfa' }}>
                {fearAddressed.reframe}
              </p>
            )}
          </div>
        )}

        {/* Radar Chart */}
        {skillsMap?.radar_data && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📊 Tu perfil visual</h3>
            <div style={styles.radarContainer}>
              <RadarChart data={skillsMap.radar_data} />
            </div>
          </div>
        )}

        {/* Narrative */}
        {skillsMap?.narrative_text && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📝 Tu historia profesional</h3>
            <p style={styles.narrativeText}>{skillsMap.narrative_text}</p>
          </div>
        )}

        {/* Skills List */}
        {allSkills.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>💪 Tus habilidades principales</h3>
            <div style={styles.skillsList}>
              {/* First 3 skills — fully visible (or all if hasPaid) */}
              {(hasPaid ? allSkills : allSkills.slice(0, 3)).map((skill, i) => {
                const levelInfo = getLevelLabel(skill.level)
                const getMarketPercentile = (level) => {
                  if (level >= 5) return 95
                  if (level >= 4) return 82
                  if (level >= 3) return 65
                  if (level >= 2) return 45
                  return 25
                }
                const percentile = getMarketPercentile(skill.level)
                return (
                  <div key={i} style={styles.skillItem}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={styles.skillName}>{skill.name_es || skill.name}</div>
                      {skill.evidence && (
                        <div style={styles.skillEvidence}>{skill.evidence}</div>
                      )}
                      {skill.level >= 3 && (
                        <div style={styles.marketComparison}>
                          📊 Por encima del {percentile}% de profesionales en tu sector
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <div style={styles.skillBar(skill.level, levelInfo.color)}>
                        <div style={styles.skillBarFill(skill.level, levelInfo.color)} />
                      </div>
                      <span style={styles.skillLevel(levelInfo.color)}>{levelInfo.text}</span>
                    </div>
                  </div>
                )
              })}
              
              {/* Locked skills 4-8 (only if !hasPaid) */}
              {!hasPaid && allSkills.slice(3).map((skill, i) => {
                const levelInfo = getLevelLabel(skill.level)
                return (
                  <div key={`locked-skill-${i}`} style={{ ...styles.skillItem, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <div>
                        <div style={styles.skillName}>{skill.name_es || skill.name}</div>
                        {skill.evidence && (
                          <div style={styles.skillEvidence}>{skill.evidence}</div>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={styles.skillBar(skill.level, levelInfo.color)}>
                          <div style={styles.skillBarFill(skill.level, levelInfo.color)} />
                        </div>
                        <span style={styles.skillLevel(levelInfo.color)}>{levelInfo.text}</span>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '18px' }}>🔒</span>
                    </div>
                  </div>
                )
              })}
              
              {/* "Y X habilidades más" text */}
              {!hasPaid && allSkills.length > 3 && (
                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                  Y {allSkills.length - 3} habilidades más en tu análisis completo
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roles Preview */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎯 Roles donde encajas</h3>
          <div style={styles.rolesPreview}>
            {/* First role — fully visible */}
            {topRoles[0] && (
              <div style={styles.roleCard(false)}>
                <div style={styles.roleTitle}>{topRoles[0].title_es || topRoles[0].title}</div>
                <div style={styles.roleMatch}>{topRoles[0].match_percentage}% match</div>
                <div style={styles.roleSalary}>
                  {topRoles[0].salary_range || (
                    <span 
                      onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ color: '#818cf8', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Ver detalles de salario
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Roles 2 & 3 — blurred with lock */}
            {topRoles.slice(1, 3).map((role, i) => (
              <div key={`locked-${i}`} style={{ ...styles.roleCard(true), position: 'relative', overflow: 'hidden' }}>
                <div style={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={styles.roleTitle}>{role.title_es || role.title}</div>
                  <div style={styles.roleMatch}>{role.match_percentage}% match</div>
                  <div style={styles.roleSalary}>{role.salary_range || 'Ver detalles'}</div>
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '20px' }}>🔒</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {hasPaid ? (
          <div id="cta-section" style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>¡Ya tienes acceso completo!</h3>
            <p style={styles.ctaSubtitle}>Explora todos tus roles compatibles</p>
            <Link href={`/roles?userId=${userId}`} style={styles.ctaButton}>
              Explorar mis roles →
            </Link>
          </div>
        ) : (
          <div id="cta-section" style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>Ve qué roles encajan contigo de verdad</h3>
            <p style={styles.ctaSubtitle}>
              Análisis completo de 26+ roles con tu % de compatibilidad, rango salarial real y plan de transición paso a paso
            </p>
            <Link href={`/upgrade?userId=${userId}`} style={styles.ctaButton}>
              Ver mi análisis completo desde €29 →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc'
      }}>
        <p>Cargando tu perfil...</p>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  )
}
