import Link from 'next/link'

export const metadata = {
  title: 'No Sé Para Qué Soy Bueno Profesionalmente | Cómo Descubrirlo',
  description: 'Si no sabes para qué eres bueno profesionalmente, no estás solo. Descubre un método basado en IA para identificar tus talentos reales y encontrar el trabajo ideal.',
  keywords: 'no sé para qué soy bueno, descubrir talento profesional, qué se me da bien, orientación profesional adultos',
  openGraph: {
    title: 'No Sé Para Qué Soy Bueno Profesionalmente | Cómo Descubrirlo',
    description: 'Método para descubrir tus talentos reales cuando no sabes para qué eres bueno.',
    url: 'https://carrera.negoia.com/no-se-para-que-soy-bueno',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/no-se-para-que-soy-bueno',
  },
}

export default function NoSeParaQueSoyBueno() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "No Sé Para Qué Soy Bueno Profesionalmente: Cómo Descubrirlo",
    "datePublished": "2026-03-10",
    "dateModified": "2026-03-10",
    "mainEntityOfPage": "https://carrera.negoia.com/no-se-para-que-soy-bueno",
    "author": { "@type": "Organization", "name": "carrera.negoia.com" }
  }



  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Y si tengo 40+ años y quiero cambiar de sector?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí se puede. El foco debe estar en tus habilidades transferibles y en roles puente donde ya aportas valor desde el primer mes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si una habilidad realmente tiene salida laboral?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cruza la habilidad con demanda en ofertas reales, salarios de mercado y frecuencia de uso en roles que te interesan."
        }
      },
      {
        "@type": "Question",
        "name": "¿Necesito rehacer mi CV completo para reinventarme?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No siempre. Primero define el rol objetivo y adapta el CV destacando logros y competencias relevantes para ese destino."
        }
      }
    ]
  }

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>No Sé Para Qué Soy Bueno</span>
        </nav>

        <header className="article-header">
          <h1>No Sé Para Qué Soy Bueno Profesionalmente: Cómo Descubrirlo de Verdad</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 8 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>Primero: no estás solo</h2>
            <p>
              <strong>"No sé para qué soy bueno"</strong> es una de las frases más buscadas en Google España
              relacionada con el trabajo. La dicen recién graduados sin experiencia, profesionales con 20 años
              de carrera, personas después de un despido y gente que simplemente lleva años en piloto automático.
            </p>
            <p>
              El problema no es que no tengas habilidades. El problema es que nadie te ha enseñado a verlas.
            </p>
          </section>

          <h2>Por qué es tan difícil saber para qué eres bueno</h2>
          <p>
            Hay tres razones principales por las que los profesionales no reconocen sus propias fortalezas:
          </p>

          <h3>1. El sesgo de disponibilidad</h3>
          <p>
            Las habilidades que usamos todos los días se vuelven invisibles para nosotros. Si se te da bien
            organizar reuniones, mediar conflictos o explicar conceptos complejos, probablemente ni lo consideras
            una habilidad porque lo haces sin esfuerzo. Pero para otros es muy difícil.
          </p>

          <h3>2. El marco de referencia equivocado</h3>
          <p>
            Muchos comparan sus habilidades con las de sus compañeros inmediatos, no con el mercado amplio.
            Así siempre habrá alguien que te parezca mejor. La pregunta correcta no es "¿soy mejor que mis
            compañeros?" sino "¿qué puedo hacer que tiene valor para otros?"
          </p>

          <h3>3. La confusión entre pasión y habilidad</h3>
          <p>
            Que algo te guste no significa que seas bueno en ello. Que seas bueno en algo no significa que
            te guste. El punto dulce profesional está donde las dos se cruzan, pero primero necesitas saber
            cuáles son tus habilidades reales.
          </p>

          {/* CTA intermedio - Análisis Carrera €29 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 100%)', 
            border: '2px solid #22c55e', 
            borderRadius: '12px', 
            padding: '24px', 
            margin: '32px 0',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#166534', fontWeight: '600' }}>
              ⏰ ¿No tienes tiempo para hacer esto solo?
            </p>
            <p style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1e293b' }}>
              Un experto analiza tu perfil con IA y te entrega tu mapa de habilidades + 5 roles que encajan contigo.
            </p>
            <Link 
              href="/analisis-carrera"
              className="btn btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              Análisis personalizado €29 — Entrega 48h →
            </Link>
          </div>

          <h2>El método para descubrir para qué eres bueno</h2>

          <h3>Paso 1: El inventario de logros</h3>
          <p>
            Escribe entre 10 y 15 momentos de tu vida profesional (o personal) en los que conseguiste algo
            que te sintió bien. No tienen que ser grandes logros corporativos. Pueden ser proyectos pequeños,
            momentos de reconocimiento, problemas que resolviste.
          </p>
          <p>
            Para cada uno, escribe: ¿qué hiciste exactamente? ¿Qué decisiones tomaste? ¿Qué habilidades utilizaste?
          </p>

          <h3>Paso 2: Busca los patrones</h3>
          <p>
            Cuando tienes 10-15 logros descritos con detalle, empiezan a aparecer patrones. Habilidades que
            se repiten, contextos similares, tipos de problemas que resuelves bien. Estos patrones son tu perfil
            real de fortalezas.
          </p>

          <h3>Paso 3: Valida con el mercado</h3>
          <p>
            Una habilidad solo tiene valor si alguien la necesita. Una vez identificas tus fortalezas, el
            siguiente paso es entender qué roles o sectores las valoran y pagan bien por ellas.
          </p>

          <h3>Paso 4: Prueba con proyectos pequeños</h3>
          <p>
            Antes de hacer un cambio grande, valida tu hipótesis. Haz un proyecto freelance, un voluntariado,
            o un proyecto interno en tu empresa actual que te permita ejercitar esas habilidades y confirmar
            que realmente las tienes y que disfrutas usándolas.
          </p>

          <h2>Señales de que sí sabes para qué eres bueno (pero no lo ves)</h2>
          <ul>
            <li>Tus compañeros te preguntan a ti cuando tienen ese tipo de problema</li>
            <li>Cuando haces esa actividad pierdes la noción del tiempo</li>
            <li>Te resulta difícil entender por qué otros lo encuentran complicado</li>
            <li>Has recibido reconocimiento repetido por algo específico</li>
            <li>Lo haces bien incluso cuando estás cansado o estresado</li>
          </ul>



          <h2>Errores que te mantienen atascado (y cómo evitarlos)</h2>

          <h3>Error 1: buscar "la vocación perfecta" antes de actuar</h3>
          <p>
            Esperar claridad total antes de moverte bloquea el progreso. La claridad llega con
            experimentos pequeños: entrevistas informativas, microproyectos y pruebas rápidas de mercado.
          </p>

          <h3>Error 2: definirte por tu último cargo</h3>
          <p>
            Tu título no es tu techo. Lo que importa son capacidades demostrables. Un perfil de
            "coordinación + análisis + comunicación" puede encajar en operaciones, customer success,
            project management o formación corporativa.
          </p>

          <h3>Error 3: cambiar sin hipótesis</h3>
          <p>
            Cambiar por impulso suele salir caro. Formula hipótesis concretas: "si apunto a rol X,
            mis habilidades A/B/C me permiten generar impacto en 90 días". Luego valida con datos reales.
          </p>

          <h2>La IA como espejo de tus habilidades</h2>
          <p>
            Una de las formas más eficaces de descubrir tus habilidades es dejar que una IA analice tu
            trayectoria. No como sustituto del autoconocimiento, sino como acelerador. Le describes lo que
            has hecho y ella identifica patrones que tú no ves porque estás demasiado cerca.
          </p>
          <p>
            El resultado no es un test de personalidad ni un perfil genérico. Es una lista concreta de
            competencias con evidencia de cada una, extraída de tu propia experiencia.
          </p>

          <div className="cta-box" style={{ background: '#f0fdf4', border: '2px solid #22c55e' }}>
            <h3>Deja de adivinar. Descubre para qué eres bueno.</h3>
            <p>Un experto analiza tu trayectoria con IA y te entrega: mapa de habilidades, 5 roles que encajan, y plan de acción de 30 días.</p>
            <Link href="/analisis-carrera" className="btn btn-primary">Análisis de Carrera Personalizado — €29 →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
