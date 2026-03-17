'use client'

export function isTechnicalSession() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
  const ua = (navigator.userAgent || '').toLowerCase()
  return Boolean(
    navigator.webdriver ||
    /(bot|spider|crawler|headless|lighthouse|slurp|facebookexternalhit|preview)/i.test(ua)
  )
}

export function track(event, props = {}) {
  if (typeof window === 'undefined') return
  const posthog = window.posthog
  if (!posthog || typeof posthog.capture !== 'function') return

  posthog.capture(event, {
    site: 'carrera',
    traffic_type: isTechnicalSession() ? 'technical' : 'human',
    ...props,
  })
}
