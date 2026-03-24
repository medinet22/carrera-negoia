import { createClient } from '@supabase/supabase-js'

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
    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return Response.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Get skills map
    const { data: skillsMap, error: mapError } = await supabase
      .from('skills_maps')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Get top role matches
    const { data: roleMatches, error: matchError } = await supabase
      .from('role_matches')
      .select('*')
      .eq('user_id', userId)
      .order('match_percentage', { ascending: false })
      .limit(20)

    // Check if user has paid
    const { data: orders, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .limit(1)

    const hasPaid = orders && orders.length > 0
    const paidPlan = hasPaid ? orders[0].plan : null

    // Format top roles with catalog data
    const topRoles = await Promise.all(
      (roleMatches || []).slice(0, 5).map(async (match) => {
        // Get role catalog data
        const { data: role } = await supabase
          .from('roles_catalog')
          .select('*')
          .eq('id', match.role_id)
          .single()

        if (!role) {
          // Fallback to JSON catalog
          const rolesJson = await import('../../../data/roles-catalog.json')
          const roleFromJson = rolesJson.default.find(r => r.id === match.role_id)
          
          return {
            ...match,
            title: roleFromJson?.title || 'Rol',
            title_es: roleFromJson?.title_es || 'Rol',
            salary_range: getSalaryRange(roleFromJson, user.country)
          }
        }

        return {
          ...match,
          title: role.title,
          title_es: role.title_es,
          salary_range: getSalaryRange(role, user.country)
        }
      })
    )

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        country: user.country
      },
      skillsMap: skillsMap || null,
      topRoles,
      hasPaid,
      paidPlan
    })

  } catch (err) {
    console.error('Profile API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

function getSalaryRange(role, country) {
  if (!role?.salary_ranges) return null
  
  const countryCode = country || 'ES'
  const range = role.salary_ranges[countryCode] || role.salary_ranges['ES']
  
  if (!range) return null
  
  const formatNumber = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${Math.round(n / 1000)}K`
    return n.toString()
  }

  return `${formatNumber(range.min)} - ${formatNumber(range.max)} ${range.currency}`
}
