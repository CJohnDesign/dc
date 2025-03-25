import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Skip middleware for static files and API routes
  const { pathname } = url;
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/') ||
    pathname.includes('.') // Skip files with extensions (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Handle fund subdomain
  if (hostname.startsWith('fund.')) {
    const newUrl = new URL(`/fund${pathname}`, url);
    return NextResponse.rewrite(newUrl);
  }

  // Default behavior for non-subdomain requests
  return NextResponse.next();
}

// Only run middleware on specific paths, excluding static files
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. All files with extensions (static files)
     */
    '/((?!api|_next|.*\\.[^/]*$).*)',
  ],
}; 