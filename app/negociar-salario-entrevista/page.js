import Link from 'next/link';

export const metadata = {
  title: 'Cómo Negociar el Salario en una Entrevista (Guía 2026) | Carrera.NegoIA',
  description: 'Aprende a negociar tu salario con confianza. Incluye la nueva ley de transparencia salarial, frases exactas que funcionan y los 5 errores que te cuestan dinero.',
  keywords: 'negociar salario entrevista, cómo pedir más sueldo, negociación salarial, transparencia salarial 2026, cuánto pedir en entrevista',
  openGraph: {
    title: 'Cómo Negociar el Salario en una Entrevista (Guía 2026)',
    description: 'La guía que habría querido tener antes de dejar €8.000 al año sobre la mesa por no saber negociar.',
    type: 'article',
  },
};

export default function NegociarSalarioEntrevista() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
            📅 Actualizado marzo 2026 — incluye nueva ley de transparencia salarial
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Cómo Negociar el Salario en una Entrevista
            <span className="block text-indigo-400 mt-2">(Sin Parecer Codicioso ni Perder la Oferta)</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            La guía que habría querido tener antes de aceptar mi primer trabajo "bien pagado" y descubrir 6 meses después que mi compañero ganaba €8.000 más al año haciendo exactamente lo mismo.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        
        {/* Intro */}
        <section className="mb-12">
          <p className="text-lg text-slate-300 mb-6">
            Negociar el salario da miedo. Lo sé. El 90% de candidatos acepta la primera oferta sin rechistar, y el 70% de los que lo hacen dicen que se arrepienten.
          </p>
          <p className="text-lg text-slate-300 mb-6">
            El problema no es que seas malo negociando. Es que nadie te enseñó cómo funciona esto. Y las empresas lo saben.
          </p>
          <p className="text-lg text-slate-300">
            Esta guía te da exactamente lo que necesitas: <strong>qué decir, cuándo decirlo, y cómo responder cuando te preguntan "¿cuáles son tus expectativas salariales?"</strong> sin sudar frío.
          </p>
        </section>

        {/* Big change 2026 */}
        <section className="mb-12 p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">🚨 Lo que cambia en junio 2026: Ley de Transparencia Salarial</h2>
          <p className="text-slate-300 mb-4">
            A partir del <strong>7 de junio de 2026</strong>, las empresas de más de 100 empleados están obligadas a publicar los rangos salariales en las ofertas de trabajo. Esto cambia todo.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-slate-300"><strong>Antes:</strong> Llegabas a ciegas, la empresa tenía toda la información.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-slate-300"><strong>Ahora:</strong> Puedes ver el rango antes de aplicar. Tu poder de negociación sube.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-slate-300"><strong>El truco:</strong> Apunta al 75-90% del rango publicado si tienes experiencia sólida. Las empresas publican rangos amplios esperando pagar en el medio.</span>
            </div>
          </div>
        </section>

        {/* When to negotiate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Cuándo Hablar de Dinero (y Cuándo NO)</h2>
          
          <div className="space-y-6">
            <div className="p-5 bg-red-900/20 border border-red-500/30 rounded-xl">
              <h3 className="font-bold text-red-300 mb-2">❌ NUNCA en la primera entrevista (si puedes evitarlo)</h3>
              <p className="text-slate-300">
                Si te preguntan expectativas salariales en el primer contacto, di: <em>"Prefiero entender mejor el rol antes de hablar de números. ¿Podrían compartir el rango que manejan para esta posición?"</em>
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Excepción: si la oferta ya publica el rango (ley 2026), puedes confirmar que estás dentro de ese rango.
              </p>
            </div>
            
            <div className="p-5 bg-green-900/20 border border-green-500/30 rounded-xl">
              <h3 className="font-bold text-green-300 mb-2">✓ El mejor momento: cuando ya quieren contratarte</h3>
              <p className="text-slate-300">
                Después de la entrevista final, cuando dicen "queremos hacerte una oferta" o "eres nuestro candidato favorito". Ahí tienes máximo poder de negociación.
              </p>
            </div>

            <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
              <h3 className="font-bold text-slate-200 mb-2">📋 La regla de oro</h3>
              <p className="text-slate-300">
                Quien menciona un número primero, pierde poder. Haz que la empresa diga su número antes que tú.
              </p>
            </div>
          </div>
        </section>

        {/* The exact phrases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5 Frases Exactas que Puedes Usar (Copia y Pega)</h2>
          
          <div className="space-y-6">
            <div className="p-5 bg-slate-800/50 rounded-xl border-l-4 border-indigo-500">
              <h3 className="font-semibold text-indigo-300 mb-2">1. Cuando te preguntan expectativas demasiado pronto:</h3>
              <p className="text-slate-200 italic">
                "Estoy abierto a discutirlo una vez entienda mejor el alcance del rol. ¿Podrían compartir el rango presupuestado?"
              </p>
            </div>

            <div className="p-5 bg-slate-800/50 rounded-xl border-l-4 border-indigo-500">
              <h3 className="font-semibold text-indigo-300 mb-2">2. Cuando la oferta es baja pero te interesa el trabajo:</h3>
              <p className="text-slate-200 italic">
                "Me entusiasma la oportunidad. Basándome en mi experiencia con [logro específico] y el mercado actual, esperaba algo más cercano a [tu número]. ¿Hay flexibilidad?"
              </p>
            </div>

            <div className="p-5 bg-slate-800/50 rounded-xl border-l-4 border-indigo-500">
              <h3 className="font-semibold text-indigo-300 mb-2">3. Cuando te dicen que el presupuesto está cerrado:</h3>
              <p className="text-slate-200 italic">
                "Entiendo las limitaciones. ¿Podemos explorar otras formas de compensación? Por ejemplo, [bonus de firma, revisión a los 6 meses, más días de vacaciones, trabajo remoto]."
              </p>
            </div>

            <div className="p-5 bg-slate-800/50 rounded-xl border-l-4 border-indigo-500">
              <h3 className="font-semibold text-indigo-300 mb-2">4. Cuando tienes otra oferta (la más poderosa):</h3>
              <p className="text-slate-200 italic">
                "Tengo otra propuesta que supera esta cifra, pero prefiero este rol por [razón genuina]. ¿Podemos cerrar la diferencia?"
              </p>
            </div>

            <div className="p-5 bg-slate-800/50 rounded-xl border-l-4 border-indigo-500">
              <h3 className="font-semibold text-indigo-300 mb-2">5. Cuando aceptas pero quieres dejar la puerta abierta:</h3>
              <p className="text-slate-200 italic">
                "Acepto con gusto. ¿Podemos acordar una revisión salarial a los 6 meses basada en resultados?"
              </p>
            </div>
          </div>
        </section>

        {/* 5 mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5 Errores que Te Cuestan Miles de Euros</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
              <span className="text-2xl">1️⃣</span>
              <div>
                <h3 className="font-semibold text-red-300">Decir tu salario actual</h3>
                <p className="text-slate-400">Tu salario pasado no define tu valor futuro. En muchos países ya es ilegal que te lo pregunten. Si insisten, di: "Prefiero enfocarme en el valor que aporto a esta posición."</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
              <span className="text-2xl">2️⃣</span>
              <div>
                <h3 className="font-semibold text-red-300">Dar un número exacto en vez de rango</h3>
                <p className="text-slate-400">"Busco 45.000" te deja sin espacio. "Busco entre 45.000 y 52.000 dependiendo del paquete completo" te da flexibilidad.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
              <span className="text-2xl">3️⃣</span>
              <div>
                <h3 className="font-semibold text-red-300">Aceptar en el momento</h3>
                <p className="text-slate-400">Siempre pide 24-48 horas para "revisarlo con calma". Esto te da tiempo para negociar sin presión y muestra profesionalidad.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
              <span className="text-2xl">4️⃣</span>
              <div>
                <h3 className="font-semibold text-red-300">Olvidar el paquete completo</h3>
                <p className="text-slate-400">Bonus, acciones, seguro médico, formación, días de vacaciones extra... A veces suman más que un aumento de base. Negocia el paquete, no solo el número.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
              <span className="text-2xl">5️⃣</span>
              <div>
                <h3 className="font-semibold text-red-300">No tener alternativas</h3>
                <p className="text-slate-400">Sin otra oferta o la opción de rechazar, no tienes poder real. Nunca negocies desde la desesperación. Si necesitas el trabajo ya, acepta, pero busca alternativas para la próxima vez.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Cómo Investigar el Salario de Mercado (5 min)</h2>
          
          <p className="text-slate-300 mb-6">
            Antes de cualquier negociación, necesitas saber qué paga el mercado. Estas son las fuentes más fiables en España:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">📊 Glassdoor / Indeed Salarios</h3>
              <p className="text-slate-400 text-sm">Datos reales reportados por empleados. Busca tu rol + ciudad.</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">📋 Estudios de Page Personnel / Hays</h3>
              <p className="text-slate-400 text-sm">Informes anuales de bandas salariales por sector. Gratis en PDF.</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">💬 LinkedIn (con cuidado)</h3>
              <p className="text-slate-400 text-sm">Pregunta a contactos de confianza qué se paga realmente. La gente suele ayudar si preguntas bien.</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">📢 Ofertas con rango publicado</h3>
              <p className="text-slate-400 text-sm">Con la ley 2026, cada vez más ofertas muestran el rango. Úsalas como referencia aunque no apliques.</p>
            </div>
          </div>
        </section>

        {/* Psychology section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">La Psicología que Nadie Te Cuenta</h2>
          
          <div className="space-y-6 text-slate-300">
            <p>
              <strong className="text-white">El recruiter NO es tu enemigo.</strong> Su trabajo es cerrar la posición, no pagarte lo mínimo posible. Si les gustas, quieren que aceptes. Esto te da más poder del que crees.
            </p>
            <p>
              <strong className="text-white">Una oferta no se retira por negociar.</strong> En 15 años de mercado laboral, he visto exactamente 0 ofertas retiradas por pedir más dinero de forma profesional. Lo peor que puede pasar es que digan "no hay margen" — y sigues con la oferta original.
            </p>
            <p>
              <strong className="text-white">El silencio es tu arma secreta.</strong> Cuando la empresa dice un número, no respondas inmediatamente. Cuenta hasta 5 en tu cabeza. El silencio incómodo hace que la otra parte llene el vacío — a veces mejorando la oferta sin que pidas nada.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 p-8 bg-gradient-to-br from-indigo-900/30 to-slate-800/50 rounded-2xl border border-indigo-500/30 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Y si primero supieras exactamente cuánto vales?</h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Antes de negociar, necesitas saber qué roles encajan contigo y cuánto pagan realmente. En 15 minutos descubres tu mapa de habilidades y los rangos salariales de cada rol que te encaja.
          </p>
          <Link 
            href="/start?utm_source=seo&utm_medium=blog&utm_campaign=negociar_salario&utm_content=cta_principal"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Descubrir mi valor de mercado →
          </Link>
          <p className="text-slate-500 text-sm mt-4">15 minutos · Gratis · Sin registro</p>
        </section>

        {/* Secondary CTA */}
        <section className="mt-8 p-6 bg-slate-800/30 rounded-xl text-center border border-slate-700">
          <p className="text-slate-300 mb-4">¿Ya sabes qué quieres pero no cómo posicionarte?</p>
          <Link 
            href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=negociar_salario&utm_content=cta_encuesta"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Haz nuestra encuesta rápida de 2 minutos →
          </Link>
        </section>

        {/* FAQ Schema */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
          
          <div className="space-y-6">
            <div className="p-5 bg-slate-800/30 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">¿Puedo negociar si soy junior?</h3>
              <p className="text-slate-400">
                Sí, pero con menos margen. Enfócate en beneficios no salariales (formación, flexibilidad, revisión a los 6 meses) y demuestra que investigaste el mercado.
              </p>
            </div>
            <div className="p-5 bg-slate-800/30 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">¿Y si me preguntan directamente cuánto gano ahora?</h3>
              <p className="text-slate-400">
                No tienes obligación de responder. Di: "Mi salario actual no refleja mi valor de mercado, por eso busco un cambio. Estoy buscando X basándome en [logros] y el rango del mercado."
              </p>
            </div>
            <div className="p-5 bg-slate-800/30 rounded-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">¿Cuánto margen de negociación hay normalmente?</h3>
              <p className="text-slate-400">
                Entre un 5% y un 15% sobre la oferta inicial es normal. Más del 20% es raro salvo que tengas ofertas competidoras o skills muy demandados.
              </p>
            </div>
          </div>
        </section>

      </article>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cómo Negociar el Salario en una Entrevista (Guía 2026)",
            "description": "Aprende a negociar tu salario con confianza. Incluye la nueva ley de transparencia salarial, frases exactas que funcionan y los 5 errores que te cuestan dinero.",
            "author": {
              "@type": "Organization",
              "name": "Carrera.NegoIA"
            },
            "datePublished": "2026-03-27",
            "dateModified": "2026-03-27"
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
                "name": "¿Puedo negociar salario si soy junior?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, pero con menos margen. Enfócate en beneficios no salariales (formación, flexibilidad, revisión a los 6 meses) y demuestra que investigaste el mercado."
                }
              },
              {
                "@type": "Question",
                "name": "¿Y si me preguntan directamente cuánto gano ahora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No tienes obligación de responder. Di: 'Mi salario actual no refleja mi valor de mercado, por eso busco un cambio. Estoy buscando X basándome en mis logros y el rango del mercado.'"
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto margen de negociación hay normalmente?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Entre un 5% y un 15% sobre la oferta inicial es normal. Más del 20% es raro salvo que tengas ofertas competidoras o skills muy demandados."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}
