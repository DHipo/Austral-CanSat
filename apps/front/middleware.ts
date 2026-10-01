import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'orbit_access_token';

/**
 * Protege la suite Orbit: sin cookie de sesión se redirige al login.
 * La validez del token la confirma el backend (/auth/me) desde el cliente.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const hasSession = req.cookies.has(SESSION_COOKIE);

  if (pathname === '/orbit/login') {
    return NextResponse.next();
  }

  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/orbit/login';
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/orbit', '/orbit/:path*'],
};
