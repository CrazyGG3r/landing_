import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  useEffect(() => {
    let frameId = 0;
    const update = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        setSize((current) => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          return current.width === width && current.height === height
            ? current
            : { width, height };
        });
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return size;
};

export function useResizeObserver(ref, cb) {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(cb);
    ro.observe(ref.current);
    cb();
    return () => ro.disconnect();
  }, [cb, ref]);
}

export function useCoarsePointer() {
  const getValue = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return (
      window.matchMedia('(pointer: coarse)').matches &&
      window.matchMedia('(hover: none)').matches
    );
  };

  const [isCoarsePointer, setIsCoarsePointer] = useState(getValue);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');
    const update = () => setIsCoarsePointer(getValue());

    pointerQuery.addEventListener?.('change', update);
    hoverQuery.addEventListener?.('change', update);
    return () => {
      pointerQuery.removeEventListener?.('change', update);
      hoverQuery.removeEventListener?.('change', update);
    };
  }, []);

  return isCoarsePointer;
}
