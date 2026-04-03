'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Shield, TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

export default function SuperarMiedoCambiarTrabajo() {
  const utmBase = 'utm_source=seo&utm_medium=blog&utm_campaign=miedo_cambiar_trabajo'
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cómo superar el miedo a cambiar de trabajo: guía práctica para 2026",
    "description": "El 44% de los españoles dejaría su trabajo sin oferta cerrada. Aprende a gestionar el miedo al cambio laboral con técnicas probadas.",
    "author": {
      "@type": "Organization",
      "name": "NegoIA Carrera"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NegoIA Carrera",
      "url": "https://carrera.negoia.com"
    },
    "datePublished": "2026-04-03",
    "dateModified": "2026-04-03"
  }
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es normal tener miedo a cambiar de trabajo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totalmente normal. El 56% de los trabajadores españoles solo dejaría su empleo con otra oferta cerrada. El miedo al cambio es una respuesta evolutiva de protección. La diferencia está en si ese miedo te paraliza o lo usas como señal para prepararte mejor."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si mi miedo a cambiar es racional o irracional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El miedo racional se basa en datos: no tienes ahorros, no tienes habilidades actualizadas, tienes responsabilidades sin margen. El miedo irracional se basa en proyecciones negativas sin evidencia: 'nadie me contratará', 'no soy suficientemente bueno'. Escribe tu miedo y pregúntate: ¿qué evidencia real tengo de que esto pasará?"
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo es normal estar en un trabajo antes de cambiar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El 'job hopping' ya no tiene el estigma de antes. Entre 2-4 años es una duración aceptable. Menos de 1 año repetidamente puede levantar preguntas, pero si puedes explicar qué aprendiste y por qué cambias, no es un problema. Lo importante no es el tiempo, sino si estás creciendo."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          
          {/* Header */}
          <header className="mb-12">
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 inline-block">
              ← Volver a inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Cómo superar el miedo a cambiar de trabajo
              <span className="text-indigo-400"> (sin tirarte a la piscina vacía)</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              El 44% de los españoles dejaría su trabajo sin tener otra oferta cerrada. 
              El otro 56% sigue paralizado. ¿En qué grupo estás tú — y cuál quieres estar?
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
              <span>⏱️ 7 min lectura</span>
              <span>•</span>
              <span>Actualizado abril 2026</span>
            </div>
          </header>

          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-slate-300 mb-4">
              Llevas meses (o años) pensando en cambiar. Cada domingo por la noche sientes ese nudo. 
              Cada lunes miras la pantalla preguntándote si hay algo mejor.
            </p>
            <p className="text-lg text-slate-300 mb-4">
              Pero no te mueves.
            </p>
            <p className="text-lg text-slate-300 mb-4">
              No porque no tengas opciones. No porque el mercado esté mal (de hecho, el 60% de los 
              españoles se plantea cambiar de trabajo en 2026, según La Razón). Sino porque el miedo 
              te tiene congelado.
            </p>
            <p className="text-lg text-slate-300">
              Esta guía no es para convencerte de que cambies. Es para que <strong className="text-white">tomes una decisión consciente</strong> — 
              que te quedes porque eliges quedarte, o que cambies porque decides cambiar. 
              No porque el miedo decidió por ti.
            </p>
          </section>

          {/* Normalizar el miedo */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Brain className="text-indigo-400" />
              Primero: tu miedo no es debilidad. Es biología.
            </h2>
            <p className="text-slate-300 mb-4">
              El cerebro humano está diseñado para preferir lo conocido, aunque sea malo, 
              sobre lo desconocido, aunque sea mejor. Esto se llama <strong className="text-white">aversión a la pérdida</strong>: 
              perder €100 duele el doble de lo que alegra ganar €100.
            </p>
            <p className="text-slate-300 mb-4">
              Aplicado al trabajo: perder tu sueldo actual (seguro) pesa más que ganar un mejor sueldo (incierto).
            </p>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 my-6">
              <h3 className="font-semibold text-indigo-400 mb-3">📊 Los datos que tu miedo no conoce:</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>44%</strong> de españoles dejaría su trabajo sin oferta cerrada (vs 39% en 2024)</li>
                <li>• <strong>36%</strong> planea cambiar de trabajo en menos de 12 meses</li>
                <li>• <strong>1 de cada 3</strong> se plantea cambiar por estrés laboral</li>
                <li>• <strong>Millennials (65%)</strong> y Gen Z (62%) ya consideran el cambio</li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">Fuentes: InfoJobs, Personio, Gallup 2025-2026</p>
            </div>
            
            <p className="text-slate-300">
              No estás solo. No estás loco. El miedo es universal. La diferencia está en qué haces con él.
            </p>
          </section>

          {/* Los 5 miedos reales */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="text-yellow-400" />
              Los 5 miedos reales (y cómo desactivarlos)
            </h2>
            
            <p className="text-slate-300 mb-6">
              No todos los miedos son iguales. Algunos son señales útiles. Otros son trampas mentales. 
              Aquí te doy el antídoto para cada uno:
            </p>

            {/* Miedo 1 */}
            <div className="bg-slate-800/30 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">1. "¿Y si no encuentro nada mejor?"</h3>
              <p className="text-slate-400 text-sm mb-3">Tipo: irracional (en la mayoría de casos)</p>
              <p className="text-slate-300 mb-3">
                Este miedo asume que tu valor en el mercado es bajo. Pero si llevas años trabajando, 
                tienes habilidades que otros necesitan — aunque tú no las veas.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-indigo-400 font-medium mb-2">🔧 Antídoto:</p>
                <p className="text-slate-300">
                  Antes de decidir nada, haz un inventario real de tus habilidades. No lo que pone en tu CV — 
                  lo que realmente sabes hacer. Incluye las cosas que haces "sin pensar" porque para ti son 
                  obvias (spoiler: para otros no lo son).
                </p>
              </div>
            </div>

            {/* Miedo 2 */}
            <div className="bg-slate-800/30 border-l-4 border-orange-500 rounded-r-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">2. "No tengo ahorros suficientes"</h3>
              <p className="text-slate-400 text-sm mb-3">Tipo: racional (puede ser legítimo)</p>
              <p className="text-slate-300 mb-3">
                Este sí es un factor real. Si vives al límite, un salto sin red es imprudente.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-indigo-400 font-medium mb-2">🔧 Antídoto:</p>
                <p className="text-slate-300">
                  Calcula tu "colchón de libertad": gastos fijos mensuales × 3 meses. Si no lo tienes, 
                  no cambies aún — pero empieza a construirlo mientras buscas. Puedes buscar activamente 
                  <strong> mientras trabajas</strong>. No necesitas renunciar para explorar opciones.
                </p>
              </div>
            </div>

            {/* Miedo 3 */}
            <div className="bg-slate-800/30 border-l-4 border-yellow-500 rounded-r-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">3. "Tengo 40/45/50 años, nadie me contratará"</h3>
              <p className="text-slate-400 text-sm mb-3">Tipo: parcialmente irracional</p>
              <p className="text-slate-300 mb-3">
                El edadismo existe — 82% de mayores de 45 años lo ha experimentado. Pero también existe 
                una demanda brutal de profesionales senior que pueden resolver problemas, no solo ejecutar tareas.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-indigo-400 font-medium mb-2">🔧 Antídoto:</p>
                <p className="text-slate-300">
                  Tu edad es una desventaja en empresas que buscan mano de obra barata. Es una ventaja 
                  en empresas que buscan criterio, estabilidad y capacidad de gestionar complejidad. 
                  <strong> Deja de aplicar a las primeras y enfócate en las segundas.</strong>
                </p>
              </div>
            </div>

            {/* Miedo 4 */}
            <div className="bg-slate-800/30 border-l-4 border-blue-500 rounded-r-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">4. "¿Y si el nuevo trabajo es peor?"</h3>
              <p className="text-slate-400 text-sm mb-3">Tipo: legítimo (pero gestionable)</p>
              <p className="text-slate-300 mb-3">
                Es posible. A veces cambias de trabajo y acabas en uno peor. Pero aquí está el truco: 
                si ya lo hiciste una vez, puedes hacerlo de nuevo. El cambio es una habilidad que mejora con la práctica.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-indigo-400 font-medium mb-2">🔧 Antídoto:</p>
                <p className="text-slate-300">
                  En las entrevistas, entrevista tú también. Pregunta: "¿Cuál es el mayor desafío del equipo ahora mismo?", 
                  "¿Por qué dejó el anterior?", "¿Cómo es un día típico?". Si no te dejan preguntar, ya tienes tu respuesta.
                </p>
              </div>
            </div>

            {/* Miedo 5 */}
            <div className="bg-slate-800/30 border-l-4 border-purple-500 rounded-r-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">5. "¿Qué pensarán los demás?"</h3>
              <p className="text-slate-400 text-sm mb-3">Tipo: irracional (casi siempre)</p>
              <p className="text-slate-300 mb-3">
                Los demás están demasiado ocupados con sus propios miedos para juzgar los tuyos. 
                Y los que sí opinan... probablemente llevan años en trabajos que odian.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-indigo-400 font-medium mb-2">🔧 Antídoto:</p>
                <p className="text-slate-300">
                  Imagínate dentro de 5 años, explicándole a alguien más joven por qué te quedaste en 
                  un trabajo que no te gustaba. ¿Te gusta esa versión de ti? Esa es tu respuesta.
                </p>
              </div>
            </div>
          </section>

          {/* El test de los 3 escenarios */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-green-400" />
              El test de los 3 escenarios (10 minutos)
            </h2>
            <p className="text-slate-300 mb-6">
              Este ejercicio te ayuda a pasar del miedo abstracto a la planificación concreta. 
              Coge papel y escribe:
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-red-400 mb-2">Escenario 1: El peor caso realista</h3>
                <p className="text-slate-300 mb-2">
                  Cambias de trabajo y en 3 meses te despiden. ¿Qué pasaría exactamente? 
                  ¿Cuánto tiempo podrías aguantar? ¿Qué harías?
                </p>
                <p className="text-slate-400 text-sm">
                  Escríbelo con números y plazos concretos. La mayoría de veces, el peor caso no es tan catastrófico como tu mente sugiere.
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-yellow-400 mb-2">Escenario 2: El caso probable</h3>
                <p className="text-slate-300 mb-2">
                  Cambias y el nuevo trabajo es... normal. Ni increíble ni horrible. Un poco mejor en unas cosas, 
                  un poco peor en otras. ¿Estarías mejor que ahora?
                </p>
                <p className="text-slate-400 text-sm">
                  Este es el escenario más probable. Y normalmente, incluso este es una mejora.
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-green-400 mb-2">Escenario 3: El mejor caso realista</h3>
                <p className="text-slate-300 mb-2">
                  Cambias y encaja. Mejor ambiente, mejor sueldo, proyectos que te motivan. 
                  ¿Cómo sería tu vida en 1 año?
                </p>
                <p className="text-slate-400 text-sm">
                  No hablo de fantasías. Hablo de lo que es posible si eliges bien.
                </p>
              </div>
            </div>
            
            <p className="text-slate-300 mt-6">
              <strong className="text-white">La pregunta clave:</strong> Si no cambias nada, ¿cuál de los 3 escenarios 
              es tu futuro garantizado? Probablemente ninguno — tu futuro es quedarte exactamente donde estás. 
              ¿Eso es lo que quieres?
            </p>
          </section>

          {/* El plan de 30 días */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="text-blue-400" />
              El plan de 30 días (sin renunciar a nada)
            </h2>
            <p className="text-slate-300 mb-6">
              No tienes que tomar grandes decisiones. Solo pequeñas acciones que te den información real:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="bg-indigo-500/20 text-indigo-400 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <h3 className="font-semibold text-white">Semana 1: Claridad interna</h3>
                  <p className="text-slate-300">
                    Lista 3 cosas que no aguantas más de tu trabajo actual. Lista 3 cosas que necesitas 
                    en el siguiente. Sin esto claro, cualquier cambio es un salto a ciegas.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="bg-indigo-500/20 text-indigo-400 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <h3 className="font-semibold text-white">Semana 2: Exploración de mercado</h3>
                  <p className="text-slate-300">
                    Dedica 30 minutos al día a mirar ofertas (sin aplicar todavía). Objetivo: entender 
                    qué buscan, qué pagan, qué habilidades valoran. Esto es información, no compromiso.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="bg-indigo-500/20 text-indigo-400 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <h3 className="font-semibold text-white">Semana 3: Actualización de assets</h3>
                  <p className="text-slate-300">
                    Actualiza tu CV y LinkedIn. No para publicarlo — para tenerlo listo. Cuando llegue 
                    la oportunidad, no quieres estar redactando a las 11pm.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="bg-indigo-500/20 text-indigo-400 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">4</span>
                <div>
                  <h3 className="font-semibold text-white">Semana 4: Primer movimiento real</h3>
                  <p className="text-slate-300">
                    Aplica a 3 ofertas que te interesen de verdad. No las "fáciles" — las que realmente 
                    te motivarían. Y contacta a 2 personas de tu red que trabajen en sectores que te interesan.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-slate-300 mt-6">
              Al final de los 30 días tendrás información real: cómo está el mercado, qué valoran, 
              cuánto te responden. Eso es 100x más útil que seguir dándole vueltas en tu cabeza.
            </p>
          </section>

          {/* CTA principal */}
          <section className="mb-12 bg-gradient-to-br from-indigo-900/50 to-purple-900/30 rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold mb-4">
              ¿No sabes qué roles encajan contigo?
            </h2>
            <p className="text-slate-300 mb-6">
              Gran parte del miedo viene de no saber hacia dónde ir. Si supieras exactamente qué roles 
              valoran tus habilidades (y cuánto pagan), el cambio sería mucho menos intimidante.
            </p>
            <p className="text-slate-300 mb-6">
              En 15 minutos puedes descubrir los roles donde ya encajas, con datos de salario reales 
              y un plan concreto para cada uno.
            </p>
            <Link
              href={`/start?${utmBase}&utm_content=cta_principal`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Descubrir mis opciones <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* Resumen */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="text-green-400" />
              En resumen
            </h2>
            
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>El miedo a cambiar es biológico, no personal. El 56% de trabajadores lo siente.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>No todos los miedos son iguales: algunos son señales útiles, otros son trampas mentales.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>El test de los 3 escenarios convierte miedo abstracto en análisis concreto.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Puedes explorar el mercado sin renunciar — información antes que decisión.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>La peor decisión no es equivocarte. Es no decidir y dejar que el miedo decida por ti.</span>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
            
            <div className="space-y-4">
              <details className="bg-slate-800/30 rounded-xl p-5 border border-slate-700 cursor-pointer group">
                <summary className="font-semibold text-white flex justify-between items-center">
                  ¿Es normal tener miedo a cambiar de trabajo?
                  <span className="text-indigo-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-300 mt-3">
                  Totalmente normal. El 56% de los trabajadores españoles solo dejaría su empleo con otra 
                  oferta cerrada. El miedo al cambio es una respuesta evolutiva de protección. La diferencia 
                  está en si ese miedo te paraliza o lo usas como señal para prepararte mejor.
                </p>
              </details>
              
              <details className="bg-slate-800/30 rounded-xl p-5 border border-slate-700 cursor-pointer group">
                <summary className="font-semibold text-white flex justify-between items-center">
                  ¿Cómo sé si mi miedo a cambiar es racional o irracional?
                  <span className="text-indigo-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-300 mt-3">
                  El miedo racional se basa en datos: no tienes ahorros, no tienes habilidades actualizadas, 
                  tienes responsabilidades sin margen. El miedo irracional se basa en proyecciones negativas 
                  sin evidencia: "nadie me contratará", "no soy suficientemente bueno". Escribe tu miedo y 
                  pregúntate: ¿qué evidencia real tengo de que esto pasará?
                </p>
              </details>
              
              <details className="bg-slate-800/30 rounded-xl p-5 border border-slate-700 cursor-pointer group">
                <summary className="font-semibold text-white flex justify-between items-center">
                  ¿Cuánto tiempo es normal estar en un trabajo antes de cambiar?
                  <span className="text-indigo-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-300 mt-3">
                  El "job hopping" ya no tiene el estigma de antes. Entre 2-4 años es una duración aceptable. 
                  Menos de 1 año repetidamente puede levantar preguntas, pero si puedes explicar qué aprendiste 
                  y por qué cambias, no es un problema. Lo importante no es el tiempo, sino si estás creciendo.
                </p>
              </details>
            </div>
          </section>

          {/* CTA footer */}
          <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center">
            <p className="text-slate-300 mb-4">
              El primer paso para superar el miedo es saber hacia dónde podrías ir.
            </p>
            <Link
              href={`/start?${utmBase}&utm_content=cta_footer`}
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Descubrir qué roles encajan conmigo <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* Footer nav */}
          <footer className="mt-12 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              © 2026 NegoIA Carrera · 
              <Link href="/como-saber-si-cambiar-de-trabajo" className="text-indigo-400 hover:text-indigo-300 ml-2">
                ¿Debo cambiar de trabajo?
              </Link>
              <span className="mx-2">·</span>
              <Link href="/como-hacer-cv-cambio-carrera" className="text-indigo-400 hover:text-indigo-300">
                CV para cambio de carrera
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
