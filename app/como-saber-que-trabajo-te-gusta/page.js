import Link from 'next/link'

export const metadata = {
  title: 'Cómo Saber Qué Trabajo Te Gusta de Verdad | Guía 2026',
  description: 'Método práctico para descubrir qué trabajo te gusta de verdad, más allá de los tests vocacionales genéricos. Basado en tu experiencia real y en lo que te da energía.',
  keywords: 'cómo saber qué trabajo te gusta, descubrir trabajo ideal, qué trabajo me gusta, orientación profesional adultos',
  openGraph: {
    title: 'Cómo Saber Qué Trabajo Te Gusta de Verdad',
    description: 'Método para descubrir qué trabajo te gusta basado en tu experiencia y lo que te da energía.',
    url: 'https://carrera.negoia.com/como-saber-que-trabajo-te-gusta',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/como-saber-que-trabajo-te-gusta',
  },
}

export default function ComoSaberQueTrabajoTeGusta() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo descubrir qué trabajo te gusta de verdad",
    "description": "Método paso a paso para identificar el trabajo ideal basado en tu experiencia y lo que te da energía.",
    "step": [
      { "@type": "HowToStep", "name": "Inventario de momentos de flow", "text": "Recuerda momentos en los que estabas completamente absorbido en una tarea. ¿Qué estabas haciendo?" },
      { "@type": "HowToStep", "name": "Identifica los patrones", "text": "¿Qué tienen en común esos momentos? ¿Qué tipo de problemas resolvías? ¿Con quién trabajabas?" },
      { "@type": "HowToStep", "name": "Contrasta con el mercado", "text": "¿Qué roles del mercado laboral incluyen esas actividades que te dan energía?" }
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
          <Link href="/">Inicio</Link> → <span>Cómo Saber Qué Trabajo Te Gusta</span>
        </nav>

        <header className="article-header">
          <h1>Cómo Saber Qué Trabajo Te Gusta de Verdad (Sin Tests Genéricos)</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 8 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>El problema de "encontrar tu pasión"</h2>
            <p>
              Durante años, el consejo dominante fue "sigue tu pasión". El problema es que ese consejo
              funciona para el 10% de las personas que ya tienen una pasión clara y no funciona para el 90%
              restante. Y además es peligroso: puedes pasar años buscando una "pasión" que igual no existe.
            </p>
            <p>
              La pregunta mejor formulada no es "¿cuál es mi pasión?" sino <strong>"¿qué tipo de trabajo
              me da energía en lugar de quitármela?"</strong>
            </p>
          </section>

          <h2>La diferencia entre lo que crees que te gusta y lo que realmente te gusta</h2>
          <p>
            Muchos profesionales confunden lo que dicen que les gusta con lo que realmente les gusta cuando
            lo hacen. Creen que les gusta liderar equipos pero cuando lo hacen se estresan. Dicen que les
            gustaría trabajar solos pero cuando lo hacen se aburren.
          </p>
          <p>
            La única forma de saber qué trabajo te gusta de verdad es prestar atención a cómo te sientes
            mientras lo haces, no a cómo imaginas que te sentirías.
          </p>

          <h2>El método de los momentos de flow</h2>
          <p>
            El "flow" es ese estado en el que estás completamente absorbido en una actividad, el tiempo pasa
            rápido y sientes que estás en tu mejor versión. No necesitas que te lo expliquen: lo reconoces
            cuando lo sientes.
          </p>

          <h3>Ejercicio práctico</h3>
          <p>
            Piensa en los últimos 5 años de trabajo (o más). Identifica entre 5 y 10 momentos en los que
            experimentaste ese estado. No tienen que ser grandes proyectos: pueden ser tareas concretas de
            30 minutos.
          </p>
          <p>Para cada momento, responde:</p>
          <ul>
            <li>¿Qué estaba haciendo exactamente?</li>
            <li>¿Qué tipo de problema estaba resolviendo?</li>
            <li>¿Estaba trabajando solo o con otros? ¿En qué rol?</li>
            <li>¿Qué herramientas o habilidades estaba usando?</li>
          </ul>
          <p>
            Cuando tengas 5-10 momentos, busca los patrones. Ahí está la respuesta a qué tipo de trabajo
            te gusta de verdad.
          </p>

          <h2>Señales de que un trabajo te gusta de verdad</h2>
          <ul>
            <li>Hablas de ello con entusiasmo sin que te pregunten</li>
            <li>Lees sobre el tema en tu tiempo libre, no porque debas</li>
            <li>Las 8 horas se pasan sin que te des cuenta</li>
            <li>Te frustra cuando no puedes hacerlo bien (la frustración es señal de que te importa)</li>
            <li>Mejoras constantemente sin que te lo pidan</li>
          </ul>

          <h2>El test del domingo por la noche</h2>
          <p>
            El domingo por la noche, ¿cómo te sientes respecto al lunes? Si sientes un peso de pecho
            consistente (no ocasional), hay algo fundamental que no encaja. Puede ser el trabajo en sí,
            la empresa o las condiciones. Pero es una señal que merece atención.
          </p>
          <p>
            Si la mayoría de los domingos sientes cierta energía para el lunes (no tiene que ser euforia),
            estás probablemente en el camino correcto.
          </p>

          <h2>Cómo validar antes de comprometerte</h2>
          <p>
            Una vez tienes hipótesis sobre qué trabajo te podría gustar, valida antes de hacer un cambio grande:
          </p>
          <ul>
            <li><strong>Entrevistas informativas:</strong> Habla con personas que hacen ese trabajo. Pregunta qué hace un día típico.</li>
            <li><strong>Proyectos pequeños:</strong> Busca forma de hacer algo relacionado sin dejar tu trabajo actual.</li>
            <li><strong>Voluntariado o colaboraciones:</strong> Entra en el mundo que te interesa de alguna forma.</li>
          </ul>

          <div className="cta-box">
            <h3>¿Quieres descubrir qué tipo de trabajo te da energía?</h3>
            <p>La IA analiza tu trayectoria e identifica patrones sobre lo que realmente te funciona. Gratis en 15 minutos.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Descubrir qué trabajo me conviene →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
