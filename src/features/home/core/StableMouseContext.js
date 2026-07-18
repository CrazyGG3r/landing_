// core/StableMouseContext.js
import React, { createContext, useEffect, useRef } from 'react';

export const StableMouseContext = createContext(null);

/**
 * Provider that holds mouse position in a stable ref – zero React re‑renders.
 * Written without JSX to avoid oxc parsing issues in .js files.
 */
export const StableMouseProvider = React.forwardRef(({ children }, ref) => {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  React.useImperativeHandle(ref, () => mouseRef.current, [mouseRef]);

  return React.createElement(
    StableMouseContext.Provider,
    { value: mouseRef },
    children
  );
});

/** Hook to access the mouse ref (no re‑renders). */
export function useStableMouse() {
  const ref = React.useContext(StableMouseContext);
  if (!ref) throw new Error('useStableMouse must be used within StableMouseProvider');
  return ref;
}