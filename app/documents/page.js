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
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      background: isCopied ? '#10b981' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: '#fff',
      fontSize: '13px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }),
    docContent: {
      padding: '0 24px 24px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
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
            Tus CVs, cartas y recursos listos para usar
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
              CV genérico, CVs por rol, cartas de presentación, LinkedIn bullets y elevator pitch
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

        {/* Generic documents */}
        {genericDocs.length > 0 && (
          <>
            <h3 style={styles.sectionTitle}>Documentos generales</h3>
            {genericDocs.map(doc => {
              const isExpanded = expandedDoc === doc.id
              const content = doc.content_text || JSON.stringify(doc.content, null, 2)
              
              return (
                <div key={doc.id} style={styles.docCard}>
                  <div 
                    style={styles.docHeader}
                    onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                  >
                    <div>
                      <div style={styles.docTitle}>
                        {getDocTypeLabel(doc.doc_type)}
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
                        {copied === doc.id ? '✓ Copiado' : '📋 Copiar'}
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={styles.docContent}>
                      <pre style={styles.contentPreview}>{content}</pre>
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}

        {/* Role-specific documents */}
        {specificDocs.length > 0 && (
          <>
            <h3 style={styles.sectionTitle}>Documentos por rol</h3>
            {specificDocs.map(doc => {
              const isExpanded = expandedDoc === doc.id
              const content = doc.content_text || JSON.stringify(doc.content, null, 2)
              const role = selectedRoles.find(r => r.role_id === doc.role_id)
              
              return (
                <div key={doc.id} style={styles.docCard}>
                  <div 
                    style={styles.docHeader}
                    onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                  >
                    <div>
                      <div style={styles.docTitle}>
                        {getDocTypeLabel(doc.doc_type)}
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
                        {copied === doc.id ? '✓ Copiado' : '📋 Copiar'}
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={styles.docContent}>
                      <pre style={styles.contentPreview}>{content}</pre>
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
