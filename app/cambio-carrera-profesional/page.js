import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'Cambio de Carrera Profesional a los 30, 40 o 50 años | Guía Completa',
  description: 'Guía completa para cambiar de carrera profesional a cualquier edad. Aprende a identificar roles compatibles, habilidades transferibles y cómo hacer la transición sin empezar de cero.',
  keywords: 'cambio de carrera, reinvención profesional, transición laboral, cambiar de trabajo a los 40, nueva carrera, habilidades transferibles',
  openGraph: {
    title: 'Cambio de Carrera Profesional | Guía Completa para Cualquier Edad',
    description: 'Todo lo que necesitas saber para cambiar de carrera sin empezar de cero. Habilidades transferibles, roles compatibles y estrategias probadas.',
    url: 'https://carrera.negoia.com/cambio-carrera-profesional',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/cambio-carrera-profesional',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Es tarde para cambiar de carrera después de los 40?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A los 40 todavía te quedan más de 20 años de carrera. La clave es enfocar la transición en habilidades transferibles y un rol puente con demanda real.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Tengo que empezar de cero para cambiar de carrera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Un cambio exitoso se apoya en traducir tu experiencia previa al nuevo contexto. Mantienes habilidades de comunicación, gestión, análisis y ejecución.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tarda un cambio de carrera bien ejecutado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Normalmente entre 3 y 6 meses para pasar de claridad a entrevistas reales, dependiendo de los gaps técnicos y de la activación de red.'
      }
    }
  ]
}

