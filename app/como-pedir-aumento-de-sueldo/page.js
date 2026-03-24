'use client'

import Link from 'next/link'
import Script from 'next/script'

export default function PedirAumentoPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Cómo pedir un aumento de sueldo (sin que te despidan ni te ignoren)',
            description: 'Guía práctica para negociar tu salario. Cuándo pedirlo, cómo prepararlo, qué decir exactamente, y qué hacer si te dicen que no.',
            author: { '@type': 'Organization', name: 'Carrera NegoIA' },
            publisher: { '@type': 'Organization', name: 'Carrera NegoIA', url: 'https://carrera.negoia.com' },
            datePublished: '2026-03-24',
            dateModified: '2026-03-24',
            mainEntityOfPage: 'https://carrera.negoia.com/como-pedir-aumento-de-sueldo',
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
                name: '¿Cuánto aumento de sueldo es razonable pedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Entre el 5% y el 15% si llevas más de un año en el puesto y tu rendimiento ha sido bueno. Si has asumido responsabilidades nuevas o el mercado paga significativamente más por tu perfil, puedes pedir hasta un 20-25%. Siempre respaldado con datos concretos.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuándo es el mejor momento para pedir un aumento?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Después de un logro visible, antes de la revisión salarial anual (1-2 meses), cuando la empresa tenga buenos resultados, o justo después de asumir nuevas responsabilidades. Evita momentos de crisis de la empresa o cuando tu jefe esté bajo presión.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Qué hago si me dicen que no al aumento?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pregunta qué necesitarías lograr para conseguirlo en 6 meses. Pídelo por escrito. Si no hay camino claro, evalúa si tu futuro está en esa empresa. Un "no" hoy no es un "no" para siempre, pero tampoco es excusa para quedarte atrapado.',
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
            <h1>Cómo pedir un aumento de sueldo (sin que te despidan ni te ignoren)</h1>
            <p className="article-meta">
              Actualizado: marzo 2026 · Lectura: 7 minutos
            </p>
          </header>

          <div className="article-content">
            <p className="lead">
              <strong>Llevas años rindiendo bien y tu sueldo no se mueve.</strong> Has visto cómo suben a otros, cómo contratan gente nueva por más dinero, pero tú sigues igual. Sabes que mereces más, pero la idea de pedirlo te paraliza.
            </p>
            <p>
              Esta guía no es teoría de manual de RRHH. Es lo que funciona en la vida real cuando quieres ganar más sin quemar tu relación con la empresa.
            </p>

            <h2>Por qué cuesta tanto pedir un aumento (y por qué es un error no hacerlo)</h2>
            <p>
              La mayoría de profesionales evita pedir aumento por tres miedos:
            </p>
            <ul>
              <li><strong>Miedo a que me vean como codicioso.</strong> Falso. Los que piden de forma profesional son vistos como personas que conocen su valor. Los que nunca piden son vistos como conformistas.</li>
              <li><strong>Miedo a que me despidan.</strong> Casi nunca pasa. A una empresa le cuesta 6-12 meses de salario reemplazarte. No van a echarte por pedir un aumento bien argumentado.</li>
              <li><strong>Miedo a escuchar un no.</strong> Un &quot;no&quot; no es el fin del mundo. Es información. Te dice dónde estás y qué necesitas para avanzar.</li>
            </ul>
            <p>
              El verdadero coste de no pedir es brutal: si te quedas 3 años ganando €5.000/año menos de lo que podrías, estás regalando €15.000. Más los intereses compuestos sobre ese dinero. Más el anclaje para tu próximo salario.
            </p>

            <h2>Antes de pedir: los 4 datos que necesitas tener</h2>
            <p>
              Pedir un aumento sin preparación es como ir a una negociación con las manos vacías. Antes de abrir la boca, necesitas:
            </p>
            
            <h3>1. Tu valor de mercado real</h3>
            <p>
              ¿Cuánto pagan otras empresas por alguien con tu perfil? Busca en:
            </p>
            <ul>
              <li>Glassdoor, LinkedIn Salary, Indeed Salarios — filtra por tu puesto, ciudad y años de experiencia</li>
              <li>Ofertas de trabajo similares — ¿qué rangos salariales publican?</li>
              <li>Pregunta a colegas del sector (sí, se puede hablar de dinero)</li>
            </ul>
            <p>
              Si el mercado paga €45K-€55K y tú ganas €38K, tienes un argumento potente. Si ganas €50K, tu argumento tiene que ser otro.
            </p>

            <h3>2. Tus logros cuantificables del último año</h3>
            <p>
              No vale decir &quot;he trabajado mucho&quot;. Necesitas números:
            </p>
            <ul>
              <li>&quot;Lideré el proyecto X que generó €200K en ahorro/ingresos&quot;</li>
              <li>&quot;Reduje el tiempo de entrega de 6 a 3 semanas&quot;</li>
              <li>&quot;Gestioné un equipo de 5 personas y cumplimos el 110% de objetivos&quot;</li>
              <li>&quot;Asumí las funciones de Y cuando se fue sin aumento de equipo&quot;</li>
            </ul>
            <p>
              Si no tienes números claros, ese es tu primer trabajo: documentar tu impacto antes de pedir nada.
            </p>

            <h3>3. El contexto de tu empresa</h3>
            <p>
              Hay momentos buenos y malos para pedir. Investiga:
            </p>
            <ul>
              <li>¿La empresa está creciendo o en modo recortes?</li>
              <li>¿Cuándo es la revisión salarial anual? (Pide 1-2 meses antes)</li>
              <li>¿Tu jefe tiene autoridad para decidir o tiene que escalarlo?</li>
              <li>¿Hay presupuesto aprobado para el próximo año?</li>
            </ul>

            <h3>4. Tu BATNA (alternativa si dicen no)</h3>
            <p>
              El acrónimo más feo pero más útil en negociación: Best Alternative To Negotiated Agreement. ¿Qué haces si te dicen que no?
            </p>
            <ul>
              <li>¿Tienes una oferta de otra empresa?</li>
              <li>¿Podrías conseguirla en 2-3 meses si buscas?</li>
              <li>¿Estás dispuesto a irte si no hay movimiento?</li>
            </ul>
            <p>
              No tienes que amenazar ni mencionar que buscas. Pero saberlo tú te da seguridad en la conversación. La persona que más opciones tiene, negocia mejor.
            </p>

            <h2>El script exacto: qué decir (y qué no)</h2>
            
            <h3>Pide la reunión por separado</h3>
            <p>
              No sueltes el tema en medio de otra conversación. Pide una reunión específica:
            </p>
            <blockquote>
              &quot;María, me gustaría tener una conversación contigo sobre mi desarrollo y compensación. ¿Podemos agendar 30 minutos esta semana o la próxima?&quot;
            </blockquote>
            <p>
              Esto le da tiempo a tu jefe para prepararse y evita que te pille en frío.
            </p>

            <h3>Estructura de la conversación</h3>
            <p>
              <strong>1. Contexto (30 segundos):</strong>
            </p>
            <blockquote>
              &quot;Llevo [X tiempo] en el equipo y quería hablar de mi compensación en relación a mi contribución y al mercado actual.&quot;
            </blockquote>
            
            <p>
              <strong>2. Logros concretos (2 minutos):</strong>
            </p>
            <blockquote>
              &quot;Este año he liderado [proyecto X] que generó [resultado Y]. También asumí [responsabilidad extra] cuando [circunstancia]. Mi rendimiento ha sido [dato específico].&quot;
            </blockquote>

            <p>
              <strong>3. La petición clara (30 segundos):</strong>
            </p>
            <blockquote>
              &quot;Basándome en mi contribución y en lo que el mercado paga por perfiles similares, creo que un aumento del [X-Y%] reflejaría mejor mi valor para el equipo.&quot;
            </blockquote>

            <p>
              <strong>4. Silencio.</strong> Lo más difícil. Di tu petición y cállate. Deja que tu jefe responda. No llenes el silencio incómodo con justificaciones ni rebajas.
            </p>

            <h3>Lo que NUNCA debes decir</h3>
            <ul>
              <li>&quot;Necesito el dinero porque...&quot; — Tu situación personal no es argumento de negocio</li>
              <li>&quot;Es injusto que Fulanito gane más&quot; — Compararte con otros te hace parecer resentido</li>
              <li>&quot;Si no me suben me voy&quot; — Nunca amenaces a menos que estés 100% dispuesto a cumplirlo</li>
              <li>&quot;Llevo X años aquí&quot; — El tiempo no genera valor por sí solo; los resultados sí</li>
            </ul>

            <h2>Si te dicen que no (o que &quot;ahora no&quot;)</h2>
            <p>
              Un &quot;no&quot; rara vez es definitivo. Lo que hagas después determina tu futuro:
            </p>

            <h3>Pregunta qué necesitas para conseguirlo</h3>
            <blockquote>
              &quot;Entiendo. ¿Qué tendría que lograr o demostrar para que revisemos esto en 6 meses?&quot;
            </blockquote>
            <p>
              Si te dan criterios claros, tienes un plan. Si no pueden darte criterios, eso te dice mucho sobre tu futuro ahí.
            </p>

            <h3>Pídelo por escrito</h3>
            <p>
              Después de la conversación, envía un email resumiendo lo acordado:
            </p>
            <blockquote>
              &quot;Gracias por la conversación de hoy. Entiendo que ahora mismo no es posible un aumento, pero acordamos revisarlo en [fecha] si consigo [objetivos]. ¿Es correcto?&quot;
            </blockquote>
            <p>
              Esto crea un compromiso y evita que se &quot;olviden&quot;.
            </p>

            <h3>Evalúa tu situación real</h3>
            <p>
              Si después de un año pidiendo y cumpliendo no hay movimiento, la señal es clara: tu crecimiento no está en esa empresa. No es tragedia; es información para tomar decisiones.
            </p>

            <h2>El error que cometen casi todos: no saber su valor real</h2>
            <p>
              La mayoría de profesionales subestiman lo que valen. Piden el 5% cuando podrían pedir el 15%. Aceptan el primer &quot;no&quot; sin contraargumentar. Se conforman porque no saben qué paga el mercado.
            </p>
            <p>
              <strong>El primer paso es saber exactamente qué habilidades tienes y cuánto valen.</strong> No lo que crees que tienes; lo que el mercado reconoce y paga.
            </p>

            <div className="cta-box">
              <h3>¿No sabes exactamente qué vales?</h3>
              <p>
                Analizamos tu perfil con IA y te decimos: tus habilidades reales, 5 roles donde encajas, y un plan de acción concreto. €29, entrega en 48h.
              </p>
              <Link 
                href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=como_pedir_aumento&utm_content=cta_principal" 
                className="cta-button"
              >
                → Quiero saber mi valor real
              </Link>
            </div>

            <h2>Preguntas frecuentes</h2>

            <h3>¿Cuánto aumento de sueldo es razonable pedir?</h3>
            <p>
              Entre el 5% y el 15% si llevas más de un año y has rendido bien. Si has asumido responsabilidades nuevas significativas o el mercado paga mucho más, puedes pedir 20-25%. Siempre con datos que lo respalden.
            </p>

            <h3>¿Puedo pedir aumento si llevo menos de un año?</h3>
            <p>
              Es más difícil, pero posible si: (1) tus responsabilidades han cambiado significativamente, (2) te contrataron por debajo de mercado y lo puedes demostrar, o (3) has conseguido logros excepcionales y medibles.
            </p>

            <h3>¿Qué hago si mi jefe dice que no tiene autoridad para decidir?</h3>
            <p>
              Pregunta quién sí tiene autoridad y si puede organizar una conversación. Si te bloquean ahí, pide que al menos traslade tu petición formalmente. Si ni eso, tu jefe no está luchando por ti.
            </p>

            <h3>¿Es mala idea mencionar que tengo otra oferta?</h3>
            <p>
              Solo menciónalo si es verdad y estás dispuesto a irte si no igualan. Usar ofertas falsas como palanca es una receta para desastre. Si te igualan por presión, te habrás ganado un enemigo.
            </p>

            <h3>¿Cada cuánto puedo pedir un aumento?</h3>
            <p>
              Mínimo cada 12 meses, idealmente alineado con la revisión salarial de la empresa. Pedir cada 6 meses sin cambios significativos te hace parecer pesado.
            </p>

            <div className="cta-box secondary">
              <h3>¿Tu empresa no te valora?</h3>
              <p>
                Antes de buscar otro trabajo, entiende exactamente qué puedes ofrecer y dónde encajas mejor. Análisis personalizado con IA.
              </p>
              <Link 
                href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=como_pedir_aumento&utm_content=cta_secundario" 
                className="cta-button secondary"
              >
                → Analizar mi perfil profesional
              </Link>
            </div>
          </div>
        </article>
      </main>

      <style jsx>{`
        .article-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }
        .back-link {
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .back-link:hover {
          color: #333;
        }
        .article-header {
          margin-bottom: 2rem;
        }
        .article-header h1 {
          font-size: 2rem;
          line-height: 1.2;
          margin: 1rem 0 0.5rem;
          color: #111;
        }
        .article-meta {
          color: #666;
          font-size: 0.9rem;
        }
        .article-content {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #333;
        }
        .article-content p {
          margin-bottom: 1.2rem;
        }
        .lead {
          font-size: 1.2rem;
          color: #111;
        }
        .article-content h2 {
          font-size: 1.5rem;
          margin: 2.5rem 0 1rem;
          color: #111;
        }
        .article-content h3 {
          font-size: 1.2rem;
          margin: 2rem 0 0.8rem;
          color: #222;
        }
        .article-content ul, .article-content ol {
          margin-bottom: 1.2rem;
          padding-left: 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
        }
        .article-content blockquote {
          background: #f8f9fa;
          border-left: 4px solid #4F46E5;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #444;
        }
        .cta-box {
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
          border-radius: 12px;
          padding: 2rem;
          margin: 2.5rem 0;
          color: white;
        }
        .cta-box h3 {
          color: white;
          margin-top: 0;
          font-size: 1.3rem;
        }
        .cta-box p {
          color: rgba(255,255,255,0.9);
          margin-bottom: 1.5rem;
        }
        .cta-box.secondary {
          background: #f8f9fa;
          color: #333;
        }
        .cta-box.secondary h3 {
          color: #111;
        }
        .cta-box.secondary p {
          color: #555;
        }
        .cta-button {
          display: inline-block;
          background: white;
          color: #4F46E5;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .cta-button.secondary {
          background: #4F46E5;
          color: white;
        }
        @media (max-width: 640px) {
          .article-header h1 {
            font-size: 1.6rem;
          }
          .article-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  )
}
