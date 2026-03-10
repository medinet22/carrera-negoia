import Link from 'next/link'

export const metadata = {
  title: 'Test Orientación Profesional Gratis | Descubre tu Carrera Ideal 2026',
  description: 'Test de orientación profesional gratis para adultos. Descubre qué carrera o trabajo encaja mejor con tu perfil, habilidades e intereses. Resultados en 15 minutos.',
  keywords: 'test orientación profesional, test vocacional adultos, orientación laboral gratis, qué carrera elegir',
  openGraph: {
    title: 'Test Orientación Profesional Gratis | Descubre tu Carrera Ideal',
    description: 'Test gratuito de orientación profesional para adultos. Descubre tu carrera ideal basándote en tus habilidades reales.',
    url: 'https://carrera.negoia.com/test-orientacion-profesional',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/test-orientacion-profesional',
  },
}

export default function TestOrientacionProfesional() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo hacer un test de orientación profesional efectivo",
    "description": "Guía para elegir y hacer el mejor test de orientación profesional gratis.",
    "step": [
      { "@type": "HowToStep", "name": "Elige el tipo de test adecuado", "text": "Según tu situación (primer empleo, cambio de carrera, reincorporación) hay distintos tipos de test." },
      { "@type": "HowToStep", "name": "Describe tu trayectoria y preferencias", "text": "Un buen test analiza tu experiencia real, no solo respuestas abstractas." },
      { "@type": "HowToStep", "name": "Interpreta los resultados", "text": "Los resultados deben ser concretos: roles específicos, sectores, competencias clave." }
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
          <Link href="/">Inicio</Link> → <span>Test Orientación Profesional</span>
        </nav>

        <header className="article-header">
          <h1>Test de Orientación Profesional Gratis: Encuentra tu Camino Laboral</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 8 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>¿Qué es la orientación profesional y para qué sirve?</h2>
            <p>
              La <strong>orientación profesional</strong> es el proceso de identificar la dirección laboral más
              adecuada para una persona basándose en sus habilidades, intereses, valores y circunstancias. No es
              magia ni adivinación: es un análisis sistemático que conecta lo que eres con lo que el mercado necesita.
            </p>
            <p>
              Un buen test de orientación profesional no te dice "deberías ser veterinario" basándose en que te gustan
              los animales. Te dice "tus habilidades de X, Y y Z tienen alta demanda en los sectores A, B y C, y el
              rol que mejor encaja es Z". Esa es la diferencia entre un test útil y uno genérico.
            </p>
          </section>

          <h2>Cuándo necesitas un test de orientación profesional</h2>
          <ul>
            <li><strong>Estás en búsqueda de empleo</strong> y no sabes exactamente qué rol buscar</li>
            <li><strong>Llevas años en el mismo puesto</strong> y no sabes si hay vida más allá</li>
            <li><strong>Has tenido un despido o ERTE</strong> y aprovechas para replantearte tu carrera</li>
            <li><strong>Tienes más de 35 años</strong> y nunca has hecho un ejercicio serio de autoconocimiento profesional</li>
            <li><strong>Te sientes estancado</strong> y no sabes si el problema es el trabajo, el sector o tú</li>
          </ul>

          <h2>Tipos de tests de orientación profesional</h2>

          <h3>Tests de intereses vocacionales</h3>
          <p>
            El más conocido es el Inventario de Intereses de Holland (RIASEC). Clasifica a las personas en 6 tipos
            según sus intereses: Realista, Investigador, Artístico, Social, Emprendedor y Convencional. Es útil como
            punto de partida, pero sus resultados son muy generales y se basan en intereses, no en habilidades reales.
          </p>

          <h3>Tests de competencias profesionales</h3>
          <p>
            Evalúan específicamente qué sabes hacer y a qué nivel. Son más útiles que los tests de intereses porque
            conectan directamente con las demandas del mercado laboral. El problema es que los mejores suelen ser
            de pago o requieren un coach profesional.
          </p>

          <h3>Tests de personalidad aplicados al trabajo</h3>
          <p>
            MBTI, DISC, Big Five... Miden rasgos de personalidad. Son entretenidos y pueden dar perspectiva, pero
            tienen un problema fundamental: la personalidad no cambia mucho, mientras que las habilidades sí se
            pueden desarrollar. No dejes que un test de personalidad te cierre puertas.
          </p>

          <h3>Análisis de trayectoria con IA</h3>
          <p>
            El enfoque más moderno y efectivo. En lugar de responder preguntas abstractas, describes tu experiencia
            real y la IA identifica patrones, competencias y oportunidades de carrera. Los resultados son concretos,
            personalizados y accionables.
          </p>

          <h2>Cómo interpretar los resultados de un test de orientación</h2>
          <p>
            Los resultados de cualquier test son un punto de partida, no un destino. Algunas pautas para interpretarlos bien:
          </p>
          <ul>
            <li><strong>No descartes opciones por no ser "perfectas":</strong> El 80% de fit en un rol es suficiente para explorar</li>
            <li><strong>Contrasta con el mercado real:</strong> Busca ofertas de trabajo de los roles sugeridos y lee los requisitos</li>
            <li><strong>Habla con personas en esos roles:</strong> Una conversación de 20 minutos vale más que cualquier test</li>
            <li><strong>Prioriza lo que te da energía:</strong> Los tests miden aptitud, pero la motivación también importa</li>
          </ul>

          <h2>Orientación profesional para adultos: particularidades</h2>
          <p>
            Si tienes más de 30 años, los tests diseñados para jóvenes o estudiantes no son suficientes. La orientación
            profesional para adultos debe tener en cuenta:
          </p>
          <ul>
            <li>La experiencia acumulada como activo principal, no solo la formación</li>
            <li>Las restricciones prácticas (hipoteca, familia, ubicación) que acotan las opciones realistas</li>
            <li>La velocidad a la que necesitas resultados (no puedes hacer una carrera de 4 años)</li>
            <li>El mercado laboral español específico, no genérico</li>
          </ul>

          <div className="cta-box">
            <h3>Test de orientación profesional basado en tu experiencia real</h3>
            <p>No respondas preguntas abstractas. Describe lo que has hecho y descubre hacia dónde puedes ir. Gratis y en 15 minutos.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Hacer el test de orientación gratis →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