export default function CambioCarreraProfesional() {
  return (
    <article className="article-page">
      <Script
        id="faq-schema-cambio-carrera"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>Cambio de Carrera Profesional</span>
        </nav>

        <header className="article-header">
          <h1>Cambio de Carrera Profesional: Cómo Reinventarte a los 30, 40 o 50 años</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 12 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>La Realidad</h2>
            <p>
              El 78% de los cambios de carrera exitosos se basan en habilidades transferibles, no en experiencia directa 
              en el nuevo campo. No necesitas &quot;empezar de cero&quot; — necesitas traducir lo que ya sabes al nuevo contexto.
            </p>
          </section>

          <p>
            Si estás leyendo esto, probablemente llevas tiempo pensando en cambiar de carrera pero no sabes por dónde 
            empezar. Quizás sientes que es &quot;demasiado tarde&quot;, que has invertido demasiado en tu carrera actual, o 
            simplemente no ves qué otras opciones tienes. Esta guía te va a dar claridad.
          </p>

          <h2>¿Cuándo tiene sentido cambiar de carrera?</h2>
          
          <p>El cambio de carrera tiene sentido cuando:</p>
          <ul>
            <li><strong>El burnout es crónico:</strong> No es un mal mes, es un mal año (o más)</li>
            <li><strong>Tus valores han cambiado:</strong> Lo que te motivaba antes ya no te importa</li>
            <li><strong>Tu industria está en declive:</strong> El mercado se está reduciendo objetivamente</li>
            <li><strong>Has alcanzado un techo:</strong> No hay más crecimiento posible en tu rol actual</li>
            <li><strong>Hay una oportunidad clara:</strong> Un campo emergente donde tus habilidades encajan</li>
          </ul>

          <p>El cambio de carrera NO tiene sentido cuando:</p>
          <ul>
            <li>Es una reacción a un mal jefe (el jefe se puede cambiar más fácil que la carrera)</li>
            <li>Estás huyendo de algo sin ir hacia algo</li>
            <li>No has explorado opciones dentro de tu campo actual</li>
            <li>La motivación principal es &quot;ganar más&quot; sin considerar otros factores</li>
          </ul>

          <h2>El Mito de &quot;Empezar de Cero&quot;</h2>
          
          <p>
            Uno de los mayores miedos al cambiar de carrera es la idea de &quot;empezar de cero&quot;. Pero esto es un mito. 
            Cuando cambias de carrera llevas contigo:
          </p>
          <ul>
            <li>Todas tus habilidades blandas (comunicación, liderazgo, resolución de problemas)</li>
            <li>Tu conocimiento de cómo funcionan las organizaciones</li>
            <li>Tu red profesional</li>
            <li>Tu capacidad de aprender (que mejora con la experiencia)</li>
            <li>Habilidades técnicas transferibles que no reconoces</li>
          </ul>

          <p>
            <strong>Ejemplo real:</strong> Una directora de marketing de 42 años que pasó a ser Product Manager en tech. 
            ¿Empezó de cero? No. Llevó: gestión de stakeholders, análisis de datos, conocimiento del cliente, 
            presentaciones ejecutivas, gestión de presupuestos, coordinación de equipos. Solo tuvo que aprender 
            metodologías ágiles y herramientas específicas de producto.
          </p>

          {/* CTA intermedio - Análisis Carrera €29 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 100%)', 
            border: '2px solid #22c55e', 
            borderRadius: '12px', 
            padding: '24px', 
            margin: '32px 0',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#166534', fontWeight: '600' }}>
              🎯 ¿Quieres saber exactamente qué roles encajan contigo?
            </p>
            <p style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1e293b' }}>
              Un experto analiza tu trayectoria con IA y te dice: tus habilidades transferibles, 5 roles donde tienes ventaja, y qué gaps cubrir.
            </p>
            <Link 
              href="/analisis-carrera"
              className="btn btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              Análisis de Carrera Personalizado — €29 →
            </Link>
          </div>

          <h2>Habilidades Transferibles: Tu Activo Oculto</h2>
          
          <p>
            Las habilidades transferibles son competencias que aplican a múltiples industrias y roles. 
            Son tu mayor activo en un cambio de carrera.
          </p>

          <h3>Habilidades Universalmente Transferibles</h3>
          <ul>
            <li><strong>Comunicación:</strong> Escrita, oral, presentaciones, negociación</li>
            <li><strong>Gestión de proyectos:</strong> Planificación, seguimiento, entrega a tiempo</li>
            <li><strong>Análisis de datos:</strong> Interpretar números, tomar decisiones basadas en datos</li>
            <li><strong>Gestión de personas:</strong> Liderazgo, motivación, feedback, desarrollo</li>
            <li><strong>Resolución de problemas:</strong> Pensamiento crítico, creatividad, priorización</li>
            <li><strong>Gestión de clientes:</strong> Servicio, retención, upselling, satisfacción</li>
          </ul>

          <h3>Transiciones Comunes y Sus Habilidades Puente</h3>
          
          <div className="transition-card">
            <h4>De Ventas → A Customer Success / Account Management</h4>
            <p>Habilidades que llevas: negociación, conocimiento del cliente, gestión de relaciones, comunicación persuasiva, orientación a resultados</p>
          </div>

          <div className="transition-card">
            <h4>De Finanzas/Contabilidad → A Operaciones / Análisis de Negocio</h4>
            <p>Habilidades que llevas: análisis de datos, atención al detalle, reporting, compliance, pensamiento estructurado</p>
          </div>

          <div className="transition-card">
            <h4>De Educación/Formación → A L&D / HR / Diseño Instruccional</h4>
            <p>Habilidades que llevas: diseño de programas, facilitación, evaluación, comunicación, paciencia, adaptación</p>
          </div>

          <div className="transition-card">
            <h4>De Periodismo/Comunicación → A Content Marketing / UX Writing</h4>
            <p>Habilidades que llevas: escritura, investigación, síntesis, storytelling, deadline management, edición</p>
          </div>

          <div className="transition-card">
            <h4>De Gestión de Proyectos → A Product Management</h4>
            <p>Habilidades que llevas: roadmap, stakeholder management, priorización, métricas, coordinación cross-functional</p>
          </div>

          <h2>El Proceso de Cambio de Carrera</h2>

          <h3>Fase 1: Autoconocimiento (2-4 semanas)</h3>
          <ol>
            <li>Haz un inventario completo de tus habilidades (<Link href="/como-identificar-habilidades">guía aquí</Link>)</li>
            <li>Identifica qué te motiva y qué te drena</li>
            <li>Define tus no-negociables (salario mínimo, ubicación, horario, valores)</li>
            <li>Explora qué te interesa aprender</li>
          </ol>

          <h3>Fase 2: Exploración (4-8 semanas)</h3>
          <ol>
            <li>Investiga roles que te llamen la atención</li>
            <li>Habla con personas que hacen esos roles (informational interviews)</li>
            <li>Compara requisitos de ofertas con tus habilidades actuales</li>
            <li>Identifica gaps realistas a cubrir</li>
            <li>Selecciona 2-3 roles target</li>
          </ol>

          <h3>Fase 3: Preparación (4-12 semanas)</h3>
          <ol>
            <li>Cubre gaps críticos (cursos, certificaciones, proyectos personales)</li>
            <li>Reescribe tu CV orientado al nuevo rol</li>
            <li>Actualiza LinkedIn con nuevo posicionamiento</li>
            <li>Construye narrativa de transición (tu &quot;historia&quot;)</li>
            <li>Activa tu red hacia el nuevo objetivo</li>
          </ol>

          <h3>Fase 4: Búsqueda (4-16 semanas)</h3>
          <ol>
            <li>Aplica estratégicamente (calidad sobre cantidad)</li>
            <li>Usa networking activo (el 80% de trabajos no se publican)</li>
            <li>Practica entrevistas, especialmente la pregunta &quot;¿por qué el cambio?&quot;</li>
            <li>Considera roles puente (un paso intermedio hacia el objetivo final)</li>
          </ol>

          <h2>Cambio de Carrera por Edad</h2>

          <h3>Cambio de Carrera a los 30</h3>
          <p>
            Es el momento ideal. Tienes experiencia suficiente para tener habilidades transferibles, pero suficiente 
            tiempo por delante para crecer en el nuevo campo. Los empleadores ven candidatos de 30 como profesionales 
            formados con potencial de largo plazo.
          </p>
          <p><strong>Consejo específico:</strong> Aprovecha que aún puedes permitirte dar un paso atrás salarial temporal. La inversión se recupera rápido.</p>

          <h3>Cambio de Carrera a los 40</h3>
          <p>
            Tienes 25+ años de carrera por delante. No es tarde, pero necesitas ser más estratégico. Tu ventaja 
            competitiva es la experiencia y madurez profesional. Los roles de liderazgo y consultoría valoran esto.
          </p>
          <p><strong>Consejo específico:</strong> Posiciónate como experto que aporta visión de otra industria, no como junior aprendiendo. El ángulo importa.</p>

          <h3>Cambio de Carrera a los 50</h3>
          <p>
            Es totalmente posible, pero requiere enfoque diferente. Considera: consultoría, emprendimiento, roles 
            de advisory, o transiciones dentro de tu industria pero hacia roles diferentes (de operaciones a formación, 
            de ejecución a estrategia).
          </p>
          <p><strong>Consejo específico:</strong> Tu red es tu mayor activo. La mayoría de cambios exitosos a esta edad vienen por conexiones, no por aplicaciones frías.</p>

          <h2>Errores Comunes en el Cambio de Carrera</h2>
          
          <ol>
            <li><strong>Cambiar sin investigar:</strong> Idealizar el nuevo campo sin hablar con gente que está ahí</li>
            <li><strong>Querer cambiar todo a la vez:</strong> A veces un cambio de industria O de función es suficiente</li>
            <li><strong>No invertir en upskilling:</strong> Esperar que te contraten solo por potencial</li>
            <li><strong>CV genérico:</strong> Usar el mismo CV para todos los roles</li>
            <li><strong>Ocultar la transición:</strong> Intentar parecer que siempre quisiste hacer esto (se nota)</li>
            <li><strong>Desesperación:</strong> Aceptar cualquier cosa en el nuevo campo sin evaluar fit</li>
          </ol>

          <h2>Cómo Explicar tu Cambio de Carrera</h2>
          
          <p>
            La pregunta &quot;¿por qué quieres cambiar?&quot; viene siempre. Tu respuesta debe tener tres componentes:
          </p>
          
          <ol>
            <li><strong>El pull (qué te atrae del nuevo campo):</strong> &quot;Me apasiona X porque...&quot;</li>
            <li><strong>La conexión (qué llevas de tu experiencia):</strong> &quot;Mi experiencia en Y me ha dado habilidades directamente aplicables...&quot;</li>
            <li><strong>La preparación (qué has hecho para prepararte):</strong> &quot;He invertido en Z para asegurarme de estar listo...&quot;</li>
          </ol>

          <p><strong>Ejemplo:</strong></p>
          <blockquote>
            &quot;Después de 8 años en finanzas, me di cuenta de que lo que más me motivaba era el análisis de problemas 
            de negocio, no los números en sí. Product Management me permite usar esas habilidades analíticas pero 
            enfocado en crear soluciones para usuarios reales. He completado un certificado en producto, contribuido 
            a un proyecto open source, y hecho shadowing con PMs de mi red para entender el día a día.&quot;
          </blockquote>

          <h2>Plan de 72 horas para destrabar tu cambio de carrera</h2>

          <p>
            Si llevas meses bloqueado, no necesitas más teoría: necesitas una secuencia corta que te dé claridad.
            Aquí tienes un sprint de 72 horas para pasar de la duda a un plan accionable.
          </p>

          <ol>
            <li><strong>Día 1 (60-90 min):</strong> Lista 20 tareas que has hecho bien en los últimos 3 años y etiqueta cada una por nivel de energía (alta/media/baja).</li>
            <li><strong>Día 2 (45 min):</strong> Elige 3 roles objetivo y compáralos contra tus tareas de energía alta para detectar encaje real.</li>
            <li><strong>Día 3 (45 min):</strong> Redacta una narrativa de transición en 6 líneas y compártela con 2 contactos para feedback.</li>
          </ol>

          <p>
            Con esto tendrás un mapa inicial de habilidades + dirección concreta. Evita seguir consumiendo contenido sin ejecutar.
          </p>

          <h2>Recursos para el Cambio de Carrera</h2>
          
          <ul>
            <li><strong>Para identificar habilidades:</strong> <Link href="/como-identificar-habilidades">Nuestra guía de identificación de habilidades</Link></li>
            <li><strong>Para mapear habilidades a roles:</strong> <Link href="/">Carrera NegoIA (gratis)</Link></li>
            <li><strong>Para networking:</strong> LinkedIn (obvio pero subutilizado)</li>
            <li><strong>Para informational interviews:</strong> Lunchclub, ADPList</li>
            <li><strong>Para upskilling:</strong> Coursera, Udemy, certificaciones específicas del campo</li>
          </ul>

          <div className="cta-box">
            <h3>¿Listo para explorar tu siguiente carrera?</h3>
            <p>Descubre qué roles encajan con tus habilidades actuales. Sin tests genéricos, basado en tu experiencia real.</p>
            <Link href="/?utm_source=seo&utm_medium=blog&utm_campaign=cta_cambio_carrera_72h_b" className="btn btn-primary">Quiero descubrir mis habilidades en 15 minutos →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
