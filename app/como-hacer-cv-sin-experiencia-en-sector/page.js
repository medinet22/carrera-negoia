import Link from 'next/link'

export const metadata = {
  title: 'Cómo Hacer un CV Sin Experiencia en el Nuevo Sector | Guía 2026',
  description: 'Aprende a crear un CV efectivo cuando cambias de sector sin experiencia directa. Estrategias para destacar habilidades transferibles y conseguir entrevistas.',
  keywords: 'cv sin experiencia sector, cv cambio de carrera, curriculum sin experiencia nuevo sector, cv habilidades transferibles',
  openGraph: {
    title: 'Cómo Hacer un CV Sin Experiencia en el Nuevo Sector',
    description: 'Guía práctica para crear un CV efectivo cuando te cambias de sector sin experiencia directa.',
    url: 'https://carrera.negoia.com/como-hacer-cv-sin-experiencia-en-sector',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/como-hacer-cv-sin-experiencia-en-sector',
  },
}

export default function ComoHacerCVSinExperienciaEnSector() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo hacer un CV para cambio de sector sin experiencia directa",
    "description": "Pasos para crear un CV efectivo cuando te cambias de sector.",
    "step": [
      { "@type": "HowToStep", "name": "Identifica tus habilidades transferibles", "text": "Extrae las competencias de tu experiencia anterior que aplican al nuevo sector." },
      { "@type": "HowToStep", "name": "Adapta el formato del CV", "text": "Usa un formato funcional o híbrido que ponga el foco en habilidades, no en cronología." },
      { "@type": "HowToStep", "name": "Personaliza para cada oferta", "text": "Adapta el CV a los requisitos específicos de cada oferta del nuevo sector." }
    ]
  }

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>CV Sin Experiencia en el Nuevo Sector</span>
        </nav>

        <header className="article-header">
          <h1>Cómo Hacer un CV Sin Experiencia en el Nuevo Sector (Y Conseguir Entrevistas)</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 9 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>El problema con el CV estándar para cambios de sector</h2>
            <p>
              El CV cronológico estándar está diseñado para mostrar una progresión lineal dentro de un sector.
              Si cambias de sector, ese formato trabaja en tu contra: lo primero que ve el reclutador es que
              <strong>"no tienes experiencia en el sector"</strong>.
            </p>
            <p>
              La solución no es mentir ni ocultar tu trayectoria. Es presentarla de forma que lo relevante
              para el nuevo sector quede inmediatamente visible.
            </p>
          </section>

          <h2>El formato correcto para un CV de cambio de sector</h2>

          <h3>CV funcional o por competencias</h3>
          <p>
            En lugar de organizar la experiencia cronológicamente, la organiza por áreas de competencia.
            Primero aparecen las habilidades (con evidencias), luego la experiencia laboral resumida.
            Ideal cuando las habilidades son transferibles pero los títulos de los puestos no "suenan" al nuevo sector.
          </p>

          <h3>CV híbrido (el más recomendado)</h3>
          <p>
            Combina un bloque de "perfil y competencias" al inicio con la experiencia cronológica después.
            El reclutador ve primero lo relevante, luego el contexto. Es el formato más efectivo para la mayoría
            de los cambios de sector.
          </p>

          <h2>Paso a paso: crear el CV para el nuevo sector</h2>

          <h3>Paso 1: Analiza la oferta objetivo en detalle</h3>
          <p>
            Antes de escribir una sola línea del CV, lee 10-15 ofertas del tipo de rol que buscas. Extrae
            los requisitos comunes: habilidades, herramientas, tipos de experiencia. Esa es tu lista de keywords
            y de lo que necesitas destacar.
          </p>

          <h3>Paso 2: El titular del CV</h3>
          <p>
            El titular es la primera línea del CV, debajo de tu nombre. No pongas tu cargo actual del sector
            anterior. Pon el rol al que aspiras o un titular que te posicione para el cambio:
          </p>
          <ul>
            <li>❌ "Responsable de logística en retail"</li>
            <li>✅ "Especialista en operaciones y gestión de procesos | Transición a sector tecnológico"</li>
          </ul>

          <h3>Paso 3: El resumen profesional</h3>
          <p>
            Escribe 3-4 líneas que cuenten tu historia de forma coherente y que conecten tu pasado con el futuro.
            No expliques por qué te vas. Explica qué llevas y por qué es relevante para el nuevo sector.
          </p>

          <h3>Paso 4: La sección de competencias</h3>
          <p>
            Lista las habilidades en dos columnas: técnicas y blandas. Usa el lenguaje del sector al que vas,
            no el de donde vienes. Si has gestionado equipos en hostelería, no escribas "gestión de equipo de sala":
            escribe "liderazgo de equipos operativos" o el término que usa el sector objetivo.
          </p>

          <h3>Paso 5: La experiencia laboral</h3>
          <p>
            Para cada trabajo, lo importante no son las responsabilidades genéricas sino los logros concretos
            y las habilidades que demuestran. Usa métricas siempre que puedas:
          </p>
          <ul>
            <li>"Redujo el tiempo de resolución de incidencias un 30%"</li>
            <li>"Implementó un proceso nuevo que eliminó 5 horas semanales de trabajo manual"</li>
            <li>"Formó y onboardeó a 12 nuevos empleados en 6 meses"</li>
          </ul>

          <h3>Paso 6: Formación y certificaciones</h3>
          <p>
            Si has hecho algún curso relacionado con el nuevo sector (aunque sea online), ponlo claramente.
            Un curso de 20 horas relevante es más valioso que 5 años de experiencia irrelevante para este CV.
          </p>

          <h2>Proyectos personales y voluntariado: el as bajo la manga</h2>
          <p>
            ¿Has hecho algún proyecto personal, voluntariado o colaboración en el nuevo sector? Por pequeño
            que sea, inclúyelo. Una colaboración de 3 meses en una startup del sector que te interesa, aunque
            sea no remunerada, puede ser la diferencia entre conseguir entrevista o no.
          </p>

          <h2>El ATS y las palabras clave</h2>
          <p>
            El 75% de los CV se filtran automáticamente por software ATS antes de llegar a un humano. Para
            pasar el filtro, tu CV debe incluir exactamente las mismas palabras clave que aparecen en la oferta.
            No sinónimos: las palabras exactas.
          </p>

          <div className="cta-box">
            <h3>¿Sabes qué habilidades destacar en tu CV de cambio de sector?</h3>
            <p>Primero identifica tus competencias transferibles, luego escribe el CV. El análisis con IA es gratis.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Identificar mis habilidades para el nuevo sector →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
