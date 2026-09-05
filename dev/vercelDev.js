/**
 * Runs the Vercel-only half of this app under plain `vite dev`.
 *
 * `api/*.js` and `middleware.js` are Edge functions — Vite doesn't know about
 * either, so without this a POST to /api/auth/google 404s and /admin is
 * completely ungated locally. That divergence is exactly where auth bugs hide,
 * so this mounts both against the real handlers rather than stubbing them.
 *
 * Node 22 gives us Request/Response/Headers/crypto.subtle natively, which is
 * the same surface the Edge runtime exposes — the handlers run unmodified.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

const API_PREFIX = '/api/';
const ADMIN_PREFIX = '/admin';

/** Node's IncomingMessage -> a WHATWG Request the Edge handlers understand. */
async function toWebRequest(req, url) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) value.forEach((entry) => headers.append(key, entry));
    else headers.set(key, value);
  }

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  let body;
  if (hasBody) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (chunks.length) body = Buffer.concat(chunks);
  }

  return new Request(url, { method: req.method, headers, body });
}

async function sendWebResponse(res, response) {
  res.statusCode = response.status;

  // Set-Cookie must be written as separate headers; iterating `headers`
  // would fold multiples into one comma-joined value and corrupt them.
  const cookies = response.headers.getSetCookie?.() ?? [];
  if (cookies.length) res.setHeader('set-cookie', cookies);

  for (const [key, value] of response.headers) {
    if (key.toLowerCase() === 'set-cookie') continue;
    res.setHeader(key, value);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer.length ? buffer : undefined);
}

function fail(res, status, message) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ error: message }));
}

export function vercelDev() {
  return {
    name: 'vercel-dev-emulation',
    apply: 'serve',

    /**
     * Vite only exposes VITE_-prefixed vars to the client. The handlers read
     * AUTH_SECRET and friends off process.env, so load the unprefixed ones too.
     */
    async config(_config, { mode }) {
      const { loadEnv } = await import('vite');
      const env = loadEnv(mode, process.cwd(), '');
      for (const [key, value] of Object.entries(env)) {
        if (!(key in process.env)) process.env[key] = value;
      }
    },

    configureServer(server) {
      // Registering here (rather than returning a function) puts this ahead of
      // Vite's static and SPA-fallback middlewares — required, or public/admin
      // would be served before the gate ever runs.
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
        const { pathname } = url;

        const isApi = pathname.startsWith(API_PREFIX);
        const isAdmin = pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
        if (!isApi && !isAdmin) return next();

        try {
          const request = await toWebRequest(req, url);

          if (isApi) {
            let handler;
            try {
              ({ default: handler } = await server.ssrLoadModule(`${pathname}.js`));
            } catch {
              return fail(res, 404, 'not_found');
            }
            return await sendWebResponse(res, await handler(request));
          }

          const { default: middleware } = await server.ssrLoadModule('/middleware.js');
          const result = await middleware(request);

          const rewriteTarget = result?.headers.get('x-middleware-rewrite');
          if (rewriteTarget) {
            const rewritten = new URL(rewriteTarget);
            let rewrittenPath = rewritten.pathname;
            if (rewrittenPath.endsWith('/')) {
              const index = path.join(server.config.publicDir, rewrittenPath, 'index.html');
              if (existsSync(index)) rewrittenPath += 'index.html';
            } else {
              const document = path.join(server.config.publicDir, `${rewrittenPath}.html`);
              if (existsSync(document)) rewrittenPath += '.html';
            }
            req.url = `${rewrittenPath}${rewritten.search}`;
            return next();
          }

          // `next()` from @vercel/edge marks pass-through with this header;
          // anything else is a real response (the redirect to /admin/login).
          if (result && result.headers.get('x-middleware-next') !== '1') {
            return await sendWebResponse(res, result);
          }

          // Gate passed. Vercel's static layer resolves /admin/ to the Quartz
          // index.html, but Vite's SPA fallback would swallow the directory
          // request and render the React app over the archive instead. Resolve
          // it here so a signed-in visitor sees the same page in both places.
          if (pathname === ADMIN_PREFIX) {
            res.statusCode = 308; // mirrors the redirect in vercel.json
            res.setHeader('location', `${ADMIN_PREFIX}/${url.search}`);
            return res.end();
          }
          if (pathname.endsWith('/')) {
            const index = path.join(server.config.publicDir, pathname, 'index.html');
            if (existsSync(index)) req.url = `${pathname}index.html${url.search}`;
          }
          return next();
        } catch (error) {
          server.config.logger.error(`[vercel-dev] ${pathname} failed: ${error.stack}`);
          return fail(res, 500, 'dev_handler_error');
        }
      });
    },
  };
}
