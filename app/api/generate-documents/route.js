import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'
import { CV_GENERATION_PROMPT, COVER_LETTER_PROMPT, LINKEDIN_PITCH_PROMPT, fillPrompt } from '../../../lib/ai-prompts'
import rolesCatalog from '../../../data/roles-catalog.json'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return Response.json({ error: 'userId requerido' }, { status: 400 })
    }

    // Check if user has complete plan
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .eq('plan', 'complete')
      .limit(1)

    if (!orders || orders.length === 0) {
      return Response.json({ error: 'Plan Completo requerido' }, { status: 403 })
    }

    const orderId = orders[0].id

    // Get user profile and skills map
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const { data: skillsMap } = await supabase
      .from('skills_maps')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Get selected roles
    const { data: selectedMatches } = await supabase
      .from('role_matches')
      .select('*')
      .eq('user_id', userId)
      .in('user_status', ['interested', 'priority'])

    const selectedRoles = (selectedMatches || []).map(match => {
      const catalogRole = rolesCatalog.find(r => r.id === match.role_id)
      return {
        ...match,
        ...catalogRole
      }
    })

    // Delete existing documents
    await supabase
      .from('documents')
      .delete()
      .eq('user_id', userId)

    const documents = []

    // Build user profile context
    const userProfile = {
      name: user?.name || 'Profesional',
      email: user?.email || '',
      country: user?.country || 'ES',
      cv_text: profile?.cv_raw_text || '',
      intake_answers: profile?.intake_answers || {},
      skills: skillsMap || {}
    }

    // 1. Generate generic CV
    try {
      const cvPrompt = fillPrompt(CV_GENERATION_PROMPT, {
        user_profile: JSON.stringify(userProfile, null, 2),
        target_role: 'Genérico - optimizado para múltiples roles',
        skills_map: JSON.stringify(skillsMap, null, 2)
      })

      const cvResponse = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: cvPrompt }]
      })

      const cvData = parseJsonResponse(cvResponse.content[0].text)

      const { data: cvDoc } = await supabase
        .from('documents')
        .insert({
          user_id: userId,
          order_id: orderId,
          doc_type: 'cv_generic',
          content: cvData,
          content_text: cvData.full_text || formatCvText(cvData)
        })
        .select()
        .single()

      if (cvDoc) documents.push(cvDoc)
    } catch (err) {
      console.error('Error generating generic CV:', err)
    }

    // 2. Generate LinkedIn bullets and elevator pitch
    try {
      const pitchPrompt = fillPrompt(LINKEDIN_PITCH_PROMPT, {
        user_profile: JSON.stringify(userProfile, null, 2),
        skills_map: JSON.stringify(skillsMap, null, 2),
        target_roles: JSON.stringify(selectedRoles.slice(0, 3).map(r => r.title_es), null, 2)
      })

      const pitchResponse = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: pitchPrompt }]
      })

      const pitchData = parseJsonResponse(pitchResponse.content[0].text)

      // LinkedIn bullets
      if (pitchData.linkedin_about_bullets) {
        const { data: linkedinDoc } = await supabase
          .from('documents')
          .insert({
            user_id: userId,
            order_id: orderId,
            doc_type: 'linkedin_bullets',
            content: { bullets: pitchData.linkedin_about_bullets, headlines: pitchData.headline_suggestions },
            content_text: pitchData.linkedin_about_bullets.join('\n\n')
          })
          .select()
          .single()

        if (linkedinDoc) documents.push(linkedinDoc)
      }

      // Elevator pitch
      if (pitchData.elevator_pitch) {
        const { data: pitchDoc } = await supabase
          .from('documents')
          .insert({
            user_id: userId,
            order_id: orderId,
            doc_type: 'elevator_pitch',
            content: { pitch: pitchData.elevator_pitch },
            content_text: pitchData.elevator_pitch
          })
          .select()
          .single()

        if (pitchDoc) documents.push(pitchDoc)
      }
    } catch (err) {
      console.error('Error generating LinkedIn/pitch:', err)
    }

    // 3. Generate role-specific CVs and cover letters (max 3 roles)
    for (const role of selectedRoles.slice(0, 3)) {
      try {
        // Specific CV
        const specificCvPrompt = fillPrompt(CV_GENERATION_PROMPT, {
          user_profile: JSON.stringify(userProfile, null, 2),
          target_role: JSON.stringify(role, null, 2),
          skills_map: JSON.stringify(skillsMap, null, 2)
        })

        const specificCvResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-5-20250514',
          max_tokens: 4000,
          messages: [{ role: 'user', content: specificCvPrompt }]
        })

        const specificCvData = parseJsonResponse(specificCvResponse.content[0].text)

        const { data: specificCvDoc } = await supabase
          .from('documents')
          .insert({
            user_id: userId,
            order_id: orderId,
            doc_type: 'cv_specific',
            role_id: role.role_id,
            content: specificCvData,
            content_text: specificCvData.full_text || formatCvText(specificCvData)
          })
          .select()
          .single()

        if (specificCvDoc) documents.push(specificCvDoc)

        // Cover letter
        const coverPrompt = fillPrompt(COVER_LETTER_PROMPT, {
          user_profile: JSON.stringify(userProfile, null, 2),
          target_role: JSON.stringify(role, null, 2),
          company_name: role.companies_hiring?.[0] || '[Empresa]'
        })

        const coverResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-5-20250514',
          max_tokens: 1500,
          messages: [{ role: 'user', content: coverPrompt }]
        })

        const coverData = parseJsonResponse(coverResponse.content[0].text)

        const { data: coverDoc } = await supabase
          .from('documents')
          .insert({
            user_id: userId,
            order_id: orderId,
            doc_type: 'cover_letter',
            role_id: role.role_id,
            content: coverData,
            content_text: coverData.full_text || formatCoverLetter(coverData)
          })
          .select()
          .single()

        if (coverDoc) documents.push(coverDoc)

      } catch (err) {
        console.error(`Error generating docs for role ${role.title}:`, err)
      }
    }

    return Response.json({ 
      status: 'done',
      documents 
    })

  } catch (err) {
    console.error('Generate documents API error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

function parseJsonResponse(text) {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                      text.match(/```\s*([\s\S]*?)\s*```/) ||
                      [null, text]
    const jsonStr = jsonMatch[1] || text
    return JSON.parse(jsonStr.trim())
  } catch (err) {
    console.error('Error parsing JSON:', err)
    return { raw_text: text }
  }
}

function formatCvText(cvData) {
  if (!cvData) return ''
  
  const lines = []
  if (cvData.header) {
    lines.push(cvData.header.name?.toUpperCase() || '')
    lines.push(`${cvData.header.location || ''} | ${cvData.header.email || ''} | ${cvData.header.phone || ''}`)
    if (cvData.header.linkedin) lines.push(cvData.header.linkedin)
    lines.push('')
  }
  
  if (cvData.summary) {
    lines.push('RESUMEN PROFESIONAL')
    lines.push(cvData.summary)
    lines.push('')
  }
  
  if (cvData.skills_section) {
    lines.push('HABILIDADES')
    lines.push(cvData.skills_section.join(' • '))
    lines.push('')
  }
  
  if (cvData.experience) {
    lines.push('EXPERIENCIA PROFESIONAL')
    cvData.experience.forEach(exp => {
      lines.push(`${exp.title} | ${exp.company} | ${exp.dates}`)
      exp.bullets?.forEach(b => lines.push(`• ${b}`))
      lines.push('')
    })
  }
  
  if (cvData.education) {
    lines.push('EDUCACIÓN')
    cvData.education.forEach(edu => {
      lines.push(`${edu.degree} | ${edu.institution} | ${edu.year}`)
    })
    lines.push('')
  }
  
  if (cvData.certifications) {
    lines.push('CERTIFICACIONES')
    lines.push(cvData.certifications.join(' | '))
  }
  
  return lines.join('\n')
}

function formatCoverLetter(data) {
  if (!data) return ''
  return `${data.greeting || ''}\n\n${data.body || ''}\n\n${data.closing || ''}`
}
