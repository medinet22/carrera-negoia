import Link from 'next/link'

export const metadata = {
  title: 'Orientación Laboral Gratis Online: Guía para Saber Qué Trabajo Te Encaja (2026)',
  description:
    'Descubre cómo obtener orientación laboral gratis online de forma práctica: pasos, errores comunes y plan de 30 días para elegir un trabajo con más futuro.',
  keywords:
    'orientación laboral gratis online, orientación profesional gratis, saber qué trabajo me encaja, cambiar de trabajo',
  openGraph: {
    title: 'Orientación Laboral Gratis Online: Guía Práctica',
    description:
      'Método paso a paso para aclarar tu perfil profesional y elegir roles con más oportunidades.',
    url: 'https://carrera.negoia.com/orientacion-laboral-gratis-online',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/orientacion-laboral-gratis-online',
  },
}

export default function OrientacionLaboralGratisOnlinePage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Orientación Laboral Gratis Online: Guía para Saber Qué Trabajo Te Encaja',
    description:
      'Guía práctica para obtener claridad profesional con orientación laboral gratis online y convertirla en un plan de cambio real.',
    datePublished: '2026-03-10',
    dateModified: '2026-03-10',
    author: { '@type': 'Organization', name: 'carrera.negoia.com' },
  }

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>Orientación Laboral Gratis Online</span>
        </nav>

        <header className="article-header">
          <h1>Orientación laboral gratis online: cómo elegir tu próximo trabajo sin perder meses</h1>
          <p className="article-meta">Actualizado: Marzo 2026 · Tiempo de lectura: 8 minutos</p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>Qué significa realmente “orientación laboral gratis online”</h2>
            <p>
              No es hacer un test rápido y ya. La orientación laboral útil combina tres cosas:
              <strong> autoconocimiento + demanda real del mercado + plan accionable</strong>.
            </p>
            <p>
              Si te quedas solo con “me gusta esto”, te bloqueas. Si te quedas solo con “esto paga bien”,
              te frustras. Necesitas unir ambas partes con evidencia.
            </p>
          </section>

          <h2>Por qué la mayoría se queda estancada</h2>
          <ul>
            <li><strong>Exceso de opciones:</strong> comparas 20 caminos y no eliges ninguno.</li>
            <li><strong>CV genérico:</strong> no traduce tu experiencia a valor concreto.</li>
            <li><strong>Objetivo difuso:</strong> aplicas a ofertas sin un criterio claro.</li>
            <li><strong>Sin sistema:</strong> haces esfuerzos sueltos, no un proceso repetible.</li>
          </ul>

          <h2>Método práctico en 4 pasos</h2>

          <h3>1) Inventario de habilidades transferibles (día 1-2)</h3>
          <p>
            Lista proyectos, responsabilidades y logros de los últimos 5-10 años. Extrae habilidades
            técnicas, de comunicación, liderazgo y resolución de problemas.
          </p>

          <h3>2) Filtra por mercado real (día 3-5)</h3>
          <p>
            Revisa 30 ofertas de empleo y detecta patrones: herramientas, competencias y seniority.
            Busca encaje, no perfección.
          </p>

          <h3>3) Crea 2 rutas profesionales viables (semana 2)</h3>
          <p>
            Define dos roles objetivo con buena demanda y coherentes con tu experiencia. Evita apostar todo
            a una sola opción.
          </p>

          <h3>4) Ejecuta un sprint de 30 días (semana 3-4)</h3>
          <ul>
            <li>CV orientado a rol</li>
            <li>Perfil LinkedIn optimizado</li>
            <li>10 candidaturas de alta calidad por semana</li>
            <li>5 conversaciones con profesionales del sector</li>
          </ul>

          <h2>Errores que debes evitar</h2>
          <ul>
            <li>Esperar “la opción perfecta” antes de moverte.</li>
            <li>Ignorar tus habilidades invisibles (las que haces en automático).</li>
            <li>Cambiar de rumbo cada semana por ansiedad.</li>
            <li>No medir resultados (respuestas, entrevistas, feedback).</li>
          </ul>

          <div className="cta-box">
            <h3>¿Quieres bajar esto a tu caso real en 15 minutos?</h3>
            <p>
              Empieza con tu diagnóstico y descubre qué roles encajan contigo según tu experiencia.
            </p>
            <Link
              href="/?utm_source=seo&utm_medium=article&utm_campaign=sprint_trafico_dia1&utm_content=orientacion_laboral_cta_principal"
              className="btn btn-primary"
            >
              Ver mi mapa de habilidades gratis →
            </Link>
            <p style={{ marginTop: '12px' }}>
              <Link
                href="/encuesta?utm_source=seo&utm_medium=article&utm_campaign=sprint_trafico_dia1&utm_content=orientacion_laboral_cta_secundaria"
              >
                O ir directo a la encuesta de 90 segundos →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
