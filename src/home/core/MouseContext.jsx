import { createContext, useEffect, useRef } from 'react';

export const MouseContext = createContext({ x: 0, y: 0 });

export function MouseProvider({ children }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const usingGyroRef = useRef(false);
  const touchTargetRef = useRef({ x: 0, y: 0, active: false });
  const gyroStateRef = useRef({ supported: false, requested: false, active: false });

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    gyroStateRef.current.supported = typeof DeviceOrientationEvent !== 'undefined';

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const updateTouchTarget = (clientX, clientY) => {
      const nx = (clientX / window.innerWidth - 0.5) * 2;
      const ny = (clientY / window.innerHeight - 0.5) * 2;
      const gain = 1.25;
      touchTargetRef.current.x = clamp(nx * gain, -1, 1);
      touchTargetRef.current.y = clamp(ny * gain, -1, 1);
      touchTargetRef.current.active = true;
      usingGyroRef.current = false;
    };

    const mouseHandler = e => {
      if (isMobile || usingGyroRef.current) return;
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const touchHandler = e => {
      if (usingGyroRef.current || !e.touches?.[0]) return;
      const t = e.touches[0];
      updateTouchTarget(t.clientX, t.clientY);
    };

    const touchEndHandler = () => {
      if (usingGyroRef.current) return;
      touchTargetRef.current.active = false;
    };

    const orientationHandler = e => {
      if (!gyroStateRef.current.active) return;
      const gamma = Math.max(-45, Math.min(45, e.gamma || 0));
      const beta = Math.max(-45, Math.min(45, e.beta || 0));
      mouseRef.current.x = -gamma / 45;
      mouseRef.current.y = beta / 45;
      usingGyroRef.current = true;
    };

    const activateGyro = () => {
      if (gyroStateRef.current.active) return;
      gyroStateRef.current.active = true;
      usingGyroRef.current = true;
      touchTargetRef.current.active = false;
      window.addEventListener('deviceorientation', orientationHandler, true);
    };

    const requestGyro = () => {
      if (!isMobile || !gyroStateRef.current.supported || gyroStateRef.current.requested) return;
      gyroStateRef.current.requested = true;
      if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              activateGyro();
            }
          })
          .catch(() => { });
      } else {
        activateGyro();
      }
    };

    let raf;
    const loop = () => {
      if (isMobile && !usingGyroRef.current) {
        const target = touchTargetRef.current;
        const tx = target.active ? target.x : 0;
        const ty = target.active ? target.y : 0;
        mouseRef.current.x += (tx - mouseRef.current.x) * 0.12;
        mouseRef.current.y += (ty - mouseRef.current.y) * 0.12;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    if (isMobile && gyroStateRef.current.supported && typeof DeviceOrientationEvent?.requestPermission !== 'function') {
      activateGyro();
    }

    window.addEventListener('mousemove', mouseHandler, { passive: true });
    window.addEventListener('touchmove', touchHandler, { passive: true });
    window.addEventListener('touchstart', touchHandler, { passive: true });
    window.addEventListener('touchend', touchEndHandler, { passive: true });
    window.addEventListener('touchstart', requestGyro, { passive: true });
    window.addEventListener('pointerdown', requestGyro, { passive: true });
    window.addEventListener('click', requestGyro, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', mouseHandler);
      window.removeEventListener('touchmove', touchHandler);
      window.removeEventListener('touchstart', touchHandler);
      window.removeEventListener('touchend', touchEndHandler);
      window.removeEventListener('touchstart', requestGyro);
      window.removeEventListener('pointerdown', requestGyro);
      window.removeEventListener('click', requestGyro);
      window.removeEventListener('deviceorientation', orientationHandler, true);
    };
  }, []);

  return (
    <MouseContext.Provider value={mouseRef}>
      {children}
    </MouseContext.Provider>
  );
}
