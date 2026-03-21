export default function sitemap() {
  const baseUrl = 'https://carrera.negoia.com'
  const routes = [
    '',
    '/encuesta',
    '/test-orientacion-profesional',
    '/herramientas-ia-buscar-trabajo',
    '/como-hacer-cv-sin-experiencia-en-sector',
    '/burnout-laboral-que-hacer',
    '/competencias-clave-para-el-mercado-laboral',
    '/de-que-trabajo-viviria-si-empezara-hoy',
    '/como-venderte-en-entrevista',
    '/segunda-oportunidad-laboral',
    '/habilidades-transferibles',
    '/cambio-carrera-profesional',
    '/test-habilidades-profesionales',
    '/como-identificar-habilidades',
    '/cambio-carrera-40-50-anos',
    '/roles-profesionales-con-futuro',
    '/no-se-para-que-soy-bueno',
    '/que-es-mapa-habilidades',
    '/como-cambiar-de-trabajo-a-los-40',
    '/como-saber-que-trabajo-te-gusta',
    '/orientacion-laboral-gratis-online',
    '/crisis-40-anos-profesional',
    '/no-me-gusta-mi-trabajo-pero-paga-bien',
    '/miedo-a-dejar-trabajo-seguro',
    '/sindrome-impostor-trabajo',
    '/como-saber-si-cambiar-de-trabajo',
    '/trabajo-sin-sentido-que-hacer',
    '/cuando-odias-tu-trabajo',
    '/dejar-trabajo-toxico',
    '/reinventarse-profesionalmente',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
