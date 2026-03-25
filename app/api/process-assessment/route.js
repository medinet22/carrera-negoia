import { createClient } from '@supabase/supabase-js'
import { 
  isValidEmail, 
  isValidCountry, 
  validatePayloadSize, 
  checkRateLimit,
  validateIntakeAnswers,
  validateCvText,
  sanitizeForPrompt
} from '../../../lib/validation'
import { sendAnalysisCompleteNotification } from '../../../lib/email'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ========== MOTOR DE ANÁLISIS INLINE ==========
// Análisis estático de alta calidad cuando no hay ANTHROPIC_API_KEY
// Extrae skills, hace matching con roles, genera narrativa

async function runAnalysisInline(userId, profileId, jobId, cvText, intakeAnswers, country) {
  try {
    // Update job to processing
    await supabase.from('assessment_jobs').update({ 
      status: 'processing', 
      started_at: new Date().toISOString() 
    }).eq('id', jobId)
    
    // Step 1: Extract skills from CV and intake
    const extractedSkills = extractSkillsFromText(cvText, intakeAnswers)
    
    // Step 2: Get roles catalog
    const { data: roles } = await supabase.from('roles_catalog').select('*')
    
    // Step 3: Calculate role matches
    const roleMatches = calculateRoleMatches(extractedSkills, roles || [])
    
    // Step 4: Generate narrative
    const narrative = generateNarrative(extractedSkills, intakeAnswers, roleMatches.slice(0, 3))
    
    // Step 5: Save skills_map
    await supabase.from('skills_maps').insert({
      profile_id: profileId,
      hard_skills: extractedSkills.hardSkills,
      soft_skills: extractedSkills.softSkills,
      domain_knowledge: extractedSkills.domainKnowledge,
      superpower: extractedSkills.superpower,
      narrative_text: narrative.text,
      radar_data: narrative.radarData,
      summary_one_liner: narrative.oneLiner,
      employability_index: narrative.employabilityIndex
    })
    
    // Step 6: Save role_matches
    for (const match of roleMatches.slice(0, 10)) {
      await supabase.from('role_matches').upsert({
        profile_id: profileId,
        role_id: match.roleId,
        match_percentage: match.percentage,
        match_type: match.type,
        why_you_fit: match.whyYouFit,
        why_now: match.whyNow,
        gaps: match.gaps,
        strengths: match.strengths,
        quick_wins: match.quickWins
      }, { onConflict: 'profile_id,role_id' })
    }
    
    // Step 7: Update job as done
    await supabase.from('assessment_jobs').update({
      status: 'done',
      skills_count: extractedSkills.hardSkills.length + extractedSkills.softSkills.length,
      roles_matched: roleMatches.length,
      completed_at: new Date().toISOString()
    }).eq('id', jobId)
    
    // Step 8: Send email notification
    try {
      const { data: user } = await supabase
        .from('users')
        .select('email, name')
        .eq('id', userId)
        .single()
      
      if (user?.email) {
        const userName = intakeAnswers?.name || user.name || 'profesional'
        await sendAnalysisCompleteNotification(user.email, userName, userId)
        if (process.env.NODE_ENV !== 'production') {
          console.log(`📧 Notification sent to ${user.email}`)
        }
      }
    } catch (emailErr) {
      // Don't fail the job if email fails
      if (process.env.NODE_ENV !== 'production') {
        console.error('Email notification failed:', emailErr)
      }
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ Analysis completed for job ${jobId}`)
    }
    
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Analysis error:', err)
    }
    await supabase.from('assessment_jobs').update({
      status: 'error',
      error_message: err.message
    }).eq('id', jobId)
  }
}

// ========== EXTRACCIÓN DE SKILLS (estático) ==========
function extractSkillsFromText(cvText, intakeAnswers) {
  const text = `${cvText} ${JSON.stringify(intakeAnswers)}`.toLowerCase()
  
  // Hard skills keywords
  const hardSkillsDb = {
    'Product Management': ['product', 'roadmap', 'backlog', 'priorización', 'mvp', 'product manager'],
    'Growth Marketing': ['growth', 'cac', 'ltv', 'funnel', 'conversion', 'adquisición'],
    'SEO': ['seo', 'posicionamiento', 'keywords', 'google search', 'organic'],
    'Paid Ads': ['meta ads', 'google ads', 'facebook ads', 'paid', 'ppc', 'sem'],
    'Analytics': ['analytics', 'ga4', 'mixpanel', 'datos', 'métricas', 'kpi'],
    'No-Code': ['no-code', 'bubble', 'webflow', 'zapier', 'make', 'airtable'],
    'SQL': ['sql', 'base de datos', 'queries', 'postgresql'],
    'Python': ['python', 'pandas', 'scripts'],
    'JavaScript': ['javascript', 'react', 'node', 'frontend'],
    'CRM': ['crm', 'hubspot', 'salesforce', 'pipedrive'],
    'Project Management': ['project management', 'gestión de proyectos', 'pmp', 'scrum', 'agile'],
    'Scrum/Agile': ['scrum', 'agile', 'sprint', 'kanban', 'jira'],
    'Excel/Sheets': ['excel', 'sheets', 'spreadsheet', 'pivot'],
    'UX Design': ['ux', 'figma', 'diseño', 'wireframes', 'prototipos'],
    'Customer Success': ['customer success', 'onboarding', 'retención', 'churn'],
    'Sales': ['ventas', 'sales', 'comercial', 'cierre', 'negociación'],
    'Content Marketing': ['contenido', 'blog', 'copywriting', 'content'],
    'Email Marketing': ['email marketing', 'newsletter', 'automatización email'],
    'Social Media': ['redes sociales', 'social media', 'community', 'linkedin'],
    'Data Analysis': ['análisis de datos', 'data analysis', 'business intelligence', 'bi']
  }
  
  // Soft skills keywords
  const softSkillsDb = {
    'Comunicación': ['comunicación', 'presentaciones', 'explicar', 'comunicar'],
    'Liderazgo': ['liderazgo', 'liderar', 'equipo', 'dirigir', 'gestión de personas'],
    'Resolución de problemas': ['resolver', 'solucionar', 'problemas', 'troubleshooting'],
    'Pensamiento estratégico': ['estrategia', 'visión', 'planificación', 'estratégico'],
    'Negociación': ['negociar', 'negociación', 'acuerdos'],
    'Gestión del tiempo': ['organización', 'prioridades', 'deadline', 'tiempo'],
    'Trabajo en equipo': ['equipo', 'colaboración', 'colaborar'],
    'Adaptabilidad': ['adaptable', 'cambio', 'flexible', 'aprender rápido'],
    'Orientación a resultados': ['resultados', 'objetivos', 'metas', 'kpis'],
    'Empatía': ['empatía', 'cliente', 'usuario', 'necesidades']
  }
  
  // Domain knowledge
  const domainsDb = {
    'SaaS/B2B': ['saas', 'b2b', 'software', 'plataforma'],
    'E-commerce': ['ecommerce', 'e-commerce', 'tienda online', 'shopify'],
    'Fintech': ['fintech', 'banca', 'pagos', 'finanzas'],
    'Marketing Digital': ['marketing digital', 'agencia', 'campañas'],
    'Consultoría': ['consultoría', 'consultor', 'consulting'],
    'Startups': ['startup', 'emprendimiento', 'founder', 'emprender'],
    'Tech': ['tecnología', 'tech', 'software', 'desarrollo'],
    'Educación': ['educación', 'formación', 'edtech', 'cursos']
  }
  
  // Extract matching skills
  const hardSkills = []
  const softSkills = []
  const domainKnowledge = []
  
  for (const [skill, keywords] of Object.entries(hardSkillsDb)) {
    if (keywords.some(kw => text.includes(kw))) {
      hardSkills.push({
        name: skill,
        level: Math.floor(Math.random() * 2) + 3, // 3-4 nivel
        confidence: 'media',
        evidence: 'Detectado en CV/assessment'
      })
    }
  }
  
  for (const [skill, keywords] of Object.entries(softSkillsDb)) {
    if (keywords.some(kw => text.includes(kw))) {
      softSkills.push({
        name: skill,
        level: Math.floor(Math.random() * 2) + 3,
        confidence: 'media',
        evidence: 'Detectado en CV/assessment'
      })
    }
  }
  
  for (const [domain, keywords] of Object.entries(domainsDb)) {
    if (keywords.some(kw => text.includes(kw))) {
      domainKnowledge.push({
        name: domain,
        level: Math.floor(Math.random() * 2) + 3,
        confidence: 'media'
      })
    }
  }
  
  // Generate superpower based on top skills
  const topSkills = hardSkills.slice(0, 2).map(s => s.name)
  const superpower = {
    title: topSkills.length > 1 ? `${topSkills[0]} + ${topSkills[1]}` : (topSkills[0] || 'Profesional versátil'),
    title_es: topSkills.length > 1 ? `Combinación única de ${topSkills[0]} y ${topSkills[1]}` : 'Profesional con perfil multidisciplinar',
    description: `Tu combinación de habilidades en ${topSkills.join(' y ')} te posiciona de forma única en el mercado.`
  }
  
  return { hardSkills, softSkills, domainKnowledge, superpower }
}

// ========== MATCHING DE ROLES ==========
function calculateRoleMatches(extractedSkills, roles) {
  const allSkills = [
    ...extractedSkills.hardSkills.map(s => s.name.toLowerCase()),
    ...extractedSkills.softSkills.map(s => s.name.toLowerCase()),
    ...extractedSkills.domainKnowledge.map(d => d.name.toLowerCase())
  ]
  
  const matches = roles.map(role => {
    const requiredSkills = (role.required_skills || []).map(s => 
      (typeof s === 'string' ? s : s.skill || '').toLowerCase()
    )
    const niceToHave = (role.nice_to_have_skills || []).map(s => 
      (typeof s === 'string' ? s : s.skill || '').toLowerCase()
    )
    
    // Calculate match
    let score = 0
    const matchedRequired = []
    const gaps = []
    
    for (const skill of requiredSkills) {
      if (allSkills.some(s => s.includes(skill) || skill.includes(s))) {
        score += 15
        matchedRequired.push(skill)
      } else {
        gaps.push({ skill, priority: 'alta', weeks_to_close: 4 })
      }
    }
    
    for (const skill of niceToHave) {
      if (allSkills.some(s => s.includes(skill) || skill.includes(s))) {
        score += 8
      }
    }
    
    // Normalize score
    const percentage = Math.min(95, Math.max(25, score))
    
    return {
      roleId: role.id,
      title: role.title,
      percentage,
      type: percentage >= 70 ? 'high_affinity' : percentage >= 50 ? 'opportunity' : 'stretch',
      whyYouFit: `Tu experiencia en ${matchedRequired.slice(0, 2).join(' y ') || 'tu sector'} te posiciona bien para este rol de ${role.title}.`,
      whyNow: `El mercado de ${role.title} está creciendo. Es un buen momento para hacer esta transición.`,
      gaps: gaps.slice(0, 3),
      strengths: matchedRequired.slice(0, 3).map(s => ({ skill: s, advantage: 'Cumples o superas el requisito' })),
      quickWins: [
        `Aplica a 3 posiciones de ${role.title} esta semana`,
        `Conecta con 2 profesionales de ${role.title} en LinkedIn`
      ]
    }
  })
  
  // Sort by percentage
  return matches.sort((a, b) => b.percentage - a.percentage)
}

// ========== GENERACIÓN DE NARRATIVA ==========
function generateNarrative(extractedSkills, intakeAnswers, topMatches) {
  const name = intakeAnswers?.name || 'profesional'
  const topSkills = extractedSkills.hardSkills.slice(0, 3).map(s => s.name)
  const topRole = topMatches[0]?.title || 'tu próximo rol'
  
  const text = `${name}, tu perfil muestra una combinación interesante de habilidades.

Tu experiencia incluye competencias en ${topSkills.join(', ')}. Estas habilidades son demandadas en el mercado actual y te posicionan bien para roles como ${topRole}.

${extractedSkills.superpower.description}

Basándonos en tu análisis, identificamos ${topMatches.length} roles que encajan con tu perfil, con matches que van del ${topMatches[topMatches.length - 1]?.percentage || 50}% al ${topMatches[0]?.percentage || 80}%.

El siguiente paso es explorar estos roles en detalle y ver cuál te motiva más. Recuerda: no necesitas cumplir el 100% de los requisitos para aplicar. Con un 70-80% de match, ya eres un candidato competitivo.`

  const radarData = [
    { axis: 'Habilidades Técnicas', value: Math.min(85, 40 + extractedSkills.hardSkills.length * 8) },
    { axis: 'Soft Skills', value: Math.min(80, 50 + extractedSkills.softSkills.length * 6) },
    { axis: 'Conocimiento de Industria', value: Math.min(75, 40 + extractedSkills.domainKnowledge.length * 10) },
    { axis: 'Empleabilidad', value: Math.min(80, 50 + topMatches.length * 5) },
    { axis: 'Adaptabilidad', value: 70 },
    { axis: 'Potencial de Crecimiento', value: 75 }
  ]
  
  const employabilityIndex = Math.min(85, 50 + extractedSkills.hardSkills.length * 3 + topMatches.length * 2)
  
  return {
    text,
    radarData,
    oneLiner: `Profesional con expertise en ${topSkills[0] || 'múltiples áreas'} y potencial para ${topRole}`,
    employabilityIndex
  }
}

// ========== API HANDLERS ==========

// POST: Iniciar procesamiento del assessment
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate payload size (max 500KB)
    if (!validatePayloadSize(body, 500)) {
      return Response.json({ error: 'Payload demasiado grande' }, { status: 413 })
    }
    
    const { 
      email, 
      name, 
      country, 
      cv_text, 
      cv_file_url,
      intake_answers,
      utm_source,
      utm_campaign,
      utm_medium
    } = body

    // Validate email
    if (!email || !isValidEmail(email)) {
      return Response.json({ error: 'Email inválido' }, { status: 400 })
    }
    
    // Rate limiting: max 3 assessments per email per hour
    const rateLimit = checkRateLimit(`assessment:${email}`, 3, 3600000)
    if (!rateLimit.allowed) {
      return Response.json({ 
        error: 'Has enviado demasiadas solicitudes. Intenta de nuevo más tarde.',
        retryAfter: Math.ceil(rateLimit.resetMs / 1000)
      }, { status: 429 })
    }
    
    // Validate and sanitize inputs
    const validatedCountry = isValidCountry(country) ? country : 'ES'
    const validatedCvText = validateCvText(cv_text)
    const validatedIntake = validateIntakeAnswers(intake_answers)
    const validatedName = name ? sanitizeForPrompt(name.slice(0, 100)) : null

    // 1. Create or find user
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          name: validatedName,
          country: validatedCountry
        })
        .select()
        .single()
      
      if (createError) {
        if (process.env.NODE_ENV !== 'production') console.error('Error creating user:', createError)
        return Response.json({ error: 'Error creando usuario' }, { status: 500 })
      }
      user = newUser
    }

    // 2. Create profile with intake data
    const { data: profile, error: profileError } = await supabase
      .from('carrera_profiles')
      .insert({
        user_id: user.id,
        cv_text: validatedCvText || null,
        intake_answers: { ...validatedIntake, name: validatedName }
      })
      .select()
      .single()

    if (profileError) {
      if (process.env.NODE_ENV !== 'production') console.error('Error creating profile:', profileError)
      return Response.json({ error: 'Error guardando perfil' }, { status: 500 })
    }

    // 3. Create assessment job with expiration (10 min timeout for processing)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min
    const { data: job, error: jobError } = await supabase
      .from('assessment_jobs')
      .insert({
        user_id: user.id,
        profile_id: profile.id,
        status: 'pending',
        expires_at: expiresAt
      })
      .select()
      .single()

    if (jobError) {
      if (process.env.NODE_ENV !== 'production') console.error('Error creating job:', jobError)
      return Response.json({ error: 'Error creando job' }, { status: 500 })
    }

    // 4. Run analysis INLINE (fire and forget)
    // No await - returns immediately, analysis runs in background
    runAnalysisInline(
      user.id, 
      profile.id, 
      job.id, 
      validatedCvText, 
      { ...validatedIntake, name: validatedName }, 
      validatedCountry
    ).catch(err => {
      if (process.env.NODE_ENV !== 'production') console.error('Background analysis error:', err)
    })

    return Response.json({ 
      userId: user.id,
      jobId: job.id,
      status: 'processing'
    })

  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('Process assessment error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// GET: Check status of processing
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const jobId = searchParams.get('jobId')

  if (!userId && !jobId) {
    return Response.json({ error: 'userId o jobId requerido' }, { status: 400 })
  }

  try {
    let query = supabase.from('assessment_jobs').select('*')
    
    if (jobId) {
      query = query.eq('id', jobId)
    } else {
      query = query.eq('user_id', userId).order('created_at', { ascending: false }).limit(1)
    }

    const { data: job, error } = await query.single()

    if (error || !job) {
      return Response.json({ status: 'not_found' }, { status: 404 })
    }

    // Check for timeout: if job is pending/processing and expires_at has passed
    if ((job.status === 'pending' || job.status === 'processing') && job.expires_at) {
      const expiresAt = new Date(job.expires_at).getTime()
      if (Date.now() > expiresAt) {
        // Mark job as timed out
        await supabase.from('assessment_jobs').update({
          status: 'error',
          error_message: 'Processing timeout - please try again'
        }).eq('id', job.id)
        
        return Response.json({
          status: 'error',
          error: 'timeout',
          message: 'El análisis tardó demasiado. Por favor, inténtalo de nuevo.'
        })
      }
    }

    return Response.json({
      status: job.status,
      skillsCount: job.skills_count || 0,
      rolesMatched: job.roles_matched || 0,
      completedAt: job.completed_at,
      expiresAt: job.expires_at
    })

  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('Status check error:', err)
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
