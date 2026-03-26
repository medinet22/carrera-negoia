import Link from 'next/link'

export const metadata = {
  title: '7 Señales de que Tu Trabajo Te Está Quemando (No Solo Estrés) | 2026',
  description: 'Cómo distinguir si estás estresado o realmente quemado. Las 7 señales que nadie te cuenta y qué hacer antes de que sea tarde.',
  keywords: 'burnout laboral, trabajo me quema, síntomas burnout, estrés laboral crónico, agotamiento profesional, síndrome del quemado',
  openGraph: {
    title: '7 Señales de que Tu Trabajo Te Está Quemando (No Solo Estrés)',
    description: 'Guía práctica para detectar burnout real vs estrés pasajero. Con plan de acción.',
    url: 'https://carrera.negoia.com/senales-trabajo-te-quema',
    type: 'article',
  },
  alternates: {
    canonical: 'https://carrera.negoia.com/senales-trabajo-te-quema',
  },
}

export default function SenalesTrabajoTeQuema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '7 Señales de que Tu Trabajo Te Está Quemando (No Solo Estrés)',
    datePublished: '2026-03-26',
    dateModified: '2026-03-26',
    author: { '@type': 'Organization', name: 'carrera.negoia.com' },
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto tarda en recuperarse del burnout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende del nivel. Burnout leve: 2-4 semanas de descanso real (no estar en casa respondiendo emails). Burnout severo: 3-6 meses mínimo, a veces más. La clave es actuar antes de llegar al punto de no retorno.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo tener burnout si me gusta mi trabajo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, de hecho es más común de lo que piensas. Los que aman su trabajo tienden a ignorar las señales de alerta. "Si me gusta, ¿cómo voy a estar quemado?" Así hasta que el cuerpo dice basta.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Debería dejarlo todo si tengo burnout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No necesariamente. A veces cambiar de rol, de equipo, o de empresa basta. A veces necesitas un parón real. Lo que no funciona es seguir igual esperando que se pase solo. Nunca se pasa solo.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <article className="article-page">
        <div className="article-header">
          <span className="article-category">Burnout</span>
          <h1>7 Señales de que Tu Trabajo Te Está Quemando (No Solo Estrés)</h1>
          <p className="article-meta">
            Cómo detectar burnout real antes de que sea tarde · Actualizado marzo 2026
          </p>
        </div>

        <div className="article-content">
          <p className="lead">
            <strong>Llegas a casa. Cenas. Te sientas en el sofá.</strong> No tienes energía para nada. Ni para ver una serie. Ni para hablar con tu pareja. El fin de semana duermes 12 horas y sigues cansado. El lunes llega y piensas: "¿cómo voy a aguantar otra semana?"
          </p>

          <p>
            Todo el mundo te dice que "es estrés normal". Que "todos estamos así". Que "hay que aguantar". Pero tú sabes que esto no es normal. Algo ha cambiado.
          </p>

          <p>
            Esta guía te va a ayudar a distinguir si lo que tienes es estrés pasajero (que se va con vacaciones) o burnout real (que no se va hasta que cambias algo estructural).
          </p>

          <h2>Estrés vs Burnout: la diferencia que nadie explica bien</h2>

          <p>
            Mucha gente confunde los dos porque se sienten parecidos. Pero son muy diferentes:
          </p>

          <ul>
            <li><strong>Estrés:</strong> Exceso de todo. Demasiadas tareas, demasiada presión, demasiado poco tiempo. Te sientes abrumado pero con energía. Si te quitan carga, mejoras.</li>
            <li><strong>Burnout:</strong> Vacío total. No sientes nada. Ni motivación, ni ilusión, ni siquiera enfado. Solo quieres que te dejen en paz. Aunque te quiten carga, sigues igual.</li>
          </ul>

          <div className="callout">
            <strong>El test de las vacaciones:</strong> ¿Después de 2 semanas de vacaciones vuelves con energía? → Era estrés. ¿Vuelves igual de vacío que te fuiste? → Es burnout.
          </div>

          <h2>Las 7 señales de burnout que nadie te cuenta</h2>

          <h3>1. El cinismo te sale sin querer</h3>
          
          <p>
            Antes te importaba hacer bien las cosas. Ahora piensas "para qué, si da igual". Comentarios ácidos en reuniones. Ojos en blanco cuando alguien propone algo. No es que seas mala persona — es que tu cerebro ha dejado de invertir energía emocional en algo que ya no le importa.
          </p>

          <h3>2. El domingo por la noche es insoportable</h3>
          
          <p>
            No hablo de "qué pereza volver al trabajo". Hablo de ansiedad física. Estómago cerrado. Dificultad para dormir. Despertar a las 4am pensando en el email que no contestaste. Si esto te pasa cada semana, no es normal.
          </p>

          <h3>3. Tu cuerpo está hablando (y lo ignoras)</h3>
          
          <p>
            Dolor de espalda constante. Dolor de cabeza. Problemas digestivos. Mandíbula apretada. Contracturas que no se van con masajes. El cuerpo absorbe lo que la mente no procesa. Si llevas meses con dolores "sin causa clara", probablemente la causa es tu trabajo.
          </p>

          <h3>4. Nada te da placer (ni fuera del trabajo)</h3>
          
          <p>
            Esto es lo que más asusta. Antes te gustaba salir con amigos, leer, hacer deporte, cocinar... ahora todo te da igual. "Anhedonia" lo llaman los psicólogos. No es depresión (aunque se parece), es que tu sistema de recompensa está frito de tanto forzarlo.
          </p>

          <h3>5. Te sientes incompetente aunque hagas tu trabajo bien</h3>
          
          <p>
            Terminas proyectos y no sientes nada. Cero satisfacción. Incluso piensas que "cualquiera podría hacerlo". Tu capacidad real no ha cambiado — lo que ha cambiado es tu capacidad de reconocerla. Es otra señal de agotamiento emocional.
          </p>

          <h3>6. Te aíslas de la gente que te importa</h3>
          
          <p>
            No es que no quieras verlos. Es que no tienes energía para ellos. Cancelas planes. Respondes mensajes con monosílabos. Te sientes culpable pero no puedes evitarlo. El burnout te roba primero la energía para los demás.
          </p>

          <h3>7. Piensas en dejarlo todo (pero no haces nada)</h3>
          
          <p>
            Fantaseas con renunciar. Con montar algo propio. Con irte a vivir a otro país. Pero no das ningún paso. No por miedo — por falta de energía. El burnout te paraliza: sabes que algo tiene que cambiar pero no puedes moverte.
          </p>

          <div className="cta-box" style={{ background: '#f0fdf4', border: '2px solid #22c55e' }}>
            <h3>¿Te identificas con 3 o más señales?</h3>
            <p>Antes de tomar decisiones impulsivas, necesitas claridad. Un análisis de tu perfil te ayuda a ver hacia dónde puedes ir — no solo de qué huyes.</p>
            <Link 
              href="/analisis-carrera?utm_source=seo&utm_medium=blog&utm_campaign=senales_burnout&utm_content=cta_principal"
              className="btn btn-primary"
            >
              Análisis de Carrera con IA — €29 →
            </Link>
          </div>

          <h2>Qué hacer si confirmas que tienes burnout</h2>

          <h3>Paso 1: Para la hemorragia (esta semana)</h3>
          
          <p>
            No puedes arreglar nada si sigues sangrando energía. Acciones inmediatas:
          </p>

          <ul>
            <li><strong>Elimina lo prescindible:</strong> Esa reunión semanal que no aporta. Ese proyecto extra que aceptaste por compromiso. Ese email que puedes no responder. Di que no a todo lo que puedas.</li>
            <li><strong>Protege las noches:</strong> Cero trabajo después de las 19h. Teléfono del trabajo en otra habitación. Si no puedes desconectar mentalmente, al menos desconecta físicamente.</li>
            <li><strong>Muévete:</strong> 20 minutos de caminar al día. No para "hacer ejercicio" sino para que tu cuerpo procese el estrés acumulado.</li>
          </ul>

          <h3>Paso 2: Entiende qué te quema exactamente (este mes)</h3>
          
          <p>
            El burnout no es "todo". Suele haber 1-3 factores principales:
          </p>

          <ul>
            <li>¿Es el volumen de trabajo? (demasiadas horas)</li>
            <li>¿Es la falta de control? (te dicen qué hacer pero no cómo)</li>
            <li>¿Es el jefe/equipo? (toxicidad, micromanagement)</li>
            <li>¿Es la falta de sentido? (no ves el para qué)</li>
            <li>¿Es el desajuste de valores? (haces cosas que van contra lo que crees)</li>
          </ul>

          <p>
            Identificar el factor principal te dice qué cambiar. A veces es el puesto, a veces la empresa, a veces el sector entero.
          </p>

          <h3>Paso 3: Prepara tu siguiente paso (este trimestre)</h3>
          
          <p>
            No renuncias mañana. Pero tampoco te quedas para siempre. Empieza a:
          </p>

          <ul>
            <li><strong>Actualizar CV</strong> con logros concretos de los últimos 2 años</li>
            <li><strong>Explorar opciones</strong> hablando con gente que hace lo que te interesa</li>
            <li><strong>Ahorrar colchón</strong> de 3-6 meses por si decides dar el salto</li>
            <li><strong>Entender tus habilidades</strong> reales (no las de tu título, las que usas de verdad)</li>
          </ul>

          <h2>El mito del "aguanta que ya pasará"</h2>

          <p>
            Esto es mentira. El burnout no pasa solo. Empeora. Lo que empezó como cansancio acaba en problemas serios de salud, en relaciones rotas, en depresión clínica.
          </p>

          <p>
            No te digo que renuncies mañana. Te digo que dejes de ignorar las señales. Tu cuerpo te está hablando. ¿Le vas a escuchar o vas a esperar hasta que grite?
          </p>

          <h2>Preguntas frecuentes</h2>

          <div className="faq-section">
            <div className="faq-item">
              <h3>¿Cuánto tarda en recuperarse del burnout?</h3>
              <p>
                Depende del nivel. Burnout leve: 2-4 semanas de descanso real (no estar en casa respondiendo emails). Burnout severo: 3-6 meses mínimo, a veces más. La clave es actuar antes de llegar al punto de no retorno.
              </p>
            </div>

            <div className="faq-item">
              <h3>¿Puedo tener burnout si me gusta mi trabajo?</h3>
              <p>
                Sí, de hecho es más común de lo que piensas. Los que aman su trabajo tienden a ignorar las señales de alerta. "Si me gusta, ¿cómo voy a estar quemado?" Así hasta que el cuerpo dice basta.
              </p>
            </div>

            <div className="faq-item">
              <h3>¿Debería dejarlo todo si tengo burnout?</h3>
              <p>
                No necesariamente. A veces cambiar de rol, de equipo, o de empresa basta. A veces necesitas un parón real. Lo que no funciona es seguir igual esperando que se pase solo. Nunca se pasa solo.
              </p>
            </div>
          </div>

          <div className="cta-box final-cta">
            <h3>El primer paso: entender qué se te da bien de verdad</h3>
            <p>Cuando estás quemado, todo parece difícil. Pero tus habilidades siguen ahí. Descubre cuáles son y hacia dónde puedes ir.</p>
            <Link 
              href="/encuesta?utm_source=seo&utm_medium=blog&utm_campaign=senales_burnout&utm_content=cta_encuesta"
              className="btn btn-primary"
            >
              Test de habilidades (2 min) →
            </Link>
          </div>
        </div>

        <footer className="article-footer">
          <p>
            <Link href="/">← Volver a carrera.negoia.com</Link>
          </p>
        </footer>
      </article>
    </>
  )
}
