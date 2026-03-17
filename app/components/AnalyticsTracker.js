'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { isTechnicalSession, track } from '../lib/analytics'

function TrackerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const qs = searchParams?.toString()
    const url = qs ? `${pathname}?${qs}` : pathname

    if (window.__carrera_last_pageview === url) return
    window.__carrera_last_pageview = url

    track('$pageview', {
      path: pathname,
      current_url: url,
      page_group: pathname === '/encuesta' ? 'encuesta' : pathname === '/' ? 'home' : 'other',
      is_technical_session: isTechnicalSession(),
    })
  }, [pathname, searchParams])

  return null
}

export default function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  )
}
