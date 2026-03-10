import './globals.css'

export const metadata = {
  metadataBase: new URL('https://carrera.negoia.com'),
  title: {
    default: 'Carrera IA | Descubre tus Habilidades Profesionales con IA',
    template: '%s | Carrera IA'
  },
  description: '¿Llevas años trabajando y no sabes para qué eres realmente bueno? Descubre tus habilidades ocultas con IA, encuentra roles donde brillarías, y consigue el trabajo que mereces. Gratis para los primeros 100.',
  keywords: 'habilidades profesionales, test de habilidades, cambio de carrera, orientación profesional, mapa de competencias, encontrar trabajo, CV, roles profesionales, IA carrera, identificar habilidades, competencias laborales',
  authors: [{ name: 'NegoIA' }],
  creator: 'NegoIA',
  publisher: 'NegoIA',
  openGraph: {
    title: 'Descubre para qué eres bueno (de verdad) | Carrera IA',
    description: 'IA que analiza tu experiencia y descubre habilidades que no sabías que tenías. Gratis para los primeros 100.',
    url: 'https://carrera.negoia.com',
    siteName: 'Carrera IA',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Carrera IA - Descubre tu Mapa de Habilidades',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Descubre para qué eres bueno | Carrera IA',
    description: 'IA que analiza tu experiencia y descubre habilidades que no sabías que tenías.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://carrera.negoia.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Carrera IA",
              "description": "Herramienta de IA para descubrir tus habilidades profesionales y encontrar roles que encajan contigo",
              "url": "https://carrera.negoia.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "0",
                "highPrice": "49",
                "priceCurrency": "EUR",
                "offerCount": "3"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "47"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
