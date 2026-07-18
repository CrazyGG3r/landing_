import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { FINAL_BLUR_DEFAULT, FINAL_BLUR_MAX, FONT_TITLE } from '../core/constants';

const CountUp = memo(function CountUp({
  to,
  from = 0,
  duration = 2,
  onComplete,
  startCounting = true,
  onProgress
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const [isComplete, setIsComplete] = useState(false);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const formatValue = useCallback((value) => {
    return Math.round(value).toString();
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(from);
    }
  }, [from, formatValue]);

  useEffect(() => {
    if (startCounting && !isComplete) {
      motionValue.set(to);
    }
  }, [startCounting, to, motionValue, isComplete]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }

      if (onProgress) {
        onProgress(latest);
      }

      if (!isComplete && Math.abs(latest - to) < 0.5) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue, to, isComplete, onComplete, onProgress]);

  return <span ref={ref} className="count-up-text" />;
});

const Preloader = memo(function Preloader({
  onLoadComplete,
  duration = 3
}) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [blurAmount, setBlurAmount] = useState(FINAL_BLUR_MAX);
  const [scale, setScale] = useState(3.0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      const blurProgress = newProgress / 100;
      const newBlur = FINAL_BLUR_MAX - (blurProgress * (FINAL_BLUR_MAX - FINAL_BLUR_DEFAULT));
      setBlurAmount(Math.max(FINAL_BLUR_DEFAULT, newBlur));

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onLoadComplete) onLoadComplete();
        }, 500);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);

  useEffect(() => {
    const progressFactor = progress / 100;
    const easedProgress = 1 - Math.pow(1 - progressFactor, 3);
    const newScale = 3.0 - (easedProgress * 2.0);
    setScale(newScale);
  }, [progress]);

  useEffect(() => {
    document.documentElement.style.setProperty('--final-blur', `${blurAmount}px`);
  }, [blurAmount]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100000,
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: FONT_TITLE,
      transition: 'opacity 0.5s ease',
      opacity: progress >= 100 ? 0 : 1,
      pointerEvents: progress >= 100 ? 'none' : 'auto',
    }}>
      <div style={{
        fontSize: 'clamp(48px, 15vw, 180px)',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textShadow: '0 0 30px rgba(255,255,255,0.8)',
        transform: `scale(${scale})`,
        transition: 'transform 0.1s linear',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}>
        <CountUp
          from={0}
          to={100}
          duration={duration}
          startCounting={true}
        />
        <span style={{ marginLeft: 10 }}>%</span>
      </div>
    </div>
  );
});

export default Preloader;
