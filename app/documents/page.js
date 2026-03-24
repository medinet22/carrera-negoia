'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function DocumentsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || (typeof window !== 'undefined' ? localStorage.getItem('carrera_user_id') : null)
  
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [documents, setDocuments] = useState([])
  const [paidPlan, setPaidPlan] = useState(null)
  const [selectedRoles, setSelectedRoles] = useState([])
  const [expandedDoc, setExpandedDoc] = useState(null)
  const [copied, setCopied] = useState(null)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    if (!userId) {
      router.push('/start')
      return
    }

    const fetchDocuments = async () => {
      try {
        const res = await fetch(`/api/documents?userId=${userId}`)
        const data = await res.json()

        if (!data.hasPaid || data.paidPlan !== 'complete') {
          router.push(`/upgrade?userId=${userId}`)
          return
        }

        setDocuments(data.documents || [])
        setPaidPlan(data.paidPlan)
        setSelectedRoles(data.selectedRoles || [])
      } catch (err) {
        console.error('Error fetching documents:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [userId, router])

  const handleGenerateDocuments = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      const data = await res.json()
      if (data.documents) {
        setDocuments(data.documents)
      }
    } catch (err) {
      console.error('Error generating documents:', err)
      alert('Error generando documentos. Inténtalo de nuevo.')
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = async (text, docId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(docId)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const getDocTypeLabel = (type) => {
    const labels = {
      cv_generic: '📄 CV Genérico',
      cv_specific: '📄 CV Específico',
      cover_letter: '✉️ Carta de Presentación',
      linkedin_bullets: '💼 LinkedIn Bullets',
      elevator_pitch: '🎤 Elevator Pitch'
    }
    return labels[type] || type
  }

  const getDocTypeIcon = (type) => {
    const icons = {
      cv_generic: '📄',
      cv_specific: '📄',
      cover_letter: '✉️',
      linkedin_bullets: '💼',
      elevator_pitch: '🎤'
    }
    return icons[type] || '📄'
  }

  // Parse CV content for premium display
  const renderCVPreview = (content) => {
    if (typeof content === 'string') {
      return content
    }
    
    // If it's structured JSON, render it nicely
    if (content?.header || content?.full_text) {
      return content.full_text || JSON.stringify(content, null, 2)
    }
    
    return JSON.stringify(content, null, 2)
  }

  // Premium CV paper component
  const CVPaperPreview = ({ doc }) => {
    const content = doc.content_text || (typeof doc.content === 'string' ? doc.content : doc.content?.full_text) || JSON.stringify(doc.content, null, 2)
    const header = doc.content?.header || {}
    const keyAchievements = doc.content?.key_achievements || []
    const experience = doc.content?.experience || []
    
    return (
      <div style={styles.cvPaper}>
        <div style={styles.cvPaperInner}>
          {/* Header Section */}
          {header.name && (
            <div style={styles.cvHeader}>
              <h1 style={styles.cvName}>{header.name}</h1>
              {header.headline && (
                <p style={styles.cvHeadline}>{header.headline}</p>
              )}
              <div style={styles.cvContact}>
                {header.email && <span>{header.email}</span>}
                {header.linkedin && <span> • {header.linkedin}</span>}
                {header.location && <span> • {header.location}</span>}
              </div>
              <div style={styles.cvDivider} />
            </div>
          )}

          {/* Key Achievements */}
          {keyAchievements.length > 0 && (
            <div style={styles.cvSection}>
              <h2 style={styles.cvSectionTitle}>LOGROS CLAVE</h2>
              <ul style={styles.cvList}>
                {keyAchievements.map((achievement, i) => (
                  <li key={i} style={styles.cvListItem}>• {achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* If structured content is not available, show raw text */}
          {(!header.name && !keyAchievements.length) && (
            <pre style={styles.cvRawText}>{content}</pre>
          )}

          {/* Experience Preview (truncated) */}
          {experience.length > 0 && (
            <div style={styles.cvSection}>
              <h2 style={styles.cvSectionTitle}>EXPERIENCIA</h2>
              {experience.slice(0, 2).map((exp, i) => (
                <div key={i} style={styles.cvExperience}>
                  <div style={styles.cvExpHeader}>
                    <strong>{exp.title}</strong>
                    <span style={styles.cvExpDates}>{exp.dates}</span>
                  </div>
                  <div style={styles.cvExpCompany}>{exp.company}</div>
                  {exp.bullets?.slice(0, 3).map((bullet, j) => (
                    <div key={j} style={styles.cvExpBullet}>• {bullet}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gradient fade at bottom */}
        <div style={styles.cvPaperFade} />
      </div>
    )
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f8fafc',
      padding: '20px'
    },
    inner: {
      maxWidth: '1000px',
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
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '16px'
    },
    tab: (isActive) => ({
      padding: '12px 24px',
      borderRadius: '10px 10px 0 0',
      border: 'none',
      background: isActive ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255,255,255,0.05)',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }),
    generateBox: {
      textAlign: 'center',
      padding: '48px 32px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '32px'
    },
    generateIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    generateText: {
      fontSize: '18px',
      marginBottom: '8px'
    },
    generateSubtext: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '24px'
    },
    generateBtn: (isGenerating) => ({
      padding: '16px 40px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '700',
      cursor: isGenerating ? 'wait' : 'pointer',
      opacity: isGenerating ? 0.7 : 1
    }),
    docCard: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '16px',
      overflow: 'hidden'
    },
    docHeader: {
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    },
    docTitle: {
      fontSize: '18px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    docRole: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '4px'
    },
    docActions: {
      display: 'flex',
      gap: '8px'
    },
    actionBtn: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'transparent',
      color: '#f8fafc',
      fontSize: '13px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    copyBtn: (isCopied) => ({
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      background: isCopied ? '#10b981' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s'
    }),
    pdfBtn: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.05)',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    docContent: {
      padding: '0 24px 24px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    // Premium CV Paper Styles
    cvPaper: {
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)',
      marginTop: '20px',
      position: 'relative',
      overflow: 'hidden',
      maxHeight: '600px'
    },
    cvPaperInner: {
      padding: '40px 48px',
      color: '#1f2937',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      lineHeight: '1.6'
    },
    cvPaperFade: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '100px',
      background: 'linear-gradient(to top, #fff 0%, transparent 100%)',
      pointerEvents: 'none'
    },
    cvHeader: {
      marginBottom: '24px'
    },
    cvName: {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px',
      letterSpacing: '-0.5px'
    },
    cvHeadline: {
      fontSize: '14px',
      color: '#4f46e5',
      fontWeight: '500',
      marginBottom: '12px'
    },
    cvContact: {
      fontSize: '13px',
      color: '#6b7280'
    },
    cvDivider: {
      height: '2px',
      background: 'linear-gradient(to right, #6366f1, #a855f7)',
      marginTop: '16px',
      opacity: 0.6
    },
    cvSection: {
      marginBottom: '20px'
    },
    cvSectionTitle: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '12px'
    },
    cvList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    cvListItem: {
      marginBottom: '6px',
      paddingLeft: '0'
    },
    cvExperience: {
      marginBottom: '16px'
    },
    cvExpHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px'
    },
    cvExpDates: {
      fontSize: '12px',
      color: '#9ca3af'
    },
    cvExpCompany: {
      fontSize: '13px',
      color: '#6b7280',
      marginBottom: '8px'
    },
    cvExpBullet: {
      fontSize: '13px',
      marginBottom: '4px',
      color: '#374151'
    },
    cvRawText: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      lineHeight: '1.7',
      whiteSpace: 'pre-wrap',
      margin: 0,
      color: '#374151'
    },
    contentPreview: {
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '12px',
      padding: '20px',
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      maxHeight: '400px',
      overflow: 'auto',
      marginTop: '16px'
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      marginBottom: '16px',
      marginTop: '32px'
    },
    atsChip: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '6px',
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981',
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: '12px'
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
          <p>Cargando documentos...</p>
        </div>
      </div>
    )
  }

  // Group documents by type
  const genericDocs = documents.filter(d => d.doc_type === 'cv_generic' || d.doc_type === 'linkedin_bullets' || d.doc_type === 'elevator_pitch')
  const specificDocs = documents.filter(d => d.doc_type === 'cv_specific' || d.doc_type === 'cover_letter')

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Mis Documentos</h1>
          <p style={styles.subtitle}>
            CVs optimizados para ATS y LinkedIn, cartas y recursos listos para usar
          </p>
        </div>

        {/* Generate if no documents */}
        {documents.length === 0 && (
          <div style={styles.generateBox}>
            <div style={styles.generateIcon}>📝</div>
            <p style={styles.generateText}>
              Genera tus documentos personalizados
            </p>
            <p style={styles.generateSubtext}>
              CV genérico ATS-optimizado, CVs por rol, cartas de presentación, LinkedIn bullets y elevator pitch
            </p>
            <button 
              style={styles.generateBtn(generating)}
              onClick={handleGenerateDocuments}
              disabled={generating}
            >
              {generating ? 'Generando... (30-60 seg)' : 'Generar mis documentos'}
            </button>
          </div>
        )}

        {/* Tabs */}
        {documents.length > 0 && (
          <div style={styles.tabs}>
            <button 
              style={styles.tab(activeTab === 'general')}
              onClick={() => setActiveTab('general')}
            >
              📄 CV y LinkedIn
            </button>
            <button 
              style={styles.tab(activeTab === 'roles')}
              onClick={() => setActiveTab('roles')}
            >
              🎯 Por Rol ({specificDocs.length})
            </button>
          </div>
        )}

        {/* Generic documents */}
        {activeTab === 'general' && genericDocs.length > 0 && (
          <>
            {genericDocs.map(doc => {
              const isExpanded = expandedDoc === doc.id
              const content = doc.content_text || JSON.stringify(doc.content, null, 2)
              const isCV = doc.doc_type === 'cv_generic'
              
              return (
                <div key={doc.id} style={styles.docCard}>
                  <div 
                    style={styles.docHeader}
                    onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                  >
                    <div>
                      <div style={styles.docTitle}>
                        {getDocTypeLabel(doc.doc_type)}
                        {isCV && (
                          <span style={styles.atsChip}>
                            ✓ ATS Optimizado
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={styles.docActions}>
                      <button 
                        style={styles.copyBtn(copied === doc.id)}
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(content, doc.id)
                        }}
                      >
                        {copied === doc.id ? '✓ Copiado' : '📋 Copiar texto'}
                      </button>
                      {isCV && (
                        <button style={styles.pdfBtn}>
                          📥 PDF
                        </button>
                      )}
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={styles.docContent}>
                      {isCV ? (
                        <CVPaperPreview doc={doc} />
                      ) : (
                        <pre style={styles.contentPreview}>{content}</pre>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}

        {/* Role-specific documents */}
        {activeTab === 'roles' && specificDocs.length > 0 && (
          <>
            {specificDocs.map(doc => {
              const isExpanded = expandedDoc === doc.id
              const content = doc.content_text || JSON.stringify(doc.content, null, 2)
              const role = selectedRoles.find(r => r.role_id === doc.role_id)
              const isCV = doc.doc_type === 'cv_specific'
              
              return (
                <div key={doc.id} style={styles.docCard}>
                  <div 
                    style={styles.docHeader}
                    onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                  >
                    <div>
                      <div style={styles.docTitle}>
                        {getDocTypeLabel(doc.doc_type)}
                        {isCV && (
                          <span style={styles.atsChip}>
                            ✓ ATS Optimizado
                          </span>
                        )}
                      </div>
                      <div style={styles.docRole}>
                        Para: {role?.title_es || role?.title || 'Rol específico'}
                      </div>
                    </div>
                    <div style={styles.docActions}>
                      <button 
                        style={styles.copyBtn(copied === doc.id)}
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(content, doc.id)
                        }}
                      >
                        {copied === doc.id ? '✓ Copiado' : '📋 Copiar texto'}
                      </button>
                      {isCV && (
                        <button style={styles.pdfBtn}>
                          📥 PDF
                        </button>
                      )}
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={styles.docContent}>
                      {isCV ? (
                        <CVPaperPreview doc={doc} />
                      ) : (
                        <pre style={styles.contentPreview}>{content}</pre>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}

        {/* Regenerate button if documents exist */}
        {documents.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button 
              style={{ ...styles.actionBtn, padding: '14px 28px' }}
              onClick={handleGenerateDocuments}
              disabled={generating}
            >
              {generating ? 'Regenerando...' : '🔄 Regenerar todos los documentos'}
            </button>
          </div>
        )}

        {/* Navigation */}
        <div style={styles.nav}>
          <Link href={`/selected?userId=${userId}`} style={styles.navLink}>
            ← Mis selecciones
          </Link>
          <Link href={`/roles?userId=${userId}`} style={styles.navLink}>
            Explorar roles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function DocumentsPage() {
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
        <p>Cargando documentos...</p>
      </div>
    }>
      <DocumentsContent />
    </Suspense>
  )
}
