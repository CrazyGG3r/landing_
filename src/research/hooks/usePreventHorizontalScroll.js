import { useEffect } from "react";

export const usePreventHorizontalScroll = () => {
  useEffect(() => {
    const preventHorizontal = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventHorizontal, { passive: false });
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.maxWidth = '100vw';

    return () => {
      window.removeEventListener('wheel', preventHorizontal);
    };
  }, []);
};