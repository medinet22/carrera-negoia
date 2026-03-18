import Link from 'next/link'

export const metadata = {
  title: 'Trabajo sin Sentido: Qué Hacer Cuando Todo Te Da Igual | 2026',
  description: 'Si tu trabajo te paga pero te vacía, no estás solo. Guía práctica con señales concretas y un plan simple para recuperar dirección profesional.',
  keywords: 'trabajo sin sentido, no le encuentro sentido a mi trabajo, vacío laboral, cambiar de trabajo, crisis profesional',
  openGraph: {
    title: 'Trabajo sin Sentido: Qué Hacer Cuando Todo Te Da Igual',
    description: 'Una guía honesta para salir del piloto automático profesional sin decisiones impulsivas.',
    url: 'https://carrera.negoia.com/trabajo-sin-sentido-que-hacer',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/trabajo-sin-sentido-que-hacer',
  },
}

export default function TrabajoSinSentidoQueHacer() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Trabajo sin Sentido: Qué Hacer Cuando Todo Te Da Igual',
    datePublished: '2026-03-18',
    dateModified: '2026-03-18',
    author: { '@type': 'Organization', name: 'carrera.negoia.com' },
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Es normal sentir que mi trabajo no tiene sentido aunque me vaya bien?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, es más común de lo que parece. Puedes tener buen sueldo y estabilidad, pero si no ves impacto ni crecimiento, aparece vacío. No es un capricho: es una señal de desalineación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Debería renunciar ya si me siento así?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No de forma impulsiva. Primero define hacia qué quieres moverte, qué habilidades ya tienes y qué transición es realista. El orden correcto es claridad primero, renuncia después.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo recupero motivación sin autoengañarme?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Empieza con acciones pequeñas medibles: detectar tus tareas de más energía, hablar con 3 personas en roles que te interesan y construir un plan de 30 días. La motivación vuelve cuando hay dirección, no al revés.',
        },
      },
    ],
  }

  return (
    <main className="blog-post">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />

      <article className="article-container">
        <header className="article-header">
          <span className="article-category">Crisis Profesional</span>
          <h1>Trabajo sin Sentido: Qué Hacer Cuando Todo Te Da Igual</h1>
          <p className="article-subtitle">
            No estás roto. Estás desconectado de lo que haces bien y de lo que te importa.
            Aquí tienes una forma práctica de salir del piloto automático.
          </p>
          <time className="article-date">Marzo 2026 · 6 min lectura</time>
        </header>

        <div className="article-content">
          <p className="intro">
            Hay una frase que se repite mucho y duele admitir: <strong>"me va bien, pero no me siento bien"</strong>.
            Cumples, cobras, tienes una rutina estable… y aun así sientes vacío.
          </p>

          <p>
            Ese vacío no siempre significa que debas tirar todo por la borda. Pero sí significa que necesitas
            mirar tu carrera con honestidad. Si no lo haces, acabas normalizando un desgaste silencioso.
          </p>

          <h2>Señales de que no es cansancio: es falta de sentido</h2>

          <h3>1) Te cuesta explicar para qué haces lo que haces</h3>
          <p>
            Si un amigo te pregunta "¿qué aportas en tu trabajo?" y respondes con tareas, no con impacto,
            probablemente hay desconexión entre tu esfuerzo y tu propósito.
          </p>

          <h3>2) Tu mejor momento del día es cuando terminas</h3>
          <p>
            Una cosa es querer descanso. Otra es sentir alivio constante por dejar de trabajar.
            Cuando eso pasa a diario, no es solo estrés puntual.
          </p>

          <h3>3) Te has vuelto eficiente, pero cínico</h3>
          <p>
            Cumples rápido, pero sin ilusión. Todo te parece "más de lo mismo". Esta combinación es peligrosa:
            mantienes rendimiento a corto plazo, pero te apagas por dentro.
          </p>

          <h3>4) Te cuesta imaginarte igual dentro de 2 años</h3>
          <p>
            Cierra los ojos y piensa: "¿sigo aquí en 24 meses?". Si te da angustia, tu intuición te está
            dando información útil, no drama.
          </p>

          <h2>Mini diagnóstico (2 minutos)</h2>
          <ol>
            <li>¿Llevas más de 4 meses sintiéndote desconectado?</li>
            <li>¿Has perdido interés por mejorar en tu rol actual?</li>
            <li>¿Sientes que tus fortalezas reales no se usan casi nunca?</li>
            <li>¿No tienes claro qué alternativa profesional encaja contigo?</li>
          </ol>
          <p>
            Si respondes "sí" a 3 o más, el problema no es "falta de motivación".
            El problema es falta de dirección clara.
          </p>

          <h2>Qué hacer sin decisiones impulsivas (plan 30 días)</h2>

          <h3>Semana 1: mapa real de tus habilidades</h3>
          <p>
            Haz una lista de tareas que has hecho bien en los últimos 3 años y qué resultado generaron.
            Ejemplo real: "organicé onboarding" no dice nada; "reduje el tiempo de onboarding de 14 a 6 días" sí.
          </p>

          <h3>Semana 2: detectar roles puente</h3>
          <p>
            No pienses en "cambio total" todavía. Busca roles cercanos donde tus habilidades actuales tengan valor.
            Saltar por puentes reales reduce riesgo y ansiedad.
          </p>

          <h3>Semana 3: validación de mercado</h3>
          <p>
            Revisa 20 ofertas de esos roles puente y marca patrones: herramientas repetidas, requisitos y salario.
            Ya no decides por intuición: decides con datos.
          </p>

          <h3>Semana 4: plan de transición</h3>
          <p>
            Define 3 acciones concretas: actualizar CV con logros, adaptar LinkedIn al rol objetivo y enviar 10 candidaturas
            de calidad. Sin esto, la claridad no se convierte en movimiento.
          </p>

          <div className="cta-box">
            <h3>¿Quieres claridad rápida y sin humo?</h3>
            <p>
              En 15 minutos puedes ver qué habilidades ya tienes y qué roles te encajan de verdad.
              Te ahorra meses de prueba-error.
            </p>
            <Link
              href="/?utm_source=seo&utm_medium=blog&utm_campaign=trabajo_sin_sentido&utm_content=cta_principal"
              className="btn btn-primary"
            >
              Quiero ver mis opciones →
            </Link>
          </div>

          <h2>Errores comunes cuando todo te da igual</h2>
          <p><strong>Esperar a tocar fondo.</strong> Cuanto más esperas, más caro sale cambiar.</p>
          <p><strong>Buscar motivación antes de dirección.</strong> La motivación viene después de ver un camino.</p>
          <p><strong>Compararte con otros.</strong> Tu transición depende de tus habilidades, no del timeline de LinkedIn.</p>

          <div className="cta-box secondary">
            <h3>Si estás bloqueado, empieza por aquí</h3>
            <p>
              Responde una encuesta rápida y te orientamos con el siguiente paso más lógico para tu caso.
            </p>
            <Link
              href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=trabajo_sin_sentido&utm_content=cta_encuesta"
              className="btn btn-secondary"
            >
              Hacer encuesta (90 segundos) →
            </Link>
          </div>

          <h2>Preguntas frecuentes</h2>

          <h3>¿Es normal sentir que mi trabajo no tiene sentido aunque me vaya bien?</h3>
          <p>
            Sí. Estabilidad y sentido no son lo mismo. Puedes tener una y perder la otra.
          </p>

          <h3>¿Debería renunciar ya si me siento así?</h3>
          <p>
            Mejor no. Primero diseña una transición realista y validada. Cambiar con plan reduce riesgo.
          </p>

          <h3>¿Cómo recupero motivación sin autoengañarme?</h3>
          <p>
            Pasando de "quiero sentirme mejor" a "voy a ejecutar estas 3 acciones esta semana".
            La acción concreta suele desbloquear la energía.
          </p>
        </div>
      </article>

      <footer className="article-footer">
        <Link href="/" className="back-link">← Volver al inicio</Link>
      </footer>
    </main>
  )
}
