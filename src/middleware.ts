import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // Check if the hostname is a subdomain
  const currentHost = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
    ? hostname.replace(`.yourdomain.com`, '') // Replace with your actual domain
    : hostname.replace(`.localhost:3000`, '');

  // If it's the fund subdomain
  if (currentHost === 'fund') {
    // Rewrite to /fund/... 
    return NextResponse.rewrite(new URL(`/fund${path}`, request.url));
  }

  // If it's not a subdomain, continue with the request
  return NextResponse.next();
} 