import { next } from '@vercel/edge';
import {
  SESSION_COOKIE,
  isAllowedEmail,
  readCookie,
  verifySessionToken,
} from './lib/auth.js';

/**
 * The Project-Zaman archive is a static Quartz build living in public/admin,
 * which means Vercel would otherwise hand those .html files straight to
 * anyone who typed the URL — a client-side React guard can't touch them.
 * This middleware runs ahead of the static file layer, so it is the only
 * place the gate actually holds.
 */
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

const LOGIN_PATH = '/admin/login';

function redirectToLogin(requestUrl, attemptedPath) {
  const login = new URL(LOGIN_PATH, requestUrl);
  // Preserve the deep link so sign-in drops you where you were headed.
  if (attemptedPath && attemptedPath !== '/admin' && attemptedPath !== '/admin/') {
    login.searchParams.set('next', attemptedPath);
  }
  return new Response(null, {
    status: 302,
    headers: {
      Location: login.toString(),
      // Without this a browser can cache the bounce and keep redirecting
      // after the visitor has signed in.
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // The login page itself has to stay reachable, or this redirects forever.
  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return next();
  }

  const secret = process.env.AUTH_SECRET;
  // No signing secret means no trustworthy session — stay shut.
  if (!secret) return redirectToLogin(url, pathname);

  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return redirectToLogin(url, `${pathname}${url.search}`);

  const claims = await verifySessionToken(token, secret);
  if (!claims || !isAllowedEmail(claims.email, process.env)) {
    return redirectToLogin(url, `${pathname}${url.search}`);
  }

  return next();
}
