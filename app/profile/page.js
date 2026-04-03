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
    // SKILL CARD - Layout vertical para mobile-first
    skillItem: {
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '4px',
      border: '1px solid rgba(255,255,255,0.08)'
    },
    skillHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '10px',
      gap: '12px'
    },
    skillName: {
      fontSize: '15px',
      fontWeight: '600',
      color: 'white',
      wordBreak: 'keep-all',
      overflowWrap: 'break-word',
      minWidth: 0,
      flex: 1
    },
    skillLevel: (color) => ({
      flexShrink: 0,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      background: `${color}33`,
      color: color,
      border: `1px solid ${color}66`,
      whiteSpace: 'nowrap'
    }),
    skillBar: (level, color) => ({
      width: '100%',
      height: '6px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '10px'
    }),
    skillBarFill: (level, color) => ({
      width: `${(level / 5) * 100}%`,
      height: '100%',
      background: `linear-gradient(90deg, ${color}, ${color}dd)`,
      borderRadius: '4px',
      transition: 'width 0.8s ease'
    }),
    skillEvidence: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '8px'
    },
    // Market Comparison Badge - inline-flex
    marketComparison: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      background: 'rgba(16, 185, 129, 0.12)',
      color: '#6EE7B7',
      border: '1px solid rgba(16, 185, 129, 0.2)'
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

  // Handle both string arrays and object arrays for skills
  const parseSkill = (s, type, index) => {
    if (typeof s === 'string') {
      // Parse strings like "Innovation Strategy (expert level)" or just "Innovation Strategy"
      const match = s.match(/^(.+?)(?:\s*\(([^)]+)\))?$/)
      const name = match ? match[1].trim() : s
      const evidence = match && match[2] ? match[2] : null
      // Assign decreasing levels based on position (first = highest)
      const level = Math.max(5 - Math.floor(index / 2), 2)
      return { name, name_es: name, level, evidence, type }
    }
    return { ...s, type, level: s.level || 3 }
  }
  
  const allSkills = [
    ...(skillsMap?.hard_skills || []).map((s, i) => parseSkill(s, 'hard', i)),
    ...(skillsMap?.soft_skills || []).map((s, i) => parseSkill(s, 'soft', i))
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

        {/* SUPERPOWER SECTION - Handles both string and object format */}
        {superpower && (
          <div style={styles.superpowerCard}>
            <div style={styles.superpowerGlow} />
            <h3 style={styles.cardTitle}>⚡ Tu Superpoder</h3>
            {typeof superpower === 'string' ? (
              <>
                <div style={styles.superpowerTitle}>
                  Tu combinación única
                </div>
                <p style={styles.superpowerDescription}>
                  {superpower}
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}

        {/* EMPLOYABILITY INDEX - IMPROVED UX */}
        {employabilityIndex && (
          <div style={styles.employabilityCard}>
            <h3 style={styles.cardTitle}>📈 ¿Qué tan empleable eres ahora mismo?</h3>
            <div style={styles.employabilityHeader}>
              <div>
                <div style={styles.employabilityScore}>
                  {typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score}/100
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: (typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score) >= 75 ? '#10b981' : 
                         (typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score) >= 50 ? '#f59e0b' : '#ef4444',
                  marginTop: '4px'
                }}>
                  {(typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score) >= 80 ? '🔥 Muy demandado' : 
                   (typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score) >= 65 ? '✅ Muy empleable' : 
                   (typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score) >= 50 ? '💪 Empleable' : '📚 En desarrollo'}
                </div>
              </div>
            </div>
            
            <div style={{ 
              fontSize: '15px', 
              color: 'rgba(255,255,255,0.7)', 
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              Estás por encima del <strong style={{ color: '#10b981' }}>{typeof employabilityIndex === 'number' ? employabilityIndex : employabilityIndex.score}%</strong> de candidatos para los roles que encajan con tu perfil
            </div>

            {typeof employabilityIndex === 'object' && employabilityIndex.improvements && employabilityIndex.improvements.length > 0 && (
              <>
                <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', marginTop: '20px' }}>
                  Acciones para subir tu score:
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

        {/* Historia profesional con chips de skills */}
        {skillsMap?.narrative_text && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📝 Tu historia profesional</h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', marginBottom: '20px' }}>
              {skillsMap.narrative_text}
            </p>
            
            {/* Skills chips */}
            {(skillsMap?.hard_skills?.length > 0 || skillsMap?.soft_skills?.length > 0) && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Skills destacadas
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(skillsMap.hard_skills || []).slice(0, 6).map((skill, i) => {
                    const skillName = typeof skill === 'string' ? skill.split('(')[0].trim() : (skill.name_es || skill.name || skill)
                    return (
                      <span key={`hard-${i}`} style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: 'rgba(99, 102, 241, 0.15)',
                        color: 'rgba(165, 180, 252, 0.9)',
                        border: '1px solid rgba(99, 102, 241, 0.3)'
                      }}>{skillName}</span>
                    )
                  })}
                  {(skillsMap.soft_skills || []).slice(0, 4).map((skill, i) => {
                    const skillName = typeof skill === 'string' ? skill.split('(')[0].trim() : (skill.name_es || skill.name || skill)
                    return (
                      <span key={`soft-${i}`} style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: 'rgba(110, 231, 183, 0.9)',
                        border: '1px solid rgba(16, 185, 129, 0.25)'
                      }}>{skillName}</span>
                    )
                  })}
                </div>
              </div>
            )}
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
                    {/* Header: nombre + badge nivel */}
                    <div style={styles.skillHeader}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={styles.skillName}>{skill.name_es || skill.name}</div>
                        {skill.evidence && (
                          <div style={styles.skillEvidence}>{skill.evidence}</div>
                        )}
                      </div>
                      <span style={styles.skillLevel(levelInfo.color)}>{levelInfo.text}</span>
                    </div>
                    
                    {/* Barra de progreso - ancho completo */}
                    <div style={styles.skillBar(skill.level, levelInfo.color)}>
                      <div style={styles.skillBarFill(skill.level, levelInfo.color)} />
                    </div>
                    
                    {/* Badge percentil */}
                    {skill.level >= 3 && (
                      <div style={styles.marketComparison}>
                        📊 Por encima del {percentile}% de profesionales en tu sector
                      </div>
                    )}
                  </div>
                )
              })}
              
              {/* Locked skills 4-8 (only if !hasPaid) */}
              {!hasPaid && allSkills.slice(3).map((skill, i) => {
                const levelInfo = getLevelLabel(skill.level)
                return (
                  <div key={`locked-skill-${i}`} style={{ ...styles.skillItem, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none' }}>
                      {/* Header: nombre + badge nivel */}
                      <div style={styles.skillHeader}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={styles.skillName}>{skill.name_es || skill.name}</div>
                          {skill.evidence && (
                            <div style={styles.skillEvidence}>{skill.evidence}</div>
                          )}
                        </div>
                        <span style={styles.skillLevel(levelInfo.color)}>{levelInfo.text}</span>
                      </div>
                      {/* Barra de progreso */}
                      <div style={styles.skillBar(skill.level, levelInfo.color)}>
                        <div style={styles.skillBarFill(skill.level, levelInfo.color)} />
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
          
          {/* Dynamic roles summary - FIX B */}
          {topRoles.length > 0 && (
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
              {topRoles.length >= 3 
                ? `Encontramos ${topRoles.length} roles compatibles con tu perfil — el mejor match al ${topRoles[0]?.match_percentage}%`
                : `Tu mejor match: ${topRoles[0]?.title_es || topRoles[0]?.title} con un ${topRoles[0]?.match_percentage}% de compatibilidad`
              }
            </p>
          )}
          
          <div style={styles.rolesPreview}>
            {/* First role — fully visible with extra content - FIX D */}
            {topRoles[0] && (
              <div style={styles.roleCard(false)}>
                <div style={styles.roleTitle}>{topRoles[0].title_es || topRoles[0].title}</div>
                <div style={styles.roleMatch}>{topRoles[0].match_percentage}% match</div>
                
                {/* FIX C: Match context */}
                <div style={{ 
                  fontSize: '13px', 
                  marginBottom: '12px',
                  color: topRoles[0].match_percentage >= 80 ? '#10b981' : 
                         topRoles[0].match_percentage >= 60 ? '#fbbf24' : 
                         topRoles[0].match_percentage >= 40 ? '#fb923c' : '#ef4444'
                }}>
                  {topRoles[0].match_percentage >= 80 ? '🟢 Encaje excelente' : 
                   topRoles[0].match_percentage >= 60 ? '🟡 Buen encaje' : 
                   topRoles[0].match_percentage >= 40 ? '🟠 Encaje moderado' : '🔴 Requiere transición'}
                </div>
                
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
                
                {/* FIX D: Why you fit */}
                {topRoles[0].why_you_fit && (
                  <div style={{ 
                    marginTop: '16px', 
                    paddingTop: '16px', 
                    borderTop: '1px solid rgba(255,255,255,0.1)' 
                  }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Por qué encajas
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
                      {topRoles[0].why_you_fit}
                    </div>
                  </div>
                )}
                
                {/* FIX D: Strengths */}
                {topRoles[0].strengths && topRoles[0].strengths.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Tus fortalezas para este rol
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {topRoles[0].strengths.slice(0, 3).map((s, i) => (
                        <span key={i} style={{ 
                          fontSize: '12px', 
                          padding: '4px 10px', 
                          background: 'rgba(99, 102, 241, 0.2)', 
                          borderRadius: '6px',
                          border: '1px solid rgba(99, 102, 241, 0.3)'
                        }}>
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Day to Day - Un día en este rol */}
                {topRoles[0].day_to_day && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      ☀️ Un día en este rol
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', margin: 0 }}>
                      {topRoles[0].day_to_day.length > 280 
                        ? topRoles[0].day_to_day.substring(0, 280) + '...' 
                        : topRoles[0].day_to_day}
                    </p>
                  </div>
                )}
                
                {/* Pros del rol */}
                {topRoles[0].pros && topRoles[0].pros.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      ✅ Lo mejor
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', lineHeight: '1.7' }}>
                      {topRoles[0].pros.slice(0, 2).map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                )}
                
                {/* Empresas que contratan este perfil */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🏢 Empresas que contratan este perfil
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                    {topRoles[0]?.companies_hiring?.join(', ') || topRoles[0]?.hiring_companies || 'Accenture, Deloitte, McKinsey, Telefónica, BBVA, Santander'}
                  </div>
                </div>
                
                {/* Tendencia del mercado */}
                {(topRoles[0]?.growth_trend || topRoles[0]?.market_trend) && (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>📈</span>
                    <span style={{ fontSize: '13px', color: 'rgba(110, 231, 183, 0.9)' }}>
                      {topRoles[0].market_trend || (topRoles[0].growth_percentage ? `Demanda creciendo ${topRoles[0].growth_percentage}% anual` : 'Alta demanda en el mercado')}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {/* Roles 2 & 3 — teaser cards that sell */}
            {topRoles.slice(1, 3).map((role, i) => (
              <div key={`locked-${i}`} style={{ 
                ...styles.roleCard(true), 
                position: 'relative', 
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.08))',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                {/* Visible teaser content */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ ...styles.roleTitle, filter: 'blur(3px)' }}>{role.title_es || role.title}</div>
                  <div style={{ 
                    fontSize: 'clamp(20px, 5vw, 28px)', 
                    fontWeight: '700', 
                    color: '#a78bfa',
                    marginBottom: '8px' 
                  }}>
                    {role.match_percentage}% match
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    marginBottom: '12px',
                    color: role.match_percentage >= 80 ? '#10b981' : 
                           role.match_percentage >= 60 ? '#fbbf24' : '#fb923c'
                  }}>
                    {role.match_percentage >= 80 ? '🟢 Encaje excelente' : 
                     role.match_percentage >= 60 ? '🟡 Buen encaje' : '🟠 Encaje moderado'}
                  </div>
                  
                  {/* Why you fit teaser - visible! */}
                  {role.why_you_fit && (
                    <p style={{ 
                      fontSize: '13px', 
                      color: 'rgba(255,255,255,0.7)', 
                      lineHeight: '1.5',
                      marginBottom: '12px'
                    }}>
                      {role.why_you_fit.length > 100 
                        ? role.why_you_fit.substring(0, 100) + '...' 
                        : role.why_you_fit}
                    </p>
                  )}
                  
                  {/* Salary range - visible! This sells */}
                  {role.salary_range && (
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      color: '#10b981',
                      marginBottom: '12px'
                    }}>
                      💰 {role.salary_range}
                    </div>
                  )}
                  
                  {/* Empresas que contratan - visible como gancho */}
                  {(role.companies_hiring || role.hiring_companies) && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'rgba(255,255,255,0.5)',
                      marginBottom: '8px'
                    }}>
                      🏢 {(role.companies_hiring || role.hiring_companies).slice(0, 3).join(', ')}...
                    </div>
                  )}
                </div>
                
                {/* Unlock button */}
                <div 
                  onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>🔓</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#a78bfa' }}>
                    Desbloquear → €29
                  </span>
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
