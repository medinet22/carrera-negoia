'use client'

import Link from 'next/link'
import Script from 'next/script'

export default function EncontrarVocacionPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Cómo encontrar tu vocación profesional (cuando ya no tienes 18 años)',
            description: 'Guía honesta para descubrir tu vocación cuando llevas años trabajando. Sin tests genéricos. Sin frases de coaching vacías. Con señales reales y pasos concretos.',
            author: { '@type': 'Organization', name: 'Carrera NegoIA' },
            publisher: { '@type': 'Organization', name: 'Carrera NegoIA', url: 'https://carrera.negoia.com' },
            datePublished: '2026-03-25',
            dateModified: '2026-03-25',
            mainEntityOfPage: 'https://carrera.negoia.com/como-encontrar-vocacion-profesional',
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
                name: '¿Es posible encontrar tu vocación a los 40 años?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí. A los 40 tienes algo que no tenías a los 18: evidencia real de qué se te da bien. Tus años de trabajo son datos, no teoría. La vocación adulta no se descubre con tests de personalidad, sino analizando qué tareas haces mejor que otros y cuáles no te cuestan esfuerzo.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Qué diferencia hay entre vocación y trabajo que paga bien?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'La vocación incluye tres cosas: algo que haces naturalmente bien, algo que el mercado valora (paga), y algo que no te drena cuando lo haces muchas horas. Un trabajo solo bien pagado pero que odias no es vocación. Una pasión que nadie paga tampoco. El punto dulce está en la intersección.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cómo sé si mi vocación no es lo que estudié?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tres señales claras: (1) Evitas activamente las tareas centrales de tu profesión aunque las sabes hacer. (2) Tu energía sube con tareas "secundarias" que no son tu trabajo oficial. (3) Envidias a gente que hace otros trabajos, no por el dinero sino por lo que hacen día a día.',
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
            <h1>Cómo encontrar tu vocación profesional (cuando ya no tienes 18 años)</h1>
            <p className="article-meta">
              Actualizado: marzo 2026 · Lectura: 8 minutos
            </p>
          </header>

          <div className="article-content">
            <p className="lead">
              <strong>Los consejos típicos de vocación no funcionan para ti.</strong> &quot;Haz lo que amas&quot;, &quot;sigue tu pasión&quot;, &quot;escucha a tu corazón&quot;. Genial para un estudiante de 18 años sin responsabilidades. Inútil para alguien con hipoteca, hijos, y 15 años de trayectoria profesional.
            </p>
            <p>
              Esta guía es para adultos que ya han trabajado suficiente para saber que la realidad es más complicada. Que a veces lo que amabas se convierte en rutina. Que a veces descubres habilidades que no sabías que tenías. Que a veces tu vocación no tiene nada que ver con lo que estudiaste.
            </p>

            <h2>Por qué los tests de vocación no funcionan para adultos</h2>
            <p>
              Los tests de orientación vocacional se diseñaron para adolescentes sin experiencia laboral. Te preguntan si prefieres trabajar con personas o con datos. Si te gusta estar al aire libre o en oficina. Si eres creativo o analítico.
            </p>
            <p>
              El problema: tú ya sabes todo eso. Llevas años trabajando. Has visto qué te gusta y qué no. Has descubierto que algunas cosas que te gustaban de joven ahora te aburren. Y que otras que nunca te planteaste resulta que se te dan muy bien.
            </p>
            <p>
              <strong>Tu mejor test de vocación son tus últimos 10 años de trabajo.</strong> No lo que crees que te gustaría, sino lo que realmente haces cuando nadie te obliga.
            </p>

            <h2>Las 5 señales de que tu vocación NO es lo que haces ahora</h2>
            <p>
              Antes de buscar tu vocación, asegúrate de que realmente necesitas cambiar. A veces el problema no es la vocación, es el jefe, el sector, o la empresa. Otras veces sí es la vocación.
            </p>

            <h3>1. Evitas las tareas centrales de tu trabajo</h3>
            <p>
              No las tareas aburridas que todos odiamos (reuniones, burocracia). Las tareas que definen tu rol. Si eres programador y evitas programar. Si eres comercial y evitas llamar a clientes. Si eres diseñador y evitas diseñar. Eso es señal.
            </p>

            <h3>2. Tu energía sube con tareas &quot;secundarias&quot;</h3>
            <p>
              El contable que se ilumina cuando tiene que presentar algo al equipo. El ingeniero que disfruta más mentorizando juniors que resolviendo problemas técnicos. El comercial que prefiere hacer los materiales de marketing que cerrar ventas. Esas tareas &quot;secundarias&quot; que te dan energía son pistas.
            </p>

            <h3>3. Envidias a otros por lo que hacen, no por lo que ganan</h3>
            <p>
              Cuando ves a alguien y piensas &quot;me encantaría hacer eso&quot; (no &quot;me encantaría ganar eso&quot;), apunta. No importa si es realista o no. La envidia profesional es un indicador brutal de deseo auténtico.
            </p>

            <h3>4. Los domingos por la noche son angustia pura</h3>
            <p>
              No el estrés normal de &quot;mañana tengo mucho curro&quot;. Hablo de esa sensación de vacío cuando piensas en la semana que viene. Cuando te preguntas &quot;¿esto es todo?&quot;. Eso no es estrés laboral, es desalineación vocacional.
            </p>

            <h3>5. Llevas años &quot;aguantando hasta que...&quot;</h3>
            <p>
              &quot;Aguanto hasta que los niños sean mayores.&quot; &quot;Aguanto hasta que pague la hipoteca.&quot; &quot;Aguanto hasta la siguiente subida.&quot; Si llevas más de 2 años aguantando, el problema no es temporal.
            </p>

            <h2>Cómo encontrar tu vocación mirando hacia atrás (no hacia adelante)</h2>
            <p>
              Olvida imaginar tu trabajo ideal. Mira tu historial real.
            </p>

            <h3>Ejercicio 1: Los mejores días de trabajo</h3>
            <p>
              Piensa en los 3 mejores días de trabajo de los últimos 5 años. No los días de éxito (cerrar un contrato, recibir un bonus). Los días que terminaste pensando &quot;hoy ha sido un buen día&quot; sin ningún motivo especial.
            </p>
            <p>
              <strong>¿Qué estabas haciendo exactamente?</strong> ¿Con quién? ¿Qué tipo de problemas resolvías? Esos días son tu vocación asomándose.
            </p>

            <h3>Ejercicio 2: Lo que haces gratis</h3>
            <p>
              ¿Qué cosas haces sin que nadie te pague ni te obligue? ¿Ayudas a amigos con sus CVs? ¿Organizas los viajes del grupo? ¿Explicas conceptos técnicos a tu familia? ¿Investigas durante horas sobre temas que te interesan?
            </p>
            <p>
              Lo que haces gratis es lo que harías profesionalmente si supieras cómo monetizarlo.
            </p>

            <h3>Ejercicio 3: Los cumplidos que ignoras</h3>
            <p>
              Piensa en los cumplidos profesionales que recibes y que descartas. &quot;Qué bien explicas las cosas.&quot; &quot;Siempre consigues que la gente se ponga de acuerdo.&quot; &quot;Eres muy bueno detectando problemas antes de que pasen.&quot;
            </p>
            <p>
              Los ignoramos porque nos parecen obvios. Pero lo que a ti te parece obvio, a otros les cuesta. <strong>Tus superpoderes son las cosas que haces sin esfuerzo y que otros no pueden.</strong>
            </p>

            <h2>La fórmula de la vocación adulta</h2>
            <p>
              Vocación no es solo &quot;lo que te gusta&quot;. Es la intersección de tres cosas:
            </p>
            <ul>
              <li><strong>Habilidad natural:</strong> Lo que haces mejor que la media sin esfuerzo especial.</li>
              <li><strong>Valor de mercado:</strong> Lo que alguien está dispuesto a pagar.</li>
              <li><strong>Energía sostenible:</strong> Lo que puedes hacer muchas horas sin quemarte.</li>
            </ul>
            <p>
              Un trabajo que te gusta pero nadie paga es un hobby. Un trabajo que pagan bien pero te drena es una sentencia. Un trabajo que parecía tu vocación pero ya no te motiva es evolución normal.
            </p>
            <p>
              <strong>La vocación adulta no es estática.</strong> Evoluciona con tus circunstancias, tu experiencia, y tus prioridades. Lo que era tu vocación a los 28 puede no serlo a los 42. Y eso está bien.
            </p>

            <h2>Los 3 errores que comete todo el mundo al buscar su vocación</h2>

            <h3>Error 1: Buscar una pasión que no existe</h3>
            <p>
              No todo el mundo tiene una pasión obvia. Mucha gente funciona con &quot;intereses&quot; más que con &quot;pasiones&quot;. Si llevas años buscando tu pasión y no la encuentras, quizás no sea pasión lo que buscas. Quizás es simplemente un trabajo que te permita vivir bien sin odiarte a ti mismo.
            </p>

            <h3>Error 2: Pensar que el cambio tiene que ser radical</h3>
            <p>
              No necesitas dejar todo y abrir un chiringuito en la playa. La mayoría de cambios de carrera exitosos son pequeños ajustes: mismo sector pero otro rol. Mismas habilidades pero otro contexto. Un giro de 15 grados, no de 180.
            </p>

            <h3>Error 3: Ignorar las restricciones reales</h3>
            <p>
              Tienes hipoteca. Tienes hijos. Tienes un nivel de vida. Ignorar estas restricciones no es &quot;soñar en grande&quot;, es irresponsabilidad. Tu vocación tiene que caber dentro de tu vida real, no reemplazarla.
            </p>

            <h2>Próximos pasos concretos (no filosofía)</h2>
            
            <h3>Esta semana</h3>
            <ul>
              <li>Haz los 3 ejercicios de arriba (15 minutos cada uno).</li>
              <li>Escribe las respuestas. No las pienses solo, escríbelas.</li>
              <li>Identifica 2-3 temas que aparecen en todas las respuestas.</li>
            </ul>

            <h3>Este mes</h3>
            <ul>
              <li>Habla con 3 personas que trabajan en roles relacionados con tus temas.</li>
              <li>Pregunta: ¿Cómo es un día típico? ¿Qué es lo peor? ¿Qué habilidades se necesitan realmente?</li>
              <li>No preguntes cómo entrar. Primero entiende si de verdad quieres entrar.</li>
            </ul>

            <h3>En 3 meses</h3>
            <ul>
              <li>Haz un experimento pequeño. Un proyecto freelance. Un voluntariado. Un curso práctico.</li>
              <li>No dejes tu trabajo todavía. Valida primero que lo que imaginas coincide con la realidad.</li>
            </ul>

            <div className="cta-box">
              <h3>¿No sabes por dónde empezar?</h3>
              <p>
                Si has hecho los ejercicios y sigues sin tener claridad, puede que necesites un análisis más estructurado de tus habilidades y opciones reales.
              </p>
              <p>
                <Link href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=encontrar_vocacion&utm_content=cta_principal" className="cta-button">
                  Ver opciones de análisis de carrera →
                </Link>
              </p>
            </div>

            <h2>La verdad incómoda sobre la vocación</h2>
            <p>
              La mayoría de gente no tiene una vocación clara. Y está bien.
            </p>
            <p>
              Lo que sí tienen es una combinación de habilidades, intereses y circunstancias que hacen que algunos trabajos encajen mejor que otros. Encontrar tu vocación no es descubrir tu destino escrito en las estrellas. Es hacer el trabajo de entender qué haces bien, qué valora el mercado, y qué puedes sostener a largo plazo.
            </p>
            <p>
              <strong>Tu vocación no te está esperando.</strong> La construyes con las piezas que ya tienes.
            </p>

            <div className="cta-box secondary">
              <h3>¿Quieres saber qué roles encajan con tu perfil real?</h3>
              <p>
                No tests genéricos. Un análisis basado en tu experiencia real, con roles específicos y datos de mercado actualizados.
              </p>
              <p>
                <Link href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=encontrar_vocacion&utm_content=cta_secundario" className="cta-button">
                  Explorar análisis de carrera →
                </Link>
              </p>
            </div>
          </div>
        </article>
      </main>

      <style jsx>{`
        .article-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1rem 4rem;
        }
        .back-link {
          color: #6366f1;
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .article-header h1 {
          font-size: 2.2rem;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          color: #1a1a2e;
        }
        .article-meta {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        .article-content {
          font-size: 1.1rem;
          line-height: 1.75;
          color: #333;
        }
        .lead {
          font-size: 1.25rem;
          color: #1a1a2e;
          margin-bottom: 1.5rem;
        }
        .article-content h2 {
          font-size: 1.6rem;
          margin: 2.5rem 0 1rem;
          color: #1a1a2e;
        }
        .article-content h3 {
          font-size: 1.25rem;
          margin: 2rem 0 0.75rem;
          color: #1a1a2e;
        }
        .article-content p {
          margin-bottom: 1.25rem;
        }
        .article-content ul {
          margin: 1rem 0 1.5rem 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.75rem;
        }
        .cta-box {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          padding: 2rem;
          border-radius: 12px;
          margin: 2.5rem 0;
          color: white;
        }
        .cta-box.secondary {
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
        }
        .cta-box h3 {
          color: white;
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        .cta-box p {
          margin-bottom: 1rem;
          opacity: 0.95;
        }
        .cta-button {
          display: inline-block;
          background: white;
          color: #6366f1;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .cta-box.secondary .cta-button {
          color: #1a1a2e;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 600px) {
          .article-header h1 {
            font-size: 1.75rem;
          }
          .article-content {
            font-size: 1rem;
          }
          .lead {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  )
}
