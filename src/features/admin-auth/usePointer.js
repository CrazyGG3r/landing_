import { useEffect, useRef } from 'react';

/**
 * Normalised pointer position in [-1, 1], held in a ref so the WebGL loops can
 * read it every frame without re-rendering React. Same contract as the
 * landing page's MouseContext, minus the gyro handling this page doesn't need.
 */
export function usePointer() {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (clientX, clientY) => {
      pointerRef.current.x = (clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (clientY / window.innerHeight - 0.5) * 2;
    };

    const onMouseMove = (event) => update(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };
    const onLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return pointerRef;
}
