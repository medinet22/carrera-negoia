import Link from 'next/link'

export const metadata = {
  title: 'Qué son las Habilidades Transferibles y Cómo Usarlas | Guía 2026',
  description: 'Guía completa sobre habilidades transferibles: qué son, cuáles son las más valoradas en el mercado laboral español, y cómo identificar las tuyas para cambiar de sector.',
  keywords: 'habilidades transferibles, competencias transferibles, habilidades para cambiar de trabajo, skills transferibles',
  openGraph: {
    title: 'Qué son las Habilidades Transferibles y Cómo Usarlas',
    description: 'Todo sobre habilidades transferibles: cómo identificarlas y usarlas para cambiar de sector con éxito.',
    url: 'https://carrera.negoia.com/habilidades-transferibles',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/habilidades-transferibles',
  },
}

export default function HabilidadesTransferibles() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Qué son las Habilidades Transferibles y Cómo Usarlas",
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
          <Link href="/">Inicio</Link> → <span>Habilidades Transferibles</span>
        </nav>

        <header className="article-header">
          <h1>Qué son las Habilidades Transferibles: La Base de Cualquier Cambio de Carrera</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 8 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>Definición</h2>
            <p>
              Las <strong>habilidades transferibles</strong> son competencias que has desarrollado en un contexto
              (un trabajo, sector o rol específico) y que pueden aplicarse con eficacia en contextos completamente
              diferentes. No están vinculadas a un sector concreto, sino a formas de trabajar, resolver problemas
              y relacionarse que son valiosas en múltiples entornos.
            </p>
            <p>
              Son la respuesta a la pregunta que más paraliza en un cambio de carrera: "¿Pero si no tengo
              experiencia en ese sector, cómo voy a encontrar trabajo?"
            </p>
          </section>

          <h2>Las habilidades transferibles más valoradas en España (2026)</h2>

          <h3>Gestión y liderazgo</h3>
          <p>
            Coordinar equipos, gestionar proyectos, tomar decisiones con información incompleta, motivar personas.
            Si lo has hecho en retail, lo puedes hacer en tecnología. Si lo has hecho en educación, lo puedes
            hacer en consultoría.
          </p>

          <h3>Comunicación y persuasión</h3>
          <p>
            Presentar ideas, negociar, escribir con claridad, hablar en público, escuchar activamente. Son
            universalmente valoradas y frecuentemente subestimadas. Un buen comunicador es valioso en cualquier sector.
          </p>

          <h3>Análisis y resolución de problemas</h3>
          <p>
            Identificar la causa raíz de un problema, estructurar soluciones, tomar decisiones basadas en datos.
            Da igual si los datos son de ventas, producción, educación o salud: la habilidad de análisis es la misma.
          </p>

          <h3>Gestión de clientes y relaciones</h3>
          <p>
            Entender necesidades, gestionar expectativas, construir confianza. Aplicable en ventas, atención al
            cliente, account management, consulting, y cualquier rol que tenga interlocutores internos o externos.
          </p>

          <h3>Aprendizaje rápido y adaptación</h3>
          <p>
            La capacidad de aprender nuevos sistemas, procesos o sectores rápidamente. En el mercado laboral
            actual, esta es probablemente la habilidad más valorada de todas.
          </p>

          <h2>Cómo identificar tus habilidades transferibles</h2>
          <ol>
            <li>
              <strong>Lista todos tus trabajos y responsabilidades principales.</strong> No el título del cargo:
              las tareas concretas que hacías.
            </li>
            <li>
              <strong>Para cada responsabilidad, pregúntate: ¿qué habilidad requería esto?</strong> "Gestionar
              reclamaciones de clientes" = comunicación, resolución de conflictos, empatía, gestión del estrés.
            </li>
            <li>
              <strong>Identifica cuáles aparecen repetidamente.</strong> Esas son tus fortalezas transferibles reales.
            </li>
            <li>
              <strong>Contrasta con las ofertas del sector objetivo.</strong> ¿Cuáles de tus habilidades mencionan?
            </li>
          </ol>

          <h2>Cómo presentar habilidades transferibles en el CV</h2>
          <p>
            El error más común es listar las habilidades sin contexto. "Buenas habilidades comunicativas" no
            dice nada. Esto sí:
          </p>
          <ul>
            <li>"Presenté trimestralmente resultados a comité de dirección de 12 personas"</li>
            <li>"Negocié contratos con proveedores reduciendo costes un 18%"</li>
            <li>"Formé a un equipo de 6 personas en nuevo sistema CRM en 3 semanas"</li>
          </ul>
          <p>
            El contexto demuestra la habilidad. La habilidad sola es solo una afirmación.
          </p>

          <h2>Habilidades transferibles vs. habilidades específicas del sector</h2>
          <p>
            Las habilidades específicas del sector (conocimiento de normativa bancaria, manejo de software
            específico, protocolos médicos) son las que suelen dar miedo al cambiar de sector. Son las que
            "no tienes". Pero aquí está la clave:
          </p>
          <p>
            Las empresas contratan habilidades transferibles y forman en las específicas. Contratan personas
            que saben trabajar y luego les enseñan el sector. Lo que NO pueden enseñar fácilmente son las
            habilidades blandas y transversales que tardas años en desarrollar.
          </p>

          <div className="cta-box">
            <h3>¿Cuáles son tus habilidades transferibles reales?</h3>
            <p>Analiza tu trayectoria con IA y descubre qué competencias tienes que valen en otros sectores. Gratis.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Identificar mis habilidades transferibles →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
