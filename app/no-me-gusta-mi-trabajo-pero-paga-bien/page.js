import Link from 'next/link'

export const metadata = {
  title: 'No Me Gusta Mi Trabajo Pero Paga Bien: ¿Qué Hago? | Guía 2026',
  description: 'Odias tu trabajo pero el sueldo es bueno. El dilema más común de la vida adulta. Guía práctica para decidir si quedarte, preparar tu salida, o cambiar sin suicidarte económicamente.',
  keywords: 'no me gusta mi trabajo pero paga bien, odio mi trabajo pero necesito el dinero, trabajo bien pagado pero infeliz, golden handcuffs',
  openGraph: {
    title: 'No Me Gusta Mi Trabajo Pero Paga Bien: ¿Qué Hago?',
    description: 'El dilema más común de la vida adulta. Guía práctica sin postureo.',
    url: 'https://carrera.negoia.com/no-me-gusta-mi-trabajo-pero-paga-bien',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/no-me-gusta-mi-trabajo-pero-paga-bien',
  },
}

export default function NoMeGustaTrabajoPeroPagaBien() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "No Me Gusta Mi Trabajo Pero Paga Bien: ¿Qué Hago?",
    "datePublished": "2026-03-14",
    "dateModified": "2026-03-14",
    "author": { "@type": "Organization", "name": "carrera.negoia.com" }
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es malo quedarse en un trabajo que no te gusta por el dinero?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende del coste real. Si son 6-12 meses mientras construyes tu salida, es estrategia inteligente. Si son 10 años y cada domingo por la noche sientes un vacío en el estómago, probablemente estás pagando un precio que no aparece en tu nómina."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si estoy en golden handcuffs o simplemente tengo un buen trabajo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pregúntate: ¿Si mañana te ofrecieran el mismo sueldo en otro sitio, te irías sin pensarlo? Si la respuesta es sí, estás en golden handcuffs. Si dudas, quizá el problema no es el trabajo en sí."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es posible dejar un trabajo bien pagado sin arruinarte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, pero requiere planificación. La mayoría de transiciones exitosas se preparan 6-18 meses antes de la salida. Colchón financiero + habilidades transferibles + red de contactos activa = transición segura."
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
              No Me Gusta Mi Trabajo Pero Paga Bien: ¿Qué Hago?
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              El dilema más común de la vida adulta. No estás solo, y sí, hay salida. 
              Pero necesitas ser honesto contigo mismo.
            </p>
          </header>

          <div className="prose prose-invert prose-slate max-w-none">
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                El problema que nadie te cuenta
              </h2>
              <p>
                Tienes un buen sueldo. Quizá mejor que la media. Puedes pagar el alquiler o la hipoteca, 
                salir a cenar, irte de vacaciones. Desde fuera, todo parece bien.
              </p>
              <p>
                Pero cada domingo por la noche sientes algo. Un peso. Un vacío. La semana que viene 
                será igual que ésta, que fue igual que la anterior. Y la siguiente.
              </p>
              <p>
                <strong>El problema es que quejarte parece ingratitud.</strong> "Con la de gente que está 
                en paro, ¿y tú quejándote de un trabajo bien pagado?" Te lo dices tú mismo. Te lo dicen otros.
              </p>
              <p>
                Pero aquí está la realidad: <em>el dinero paga las facturas, no la vida que quieres vivir</em>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Las "golden handcuffs" son reales
              </h2>
              <p>
                Se llaman <strong>esposas doradas</strong>: beneficios tan buenos que te atan a un trabajo 
                que, en el fondo, no quieres. No es solo el sueldo. Es el coche de empresa, el seguro médico, 
                los bonus, las stock options, el "si aguanto 2 años más ya tendré el plan de pensiones..."
              </p>
              <p>
                El problema es que esos 2 años se convierten en 5. Y luego en 10. 
                Y un día miras atrás y piensas: <em>"¿Cómo he llegado aquí?"</em>
              </p>
              <p>
                <strong>Lo que parece seguridad puede ser una trampa.</strong> Una trampa cómoda, pero trampa.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Antes de decidir nada: diagnóstico honesto
              </h2>
              <p>No todos los "no me gusta mi trabajo" son iguales. Pregúntate:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>
                  <strong>¿Es el trabajo o es el momento?</strong> A veces odiamos el trabajo cuando 
                  en realidad estamos quemados, pasando una mala racha personal, o simplemente necesitamos vacaciones.
                </li>
                <li>
                  <strong>¿Es la empresa o es la profesión?</strong> Quizá no odias ser abogado, 
                  odias ser abogado <em>en ese despacho</em>. Cambiar de empresa puede ser suficiente.
                </li>
                <li>
                  <strong>¿Es todo el trabajo o son partes concretas?</strong> Si el 80% te parece 
                  aceptable y el 20% te destroza, quizá puedes renegociar responsabilidades.
                </li>
                <li>
                  <strong>¿Cuánto tiempo llevas así?</strong> 3 meses malos son una fase. 
                  3 años sintiéndote muerto por dentro es un patrón.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Las 3 opciones reales (sin fantasías)
              </h2>
              
              <h3 className="text-xl font-medium text-white mt-6 mb-3">1. Quedarte y aceptarlo</h3>
              <p>
                No es derrota si es decisión consciente. Si decides que el sueldo compensa el coste 
                emocional <em>por ahora</em>, está bien. Pero pon fecha de revisión: "En 6 meses evalúo. 
                Si sigo igual, activo Plan B."
              </p>
              <p>
                Lo que NO funciona: quedarte quejándote sin decidir nada. Eso es la peor opción disfrazada de prudencia.
              </p>

              <h3 className="text-xl font-medium text-white mt-6 mb-3">2. Quedarte mientras preparas la salida</h3>
              <p>
                <strong>Esta es la opción inteligente para la mayoría.</strong> Usas el sueldo actual 
                para financiar tu transición:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>Ahorras 6-12 meses de gastos (colchón de emergencia)</li>
                <li>Desarrollas habilidades para el siguiente capítulo</li>
                <li>Activas tu red de contactos (sin prisa, sin desesperación)</li>
                <li>Exploras opciones en paralelo (freelance, proyectos laterales, entrevistas)</li>
              </ul>
              <p>
                <strong>Horizonte típico:</strong> 6-18 meses. No es rápido, pero es seguro.
              </p>

              <h3 className="text-xl font-medium text-white mt-6 mb-3">3. Irte ya</h3>
              <p>
                A veces es la única opción. Si tu trabajo está destruyendo tu salud mental, tu relación 
                de pareja, o tu capacidad de funcionar, salir ya puede ser lo más inteligente. 
                El sueldo no vale una depresión.
              </p>
              <p>
                Pero hazlo con los ojos abiertos: necesitas tener claro qué viene después, 
                aunque sea "3 meses de descanso y luego busco".
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                El ejercicio que nadie hace (y deberías)
              </h2>
              <p>
                Coge papel y boli. Escribe:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-slate-300">
                <li>
                  <strong>¿Cuánto dinero necesitas realmente?</strong> No cuánto ganas, cuánto necesitas 
                  para vivir dignamente. Muchas veces descubres que el "tren de vida" que crees necesitar 
                  es negociable.
                </li>
                <li>
                  <strong>¿Qué harías si te despidieran mañana?</strong> Esa respuesta te dice mucho 
                  sobre lo que realmente quieres.
                </li>
                <li>
                  <strong>¿Qué habilidades tienes que valen dinero fuera de tu empresa actual?</strong> 
                  Probablemente más de las que crees.
                </li>
              </ol>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Lo que sí funciona (y lo que no)
              </h2>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <p className="font-medium text-green-400 mb-2">✓ Funciona:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-300 mb-4">
                  <li>Planificar la salida mientras cobras</li>
                  <li>Hablar con gente que ya hizo la transición que quieres</li>
                  <li>Probar cosas en paralelo (proyectos, freelance, cursos específicos)</li>
                  <li>Tener una fecha límite para decidir</li>
                </ul>
                <p className="font-medium text-red-400 mb-2">✗ No funciona:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-300">
                  <li>Quejarte sin hacer nada diferente</li>
                  <li>Esperar que las cosas cambien solas</li>
                  <li>Irte enfadado sin plan</li>
                  <li>Hacer otro máster "por si acaso" (procrastinación disfrazada de productividad)</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Tu siguiente paso (hoy, no mañana)
              </h2>
              <p>
                No necesitas tenerlo todo claro. Solo necesitas <strong>un paso</strong>.
              </p>
              <p>
                Si no sabes qué habilidades tienes o hacia dónde moverte, empieza por ahí. 
                Un mapa de tus habilidades reales (no lo que pone en tu LinkedIn) te da claridad 
                sobre qué opciones tienes.
              </p>
            </section>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 md:p-8 border border-blue-500/30 mt-12">
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Atrapado en un trabajo que pagas con tu bienestar?
              </h3>
              <p className="text-slate-300 mb-4">
                El primer paso para salir de las golden handcuffs es saber qué opciones tienes realmente. 
                Descubre qué habilidades transferibles tienes y qué roles encajan contigo.
              </p>
              <Link 
                href="/?utm_source=seo&utm_medium=blog&utm_campaign=no_me_gusta_trabajo&utm_content=cta_principal"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Analizar mis opciones reales →
              </Link>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-400 mb-3">¿Solo quieres orientación rápida? 90 segundos:</p>
              <Link 
                href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=no_me_gusta_trabajo&utm_content=cta_encuesta"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Hacer test de orientación →
              </Link>
            </div>

          </div>
        </article>
      </main>
    </>
  )
}
