import { NextResponse } from 'next/server'

// Note: This middleware does client-side redirect hints.
// Actual protection happens in the API routes and page components
// by checking userId and payment status server-side.

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl
  
  // Protected routes that require userId
  const protectedRoutes = ['/profile', '/processing', '/upgrade', '/roles', '/selected', '/documents']
  
  // Check if this is a protected route
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtected) {
    const userId = searchParams.get('userId')
    
    // If no userId in URL, let the page component handle the redirect
    // (it will check localStorage)
    if (!userId) {
      // We can't check localStorage in middleware (server-side)
      // So we let the request through and the client component handles it
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
}
