import { useEffect, useRef, useState } from 'react';

const GSI_SRC = 'https://accounts.google.com/gsi/client';

let gsiPromise = null;

/** Loads the Google Identity Services client once per page. */
function loadGsi() {
  if (gsiPromise) return gsiPromise;

  gsiPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }
    const existing = document.querySelector(`script[src="${GSI_SRC}"]`);
    const script = existing ?? document.createElement('script');
    script.addEventListener('load', () => resolve(window.google));
    script.addEventListener('error', () => reject(new Error('Could not load Google sign-in')));
    if (!existing) {
      script.src = GSI_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return gsiPromise;
}

/**
 * Google's own rendered button — the branding is theirs and shouldn't be
 * reimplemented, so the surrounding frame does the styling instead.
 */
export default function GoogleSignInButton({ clientId, onCredential, onError, disabled }) {
  const slotRef = useRef(null);
  const callbackRef = useRef(onCredential);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!clientId || !slotRef.current) return undefined;
    let cancelled = false;

    loadGsi()
      .then((google) => {
        if (cancelled || !slotRef.current) return;

        google.accounts.id.initialize({
          client_id: clientId,
          callback: ({ credential }) => callbackRef.current?.(credential),
          auto_select: false,
          cancel_on_tap_outside: true,
          ux_mode: 'popup',
        });

        google.accounts.id.renderButton(slotRef.current, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          logo_alignment: 'left',
          width: 300,
        });

        setReady(true);
      })
      .catch((error) => {
        if (!cancelled) onError?.(error.message);
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, onError]);

  return (
    <div className="zaman-gsi">
      <div
        ref={slotRef}
        className="zaman-gsi__slot"
        style={{
          opacity: ready && !disabled ? 1 : 0.35,
          pointerEvents: ready && !disabled ? 'auto' : 'none',
        }}
      />
      {!ready && <span className="zaman-gsi__pending">establishing secure channel…</span>}
    </div>
  );
}
