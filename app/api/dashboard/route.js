import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const expected = process.env.CARRERA_DASHBOARD_TOKEN || 'carrera-dashboard-2026'

  if (token !== expected) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    )
  }

  const [{ data: waitlist, error: e1 }, { data: discovery, error: e2 }] = await Promise.all([
    supabase.from('carrera_waitlist').select('email,created_at').order('created_at', { ascending: false }).limit(1000),
    supabase.from('carrera_discovery').select('contact_info,created_at,would_buy,willingness_to_pay,price_mentioned').order('created_at', { ascending: false }).limit(1000)
  ])

  if (e1 || e2) {
    return Response.json(
      { error: (e1 || e2)?.message || 'db_error' },
      { status: 500, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    )
  }

  const discoveryByEmail = new Map()
  for (const d of discovery || []) {
    const email = (d.contact_info || '').toLowerCase().trim()
    if (!email) continue
    if (!discoveryByEmail.has(email)) discoveryByEmail.set(email, [])
    discoveryByEmail.get(email).push(d)
  }

  const rows = (waitlist || []).map(w => {
    const email = (w.email || '').toLowerCase().trim()
    const matches = discoveryByEmail.get(email) || []
    const latestDiscovery = matches[0]

    const encuesta_respondida = matches.length > 0
    const wouldBuy = latestDiscovery?.would_buy ?? null
    const price = latestDiscovery?.price_mentioned ?? null
    const wtp = latestDiscovery?.willingness_to_pay ?? null

    let lead_temp = 'cold'
    let score = 20
    if (encuesta_respondida) score += 20
    if (wouldBuy === true) score += 30
    if (price && price >= 49) score += 20
    else if (price && price >= 29) score += 10
    if (wtp === 'definitely' || wtp === 'probably') score += 20
    else if (wtp === 'maybe') score += 10

    if (score >= 75) lead_temp = 'hot'
    else if (score >= 50) lead_temp = 'warm'

    let commercial_status = 'new_lead'
    let next_action = 'esperar respuesta de encuesta'

    if (!encuesta_respondida) {
      commercial_status = 'welcome_sent'
      next_action = 'enviar recordatorio encuesta en 24h'
    } else if (encuesta_respondida && lead_temp === 'hot') {
      commercial_status = 'qualified_hot'
      next_action = 'invitar beta prioritaria + seguimiento en 24h'
    } else if (encuesta_respondida && lead_temp === 'warm') {
      commercial_status = 'qualified_warm'
      next_action = 'enviar caso de uso + invitación beta'
    } else if (encuesta_respondida) {
      commercial_status = 'qualified_cold'
      next_action = 'mantener en nurture semanal'
    }

    return {
      email: w.email,
      joined_at: w.created_at,
      correo_enviado: true,
      encuesta_respondida,
      respuestas_count: matches.length,
      would_buy: wouldBuy,
      willingness_to_pay: wtp,
      price_mentioned: price,
      last_response_at: latestDiscovery?.created_at ?? null,
      lead_temp,
      score,
      commercial_status,
      next_action
    }
  })

  const summary = {
    total_waitlist: rows.length,
    correo_enviado: rows.filter(r => r.correo_enviado).length,
    encuesta_respondida: rows.filter(r => r.encuesta_respondida).length,
    response_rate: rows.length ? Number((rows.filter(r => r.encuesta_respondida).length / rows.length * 100).toFixed(1)) : 0,
    would_buy_yes: rows.filter(r => r.would_buy === true).length
  }

  return Response.json(
    { summary, rows },
    { headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
  )
}
