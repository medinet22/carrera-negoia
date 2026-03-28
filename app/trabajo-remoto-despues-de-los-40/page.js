import Link from 'next/link'

export const metadata = {
  title: 'Trabajo Remoto Después de los 40: Guía Sin Humo | 2026',
  description: 'Cómo conseguir trabajo remoto si tienes más de 40. Sin cursos milagro, sin "aprende a programar en 3 meses". Lo que realmente funciona.',
  keywords: 'trabajo remoto mayores 40, teletrabajo +40, empleo remoto 50 años, trabajo online senior, transición remoto',
  openGraph: {
    title: 'Trabajo Remoto Después de los 40: Guía Sin Humo',
    description: 'Guía realista para conseguir trabajo remoto cuando ya tienes experiencia. Lo que funciona y lo que no.',
    url: 'https://carrera.negoia.com/trabajo-remoto-despues-de-los-40',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/trabajo-remoto-despues-de-los-40',
  },
}

export default function TrabajoRemotoDespuesDeLos40() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Trabajo Remoto Después de los 40: Guía Sin Humo',
    datePublished: '2026-03-28',
    dateModified: '2026-03-28',
    author: { '@type': 'Organization', name: 'carrera.negoia.com' },
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Me discriminarán por mi edad en trabajos remotos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En remoto importa menos la edad que en presencial. No te ven llegar cada mañana. Lo que ven es tu trabajo. Pero sí: evita poner fecha de nacimiento en el CV y moderniza tu LinkedIn (foto profesional actual, no de hace 15 años).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Necesito saber programar para trabajar remoto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Hay miles de trabajos remotos que no requieren código: gestión de proyectos, atención al cliente, ventas, contabilidad, recursos humanos, marketing, redacción. La tecnología es una herramienta, no el trabajo en sí.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto puedo ganar trabajando remoto desde España?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende del rol y si trabajas para empresas locales o internacionales. Para empresas españolas: similar al presencial. Para empresas extranjeras (UK, Alemania, USA): 20-50% más es habitual. El arbitraje geográfico funciona en ambas direcciones.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <article className="article-page">
        <div className="article-header">
          <span className="article-category">Transición Profesional</span>
          <h1>Trabajo Remoto Después de los 40: Guía Sin Humo</h1>
          <p className="article-meta">
            Lo que realmente funciona (y lo que no) · Actualizado marzo 2026
          </p>
        </div>

        <div className="article-content">
          <p className="lead">
            Tienes 40, 45, 50 años. Quieres trabajar desde casa. Abres LinkedIn 
            y te encuentras con niños de 25 vendiendo cursos de "cómo gané 10K 
            al mes trabajando desde la playa". Cierras LinkedIn.
          </p>

          <p>
            Te entiendo. Yo también cerraría LinkedIn.
          </p>

          <p>
            Pero el trabajo remoto después de los 40 no solo es posible — en 
            muchos casos es <strong>más fácil</strong> que para alguien de 25. 
            No por magia. Por algo que ellos no tienen: experiencia real, red de 
            contactos, y la capacidad de no perder el tiempo en chorradas.
          </p>

          <p>
            Vamos a lo que funciona. Sin cursos milagro, sin "aprende Python en 
            3 meses", sin coaching de vida.
          </p>

          <h2>Por qué los +40 tienen ventaja en remoto (en serio)</h2>

          <p>
            Cuando trabajas remoto, nadie ve si llegas temprano o si tu silla 
            es cara. Lo que ven es:
          </p>

          <ul>
            <li><strong>Resultados.</strong> ¿Entregas lo que prometes?</li>
            <li><strong>Comunicación.</strong> ¿Sabes explicarte por escrito sin dramas?</li>
            <li><strong>Autonomía.</strong> ¿Resuelves problemas sin necesitar que te lleven de la mano?</li>
          </ul>

          <p>
            Adivina quién suele ser mejor en estas tres cosas: alguien con 20 
            años de experiencia laboral o alguien que acaba de salir de la uni.
          </p>

          <p>
            El problema no es tu edad. El problema es que <strong>no sabes 
            venderte</strong> en el formato remoto.
          </p>

          <h2>Los 5 errores que cometen los +40 buscando trabajo remoto</h2>

          <h3>1. Buscar en los mismos sitios que usaban en 2010</h3>
          
          <p>
            InfoJobs está bien para trabajos presenciales locales. Para remoto, 
            no.
          </p>

          <p>Dónde buscar de verdad:</p>
          <ul>
            <li><strong>LinkedIn Jobs</strong> (filtro "remoto")</li>
            <li><strong>Remote OK</strong>, <strong>We Work Remotely</strong>, <strong>FlexJobs</strong></li>
            <li><strong>Empresas específicas:</strong> muchas tienen sección "careers" con puestos remotos que no publican en portales</li>
            <li><strong>Tu red:</strong> el 70% de trabajos se consiguen por contactos. Sí, también los remotos.</li>
          </ul>

          <h3>2. CV de 3 páginas con todo lo que has hecho desde 1998</h3>

          <p>
            Nadie lee más de una página. Nadie.
          </p>

          <p>
            Para remoto: 1 página, últimos 10-15 años, enfocado en resultados 
            medibles. "Gestioné equipo de 8 personas" está bien. "Gestioné 
            equipo de 8 personas, reduciendo rotación de 25% a 8%" está mejor.
          </p>

          <h3>3. Esperar que alguien te enseñe las herramientas</h3>

          <p>
            Slack, Notion, Google Workspace, Zoom, Trello, Asana. No son 
            difíciles. Son diferentes.
          </p>

          <p>
            Antes de la entrevista: créate cuentas gratuitas, trastea un par de 
            horas. No necesitas ser experto. Necesitas no parecer perdido 
            cuando te pregunten "¿usas Slack o prefieres email?".
          </p>

          <h3>4. No tener presencia digital profesional</h3>

          <p>
            Si te buscan en Google y no aparece nada, es raro. Si aparece tu 
            Facebook con fotos de la barbacoa, peor.
          </p>

          <p>
            Mínimo: LinkedIn actualizado con foto profesional <strong>reciente</strong> 
            (no de hace 10 años). El pelo gris está bien. La foto de tu boda no.
          </p>

          <h3>5. Intentar competir con juniors en precio</h3>

          <p>
            Si ofreces lo mismo que alguien de 25 por el mismo precio, 
            contratarán al de 25 porque "tiene más energía" o alguna excusa así.
          </p>

          <p>
            Tu ventaja no es ser barato. Es ser <strong>predecible</strong>. 
            Que no van a tener que explicarte cómo se trabaja en una empresa. 
            Que has visto 50 proyectos salir mal y sabes qué señales vigilar. 
            Que no vas a desaparecer a los 6 meses porque te aburres.
          </p>

          <h2>Los 3 caminos realistas al trabajo remoto +40</h2>

          <h3>Camino 1: Remotizar tu trabajo actual</h3>

          <p>
            El más fácil. Ya tienes el trabajo. Solo falta que sea remoto.
          </p>

          <p>
            Cómo: empieza pidiendo 1-2 días por semana. Demuestra que produces 
            igual o más. Amplía. Muchas empresas que juraban que remoto "no 
            funcionaba" ahora tienen políticas híbridas.
          </p>

          <p>
            Riesgo: cero. Si dicen que no, sigues igual.
          </p>

          <h3>Camino 2: Cambiar a empresa que ya sea remota</h3>

          <p>
            Buscar empresas "remote-first" en tu sector. Existen en casi todos: 
            consultoría, finanzas, marketing, ventas, operaciones, legal.
          </p>

          <p>
            Ventaja: culturas ya adaptadas, no eres tú el raro que trabaja 
            desde casa.
          </p>

          <p>
            Cómo encontrarlas: 
          </p>
          <ul>
            <li>LinkedIn: busca tu puesto + "remote"</li>
            <li>Glassdoor: filtra por remoto + lee reseñas</li>
            <li>Pregunta en tu red: "¿conoces empresas de [tu sector] 100% remotas?"</li>
          </ul>

          <h3>Camino 3: Freelance / consultoría</h3>

          <p>
            El más arriesgado pero también el más flexible.
          </p>

          <p>
            Funciona mejor si: tienes expertise específica que otros necesitan, 
            ya tienes red de contactos, puedes aguantar 3-6 meses de sequía 
            inicial.
          </p>

          <p>
            No funciona si: esperas que clientes te caigan del cielo, no sabes 
            venderte, o necesitas ingresos fijos inmediatos.
          </p>

          <h2>La semana de preparación</h2>

          <p>
            No necesitas meses. Una semana enfocada:
          </p>

          <p><strong>Día 1-2:</strong> LinkedIn. Foto nueva (pide a alguien que 
          te haga una contra fondo neutro, luz natural). Titular claro ("Director 
          de Operaciones | Remoto | 15 años en logística"). About de 3-4 párrafos 
          máximo.</p>

          <p><strong>Día 3:</strong> CV de 1 página. Solo últimos 10-15 años. 
          Cada punto con número: "Aumenté ventas X%", "Reduje costes Y€", 
          "Gestioné Z personas".</p>

          <p><strong>Día 4:</strong> Herramientas. Créate cuentas en Slack, 
          Notion, Trello. 30 minutos cada una trasteando. Suficiente para no 
          parecer perdido.</p>

          <p><strong>Día 5:</strong> Lista de 20 empresas remotas en tu sector. 
          Ve a sus páginas de careers. Guárdalas.</p>

          <p><strong>Día 6-7:</strong> Contacta a 5 personas de tu red que 
          trabajen remoto. Café virtual. Pregunta cómo lo consiguieron.</p>

          <h2>Lo que nadie te dice</h2>

          <p>
            Trabajar remoto no es para todos. Necesitas:
          </p>

          <ul>
            <li><strong>Disciplina:</strong> nadie te va a decir que dejes de ver vídeos de gatitos</li>
            <li><strong>Espacio:</strong> la mesa del salón con los niños gritando no funciona</li>
            <li><strong>Comunicación escrita:</strong> el 80% de tu trabajo será escribir, no hablar</li>
            <li><strong>Tolerancia a la soledad:</strong> no hay cafés con compañeros</li>
          </ul>

          <p>
            Si esto te suena bien, adelante. Si suena a infierno, quizá híbrido 
            (2-3 días en oficina) es mejor opción.
          </p>

          <div className="article-cta">
            <h3>¿No tienes claro qué trabajo remoto encaja contigo?</h3>
            <p>
              Analizamos tus habilidades, experiencia y preferencias para 
              identificar los roles remotos donde tienes más opciones reales.
            </p>
            <Link 
              href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=trabajo_remoto_40&utm_content=cta_principal"
              className="cta-button"
            >
              Ver mi análisis de carrera →
            </Link>
          </div>

          <h2>Preguntas frecuentes</h2>

          <div className="faq-section">
            <h3>¿Me discriminarán por mi edad?</h3>
            <p>
              En remoto importa menos la edad que en presencial. No te ven 
              llegar cada mañana. Lo que ven es tu trabajo. Pero sí: evita poner 
              fecha de nacimiento en el CV y moderniza tu LinkedIn (foto actual, 
              no de hace 15 años).
            </p>

            <h3>¿Necesito saber programar?</h3>
            <p>
              No. Hay miles de trabajos remotos que no requieren código: gestión 
              de proyectos, atención al cliente, ventas, contabilidad, RRHH, 
              marketing, redacción. La tecnología es herramienta, no el trabajo.
            </p>

            <h3>¿Cuánto puedo ganar?</h3>
            <p>
              Empresas españolas: similar al presencial. Empresas extranjeras 
              (UK, Alemania, USA): 20-50% más es habitual. El arbitraje 
              geográfico funciona en ambas direcciones.
            </p>
          </div>

          <div className="article-cta secondary">
            <h3>¿Quieres saber qué habilidades tienes que otros pagarían?</h3>
            <p>
              La encuesta toma 5 minutos. Te decimos qué roles remotos encajan 
              con lo que ya sabes hacer.
            </p>
            <Link 
              href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=trabajo_remoto_40&utm_content=cta_encuesta"
              className="cta-button secondary"
            >
              Hacer la encuesta gratis →
            </Link>
          </div>

        </div>

        <footer className="article-footer">
          <p>
            <Link href="/">← Volver al inicio</Link>
          </p>
        </footer>
      </article>
    </>
  )
}
