'use client'

import Link from 'next/link'
import Script from 'next/script'

export default function PrimerTrabajoPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Primer trabajo después de los 40: guía práctica para conseguirlo',
            description: 'Si llevas 15+ años en lo mismo y quieres un giro radical, esta guía te da el paso a paso real para conseguir tu primer empleo en un sector nuevo a los 40+.',
            author: { '@type': 'Organization', name: 'Carrera NegoIA' },
            publisher: { '@type': 'Organization', name: 'Carrera NegoIA', url: 'https://carrera.negoia.com' },
            datePublished: '2026-03-23',
            dateModified: '2026-03-23',
            mainEntityOfPage: 'https://carrera.negoia.com/primer-trabajo-despues-de-los-40',
          }),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '¿Es posible conseguir un primer trabajo en un sector nuevo a los 40?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, pero requiere estrategia. No compites con juniors en precio; compites con tu experiencia real, capacidad de resolver problemas complejos y madurez profesional. El truco es posicionarte donde eso se valore.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuánto tiempo tarda en conseguir trabajo cambiando de sector a los 40?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Entre 3 y 9 meses, dependiendo del sector y tu preparación. Los sectores con déficit de talento (tech, sostenibilidad, salud) van más rápido. La preparación previa (certificaciones, proyectos) reduce el tiempo significativamente.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Debo aceptar un salario junior al cambiar de carrera?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No necesariamente. Puedes aceptar un 10-20% menos que tu anterior salario si entras en un sector con proyección, pero no te posiciones como junior. Tu experiencia tiene valor transferible; el reto es saber comunicarlo.',
                },
              },
            ],
          }),
        }}
      />

      <main className="article-page">
        <article>
          <header className="article-header">
            <Link href="/" className="back-link">← Volver a inicio</Link>
            <h1>Primer trabajo después de los 40: guía práctica para conseguirlo</h1>
            <p className="article-meta">
              Actualizado: marzo 2026 · Lectura: 8 minutos
            </p>
          </header>

          <div className="article-content">
            <p className="lead">
              <strong>15+ años haciendo lo mismo. Y ahora quieres empezar de cero en otra cosa.</strong> No eres el único. Cada vez más personas de 40+ deciden dar un giro radical. Pero la mayoría lo hace mal: envían CVs genéricos, compiten con juniors en precio, y se frustran a los 3 meses.
            </p>
            <p>
              Esta guía es para que tú no cometas esos errores. Aquí no hay fórmulas mágicas ni promesas de &quot;consigue trabajo en 2 semanas&quot;. Hay un plan realista, basado en lo que funciona cuando cambias de carrera con 40+ años encima.
            </p>

            <h2>La verdad incómoda sobre cambiar de carrera a los 40</h2>
            <p>
              Vamos a ser directos: a los 40 no te contratan por tu potencial. Te contratan por tu capacidad de resolver problemas ahora. Esa es tu ventaja real, pero la mayoría no sabe usarla.
            </p>
            <p>
              <strong>Lo que NO funciona:</strong>
            </p>
            <ul>
              <li>Enviar el mismo CV a 50 ofertas esperando que alguien te dé una oportunidad</li>
              <li>Competir por puestos junior con gente 15 años más joven</li>
              <li>Esconder tu edad o experiencia previa como si fuera un defecto</li>
              <li>Hacer un máster de 2 años antes de buscar trabajo</li>
            </ul>
            <p>
              <strong>Lo que SÍ funciona:</strong>
            </p>
            <ul>
              <li>Identificar sectores que valoran la madurez y experiencia de gestión</li>
              <li>Traducir tu experiencia anterior al lenguaje del nuevo sector</li>
              <li>Crear un portfolio de proyectos propios que demuestren capacidad</li>
              <li>Usar tu red actual (sí, la que ya tienes) de forma estratégica</li>
            </ul>

            <h2>Los 5 sectores donde tu experiencia vale más</h2>
            <p>
              No todos los sectores son iguales para alguien de 40+. Algunos valoran la experiencia; otros solo quieren manos baratas. Estos son los que he visto funcionar mejor para cambios de carrera tardíos:
            </p>
            <ol>
              <li><strong>Tech (no como developer junior)</strong> — Product management, project management, UX research, customer success. Sectores técnicos donde la capacidad de entender negocio + coordinar personas + comunicar bien vale oro.</li>
              <li><strong>Sostenibilidad / ESG</strong> — Empresas necesitan gente con experiencia en gestión para implementar sus planes de sostenibilidad. No necesitas ser ingeniero; necesitas saber ejecutar proyectos complejos.</li>
              <li><strong>Salud digital</strong> — Coordinación de equipos médicos remotos, gestión de proyectos de telemedicina, compliance sanitario. Boom de demanda post-pandemia.</li>
              <li><strong>Educación corporativa / L&D</strong> — Las empresas gastan millones en formación y necesitan gente que sepa de negocio para diseñar y gestionar programas. Tu experiencia en &quot;el mundo real&quot; es un diferenciador.</li>
              <li><strong>Consultoría independiente</strong> — En lugar de buscar empleo, ofrece tu experiencia como servicio. Menos competencia directa, más control sobre tu posicionamiento.</li>
            </ol>

            <h2>Plan de 60 días: del &quot;no sé por dónde empezar&quot; al primer contacto real</h2>
            
            <h3>Semanas 1-2: Diagnóstico brutal</h3>
            <p>
              Antes de moverte, necesitas saber exactamente qué tienes para ofrecer. No lo que crees que tienes; lo que el mercado valora.
            </p>
            <ul>
              <li><strong>Día 1-3:</strong> Haz una lista de 10 problemas concretos que has resuelto en tu carrera. No &quot;gestión de equipos&quot;; sino &quot;reduje el tiempo de entrega de proyectos de 6 a 3 meses reorganizando el proceso de aprobación&quot;.</li>
              <li><strong>Día 4-5:</strong> Identifica 3 sectores que te interesen. Busca 5 ofertas de trabajo en cada uno y anota qué piden. ¿Qué de eso ya sabes hacer?</li>
              <li><strong>Día 6-10:</strong> Habla con 3-5 personas que trabajen en esos sectores. No les pidas trabajo; pídeles 20 minutos para entender cómo es el día a día. Pregunta qué valoran más en alguien nuevo.</li>
              <li><strong>Día 11-14:</strong> Decide UN sector. Solo uno. El que mejor encaje entre lo que quieres, lo que sabes hacer, y lo que el mercado paga.</li>
            </ul>

            <h3>Semanas 3-4: Traduce tu experiencia</h3>
            <p>
              Tu CV actual probablemente está escrito en el idioma de tu sector anterior. Hay que traducirlo.
            </p>
            <ul>
              <li><strong>Día 15-18:</strong> Reescribe tus 5 mayores logros usando el vocabulario del nuevo sector. &quot;Implementé un CRM&quot; se convierte en &quot;Lideré transformación digital del equipo comercial, mejorando conversión en X%&quot;.</li>
              <li><strong>Día 19-21:</strong> Crea un CV específico para el sector objetivo. Máximo 2 páginas. Sin objetivo genérico; con headline claro de qué eres y qué aportas.</li>
              <li><strong>Día 22-28:</strong> Actualiza LinkedIn con el mismo enfoque. Headline específico, resumen enfocado al nuevo sector, experiencia reescrita.</li>
            </ul>

            <h3>Semanas 5-6: Construye evidencia</h3>
            <p>
              Sin experiencia en el sector, necesitas demostrar que puedes. Los proyectos propios son tu arma.
            </p>
            <ul>
              <li><strong>Día 29-35:</strong> Haz un proyecto de prueba. Si quieres entrar en sostenibilidad, analiza el plan ESG de una empresa pública y propón mejoras. Si es tech, haz un análisis de producto de una app conocida con recomendaciones.</li>
              <li><strong>Día 36-42:</strong> Documenta el proyecto en LinkedIn o Medium. No necesita ser perfecto; necesita demostrar que sabes pensar y ejecutar en ese contexto.</li>
            </ul>

            <h3>Semanas 7-8: Activa la red</h3>
            <ul>
              <li><strong>Día 43-49:</strong> Contacta a 20 personas de tu red existente. Cuéntales que estás cambiando de sector y qué estás buscando. Pide que te presenten a alguien que trabaje en eso.</li>
              <li><strong>Día 50-56:</strong> Contacta directamente a 10 personas del sector objetivo que no conoces. Ofrece valor primero (comparte tu proyecto, haz una pregunta inteligente, comenta su trabajo).</li>
              <li><strong>Día 57-60:</strong> Aplica a ofertas específicas con tu CV traducido. Pero la prioridad son las conversaciones; el 70% de trabajos a este nivel no se publican.</li>
            </ul>

            <h2>Los 4 errores que hunden tu búsqueda</h2>
            <ol>
              <li><strong>Esconder tu edad</strong> — Se nota. Y transmite inseguridad. En lugar de esconderla, úsala: &quot;Con 20 años de experiencia gestionando X, ahora quiero aplicar eso en Y&quot;.</li>
              <li><strong>Aceptar cualquier cosa</strong> — La desesperación se huele. Si aceptas un puesto junior mal pagado, te quedarás atrapado ahí. Mejor esperar 2 meses más por algo mejor posicionado.</li>
              <li><strong>Formarte en exceso antes de actuar</strong> — El máster de 2 años te retrasa 2 años. Haz una certificación corta si necesitas el sello, pero empieza a moverte ya.</li>
              <li><strong>No pedir ayuda</strong> — Tu red es tu mayor activo. La mayoría de trabajos para perfiles senior vienen de recomendaciones. Usarla no es debilidad; es estrategia.</li>
            </ol>

            <h2>¿Y si no funciona en 60 días?</h2>
            <p>
              Realismo: cambiar de sector a los 40+ puede tomar 3-9 meses. Pero en 60 días deberías tener:
            </p>
            <ul>
              <li>Claridad sobre qué sector y qué tipo de rol</li>
              <li>Un CV y LinkedIn optimizados para ese objetivo</li>
              <li>Al menos 5-10 conversaciones con gente del sector</li>
              <li>Un proyecto que demuestre tu capacidad</li>
            </ul>
            <p>
              Si tienes todo eso y sigues sin tracción, el problema suele ser uno de estos:
            </p>
            <ul>
              <li><strong>Sector equivocado:</strong> Algunos sectores son más difíciles para laterales. Reconsidera.</li>
              <li><strong>Posicionamiento confuso:</strong> Si tu mensaje no es claro, la gente no puede ayudarte. Simplifícalo.</li>
              <li><strong>Red insuficiente:</strong> Duplica el número de contactos. Más conversaciones = más oportunidades.</li>
            </ul>

            <h2>FAQ: Preguntas reales que me hacen</h2>
            
            <h3>¿Es posible conseguir un primer trabajo en un sector nuevo a los 40?</h3>
            <p>
              Sí, pero requiere estrategia. No compites con juniors en precio; compites con tu experiencia real, capacidad de resolver problemas complejos y madurez profesional. El truco es posicionarte donde eso se valore.
            </p>

            <h3>¿Cuánto tiempo tarda en conseguir trabajo cambiando de sector a los 40?</h3>
            <p>
              Entre 3 y 9 meses, dependiendo del sector y tu preparación. Los sectores con déficit de talento (tech, sostenibilidad, salud) van más rápido. La preparación previa (certificaciones, proyectos) reduce el tiempo significativamente.
            </p>

            <h3>¿Debo aceptar un salario junior al cambiar de carrera?</h3>
            <p>
              No necesariamente. Puedes aceptar un 10-20% menos que tu anterior salario si entras en un sector con proyección, pero no te posiciones como junior. Tu experiencia tiene valor transferible; el reto es saber comunicarlo.
            </p>

            <div className="cta-box">
              <h3>¿No sabes por dónde empezar?</h3>
              <p>
                Nuestro Mapa de Habilidades te ayuda a identificar qué tienes para ofrecer y qué roles encajan con tu perfil. Es gratuito y te da claridad en 10 minutos.
              </p>
              <Link 
                href="/?utm_source=seo&utm_medium=blog&utm_campaign=primer_trabajo_40&utm_content=cta_principal" 
                className="btn btn-primary"
              >
                Descubrir mis habilidades transferibles →
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
