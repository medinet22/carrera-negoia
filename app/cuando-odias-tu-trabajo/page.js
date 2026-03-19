import Link from 'next/link'

export const metadata = {
  title: 'Odio Mi Trabajo: Qué Hacer Antes de Mandarlo Todo a la Mierda | 2026',
  description: 'Si odias tu trabajo pero no puedes irte mañana, esta guía práctica te da los 3 pasos que sí funcionan sin decisiones impulsivas ni coach de €200/hora.',
  keywords: 'odio mi trabajo, no soporto mi trabajo, quiero dejar mi trabajo, cambiar de trabajo, crisis laboral',
  openGraph: {
    title: 'Odio Mi Trabajo: Qué Hacer Antes de Mandarlo Todo a la Mierda',
    description: 'Guía práctica para cuando no aguantas más pero tampoco puedes irte mañana.',
    url: 'https://carrera.negoia.com/cuando-odias-tu-trabajo',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/cuando-odias-tu-trabajo',
  },
}

export default function CuandoOdiasTuTrabajo() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Odio Mi Trabajo: Qué Hacer Antes de Mandarlo Todo a la Mierda',
    datePublished: '2026-03-19',
    dateModified: '2026-03-19',
    author: { '@type': 'Organization', name: 'carrera.negoia.com' },
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Es normal odiar tu trabajo aunque te paguen bien?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, completamente normal. El dinero compra estabilidad, no satisfacción. Puedes tener un sueldo decente y aún así sentir que desperdicias tu vida 8 horas diarias. No es ingratitud, es desalineación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Debería aguantar hasta encontrar algo mejor o irme ya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende de tu situación financiera y salud mental. Si puedes aguantar sin quemarte, busca primero. Si cada domingo te genera ansiedad física, prepara una salida acelerada pero ordenada. El orden correcto: claridad → plan B → salida.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo sé si el problema es el trabajo o soy yo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pregúntate: ¿odiabas otros trabajos igual? Si siempre te pasa, el patrón eres tú (quizás necesitas otro tipo de rol). Si es solo este, el problema es el entorno. Ambos tienen solución, pero diferente.',
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
          <span className="article-category">Crisis laboral</span>
          <h1>Odio Mi Trabajo: Qué Hacer Antes de Mandarlo Todo a la Mierda</h1>
          <p className="article-meta">
            Guía práctica para cuando no aguantas más pero tampoco puedes irte mañana · Actualizado marzo 2026
          </p>
        </div>

        <div className="article-content">
          <p className="lead">
            <strong>Domingo, 18:47.</strong> Te das cuenta de que mañana vuelves a esa oficina, ese jefe, esas reuniones que no llevan a ningún sitio. El estómago se te cierra. Sabes que odias tu trabajo. No es un mal día. Es un mal año. O dos. O cinco.
          </p>

          <p>
            Y sabes qué es lo peor? Que no puedes irte mañana. Tienes facturas. Tienes gente que depende de ti. Tienes miedo de saltar sin red. Así que cada lunes vuelves, aguantas, y el resentimiento crece.
          </p>

          <p>
            Esta guía no te va a decir que "sigas tu pasión" ni que "el dinero no importa". Te voy a dar los 3 pasos que realmente funcionan para salir de un trabajo que odias sin destruir tu vida en el proceso.
          </p>

          <h2>Primero, la pregunta incómoda: ¿realmente odias el trabajo o estás quemado?</h2>

          <p>
            Parece lo mismo pero no lo es. Y la diferencia cambia completamente qué hacer.
          </p>

          <p>
            <strong>Odiar el trabajo</strong> = el problema es el contenido. Lo que haces no te interesa, no le ves sentido, no te conecta con nada. Aunque descansaras 3 meses, volverías y seguirías odiándolo.
          </p>

          <p>
            <strong>Estar quemado</strong> = el problema es la carga. Quizás te gustaba antes, pero llevas tanto tiempo forzando la máquina que ya no sientes nada. Si tuvieras 2 semanas de descanso real, quizás verías las cosas diferente.
          </p>

          <div className="callout">
            <strong>Test rápido (30 segundos):</strong> Imagina que mañana te cambian de puesto pero en la misma empresa, mismo sueldo, cero estrés. ¿Te ilusionaría? Si sí → estás quemado del entorno. Si no → odias el trabajo en sí.
          </div>

          <h2>Paso 1: Deja de fingir que está bien (pero tampoco explotes)</h2>

          <p>
            El error más común es uno de dos extremos: aguantar en silencio hasta reventar, o mandar a tomar por culo todo en un arrebato. Ninguno te lleva donde quieres.
          </p>

          <p>
            Lo que sí funciona:
          </p>

          <ul>
            <li><strong>Acepta internamente</strong> que esto no puede seguir. No tienes que contárselo a nadie todavía. Pero deja de engañarte con el "a lo mejor mejora solo".</li>
            <li><strong>Pon fecha límite mental:</strong> "Si en 6 meses sigo igual, me voy". Tener horizonte reduce la ansiedad del "para siempre".</li>
            <li><strong>Empieza a documentar</strong> todo lo que haces bien. Logros, proyectos, problemas que resolviste. Lo vas a necesitar para tu CV y entrevistas.</li>
          </ul>

          <h2>Paso 2: Identifica hacia dónde quieres ir (no solo de qué huyes)</h2>

          <p>
            Aquí es donde el 90% de la gente la caga. Saben que quieren salir, pero no saben hacia dónde. Y acaban saltando a otro trabajo que también odian en 6 meses.
          </p>

          <p>
            No necesitas "encontrar tu propósito de vida". Necesitas responder 3 preguntas:
          </p>

          <ol>
            <li><strong>¿Qué se me da bien?</strong> No lo que estudiaste o lo que dice tu título. Lo que realmente haces bien, incluso sin esfuerzo.</li>
            <li><strong>¿Qué no estoy dispuesto a tolerar?</strong> Jefes tóxicos, viajes constantes, trabajar los fines de semana... Saber lo que NO quieres es tan útil como saber lo que sí.</li>
            <li><strong>¿Qué necesito para pagar las facturas?</strong> Sé realista. Si necesitas €2.500/mes para vivir, no busques trabajos de €1.800 por "seguir tu pasión".</li>
          </ol>

          <div className="cta-box">
            <h3>¿No tienes claro qué se te da bien?</h3>
            <p>La mayoría de la gente lleva años trabajando pero no sabe nombrar sus habilidades reales. Si quieres descubrir las tuyas en 15 minutos, prueba esto:</p>
            <Link 
              href="/?utm_source=seo&utm_medium=blog&utm_campaign=cuando_odias_trabajo&utm_content=cta_principal"
              className="btn btn-primary"
            >
              Descubrir mis habilidades reales →
            </Link>
          </div>

          <h2>Paso 3: Prepara la salida antes de saltar</h2>

          <p>
            Sé que tienes ganas de irte ayer. Pero los que salen sin plan acaban peor: aceptando el primer trabajo que aparece, que muchas veces es igual de malo.
          </p>

          <p>
            Checklist de salida ordenada:
          </p>

          <ul>
            <li>✅ <strong>Colchón financiero:</strong> mínimo 3 meses de gastos. Ideal 6. Te da libertad para negociar y rechazar ofertas malas.</li>
            <li>✅ <strong>CV actualizado:</strong> con logros concretos, no descripciones de puesto. "Aumenté ventas 23%" &gt; "Responsable del área comercial".</li>
            <li>✅ <strong>LinkedIn decente:</strong> foto profesional, headline que no sea tu título actual, 3-4 publicaciones sobre tu sector.</li>
            <li>✅ <strong>3-5 conversaciones exploratorias:</strong> con gente que hace lo que te interesa. No pidas trabajo, pide información. La mayoría dirá que sí.</li>
            <li>✅ <strong>1-2 habilidades en desarrollo:</strong> algo que te abra puertas a donde quieres ir. Curso, certificación, proyecto paralelo.</li>
          </ul>

          <h2>El error que arruina más carreras que cualquier otro</h2>

          <p>
            Quedarte "un poco más" porque "no es tan malo". Sí lo es. Cada año que pasas en un trabajo que odias te cuesta:
          </p>

          <ul>
            <li>Energía que podrías estar invirtiendo en algo mejor</li>
            <li>Experiencia relevante que no estás ganando</li>
            <li>Tu salud mental (y física, que también se resiente)</li>
            <li>Oportunidades que ni siquiera ves porque tienes la cabeza en modo supervivencia</li>
          </ul>

          <p>
            No te digo que renuncies mañana sin plan. Te digo que dejes de posponer la decisión. Elige una fecha. Prepara tu salida. Ejecútala.
          </p>

          <h2>Preguntas frecuentes</h2>

          <div className="faq-section">
            <div className="faq-item">
              <h3>¿Es normal odiar tu trabajo aunque te paguen bien?</h3>
              <p>
                Sí, completamente normal. El dinero compra estabilidad, no satisfacción. Puedes tener un sueldo decente y aún así sentir que desperdicias tu vida 8 horas diarias. No es ingratitud, es desalineación.
              </p>
            </div>

            <div className="faq-item">
              <h3>¿Debería aguantar hasta encontrar algo mejor o irme ya?</h3>
              <p>
                Depende de tu situación financiera y salud mental. Si puedes aguantar sin quemarte, busca primero. Si cada domingo te genera ansiedad física, prepara una salida acelerada pero ordenada. El orden correcto: claridad → plan B → salida.
              </p>
            </div>

            <div className="faq-item">
              <h3>¿Cómo sé si el problema es el trabajo o soy yo?</h3>
              <p>
                Pregúntate: ¿odiabas otros trabajos igual? Si siempre te pasa, el patrón eres tú (quizás necesitas otro tipo de rol). Si es solo este, el problema es el entorno. Ambos tienen solución, pero diferente.
              </p>
            </div>
          </div>

          <div className="cta-box final-cta">
            <h3>¿Listo para dejar de odiar los lunes?</h3>
            <p>El primer paso es saber qué se te da bien de verdad. No lo que dice tu título, sino tus habilidades reales. Descúbrelas en 15 minutos.</p>
            <Link 
              href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=cuando_odias_trabajo&utm_content=cta_encuesta"
              className="btn btn-primary"
            >
              Hacer el test de habilidades (2 min) →
            </Link>
          </div>
        </div>

        <footer className="article-footer">
          <p>
            <Link href="/">← Volver a carrera.negoia.com</Link>
          </p>
        </footer>
      </article>
    </>
  )
}
