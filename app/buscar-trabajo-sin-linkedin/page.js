'use client'

import Link from 'next/link'
import Head from 'next/head'
import { ArrowRight, CheckCircle2, XCircle, Globe, Users, Mail, Building2, Target } from 'lucide-react'

export default function BuscarTrabajoSinLinkedin() {
  return (
    <>
      <Head>
        <title>Buscar trabajo sin LinkedIn: 7 alternativas que funcionan en España (2026)</title>
        <meta name="description" content="Guía práctica para encontrar empleo sin depender de LinkedIn. Portales que usan los reclutadores españoles, networking real y candidaturas que sí se leen." />
        <meta name="keywords" content="buscar trabajo sin linkedin, alternativas linkedin empleo, trabajo sin redes sociales, infojobs, portales empleo españa" />
        <link rel="canonical" href="https://carrera.negoia.com/buscar-trabajo-sin-linkedin" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Buscar trabajo sin LinkedIn: 7 alternativas que funcionan en España",
            "author": {"@type": "Organization", "name": "Carrera NegoIA"},
            "datePublished": "2026-04-05",
            "dateModified": "2026-04-05"
          }
        `}</script>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="max-w-3xl mx-auto px-4 py-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-medium rounded-full mb-4">
              Búsqueda de empleo
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Buscar trabajo sin LinkedIn: 7 alternativas que funcionan en España
            </h1>
            <p className="text-slate-400 text-lg">
              No todo el mundo quiere (o puede) jugar al juego de LinkedIn. Aquí tienes lo que realmente funciona.
            </p>
            <p className="text-slate-500 text-sm mt-4">
              Actualizado abril 2026 · 8 min lectura
            </p>
          </div>

          {/* Intro */}
          <article className="prose prose-lg prose-invert max-w-none">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
              <p className="text-slate-300 m-0">
                <strong className="text-white">Lo que nadie te cuenta:</strong> El 68% de las contrataciones en España 
                siguen sin pasar por LinkedIn. Sí, has leído bien. Portales tradicionales, candidaturas directas 
                y el networking de toda la vida siguen siendo los reyes — especialmente fuera del sector tech.
              </p>
            </div>

            <p className="text-slate-300">
              Puede que no tengas LinkedIn. O que lo tengas abandonado y te dé pereza revivirlo. 
              O que simplemente no te apetezca publicar actualizaciones sobre tu "journey profesional" 
              para que te validen desconocidos.
            </p>

            <p className="text-slate-300">
              Da igual el motivo. La realidad es que puedes encontrar trabajo perfectamente sin LinkedIn. 
              Solo necesitas saber dónde buscar y cómo hacerlo bien. Aquí van las 7 vías que funcionan de verdad.
            </p>

            {/* Alternativa 1 */}
            <div className="bg-slate-800/30 border-l-4 border-indigo-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold text-white m-0">1. InfoJobs: el elefante en la habitación</h2>
              </div>
              <p className="text-slate-300 mb-4">
                Sí, lo sé. "Pero InfoJobs es muy cutre". Te lo dice alguien que escucha esto cada semana. 
                Y sin embargo, InfoJobs procesa más de 2 millones de ofertas al año en España. 
                Los recruiters de RRHH de empresas medianas y grandes lo usan a diario.
              </p>
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-4">
                <p className="text-indigo-300 font-medium mb-2">💡 Cómo hacerlo bien:</p>
                <ul className="text-slate-400 text-sm space-y-1 m-0 pl-4">
                  <li>Activa alertas por email con tus keywords exactas</li>
                  <li>Actualiza tu CV en la plataforma — los reclutadores buscan por fecha</li>
                  <li>No te inscribas en todo — apunta a ofertas donde cumplas 70%+ de requisitos</li>
                  <li>Añade carta de presentación personalizada (la mayoría no lo hace)</li>
                </ul>
              </div>
              <p className="text-slate-400 text-sm">
                <strong>Sectores donde domina:</strong> retail, hostelería, administración, sanidad, logística, RRHH.
              </p>
            </div>

            {/* Alternativa 2 */}
            <div className="bg-slate-800/30 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white m-0">2. Webs de empresa directas</h2>
              </div>
              <p className="text-slate-300 mb-4">
                El secreto peor guardado del mercado laboral: muchas empresas publican primero en su propia web, 
                y solo después (si acaso) en portales. Es más barato y les llegan candidatos más motivados.
              </p>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                <p className="text-purple-300 font-medium mb-2">🎯 Plan de acción:</p>
                <ol className="text-slate-400 text-sm space-y-1 m-0 pl-4">
                  <li>Haz una lista de 15-20 empresas donde te gustaría trabajar</li>
                  <li>Ve a cada web → sección "Trabaja con nosotros" o "Careers"</li>
                  <li>Configura Google Alerts: <code className="text-xs bg-slate-700 px-1 rounded">site:empresa.com empleo OR vacante OR trabajo</code></li>
                  <li>Revisa cada 2 semanas — las ofertas rotan</li>
                </ol>
              </div>
              <p className="text-slate-400 text-sm">
                <strong>Ventaja extra:</strong> cuando llegues a entrevista, ya conoces la empresa de verdad.
              </p>
            </div>

            {/* Alternativa 3 */}
            <div className="bg-slate-800/30 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-white m-0">3. Candidatura espontánea bien hecha</h2>
              </div>
              <p className="text-slate-300 mb-4">
                "Pero si no tienen oferta abierta". Precisamente. El 30% de las contrataciones vienen de 
                candidaturas que llegan antes de que haya vacante. Si tu email aterriza justo cuando van 
                a publicar... premio.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-green-300 font-medium mb-2">✉️ Email que sí funciona:</p>
                <p className="text-slate-400 text-sm m-0">
                  <em>"Hola María, vi que [empresa] ha abierto nueva línea de [X]. Llevo 5 años en [sector relacionado] 
                  y me interesa especialmente [conexión concreta]. ¿Hay forma de hablar 10 minutos para ver si encajo 
                  en algo que tengáis en mente? Adjunto mi CV por si acaso."</em>
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Clave: investigación + conexión + petición concreta. No spam genérico.
                </p>
              </div>
            </div>

            {/* Alternativa 4 */}
            <div className="bg-slate-800/30 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-semibold text-white m-0">4. Networking de verdad (sin LinkedIn)</h2>
              </div>
              <p className="text-slate-300 mb-4">
                Networking no significa "conectar en LinkedIn y no volver a hablar". 
                Significa conocer gente de tu sector que te puede avisar cuando surja algo.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-orange-300 font-medium mb-2">Dónde encontrarlos:</p>
                  <ul className="text-slate-400 text-sm space-y-1 m-0 pl-3">
                    <li>Eventos de tu sector (meetups, ferias, congresos)</li>
                    <li>Asociaciones profesionales</li>
                    <li>Cursos presenciales especializados</li>
                    <li>Ex-compañeros de trabajo (el activo más infravalorado)</li>
                  </ul>
                </div>
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <p className="text-slate-300 font-medium mb-2">Cómo reactivar contactos:</p>
                  <ul className="text-slate-400 text-sm space-y-1 m-0 pl-3">
                    <li>WhatsApp/email: "Ey, ¿cómo va todo? Estoy explorando opciones..."</li>
                    <li>Café en persona si están cerca</li>
                    <li>No pidas trabajo directamente — pide consejo o información</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                <strong>Dato:</strong> El 60-80% de los trabajos no se publican. Se cubren por referencia.
              </p>
            </div>

            {/* Alternativa 5 */}
            <div className="bg-slate-800/30 border-l-4 border-cyan-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white m-0">5. Indeed + Jooble: agregadores de ofertas</h2>
              </div>
              <p className="text-slate-300 mb-4">
                Estos buscadores rastrean miles de webs y te lo ponen todo junto. 
                Útil para búsquedas amplias o cuando no sabes qué empresas buscar.
              </p>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-300 font-medium mb-2">Trucos de búsqueda:</p>
                <ul className="text-slate-400 text-sm space-y-1 m-0 pl-4">
                  <li>Usa comillas para frases exactas: "project manager"</li>
                  <li>Excluye lo que no quieres: -becario -prácticas</li>
                  <li>Filtra por fecha: ofertas de últimos 3 días suelen tener menos competencia</li>
                  <li>Mira las ofertas "feas" — menos gente se apunta</li>
                </ul>
              </div>
            </div>

            {/* Alternativa 6 */}
            <div className="bg-slate-800/30 border-l-4 border-pink-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-pink-400" />
                <h2 className="text-xl font-semibold text-white m-0">6. ETTs y agencias de colocación</h2>
              </div>
              <p className="text-slate-300 mb-4">
                Desprestigiadas pero efectivas. Las ETTs tienen contratos con empresas grandes que 
                no publican ofertas. Y el SEPE tiene un listado de agencias de colocación gratuitas autorizadas.
              </p>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <p className="text-pink-300 font-medium mb-2">Cuándo usarlas:</p>
                <ul className="text-slate-400 text-sm space-y-1 m-0 pl-4">
                  <li>Si llevas tiempo parado y necesitas entrar ya</li>
                  <li>Si quieres probar un sector nuevo sin compromiso</li>
                  <li>Si buscas contratos temporales o por proyecto</li>
                  <li>Muchas empresas contratan fijo a quien entra por ETT y funciona</li>
                </ul>
              </div>
            </div>

            {/* Alternativa 7 */}
            <div className="bg-slate-800/30 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white m-0">7. Empléate (SEPE): el recurso público olvidado</h2>
              </div>
              <p className="text-slate-300 mb-4">
                El portal de empleo del Servicio Público de Empleo Estatal agrega ofertas de administraciones 
                públicas y empresas privadas. Más ofertas de las que crees, sobre todo fuera de grandes ciudades.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 font-medium mb-2">Bonus:</p>
                <p className="text-slate-400 text-sm m-0">
                  Si estás inscrito como demandante de empleo, tu orientador puede pasarte ofertas 
                  que no se publican. Pide cita y pregunta directamente.
                </p>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg p-6 my-8">
              <h2 className="text-xl font-semibold text-white mb-4">📋 Tu plan de acción (esta semana)</h2>
              <ol className="text-slate-300 space-y-2 m-0 pl-4">
                <li><strong>Día 1-2:</strong> Actualiza tu CV. Sube versión nueva a InfoJobs e Indeed.</li>
                <li><strong>Día 3:</strong> Lista de 15 empresas objetivo → revisa sus webs → configura alertas.</li>
                <li><strong>Día 4:</strong> 3 emails de candidatura espontánea bien hechos (no spam).</li>
                <li><strong>Día 5:</strong> Contacta a 5 ex-compañeros o conocidos del sector.</li>
                <li><strong>Día 6-7:</strong> Revisa ofertas nuevas en portales. Apúntate a las que encajen.</li>
              </ol>
            </div>

            {/* El problema real */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-3">El problema de fondo</h3>
              <p className="text-slate-300 mb-3">
                Encontrar ofertas no es difícil. Lo difícil es saber a cuáles apuntarte. 
                Si no tienes claro qué buscas, terminas enviando CVs a todo lo que se mueve 
                — y eso no funciona.
              </p>
              <p className="text-slate-300 m-0">
                Antes de buscar ofertas, necesitas claridad sobre tus habilidades transferibles 
                y qué roles encajan contigo. Si no lo tienes claro, empieza por ahí.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 my-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                ¿No sabes a qué apuntarte?
              </h3>
              <p className="text-indigo-100 mb-6">
                En 2 minutos descubre qué roles encajan con tu perfil — y deja de enviar CVs a ciegas.
              </p>
              <Link 
                href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=sin_linkedin&utm_content=cta_principal"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Ver qué roles me encajan
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-indigo-200 text-sm mt-4">
                Gratuito · Sin registro · Resultados inmediatos
              </p>
            </div>

            {/* FAQ */}
            <div className="border-t border-slate-700 pt-8 mt-8">
              <h2 className="text-xl font-semibold text-white mb-6">Preguntas frecuentes</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-2">
                    ¿Realmente se puede conseguir trabajo sin LinkedIn en 2026?
                  </h3>
                  <p className="text-slate-400">
                    Sí. LinkedIn domina en tech, consulting y multinacionales. Pero en la mayoría de sectores 
                    (retail, sanidad, industria, administración, servicios) los canales tradicionales siguen siendo 
                    los principales. Lo importante es usar los canales donde están los reclutadores de TU sector.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-2">
                    ¿Cuántas candidaturas debería enviar al día?
                  </h3>
                  <p className="text-slate-400">
                    Calidad sobre cantidad. 3-5 candidaturas bien personalizadas al día funcionan mejor que 
                    20 genéricas. Cada candidatura debería tener carta de presentación adaptada a la oferta 
                    y demostrar que has leído la descripción del puesto.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-2">
                    ¿Las ETTs son buena opción si tengo +40 años?
                  </h3>
                  <p className="text-slate-400">
                    Pueden serlo. Muchas empresas prefieren "probar" a candidatos senior antes de contratar fijo. 
                    Una ETT te da acceso a esas empresas sin el riesgo de que te descarten por edad en un primer filtro. 
                    Si demuestras valor, la conversión a fijo es común.
                  </p>
                </div>
              </div>
            </div>

            {/* Related */}
            <div className="border-t border-slate-700 pt-8 mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Sigue leyendo</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  href="/como-venderte-en-entrevista?utm_source=seo&utm_medium=blog&utm_campaign=sin_linkedin&utm_content=related"
                  className="block p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <p className="text-indigo-400 text-sm mb-1">Guía práctica</p>
                  <p className="text-white font-medium">Cómo venderte en entrevista sin sonar desesperado</p>
                </Link>
                <Link 
                  href="/habilidades-transferibles?utm_source=seo&utm_medium=blog&utm_campaign=sin_linkedin&utm_content=related"
                  className="block p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <p className="text-indigo-400 text-sm mb-1">Cambio de carrera</p>
                  <p className="text-white font-medium">Cómo traducir tu experiencia a otro sector</p>
                </Link>
              </div>
            </div>

          </article>

          {/* Footer CTA */}
          <div className="mt-12 text-center">
            <Link 
              href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=sin_linkedin&utm_content=footer_cta"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Descubre tu mapa de habilidades completo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
