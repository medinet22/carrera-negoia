'use client'

import Link from 'next/link'
import { ArrowRight, Target, Brain, TrendingUp, Clock, Users, CheckCircle2 } from 'lucide-react'

export default function ComoSaberTrabajoCorrecto() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="max-w-3xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-medium rounded-full mb-4">
            Autodiagnóstico profesional
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cómo saber si estás en el trabajo correcto (o si es hora de cambiar)
          </h1>
          <p className="text-slate-400 text-lg">
            El test de los 5 indicadores que te dice la verdad — sin humo motivacional
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Actualizado abril 2026 · 7 min lectura
          </p>
        </div>

        {/* Intro */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
            <p className="text-slate-300 m-0">
              <strong className="text-white">El dato incómodo:</strong> Según el último informe de Gallup (Q4 2025), 
              solo el 23% de empleados en España están "comprometidos" con su trabajo. El 77% restante 
              está en algún punto entre "neutral" y "activamente desenganchado". La pregunta no es si te pasa a ti 
              — es <em>cuánto</em>.
            </p>
          </div>

          <p className="text-slate-300">
            Llevas meses (o años) con esa sensación. No es odio — sería más fácil si lo fuera. 
            Es algo más difuso: domingos con nudo en el estómago, lunes que pesan, viernes que 
            son el único objetivo de la semana.
          </p>

          <p className="text-slate-300">
            Pero tampoco quieres ser esa persona que deja un trabajo "estable" por algo que no 
            puede definir. Necesitas datos, no corazonadas. Aquí tienes los 5 indicadores que 
            separan "esto es normal" de "esto no va".
          </p>

          {/* Indicador 1 */}
          <div className="bg-slate-800/30 border-l-4 border-indigo-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-semibold text-white m-0">1. El test del crecimiento: ¿Qué has aprendido en los últimos 6 meses?</h2>
            </div>
            <p className="text-slate-300 mb-4">
              No hablo de cursos que te mandó RRHH. Hablo de skills que ahora tienes y antes no. 
              Si te cuesta nombrar algo concreto, tu trabajo te está manteniendo — no desarrollando.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-300 font-medium mb-2">✅ Señal de que sí:</p>
                <p className="text-slate-400 text-sm m-0">
                  "Aprendí a negociar con proveedores difíciles" / "Ahora manejo Figma para prototipos" / 
                  "Desarrollé la capacidad de dar feedback a mi equipo sin drama"
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 font-medium mb-2">❌ Señal de que no:</p>
                <p className="text-slate-400 text-sm m-0">
                  "Básicamente hago lo mismo que hace 2 años" / "El único cambio fue una migración 
                  de herramienta que no pedí" / "No sabría qué poner si actualizo mi LinkedIn"
                </p>
              </div>
            </div>
          </div>

          {/* Indicador 2 */}
          <div className="bg-slate-800/30 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white m-0">2. El test del reloj: ¿Cómo pasa el tiempo?</h2>
            </div>
            <p className="text-slate-300 mb-4">
              No me refiero a si te gusta o no. Me refiero a la experiencia subjetiva del tiempo. 
              Mihaly Csikszentmihalyi lo llamó "flow" — cuando estás tan absorbido que el tiempo 
              desaparece.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-300 font-medium mb-2">✅ Señal de que sí:</p>
                <p className="text-slate-400 text-sm m-0">
                  "A veces levanto la vista y han pasado 3 horas" / "Hay tareas donde entro 
                  en modo concentración total"
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 font-medium mb-2">❌ Señal de que no:</p>
                <p className="text-slate-400 text-sm m-0">
                  "Miro el reloj cada 30 minutos" / "El día se hace eterno" / "Mis horas más 
                  productivas son cuando no estoy trabajando"
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4 italic">
              Nota: Si NUNCA experimentas flow en ninguna actividad (ni hobbies), el problema 
              puede no ser el trabajo — puede ser burnout generalizado. Diferente diagnóstico, 
              diferente solución.
            </p>
          </div>

          {/* Indicador 3 */}
          <div className="bg-slate-800/30 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-semibold text-white m-0">3. El test del espejo: ¿Te reconoces?</h2>
            </div>
            <p className="text-slate-300 mb-4">
              Cuando describes tu trabajo a alguien nuevo, ¿sientes que estás describiendo 
              quién eres — o lo que te pagan por hacer?
            </p>
            <p className="text-slate-300 mb-4">
              Este es el indicador más sutil pero el más revelador. Cuando hay alineación, 
              tu trabajo se siente como una extensión de ti. Cuando no la hay, se siente 
              como un disfraz que te pones de 9 a 6.
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-300 font-medium mb-2">Pregunta directa:</p>
              <p className="text-slate-400 m-0">
                Si mañana te despidieran, ¿te sentirías aliviado (aunque asustado)? 
                Si la respuesta es sí, ya tienes tu respuesta.
              </p>
            </div>
          </div>

          {/* Indicador 4 */}
          <div className="bg-slate-800/30 border-l-4 border-cyan-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white m-0">4. El test del techo: ¿Ves hacia dónde va esto?</h2>
            </div>
            <p className="text-slate-300 mb-4">
              No hablo de si vas a ser CEO. Hablo de si ves un camino que te interesa recorrer. 
              Si no puedes imaginarte en tu empresa/sector dentro de 3 años <em>y eso te da igual</em>, 
              estás en el lugar equivocado.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-300 font-medium mb-2">✅ Señal de que sí:</p>
                <p className="text-slate-400 text-sm m-0">
                  "Hay roles que me interesan y un camino para llegar" / "Mi jefe tiene un trabajo 
                  que me gustaría hacer algún día"
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 font-medium mb-2">❌ Señal de que no:</p>
                <p className="text-slate-400 text-sm m-0">
                  "Mi único plan es aguantar" / "No quiero el trabajo de nadie de mi equipo" / 
                  "Lo que hago hoy es lo mismo que haré en 5 años"
                </p>
              </div>
            </div>
          </div>

          {/* Indicador 5 */}
          <div className="bg-slate-800/30 border-l-4 border-rose-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-rose-400" />
              <h2 className="text-xl font-semibold text-white m-0">5. El test del cuerpo: ¿Qué dice tu físico?</h2>
            </div>
            <p className="text-slate-300 mb-4">
              Tu cuerpo sabe antes que tu mente. Dolor de cabeza crónico los domingos por la noche. 
              Insomnio que aparece los lunes. Tensión muscular que desaparece en vacaciones y vuelve 
              a la semana de volver.
            </p>
            <p className="text-slate-300 mb-4">
              <strong className="text-white">El dato:</strong> Un estudio de 2024 del Instituto de 
              Seguridad y Salud en el Trabajo mostró que el 67% de las bajas por ansiedad en España 
              están vinculadas a factores laborales — no a predisposición personal.
            </p>
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-300 font-medium mb-2">🚨 Señales de alarma:</p>
              <p className="text-slate-400 text-sm m-0">
                Cambios en sueño/apetito correlacionados con el trabajo · Síntomas físicos recurrentes 
                que los médicos no explican · Uso de alcohol/pantallas para "desconectar" del trabajo
              </p>
            </div>
          </div>

          {/* Interpretación */}
          <h2 className="text-2xl font-semibold text-white mt-12">Cómo interpretar tus resultados</h2>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <span className="text-green-400 font-bold text-xl">4-5</span>
                <div>
                  <p className="text-green-300 font-medium">indicadores positivos</p>
                  <p className="text-slate-400 text-sm m-0">
                    Estás en el trabajo correcto. Los días malos son normales — no confundas 
                    frustración puntual con desalineación estructural.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-amber-400 font-bold text-xl">2-3</span>
                <div>
                  <p className="text-amber-300 font-medium">indicadores positivos</p>
                  <p className="text-slate-400 text-sm m-0">
                    Zona gris. Antes de decidir nada, identifica qué indicadores fallan. 
                    A veces el problema es el rol específico, no la empresa. A veces es el sector entero.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-red-400 font-bold text-xl">0-1</span>
                <div>
                  <p className="text-red-300 font-medium">indicadores positivos</p>
                  <p className="text-slate-400 text-sm m-0">
                    No estás donde deberías. La pregunta ahora es <em>hacia dónde</em>, no <em>si</em>. 
                    Cada mes que pospongas la decisión es un mes que no recuperas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Qué hacer */}
          <h2 className="text-2xl font-semibold text-white mt-12">Qué hacer ahora (según tu resultado)</h2>

          <h3 className="text-xl font-semibold text-white mt-8">Si estás en 4-5: Protege lo que tienes</h3>
          <p className="text-slate-300">
            Parece obvio, pero mucha gente abandona trabajos buenos persiguiendo algo indefinido. 
            Si te funciona, optimiza dentro: negocia mejor, pide proyectos que te interesen, 
            construye relaciones.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8">Si estás en 2-3: Diagnóstico antes de acción</h3>
          <p className="text-slate-300">
            No renuncies mañana. Pero tampoco asumas que "esto es lo que hay". Tu siguiente paso 
            es entender <em>qué específicamente</em> no encaja: ¿Es el tipo de trabajo? ¿El sector? 
            ¿Tu jefe? ¿La cultura? Cada respuesta lleva a una solución diferente.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8">Si estás en 0-1: Plan de salida realista</h3>
          <p className="text-slate-300">
            No "tengo que dejarlo ya" — eso es pánico. Pero sí "en los próximos 3-6 meses, 
            quiero tener opciones claras". Eso significa: entender qué roles encajan contigo, 
            qué skills necesitas, y cómo posicionarte.
          </p>

          {/* CTA Principal */}
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-8 my-12 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              ¿Quieres saber hacia dónde ir?
            </h3>
            <p className="text-slate-300 mb-6">
              En 15 minutos identificamos tus habilidades reales (no las del CV) y te mostramos 
              5+ roles donde ya encajas — con datos de salario y gap analysis concreto.
            </p>
            <Link 
              href="/start?utm_source=seo&utm_medium=blog&utm_campaign=trabajo_correcto&utm_content=cta_principal"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors no-underline"
            >
              Descubrir mis opciones reales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* FAQ Schema */}
          <h2 className="text-2xl font-semibold text-white mt-12">Preguntas frecuentes</h2>

          <div className="space-y-6 mt-6">
            <div className="bg-slate-800/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Es normal tener días malos aunque esté en el trabajo correcto?
              </h3>
              <p className="text-slate-300 m-0">
                Absolutamente. El trabajo correcto no significa que cada día sea una fiesta. 
                Significa que la mayoría de indicadores son positivos, que estás creciendo, 
                y que ves un camino. Días malos → normal. Meses malos → señal de alarma.
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Cuánto tiempo debería darle antes de decidir que no es para mí?
              </h3>
              <p className="text-slate-300 m-0">
                Regla general: 6-12 meses para dar un veredicto justo (asumiendo que no hay 
                red flags obvias como ambiente tóxico o salud mental en riesgo). Menos de 6 meses 
                no te da suficiente exposición. Más de 18 meses sin mejora = estás postergando lo inevitable.
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Y si ningún trabajo me parece "correcto"?
              </h3>
              <p className="text-slate-300 m-0">
                Dos posibilidades: (1) No has encontrado tu encaje aún — necesitas explorar 
                roles que no conoces, y (2) Tienes expectativas poco realistas de lo que un trabajo 
                puede darte. La mayoría de gente está en el primer grupo. El análisis de habilidades 
                ayuda a descubrir roles que ni sabías que existían.
              </p>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 my-12 text-center">
            <p className="text-slate-300 mb-4">
              El siguiente paso no es renunciar — es saber hacia dónde ir.
            </p>
            <Link 
              href="/start?utm_source=seo&utm_medium=blog&utm_campaign=trabajo_correcto&utm_content=cta_footer"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium no-underline"
            >
              Empezar análisis gratuito <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Cómo saber si estás en el trabajo correcto (o si es hora de cambiar)",
              "description": "Test de 5 indicadores para saber si tu trabajo actual es el adecuado. Sin humo motivacional, con datos reales de 2025-2026.",
              "author": {
                "@type": "Organization",
                "name": "Carrera by NegoIA"
              },
              "publisher": {
                "@type": "Organization",
                "name": "NegoIA",
                "url": "https://negoia.com"
              },
              "datePublished": "2026-04-04",
              "dateModified": "2026-04-04"
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
                  "name": "¿Es normal tener días malos aunque esté en el trabajo correcto?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutamente. El trabajo correcto no significa que cada día sea una fiesta. Significa que la mayoría de indicadores son positivos, que estás creciendo, y que ves un camino. Días malos → normal. Meses malos → señal de alarma."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuánto tiempo debería darle antes de decidir que no es para mí?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Regla general: 6-12 meses para dar un veredicto justo (asumiendo que no hay red flags obvias). Menos de 6 meses no te da suficiente exposición. Más de 18 meses sin mejora = estás postergando lo inevitable."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Y si ningún trabajo me parece correcto?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dos posibilidades: no has encontrado tu encaje aún (necesitas explorar roles que no conoces) o tienes expectativas poco realistas. La mayoría está en el primer grupo. El análisis de habilidades ayuda a descubrir roles que ni sabías que existían."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </main>
  )
}
