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

function isDocumentRequest(request) {
  const destination = request.headers.get('sec-fetch-dest');
  if (destination === 'document' || destination === 'iframe') return true;

  return (request.headers.get('accept') || '').includes('text/html');
}

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

function unauthorizedAsset() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function rejectUnauthenticated(request, requestUrl, attemptedPath) {
  return isDocumentRequest(request)
    ? redirectToLogin(requestUrl, attemptedPath)
    : unauthorizedAsset();
}

function authenticatedResponse(pathname) {
  const response = next();
  response.headers.set('Vary', 'Cookie');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Mutable Quartz documents must not outlive an automated publication.
  const isMutableDocument =
    pathname.endsWith('/contentIndex.json') ||
    pathname.endsWith('.html') ||
    !pathname.split('/').at(-1)?.includes('.');
  response.headers.set(
    'Cache-Control',
    isMutableDocument
      ? 'private, no-store, must-revalidate'
      : 'private, max-age=0, must-revalidate',
  );
  return response;
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
  if (!secret) return rejectUnauthenticated(request, url, pathname);

  const token = readCookie(request, SESSION_COOKIE);
  if (!token) {
    return rejectUnauthenticated(request, url, `${pathname}${url.search}`);
  }

  const claims = await verifySessionToken(token, secret);
  if (!claims || !isAllowedEmail(claims.email, process.env)) {
    return rejectUnauthenticated(request, url, `${pathname}${url.search}`);
  }

  return authenticatedResponse(pathname);
}
