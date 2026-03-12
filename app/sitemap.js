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
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
