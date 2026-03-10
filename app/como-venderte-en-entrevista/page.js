import Link from 'next/link'

export const metadata = {
  title: 'Cómo Venderte en una Entrevista de Trabajo | Guía 2026',
  description: 'Aprende a venderte en una entrevista de trabajo con confianza y sin sonar arrogante. Técnicas probadas para destacar tus habilidades y conseguir el trabajo.',
  keywords: 'cómo venderte en entrevista, destacar en entrevista trabajo, técnicas entrevista laboral, respuestas entrevista trabajo',
  openGraph: {
    title: 'Cómo Venderte en una Entrevista de Trabajo',
    description: 'Técnicas y estrategias para venderte en una entrevista de trabajo con confianza.',
    url: 'https://carrera.negoia.com/como-venderte-en-entrevista',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/como-venderte-en-entrevista',
  },
}

export default function ComoVenderteEnEntrevista() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo venderte en una entrevista de trabajo",
    "description": "Guía paso a paso para destacar tus habilidades en una entrevista de trabajo.",
    "step": [
      { "@type": "HowToStep", "name": "Conoce tu propuesta de valor", "text": "Antes de la entrevista, identifica exactamente qué habilidades y logros te hacen el candidato ideal." },
      { "@type": "HowToStep", "name": "Prepara historias con el método STAR", "text": "Situación, Tarea, Acción, Resultado. Convierte tus logros en historias concretas." },
      { "@type": "HowToStep", "name": "Adapta tu narrativa al rol", "text": "Conecta tus habilidades con los requisitos específicos del puesto." }
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
          <Link href="/">Inicio</Link> → <span>Cómo Venderte en una Entrevista</span>
        </nav>

        <header className="article-header">
          <h1>Cómo Venderte en una Entrevista de Trabajo: La Guía Definitiva</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 9 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>Por qué la mayoría de los candidatos no saben venderse</h2>
            <p>
              Venderse en una entrevista no es lo mismo que presumir. Venderse es comunicar con claridad
              y evidencia qué valor aportas a la empresa. El problema es que la mayoría de los candidatos
              o se quedan cortos (por modestia o por no haberse preparado bien) o se van al extremo opuesto
              (promesas vacías sin evidencia).
            </p>
            <p>
              <strong>La clave es simple: ejemplos concretos, métricas, y conectar directamente con lo que la empresa necesita.</strong>
            </p>
          </section>

          <h2>Antes de la entrevista: la preparación que nadie hace</h2>

          <h3>1. Define tu propuesta de valor</h3>
          <p>
            Escribe en una sola frase qué aportas que te diferencia de otros candidatos. No genérico:
            específico para este rol y esta empresa. Ejemplo: "Aporto 12 años de experiencia en operaciones
            de ecommerce con probado historial de reducción de costes y mejora de márgenes en empresas de
            tamaño medio."
          </p>

          <h3>2. Prepara entre 5 y 8 historias de logros</h3>
          <p>
            Los entrevistadores no recuerdan descripciones de responsabilidades. Recuerdan historias concretas.
            Prepara historias que demuestren tus principales competencias usando el método STAR:
          </p>
          <ul>
            <li><strong>Situación:</strong> Contexto inicial (1-2 frases)</li>
            <li><strong>Tarea:</strong> Tu responsabilidad específica</li>
            <li><strong>Acción:</strong> Lo que hiciste tú (no el equipo: tú)</li>
            <li><strong>Resultado:</strong> Resultado concreto, con métricas si es posible</li>
          </ul>

          <h3>3. Investiga la empresa a fondo</h3>
          <p>
            Lee los últimos 6 meses de noticias sobre la empresa. Busca en LinkedIn qué perfiles tienen.
            Entiende sus retos actuales. En la entrevista, conecta tus logros con sus necesidades actuales.
            Eso es lo que diferencia a un candidato preparado de uno que solo conoce la web corporativa.
          </p>

          <h2>Las preguntas más comunes y cómo responderlas bien</h2>

          <h3>"Háblame de ti"</h3>
          <p>
            Es la primera pregunta y la que más candidatos desperdician. No cuentes tu CV cronológico.
            Cuenta una narrativa de 2-3 minutos: de dónde vienes, qué has conseguido, y por qué esta empresa
            y este rol son tu siguiente paso lógico. Termina siempre conectando con la empresa.
          </p>

          <h3>"¿Cuál es tu mayor fortaleza?"</h3>
          <p>
            No digas "trabajo duro" o "soy muy organizado". Di una fortaleza específica y demuéstrala con
            un ejemplo: "Mi mayor fortaleza es [X]. Por ejemplo, cuando en [empresa] me enfrenté a [situación],
            lo que hice fue [acción] y el resultado fue [resultado]."
          </p>

          <h3>"¿Cuál es tu mayor debilidad?"</h3>
          <p>
            No digas "soy perfeccionista" (manido). Di algo real que estés trabajando activamente: "Me costaba
            delegar, porque quería controlar la calidad. He aprendido a crear sistemas de feedback que me
            permiten delegar sin perder visibilidad. Todavía me esfuerzo en ello."
          </p>

          <h3>"¿Por qué quieres este trabajo?"</h3>
          <p>
            Nunca digas "porque necesito trabajo" aunque sea verdad. Di por qué esta empresa y este rol
            específico encajan con lo que quieres conseguir. Conecta sus retos con tus fortalezas.
          </p>

          <h2>El lenguaje no verbal en la entrevista</h2>
          <ul>
            <li><strong>Contacto visual:</strong> Mantén contacto visual pero no lo conviertas en un duelo. Natural y fluido.</li>
            <li><strong>Postura:</strong> Ligeramente inclinado hacia adelante indica interés. Hundido en la silla indica desgana.</li>
            <li><strong>Velocidad al hablar:</strong> La ansiedad acelera. Respira. Habla un 20% más despacio de lo que crees necesario.</li>
            <li><strong>Pausas:</strong> Está bien tomarte 2-3 segundos para pensar antes de responder.</li>
          </ul>

          <h2>Las preguntas que tú debes hacer (obligatorias)</h2>
          <p>
            La entrevista es en dos sentidos. Preguntar bien demuestra interés y preparación:
          </p>
          <ul>
            <li>"¿Cuáles son los principales retos de la persona en este rol durante los primeros 6 meses?"</li>
            <li>"¿Cómo es un día típico en este puesto?"</li>
            <li>"¿Qué hace a alguien muy exitoso en este rol en esta empresa?"</li>
            <li>"¿Cuáles son los próximos pasos del proceso de selección?"</li>
          </ul>

          <div className="cta-box">
            <h3>¿Sabes exactamente qué fortalezas presentar en tu entrevista?</h3>
            <p>Primero necesitas conocer tu perfil real de habilidades. Descúbrelo con IA antes de tu próxima entrevista.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Preparar mi perfil para entrevistas →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
