'use client'

import Link from 'next/link'

export default function ComoHacerCVCambioCarrera() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-indigo-600">Inicio</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">CV para cambio de carrera</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Cómo hacer un CV para cambio de carrera (sin que acabe en la papelera)
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Tu experiencia vale. El problema es cómo la estás contando. Aquí tienes el método exacto para reescribir tu CV cuando quieres cambiar de sector o de rol.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span>📖 8 min lectura</span>
            <span>•</span>
            <span>Actualizado abril 2026</span>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <article className="px-4 pb-16">
        <div className="max-w-3xl mx-auto prose prose-lg prose-indigo">
          
          <p>
            Llevas 10 años en marketing y quieres pasar a producto. O eres ingeniero y estás mirando hacia consultoría. O trabajas en banca y te planteas tech.
          </p>
          
          <p>
            El problema: tu CV grita "soy de marketing" cuando tú quieres que diga "puedo ser PM". Y cada vez que lo envías, silencio absoluto.
          </p>
          
          <p>
            El error más común es pensar que necesitas "experiencia en el nuevo sector". No. Lo que necesitas es <strong>traducir la experiencia que ya tienes</strong> al lenguaje del nuevo sector. Y hay un método para hacerlo.
          </p>

          <h2>Por qué tu CV actual no funciona (aunque tengas las skills)</h2>
          
          <p>
            Los ATS (sistemas de filtrado automático) y los recruiters buscan patrones. Cuando tu CV dice "Responsable de campañas de marketing digital" pero aplicas a "Product Manager", pasas de largo.
          </p>
          
          <p>
            No es que no valgas. Es que el sistema no está diseñado para conectar puntos entre sectores diferentes. Ese trabajo lo tienes que hacer tú.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
            <p className="font-medium text-amber-800 mb-2">El dato que duele</p>
            <p className="text-amber-700">El 70% de CVs de cambio de carrera se descartan en los primeros 6 segundos porque el título actual no coincide con el título de la oferta.</p>
          </div>

          <h2>El método de las 3 capas para reescribir tu CV</h2>
          
          <h3>Capa 1: El headline que te posiciona (aunque no tengas el título)</h3>
          
          <p>
            Olvida tu cargo actual. Tu headline tiene que decir quién <em>puedes ser</em>, no quién eres hoy.
          </p>
          
          <p><strong>❌ Así no:</strong></p>
          <blockquote>"Marketing Manager | 8 años de experiencia | MBA IE"</blockquote>
          
          <p><strong>✅ Así sí:</strong></p>
          <blockquote>"Product-minded marketer → Transición a Product Management | User research + data + stakeholder management"</blockquote>
          
          <p>
            ¿Ves la diferencia? El segundo dice exactamente dónde vas y qué llevas contigo. El ATS sigue viendo "Product Management" y el recruiter entiende el contexto.
          </p>

          <h3>Capa 2: Sección de "Habilidades Transferibles" antes de la experiencia</h3>
          
          <p>
            Esto es crucial. Añade una sección justo después del headline que diga explícitamente qué skills llevas al nuevo rol:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
            <p className="font-bold text-gray-900 mb-3">HABILIDADES TRANSFERIBLES</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
              <div>✓ Análisis de datos y métricas (€2M presupuesto gestionado)</div>
              <div>✓ Gestión de stakeholders (4 departamentos, 12 personas)</div>
              <div>✓ User research cualitativo (50+ entrevistas a clientes)</div>
              <div>✓ Roadmapping de campañas (metodología ágil)</div>
              <div>✓ A/B testing y optimización continua</div>
              <div>✓ Presentación ejecutiva (C-level mensual)</div>
            </div>
          </div>
          
          <p>
            Cada línea tiene un dato concreto. Nada de "buenas habilidades de comunicación". Números. Contexto. Resultados.
          </p>

          <h3>Capa 3: Reescribir cada bullet con el framework "Skill → Acción → Resultado"</h3>
          
          <p>
            Tu experiencia pasada tiene que leerse como entrenamiento para el nuevo rol. Mira cómo se transforma el mismo trabajo:
          </p>
          
          <p><strong>❌ Versión original (marketing):</strong></p>
          <blockquote>"Responsable de campañas de email marketing con open rate del 32%"</blockquote>
          
          <p><strong>✅ Versión traducida (para PM):</strong></p>
          <blockquote>"Diseñé y testé 40+ variaciones de mensajes basándome en datos de comportamiento de usuarios (32% open rate vs 18% industria), priorizando features de personalización que aumentaron conversión un 45%"</blockquote>
          
          <p>
            El segundo bullet usa lenguaje de producto: "diseñé", "testé", "datos de comportamiento", "priorizando features". El trabajo fue el mismo, pero ahora habla el idioma correcto.
          </p>

          <h2>Los 5 errores que arruinan CVs de transición</h2>
          
          <ol>
            <li>
              <strong>Empezar con "Objetivo profesional: busco una oportunidad..."</strong>
              <p>Nadie lee esto. Elimínalo. El headline hace ese trabajo mejor.</p>
            </li>
            <li>
              <strong>Listar 15 años de experiencia en orden cronológico</strong>
              <p>Si estás cambiando de carrera, lo relevante no es lo más reciente — es lo más transferible. Usa formato funcional o híbrido.</p>
            </li>
            <li>
              <strong>No incluir proyectos personales o cursos recientes</strong>
              <p>Un bootcamp de 3 meses en el nuevo sector vale más que 5 años en el antiguo. Ponlo arriba.</p>
            </li>
            <li>
              <strong>Usar la misma versión del CV para todas las ofertas</strong>
              <p>Cada rol tiene keywords diferentes. Si aplicas a PM en fintech y PM en salud, necesitas dos versiones.</p>
            </li>
            <li>
              <strong>No explicar el "por qué" del cambio</strong>
              <p>En la carta de presentación (o en el headline), di brevemente por qué el cambio tiene sentido. "Tras 8 años optimizando campañas, quiero estar más cerca del producto" es suficiente.</p>
            </li>
          </ol>

          <h2>Plantilla: CV para cambio de carrera (copia y adapta)</h2>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg my-6 not-prose shadow-sm">
            <p className="text-xl font-bold text-gray-900 mb-1">[TU NOMBRE]</p>
            <p className="text-indigo-600 mb-4">[Título actual] → Transición a [Título objetivo] | [Skill 1] + [Skill 2] + [Skill 3]</p>
            
            <p className="font-bold text-gray-800 mt-4 mb-2 border-b pb-1">HABILIDADES TRANSFERIBLES</p>
            <p className="text-gray-600 text-sm mb-4">✓ [Skill con dato] · ✓ [Skill con dato] · ✓ [Skill con dato] · ✓ [Skill con dato]</p>
            
            <p className="font-bold text-gray-800 mt-4 mb-2 border-b pb-1">FORMACIÓN RECIENTE RELEVANTE</p>
            <p className="text-gray-600 text-sm mb-4">[Curso/Bootcamp/Certificación] — [Institución] (2026)<br/>[Proyecto personal relacionado con el nuevo sector]</p>
            
            <p className="font-bold text-gray-800 mt-4 mb-2 border-b pb-1">EXPERIENCIA</p>
            <p className="text-gray-700 font-medium">[Cargo] @ [Empresa] | [Fechas]</p>
            <p className="text-gray-600 text-sm">• [Bullet traducido al lenguaje del nuevo sector + resultado]<br/>• [Bullet traducido al lenguaje del nuevo sector + resultado]<br/>• [Bullet traducido al lenguaje del nuevo sector + resultado]</p>
          </div>

          <h2>¿Y si no sé cuáles son mis habilidades transferibles?</h2>
          
          <p>
            Este es el problema más común. Llevas años haciendo "lo tuyo" y no sabes cómo se traduce a otros sectores.
          </p>
          
          <p>
            Hay dos formas de resolverlo:
          </p>
          
          <ol>
            <li><strong>Manual:</strong> Coge 5 ofertas del rol que quieres. Subraya los requisitos. Busca en tu experiencia ejemplos de cada uno. Tarda unas 4-6 horas.</li>
            <li><strong>Asistido por IA:</strong> Usa una herramienta que analice tu CV y te muestre qué roles encajan y por qué.</li>
          </ol>

          {/* CTA principal */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl my-8 not-prose">
            <h3 className="text-2xl font-bold mb-3">Descubre tus habilidades transferibles en 15 minutos</h3>
            <p className="text-indigo-100 mb-4">
              Nuestra IA analiza tu experiencia y te muestra exactamente qué roles encajan contigo — con datos de salario reales y CV generado automáticamente.
            </p>
            <Link 
              href="/start?utm_source=seo&utm_medium=blog&utm_campaign=cv_cambio_carrera&utm_content=cta_principal"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Empezar análisis gratis →
            </Link>
          </div>

          <h2>Checklist final antes de enviar</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
            <ul className="space-y-2 text-gray-700">
              <li>☐ El headline menciona el rol objetivo, no solo el actual</li>
              <li>☐ Hay una sección de "Habilidades Transferibles" con datos</li>
              <li>☐ La formación reciente relevante aparece antes de la experiencia antigua</li>
              <li>☐ Cada bullet usa el lenguaje del nuevo sector</li>
              <li>☐ No hay "objetivos" ni "perfiles" genéricos</li>
              <li>☐ El CV tiene máximo 2 páginas</li>
              <li>☐ Pasé el CV por un ATS simulator (ej: Jobscan) y da &gt;70%</li>
            </ul>
          </div>

          <h2>El cambio de carrera más común (y cómo preparar el CV)</h2>
          
          <p>
            Si vienes de <strong>marketing</strong> y vas hacia <strong>producto</strong>:
          </p>
          <ul>
            <li>Enfatiza: análisis de datos, user research, A/B testing, gestión de stakeholders</li>
            <li>Traduce: "campaña" → "experimento", "audiencia" → "usuario", "ROI" → "impacto en métricas de producto"</li>
          </ul>
          
          <p>
            Si vienes de <strong>consultoría</strong> y vas hacia <strong>operaciones in-house</strong>:
          </p>
          <ul>
            <li>Enfatiza: gestión de proyectos complejos, análisis estratégico, presentación a C-level</li>
            <li>Traduce: "proyecto cliente" → "iniciativa cross-funcional", "entregable" → "resultado medible"</li>
          </ul>
          
          <p>
            Si vienes de <strong>banca/finanzas</strong> y vas hacia <strong>fintech/tech</strong>:
          </p>
          <ul>
            <li>Enfatiza: análisis cuantitativo, compliance/regulación, gestión de riesgo</li>
            <li>Traduce: "reporting" → "dashboards", "proceso manual" → "oportunidad de automatización"</li>
          </ul>

          {/* FAQ Schema */}
          <h2>Preguntas frecuentes</h2>
          
          <h3>¿Puedo cambiar de carrera sin experiencia en el nuevo sector?</h3>
          <p>
            Sí, pero necesitas demostrar que tus habilidades son transferibles. Un CV bien traducido + un proyecto personal o curso reciente + una carta que explique el "por qué" del cambio es la fórmula que funciona.
          </p>
          
          <h3>¿Debo mencionar que estoy cambiando de carrera?</h3>
          <p>
            Sí, pero enmarcándolo como evolución lógica, no como "estoy huyendo de algo". "Tras 8 años profundizando en análisis de usuario, quiero aplicar ese conocimiento directamente en producto" suena a crecimiento, no a huida.
          </p>
          
          <h3>¿Cuántas versiones del CV necesito?</h3>
          <p>
            Al menos una por tipo de rol. Si aplicas a PM en fintech, PM en salud y PM en e-commerce, puedes tener la misma base pero con bullets y keywords adaptados a cada sector. Cuenta con 30-45 minutos por versión.
          </p>

          {/* CTA footer */}
          <div className="border-t pt-8 mt-12">
            <p className="text-gray-600 mb-4">
              ¿No tienes claro qué roles encajan con tu experiencia? Nuestra IA te lo dice en 15 minutos — gratis.
            </p>
            <Link 
              href="/start?utm_source=seo&utm_medium=blog&utm_campaign=cv_cambio_carrera&utm_content=cta_footer"
              className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800"
            >
              Descubrir mis habilidades transferibles →
            </Link>
          </div>

        </div>
      </article>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cómo hacer un CV para cambio de carrera (sin que acabe en la papelera)",
            "description": "Método completo para reescribir tu CV cuando quieres cambiar de sector o rol. Plantilla, ejemplos y errores a evitar.",
            "author": {
              "@type": "Organization",
              "@name": "NegoIA"
            },
            "datePublished": "2026-04-02",
            "dateModified": "2026-04-02"
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
                "name": "¿Puedo cambiar de carrera sin experiencia en el nuevo sector?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, pero necesitas demostrar que tus habilidades son transferibles. Un CV bien traducido + un proyecto personal o curso reciente + una carta que explique el 'por qué' del cambio es la fórmula que funciona."
                }
              },
              {
                "@type": "Question",
                "name": "¿Debo mencionar que estoy cambiando de carrera?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, pero enmarcándolo como evolución lógica, no como huida. 'Tras 8 años profundizando en análisis de usuario, quiero aplicar ese conocimiento directamente en producto' suena a crecimiento."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuántas versiones del CV necesito?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Al menos una por tipo de rol. Si aplicas a PM en fintech, PM en salud y PM en e-commerce, puedes tener la misma base pero con bullets y keywords adaptados a cada sector."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}
