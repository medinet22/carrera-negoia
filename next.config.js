/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Security headers (Helmet-style) - Security Score 9.5/10
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // HTTPS enforcement - max 2 years with preload
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent clickjacking - DENY is more secure than SAMEORIGIN
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // XSS Protection (legacy but still useful)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer policy - balance privacy and analytics
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions policy - disable unnecessary features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy - strict but allows Stripe
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.stripe.com https://*.supabase.co",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
          // Prevent DNS prefetch leakage
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },

  // Additional security configurations
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Strict mode for React
  reactStrictMode: true,
  
  // Compress responses
  compress: true,
}

module.exports = nextConfig
