import { memo } from 'react';

const TitleTarget = memo(function TitleTarget({
  children,
  className = '',
  onClick,
  onKeyDown,
  ...props
}) {
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <div
      className={`title-target ${className}`.trim()}
      role="button"
      tabIndex={0}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
      {...props}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
});

export default TitleTarget;
