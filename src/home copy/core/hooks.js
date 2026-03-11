import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  useEffect(() => {
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return size;
};

export const useRefreshOnResize = () => {
  useEffect(() => {
    let resizeTimer;
    let orientationTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        window.location.reload();
      }, 250);
    };

    const handleOrientation = () => {
      clearTimeout(orientationTimer);
      orientationTimer = setTimeout(() => {
        window.location.reload();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      clearTimeout(resizeTimer);
      clearTimeout(orientationTimer);
    };
  }, []);
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
