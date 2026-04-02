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
  const [userSalary, setUserSalary] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/start')
      return
    }

    const fetchRoles = async () => {
      try {
        const res = await fetch(`/api/roles?userId=${userId}`)
        const data = await res.json()

        // Don't redirect - show teaser instead
        setRoles(data.roles || [])
        setHasPaid(data.hasPaid || false)
        setPaidPlan(data.paidPlan)
        setUserCountry(data.userCountry || 'ES')
        setUserSalary(data.userSalary || null)
        
        // Show onboarding tooltip on first visit (only if paid)
        if (data.hasPaid) {
          const hasSeenOnboarding = typeof window !== 'undefined' && localStorage.getItem('carrera_roles_onboarding')
          if (!hasSeenOnboarding) {
            setShowOnboarding(true)
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error fetching roles:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [userId, router])

  const dismissOnboarding = () => {
    setShowOnboarding(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('carrera_roles_onboarding', 'true')
    }
  }

  // Share functionality with Web Share API + clipboard fallback
  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = 'Descubre qué roles profesionales encajan contigo con Carrera IA'
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Mapa de Carrera',
          text: shareText,
          url: shareUrl
        })
      } catch (err) {
        // User cancelled or error - fall back to clipboard
        copyToClipboard(shareUrl)
      }
    } else {
      copyToClipboard(shareUrl)
    }
  }
  
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Get the best role (highest match) for teaser
  const bestRole = roles.length > 0 
    ? roles.reduce((best, role) => role.match_percentage > best.match_percentage ? role : best, roles[0])
    : null
  
  // Count of locked roles (all except the best one when not paid)
  const lockedRolesCount = hasPaid ? 0 : Math.max(0, roles.length - 1)

  // Calculate salary delta for a role
  const getSalaryDelta = (salaryRanges, country) => {
    if (!salaryRanges || !userSalary) return null
    const range = salaryRanges[country] || salaryRanges['ES']
    if (!range) return null
    
    // Use midpoint of range
    const roleSalaryMid = (range.min + range.max) / 2
    const delta = roleSalaryMid - userSalary
    
    if (Math.abs(delta) < 2000) return null // Not significant
    
    const formatK = (n) => `${Math.round(n / 1000)}K`
    return {
      value: delta,
      formatted: delta > 0 ? `+€${formatK(delta)}` : `-€${formatK(Math.abs(delta))}`
    }
  }

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
    // 🔥 Market Opportunity Alert - NEW
    marketAlertChip: {
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))',
      border: '1px solid rgba(239, 68, 68, 0.4)',
      color: '#f97316',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      animation: 'pulse 2s infinite'
    },
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
    },
    lockedCard: {
      position: 'relative',
      overflow: 'hidden'
    },
    lockedOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      borderRadius: '16px'
    },
    lockedIcon: {
      fontSize: '32px',
      marginRight: '12px'
    },
    lockedText: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.7)'
    },
    unlockCta: {
      padding: '20px 32px',
      borderRadius: '14px',
      border: 'none',
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '24px',
      boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
    },
    shareBtn: {
      padding: '12px 24px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'transparent',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    shareCopiedToast: {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 24px',
      background: '#10b981',
      color: '#fff',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
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
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={styles.title}>Explora tus Roles</h1>
              <p style={styles.subtitle}>
                {roles.length} roles compatibles con tu perfil
              </p>
            </div>
            {/* Share button - always functional */}
            <button style={styles.shareBtn} onClick={handleShare}>
              📤 Compartir
            </button>
          </div>
        </div>
        
        {/* Share copied toast */}
        {shareCopied && (
          <div style={styles.shareCopiedToast}>
            ✅ ¡Enlace copiado!
          </div>
        )}

        {/* Onboarding tooltip - first visit */}
        {showOnboarding && (
          <div style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            position: 'relative'
          }}>
            <span style={{ fontSize: '32px' }}>💡</span>
            <div style={{ flex: 1 }}>
              <p style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#f8fafc'
              }}>
                ¡Bienvenido a tu mapa de roles!
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.6'
              }}>
                Marca con ❤️ los roles que te interesan y con ⭐ los prioritarios. 
                Esto crea tu plan de transición personalizado.
              </p>
            </div>
            <button 
              onClick={dismissOnboarding}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Filters - only show if paid */}
        {hasPaid && (
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
        )}

        {/* Teaser message when not paid */}
        {!hasPaid && bestRole && (
          <div style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '16px', color: '#f8fafc', marginBottom: '8px' }}>
              🎯 <strong>Tu mejor match: {bestRole.title_es || bestRole.title}</strong> con {bestRole.match_percentage}% de compatibilidad
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Mira el análisis completo de tu primer rol gratis. Desbloquea los {lockedRolesCount} roles restantes para ver todo tu potencial.
            </p>
          </div>
        )}

        {/* Roles List */}
        {filteredRoles.map((role, roleIndex) => {
          const isBestRole = bestRole && role.id === bestRole.id
          const isLocked = !hasPaid && !isBestRole
          const isExpanded = expandedRole === role.id || (isBestRole && !hasPaid)
          
          return (
            <div key={role.id}>
              {/* Show CTA after the first (best) role when not paid */}
              {!hasPaid && roleIndex === 1 && lockedRolesCount > 0 && (
                <button 
                  style={styles.unlockCta}
                  onClick={() => router.push(`/upgrade?userId=${userId}`)}
                >
                  🔓 Ver análisis completo de los {lockedRolesCount} roles →
                </button>
              )}
              
              <div style={{ ...styles.roleCard(isExpanded), ...(isLocked ? styles.lockedCard : {}) }}>
                {/* Locked overlay */}
                {isLocked && (
                  <div style={styles.lockedOverlay}>
                    <span style={styles.lockedIcon}>🔒</span>
                    <div>
                      <p style={{ ...styles.lockedText, fontWeight: '600', marginBottom: '4px' }}>
                        {role.title_es || role.title} — {role.match_percentage}% match
                      </p>
                      <button 
                        onClick={() => router.push(`/upgrade?userId=${userId}`)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'rgba(99, 102, 241, 0.3)',
                          color: '#a5b4fc',
                          fontSize: '13px',
                          cursor: 'pointer',
                          marginTop: '8px'
                        }}
                      >
                        Ver análisis
                      </button>
                    </div>
                  </div>
                )}
                
                <div 
                  style={{ ...styles.roleHeader, opacity: isLocked ? 0.3 : 1 }}
                  onClick={() => !isLocked && setExpandedRole(isExpanded ? null : role.id)}
                >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    {role.user_status === 'priority' && <span>⭐</span>}
                    {role.user_status === 'interested' && <span>❤️</span>}
                    <h3 style={styles.roleTitle}>{role.title_es || role.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={styles.demandChip(role.demand_level)}>
                      Demanda {role.demand_level}
                    </span>
                    {/* 💰 Salary comparison chip */}
                    {(() => {
                      const salaryDelta = getSalaryDelta(role.salary_ranges, userCountry)
                      if (salaryDelta && salaryDelta.value > 0) {
                        return (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '700',
                            background: 'rgba(16, 185, 129, 0.2)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            color: '#10b981'
                          }}>
                            💰 {salaryDelta.formatted}/año vs actual
                          </span>
                        )
                      }
                      return null
                    })()}
                    {/* 🔥 Market Opportunity Alert - roles con crecimiento >25% */}
                    {role.growth_percentage && role.growth_percentage >= 25 && (
                      <span style={styles.marketAlertChip}>
                        🔥 Mercado en expansión — +{role.growth_percentage}% en 2026
                      </span>
                    )}
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
            </div>
          )
        })}

        {/* Bottom CTA when not paid */}
        {!hasPaid && lockedRolesCount > 0 && (
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button 
              style={styles.unlockCta}
              onClick={() => router.push(`/upgrade?userId=${userId}`)}
            >
              🔓 Desbloquear análisis completo →
            </button>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
              Incluye: salarios por país, pros/contras honestos, gap analysis y plan de acción
            </p>
          </div>
        )}

        {/* Navigation - only when paid */}
        {hasPaid && interestedCount > 0 && (
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
