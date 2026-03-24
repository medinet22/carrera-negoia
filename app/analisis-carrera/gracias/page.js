'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { track } from '../../lib/analytics'

export default function Gracias() {
  useEffect(() => {
    track('purchase_complete', { product: 'analisis_carrera', price: 29 })
  }, [])

  return (
    <>
      <section className="hero" style={{ paddingTop: '80px', paddingBottom: '60px', minHeight: '80vh' }}>
        <div className="hero-content" style={{ maxWidth: '600px' }}>
          
          <div style={{ 
            fontSize: '64px', 
            marginBottom: '24px',
            animation: 'bounce 1s ease-in-out'
          }}>
            🎉
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '16px' }}>
            ¡Pago recibido!
          </h1>
          
          <p className="subtitle" style={{ fontSize: '18px', marginBottom: '32px' }}>
            Tu Análisis de Carrera Personalizado está en proceso.<br/>
            <strong>En menos de 48 horas</strong> lo recibirás en tu email.
          </p>

          <div style={{ 
            background: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            borderRadius: '12px', 
            padding: '24px', 
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '16px' }}>
              📎 Siguiente paso (opcional pero recomendado)
            </h3>
            <p style={{ margin: 0, color: '#15803d', fontSize: '15px', lineHeight: '1.6' }}>
              Revisa tu bandeja de entrada: te hemos enviado un email de confirmación. 
              <strong> Responde a ese email adjuntando tu CV</strong> para que el análisis sea más preciso.
            </p>
            <p style={{ margin: '12px 0 0 0', color: '#166534', fontSize: '14px' }}>
              Si no tienes CV actualizado, no te preocupes — trabajaremos con la información que nos diste en el formulario.
            </p>
          </div>

          <div style={{ 
            background: '#f8fafc', 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px', 
            padding: '24px', 
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '16px' }}>
              ¿Qué recibirás?
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: '1.8' }}>
              <li>Mapa de tus habilidades (técnicas + interpersonales)</li>
              <li>5 roles del mercado que encajan con tu perfil</li>
              <li>Análisis de gaps: qué te falta para cada rol</li>
              <li>Tu "habilidad oculta" que probablemente no estás vendiendo</li>
              <li>Plan de acción concreto para los próximos 30 días</li>
            </ul>
          </div>

          <Link 
            href="/" 
            style={{ 
              color: '#2563eb', 
              textDecoration: 'none', 
              fontSize: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Volver a inicio
          </Link>

        </div>
      </section>

      <footer>
        <p>© 2026 NegoIA · Cualquier duda, escríbenos a d@negoia.com</p>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  )
}
