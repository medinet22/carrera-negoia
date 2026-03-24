'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SelectedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState([])
  const [paidPlan, setPaidPlan] = useState(null)

  useEffect(() => {
    if (!userId) {
      router.push('/start')
      return
    }

    const fetchSelected = async () => {
      try {
        const res = await fetch(`/api/roles?userId=${userId}`)
        const data = await res.json()

        if (!data.hasPaid) {
          router.push(`/upgrade?userId=${userId}`)
          return
        }

        // Filter to only interested/priority roles
        const selectedRoles = (data.roles || []).filter(
          r => r.user_status === 'interested' || r.user_status === 'priority'
        )
        
        setRoles(selectedRoles)
        setPaidPlan(data.paidPlan)
      } catch (err) {
        console.error('Error fetching selected roles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSelected()
  }, [userId, router])

  const getSearchLinks = (role) => {
    const links = []
    if (role.linkedin_search_template) {
      links.push({
        name: 'LinkedIn Jobs',
        url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role.linkedin_search_template)}`
      })
    }
    if (role.infojobs_search_template) {
      links.push({
        name: 'InfoJobs',
        url: `https://www.infojobs.net/ofertas-trabajo/${encodeURIComponent(role.infojobs_search_template.replace(/ /g, '-'))}`
      })
    }
    if (role.indeed_search_template) {
      links.push({
        name: 'Indeed',
        url: `https://www.indeed.com/jobs?q=${encodeURIComponent(role.indeed_search_template)}`
      })
    }
    return links
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
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    emptyText: {
      fontSize: '18px',
      marginBottom: '24px'
    },
    roleCard: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '24px',
      padding: '24px',
      position: 'relative'
    },
    priorityBadge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      padding: '6px 12px',
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '700'
    },
    roleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px'
    },
    roleTitle: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    roleMatch: {
      fontSize: '28px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    section: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    gapsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    gapItem: {
      padding: '20px',
      background: 'rgba(251, 191, 36, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(251, 191, 36, 0.2)'
    },
    gapHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    gapSkill: {
      fontSize: '16px',
      fontWeight: '600'
    },
    gapLevel: {
      fontSize: '14px',
      color: '#fbbf24'
    },
    gapHowTo: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '8px'
    },
    gapTime: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.5)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    totalTimeline: {
      padding: '20px',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      marginTop: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    timelineLabel: {
      fontSize: '15px',
      fontWeight: '600'
    },
    timelineValue: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#6366f1'
    },
    searchLinks: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginTop: '12px'
    },
    searchLink: {
      padding: '10px 20px',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#f8fafc',
      fontSize: '14px',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cvButton: {
      padding: '14px 28px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      border: 'none',
      color: '#fff',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    upsellBox: {
      padding: '20px',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      textAlign: 'center'
    },
    upsellText: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '12px'
    },
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
          <p>Cargando tus selecciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Mis Selecciones</h1>
          <p style={styles.subtitle}>
            {roles.length} {roles.length === 1 ? 'rol seleccionado' : 'roles seleccionados'}
          </p>
        </div>

        {/* Empty state */}
        {roles.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎯</div>
            <p style={styles.emptyText}>
              Aún no has seleccionado ningún rol.<br />
              Explora tus roles compatibles y marca los que te interesen.
            </p>
            <Link 
              href={`/roles?userId=${userId}`}
              style={{
                ...styles.cvButton,
                textDecoration: 'none',
                display: 'inline-flex'
              }}
            >
              Explorar roles →
            </Link>
          </div>
        )}

        {/* Selected roles */}
        {roles.map(role => {
          const searchLinks = getSearchLinks(role)
          const totalWeeks = role.gaps?.reduce((sum, g) => sum + (g.time_weeks || 0), 0) || 0
          
          return (
            <div key={role.id} style={styles.roleCard}>
              {role.user_status === 'priority' && (
                <div style={styles.priorityBadge}>⭐ Prioridad</div>
              )}
              
              <div style={styles.roleHeader}>
                <div>
                  <h3 style={styles.roleTitle}>{role.title_es || role.title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    {role.why_you_fit?.substring(0, 150)}...
                  </p>
                </div>
                <div style={styles.roleMatch}>{role.match_percentage}%</div>
              </div>

              {/* Gap Analysis */}
              {role.gaps && role.gaps.length > 0 && (
                <div style={styles.section}>
                  <h4 style={styles.sectionTitle}>📚 Plan de desarrollo</h4>
                  <div style={styles.gapsList}>
                    {role.gaps.map((gap, i) => (
                      <div key={i} style={styles.gapItem}>
                        <div style={styles.gapHeader}>
                          <span style={styles.gapSkill}>{gap.skill}</span>
                          <span style={styles.gapLevel}>
                            Nivel {gap.current_level} → {gap.required_level}
                          </span>
                        </div>
                        <p style={styles.gapHowTo}>{gap.how_to_close}</p>
                        <div style={styles.gapTime}>
                          <span>⏱️</span>
                          <span>~{gap.time_weeks || 4} semanas</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {totalWeeks > 0 && (
                    <div style={styles.totalTimeline}>
                      <span style={styles.timelineLabel}>Timeline total estimado</span>
                      <span style={styles.timelineValue}>{totalWeeks} semanas</span>
                    </div>
                  )}
                </div>
              )}

              {/* Job search links */}
              {searchLinks.length > 0 && (
                <div style={styles.section}>
                  <h4 style={styles.sectionTitle}>🔍 Buscar ofertas</h4>
                  <div style={styles.searchLinks}>
                    {searchLinks.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.searchLink}
                      >
                        🔗 {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CV generation */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>📄 Documentos</h4>
                {paidPlan === 'complete' ? (
                  <Link 
                    href={`/documents?userId=${userId}&roleId=${role.role_id}`}
                    style={{ ...styles.cvButton, textDecoration: 'none', display: 'inline-flex' }}
                  >
                    📄 Generar CV para este rol
                  </Link>
                ) : (
                  <div style={styles.upsellBox}>
                    <p style={styles.upsellText}>
                      La generación de CV está incluida en el Plan Completo
                    </p>
                    <Link 
                      href={`/upgrade?userId=${userId}`}
                      style={{ ...styles.cvButton, textDecoration: 'none', display: 'inline-flex' }}
                    >
                      Actualizar a Plan Completo (+€10)
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Navigation */}
        <div style={styles.nav}>
          <Link href={`/roles?userId=${userId}`} style={styles.navLink}>
            ← Volver a roles
          </Link>
          {paidPlan === 'complete' && roles.length > 0 && (
            <Link href={`/documents?userId=${userId}`} style={styles.navLink}>
              Ver todos mis documentos →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SelectedPage() {
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
        <p>Cargando...</p>
      </div>
    }>
      <SelectedContent />
    </Suspense>
  )
}
