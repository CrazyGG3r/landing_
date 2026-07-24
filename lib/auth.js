/**
 * Shared auth primitives for the /admin gate.
 *
 * Everything here runs on the Vercel Edge runtime (middleware + the auth
 * functions), so it sticks to Web Crypto and fetch — no Node built-ins, no
 * dependencies. Both the gate and the sign-in endpoint import this module so
 * there is exactly one definition of "is this person allowed in".
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE = 'zaman_session';

/** Sessions are short by design — the archive is not worth a long-lived token. */
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

/* ------------------------------------------------------------------ *
 * base64url
 * ------------------------------------------------------------------ */

function base64UrlEncode(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

const encodeJson = (value) => base64UrlEncode(encoder.encode(JSON.stringify(value)));
const decodeJson = (value) => JSON.parse(decoder.decode(base64UrlDecode(value)));

/* ------------------------------------------------------------------ *
 * Session token — payload.signature, HMAC-SHA256
 * ------------------------------------------------------------------ */

function hmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function createSessionToken(claims, secret) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = encodeJson({
    ...claims,
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
  });
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return `${payload}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/** Returns the claims, or null for anything that fails to verify. */
export async function verifySessionToken(token, secret) {
  if (typeof token !== 'string') return null;
  const separator = token.indexOf('.');
  if (separator < 1) return null;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  try {
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlDecode(signature),
      encoder.encode(payload),
    );
    if (!valid) return null;

    const claims = decodeJson(payload);
    if (typeof claims?.exp !== 'number' || claims.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Cookies
 * ------------------------------------------------------------------ */

export function readCookie(request, name) {
  const header = request.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(eq + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * `secure` is dropped over plain http so the cookie still works against
 * `vercel dev` on localhost; every real deployment is https.
 */
function buildCookie(value, { maxAge, secure }) {
  const attributes = [
    `${SESSION_COOKIE}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];
  if (secure) attributes.push('Secure');
  return attributes.join('; ');
}

export const sessionCookie = (token, { secure }) =>
  buildCookie(token, { maxAge: SESSION_TTL_SECONDS, secure });

export const clearedSessionCookie = ({ secure }) => buildCookie('', { maxAge: 0, secure });

export const isSecureRequest = (request) => new URL(request.url).protocol === 'https:';

/* ------------------------------------------------------------------ *
 * Allowlist
 * ------------------------------------------------------------------ */

const splitList = (value) =>
  (value || '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

/**
 * Fails closed: with neither ADMIN_ALLOWED_EMAILS nor ADMIN_ALLOWED_DOMAINS
 * set, nobody gets in. A misconfigured deploy locks the archive rather than
 * opening it to every Google account on earth.
 *
 * This is re-checked on every request in the middleware, not just at sign-in,
 * so pulling an address out of the env revokes access immediately instead of
 * whenever that person's cookie happens to expire.
 */
export function isAllowedEmail(email, env) {
  if (typeof email !== 'string' || !email.includes('@')) return false;

  const allowedEmails = splitList(env.ADMIN_ALLOWED_EMAILS);
  const allowedDomains = splitList(env.ADMIN_ALLOWED_DOMAINS);
  if (allowedEmails.length === 0 && allowedDomains.length === 0) return false;

  const normalized = email.toLowerCase();
  if (allowedEmails.includes(normalized)) return true;
  return allowedDomains.includes(normalized.slice(normalized.lastIndexOf('@') + 1));
}

/* ------------------------------------------------------------------ *
 * Google ID token verification
 * ------------------------------------------------------------------ */

const GOOGLE_JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_ISSUERS = ['accounts.google.com', 'https://accounts.google.com'];

let jwksCache = { keys: null, expiresAt: 0 };

async function fetchGoogleKeys() {
  if (jwksCache.keys && Date.now() < jwksCache.expiresAt) return jwksCache.keys;

  const response = await fetch(GOOGLE_JWKS_URL);
  if (!response.ok) throw new Error('Could not reach Google signing keys');

  const { keys } = await response.json();
  const maxAge = /max-age=(\d+)/.exec(response.headers.get('cache-control') || '');
  jwksCache = {
    keys,
    expiresAt: Date.now() + (maxAge ? Number(maxAge[1]) * 1000 : 3600_000),
  };
  return keys;
}

/**
 * Verifies the JWT that Google Identity Services hands the browser. The
 * signature check is the part that matters — without it the credential is just
 * a string the client could have typed. Throws on any failure.
 */
export async function verifyGoogleIdToken(idToken, clientId) {
  if (typeof idToken !== 'string') throw new Error('Missing credential');

  const segments = idToken.split('.');
  if (segments.length !== 3) throw new Error('Malformed credential');
  const [rawHeader, rawPayload, rawSignature] = segments;

  const header = decodeJson(rawHeader);
  if (header.alg !== 'RS256') throw new Error('Unexpected token algorithm');

  const jwk = (await fetchGoogleKeys()).find((candidate) => candidate.kid === header.kid);
  if (!jwk) throw new Error('Unknown signing key');

  const key = await crypto.subtle.importKey(
    'jwk',
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const verified = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    base64UrlDecode(rawSignature),
    encoder.encode(`${rawHeader}.${rawPayload}`),
  );
  if (!verified) throw new Error('Bad credential signature');

  const payload = decodeJson(rawPayload);
  const now = Math.floor(Date.now() / 1000);
  const skew = 60;

  if (payload.aud !== clientId) throw new Error('Credential issued for another app');
  if (!GOOGLE_ISSUERS.includes(payload.iss)) throw new Error('Unexpected issuer');
  if (typeof payload.exp !== 'number' || payload.exp + skew <= now) {
    throw new Error('Credential expired');
  }
  if (typeof payload.iat === 'number' && payload.iat - skew > now) {
    throw new Error('Credential not yet valid');
  }
  if (payload.email_verified !== true && payload.email_verified !== 'true') {
    throw new Error('Google account has no verified email');
  }

  return payload;
}
