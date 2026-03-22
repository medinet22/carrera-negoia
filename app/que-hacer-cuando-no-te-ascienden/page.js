import Link from 'next/link'

export const metadata = {
  title: 'Qué hacer cuando no te ascienden (otra vez) | Carrera NegoIA',
  description: 'Te has quedado sin ascenso. Otra vez. Guía práctica: entiende por qué pasa, decide si quedarte o irte, y actúa en las próximas 2 semanas.',
  openGraph: {
    title: 'Qué hacer cuando no te ascienden (otra vez)',
    description: 'Te han pasado por encima otra vez. Aquí está lo que nadie te dice y cómo decidir tu próximo movimiento.',
    url: 'https://carrera.negoia.com/que-hacer-cuando-no-te-ascienden',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/que-hacer-cuando-no-te-ascienden',
  },
}

export default function QueHacerCuandoNoTeAsciendenPage() {
  return (
    <main className="seo-article">
      <article>
        <header className="article-header">
          <h1>Qué hacer cuando no te ascienden (otra vez)</h1>
          <p className="article-meta">
            Actualizado marzo 2026 · Lectura: 7 min
          </p>
        </header>

        <section className="article-intro">
          <p>
            <strong>Llevas años currando. Has dado más de lo que te piden. Y otra vez, el ascenso se lo han dado a otro.</strong>
          </p>
          <p>
            No voy a darte el típico "sigue esforzándote" porque probablemente ya lo haces. Ni el "habla con tu jefe" porque seguro ya lo has intentado.
          </p>
          <p>
            Lo que sí voy a darte: un diagnóstico real de por qué pasa esto, cómo decidir si merece la pena seguir, y qué hacer en las próximas dos semanas.
          </p>
        </section>

        <nav className="toc">
          <h2>En este artículo</h2>
          <ul>
            <li><a href="#por-que-no-ascienden">Por qué no te ascienden (la verdad incómoda)</a></li>
            <li><a href="#diagnostico-rapido">El diagnóstico de 5 minutos</a></li>
            <li><a href="#quedarte-o-irte">Quedarte o irte: cómo decidir</a></li>
            <li><a href="#plan-2-semanas">Plan de acción: 2 semanas</a></li>
            <li><a href="#errores-comunes">4 errores que comete todo el mundo</a></li>
          </ul>
        </nav>

        <section id="por-que-no-ascienden">
          <h2>Por qué no te ascienden (la verdad incómoda)</h2>
          
          <p>
            Hay razones que te cuentan y razones que no. Las que no te cuentan son las importantes.
          </p>

          <h3>Lo que te dicen</h3>
          <ul>
            <li>"No hay presupuesto este año"</li>
            <li>"Necesitas más experiencia en X"</li>
            <li>"La estructura no permite más seniors ahora"</li>
          </ul>

          <h3>Lo que realmente pasa (muchas veces)</h3>
          
          <p><strong>1. Eres demasiado bueno en tu puesto actual</strong></p>
          <p>
            Suena a broma, pero no lo es. Si eres insustituible donde estás, moverte crea un problema. 
            Tu jefe no quiere ese problema. Ascender al que hace "suficiente" es más fácil.
          </p>
          <p>
            <em>Señal de que esto te pasa:</em> Te cargan con los proyectos difíciles. 
            Los demás tienen tiempo de "networking interno" mientras tú apagas fuegos.
          </p>

          <p><strong>2. No tienes quien te sponsorice arriba</strong></p>
          <p>
            Los ascensos no se ganan solo con trabajo. Se ganan con alguien arriba que ponga tu nombre sobre la mesa cuando tú no estás.
            Si no tienes eso, da igual lo que hagas.
          </p>
          <p>
            <em>Señal de que esto te pasa:</em> Haces tu trabajo, recibes buenos feedbacks, pero nadie menciona tu nombre para proyectos estratégicos.
          </p>

          <p><strong>3. Has dejado de ser visible</strong></p>
          <p>
            "Mi trabajo habla por sí solo" es la mayor mentira de las empresas. 
            Tu trabajo no habla. Tu trabajo se lo apropian otros si no lo comunicas.
          </p>
          <p>
            <em>Señal de que esto te pasa:</em> Te enteras de logros del equipo cuando ya los ha presentado otro. 
            En reuniones grandes, apenas intervienes.
          </p>

          <p><strong>4. El puesto que quieres no existe (para ti)</strong></p>
          <p>
            A veces la empresa simplemente no tiene el hueco que necesitas. 
            O lo tiene, pero ya está asignado extraoficialmente a alguien.
          </p>
          <p>
            <em>Señal de que esto te pasa:</em> Ves contrataciones externas para roles que tú podrías hacer. 
            O reestructuraciones que nunca incluyen tu área.
          </p>
        </section>

        <section id="diagnostico-rapido">
          <h2>El diagnóstico de 5 minutos</h2>
          
          <p>Responde con honestidad:</p>
          
          <div className="diagnostic-box">
            <p><strong>1. ¿Cuántas veces en el último año has hablado con tu jefe sobre tu carrera (no sobre proyectos)?</strong></p>
            <ul>
              <li>Nunca → Problema de visibilidad</li>
              <li>1-2 veces → Insuficiente</li>
              <li>Trimestral o más → Bien, el problema es otro</li>
            </ul>

            <p><strong>2. ¿Quién arriba de tu jefe sabe tu nombre y qué haces?</strong></p>
            <ul>
              <li>Nadie → Problema de sponsorship</li>
              <li>1 persona → Frágil</li>
              <li>2+ personas → Bien posicionado</li>
            </ul>

            <p><strong>3. ¿En los últimos 6 meses, has rechazado algo porque "no te toca"?</strong></p>
            <ul>
              <li>Sí, varias veces → Puede que estés estancado voluntariamente</li>
              <li>No, acepto todo → Revisa si estás siendo el "apagafuegos"</li>
            </ul>

            <p><strong>4. ¿Cuántas personas que entraron después que tú ya están en puestos superiores?</strong></p>
            <ul>
              <li>Ninguna → La empresa es lenta, no tú</li>
              <li>1-2 → Analiza qué hicieron diferente</li>
              <li>Varias → Tienes un problema real</li>
            </ul>
          </div>
        </section>

        <section id="quedarte-o-irte">
          <h2>Quedarte o irte: cómo decidir</h2>

          <p>
            Esta es la pregunta real. Y la respuesta depende de algo muy concreto: 
            <strong>¿hay un camino creíble hacia donde quieres en esta empresa?</strong>
          </p>

          <h3>Señales de que merece la pena quedarte</h3>
          <ul>
            <li>Tu jefe directo te ha dado feedback específico y accionable sobre qué necesitas</li>
            <li>Hay un timeline concreto ("en la revisión de septiembre")</li>
            <li>Ves a gente similar a ti que sí ha progresado recientemente</li>
            <li>Tienes acceso a proyectos que desarrollan las habilidades que te faltan</li>
          </ul>

          <h3>Señales de que es hora de irte</h3>
          <ul>
            <li>Llevas 2+ años escuchando las mismas promesas</li>
            <li>Los ascensos van a externos o a "los de siempre"</li>
            <li>Tu jefe evita conversaciones sobre tu futuro</li>
            <li>Sientes que has dejado de aprender hace tiempo</li>
            <li>El resentimiento ya afecta a tu trabajo diario</li>
          </ul>

          <p>
            <strong>La regla del año:</strong> Si llevas más de 12 meses sin progreso real y sin timeline concreto, 
            el mercado es mejor opción que esperar.
          </p>
        </section>

        <section id="plan-2-semanas">
          <h2>Plan de acción: 2 semanas</h2>

          <p>No vamos a esperar 6 meses. Esto es lo que haces ahora:</p>

          <h3>Semana 1: Diagnóstico y conversación</h3>
          
          <p><strong>Día 1-2: Prepara la conversación</strong></p>
          <ul>
            <li>Lista de tus 3 mayores contribuciones del último año (con números si puedes)</li>
            <li>El puesto o nivel específico que quieres (nada de "crecer")</li>
            <li>Pregunta concreta: "¿Qué necesito demostrar para llegar a X en los próximos 6 meses?"</li>
          </ul>

          <p><strong>Día 3-4: Ten la conversación</strong></p>
          <p>
            Agenda una reunión específica (no en un 1:1 normal). Título: "Mi desarrollo profesional".
            Escucha más que hablas. Toma notas. Pide ejemplos concretos.
          </p>

          <p><strong>Día 5-7: Evalúa la respuesta</strong></p>
          <ul>
            <li>¿Te dio un plan concreto o generalidades?</li>
            <li>¿Hay un timeline o solo "ya veremos"?</li>
            <li>¿Depende de ti o de "factores externos"?</li>
          </ul>

          <h3>Semana 2: Decide y actúa</h3>

          <p><strong>Si la respuesta fue positiva y concreta:</strong></p>
          <ul>
            <li>Envía un email resumiendo lo acordado (deja rastro)</li>
            <li>Pide un check-in en 30 días</li>
            <li>Empieza a trabajar en lo que te pidieron</li>
          </ul>

          <p><strong>Si la respuesta fue vaga o negativa:</strong></p>
          <ul>
            <li>Actualiza tu LinkedIn (sin anunciar nada)</li>
            <li>Activa alertas en 2-3 portales de empleo</li>
            <li>Contacta a 3 personas de tu red que trabajan donde te gustaría</li>
            <li>Empieza a aplicar esta misma semana</li>
          </ul>

          <p>
            <strong>Importante:</strong> No renuncies antes de tener algo. Pero tampoco esperes a "estar listo". 
            El mejor momento para buscar es cuando aún tienes trabajo.
          </p>
        </section>

        <section id="errores-comunes">
          <h2>4 errores que comete todo el mundo</h2>

          <p><strong>1. Esperar a que te lo ofrezcan</strong></p>
          <p>
            Los ascensos no caen del cielo. Hay que pedirlos, negociarlos, y a veces, forzarlos. 
            Si esperas a que tu jefe se dé cuenta solo, vas a esperar mucho.
          </p>

          <p><strong>2. Confundir actividad con impacto</strong></p>
          <p>
            Trabajar 60 horas no te asciende. Resolver el problema correcto sí. 
            Pregúntate: ¿qué de lo que hago le importa realmente a quien decide?
          </p>

          <p><strong>3. Quemarse en silencio</strong></p>
          <p>
            El resentimiento no se nota al principio. Pero acaba afectando tu rendimiento, tus relaciones, y tu salud. 
            Si ya estás quemado, irte es autocuidado, no derrota.
          </p>

          <p><strong>4. Compararte con el que ascendió</strong></p>
          <p>
            Puede que el otro tenga contactos, haya llegado en mejor momento, o simplemente haya jugado mejor el juego político. 
            No significa que seas peor. Significa que el sistema premia cosas que tú no estabas haciendo.
          </p>
        </section>

        <section className="article-cta">
          <h2>¿Necesitas claridad sobre tu próximo paso?</h2>
          <p>
            Si llevas tiempo dándole vueltas a si quedarte, irte, o reinventarte, 
            puede que el problema no sea solo el ascenso — sino que no tienes claro qué quieres realmente.
          </p>
          <p>
            <Link 
              href="/?utm_source=seo&utm_medium=blog&utm_campaign=no_te_ascienden&utm_content=cta_principal"
              className="cta-button"
            >
              Descubrir para qué soy bueno →
            </Link>
          </p>
          <p className="cta-subtext">
            Test gratuito · 15 minutos · Sin registro
          </p>
        </section>

        <section className="article-faq">
          <h2>Preguntas frecuentes</h2>
          
          <div className="faq-item">
            <h3>¿Cuánto tiempo debo esperar antes de irme?</h3>
            <p>
              Si llevas más de 12 meses sin progreso real y sin un plan concreto con timeline, 
              es momento de explorar opciones. No tienes que renunciar mañana, pero sí empezar a buscar.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Debo decirle a mi jefe que estoy buscando?</h3>
            <p>
              No. Nunca. Hasta que tengas una oferta firmada, tu búsqueda es privada. 
              Decirlo antes solo te pone en una posición vulnerable sin ningún beneficio.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Y si me ascienden justo cuando voy a irme?</h3>
            <p>
              Pasa más de lo que crees. Es la "contraoferta". Evalúala fríamente: ¿cambia algo estructural 
              o solo el título/sueldo? Si el problema era el jefe, la cultura, o el techo — seguirá ahí.
            </p>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Qué hacer cuando no te ascienden (otra vez)",
              "description": "Guía práctica: entiende por qué no te ascienden, decide si quedarte o irte, y actúa en las próximas 2 semanas.",
              "author": {
                "@type": "Organization",
                "name": "Carrera NegoIA"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Carrera NegoIA",
                "url": "https://carrera.negoia.com"
              },
              "datePublished": "2026-03-22",
              "dateModified": "2026-03-22"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Cuánto tiempo debo esperar antes de irme si no me ascienden?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Si llevas más de 12 meses sin progreso real y sin un plan concreto con timeline, es momento de explorar opciones. No tienes que renunciar mañana, pero sí empezar a buscar."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Debo decirle a mi jefe que estoy buscando trabajo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Nunca. Hasta que tengas una oferta firmada, tu búsqueda es privada. Decirlo antes solo te pone en una posición vulnerable sin ningún beneficio."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué hago si me hacen una contraoferta cuando voy a irme?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evalúala fríamente: ¿cambia algo estructural o solo el título/sueldo? Si el problema era el jefe, la cultura, o el techo — seguirá ahí después del ascenso."
                  }
                }
              ]
            })
          }}
        />
      </article>
    </main>
  )
}
