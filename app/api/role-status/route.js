import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function PATCH(request) {
  try {
    const { roleMatchId, status } = await request.json()

    if (!roleMatchId) {
      return Response.json({ error: 'roleMatchId requerido' }, { status: 400 })
    }

    const validStatuses = ['pending', 'interested', 'discarded', 'priority']
    if (!validStatuses.includes(status)) {
      return Response.json({ error: 'Status inválido' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('role_matches')
      .update({ 
        user_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', roleMatchId)
      .select()
      .single()

    if (error) {
      console.error('Error updating role status:', error)
      return Response.json({ error: 'Error actualizando status' }, { status: 500 })
    }

    return Response.json({ success: true, data })

  } catch (err) {
    console.error('Role status API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
