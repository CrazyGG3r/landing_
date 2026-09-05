import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import WebGLErrorBoundary from '../home/components/WebGLErrorBoundary';
import GoogleSignInButton from './GoogleSignInButton';
import { usePointer } from './usePointer';
import './login.css';

const DEFAULT_TARGET = '/admin/';
const AuthBackdrop = lazy(() => import('./three/AuthBackdrop'));
const GlassSlab = lazy(() => import('./three/GlassSlab'));

function isPhoneDevice() {
  const smallestSide = Math.min(
    window.screen?.width || window.innerWidth,
    window.screen?.height || window.innerHeight,
  );
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  return smallestSide <= 540 && touch;
}

/**
 * Only ever bounce back into the archive. Anything else is either a stale
 * link or someone trying to turn the login into an open redirect.
 */
function safeTarget(raw) {
  if (typeof raw !== 'string' || !raw.startsWith('/admin') || raw.startsWith('//')) {
    return DEFAULT_TARGET;
  }
  return raw;
}

export default function Login() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [phoneLite] = useState(isPhoneDevice);

  const pointerRef = usePointer();
  const backdropRef = useRef(null);
  const cardRef = useRef(null);

  const [cardBox, setCardBox] = useState({ width: 0, height: 0 });
  const [backdropReady, setBackdropReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState(clientId ? null : {
    tone: 'error',
    message: 'VITE_GOOGLE_CLIENT_ID is not set for this build, so sign-in is unavailable.',
  });
  const [busy, setBusy] = useState(false);

  const target = safeTarget(new URLSearchParams(window.location.search).get('next'));

  const openArchive = useCallback(() => {
    // Unmount both WebGL canvases before Quartz starts. Two animation frames
    // give their cleanup handlers time to release GPU resources on iOS.
    setLeaving(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.location.replace(target));
    });
  }, [target]);

  // The glass slab can only be built once the backdrop canvas exists to sample.
  const setBackdropNode = useCallback((node) => {
    backdropRef.current = node;
    if (node) setBackdropReady(true);
  }, []);

  const measureCard = useCallback((node) => {
    const { width, height } = node.getBoundingClientRect();
    setCardBox((previous) =>
      previous.width === width && previous.height === height ? previous : { width, height },
    );
  }, []);

  // Measured in the ref callback rather than an effect, so the slab has real
  // numbers on the first commit instead of waiting on a ResizeObserver tick
  // that may never arrive in a backgrounded tab.
  const setCardNode = useCallback((node) => {
    cardRef.current = node;
    if (node) measureCard(node);
  }, [measureCard]);

  // The observer only handles later reflows — font swap, resize, breakpoints.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    const remeasure = () => measureCard(card);
    const observer = new ResizeObserver(remeasure);
    observer.observe(card);
    window.addEventListener('resize', remeasure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', remeasure);
    };
  }, [measureCard]);

  // Someone arriving with a live session shouldn't be asked to sign in again.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/session', { credentials: 'same-origin' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.authenticated) openArchive();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [openArchive]);

  const handleCredential = useCallback(async (credential) => {
    if (!credential) return;
    setBusy(true);
    setStatus({ tone: 'busy', message: 'Verifying credentials…' });

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ credential }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({ tone: 'busy', message: 'Access granted — opening the archive…' });
        openArchive();
        return;
      }

      if (response.status === 403) {
        setStatus({
          tone: 'error',
          message: `${data.email || 'That account'} is not on the access list for Project Zaman.`,
        });
      } else if (response.status === 500) {
        setStatus({ tone: 'error', message: 'Sign-in is not configured on the server yet.' });
      } else {
        setStatus({ tone: 'error', message: 'That sign-in could not be verified. Try again.' });
      }
    } catch {
      setStatus({ tone: 'error', message: 'Network error while signing in. Try again.' });
    } finally {
      setBusy(false);
    }
  }, [openArchive]);

  const handleLoadError = useCallback((message) => {
    setStatus({ tone: 'error', message });
  }, []);

  return (
    <main className={`zaman-auth${phoneLite ? ' zaman-auth--phone' : ''}`}>
      {!phoneLite && !leaving && (
        <WebGLErrorBoundary>
          <Suspense fallback={null}>
            <AuthBackdrop ref={setBackdropNode} pointerRef={pointerRef} />
          </Suspense>
        </WebGLErrorBoundary>
      )}

      {!phoneLite && !leaving && backdropReady && cardBox.width > 0 && (
        <WebGLErrorBoundary>
          <Suspense fallback={null}>
            <GlassSlab
              backdropRef={backdropRef}
              pointerRef={pointerRef}
              cardWidth={cardBox.width}
              cardHeight={cardBox.height}
            />
          </Suspense>
        </WebGLErrorBoundary>
      )}

      {!phoneLite && <div className="zaman-auth__vignette" />}
      {!phoneLite && <div className="zaman-auth__grain" />}

      <section className="zaman-auth__card" ref={setCardNode}>
        <p className="zaman-auth__eyebrow">Restricted Archive</p>
        <h1 className="zaman-auth__title">Project Zaman</h1>
        <p className="zaman-auth__subtitle">
          This wing of the site is closed. Sign in with an approved Google account to
          open the archive.
        </p>
        <div className="zaman-auth__rule" />

        <GoogleSignInButton
          clientId={clientId}
          onCredential={handleCredential}
          onError={handleLoadError}
          disabled={busy}
        />

        <p
          className={`zaman-auth__status${status ? ` zaman-auth__status--${status.tone}` : ''}`}
          role="status"
          aria-live="polite"
        >
          {status?.message ?? ''}
        </p>

        <p className="zaman-auth__footnote">Boltforged · Access Control</p>
      </section>
    </main>
  );
}
