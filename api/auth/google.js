import {
  createSessionToken,
  isAllowedEmail,
  isSecureRequest,
  sessionCookie,
  verifyGoogleIdToken,
} from '../../lib/auth.js';

export const config = { runtime: 'edge' };

const json = (body, status, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers },
  });

/**
 * Exchanges the Google Identity Services credential for our own session
 * cookie. The credential is verified against Google's public keys here on the
 * server — the browser's word that someone signed in counts for nothing.
 */
export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.AUTH_SECRET;
  if (!clientId || !secret) {
    return json({ error: 'server_not_configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  let profile;
  try {
    profile = await verifyGoogleIdToken(body?.credential, clientId);
  } catch (error) {
    return json({ error: 'invalid_credential', detail: error.message }, 401);
  }

  if (!isAllowedEmail(profile.email, process.env)) {
    // Deliberately echoes the address back: the usual cause is signing in with
    // the wrong Google account, and silence makes that impossible to diagnose.
    return json({ error: 'not_authorized', email: profile.email }, 403);
  }

  const token = await createSessionToken(
    {
      sub: profile.sub,
      email: profile.email,
      name: profile.name || profile.email,
      picture: profile.picture || null,
    },
    secret,
  );

  return json(
    {
      ok: true,
      user: { email: profile.email, name: profile.name || profile.email, picture: profile.picture || null },
    },
    200,
    { 'set-cookie': sessionCookie(token, { secure: isSecureRequest(request) }) },
  );
}
