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
      padding: '20px'
    },
    inner: {
      maxWidth: '900px',
      margin: '0 auto'
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
      fontSize: '32px',
      fontWeight: '800'
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
      padding: '32px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
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
    rolesPreview: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
      fontSize: '32px',
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

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Tu Mapa de Habilidades</h1>
          <button style={styles.shareBtn}>
            🔗 Compartir
          </button>
        </div>

        {/* One-liner */}
        {skillsMap?.summary_one_liner && (
          <p style={styles.oneLiner}>"{skillsMap.summary_one_liner}"</p>
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
              {allSkills.map((skill, i) => {
                const levelInfo = getLevelLabel(skill.level)
                return (
                  <div key={i} style={styles.skillItem}>
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
                )
              })}
            </div>
          </div>
        )}

        {/* Roles Preview */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎯 Roles donde encajas</h3>
          <div style={styles.rolesPreview}>
            {topRoles.slice(0, 3).map((role, i) => (
              <div key={i} style={styles.roleCard(false)}>
                <div style={styles.roleTitle}>{role.title_es || role.title}</div>
                <div style={styles.roleMatch}>{role.match_percentage}% match</div>
                <div style={styles.roleSalary}>
                  {role.salary_range || 'Ver detalles de salario'}
                </div>
              </div>
            ))}
            
            {/* Locked cards */}
            {[1, 2].map(i => (
              <div key={`locked-${i}`} style={styles.roleCard(true)}>
                <div style={styles.roleBlur}>
                  <span style={styles.lockIcon}>🔒</span>
                </div>
                <div style={styles.roleTitle}>Rol bloqueado</div>
                <div style={styles.roleMatch}>??%</div>
                <div style={styles.roleSalary}>€??K - €??K</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {hasPaid ? (
          <div style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>¡Ya tienes acceso completo!</h3>
            <p style={styles.ctaSubtitle}>Explora todos tus roles compatibles</p>
            <Link href={`/roles?userId=${userId}`} style={styles.ctaButton}>
              Explorar mis roles →
            </Link>
          </div>
        ) : (
          <div style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>Desbloquea todos los roles</h3>
            <p style={styles.ctaSubtitle}>
              Accede a {topRoles.length > 0 ? '20+' : 'todos los'} roles compatibles con tu perfil,
              datos de salario por país, y plan de transición personalizado
            </p>
            <Link href={`/upgrade?userId=${userId}`} style={styles.ctaButton}>
              Desbloquear desde €29 →
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
