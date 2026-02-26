import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children }) {
  const el = useRef(null);
  
  if (!el.current) {
    el.current = document.createElement('div');
    Object.assign(el.current.style, {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9999
    });
  }
  
  useEffect(() => { 
    const node = el.current; 
    document.body.appendChild(node); 
    return () => document.body.removeChild(node); 
  }, []);
  
  return createPortal(children, el.current);
}