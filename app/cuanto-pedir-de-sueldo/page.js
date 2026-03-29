'use client'

import Link from 'next/link'
import Script from 'next/script'

export default function CuantoPedirSueldoPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Cuánto pedir de sueldo según tu perfil (sin quedarte corto ni espantarlos)',
            description: 'Calcula tu rango salarial real basado en experiencia, sector y ubicación. Con datos actualizados de 2026 y ejemplos concretos por perfil.',
            author: { '@type': 'Organization', name: 'Carrera NegoIA' },
            publisher: { '@type': 'Organization', name: 'Carrera NegoIA', url: 'https://carrera.negoia.com' },
            datePublished: '2026-03-29',
            dateModified: '2026-03-29',
            mainEntityOfPage: 'https://carrera.negoia.com/cuanto-pedir-de-sueldo',
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
                name: '¿Debo dar mi expectativa salarial en la primera entrevista?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Idealmente no. Responde con un rango amplio ("entre X y Y dependiendo del paquete completo") y devuelve la pregunta: "¿Cuál es el presupuesto para este puesto?". Si te presionan, da tu rango alto — siempre puedes bajar, nunca puedes subir.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cómo sé si me están pagando por debajo de mercado?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Compara con datos de Glassdoor, LinkedIn Salary y ofertas similares en InfoJobs. Si la diferencia es >15%, estás por debajo. Señales adicionales: contratan gente nueva por más, llevas años sin subida significativa, o tu sector está en demanda.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cuánto más puedo pedir si cambio de empresa?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cambiar de empresa suele permitir saltos del 15-30% si te mantienes en tu nivel. Si subes de nivel (de individual contributor a manager, por ejemplo), puede ser 25-40%. El mercado paga por el riesgo que tomas al cambiar.',
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
            <h1>Cuánto pedir de sueldo según tu perfil (sin quedarte corto ni espantarlos)</h1>
            <p className="article-meta">
              Actualizado: marzo 2026 · Lectura: 8 minutos
            </p>
          </header>

          <div className="article-content">
            <p className="lead">
              <strong>Te piden tu expectativa salarial y tu mente se bloquea.</strong> Dices un número al azar, la cara del entrevistador no te dice nada, y te pasas las siguientes 48 horas preguntándote si pediste demasiado o regalaste €10.000 al año.
            </p>
            <p>
              Esta guía te va a dar un método para calcular tu rango salarial real — no basado en lo que te gustaría ganar, sino en lo que el mercado paga por alguien como tú.
            </p>

            <h2>Por qué la mayoría pide mal (y cómo te afecta)</h2>
            <p>
              El 68% de profesionales acepta la primera oferta sin negociar. Los que negocian consiguen de media un 7-10% más. En una carrera de 30 años, eso es la diferencia entre €400.000 y €550.000 en ingresos totales.
            </p>
            <p>
              El problema no es que no quieras negociar. Es que no sabes cuánto vales realmente. Y cuando no sabes, haces una de dos cosas:
            </p>
            <ul>
              <li><strong>Pides muy poco</strong> porque &quot;no quieres parecer ambicioso&quot;. La empresa acepta encantada y tú te quedas con €5.000-15.000 menos de lo que habrían pagado.</li>
              <li><strong>Pides demasiado</strong> sin justificación, te descartan, y nunca sabes por qué no te llamaron.</li>
            </ul>
            <p>
              El punto dulce es un rango que te posicione en el percentil 60-80 de tu mercado: ni barato ni fuera de liga.
            </p>

            <h2>Los 5 factores que determinan tu sueldo real</h2>
            <p>
              Tu sueldo no depende de lo que tú crees que mereces. Depende de oferta y demanda. Estos son los 5 factores que más pesan:
            </p>
            
            <h3>1. Años de experiencia relevante (no total)</h3>
            <p>
              20 años de experiencia en un sector que abandonas valen menos que 3 años en el sector al que entras. Lo que cuenta es experiencia <em>transferible</em>: gestión de equipos, proyectos similares, herramientas del sector.
            </p>
            <p>
              <strong>Regla general:</strong>
            </p>
            <ul>
              <li>0-2 años: Junior. Base del rango.</li>
              <li>3-5 años: Mid. +20-40% sobre junior.</li>
              <li>6-10 años: Senior. +40-70% sobre junior.</li>
              <li>10+ años: Lead/Manager. +70-120% sobre junior.</li>
            </ul>

            <h3>2. Ubicación (aunque sea remoto)</h3>
            <p>
              Una empresa americana pagando en USD a alguien en España puede darte 2-3x el sueldo local por el mismo trabajo. Pero la mayoría de empresas españolas pagan según mercado español.
            </p>
            <p>
              <strong>Referencias 2026:</strong>
            </p>
            <ul>
              <li>Madrid/Barcelona: +15-25% vs resto de España</li>
              <li>País Vasco: +10-15% vs media nacional</li>
              <li>Remoto para empresa extranjera: posible +50-200%</li>
            </ul>

            <h3>3. Sector e industria</h3>
            <p>
              Un Project Manager en banca gana más que uno en ONG. No porque trabaje más, sino porque la banca tiene márgenes que permiten pagar más.
            </p>
            <p>
              <strong>Sectores que pagan más (España 2026):</strong>
            </p>
            <ul>
              <li>Tech/SaaS: +30-50% vs media</li>
              <li>Farmacéutico: +25-40%</li>
              <li>Banca/seguros: +20-35%</li>
              <li>Consultoría Big4: +15-25%</li>
              <li>FMCG (multinacionales): +10-20%</li>
            </ul>

            <h3>4. Escasez de tu perfil</h3>
            <p>
              Si hay 500 candidatos para cada puesto, tu poder de negociación es bajo. Si las empresas compiten por ti, es alto.
            </p>
            <p>
              <strong>Perfiles en demanda 2026:</strong>
            </p>
            <ul>
              <li>Data Engineers, ML Engineers</li>
              <li>Product Managers con experiencia B2B SaaS</li>
              <li>Cybersecurity (cualquier nivel)</li>
              <li>Revenue Operations, Growth</li>
              <li>Customer Success senior</li>
            </ul>

            <h3>5. Tu capacidad de demostrar resultados</h3>
            <p>
              Dos candidatos con el mismo CV pueden tener €20.000 de diferencia salarial. La diferencia: uno dice &quot;gestioné proyectos&quot;, el otro dice &quot;lideré 3 proyectos con presupuesto de €2M, entregando un 15% bajo presupuesto y 3 semanas antes de plazo&quot;.
            </p>
            <p>
              <strong>Cuantifica todo:</strong> equipos, presupuestos, porcentajes, euros, tiempo. Si no puedes medirlo, no vale.
            </p>

            <h2>Cómo calcular tu rango en 15 minutos</h2>
            <p>
              Método práctico sin complicaciones:
            </p>
            
            <h3>Paso 1: Busca 5-10 ofertas similares</h3>
            <p>
              En LinkedIn Jobs e InfoJobs, busca puestos con tu título (o similar) en tu ubicación. Si 7 de 10 ofertas muestran rango, tienes tu referencia de mercado.
            </p>

            <h3>Paso 2: Consulta datos de salarios</h3>
            <p>
              Glassdoor España, LinkedIn Salary (si tienes Premium), y la calculadora de Michael Page dan rangos por puesto y experiencia. Cruza 2-3 fuentes.
            </p>

            <h3>Paso 3: Ajusta por tus factores</h3>
            <p>
              Toma la media del mercado y ajusta:
            </p>
            <ul>
              <li>+10-15% si tu sector paga más que la media</li>
              <li>+10-15% si Madrid/Barcelona</li>
              <li>+5-10% si tienes resultados medibles excepcionales</li>
              <li>-10-15% si cambias de sector y tu experiencia no es directamente transferible</li>
            </ul>

            <h3>Paso 4: Define tu rango (no un número exacto)</h3>
            <p>
              Siempre da un rango de €5.000-8.000. Ejemplo: &quot;Busco entre €48.000 y €55.000 dependiendo del paquete completo.&quot;
            </p>
            <p>
              Tu número bajo debe ser algo con lo que estarías contento. Tu número alto es tu ideal realista (no fantasía).
            </p>

            <h2>Ejemplos reales de rangos 2026</h2>
            <p>
              Para que no empieces de cero, aquí van rangos típicos en España:
            </p>

            <h3>Marketing</h3>
            <ul>
              <li>Marketing Manager (5-8 años): €45.000-60.000</li>
              <li>Digital Marketing Specialist (2-4 años): €28.000-38.000</li>
              <li>Head of Marketing (10+ años): €65.000-90.000</li>
            </ul>

            <h3>Tech/Producto</h3>
            <ul>
              <li>Product Manager (3-5 años): €50.000-70.000</li>
              <li>Senior Developer (5-8 años): €55.000-75.000</li>
              <li>Data Analyst (2-4 años): €35.000-48.000</li>
            </ul>

            <h3>Operaciones/Finanzas</h3>
            <ul>
              <li>Operations Manager (5-8 años): €45.000-60.000</li>
              <li>Controller Financiero (8-12 años): €55.000-75.000</li>
              <li>Customer Success Manager (3-5 años): €38.000-50.000</li>
            </ul>

            <h3>RRHH/People</h3>
            <ul>
              <li>HR Business Partner (5-8 años): €45.000-58.000</li>
              <li>Talent Acquisition Lead (5-8 años): €42.000-55.000</li>
              <li>People Manager (8-12 años): €55.000-70.000</li>
            </ul>

            <h2>Qué decir cuando te preguntan tu expectativa</h2>
            <p>
              La pregunta trampa: &quot;¿Cuáles son tus expectativas salariales?&quot;
            </p>
            <p>
              <strong>Opción 1 (si es pronto en el proceso):</strong> &quot;Antes de hablar de números, me gustaría entender mejor el alcance del rol. ¿Podéis compartirme el rango presupuestado para esta posición?&quot;
            </p>
            <p>
              <strong>Opción 2 (si insisten):</strong> &quot;Basado en mi experiencia y lo que veo en el mercado para este tipo de rol, busco un rango entre €X y €Y, pero estoy abierto a discutirlo según el paquete completo — beneficios, flexibilidad, desarrollo profesional.&quot;
            </p>
            <p>
              <strong>Opción 3 (si te dan su rango primero):</strong> Si su tope está por debajo de tu mínimo, dilo: &quot;Entiendo. Mi expectativa está más cerca de €X. ¿Hay flexibilidad en el presupuesto para el candidato adecuado?&quot;
            </p>

            <h2>Las 3 trampas que te hacen perder dinero</h2>
            
            <h3>1. Dar tu sueldo actual</h3>
            <p>
              &quot;¿Cuánto ganas ahora?&quot; no es información que debas dar. Respuesta: &quot;Prefiero centrarme en el valor que puedo aportar y el rango de mercado para este rol.&quot; En España, desde la ley de transparencia salarial, las empresas deben dar el rango antes de preguntar.
            </p>

            <h3>2. Aceptar en el momento</h3>
            <p>
              Nunca digas &quot;sí&quot; en la llamada. Siempre: &quot;Gracias por la oferta. Me gustaría revisarla con calma y vuelvo mañana.&quot; Esto te da tiempo para negociar o detectar trampas.
            </p>

            <h3>3. Ignorar el paquete completo</h3>
            <p>
              €50.000 con seguro médico, ticket restaurante, formación y 25 días de vacaciones puede valer más que €55.000 sin beneficios. Haz las cuentas reales.
            </p>

            <h2>Tu siguiente paso</h2>
            <p>
              Si no tienes claro qué roles encajan con tu perfil ni cuánto deberías pedir en cada uno, estás negociando a ciegas.
            </p>

            <div className="cta-box" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)', borderRadius: '12px', padding: '24px', marginTop: '32px', marginBottom: '32px', border: '1px solid #c7d7fe' }}>
              <h3 style={{ marginTop: 0, color: '#1e3a5f' }}>Descubre tu valor de mercado real</h3>
              <p style={{ marginBottom: '16px' }}>
                En 15 minutos, nuestro análisis te muestra qué roles encajan con tu experiencia, cuánto pagan en tu sector, y qué habilidades te hacen destacar.
              </p>
              <Link 
                href="/start?utm_source=seo&utm_medium=blog&utm_campaign=cuanto_sueldo&utm_content=cta_principal"
                className="cta-button"
                style={{ display: 'inline-block', background: '#4f46e5', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}
              >
                Analizar mi perfil gratis →
              </Link>
            </div>

            <h2>Preguntas frecuentes</h2>

            <h3>¿Debo dar mi expectativa salarial en la primera entrevista?</h3>
            <p>
              Idealmente no. Responde con un rango amplio (&quot;entre X y Y dependiendo del paquete completo&quot;) y devuelve la pregunta: &quot;¿Cuál es el presupuesto para este puesto?&quot;. Si te presionan, da tu rango alto — siempre puedes bajar, nunca puedes subir.
            </p>

            <h3>¿Cómo sé si me están pagando por debajo de mercado?</h3>
            <p>
              Compara con datos de Glassdoor, LinkedIn Salary y ofertas similares en InfoJobs. Si la diferencia es &gt;15%, estás por debajo. Señales adicionales: contratan gente nueva por más, llevas años sin subida significativa, o tu sector está en demanda.
            </p>

            <h3>¿Cuánto más puedo pedir si cambio de empresa?</h3>
            <p>
              Cambiar de empresa suele permitir saltos del 15-30% si te mantienes en tu nivel. Si subes de nivel (de individual contributor a manager, por ejemplo), puede ser 25-40%. El mercado paga por el riesgo que tomas al cambiar.
            </p>

          </div>

          <footer className="article-footer">
            <p>
              <strong>Siguiente paso:</strong> Haz el{' '}
              <Link href="/start?utm_source=seo&utm_medium=blog&utm_campaign=cuanto_sueldo&utm_content=cta_footer">análisis de tu perfil profesional</Link>{' '}
              para ver exactamente qué roles encajan contigo y cuánto puedes pedir en cada uno.
            </p>
          </footer>
        </article>
      </main>
    </>
  )
}
