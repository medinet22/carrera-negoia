export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard Carrera IA (Privado)',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
}

async function getData(token) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://carrera.negoia.com'
  const res = await fetch(`${base}/api/dashboard?token=${token}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function Dashboard({ searchParams }) {
  const params = await searchParams
  const token = params?.token || ''

  if (!token) {
    return <main style={{padding:'40px',fontFamily:'Inter, sans-serif'}}>Falta token. Usa <code>/dashboard?token=...</code></main>
  }

  const data = await getData(token)
  if (!data) {
    return <main style={{padding:'40px',fontFamily:'Inter, sans-serif'}}>No autorizado o sin datos.</main>
  }

  const { summary, rows } = data

  return (
    <main style={{ padding: '28px', fontFamily: 'Inter, sans-serif', background: '#0b1020', minHeight: '100vh', color: '#e5e7eb' }}>
      <h1 style={{ marginBottom: 8 }}>Dashboard Carrera IA</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Tracking MVP — waitlist y respuestas de encuesta</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(120px,1fr))', gap: 12, marginBottom: 20 }}>
        <Card title='Waitlist total' value={summary.total_waitlist} />
        <Card title='Correo enviado' value={summary.correo_enviado} />
        <Card title='Encuesta respondida' value={summary.encuesta_respondida} />
        <Card title='Response rate' value={`${summary.response_rate}%`} />
        <Card title='Would buy (yes)' value={summary.would_buy_yes} />
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #1f2937', borderRadius: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ background: '#111827' }}>
            <tr>
              <Th>Email</Th>
              <Th>Estado comercial</Th>
              <Th>Lead temp</Th>
              <Th>Score</Th>
              <Th>Correo enviado</Th>
              <Th>Encuesta respondida</Th>
              <Th>Would buy</Th>
              <Th>Precio</Th>
              <Th>Próxima acción</Th>
              <Th>Alta</Th>
              <Th>Última respuesta</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.email + i} style={{ borderTop: '1px solid #1f2937' }}>
                <Td>{r.email}</Td>
                <Td>{r.commercial_status}</Td>
                <Td>{r.lead_temp}</Td>
                <Td>{r.score}</Td>
                <Td>{r.correo_enviado ? '✅' : '—'}</Td>
                <Td>{r.encuesta_respondida ? '✅' : '❌'}</Td>
                <Td>{r.would_buy === true ? 'Sí' : r.would_buy === false ? 'No' : '—'}</Td>
                <Td>{r.price_mentioned ? `€${r.price_mentioned}` : '—'}</Td>
                <Td>{r.next_action}</Td>
                <Td>{fmt(r.joined_at)}</Td>
                <Td>{r.last_response_at ? fmt(r.last_response_at) : '—'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

function Card({ title, value }) {
  return (
    <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function Th({ children }) { return <th style={{ textAlign: 'left', padding: 10 }}>{children}</th> }
function Td({ children }) { return <td style={{ padding: 10 }}>{children}</td> }
function fmt(v) { return new Date(v).toLocaleString('es-ES', { timeZone: 'UTC' }) }
