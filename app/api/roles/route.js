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
    // Check if user has paid
    const { data: orders, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .order('created_at', { ascending: false })
      .limit(1)

    const hasPaid = orders && orders.length > 0
    const paidPlan = hasPaid ? orders[0].plan : null

    if (!hasPaid) {
      return Response.json({ hasPaid: false, roles: [] })
    }

    // Get user country
    const { data: user } = await supabase
      .from('users')
      .select('country')
      .eq('id', userId)
      .single()

    // Get profile_id from assessment_jobs (links user_id to profile_id)
    const { data: assessmentJob } = await supabase
      .from('assessment_jobs')
      .select('profile_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const profileId = assessmentJob?.profile_id

    if (!profileId) {
      return Response.json({ hasPaid, paidPlan, userCountry: user?.country || 'ES', roles: [] })
    }

    // Get all role matches by profile_id
    const { data: roleMatches, error: matchError } = await supabase
      .from('role_matches')
      .select('*')
      .eq('profile_id', profileId)
      .order('match_percentage', { ascending: false })

    if (matchError) {
      console.error('Error fetching role matches:', matchError)
      return Response.json({ error: 'Error obteniendo roles' }, { status: 500 })
    }

    // Enrich with catalog data
    const enrichedRoles = (roleMatches || []).map(match => {
      const catalogRole = rolesCatalog.find(r => r.id === match.role_id)
      
      if (!catalogRole) {
        return {
          ...match,
          title: 'Rol',
          title_es: 'Rol',
          day_to_day: '',
          pros: [],
          cons: [],
          salary_ranges: {},
          demand_level: 'media',
          remote_friendly: false
        }
      }

      return {
        ...match,
        title: catalogRole.title,
        title_es: catalogRole.title_es,
        category: catalogRole.category,
        day_to_day: catalogRole.day_to_day,
        pros: catalogRole.pros,
        cons: catalogRole.cons,
        salary_ranges: catalogRole.salary_ranges,
        demand_level: catalogRole.demand_level,
        growth_percentage: catalogRole.growth_percentage,
        remote_friendly: catalogRole.remote_friendly,
        companies_hiring: catalogRole.companies_hiring,
        linkedin_search_template: catalogRole.linkedin_search_template,
        infojobs_search_template: catalogRole.infojobs_search_template,
        indeed_search_template: catalogRole.indeed_search_template,
        transition_from: catalogRole.transition_from
      }
    })

    return Response.json({
      hasPaid,
      paidPlan,
      userCountry: user?.country || 'ES',
      roles: enrichedRoles
    })

  } catch (err) {
    console.error('Roles API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
