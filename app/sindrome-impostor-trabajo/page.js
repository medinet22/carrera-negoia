import Link from 'next/link'

export const metadata = {
  title: 'Síndrome del Impostor en el Trabajo: Por Qué Crees Que No Vales | 2026',
  description: 'Crees que te van a pillar, que no mereces tu puesto, que todos saben más que tú. El síndrome del impostor te está jodiendo. Guía honesta para entenderlo y superarlo.',
  keywords: 'síndrome del impostor trabajo, me siento un fraude en el trabajo, no merezco mi puesto, ansiedad laboral, inseguridad profesional',
  openGraph: {
    title: 'Síndrome del Impostor en el Trabajo: Por Qué Crees Que No Vales',
    description: 'Guía honesta para entender y superar el síndrome del impostor.',
    url: 'https://carrera.negoia.com/sindrome-impostor-trabajo',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/sindrome-impostor-trabajo',
  },
}

export default function SindromeImpostorTrabajo() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Síndrome del Impostor en el Trabajo: Por Qué Crees Que No Vales",
    "datePublished": "2026-03-16",
    "dateModified": "2026-03-16",
    "author": { "@type": "Organization", "name": "carrera.negoia.com" }
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es normal sentir que no merezco mi trabajo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Más normal de lo que crees. El 70% de profesionales lo experimenta al menos una vez. No eres especial por sentirlo. Lo que te hace diferente es si decides quedarte atrapado en esa sensación o hacer algo al respecto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué siento que me van a pillar en el trabajo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Porque tu cerebro está comparando lo que TÚ sabes de ti mismo (con todas tus dudas y errores internos) con lo que VES de los demás (su versión pulida y segura). Es una comparación injusta. Ellos también tienen un monólogo interno de mierda, solo que no lo ves."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si tengo síndrome del impostor o simplemente no estoy cualificado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pregunta simple: ¿has conseguido y mantenido el trabajo? ¿Completas las tareas? ¿Alguien te ha despedido por incompetencia? Si las respuestas son sí, sí y no, tienes síndrome del impostor. Si te despidieron o no puedes hacer el trabajo básico, eso es otra cosa."
        }
      }
    ]
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
      
      <main className="min-h-screen bg-slate-900 text-slate-100">
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Síndrome del Impostor en el Trabajo: Por Qué Crees Que No Vales
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Tienes un trabajo decente. La gente parece confiar en ti. Pero por dentro, 
              estás esperando el día que alguien descubra que no tienes ni idea de lo que haces.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Bienvenido al club de los que creen que los van a pillar
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Cada reunión importante, ese pensamiento: "hoy es el día que se dan cuenta". 
              Cada email del jefe, ese microsegundo de pánico antes de abrirlo. 
              Cada proyecto nuevo, esa certeza de que <em>esta vez sí</em> que la cagas.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Pero aquí estás. Todavía con trabajo. Todavía sin que nadie haya descubierto 
              al "fraude" que crees ser. Curioso, ¿no?
            </p>
            <p className="text-slate-300 leading-relaxed">
              A lo mejor, solo a lo mejor, <strong>el fraude eres tú mintiéndote a ti mismo</strong> 
              sobre tu propia incompetencia.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Por qué tu cerebro te la está jugando
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              El síndrome del impostor funciona así: tú ves TU película interior completa 
              —tus dudas, tus errores, las veces que tuviste que buscar algo en Google— 
              mientras de los demás solo ves el tráiler editado.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Tu compañero que parece tan seguro en las reuniones? También está improvisando. 
              Tu jefa que parece saberlo todo? Tiene sus propias 3 de la mañana mirando al techo.
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong>La diferencia no es que ellos sean más competentes. 
              Es que no se paran a cuestionarse cada cinco minutos.</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Test rápido: ¿impostor o incompetente de verdad?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Responde honestamente:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>¿Conseguiste el trabajo sin mentir en el CV? ✓</li>
              <li>¿Has pasado el periodo de prueba? ✓</li>
              <li>¿La mayoría de tus tareas las completas sin que te echen la bronca? ✓</li>
              <li>¿Nadie te ha despedido por incompetencia en los últimos años? ✓</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mb-4">
              Si has marcado todo: <strong>no eres un impostor, eres alguien con un monólogo interno 
              de mierda</strong>. Que es distinto.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Si no pasaste el test... a lo mejor necesitas formación real, no artículos de autoayuda.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Las 4 variantes del impostor (elige la tuya)
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">1. El Perfeccionista</h3>
                <p className="text-slate-300">
                  "Si no está perfecto, es que no valgo". Te machacas por el 5% que falta 
                  en lugar de celebrar el 95% que sí lograste. El éxito nunca es suficiente.
                </p>
              </div>

              <div className="bg-slate-800/50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">2. El Experto</h3>
                <p className="text-slate-300">
                  "No sé lo suficiente todavía". Haces otro curso, lees otro libro, 
                  pero nunca te sientes listo. Spoiler: nunca te sentirás listo.
                </p>
              </div>

              <div className="bg-slate-800/50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">3. El Solista</h3>
                <p className="text-slate-300">
                  "Si pido ayuda, demuestro que no valgo". Así que te ahogas solo 
                  en lugar de pedir el flotador que está al lado.
                </p>
              </div>

              <div className="bg-slate-800/50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">4. El Genio Natural</h3>
                <p className="text-slate-300">
                  "Si me cuesta, es que no sirvo". Confundes esfuerzo con incompetencia. 
                  Las cosas difíciles son difíciles para todos, no solo para ti.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Qué hacer con esto (sin coaching de Instagram)
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                  1. Colecciona pruebas de que no eres un desastre
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Un archivo (físico o digital) con: emails de felicitación, proyectos completados, 
                  feedback positivo. Cuando el impostor ataque, ábrelo. Los hechos contra las sensaciones.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                  2. Di "no sé" en voz alta (y que no pase nada)
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  La próxima vez que no sepas algo: "No lo sé, pero lo averiguo". 
                  Verás que nadie te despide. Verás que es lo que hacen todos los profesionales reales.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                  3. Habla con alguien que admiras profesionalmente
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Pregúntale si alguna vez se ha sentido fraude. Te garantizo que la respuesta 
                  te sorprenderá. Y te aliviará.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                  4. Acepta que "suficientemente bueno" es suficiente
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  El 80% bien hecho y entregado a tiempo vale más que el 100% que nunca entregas 
                  porque "no está listo todavía".
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              El plot twist que no esperabas
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Las personas que sufren síndrome del impostor suelen ser <strong>más competentes que la media</strong>. 
              Los incompetentes de verdad no dudan de sí mismos (efecto Dunning-Kruger, búscalo).
            </p>
            <p className="text-slate-300 leading-relaxed">
              Así que, irónicamente, el hecho de que dudes tanto de ti mismo 
              es probable señal de que <strong>eres mejor profesional de lo que crees</strong>.
            </p>
          </section>

          <section className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              ¿Y si el problema no es el impostor, sino que no sabes qué hacer con tu carrera?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              A veces el síndrome del impostor es una señal más profunda: estás en un trabajo 
              que no encaja con lo que realmente sabes hacer bien. Cuando trabajas desde tus 
              fortalezas reales, la sensación de fraude desaparece.
            </p>
            <Link 
              href="/?utm_source=seo&utm_medium=blog&utm_campaign=sindrome_impostor&utm_content=cta_principal"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Descubre en qué eres realmente bueno →
            </Link>
          </section>

          <section className="mb-12 bg-slate-800/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Preguntas que te estás haciendo
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-200">¿Es normal sentir que no merezco mi trabajo?</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Más normal de lo que crees. El 70% de profesionales lo experimenta al menos una vez. 
                  No eres especial por sentirlo. Lo que te hace diferente es si decides quedarte 
                  atrapado en esa sensación o hacer algo al respecto.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">¿Por qué siento que me van a pillar?</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Porque tu cerebro está comparando lo que TÚ sabes de ti mismo con lo que VES de los demás. 
                  Es una comparación injusta. Ellos también tienen un monólogo interno de mierda, solo que no lo ves.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">¿Y si realmente no estoy cualificado?</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Pregunta simple: ¿has conseguido y mantenido el trabajo? ¿Completas las tareas? 
                  Si sí, tienes síndrome del impostor, no incompetencia real.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center py-8 border-t border-slate-700">
            <p className="text-slate-400 mb-4">
              ¿No sabes qué camino profesional encaja contigo?
            </p>
            <Link 
              href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=sindrome_impostor&utm_content=cta_encuesta"
              className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
            >
              Responde 5 preguntas y te ayudamos a clarificarlo →
            </Link>
          </section>

        </article>
      </main>
    </>
  )
}
