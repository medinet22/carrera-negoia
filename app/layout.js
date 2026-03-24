import './globals.css'
import AnalyticsTracker from './components/AnalyticsTracker'

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

        {/* Clarity */}
        <script dangerouslySetInnerHTML={{__html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vulopprnt8");
        `}} />

        {/* PostHog */}
        <script dangerouslySetInnerHTML={{__html: `
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister unregister_once identify alias set_config reset opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing start_session_recording stop_session_recording onFeatureFlags getFeatureFlag onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_bZhqMaBL4KBVzbNmdBbVcoWmOo4Dh9mysScZYPRirqT', {
            api_host: 'https://us.i.posthog.com',
            autocapture: true,
            capture_pageview: false,
            capture_pageleave: true,
            person_profiles: 'identified_only',
            before_send: function(event) {
              event.properties = event.properties || {};
              if (!event.properties.site) event.properties.site = 'carrera';
              if (!event.properties.traffic_type) {
                var ua = (navigator.userAgent || '').toLowerCase();
                var isTechnical = !!(navigator.webdriver || /(bot|spider|crawler|headless|lighthouse|slurp|facebookexternalhit|preview)/i.test(ua));
                event.properties.traffic_type = isTechnical ? 'technical' : 'human';
                event.properties.is_technical_session = isTechnical;
              }
              return event;
            }
          });
          posthog.register({ site: 'carrera' });

          (function setupAnalytics() {
            var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
            var params = new URLSearchParams(window.location.search);
            var freshUtm = {};
            UTM_KEYS.forEach(function(k){ if(params.get(k)) freshUtm[k] = params.get(k); });
            if (Object.keys(freshUtm).length) {
              var stored = {};
              try { stored = JSON.parse(sessionStorage.getItem('utms')||'{}'); } catch(e){}
              var merged = Object.assign({}, stored, freshUtm);
              sessionStorage.setItem('utms', JSON.stringify(merged));
              posthog.register(merged);
              posthog.capture('utm_captured', merged);
            }
          })();
        `}} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Es un PDF que me envían por email?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, es una plataforma web interactiva. No recibes un documento estático — accedes a tu perfil personal donde puedes explorar roles, seleccionar los que te interesan, ver gaps de cada uno, y generar documentos cuando estés listo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Tengo que pagar para ver mi Mapa de Habilidades?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. El Mapa de Habilidades (radar interactivo + texto narrativo + preview de 3 roles) es 100% gratis. Solo pagas si quieres explorar todos los roles con datos completos y usar el sistema de selección."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué pasa si cambio de opinión sobre los roles?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Puedes cambiar tus selecciones cuando quieras. Si descartaste un rol y luego lo quieres reconsiderar, simplemente vuelves y lo marcas como 'Me interesa'. La plataforma es tuya."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuál es la diferencia entre el Plan Básico y el Completo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "El Básico (€29) te da acceso a explorar todos los roles, seleccionar los que te interesan, y ver el gap analysis y plan de estudio. El Completo (€39) añade la sección 'Mis Documentos' donde generas CVs específicos por rol, cartas de presentación, y tu elevator pitch."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuánto tiempo tengo acceso?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Para siempre. No es una suscripción. Pagas una vez y tienes acceso permanente a tu nivel desbloqueado."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  )
}
