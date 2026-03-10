import Link from 'next/link'

export const metadata = {
  title: 'Test de Habilidades Profesionales Gratis | Descubre tus Competencias 2026',
  description: 'Realiza el test de habilidades profesionales gratis y descubre cuáles son tus competencias reales. Análisis con IA en 15 minutos. Sin registro previo.',
  keywords: 'test habilidades profesionales, test competencias laborales, evaluación habilidades gratis, descubrir habilidades profesionales',
  openGraph: {
    title: 'Test de Habilidades Profesionales Gratis | Descubre tus Competencias',
    description: 'Descubre tus habilidades profesionales reales con este test gratuito basado en IA. Resultados personalizados en 15 minutos.',
    url: 'https://carrera.negoia.com/test-habilidades-profesionales',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/test-habilidades-profesionales',
  },
}

export default function TestHabilidadesProfesionales() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo hacer un test de habilidades profesionales gratis",
    "description": "Guía paso a paso para evaluar tus habilidades profesionales y descubrir tus competencias reales.",
    "step": [
      { "@type": "HowToStep", "name": "Describe tu experiencia laboral", "text": "Escribe un resumen de tus trabajos anteriores y tareas principales." },
      { "@type": "HowToStep", "name": "La IA analiza tus competencias", "text": "El sistema identifica habilidades técnicas y blandas de tu trayectoria." },
      { "@type": "HowToStep", "name": "Recibe tu perfil de habilidades", "text": "Obtén un mapa detallado de tus competencias con niveles de dominio." }
    ]
  }

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="article-container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> → <span>Test de Habilidades Profesionales</span>
        </nav>

        <header className="article-header">
          <h1>Test de Habilidades Profesionales Gratis: Descubre tus Competencias Reales</h1>
          <p className="article-meta">
            Actualizado: Marzo 2026 · Tiempo de lectura: 7 minutos
          </p>
        </header>

        <div className="article-content">
          <section className="definition-box">
            <h2>¿Qué es un test de habilidades profesionales?</h2>
            <p>
              Un <strong>test de habilidades profesionales</strong> es una evaluación que te ayuda a identificar y medir
              las competencias que has desarrollado a lo largo de tu carrera. A diferencia de los tests de personalidad
              (MBTI, DISC), este tipo de evaluación se centra en habilidades concretas y aplicables al mercado laboral:
              lo que realmente sabes hacer, no solo cómo eres.
            </p>
            <p>
              Los tests tradicionales tardan horas y suelen dar resultados genéricos. Las herramientas modernas basadas
              en inteligencia artificial pueden analizar tu experiencia y generar un perfil detallado en menos de 15 minutos.
            </p>
          </section>

          <h2>Por qué necesitas evaluar tus habilidades profesionales ahora</h2>
          <p>
            El mercado laboral español ha cambiado radicalmente en los últimos años. Según datos del SEPE, más del
            40% de los trabajadores consideran que sus habilidades actuales no son suficientes para los roles del futuro.
            Sin embargo, la mayoría también subestima gravemente las competencias que ya tiene.
          </p>
          <p>
            Conocer exactamente cuáles son tus habilidades te permite:
          </p>
          <ul>
            <li><strong>Postularte a ofertas con más seguridad:</strong> Sabes exactamente qué puedes aportar</li>
            <li><strong>Identificar tu valor real en el mercado:</strong> Y negociar salarios en consecuencia</li>
            <li><strong>Detectar gaps críticos:</strong> Qué aprender para ser más empleable</li>
            <li><strong>Encontrar roles alternativos:</strong> Sectores donde tus habilidades ya tienen demanda</li>
          </ul>

          <h2>Tipos de tests de habilidades profesionales</h2>

          <h3>1. Tests de habilidades técnicas (hard skills)</h3>
          <p>
            Evalúan competencias específicas de un área: programación, contabilidad, idiomas, diseño gráfico, manejo
            de software. Suelen incluir ejercicios prácticos o preguntas de conocimiento. Son útiles para validar
            niveles de dominio antes de incluirlos en el CV.
          </p>

          <h3>2. Tests de habilidades blandas (soft skills)</h3>
          <p>
            Miden capacidades interpersonales y de comportamiento: liderazgo, comunicación, gestión del tiempo,
            trabajo en equipo. Se suelen realizar mediante cuestionarios de situaciones hipotéticas o análisis
            de comportamiento pasado.
          </p>

          <h3>3. Tests de análisis de experiencia con IA</h3>
          <p>
            La forma más eficiente y completa. Describes tu trayectoria y la inteligencia artificial extrae
            automáticamente un perfil de habilidades técnicas y blandas. Sin preguntas genéricas, sin resultados
            vacíos. Solo un análisis concreto de lo que realmente has hecho.
          </p>

          <h2>Cómo prepararte para sacar el máximo partido al test</h2>

          <h3>Antes de empezar</h3>
          <ol>
            <li>Reúne información sobre tus trabajos anteriores: cargos, responsabilidades, logros</li>
            <li>Piensa en proyectos concretos que hayas liderado o en los que hayas participado</li>
            <li>Incluye tanto experiencia laboral formal como proyectos personales, voluntariado o formación</li>
            <li>No filtres nada por "irrelevante": a veces las habilidades más valiosas vienen de donde menos esperas</li>
          </ol>

          <h3>Durante el test</h3>
          <p>
            Sé específico. "Gestioné un equipo" aporta poco. "Coordiné un equipo de 8 personas para lanzar un
            nuevo producto en 3 meses, reduciendo costes un 15%" da información real y accionable.
          </p>

          <h2>Qué esperar de los resultados</h2>
          <p>
            Un buen test de habilidades profesionales te dará:
          </p>
          <ul>
            <li>Un listado de competencias ordenadas por nivel de dominio</li>
            <li>La diferencia entre habilidades técnicas y blandas</li>
            <li>Sugerencias de roles donde esas habilidades tienen demanda</li>
            <li>Identificación de gaps respecto a los roles que te interesan</li>
            <li>Recomendaciones de formación priorizadas</li>
          </ul>

          <h2>Errores comunes al hacer un test de habilidades</h2>
          <ul>
            <li><strong>Ser demasiado modesto:</strong> El 70% de los profesionales subestima sus competencias</li>
            <li><strong>Solo listar títulos:</strong> Los roles son contexto, no son la habilidad en sí</li>
            <li><strong>Ignorar experiencias no laborales:</strong> La gestión de un hogar, el voluntariado, los proyectos personales cuentan</li>
            <li><strong>No revisar los resultados con criterio:</strong> Los resultados son un punto de partida, no una verdad absoluta</li>
          </ul>

          <h2>El test de habilidades como punto de partida</h2>
          <p>
            Conocer tus habilidades no es un ejercicio teórico. Es la base para tomar decisiones profesionales
            informadas. Si estás en búsqueda activa, en transición de carrera, o simplemente quieres saber cuánto
            vales en el mercado, un test de habilidades profesionales es el primer paso.
          </p>
          <p>
            En España, el mercado laboral valora cada vez más la capacidad de articular claramente tus competencias.
            Los candidatos que saben exactamente qué pueden ofrecer tienen significativamente más éxito en sus
            procesos de selección.
          </p>

          <div className="cta-box">
            <h3>Haz el test de habilidades profesionales con IA ahora</h3>
            <p>Gratis para los primeros 100 usuarios. En 15 minutos descubres para qué eres realmente bueno.</p>
            <Link href="https://carrera.negoia.com" className="btn btn-primary">Empezar el test gratis →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
