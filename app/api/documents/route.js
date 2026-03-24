import { createClient } from '@supabase/supabase-js'
import rolesCatalog from '../../../data/roles-catalog.json'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return Response.json({ error: 'userId requerido' }, { status: 400 })
  }

  try {
    // Check if user has complete plan
    const { data: orders, error: orderError } = await supabase
      .from('carrera_orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .order('created_at', { ascending: false })
      .limit(1)

    const hasPaid = orders && orders.length > 0
    const paidPlan = hasPaid ? orders[0].plan : null

    if (!hasPaid || paidPlan !== 'complete') {
      return Response.json({ hasPaid, paidPlan, documents: [], selectedRoles: [] })
    }

    // Get documents
    const { data: documents, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    // Get selected roles for context
    const { data: roleMatches, error: matchError } = await supabase
      .from('role_matches')
      .select('*')
      .eq('user_id', userId)
      .in('user_status', ['interested', 'priority'])

    // Enrich roles with catalog data
    const selectedRoles = (roleMatches || []).map(match => {
      const catalogRole = rolesCatalog.find(r => r.id === match.role_id)
      return {
        ...match,
        title: catalogRole?.title || 'Rol',
        title_es: catalogRole?.title_es || 'Rol'
      }
    })

    return Response.json({
      hasPaid,
      paidPlan,
      documents: documents || [],
      selectedRoles
    })

  } catch (err) {
    console.error('Documents API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
