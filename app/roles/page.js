'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function RolesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState([])
  const [expandedRole, setExpandedRole] = useState(null)
  const [filter, setFilter] = useState('all') // all, interested, priority, discarded
  const [hasPaid, setHasPaid] = useState(false)
  const [paidPlan, setPaidPlan] = useState(null)
  const [userCountry, setUserCountry] = useState('ES')

  useEffect(() => {
    if (!userId) {
      router.push('/start')
      return
    }

    const fetchRoles = async () => {
      try {
        const res = await fetch(`/api/roles?userId=${userId}`)
        const data = await res.json()

        if (!data.hasPaid) {
          router.push(`/upgrade?userId=${userId}`)
          return
        }

        setRoles(data.roles || [])
        setHasPaid(data.hasPaid)
        setPaidPlan(data.paidPlan)
        setUserCountry(data.userCountry || 'ES')
      } catch (err) {
        console.error('Error fetching roles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [userId, router])

  const updateRoleStatus = async (roleMatchId, newStatus) => {
    try {
      await fetch('/api/role-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleMatchId, status: newStatus })
      })

      setRoles(prev => prev.map(role => 
        role.id === roleMatchId ? { ...role, user_status: newStatus } : role
      ))
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const filteredRoles = roles.filter(role => {
    if (filter === 'all') return role.user_status !== 'discarded'
    if (filter === 'interested') return role.user_status === 'interested' || role.user_status === 'priority'
    if (filter === 'priority') return role.user_status === 'priority'
    if (filter === 'discarded') return role.user_status === 'discarded'
    return true
  }).sort((a, b) => {
    // Priority first, then by match percentage
    if (a.user_status === 'priority' && b.user_status !== 'priority') return -1
    if (b.user_status === 'priority' && a.user_status !== 'priority') return 1
    return b.match_percentage - a.match_percentage
  })

  const getSalaryForCountry = (salaryRanges, country) => {
    if (!salaryRanges) return null
    const range = salaryRanges[country] || salaryRanges['ES']
    if (!range) return null
    
    const formatNumber = (n) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
      if (n >= 1000) return `${Math.round(n / 1000)}K`
      return n.toString()
    }

    return `${formatNumber(range.min)} - ${formatNumber(range.max)} ${range.currency}`
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
      marginBottom: '32px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.6)'
    },
    filters: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    filterBtn: (active) => ({
      padding: '10px 20px',
      borderRadius: '10px',
      border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
      background: active ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    }),
    roleCard: (isExpanded) => ({
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '16px',
      overflow: 'hidden'
    }),
    roleHeader: {
      padding: '24px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    roleTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '4px'
    },
    roleMatch: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    matchPercentage: {
      fontSize: '28px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    matchBar: {
      width: '100px',
      height: '8px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    matchBarFill: (percentage) => ({
      width: `${percentage}%`,
      height: '100%',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      borderRadius: '4px'
    }),
    demandChip: (level) => ({
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      background: level === 'alta' ? 'rgba(16, 185, 129, 0.2)' : 
                  level === 'media' ? 'rgba(251, 191, 36, 0.2)' : 
                  'rgba(148, 163, 184, 0.2)',
      color: level === 'alta' ? '#10b981' : 
             level === 'media' ? '#fbbf24' : 
             '#94a3b8'
    }),
    expandArrow: (isExpanded) => ({
      fontSize: '20px',
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s'
    }),
    roleBody: {
      padding: '0 24px 24px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    section: {
      marginTop: '20px'
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      marginBottom: '12px'
    },
    dayToDay: {
      fontSize: '15px',
      lineHeight: '1.7',
      color: 'rgba(255,255,255,0.85)'
    },
    prosConsList: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    prosCons: {
      padding: '16px',
      borderRadius: '12px'
    },
    prosBox: {
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.2)'
    },
    consBox: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)'
    },
    listItem: {
      marginBottom: '8px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px'
    },
    salaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px'
    },
    salaryItem: {
      padding: '12px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      textAlign: 'center'
    },
    salaryCountry: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '4px'
    },
    salaryAmount: {
      fontSize: '16px',
      fontWeight: '600'
    },
    fitSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    fitItem: (isStrength) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: isStrength ? 'rgba(16, 185, 129, 0.1)' : 'rgba(251, 191, 36, 0.1)',
      borderRadius: '10px',
      border: `1px solid ${isStrength ? 'rgba(16, 185, 129, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`
    }),
    actions: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px',
      flexWrap: 'wrap'
    },
    actionBtn: (type) => ({
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: type === 'interested' ? 'linear-gradient(135deg, #10b981, #059669)' :
                  type === 'priority' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                  type === 'discarded' ? 'rgba(239, 68, 68, 0.2)' :
                  'rgba(255,255,255,0.1)',
      color: '#fff'
    }),
    nav: {
      display: 'flex',
      gap: '16px',
      marginTop: '32px',
      justifyContent: 'center'
    },
    navLink: {
      padding: '14px 28px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'transparent',
      color: '#f8fafc',
      fontSize: '15px',
      fontWeight: '600',
      textDecoration: 'none'
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.inner, textAlign: 'center', paddingTop: '100px' }}>
          <p>Cargando tus roles...</p>
        </div>
      </div>
    )
  }

  const interestedCount = roles.filter(r => r.user_status === 'interested' || r.user_status === 'priority').length

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Explora tus Roles</h1>
          <p style={styles.subtitle}>
            {roles.length} roles compatibles con tu perfil
          </p>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <button 
            style={styles.filterBtn(filter === 'all')}
            onClick={() => setFilter('all')}
          >
            Todos ({roles.filter(r => r.user_status !== 'discarded').length})
          </button>
          <button 
            style={styles.filterBtn(filter === 'interested')}
            onClick={() => setFilter('interested')}
          >
            ❤️ Favoritos ({interestedCount})
          </button>
          <button 
            style={styles.filterBtn(filter === 'priority')}
            onClick={() => setFilter('priority')}
          >
            ⭐ Prioridad ({roles.filter(r => r.user_status === 'priority').length})
          </button>
          <button 
            style={styles.filterBtn(filter === 'discarded')}
            onClick={() => setFilter('discarded')}
          >
            Descartados ({roles.filter(r => r.user_status === 'discarded').length})
          </button>
        </div>

        {/* Roles List */}
        {filteredRoles.map(role => {
          const isExpanded = expandedRole === role.id
          return (
            <div key={role.id} style={styles.roleCard(isExpanded)}>
              <div 
                style={styles.roleHeader}
                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    {role.user_status === 'priority' && <span>⭐</span>}
                    {role.user_status === 'interested' && <span>❤️</span>}
                    <h3 style={styles.roleTitle}>{role.title_es || role.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={styles.demandChip(role.demand_level)}>
                      Demanda {role.demand_level}
                    </span>
                    {role.remote_friendly && (
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                        🌍 Remote-friendly
                      </span>
                    )}
                  </div>
                </div>
                <div style={styles.roleMatch}>
                  <div>
                    <div style={styles.matchPercentage}>{role.match_percentage}%</div>
                    <div style={styles.matchBar}>
                      <div style={styles.matchBarFill(role.match_percentage)} />
                    </div>
                  </div>
                  <span style={styles.expandArrow(isExpanded)}>▼</span>
                </div>
              </div>

              {isExpanded && (
                <div style={styles.roleBody}>
                  {/* Day to day */}
                  <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Qué haces en el día a día</h4>
                    <p style={styles.dayToDay}>{role.day_to_day}</p>
                  </div>

                  {/* Pros & Cons */}
                  <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Pros y Contras (honestos)</h4>
                    <div style={styles.prosConsList}>
                      <div style={{ ...styles.prosCons, ...styles.prosBox }}>
                        {role.pros?.map((pro, i) => (
                          <div key={i} style={styles.listItem}>
                            <span style={{ color: '#10b981' }}>✓</span>
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ ...styles.prosCons, ...styles.consBox }}>
                        {role.cons?.map((con, i) => (
                          <div key={i} style={styles.listItem}>
                            <span style={{ color: '#ef4444' }}>✗</span>
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Salaries */}
                  <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Salarios por país</h4>
                    <div style={styles.salaryGrid}>
                      {role.salary_ranges && Object.entries(role.salary_ranges).map(([country, range]) => (
                        <div key={country} style={styles.salaryItem}>
                          <div style={styles.salaryCountry}>
                            {country === 'ES' ? '🇪🇸 España' :
                             country === 'MX' ? '🇲🇽 México' :
                             country === 'CO' ? '🇨🇴 Colombia' :
                             country === 'AR' ? '🇦🇷 Argentina' :
                             country === 'remote' ? '🌍 Remoto' : country}
                          </div>
                          <div style={styles.salaryAmount}>
                            {getSalaryForCountry({ [country]: range }, country)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Your fit */}
                  <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Tu encaje</h4>
                    <p style={{ ...styles.dayToDay, marginBottom: '16px' }}>{role.why_you_fit}</p>
                    
                    <div style={styles.fitSection}>
                      {role.strengths?.slice(0, 3).map((s, i) => (
                        <div key={i} style={styles.fitItem(true)}>
                          <span>{s.skill}</span>
                          <span style={{ color: '#10b981' }}>✓ {s.user_level}/{s.required_level}</span>
                        </div>
                      ))}
                      {role.gaps?.slice(0, 2).map((g, i) => (
                        <div key={i} style={styles.fitItem(false)}>
                          <span>{g.skill}</span>
                          <span style={{ color: '#fbbf24' }}>Gap: {g.current_level}→{g.required_level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={styles.actions}>
                    <button 
                      style={styles.actionBtn(role.user_status === 'interested' ? 'interested' : 'default')}
                      onClick={() => updateRoleStatus(role.id, role.user_status === 'interested' ? 'pending' : 'interested')}
                    >
                      ❤️ Me interesa
                    </button>
                    <button 
                      style={styles.actionBtn(role.user_status === 'priority' ? 'priority' : 'default')}
                      onClick={() => updateRoleStatus(role.id, role.user_status === 'priority' ? 'pending' : 'priority')}
                    >
                      ⭐ Priorizar
                    </button>
                    <button 
                      style={styles.actionBtn('discarded')}
                      onClick={() => updateRoleStatus(role.id, 'discarded')}
                    >
                      ❌ Descartar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Navigation */}
        {interestedCount > 0 && (
          <div style={styles.nav}>
            <Link href={`/selected?userId=${userId}`} style={styles.navLink}>
              Ver mis selecciones ({interestedCount}) →
            </Link>
            {paidPlan === 'complete' && (
              <Link href={`/documents?userId=${userId}`} style={styles.navLink}>
                Mis documentos →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function RolesPage() {
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
        <p>Cargando roles...</p>
      </div>
    }>
      <RolesContent />
    </Suspense>
  )
}
