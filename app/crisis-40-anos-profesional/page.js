import Link from 'next/link'

export const metadata = {
  title: 'Crisis de los 40: Qué Hacer con tu Carrera (Guía Real) | 2026',
  description: 'Los 40 y la sensación de "¿esto es todo?". Guía práctica sin postureo para profesionales que sienten que su carrera se ha estancado. Con ejemplos reales y pasos concretos.',
  keywords: 'crisis de los 40 profesional, crisis laboral 40 años, reinventarse a los 40, cambio carrera 40 años',
  openGraph: {
    title: 'Crisis de los 40: Qué Hacer con tu Carrera',
    description: 'Los 40 y la sensación de "¿esto es todo?". Guía práctica para profesionales que sienten que su carrera se ha estancado.',
    url: 'https://carrera.negoia.com/crisis-40-anos-profesional',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/crisis-40-anos-profesional',
  },
}

export default function Crisis40AnosProfesional() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Crisis de los 40: Qué Hacer con tu Carrera",
    "datePublished": "2026-03-13",
    "dateModified": "2026-03-13",
    "author": { "@type": "Organization", "name": "carrera.negoia.com" }
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es normal tener una crisis profesional a los 40?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Estudios muestran que la satisfacción vital tiene forma de U: baja alrededor de los 40-50 y vuelve a subir después. No estás solo ni eres raro. Lo que haces con esa crisis es lo que marca la diferencia."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es tarde para cambiar de carrera a los 40?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, pero tienes que ser estratégico. A los 40 tienes 25+ años de vida laboral por delante. Tiempo de sobra para construir algo nuevo. La clave es no empezar de cero: transferir habilidades que ya tienes a un campo nuevo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si necesito un cambio radical o solo un ajuste?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pregúntate: ¿el problema es el trabajo actual (jefe, empresa, condiciones) o es el tipo de trabajo en sí? Si cambiando de empresa pero haciendo lo mismo te sentirías bien, no necesitas reinventarte. Si imaginar 20 años más haciendo lo mismo te deprime, sí."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>Crisis de los 40 Profesional</span>
        </nav>

        <header className="article-header">
          <h1>Crisis de los 40: Qué Hacer con tu Carrera Cuando Todo Parece Estancado</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Lectura: 8 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="intro-box">
            <p>
              Tienes 40 (o cerca). Has construido una carrera. Tienes experiencia, credibilidad, probablemente
              un salario decente. Y sin embargo, hay una pregunta que no te deja en paz: <strong>"¿esto es
              todo?"</strong>
            </p>
            <p>
              Miras hacia adelante y ves 25 años más de lo mismo. Miras hacia atrás y no recuerdas cuándo
              fue la última vez que te emocionó un proyecto. Bienvenido a la crisis de los 40.
            </p>
          </section>

          <h2>Primero: no estás loco (ni solo)</h2>
          <p>
            Hay investigación seria sobre esto. La "curva de la felicidad" tiene forma de U: la satisfacción
            vital baja en los 40-50 y vuelve a subir después. Es un fenómeno documentado en decenas de países.
            No es un fallo tuyo; es biología, expectativas y la matemática de la vida.
          </p>
          <p>
            A los 40 ya sabes qué caminos no vas a tomar. Ya no eres "joven promesa". Las posibilidades
            infinitas de los 25 se han concretado en una vida específica. Y eso, aunque sea exactamente
            lo que querías, puede sentirse como una cárcel.
          </p>

          <h2>Las tres formas en que se manifiesta</h2>

          <h3>1. El "piloto automático"</h3>
          <p>
            Tu trabajo está bien. No lo odias. Pero llevas años sin sentir nada. Haces las cosas porque
            sabes hacerlas, no porque te importen. Los domingos por la noche no te angustian, pero tampoco
            te emocionan los lunes.
          </p>
          <p>
            <em>Ejemplo real:</em> "Llevo 15 años en finanzas. Soy bueno. Gano bien. Pero si mañana me
            despidieran... no sé si me importaría."
          </p>

          <h3>2. El "éxito vacío"</h3>
          <p>
            Has conseguido lo que se supone que querías. El título. El puesto. El sueldo. Y ahora que lo
            tienes, descubres que no te llena. Peor: admitirlo te hace sentir desagradecido o absurdo.
          </p>
          <p>
            <em>Ejemplo real:</em> "Soy directora de marketing en una empresa que cualquiera envidiaría.
            Y cada día me pregunto qué estoy haciendo con mi vida."
          </p>

          <h3>3. El "¿y ahora qué?"</h3>
          <p>
            Has llegado al techo. No hay más escalones que subir (o los que hay no te interesan). El juego
            que te motivaba ya no tiene más niveles. Y nadie te preparó para este momento.
          </p>
          <p>
            <em>Ejemplo real:</em> "Podría ser socio de la firma. Pero miro a los socios y no quiero su vida.
            ¿Entonces qué hago? ¿Me quedo haciendo lo mismo 20 años más?"
          </p>

          <h2>Lo que NO funciona</h2>

          <ul>
            <li><strong>Ignorarlo y seguir.</strong> La crisis no desaparece. Se enquista. Y un día explota de formas menos controlables (burnout, decisiones impulsivas, resentimiento).</li>
            <li><strong>Comprar cosas.</strong> El coche, la reforma, el viaje. Distracción temporal. No resuelve nada.</li>
            <li><strong>Abandonar todo impulsivamente.</strong> Dejarlo todo y "seguir tu pasión" sin plan es romántico en las películas y desastroso en la vida real. Especialmente a los 40, con responsabilidades.</li>
          </ul>

          <h2>Lo que SÍ funciona: un proceso en 4 pasos</h2>

          <h3>Paso 1: Diagnostica qué te falta exactamente</h3>
          <p>
            "Algo no va bien" no es un diagnóstico. Necesitas ser más preciso. ¿Qué específicamente te falta?
          </p>
          <ul>
            <li><strong>¿Autonomía?</strong> ¿Sientes que no controlas tu tiempo, tus decisiones, tu trabajo?</li>
            <li><strong>¿Maestría?</strong> ¿Has dejado de crecer, aprender, mejorar?</li>
            <li><strong>¿Propósito?</strong> ¿Tu trabajo no conecta con nada que te importe?</li>
            <li><strong>¿Conexión?</strong> ¿Trabajas solo o con gente que no te aporta?</li>
            <li><strong>¿Reconocimiento?</strong> ¿Sientes que lo que haces no importa a nadie?</li>
          </ul>
          <p>
            La solución para alguien que necesita más autonomía es muy diferente de la de alguien que necesita
            más propósito. No te saltes este paso.
          </p>

          <h3>Paso 2: Separa el trabajo de la carrera</h3>
          <p>
            Pregunta clave: <strong>¿el problema es ESTE trabajo o es ESTE tipo de trabajo?</strong>
          </p>
          <p>
            Si te imaginas haciendo lo mismo pero en una empresa diferente, con un jefe diferente, con
            más flexibilidad... y eso te parece bien, no necesitas reinventarte. Necesitas cambiar de
            contexto.
          </p>
          <p>
            Si te imaginas haciendo lo mismo en cualquier contexto y eso te deprime... entonces sí estás
            ante un cambio de carrera real.
          </p>

          <h3>Paso 3: No empieces de cero (no tienes que hacerlo)</h3>
          <p>
            El error más común: pensar que reinventarse significa tirar todo lo anterior. A los 40 tienes
            habilidades, red de contactos, credibilidad. No las desperdicies.
          </p>
          <p>
            La estrategia inteligente: <strong>pivotar, no resetear</strong>. ¿Qué habilidades tienes que
            pueden aplicarse en un contexto diferente? ¿Qué sectores o roles usan lo que ya sabes pero
            te darían lo que te falta?
          </p>
          <p>
            Ejemplos reales de pivotes a los 40:
          </p>
          <ul>
            <li>Director financiero → CFO de ONG (mismo trabajo, propósito diferente)</li>
            <li>Abogada de empresa → mediadora independiente (mismas habilidades, más autonomía)</li>
            <li>Ingeniero de software → engineering manager → coach técnico (mismo campo, rol diferente)</li>
          </ul>

          <h3>Paso 4: Prueba antes de saltar</h3>
          <p>
            No dejes tu trabajo para "descubrir qué quieres". Descúbrelo mientras sigues cobrando.
          </p>
          <ul>
            <li><strong>Proyectos paralelos:</strong> ¿Puedes explorar la nueva dirección con un side project, freelance ocasional, o voluntariado?</li>
            <li><strong>Conversaciones:</strong> Habla con gente que hace lo que crees que quieres hacer. Pregunta qué tal es realmente. La realidad suele ser diferente de la fantasía.</li>
            <li><strong>Experimentos cortos:</strong> Antes de dejar todo por "consultoría independiente", prueba a hacer un proyecto como consultor mientras sigues empleado.</li>
          </ul>

          <h2>El privilegio de los 40</h2>
          <p>
            A los 25 tenías energía infinita y cero claridad. A los 40 tienes más claridad sobre lo que
            no quieres. Eso es información valiosa.
          </p>
          <p>
            También tienes algo que no tenías antes: habilidades reales, contactos reales, dinero ahorrado
            (ojalá), y la capacidad de tomar decisiones sin tanta impulsividad.
          </p>
          <p>
            La crisis de los 40 no es un problema. Es una oportunidad de rediseño. La pregunta es si la
            aprovechas o la dejas pasar.
          </p>

          <section className="faq-section">
            <h2>Preguntas frecuentes</h2>

            <h3>¿Es normal tener una crisis profesional a los 40?</h3>
            <p>
              Sí. Estudios muestran que la satisfacción vital tiene forma de U: baja alrededor de los 40-50
              y vuelve a subir después. No estás solo ni eres raro. Lo que haces con esa crisis es lo que
              marca la diferencia.
            </p>

            <h3>¿Es tarde para cambiar de carrera a los 40?</h3>
            <p>
              No, pero tienes que ser estratégico. A los 40 tienes 25+ años de vida laboral por delante.
              Tiempo de sobra para construir algo nuevo. La clave es no empezar de cero: transferir
              habilidades que ya tienes a un campo nuevo.
            </p>

            <h3>¿Cómo sé si necesito un cambio radical o solo un ajuste?</h3>
            <p>
              Pregúntate: ¿el problema es el trabajo actual (jefe, empresa, condiciones) o es el tipo de
              trabajo en sí? Si cambiando de empresa pero haciendo lo mismo te sentirías bien, no necesitas
              reinventarte. Si imaginar 20 años más haciendo lo mismo te deprime, sí.
            </p>
          </section>

          <div className="cta-box">
            <h3>¿Listo para hacer el diagnóstico?</h3>
            <p>
              Identifica qué habilidades tienes y hacia qué roles puedes pivotar. Un análisis de 15 minutos
              que te ahorra meses de dar vueltas.
            </p>
            <Link href="https://carrera.negoia.com?utm_source=seo&utm_medium=blog&utm_campaign=crisis_40&utm_content=cta_principal" className="btn btn-primary">
              Descubrir mis opciones →
            </Link>
          </div>

          <div className="secondary-cta">
            <p>
              ¿Prefieres empezar con algo más ligero?
              <Link href="https://carrera.negoia.com/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=crisis_40&utm_content=cta_encuesta"> Responde 5 preguntas rápidas</Link> y
              te damos un primer análisis de tu situación.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
