import Link from 'next/link'

export const metadata = {
  title: 'Las Mejores Herramientas de IA para Buscar Trabajo en 2026',
  description: 'Las mejores herramientas de inteligencia artificial para buscar trabajo en 2026. Optimiza tu CV, prepara entrevistas y encuentra oportunidades con IA.',
  keywords: 'herramientas IA buscar trabajo, IA para encontrar empleo, inteligencia artificial búsqueda trabajo, apps IA carrera profesional',
  openGraph: {
    title: 'Las Mejores Herramientas de IA para Buscar Trabajo en 2026',
    description: 'Herramientas de IA que te ayudan a encontrar trabajo más rápido y con más éxito.',
    url: 'https://carrera.negoia.com/herramientas-ia-buscar-trabajo',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/herramientas-ia-buscar-trabajo',
  },
}

export default function HerramientasIABuscarTrabajo() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Las Mejores Herramientas de IA para Buscar Trabajo en 2026",
    "datePublished": "2026-03-10",
    "dateModified": "2026-03-10",
    "author": { "@type": "Organization", "name": "carrera.negoia.com" }
  }

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>Herramientas IA para Buscar Trabajo</span>
        </nav>

        <header className="article-header">
          <h1>Las Mejores Herramientas de IA para Buscar Trabajo en 2026</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 10 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>La IA ha cambiado la búsqueda de empleo</h2>
            <p>
              La búsqueda de empleo en 2026 ya no es lo que era. Las herramientas de inteligencia artificial
              permiten optimizar el CV para pasar filtros ATS, preparar entrevistas con práctica real, identificar
              oportunidades personalizadas, y analizar tu perfil para descubrir a qué roles puedes optar.
            </p>
            <p>
              El problema: hay demasiadas herramientas y no todas son igual de útiles. Esta guía se centra
              en las que <strong>realmente marcan la diferencia</strong> en el proceso de búsqueda.
            </p>
          </section>

          <h2>Herramientas de IA para optimizar el CV</h2>

          <h3>Jobscan</h3>
          <p>
            Analiza tu CV contra una oferta de trabajo específica y te dice qué porcentaje de match tienes,
            qué palabras clave te faltan y cómo mejorar tu puntuación ATS. Muy útil para adaptar el CV a
            cada oferta sin hacerlo manualmente.
          </p>
          <p><strong>Precio:</strong> Freemium (5 análisis gratis/mes). <strong>Útil para:</strong> cualquier búsqueda activa.</p>

          <h3>Resume.io / Kickresume</h3>
          <p>
            Herramientas con IA para crear y formatear el CV. Tienen plantillas optimizadas para ATS y
            sugieren mejoras en el contenido. Útil si necesitas reformatear tu CV rápidamente.
          </p>

          <h3>ChatGPT / Claude para CV</h3>
          <p>
            Puedes usarlos directamente para mejorar la redacción de tu CV. Técnica efectiva: pega la oferta
            de trabajo y tu experiencia, y pide que identifique cómo conectar los dos mejor. Los resultados
            son buenos si sabes qué pedir.
          </p>

          <h2>Herramientas de IA para preparar entrevistas</h2>

          <h3>Interview Warmup (Google)</h3>
          <p>
            Herramienta gratuita de Google que te hace preguntas de entrevista por voz y analiza tus
            respuestas con IA: detecta muletillas, palabras clave que usas, y te da feedback. Gratis y
            muy efectiva para perder el miedo a las entrevistas.
          </p>

          <h3>Yoodli</h3>
          <p>
            Coach de comunicación con IA. Analiza tus respuestas en entrevistas simuladas: velocidad,
            claridad, uso de palabras de relleno, contacto visual (en videollamada). Muy útil si tienes
            ansiedad ante las entrevistas.
          </p>

          <h3>ChatGPT como entrevistador simulado</h3>
          <p>
            Prompt efectivo: "Eres el director de contratación de [empresa]. El rol es [X]. Hazme una
            entrevista de 10 preguntas para ese puesto y evalúa mis respuestas." Simple, gratuito y sorprendentemente efectivo.
          </p>

          <h2>Herramientas de IA para encontrar ofertas de trabajo</h2>

          <h3>LinkedIn con IA</h3>
          <p>
            LinkedIn ha integrado IA en su buscador de empleo: sugiere ofertas basadas en tu perfil, indica
            tu porcentaje de match con cada oferta, y te dice cuánto te diferencias de otros candidatos.
            Si no tienes el perfil actualizado, estas funciones son inútiles: empieza por ahí.
          </p>

          <h3>Otta / Wellfound</h3>
          <p>
            Plataformas especializadas en startups y empresas tech que usan IA para matchear perfiles con
            ofertas. Menos volumen que InfoJobs pero más calidad si buscas en empresas innovadoras.
          </p>

          <h2>Herramientas de IA para análisis de carrera</h2>

          <h3>carrera.negoia.com</h3>
          <p>
            Herramienta española diseñada específicamente para el mercado laboral local. Analiza tu
            trayectoria profesional y genera un mapa completo de tus habilidades: cuáles tienes, a qué
            nivel, y qué roles del mercado español las valoran más.
          </p>
          <p>
            A diferencia de los tests genéricos de personalidad, el análisis se basa en tu experiencia real.
            Gratis para los primeros 100 usuarios.
          </p>

          <h2>Cómo usar la IA de forma ética en la búsqueda de empleo</h2>
          <p>
            La IA es una herramienta de amplificación, no de sustitución. Algunas pautas:
          </p>
          <ul>
            <li><strong>No uses IA para escribir cartas de presentación sin revisarlas:</strong> Los reclutadores detectan el texto genérico de IA</li>
            <li><strong>No inventes logros:</strong> La IA puede ayudarte a formularlos mejor, no a inventarlos</li>
            <li><strong>Personaliza siempre:</strong> Un CV 100% generado por IA sin personalización es contraproducente</li>
            <li><strong>La IA prepara, tú ejecutas:</strong> En la entrevista tienes que ser tú, no el texto que te generó la IA</li>
          </ul>

          <h2>La herramienta más importante: conocerte a ti mismo</h2>
          <p>
            Antes de usar cualquier herramienta de IA para la búsqueda de empleo, necesitas tener claro
            qué ofreces. Las herramientas de IA amplifican lo que ya tienes: si no sabes para qué eres
            bueno, la IA no puede ayudarte a venderte.
          </p>

          <div className="cta-box">
            <h3>Empieza por lo más importante: descubre tus habilidades reales</h3>
            <p>Antes de optimizar el CV o preparar entrevistas, necesitas saber qué tienes. Análisis con IA gratis en 15 minutos.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Analizar mi perfil profesional con IA →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
