'use client'

import Link from 'next/link'

export default function EntrevistaTrabajoDespues40() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-indigo-600">Inicio</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Entrevista después de los 40</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Entrevista de trabajo después de los 40: lo que nadie te dice (y cómo prepararte de verdad)
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            El 82% de mayores de 45 años ha enfrentado edadismo en entrevistas. Pero hay formas de neutralizarlo. Sin humo, sin frases motivacionales vacías.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span>📖 7 min lectura</span>
            <span>•</span>
            <span>Actualizado marzo 2026</span>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <article className="px-4 pb-16">
        <div className="max-w-3xl mx-auto prose prose-lg prose-indigo">
          
          {/* Intro directa */}
          <p>
            Vamos al grano: si tienes más de 40 años y estás buscando trabajo, las estadísticas no son amables. En España, los mayores de 50 años tienen que enviar el doble de CVs para conseguir una entrevista. Y el 75% no ha tenido ni una sola en el último año.
          </p>
          
          <p>
            Pero hay una diferencia crucial entre los que se quedan estancados y los que consiguen el puesto: cómo gestionan la entrevista. Esto no va de "proyectar energía positiva" ni de trucos de PNL. Va de preparación estratégica.
          </p>

          {/* Sección 1 */}
          <h2>Lo que el entrevistador está pensando (aunque no lo diga)</h2>
          
          <p>
            Seamos honestos. Cuando tienes más de 40, el entrevistador tiene dudas específicas. No las va a verbalizar, pero ahí están:
          </p>
          
          <ul>
            <li><strong>"¿Aceptará un sueldo menor que su anterior puesto?"</strong> — Piensan que tienes expectativas altas</li>
            <li><strong>"¿Se llevará bien con un jefe de 32 años?"</strong> — Miedo al conflicto generacional</li>
            <li><strong>"¿Sabrá usar nuestras herramientas?"</strong> — Asumen incompetencia digital</li>
            <li><strong>"¿Se jubilará en 3 años?"</strong> — Ven riesgo de poca permanencia</li>
          </ul>
          
          <p>
            Tu trabajo no es ignorar estas dudas. Es resolverlas antes de que las pregunten.
          </p>

          {/* Sección 2 */}
          <h2>5 preguntas trampa y cómo responderlas sin mentir</h2>
          
          <h3>1. "¿Te supone un problema tener un jefe más joven?"</h3>
          
          <p><strong>Lo que quieren oír:</strong> Que no vas a ser difícil de gestionar.</p>
          
          <p><strong>Respuesta que funciona:</strong></p>
          <blockquote>
            "He trabajado con jefes de 25 y de 60. Lo que me importa es que la persona sepa lo que hace y que podamos comunicarnos bien. En [empresa anterior] mi responsable tenía 28 años y fue de los mejores managers que he tenido — aprendí bastante de cómo manejaba las reuniones de equipo."
          </blockquote>
          
          <p><em>Clave:</em> Un ejemplo concreto real mata cualquier duda abstracta.</p>

          <h3>2. "¿Cuáles son tus expectativas salariales?"</h3>
          
          <p><strong>Lo que quieren oír:</strong> Que no vas a pedir el doble de lo que tienen presupuestado.</p>
          
          <p><strong>Respuesta que funciona:</strong></p>
          <blockquote>
            "Estoy más enfocado en encontrar un proyecto donde pueda aportar que en maximizar el salario. He visto que el rango para este tipo de puesto está entre €X y €Y — estoy cómodo dentro de ese rango si el proyecto encaja."
          </blockquote>
          
          <p><em>Dato útil:</em> Desde junio 2026, las empresas en la UE están obligadas a incluir el rango salarial en las ofertas. Si no lo han hecho, puedes preguntar directamente.</p>

          <h3>3. "¿Cómo te mantienes actualizado tecnológicamente?"</h3>
          
          <p><strong>Lo que quieren oír:</strong> Que no van a tener que enseñarte Excel desde cero.</p>
          
          <p><strong>Respuesta que funciona:</strong></p>
          <blockquote>
            "El año pasado hice [curso específico] sobre [herramienta relevante]. Uso [3 herramientas concretas] a diario. Y cuando hay algo que no conozco, suelo tardar un par de semanas en ponerme al día — lo hice hace 6 meses con [ejemplo]."
          </blockquote>
          
          <p><em>Clave:</em> Nombres de herramientas concretas + ejemplo reciente = credibilidad instantánea.</p>

          <h3>4. "¿Dónde te ves en 5 años?"</h3>
          
          <p><strong>Lo que quieren oír:</strong> Que no te vas a ir en 6 meses ni a jubilarte.</p>
          
          <p><strong>Respuesta que funciona:</strong></p>
          <blockquote>
            "Quiero consolidarme en un equipo donde pueda aportar mi experiencia y seguir aprendiendo. No busco dar saltos cada año — busco estabilidad y un proyecto que me motive para los próximos 5-7 años."
          </blockquote>
          
          <p><em>Clave:</em> "Estabilidad" es música para sus oídos. Los juniors se van a los 18 meses.</p>

          <h3>5. "Cuéntame de una vez que hayas fallado"</h3>
          
          <p><strong>Lo que quieren oír:</strong> Que tienes autocrítica y aprendes.</p>
          
          <p><strong>Respuesta que funciona:</strong></p>
          <blockquote>
            "En [año], subestimé el tiempo que necesitaba [proyecto específico]. Prometí entregarlo en 3 semanas y tardé 5. Desde entonces, añado siempre un 30% de margen a mis estimaciones y comunico riesgos antes, no después."
          </blockquote>
          
          <p><em>Clave:</em> Fallo concreto + aprendizaje aplicado = madurez profesional.</p>

          {/* Sección 3 */}
          <h2>El truco de los 10 primeros minutos</h2>
          
          <p>
            Los estudios de selección son claros: la decisión se toma en los primeros 10 minutos. El resto es confirmación.
          </p>
          
          <p>
            Esto significa que tu objetivo no es "responder bien las preguntas". Tu objetivo es generar una impresión positiva antes de que empiecen las preguntas difíciles.
          </p>
          
          <p><strong>Cómo hacerlo:</strong></p>
          
          <ol>
            <li><strong>Llega con un comentario específico sobre la empresa.</strong> No "me gusta vuestra cultura". Algo como: "Vi que abrieron oficina en Valencia el mes pasado — ¿eso cambia cómo está estructurado el equipo?"</li>
            <li><strong>Menciona un logro con números en los primeros 3 minutos.</strong> "En mi último proyecto reduje el tiempo de entrega de 6 a 4 semanas" pesa más que 15 minutos de descripción genérica.</li>
            <li><strong>Haz una pregunta que demuestre que has investigado.</strong> "He leído que están migrando a [tecnología] — ¿cómo está siendo ese proceso?"</li>
          </ol>

          {/* Sección 4 */}
          <h2>Tu ventaja competitiva real (que probablemente infravaloras)</h2>
          
          <p>
            Cuando llevas 15-20 años trabajando, tienes algo que ningún junior puede comprar: has visto ciclos completos.
          </p>
          
          <ul>
            <li>Has visto proyectos fracasar y sabes detectar las señales</li>
            <li>Has gestionado crisis sin que cunda el pánico</li>
            <li>Conoces el valor de la documentación cuando todo el mundo tiene prisa</li>
            <li>Sabes cuándo una idea "innovadora" es en realidad algo que ya se intentó hace 10 años</li>
          </ul>
          
          <p>
            Eso tiene un nombre: <strong>juicio</strong>. Y las empresas que contratan bien lo saben valorar.
          </p>
          
          <p>
            El problema es que muchos candidatos +40 minimizan esto. Hablan de "experiencia" en abstracto. La clave es traducirlo a resultados: "En 2019 evité que lanzáramos un producto que habría fracasado — lo detecté porque había visto el mismo patrón en 2014".
          </p>

          {/* Sección 5 */}
          <h2>Checklist antes de la entrevista</h2>
          
          <div className="bg-indigo-50 p-6 rounded-xl my-8 not-prose">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">✅ 24h antes</h3>
            <ul className="space-y-2 text-gray-700">
              <li>☐ Buscar el nombre del entrevistador en LinkedIn</li>
              <li>☐ Leer las últimas 3 noticias de la empresa</li>
              <li>☐ Preparar 3 logros con números (€, %, tiempo)</li>
              <li>☐ Tener lista una pregunta específica sobre el equipo</li>
              <li>☐ Practicar la respuesta a "¿por qué este cambio ahora?"</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-indigo-900 mb-4 mt-6">✅ 1h antes</h3>
            <ul className="space-y-2 text-gray-700">
              <li>☐ Revisar el job description una vez más</li>
              <li>☐ Tener agua cerca (las entrevistas largas secan la garganta)</li>
              <li>☐ Si es online: probar cámara, micro, fondo neutro</li>
            </ul>
          </div>

          {/* Sección 6 - Qué hacer después */}
          <h2>Después de la entrevista</h2>
          
          <p>
            Envía un email de agradecimiento en las siguientes 24 horas. No tiene que ser largo:
          </p>
          
          <blockquote>
            "Gracias por la conversación de hoy. Me quedo especialmente interesado en [punto específico que mencionaron]. Quedo a disposición para cualquier información adicional que necesiten."
          </blockquote>
          
          <p>
            Si no tienes respuesta en 2 semanas, un follow-up breve es aceptable. Si después de eso siguen sin responder, asume que es un no y sigue adelante.
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl my-12 not-prose">
            <h3 className="text-2xl font-bold mb-4">
              ¿Sabes qué roles encajan con tu perfil?
            </h3>
            <p className="text-indigo-100 mb-6">
              Antes de la entrevista, conviene saber dónde tienes más probabilidades de éxito. Nuestro análisis te muestra roles que quizá no habías considerado — con datos de salario y gaps específicos.
            </p>
            <Link 
              href="/start?utm_source=seo&utm_medium=blog&utm_campaign=entrevista_40&utm_content=cta_principal"
              className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Descubrir mis roles →
            </Link>
          </div>

          {/* FAQ Schema */}
          <h2>Preguntas frecuentes</h2>
          
          <h3>¿Es normal tardar más en encontrar trabajo después de los 40?</h3>
          <p>
            Sí, los datos lo confirman: los mayores de 45 necesitan enviar aproximadamente el doble de CVs para conseguir una entrevista. Pero la buena noticia es que, una vez en la entrevista, la tasa de conversión es similar — la barrera principal es llegar a esa fase.
          </p>
          
          <h3>¿Debo ocultar mi edad en el CV?</h3>
          <p>
            No recomiendo mentir, pero sí omitir información irrelevante. No incluyas el año de graduación si fue hace más de 15 años. Limita la experiencia laboral a los últimos 10-12 años. Y asegúrate de que tu foto (si la incluyes) es reciente y profesional.
          </p>
          
          <h3>¿Cómo compito contra candidatos más jóvenes?</h3>
          <p>
            No compitas en su terreno. Ellos tienen energía y bajo coste. Tú tienes juicio, red de contactos y capacidad de resolver problemas complejos sin supervisión constante. Enfatiza situaciones donde tu experiencia evitó errores costosos o aceleró resultados.
          </p>

          {/* CTA footer */}
          <div className="border-t border-gray-200 pt-8 mt-12 not-prose">
            <p className="text-gray-600 mb-4">
              <strong>¿Preparando un cambio de carrera?</strong> Descubre qué roles se ajustan a tu perfil antes de empezar a enviar CVs.
            </p>
            <Link 
              href="/start?utm_source=seo&utm_medium=blog&utm_campaign=entrevista_40&utm_content=cta_footer"
              className="text-indigo-600 font-semibold hover:text-indigo-800"
            >
              Hacer el análisis gratuito →
            </Link>
          </div>
        </div>
      </article>

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Entrevista de trabajo después de los 40: lo que nadie te dice (y cómo prepararte de verdad)",
            "description": "Guía práctica para superar entrevistas de trabajo cuando tienes más de 40 años. Preguntas trampa, respuestas efectivas y estrategias que funcionan.",
            "author": {
              "@type": "Organization",
              "name": "Carrera NegoIA"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Carrera NegoIA",
              "url": "https://carrera.negoia.com"
            },
            "datePublished": "2026-03-30",
            "dateModified": "2026-03-30",
            "mainEntityOfPage": "https://carrera.negoia.com/entrevista-trabajo-despues-40"
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
                "name": "¿Es normal tardar más en encontrar trabajo después de los 40?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, los datos lo confirman: los mayores de 45 necesitan enviar aproximadamente el doble de CVs para conseguir una entrevista. Pero una vez en la entrevista, la tasa de conversión es similar."
                }
              },
              {
                "@type": "Question",
                "name": "¿Debo ocultar mi edad en el CV?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No recomiendo mentir, pero sí omitir información irrelevante. No incluyas el año de graduación si fue hace más de 15 años. Limita la experiencia laboral a los últimos 10-12 años."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo compito contra candidatos más jóvenes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No compitas en su terreno. Enfatiza tu juicio, red de contactos y capacidad de resolver problemas complejos sin supervisión. Muestra situaciones donde tu experiencia evitó errores costosos."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}
