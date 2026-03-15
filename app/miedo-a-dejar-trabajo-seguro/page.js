import Link from 'next/link'

export const metadata = {
  title: 'Miedo a Dejar un Trabajo Seguro: Guía Honesta para Decidir | 2026',
  description: 'Tienes miedo de dejar tu trabajo seguro. Es normal. Pero ¿es miedo racional o te está paralizando? Guía práctica para separar prudencia de parálisis y tomar una decisión real.',
  keywords: 'miedo a dejar trabajo seguro, miedo a cambiar de trabajo, ansiedad cambio laboral, no me atrevo a dejar mi trabajo',
  openGraph: {
    title: 'Miedo a Dejar un Trabajo Seguro: Guía Honesta para Decidir',
    description: 'Separar prudencia de parálisis. Guía práctica sin postureo.',
    url: 'https://carrera.negoia.com/miedo-a-dejar-trabajo-seguro',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/miedo-a-dejar-trabajo-seguro',
  },
}

export default function MiedoDejarTrabajoSeguro() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Miedo a Dejar un Trabajo Seguro: Guía Honesta para Decidir",
    "datePublished": "2026-03-15",
    "dateModified": "2026-03-15",
    "author": { "@type": "Organization", "name": "carrera.negoia.com" }
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es normal tener miedo a dejar un trabajo seguro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Completamente normal. El miedo a perder seguridad está cableado en tu cerebro desde hace miles de años. El problema no es sentir miedo, es dejar que el miedo tome todas tus decisiones por ti durante años."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si mi miedo es racional o me está paralizando?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Miedo racional: tienes hipoteca, cero ahorros, y quieres dejarlo mañana. Parálisis: llevas 5 años diciendo 'el año que viene' mientras no haces nada para preparar tu salida. La diferencia está en si el miedo te hace planificar o te hace congelarte."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si dejo mi trabajo seguro y me arrepiento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pasan dos cosas: 1) Aprendes algo sobre ti que no sabías, 2) Buscas otro trabajo. No es el fin del mundo. La mayoría de personas que dan el salto, incluso las que 'fracasan', dicen que no volverían atrás. El arrepentimiento real suele venir de no haberlo intentado."
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
              Miedo a Dejar un Trabajo Seguro: Guía Honesta para Decidir
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Llevas meses (o años) pensando en irte. Pero cada vez que te imaginas 
              dando el paso, algo se congela por dentro. Esta guía es para ti.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Primero: tu miedo no es estúpido
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vamos a ser claros desde el principio. Tener miedo a dejar un trabajo seguro 
              no te convierte en cobarde. Te convierte en <strong>adulto con responsabilidades</strong>.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              El problema es cuando el miedo deja de ser una señal útil y se convierte en 
              el piloto automático de tu vida. Cuando llevas 5 años diciendo "el próximo año" 
              mientras cada domingo por la noche sientes ese nudo en el estómago.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Hay una diferencia enorme entre <strong>prudencia</strong> (tengo un plan, estoy 
              preparándome) y <strong>parálisis</strong> (tengo miedo, así que no hago nada).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              El test honesto: ¿prudencia o parálisis?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Responde estas 4 preguntas sin engañarte:
            </p>
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <ol className="list-decimal list-inside space-y-4 text-slate-300">
                <li><strong>¿Cuánto tiempo llevas pensando en irte?</strong> Si son más de 2 años sin hacer nada concreto, probablemente es parálisis.</li>
                <li><strong>¿Qué has hecho en los últimos 6 meses para preparar tu salida?</strong> Cero = parálisis. Actualizar CV, hacer cursos, hablar con gente del sector = prudencia activa.</li>
                <li><strong>¿Tu "plan B" existe o es una fantasía vaga?</strong> "Algún día montaré algo" = fantasía. "Estoy ahorrando X€/mes y tengo 3 contactos en el sector Y" = plan real.</li>
                <li><strong>Si mañana te despidieran, ¿estarías aliviado o aterrado?</strong> Aliviado = estás en el sitio equivocado. Aterrado = quizá el trabajo no es tan malo, es el miedo genérico el que habla.</li>
              </ol>
            </div>
            <p className="text-slate-300 leading-relaxed">
              La mayoría de personas en parálisis responden: "más de 2 años", "nada concreto", 
              "fantasía vaga", "aliviado". Si te suena, no eres raro. Pero sí necesitas cambiar algo.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Por qué tu cerebro te sabotea
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Tu cerebro tiene un sesgo brutal hacia lo conocido. Se llama <strong>aversión a la pérdida</strong>: 
              perder algo duele el doble de lo que ganar algo alegra.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Esto significa que tu cerebro ve "trabajo seguro = lo que tienes" y "nuevo camino = potencial pérdida". 
              Aunque el trabajo seguro te esté costando salud, energía y años de vida.
            </p>
            <p className="text-slate-300 leading-relaxed">
              El problema es que <strong>"seguro" es una ilusión</strong>. Tu empresa puede despedirte mañana. 
              Tu sector puede desaparecer. Tu salud puede romperse por el estrés acumulado. 
              La única seguridad real es tu capacidad de adaptarte.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              El framework de los 3 escenarios
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              En lugar de "¿debería dejarlo?", pregúntate: "¿qué pasa en cada escenario realista?"
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Escenario A: Todo sale bien</h3>
                <p className="text-slate-300">
                  Dejas el trabajo, encuentras algo mejor (o montas algo), tu vida mejora. 
                  ¿Cómo se ve eso concretamente? ¿Qué estarías haciendo en 2 años?
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Escenario B: Sale regular</h3>
                <p className="text-slate-300">
                  Dejas el trabajo, tardas más de lo esperado en encontrar algo, pasas 6-12 meses 
                  complicados, pero acabas aterrizando en algo similar o ligeramente mejor. 
                  ¿Sobrevivirías? ¿Qué necesitas tener preparado?
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Escenario C: Sale mal</h3>
                <p className="text-slate-300">
                  Dejas el trabajo, no encuentras nada, quemas ahorros, tienes que volver 
                  a buscar trabajo "de lo que sea". ¿Qué tan probable es esto? ¿Puedes reducir el riesgo?
                </p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              La mayoría de gente paralizada <strong>solo piensa en el Escenario C</strong> como si fuera 100% probable. 
              Pero cuando lo analizas con datos reales (tu sector, tus habilidades, tu red), 
              suele ser mucho menos probable de lo que tu miedo te dice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Plan de acción: de parálisis a movimiento
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              No te voy a decir "deja tu trabajo mañana". Eso sería irresponsable. 
              Pero sí puedes hacer esto en las próximas 2 semanas:
            </p>
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Semana 1: Claridad</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong>Día 1-2:</strong> Escribe los 3 escenarios arriba con números reales (ahorros, gastos, tiempo).</li>
                <li><strong>Día 3-4:</strong> Lista tus habilidades transferibles. No las del CV, las reales.</li>
                <li><strong>Día 5-7:</strong> Habla con 2-3 personas que hayan hecho un cambio similar. LinkedIn frío funciona.</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Semana 2: Primer paso concreto</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong>Día 8-10:</strong> Define tu "número de libertad": ¿cuántos meses de gastos necesitas ahorrados para sentirte seguro?</li>
                <li><strong>Día 11-12:</strong> Empieza una acción semanal hacia tu salida (curso, contacto, proyecto paralelo).</li>
                <li><strong>Día 13-14:</strong> Pon fecha límite. No "algún día". Fecha real: "Si en [X meses] no he [Y], tomaré decisión [Z]".</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              El coste invisible de quedarte
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Tu cerebro calcula el riesgo de irte, pero rara vez calcula el riesgo de quedarte:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
              <li><strong>Coste de salud:</strong> Estrés crónico, insomnio, ansiedad del domingo. ¿Cuánto te costará en 10 años?</li>
              <li><strong>Coste de oportunidad:</strong> Cada año que pasas paralizado es un año que no inviertes en lo que realmente quieres hacer.</li>
              <li><strong>Coste de identidad:</strong> Te acostumbras a ser "el que aguanta". Eso se convierte en quien eres.</li>
              <li><strong>Coste de arrepentimiento:</strong> A los 50-60 años, ¿qué te dolerá más: haber intentado y fallado, o no haber intentado?</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              No estoy diciendo que dejarlo sea siempre la respuesta correcta. Pero quedarte 
              por parálisis (no por elección consciente) tiene un precio que no aparece en tu nómina.
            </p>
          </section>

          <section className="mb-12 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-8 border border-emerald-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">
              ¿No sabes ni por dónde empezar?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Si llevas tanto tiempo paralizado que ya no sabes qué se te da bien ni qué 
              querrías hacer, empieza por ahí. No por el trabajo perfecto, sino por entender 
              qué habilidades tienes y qué opciones reales existen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/?utm_source=seo&utm_medium=blog&utm_campaign=miedo_trabajo_seguro&utm_content=cta_principal"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
              >
                Descubrir mis opciones reales
              </Link>
              <Link 
                href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=miedo_trabajo_seguro&utm_content=cta_encuesta"
                className="inline-flex items-center justify-center px-6 py-3 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/30 font-medium rounded-lg transition-colors"
              >
                Test rápido de 90 segundos
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              TL;DR: Lo que necesitas recordar
            </h2>
            <div className="bg-slate-800 rounded-lg p-6">
              <ul className="space-y-3 text-slate-300">
                <li>✓ Tu miedo es normal, pero no puede dirigir tu vida indefinidamente</li>
                <li>✓ Prudencia = prepararte activamente. Parálisis = no hacer nada durante años</li>
                <li>✓ "Seguro" es una ilusión. Tu capacidad de adaptarte es la única seguridad real</li>
                <li>✓ Analiza los 3 escenarios con datos reales, no con el peor caso imaginario</li>
                <li>✓ El coste de quedarte paralizado también existe, aunque no lo veas en tu nómina</li>
                <li>✓ No tienes que dejarlo mañana. Pero sí tienes que empezar a moverte hoy</li>
              </ul>
            </div>
          </section>

          <footer className="border-t border-slate-700 pt-8">
            <p className="text-slate-400 text-sm mb-4">
              Actualizado: Marzo 2026. Escrito por alguien que también sintió ese miedo.
            </p>
            <Link 
              href="/"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              ← Volver a carrera.negoia.com
            </Link>
          </footer>

        </article>
      </main>
    </>
  )
}
