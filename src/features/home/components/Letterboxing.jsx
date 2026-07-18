import { memo, useState } from 'react';
import DecryptedText from './DecryptedText';
import { FONT_LETTERBOX_SUBTITLE, FONT_LETTERBOX_TITLE } from '../core/constants';

const Letterboxing = memo(function Letterboxing({
  isMobile,
  showOnMobile = false,
  headerRef,
  footerRef,
  className = '',
  ...props
}) {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isFooterHovered, setIsFooterHovered] = useState(false);

  if (isMobile && !showOnMobile) return null;

  const glassStyle = (isHovered, position) => ({
    height: '10vh',
    minHeight: '60px',
    background: isHovered
      ? 'rgba(20, 25, 35, 0.25)'
      : 'rgba(0, 0, 0, 0.95)',
    backdropFilter: isHovered
      ? 'blur(12px) saturate(180%)'
      : 'blur(2px)',
    WebkitBackdropFilter: isHovered
      ? 'blur(12px) saturate(180%)'
      : 'blur(2px)',
    border: isHovered
      ? '1px solid rgba(255, 255, 255, 0.25)'
      : '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: isHovered
      ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
      : 'none',
    color: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.45)',
    fontSize: 10,
    letterSpacing: '0.22em',
    padding: '10px 18px',
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: position === 'footer' ? 'flex-end' : 'flex-start',
    gap: 4,
    opacity: 1,
    visibility: 'visible',
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)',
    cursor: 'default',
    pointerEvents: 'auto',
    overflow: 'hidden',
  });

  const textStyle = (isHovered) => ({
    fontFamily: FONT_LETTERBOX_TITLE,
    opacity: 1,
    visibility: 'visible',
    textShadow: isHovered
      ? '0 2px 8px rgba(0, 0, 0, 0.5)'
      : 'none',
    transition: 'text-shadow 0.3s ease',
  });

  const subTextStyle = (isHovered) => ({
    fontFamily: FONT_LETTERBOX_SUBTITLE,
    opacity: isHovered ? 0.95 : 0.7,
    visibility: 'visible',
    textShadow: isHovered
      ? '0 2px 6px rgba(0, 0, 0, 0.4)'
      : 'none',
    transition: 'opacity 0.3s ease, text-shadow 0.3s ease',
  });

  return (
    <div className={className} {...props} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'transparent',
    }}>
      <div
        ref={headerRef}
        style={{
          ...glassStyle(isHeaderHovered, 'header'),
          transformOrigin: 'top',
          willChange: 'transform',
        }}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <DecryptedText
          text="SYSTEM LOG — PLACEHOLDER CONTEXT / TRANSMISSION CHANNEL"
          animateOn="view"
          speed={34}
          maxIterations={6}
          sequential
          revealDirection="start"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={textStyle(isHeaderHovered)}
        />
        <DecryptedText
          text="STATUS: STABLE / ROUTE: BOLTFORGED / SEQ: 0049-A"
          animateOn="view"
          speed={36}
          maxIterations={6}
          sequential
          revealDirection="end"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={subTextStyle(isHeaderHovered)}
        />
      </div>

      <div
        ref={footerRef}
        style={{
          ...glassStyle(isFooterHovered, 'footer'),
          transformOrigin: 'bottom',
          willChange: 'transform',
        }}
        onMouseEnter={() => setIsFooterHovered(true)}
        onMouseLeave={() => setIsFooterHovered(false)}
      >
        <DecryptedText
          text="ARCHIVE FEED — LONG FORM PLACEHOLDER TEXT"
          animateOn="view"
          speed={34}
          maxIterations={6}
          sequential
          revealDirection="start"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={textStyle(isFooterHovered)}
        />
        <DecryptedText
          text="SIGNAL QUALITY: STABLE / MODE: PASSIVE / LOCK: ENABLED"
          animateOn="view"
          speed={36}
          maxIterations={6}
          sequential
          revealDirection="end"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={subTextStyle(isFooterHovered)}
        />
      </div>
    </div>
  );
});

export default Letterboxing;
