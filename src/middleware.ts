import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude the login page itself and any assets
  if (pathname.startsWith('/admin/login') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const session = request.cookies.get('sb-auth-token');

  if (!session && pathname.startsWith('/admin')) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
