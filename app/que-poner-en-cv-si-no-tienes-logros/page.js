import Link from 'next/link'

export const metadata = {
  title: 'Qué Poner en el CV Cuando No Tienes Logros — Guía Honesta (2026)',
  description: 'La mayoría no tiene logros con números en el CV. No porque no haya hecho nada, sino porque nadie les enseñó a verlos. Guía práctica para transformar lo que hiciste en argumentos de contratación.',
  keywords: 'qué poner en el CV sin logros, CV sin logros, cómo describir experiencia CV, logros profesionales CV, CV sin experiencia logros',
  openGraph: {
    title: 'Qué Poner en el CV Cuando No Tienes Logros',
    description: 'No tienes logros con números para el CV. O eso crees. Aquí la guía honesta.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/que-poner-en-cv-si-no-tienes-logros',
  },
}

export default function QuePoner() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-900/50 rounded-full mb-4">
            Guía práctica · 6 min lectura
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Qué poner en el CV cuando sientes que no tienes logros
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            "Es que yo no tengo logros que poner." Lo dice casi todo el mundo. Y casi todo el mundo está equivocado. El problema no es lo que hiciste — es que nadie te enseñó a verlo como logro.
          </p>
        </header>

        <div className="prose prose-lg prose-invert max-w-none">

          <p className="text-slate-300 leading-relaxed">
            Hay una brecha enorme entre "mis responsabilidades del día a día" y "un logro con impacto medible". Los consejos de CV siempre dicen lo mismo: "usa verbos de acción, cuantifica resultados, pon logros concretos". Pero no te explican qué hacer cuando tu trabajo era contestar emails, gestionar incidencias o coordinarte con otros equipos.
          </p>

          <p className="text-slate-300 leading-relaxed">
            Esto no es una guía motivacional. Es una guía técnica para extraer lo que ya tienes.
          </p>

          <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-xl p-6 my-8">
            <h2 className="text-xl font-bold text-white mb-3">Si solo tienes 10 minutos, haz esto ahora</h2>
            <ol className="text-slate-300 space-y-3 pl-5 list-decimal">
              <li>Abre tu último puesto y apunta 3 situaciones concretas: una mejora, un problema que resolviste y una tarea que todo el mundo te acababa delegando.</li>
              <li>Al lado de cada una, añade escala real: personas, volumen, frecuencia, tiempo o dinero. Aunque sea una estimación prudente.</li>
              <li>Convierte cada frase en esta estructura: <span className="text-white">acción + contexto + impacto</span>. No busques sonar brillante, busca sonar creíble.</li>
            </ol>
            <p className="text-slate-400 text-sm mt-4">
              Ejemplo rápido: “llevaba incidencias” pasa a “resolví unas 25 incidencias semanales de clientes clave y evité que escalaran a dirección en cierres de mes”.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            El error de base: confundir responsabilidad con logro
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Una responsabilidad es lo que se esperaba que hicieras. Un logro es lo que pasó gracias a que lo hiciste bien (o diferente al resto).
          </p>

          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-6 my-8">
            <p className="text-red-200 font-medium mb-3">❌ Responsabilidades disfrazadas de logro:</p>
            <ul className="text-slate-300 space-y-2">
              <li>"Responsable de atención al cliente"</li>
              <li>"Gestión de agenda y coordinación de equipos"</li>
              <li>"Supervisión del proceso de facturación"</li>
            </ul>
            <p className="text-slate-400 text-sm mt-3">Esto es lo que hacías. No dice nada sobre cómo lo hacías o qué impacto tenía.</p>
          </div>

          <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 my-8">
            <p className="text-green-200 font-medium mb-3">✅ Lo mismo convertido en logro:</p>
            <ul className="text-slate-300 space-y-2">
              <li>"Gestioné equipo de atención al cliente de 4 personas; bajamos tiempo de respuesta de 48h a 12h en 3 meses"</li>
              <li>"Coordiné agenda ejecutiva de 3 directivos durante reorganización — sin ningún conflicto de reuniones en 8 meses"</li>
              <li>"Detecté error sistemático en facturación que generaba €8.000 de retrasos mensuales; implementé check mensual que eliminó el problema"</li>
            </ul>
          </div>

          <p className="text-slate-300 leading-relaxed">
            ¿Ves la diferencia? No inventamos nada. Solo añadimos contexto, escala y consecuencia.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            Las 5 preguntas que desbloquean tus logros reales
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Para cada puesto que hayas tenido, hazte estas preguntas. No necesitas responderlas todas — con una o dos por trabajo es suficiente.
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">1. ¿Algo mejoró gracias a ti?</h3>
              <p className="text-slate-300">Velocidad, calidad, coste, satisfacción del cliente, tasa de errores. Si sí: cuantifica cuánto, aunque sea una estimación honesta.</p>
              <p className="text-slate-400 text-sm mt-2">Ejemplo: "Antes tardábamos 2 días en responder. Después de organizar las colas, 4 horas."</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">2. ¿Hiciste algo por primera vez en esa empresa?</h3>
              <p className="text-slate-300">Implementar un proceso que no existía, crear una plantilla que todos empezaron a usar, montar el onboarding de nuevos empleados.</p>
              <p className="text-slate-400 text-sm mt-2">No hace falta que sea una revolución. "Creé el primer manual de procedimientos del departamento" es un logro real.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">3. ¿Apagaste algún incendio?</h3>
              <p className="text-slate-300">Crisis, errores de otros que tuviste que resolver, situaciones urgentes que gestionaste. Estos momentos cuentan mucho.</p>
              <p className="text-slate-400 text-sm mt-2">Ejemplo: "Cuando el proveedor canceló 48h antes del evento, reubiqué toda la logística y el evento salió sin incidencias."</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">4. ¿A qué escala trabajabas?</h3>
              <p className="text-slate-300">Volumen de clientes, tamaño del equipo, presupuesto gestionado, número de proveedores, pedidos por día. La escala convierte lo ordinario en relevante.</p>
              <p className="text-slate-400 text-sm mt-2">"Procesé facturas" vs "Procesé 300+ facturas mensuales de €2M de facturación total."</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">5. ¿Alguien valoró tu trabajo explícitamente?</h3>
              <p className="text-slate-300">Un email de reconocimiento, que te ascendieran, que te ampliaran responsabilidades, que te pidieran repetir algo. Eso es evidencia de impacto.</p>
              <p className="text-slate-400 text-sm mt-2">"Me dieron el equipo de Madrid a gestionar adicional tras 6 meses" — eso no pasa por casualidad.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            Qué hacer cuando de verdad no hay números
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Algunos trabajos no generan métricas visibles. No pasa nada. Hay alternativas:
          </p>

          <ul className="text-slate-300 space-y-4 my-6">
            <li>
              <strong className="text-white">Contexto + acción + resultado cualitativo.</strong> "En un período de fusión empresarial con alta incertidumbre, mantuve al equipo informado y coordinado — ningún miembro clave se fue durante el proceso." Sin números, pero con impacto claro.
            </li>
            <li>
              <strong className="text-white">Comparativa implícita.</strong> "Mejoré el proceso de onboarding de clientes que estaba pendiente desde hacía 18 meses." No necesitas decir cuánto mejoró — el "pendiente 18 meses" ya dice que nadie más lo había resuelto.
            </li>
            <li>
              <strong className="text-white">Reconocimiento como proxy.</strong> Si no tienes métricas pero te dieron más responsabilidades, un aumento o un reconocimiento explícito, menciónalo. "Elegida como referente de equipo para formación de nuevas incorporaciones" vale más que cualquier porcentaje genérico.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            La trampa del "pero es que no hice nada especial"
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Esto es síndrome del impostor aplicado al CV. Si llevas 5-15 años trabajando y crees que no hiciste nada especial, hay dos explicaciones:
          </p>

          <ol className="text-slate-300 space-y-3 my-6">
            <li><strong>1. Que lo que hiciste te parezca obvio porque eres bueno en ello.</strong> Las cosas que se te dan bien las infravaloras. Si gestionabas conflictos de equipo "sin drama" es porque tienes una habilidad real que otros no tienen.</li>
            <li><strong>2. Que no tengas el vocabulario para describir el impacto.</strong> No sabes que "organicé el archivo de contratos" en realidad fue "implementé sistema de gestión documental que redujo el tiempo de búsqueda de documentos de 20 a 2 minutos".</li>
          </ol>

          <p className="text-slate-300 leading-relaxed">
            La solución es hacer el ejercicio de las 5 preguntas con alguien externo — un colega, un amigo, una IA. Cuando describes tu trabajo en voz alta, la otra persona ve logros que tú das por sentados.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            Plantilla práctica: transforma tu experiencia en 3 pasos
          </h2>

          <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-6 my-8">
            <p className="text-indigo-200 font-medium mb-4">Fórmula: [Verbo de acción] + [qué hiciste] + [contexto o escala] + [resultado o impacto]</p>

            <div className="space-y-4 text-slate-300">
              <div>
                <p className="text-slate-400 text-sm mb-1">Antes:</p>
                <p>"Atendí a clientes y resolví sus dudas"</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Después:</p>
                <p className="text-white">"Gestioné +80 consultas semanales de clientes B2B, logrando que el 92% no escalara a soporte técnico"</p>
              </div>
            </div>

            <hr className="border-slate-600 my-4" />

            <div className="space-y-4 text-slate-300">
              <div>
                <p className="text-slate-400 text-sm mb-1">Antes:</p>
                <p>"Hice tareas administrativas para el departamento"</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Después:</p>
                <p className="text-white">"Centralicé la gestión administrativa de 3 departamentos (12 personas), eliminando duplicidades y liberando ~4h/semana por persona"</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            Preguntas frecuentes
          </h2>

          <div className="space-y-6 my-8">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">¿Puedo inventar números para que suene mejor?</h3>
              <p className="text-slate-300">No. Pero sí puedes estimar. Si sabes que antes el proceso tardaba 2 días y ahora tarda medio, di "reduje el tiempo un 75%". No necesitas el dato exacto del Excel de 2019 — una estimación honesta que puedas defender en entrevista es válida.</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">¿Qué hago si mi trabajo era rutinario y realmente no cambié nada?</h3>
              <p className="text-slate-300">Entonces el foco va a la escala y consistencia: cuánto volumen manejabas, durante cuánto tiempo, con qué nivel de complejidad. "Gestioné el ciclo completo de pedidos de una cartera de 40 clientes durante 3 años, sin incidencias de facturación" es honesto y relevante.</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">¿Cuántos logros debería incluir por trabajo?</h3>
              <p className="text-slate-300">Dos o tres bien escritos valen más que ocho mediocres. Para trabajos de hace más de 5 años, con uno o dos es suficiente. Guarda los mejores para los más recientes.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            El problema real: no sabes qué te diferencia
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Si llevas horas frente al CV sin saber qué poner, el bloqueo raramente es "no tengo logros". Casi siempre es "no tengo claro qué me hace diferente de los otros 200 candidatos".
          </p>

          <p className="text-slate-300 leading-relaxed">
            Eso es un problema de autoconocimiento profesional, no de redacción de CV. Y tiene solución específica.
          </p>

          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/50 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold text-white mb-4">¿Sigues sin saber qué te diferencia?</h3>
            <p className="text-slate-300 mb-3">
              Nuestro análisis de IA lee tu CV y tu experiencia, extrae las habilidades que tienes de verdad (no las que crees tener), y te dice qué roles encajan mejor con tu perfil real.
            </p>
            <p className="text-slate-300 mb-6">
              El resultado no es genérico: incluye por qué encajas en cada rol, qué gaps tienes y qué puedes hacer esta semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/start?utm_source=seo&utm_medium=blog&utm_campaign=cv_sin_logros&utm_content=cta_principal"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
              >
                Ver qué roles encajan con mi perfil →
              </a>
              <a
                href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=cv_sin_logros&utm_content=cta_encuesta"
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
              >
                Empezar con encuesta rápida →
              </a>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 mt-12">
            <p className="text-slate-400 text-sm">
              Última actualización: abril 2026 · Basado en análisis de perfiles reales y entrevistas con reclutadores españoles.
            </p>
          </div>

        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Qué Poner en el CV Cuando No Tienes Logros — Guía Honesta (2026)",
            "description": "La mayoría no tiene logros con números en el CV. No porque no haya hecho nada, sino porque nadie les enseñó a verlos. Guía práctica.",
            "author": { "@type": "Organization", "name": "Carrera NegoIA" },
            "publisher": { "@type": "Organization", "name": "Carrera NegoIA", "url": "https://carrera.negoia.com" },
            "datePublished": "2026-04-08",
            "dateModified": "2026-04-11",
            "mainEntityOfPage": "https://carrera.negoia.com/que-poner-en-cv-si-no-tienes-logros"
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
                "name": "¿Puedo inventar números en el CV para que suene mejor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Pero sí puedes estimar. Si sabes que antes el proceso tardaba 2 días y ahora tarda medio, di 'reduje el tiempo un 75%'. Una estimación honesta que puedas defender en entrevista es válida."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué poner en el CV si mi trabajo era rutinario y no cambié nada?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El foco va a la escala y consistencia: cuánto volumen manejabas, durante cuánto tiempo, con qué nivel de complejidad. 'Gestioné el ciclo completo de pedidos de 40 clientes durante 3 años sin incidencias de facturación' es honesto y relevante."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuántos logros debería incluir por trabajo en el CV?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dos o tres bien escritos valen más que ocho mediocres. Para trabajos de hace más de 5 años, con uno o dos es suficiente."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}
