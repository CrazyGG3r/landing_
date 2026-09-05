import { next, rewrite } from '@vercel/edge';
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

function isPhoneRequest(request, url) {
  if (url.searchParams.get('desktop') === '1') return false;
  if (url.searchParams.get('mobile') === '1') return true;

  const mobileHint = request.headers.get('sec-ch-ua-mobile');
  if (mobileHint === '?1') return true;

  const userAgent = request.headers.get('user-agent') || '';
  return /(?:iPhone|iPod|Windows Phone|IEMobile|Opera Mini|Android[^;)]*Mobile)/i.test(
    userAgent,
  );
}

function phoneDocumentDestination(pathname, requestUrl) {
  if (
    pathname.startsWith('/admin/_mobile/') ||
    pathname === '/admin/mobile-navigation.html'
  ) {
    return null;
  }

  let relative = pathname.slice('/admin'.length);
  if (!relative || relative === '/') relative = '/';
  else if (relative.endsWith('.html')) relative = relative.slice(0, -'.html'.length);
  else if (relative.split('/').at(-1)?.includes('.')) return null;

  return new URL(`/admin/_mobile${relative}`, requestUrl);
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

function authenticatedPhoneResponse(destination) {
  const response = rewrite(destination);
  response.headers.set('Vary', 'Cookie, User-Agent, Sec-CH-UA-Mobile');
  response.headers.set('Cache-Control', 'private, no-store, must-revalidate');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-ProjectZaman-Mode', 'phone-static-v2');
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

  if (isDocumentRequest(request) && isPhoneRequest(request, url)) {
    const destination = phoneDocumentDestination(pathname, url);
    if (destination) return authenticatedPhoneResponse(destination);
  }

  return authenticatedResponse(pathname);
}
