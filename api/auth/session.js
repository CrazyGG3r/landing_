import {
  SESSION_COOKIE,
  isAllowedEmail,
  readCookie,
  verifySessionToken,
} from '../../lib/auth.js';

export const config = { runtime: 'edge' };

/**
 * Lets the login page tell an already-signed-in visitor apart from a new one,
 * so it can send them straight through instead of asking again. Purely a UX
 * convenience — the middleware is what actually enforces access.
 */
export default async function handler(request) {
  const secret = process.env.AUTH_SECRET;
  const token = secret ? readCookie(request, SESSION_COOKIE) : null;
  const claims = token ? await verifySessionToken(token, secret) : null;
  const authenticated = Boolean(claims && isAllowedEmail(claims.email, process.env));

  return new Response(
    JSON.stringify({
      authenticated,
      user: authenticated
        ? { email: claims.email, name: claims.name, picture: claims.picture ?? null }
        : null,
      configured: Boolean(secret && process.env.GOOGLE_CLIENT_ID),
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    },
  );
}
