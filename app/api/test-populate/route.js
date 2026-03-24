import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

/**
 * POST /api/test-populate
 * 
 * Inserta datos de prueba hardcodeados en Supabase para testing de UX.
 * NO llama a ninguna API de IA - solo inserta datos simulados de alta calidad.
 * 
 * Perfiles disponibles:
 * - carlos: Carlos Rodríguez, PM IT senior, 35 años
 * - adrian: Adrián Morales, ex-founder SaaS, 29 años
 */
export async function POST(request) {
  try {
    const { profile = 'carlos', clean = false } = await request.json()
    
    // Opcional: limpiar datos existentes del perfil de test
    if (clean) {
      const testEmails = ['carlos.test@negoia.com', 'adrian.test@negoia.com']
      for (const email of testEmails) {
        const { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single()
        
        if (user) {
          await supabase.from('documents').delete().eq('user_id', user.id)
          await supabase.from('role_matches').delete().eq('user_id', user.id)
          await supabase.from('skills_maps').delete().eq('user_id', user.id)
          await supabase.from('orders').delete().eq('user_id', user.id)
          await supabase.from('assessment_jobs').delete().eq('user_id', user.id)
          await supabase.from('carrera_profiles').delete().eq('user_id', user.id)
          await supabase.from('users').delete().eq('id', user.id)
        }
      }
      
      if (clean === 'only') {
        return Response.json({ status: 'cleaned', message: 'Test data removed' })
      }
    }
    
    const testData = profile === 'adrian' ? getAdrianData() : getCarlosData()
    
    // 1. Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert({
        email: testData.user.email,
        name: testData.user.name,
        country: testData.user.country,
        created_at: new Date().toISOString()
      }, { onConflict: 'email' })
      .select()
      .single()
    
    if (userError) throw userError
    
    // 2. Create profile
    const { data: carreraProfile } = await supabase
      .from('carrera_profiles')
      .insert({
        user_id: user.id,
        cv_raw_text: testData.profile.cv_raw_text,
        intake_answers: testData.profile.intake_answers,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    // 3. Create skills_map
    const { data: skillsMap } = await supabase
      .from('skills_maps')
      .insert({
        user_id: user.id,
        profile_id: carreraProfile?.id,
        hard_skills: testData.skillsMap.hard_skills,
        soft_skills: testData.skillsMap.soft_skills,
        domain_knowledge: testData.skillsMap.domain_knowledge,
        superpower: testData.skillsMap.superpower,
        narrative_text: testData.skillsMap.narrative_text,
        radar_data: testData.skillsMap.radar_data,
        summary_one_liner: testData.skillsMap.summary_one_liner,
        employability_index: testData.skillsMap.employability_index,
        what_others_see: testData.skillsMap.what_others_see,
        fear_addressed: testData.skillsMap.fear_addressed,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    // 4. Create role_matches
    for (const match of testData.roleMatches) {
      await supabase.from('role_matches').insert({
        user_id: user.id,
        profile_id: carreraProfile?.id,
        role_id: match.role_id,
        match_percentage: match.match_percentage,
        match_type: match.match_type,
        why_you_fit: match.why_you_fit,
        why_now: match.why_now,
        gaps: match.gaps,
        strengths: match.strengths,
        quick_wins: match.quick_wins,
        user_status: match.user_status || null,
        created_at: new Date().toISOString()
      })
    }
    
    // 5. Create order (paid, complete plan)
    const { data: order } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        plan: 'complete',
        status: 'paid',
        amount: 3900,
        currency: 'eur',
        stripe_session_id: `test_session_${profile}_${Date.now()}`,
        created_at: new Date().toISOString(),
        paid_at: new Date().toISOString()
      })
      .select()
      .single()
    
    // 6. Create sample documents
    for (const doc of testData.documents) {
      await supabase.from('documents').insert({
        user_id: user.id,
        order_id: order.id,
        doc_type: doc.doc_type,
        role_id: doc.role_id || null,
        content: doc.content,
        content_text: doc.content_text,
        created_at: new Date().toISOString()
      })
    }
    
    // 7. Create completed assessment job
    await supabase.from('assessment_jobs').insert({
      user_id: user.id,
      profile_id: carreraProfile?.id,
      status: 'done',
      skills_count: testData.skillsMap.hard_skills.length + testData.skillsMap.soft_skills.length,
      roles_matched: testData.roleMatches.length,
      started_at: new Date(Date.now() - 60000).toISOString(),
      completed_at: new Date().toISOString()
    })
    
    return Response.json({
      status: 'populated',
      profile,
      userId: user.id,
      email: user.email,
      skillsCount: testData.skillsMap.hard_skills.length + testData.skillsMap.soft_skills.length,
      rolesMatched: testData.roleMatches.length,
      documentsGenerated: testData.documents.length
    })
    
  } catch (err) {
    console.error('Test populate error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

// ========== CARLOS RODRÍGUEZ — PM IT Senior ==========
function getCarlosData() {
  return {
    user: {
      email: 'carlos.test@negoia.com',
      name: 'Carlos Rodríguez',
      country: 'ES'
    },
    profile: {
      cv_raw_text: `CARLOS RODRÍGUEZ
Madrid, España | carlos.rodriguez@email.com | +34 612 345 678

RESUMEN
Project Manager IT con 7 años de experiencia en sector financiero (banca y seguros). 
Especializado en transformación digital y gestión de equipos multidisciplinares.
Capacidad demostrada para rescatar proyectos bloqueados y entregar en plazo.

EXPERIENCIA PROFESIONAL

Responsable de Proyectos IT | Banco Santander | 2020-Presente
• Lideré programa de transformación digital con presupuesto de €800K y equipo de 12 personas
• Reduje retrasos en entregas un 30% implementando metodología híbrida Agile-Waterfall
• Rescaté proyecto bloqueado 2 años: reorganicé equipo, renegocié alcance, entregué en 6 meses
• Conseguí renovación contrato proveedor crítico por €600K gracias a relación de confianza

Project Manager | Seguros Mapfre | 2017-2020
• Gestioné cartera de 8 proyectos simultáneos con equipos de 4-15 personas
• Implementé primer CRM cloud del departamento, aumentando productividad 25%
• Formé a 40 usuarios internos en nuevas herramientas digitales

EDUCACIÓN
Ingeniería Informática | Universidad Politécnica de Madrid | 2012-2016
PMP Certification | PMI | 2019
Scrum Master Certified | Scrum Alliance | 2018`,
      intake_answers: {
        current_situation: 'Empleado a tiempo completo, buscando cambio',
        years_experience: '5-10 años',
        education_level: 'Grado universitario',
        main_frustration: 'Estoy quemado y siento que no avanzo profesionalmente',
        dream_job: 'Un rol donde pueda usar mis habilidades técnicas y de gestión en algo más innovador',
        skills_confident: ['Gestión de proyectos', 'Comunicación con stakeholders', 'Resolución de problemas'],
        skills_improve: ['Product Management', 'Data Analysis', 'Inglés business'],
        work_preference: 'Híbrido (2-3 días oficina)',
        salary_expectation: '€60K-80K'
      }
    },
    skillsMap: {
      hard_skills: [
        { name: 'Gestión de Proyectos', level: 5, evidence: 'PMP certificado, 7 años de experiencia, proyectos hasta €800K' },
        { name: 'Metodologías Agile', level: 4, evidence: 'Scrum Master certificado, implementación híbrida exitosa' },
        { name: 'Transformación Digital', level: 4, evidence: 'Lideró programa de transformación en Santander' },
        { name: 'Gestión de Stakeholders', level: 5, evidence: 'Renovación contrato €600K por relación de confianza' },
        { name: 'Presupuestos y P&L', level: 4, evidence: 'Gestión de presupuestos hasta €800K' },
        { name: 'Herramientas PM (Jira, MS Project)', level: 4, evidence: 'Uso diario en entornos enterprise' }
      ],
      soft_skills: [
        { name: 'Comunicación', level: 5, evidence: 'Traducción técnico-negocio reconocida por compañeros' },
        { name: 'Gestión de Crisis', level: 5, evidence: 'Rescate de proyecto bloqueado 2 años' },
        { name: 'Liderazgo de Equipos', level: 4, evidence: 'Equipos de hasta 12 personas' },
        { name: 'Negociación', level: 4, evidence: 'Renovación contratos, renegociación de alcances' }
      ],
      domain_knowledge: [
        { area: 'Sector Financiero', depth: 'Experto', years: 7 },
        { area: 'Banca', depth: 'Avanzado', years: 4 },
        { area: 'Seguros', depth: 'Intermedio', years: 3 }
      ],
      superpower: {
        name: 'Traductor Técnico-Negocio',
        description: 'Capacidad excepcional para comunicar conceptos técnicos complejos a stakeholders no técnicos y viceversa. Esta habilidad, combinada con experiencia en crisis, te convierte en el "bombero" que todos quieren en proyectos críticos.',
        rare_combination: ['Comunicación técnica', 'Gestión de crisis', 'Sector financiero']
      },
      narrative_text: `Carlos, eres mucho más que un PM "quemado". Tu perfil revela un **superpoder que no ves**: eres un "Traductor Técnico-Negocio" con capacidad de rescate.

**Lo que has demostrado sin darte cuenta:**
- Rescataste un proyecto que llevaba 2 AÑOS bloqueado — eso no lo hace cualquiera
- Conseguiste una renovación de €600K por "confianza" — eso es venta consultiva encubierta
- Redujiste retrasos 30% cambiando metodología — eso es pensamiento estratégico

**El patrón que emerge:**
No eres un gestor de tareas. Eres alguien que DESBLOQUEA situaciones imposibles. Las empresas pagan premium por esta habilidad.

**Por qué te sientes quemado:**
Probablemente estás en un rol que infrautiliza tu capacidad de impacto. Necesitas un rol donde "apagar fuegos" sea la descripción del trabajo, no una emergencia.`,
      radar_data: {
        labels: ['Gestión', 'Técnico', 'Comunicación', 'Liderazgo', 'Estrategia', 'Sector'],
        values: [95, 70, 90, 80, 75, 85]
      },
      summary_one_liner: 'PM-firefighter: rescata proyectos imposibles y traduce entre mundos técnico y negocio',
      employability_index: 82,
      what_others_see: 'El que siempre sabe cómo explicar las cosas. El que llaman cuando el proyecto se complica. El que consigue que la gente se entienda.',
      fear_addressed: 'Sientes que "solo" eres PM, pero tu combinación de crisis + comunicación + finanzas es rara. El 90% de PMs no tienen esto.'
    },
    roleMatches: [
      {
        role_id: 'sol-001',
        match_percentage: 85,
        match_type: 'stretch',
        why_you_fit: 'Ya haces el 80% de este rol sin el título. Traduces técnico-negocio, resuelves problemas complejos de clientes enterprise, y gestionas stakeholders. La diferencia es que Solutions Engineer lo hace PRE-venta en vez de post-venta.',
        why_now: 'El mercado de Solutions Engineers en España está creciendo 25% anual. Tu experiencia en banca te da acceso a fintechs y vendors de software financiero.',
        gaps: [
          { skill: 'Demos técnicas de producto', priority: 'alta', resource: 'Practica con productos SaaS gratuitos', timeline: '4 semanas' },
          { skill: 'Inglés técnico', priority: 'media', resource: 'Cambria English for Tech', timeline: '8 semanas' }
        ],
        strengths: ['Comunicación técnico-negocio', 'Experiencia enterprise banca', 'Gestión de stakeholders complejos'],
        quick_wins: ['Instala 3 SaaS (Notion, Linear, Figma) y haz demos a amigos', 'Lee 5 case studies de implementaciones', 'Actualiza LinkedIn headline a "PM → Solutions"']
      },
      {
        role_id: 'ops-001',
        match_percentage: 82,
        match_type: 'natural',
        why_you_fit: 'Operations Manager es PM con más scope. Ya gestionas procesos, equipos y presupuestos. La transición es lateral: mismo skill set, diferente etiqueta.',
        why_now: 'Muchas startups en fase de escala (Series A-B) buscan su primer Operations Manager. Tu experiencia enterprise es un plus.',
        gaps: [
          { skill: 'Métricas de operaciones (SLA, throughput)', priority: 'media', resource: 'Curso Operations Management (Coursera)', timeline: '6 semanas' }
        ],
        strengths: ['Gestión de equipos', 'Optimización de procesos', 'Experiencia en entornos regulados'],
        quick_wins: ['Documenta 3 procesos que optimizaste con métricas', 'Lee "The Goal" de Goldratt', 'Conecta con 5 Operations Managers en LinkedIn']
      },
      {
        role_id: 'pm-001',
        match_percentage: 78,
        match_type: 'natural',
        why_you_fit: 'Product Manager es la evolución natural. Ya tienes el 60% de las skills: stakeholder management, priorización, delivery. Te falta el 40%: discovery, métricas de producto, user research.',
        why_now: 'España tiene déficit de PMs con background técnico. Tu perfil de ingeniero + PM es buscado.',
        gaps: [
          { skill: 'Continuous Discovery', priority: 'alta', resource: 'Libro "Continuous Discovery Habits" de Teresa Torres', timeline: '6 semanas' },
          { skill: 'Product Analytics', priority: 'alta', resource: 'Reforge Product Analytics (gratis)', timeline: '4 semanas' },
          { skill: 'Frameworks de priorización', priority: 'media', resource: "Lenny's Newsletter", timeline: '2 semanas' }
        ],
        strengths: ['Background técnico', 'Gestión de stakeholders', 'Delivery track record'],
        quick_wins: ['Haz 3 user interviews esta semana', 'Instala Amplitude/Mixpanel en un proyecto personal', 'Escribe un PRD para un feature que habrías hecho diferente']
      },
      {
        role_id: 'csm-001',
        match_percentage: 75,
        match_type: 'lateral',
        why_you_fit: 'Tu experiencia gestionando clientes enterprise (renovación €600K) es exactamente lo que hace un Customer Success Manager. El fit es alto porque ya tienes la mentalidad de "cuenta como partnership".',
        why_now: 'SaaS B2B enterprise está buscando CSMs con experiencia en cuentas grandes. Tu perfil banca es un diferencial.',
        gaps: [
          { skill: 'Métricas de Customer Success (NRR, churn)', priority: 'alta', resource: 'ChurnZero Academy (gratis)', timeline: '3 semanas' },
          { skill: 'Herramientas CS (Gainsight, Totango)', priority: 'media', resource: 'Certificación Gainsight', timeline: '4 semanas' }
        ],
        strengths: ['Gestión de cuentas enterprise', 'Relaciones de confianza', 'Comunicación ejecutiva'],
        quick_wins: ['Calcula el NRR de tu cartera actual', 'Identifica 3 expansiones que conseguiste', 'Lee "Customer Success" de Nick Mehta']
      },
      {
        role_id: 'revops-001',
        match_percentage: 72,
        match_type: 'stretch',
        why_you_fit: 'Revenue Operations combina procesos + datos + herramientas. Tu mentalidad de optimización de procesos encaja. Es PM aplicado a la máquina de revenue.',
        why_now: 'RevOps es uno de los roles con más crecimiento en 2024-2026. Pocas personas tienen el mix de technical + business que tú tienes.',
        gaps: [
          { skill: 'Salesforce/HubSpot admin', priority: 'alta', resource: 'Trailhead Salesforce Admin', timeline: '8 semanas' },
          { skill: 'SQL básico', priority: 'media', resource: 'SQLZoo', timeline: '3 semanas' }
        ],
        strengths: ['Pensamiento de procesos', 'Gestión de herramientas', 'Visión end-to-end'],
        quick_wins: ['Haz el módulo intro de Trailhead', 'Mapea el funnel de ventas de tu empresa actual', 'Conecta con 5 RevOps en LinkedIn']
      }
    ],
    documents: [
      {
        doc_type: 'cv_generic',
        content: {
          header: {
            name: 'Carlos Rodríguez',
            location: 'Madrid, España',
            email: 'carlos.rodriguez@email.com',
            phone: '+34 612 345 678',
            linkedin: 'linkedin.com/in/carlosrodriguez-pm'
          },
          summary: 'Project Manager IT con 7+ años transformando operaciones en sector financiero. Especializado en rescate de proyectos críticos y traducción técnico-negocio. Track record: -30% retrasos, €800K gestionados, proyecto bloqueado 2 años → entregado en 6 meses.',
          key_achievements: [
            'Rescaté proyecto crítico bloqueado 2 años: reorganización de equipo + renegociación de alcance → entrega en 6 meses',
            'Reduje retrasos de entregas 30% implementando metodología híbrida Agile-Waterfall adaptada a contexto enterprise',
            'Aseguré renovación de contrato €600K mediante gestión proactiva de relación con proveedor estratégico'
          ],
          experience: [
            {
              title: 'Responsable de Proyectos IT',
              company: 'Banco Santander',
              dates: '2020 - Presente',
              bullets: [
                'Lideré programa de transformación digital (€800K, 12 personas) con entrega on-time y on-budget',
                'Implementé framework de reporting que redujo tiempo de status meetings 40%',
                'Actué como punto único de contacto para C-level en proyectos críticos'
              ]
            },
            {
              title: 'Project Manager',
              company: 'Seguros Mapfre',
              dates: '2017 - 2020',
              bullets: [
                'Gestioné portfolio de 8 proyectos simultáneos con equipos de 4-15 personas',
                'Lideré primera implementación CRM cloud del departamento (+25% productividad)',
                'Formé a 40 usuarios internos en adopción de nuevas herramientas digitales'
              ]
            }
          ],
          education: [
            { degree: 'Ingeniería Informática', institution: 'Universidad Politécnica de Madrid', year: '2016' }
          ],
          certifications: ['PMP (PMI)', 'Scrum Master Certified (Scrum Alliance)']
        },
        content_text: 'CARLOS RODRÍGUEZ\nMadrid, España | carlos.rodriguez@email.com | +34 612 345 678\n\nRESUMEN PROFESIONAL\nProject Manager IT con 7+ años transformando operaciones en sector financiero...'
      },
      {
        doc_type: 'linkedin_bullets',
        content: {
          bullets: [
            '🎯 Rescato proyectos que otros dan por perdidos. Mi último "imposible": proyecto bloqueado 2 años → entregado en 6 meses.',
            '🔄 Traduzco entre el mundo técnico y el negocio. Si tu equipo de desarrollo y tus stakeholders no se entienden, soy tu persona.',
            '📊 7 años gestionando lo que importa en banca: €800K de presupuesto, 12 personas, cero excusas.',
            '🤝 Creo relaciones que se convierten en renovaciones. Última: €600K. El secreto: tratar a proveedores como partners.'
          ],
          headlines: [
            'PM IT | Rescato proyectos imposibles en sector financiero',
            'De "está bloqueado" a "está entregado" | Project Manager IT',
            'Traduzco técnico↔negocio | 7 años en transformación digital banca'
          ]
        },
        content_text: '🎯 Rescato proyectos que otros dan por perdidos...'
      },
      {
        doc_type: 'elevator_pitch',
        content: {
          pitch: 'Soy Carlos, Project Manager IT con 7 años en banca. Mi especialidad es rescatar proyectos que otros dan por perdidos — mi último caso fue un proyecto bloqueado 2 años que entregué en 6 meses. Lo que me diferencia es que traduzco entre el mundo técnico y el negocio: hago que equipos de desarrollo y stakeholders de C-level se entiendan. Ahora busco un rol donde esta capacidad de "desbloqueo" sea el core del trabajo, no una emergencia.'
        },
        content_text: 'Soy Carlos, Project Manager IT con 7 años en banca...'
      }
    ]
  }
}

// ========== ADRIÁN MORALES — Ex-Founder SaaS ==========
function getAdrianData() {
  return {
    user: {
      email: 'adrian.test@negoia.com',
      name: 'Adrián Morales',
      country: 'ES'
    },
    profile: {
      cv_raw_text: `ADRIÁN MORALES
Valencia, España | adrian.morales@email.com | +34 623 456 789

RESUMEN
Founder técnico con 3 años de experiencia construyendo y escalando producto digital B2B.
Perfil full-stack: desde ideación hasta growth, pasando por desarrollo no-code y gestión de clientes.

EXPERIENCIA PROFESIONAL

Founder & CEO | TuMenú Digital | 2021-2024
SaaS de menús digitales QR para restaurantes
• Construí producto end-to-end con Bubble y Webflow (€0 inversión inicial)
• Escalé a 180 clientes de pago y €2.800 MRR en peak
• Gestioné todo el ciclo de vida del cliente: onboarding, soporte, expansión
• Implementé campañas de Meta Ads con ROAS 2.1x
• Decisión estratégica de cierre tras evaluar que no había PMF suficiente para escalar

Becario Marketing Digital | Agencia Creativa XYZ | 2020-2021
• Gestión de redes sociales para 5 clientes PYME
• Creación de contenido y community management

EDUCACIÓN
Grado en Administración de Empresas | Universidad de Valencia | 2020
Google Analytics Certified | 2021
HubSpot Inbound Marketing | 2021`,
      intake_answers: {
        current_situation: 'Desempleado/buscando activamente',
        years_experience: '3-5 años',
        education_level: 'Grado universitario',
        main_frustration: 'Me da miedo que me vean como "ex-founder fracasado" y no me tomen en serio',
        dream_job: 'Un rol en una startup donde pueda usar todas mis habilidades sin tener la presión de ser el CEO',
        skills_confident: ['Construir productos', 'Hablar con clientes', 'Experimentar y medir'],
        skills_improve: ['Trabajo en equipo grande', 'Procesos de empresa', 'Inglés'],
        work_preference: 'Remoto 100%',
        salary_expectation: '€35K-45K'
      }
    },
    skillsMap: {
      hard_skills: [
        { name: 'No-Code Development (Bubble, Webflow)', level: 5, evidence: 'Construyó producto completo desde cero' },
        { name: 'Growth Marketing', level: 4, evidence: 'Meta Ads ROAS 2.1x, 180 clientes adquiridos' },
        { name: 'Product Management', level: 4, evidence: 'Ciclo completo: ideación → launch → iteración' },
        { name: 'Customer Success', level: 4, evidence: 'Gestión directa de 180 clientes B2B' },
        { name: 'Analytics (GA, Mixpanel)', level: 3, evidence: 'Google Analytics certified, tracking implementado' },
        { name: 'Automatización (Zapier, Make)', level: 4, evidence: 'Workflows de onboarding automatizados' }
      ],
      soft_skills: [
        { name: 'Autonomía', level: 5, evidence: '3 años como único operador de un negocio' },
        { name: 'Adaptabilidad', level: 5, evidence: 'Múltiples pivots y decisión de cierre estratégico' },
        { name: 'Comunicación con Clientes', level: 4, evidence: '180 relaciones directas gestionadas' },
        { name: 'Toma de Decisiones bajo Incertidumbre', level: 5, evidence: 'Decisión de cierre consciente tras análisis' }
      ],
      domain_knowledge: [
        { area: 'SaaS B2B', depth: 'Avanzado', years: 3 },
        { area: 'Hostelería/Restauración', depth: 'Intermedio', years: 3 },
        { area: 'Marketing Digital', depth: 'Avanzado', years: 4 }
      ],
      superpower: {
        name: 'Full-Stack Operator',
        description: 'Capacidad extremadamente rara de ejecutar todo el stack de un negocio digital: producto, growth, ventas, CS. El 95% de profesionales solo domina 1-2 de estas áreas. Tú las dominas todas a nivel funcional.',
        rare_combination: ['No-code dev', 'Growth marketing', 'Customer success', 'Product thinking']
      },
      narrative_text: `Adrián, tu miedo de que te vean como "ex-founder fracasado" es infundado. Aquí está la realidad:

**Lo que el mercado ve (si lo comunicas bien):**
- 3 años de experiencia COMPRIMIDA que equivale a 5+ años en una empresa
- 180 clientes B2B gestionados DIRECTAMENTE
- Producto construido con €0 que generó €2.800 MRR
- Decisión MADURA de cerrar (no un fracaso, un pivot de carrera)

**Tu superpoder es ser Full-Stack Operator:**
Puedes construir producto, adquirir clientes, y retenerlos. Esto es RARO. La mayoría de empleados solo sabe hacer UNA de estas cosas.

**Por qué las empresas QUIEREN ex-founders:**
- No necesitas supervisión
- Entiendes el coste real de cada decisión
- Puedes hablar con clientes sin miedo
- Sabes priorizar con recursos limitados

**El reframe que necesitas:**
No eres un "ex-founder que busca empleo". Eres un "operador experimentado que elige dónde aplicar sus skills".`,
      radar_data: {
        labels: ['Producto', 'Growth', 'Ventas', 'Ops', 'Técnico', 'Liderazgo'],
        values: [85, 80, 70, 75, 85, 65]
      },
      summary_one_liner: 'Full-stack operator: construye, lanza, y escala productos digitales end-to-end',
      employability_index: 78,
      what_others_see: 'El que sabe de todo un poco y hace que las cosas pasen. El que no espera a que le digan qué hacer.',
      fear_addressed: 'Tu experiencia como founder incluye MÁS responsabilidad y exposición que 5 años en un rol corporativo junior. No es un paso atrás, es un paso lateral con superpoderes.'
    },
    roleMatches: [
      {
        role_id: 'ncd-001',
        match_percentage: 88,
        match_type: 'perfect',
        why_you_fit: 'Este rol ES lo que ya haces. No-Code Developer / Automation Specialist es exactamente construir productos con Bubble/Webflow y automatizar con Zapier/Make. La diferencia es que ahora lo haces para otros.',
        why_now: 'El mercado de no-code está explotando. Las empresas buscan desesperadamente gente que pueda construir MVPs rápido sin depender de developers. Tu portfolio (TuMenú) es tu carta de presentación.',
        gaps: [
          { skill: 'Airtable avanzado', priority: 'media', resource: 'Airtable Universe tutorials', timeline: '2 semanas' }
        ],
        strengths: ['Portfolio real (TuMenú)', 'Experiencia con clientes reales', 'Mentalidad de producto'],
        quick_wins: ['Documenta TuMenú como caso de estudio', 'Ofrece 2 proyectos gratis a cambio de testimonios', 'Publica en Twitter/LinkedIn tu stack no-code'],
        user_status: 'priority'
      },
      {
        role_id: 'gmgr-001',
        match_percentage: 85,
        match_type: 'natural',
        why_you_fit: 'Growth Manager es lo que ya hacías en TuMenú: adquisición, activación, retención. Tu ROAS 2.1x demuestra que sabes optimizar campañas. Tu 180 clientes demuestra que sabes escalar.',
        why_now: 'Startups en fase seed/Series A necesitan growth managers que puedan hacer de todo. Tu perfil full-stack es exactamente lo que buscan.',
        gaps: [
          { skill: 'SQL para análisis', priority: 'media', resource: 'Mode Analytics SQL tutorial', timeline: '4 semanas' },
          { skill: 'Experimentación A/B', priority: 'baja', resource: 'Reforge Growth Series', timeline: '6 semanas' }
        ],
        strengths: ['Experiencia paid ads', 'Mentalidad de experimentación', 'Orientación a métricas'],
        quick_wins: ['Crea un case study de growth de TuMenú con números', 'Haz un thread de Twitter sobre lo que aprendiste', 'Aplica a 3 startups seed-stage'],
        user_status: 'interested'
      },
      {
        role_id: 'csm-001',
        match_percentage: 82,
        match_type: 'natural',
        why_you_fit: 'Customer Success Manager SaaS es lo que ya hacías con tus 180 clientes. Onboarding, soporte, expansión. La diferencia es que ahora tienes un producto más grande detrás.',
        why_now: 'SaaS B2B en España está creciendo y necesita CSMs que entiendan producto. Tu background técnico te diferencia.',
        gaps: [
          { skill: 'Herramientas CS (Intercom, Zendesk)', priority: 'media', resource: 'Intercom Academy', timeline: '2 semanas' }
        ],
        strengths: ['Experiencia directa con clientes', 'Conocimiento de producto', 'Mentalidad de retención'],
        quick_wins: ['Calcula el churn de TuMenú y qué lo causaba', 'Identifica 3 upsells que conseguiste', 'Prepara historias de clientes difíciles que salvaste']
      },
      {
        role_id: 'po-001',
        match_percentage: 78,
        match_type: 'natural',
        why_you_fit: 'Product Owner Junior es una entrada suave a Product Management. Ya tienes la experiencia de construir producto — te falta la experiencia de hacerlo en equipo.',
        why_now: 'Muchas empresas buscan POs con background técnico que puedan hablar con developers. Tu no-code te da esa base.',
        gaps: [
          { skill: 'Trabajo con equipos de desarrollo', priority: 'alta', resource: 'Observa sprints en YouTube', timeline: '2 semanas' },
          { skill: 'Writing de user stories', priority: 'media', resource: 'User Story Mapping (libro)', timeline: '3 semanas' }
        ],
        strengths: ['Visión de producto end-to-end', 'Contacto directo con usuarios', 'Priorización bajo presión'],
        quick_wins: ['Escribe 5 user stories de features de TuMenú', 'Lee "Inspired" de Marty Cagan', 'Aplica a roles "Associate PM" o "PO Junior"']
      },
      {
        role_id: 'cms-001',
        match_percentage: 72,
        match_type: 'lateral',
        why_you_fit: 'Community Manager SaaS combina tu experiencia en comunicación con clientes y marketing. Es un rol donde tu habilidad de conectar con usuarios tiene impacto directo.',
        why_now: 'Las comunidades de producto son cada vez más importantes. Tu experiencia gestionando 180 relaciones es directamente aplicable.',
        gaps: [
          { skill: 'Herramientas de comunidad (Circle, Discord)', priority: 'baja', resource: 'Tutoriales oficiales', timeline: '1 semana' }
        ],
        strengths: ['Comunicación empática', 'Conocimiento de producto', 'Experiencia con feedback de usuarios'],
        quick_wins: ['Únete a 3 comunidades SaaS y observa cómo funcionan', 'Crea contenido sobre tu experiencia founder', 'Conecta con Community Managers en LinkedIn']
      }
    ],
    documents: [
      {
        doc_type: 'cv_generic',
        content: {
          header: {
            name: 'Adrián Morales',
            location: 'Valencia, España (remoto)',
            email: 'adrian.morales@email.com',
            phone: '+34 623 456 789',
            linkedin: 'linkedin.com/in/adrianmorales'
          },
          summary: 'Full-stack operator con 3 años construyendo y escalando producto SaaS B2B. Experiencia end-to-end: desarrollo no-code, growth marketing, y customer success. Track record: 180 clientes, €2.8K MRR, ROAS 2.1x.',
          key_achievements: [
            'Construí producto SaaS completo con €0 inversión usando Bubble + Webflow → 180 clientes de pago',
            'Escalé MRR a €2.800 mediante combinación de paid ads (ROAS 2.1x) y outreach directo',
            'Gestioné ciclo completo de cliente B2B: onboarding, soporte, expansión, retención'
          ],
          experience: [
            {
              title: 'Founder & Product Manager',
              company: 'TuMenú Digital (SaaS B2B)',
              dates: '2021 - 2024',
              bullets: [
                'Diseñé e iteré producto no-code con feedback de +180 usuarios activos',
                'Implementé workflows de automatización que redujeron tiempo de onboarding 60%',
                'Ejecuté estrategia de growth multicanal: SEO, paid social, partnerships'
              ]
            }
          ],
          education: [
            { degree: 'Grado en Administración de Empresas', institution: 'Universidad de Valencia', year: '2020' }
          ],
          certifications: ['Google Analytics Certified', 'HubSpot Inbound Marketing', 'Bubble Certified']
        },
        content_text: 'ADRIÁN MORALES\nValencia, España (remoto) | adrian.morales@email.com\n\nRESUMEN PROFESIONAL\nFull-stack operator con 3 años construyendo y escalando producto SaaS B2B...'
      },
      {
        doc_type: 'cv_specific',
        role_id: 'ncd-001',
        content: {
          header: {
            name: 'Adrián Morales',
            location: 'Valencia, España (remoto)',
            email: 'adrian.morales@email.com',
            phone: '+34 623 456 789',
            linkedin: 'linkedin.com/in/adrianmorales'
          },
          summary: 'No-Code Developer con 3 años de experiencia construyendo productos SaaS reales. Stack: Bubble, Webflow, Zapier, Make, Airtable. Portfolio: TuMenú Digital (180 clientes B2B, €2.8K MRR).',
          key_achievements: [
            'Construí SaaS B2B completo en Bubble sin código tradicional → 180 clientes activos',
            'Automaticé flujos de onboarding con Zapier + Make → 60% menos tiempo manual',
            'Landing pages en Webflow con conversión 8%+ (2x benchmark industria)'
          ],
          experience: [
            {
              title: 'No-Code Developer & Founder',
              company: 'TuMenú Digital',
              dates: '2021 - 2024',
              bullets: [
                'Arquitectura Bubble: base de datos relacional, workflows condicionales, API integrations',
                'Implementación de pagos (Stripe), autenticación, y dashboards de cliente',
                '50+ automatizaciones en Zapier/Make para operaciones y notificaciones'
              ]
            }
          ]
        },
        content_text: 'ADRIÁN MORALES — No-Code Developer\nValencia, España (remoto) | adrian.morales@email.com\n\n...'
      },
      {
        doc_type: 'linkedin_bullets',
        content: {
          bullets: [
            '🛠️ Construyo productos SaaS sin código. Mi último: TuMenú Digital, 180 clientes B2B, €2.8K MRR — todo en Bubble + Webflow.',
            '📈 Growth operator: de 0 a 180 clientes con ROAS 2.1x en Meta Ads y cero inversión inicial.',
            '🤝 180 conversaciones con clientes me enseñaron más que cualquier curso de product management.',
            '💡 Cerré mi startup conscientemente. No fue un fracaso — fue un pivot de carrera con 3 años de aprendizaje comprimido.'
          ],
          headlines: [
            'No-Code Developer | Construyo SaaS sin escribir código',
            'Full-Stack Operator | Producto + Growth + CS en una persona',
            'Ex-founder → tu próximo empleado que no necesita supervisión'
          ]
        },
        content_text: '🛠️ Construyo productos SaaS sin código...'
      },
      {
        doc_type: 'elevator_pitch',
        content: {
          pitch: 'Soy Adrián, y durante 3 años construí y escalé mi propio SaaS de menús digitales: 180 clientes, €2.800 de MRR, todo con Bubble y Webflow. Lo que me diferencia es que puedo hacer de todo: construir el producto, adquirir clientes, y retenerlos. Cerré el negocio conscientemente porque entendí que no tenía PMF para escalar — y ahora busco aplicar todo lo que aprendí en un equipo donde pueda tener impacto sin la presión de ser el CEO.'
        },
        content_text: 'Soy Adrián, y durante 3 años construí y escalé mi propio SaaS...'
      }
    ]
  }
}
