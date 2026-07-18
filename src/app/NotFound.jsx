import React, { useEffect } from 'react';
import TextPressure from '../shared/hooks/TextPressure.jsx';

// ============================================
// CONFIGURATION - Adjust all parameters here
// ============================================
const CONFIG = {
  // Text content
  text: '404 ERROR',
  
  // Visual colors
  colors: {
    text: '#ffffff',
    background: '#0a0a0a',
  },

  // Font variation axes (true/false to enable)
  axes: {
    weight: true,
    width: true,
    italic: true,
  },

  // Physics engine - CORE BEHAVIOR
  physics: {
    enabled: true,
    repelRadius: 180,        // Mouse influence radius (pixels)
    repelForce: 340,          // Push strength
    inertia: 0.82,            // Momentum retention (0.5-0.95): LOWER = more damping
    springK: 0.058,           // Return spring stiffness (0.01-0.1)
    baseMaxDisplace: 140,     // Base movement limit for center characters
    edgeFreedom: 0.35,        // Edge movement multiplier (0.1-1.0): 0.35 = 35% of center
    collisionGap: 5,          // Minimum pixels between chars
    microStopThreshold: 0.02, // Velocity threshold to stop micro-oscillations
  },

  // Font variation spring physics
  fontSpring: {
    stiffness: 18,            // How quickly font changes respond
    friction: 0.22,           // Smoothing factor
    weightRange: [700, 150],  // [near, far] weight values
    widthRange: [180, 40],    // [near, far] width values
    italicRange: [0.9, 0.0],  // [near, far] italic values
  },

  // Animation timings
  animation: {
    introDuration: 0.7,
    introStagger: 0.03,
    introEase: 'elastic.out(1, 0.3)',
    mouseLerpDuration: 0.5,
  },

  // Feature flags
  features: {
    preventOverlap: true,     // Push chars apart when too close
    dynamicSpringBack: true,  // Edge letters return more aggressively
    preserveSpaces: true,     // Preserve space character width
  },
  
  // Layout configuration
  layout: {
    textScale: 0.14,           // 0.1 = 10% of original size (90% smaller)
    centerAlign: true,        // Center horizontally
  }
};

// ============================================
// RANDOM TITLES ARRAY
// ============================================
const RANDOM_TITLES = [
  "Yikes!",
  "Must have hit the 4th wall",
  "Bombaclat!",
  "Page is incomprehinsible"
];

// ============================================
// NOT FOUND COMPONENT
// ============================================
export default function NotFound() {
  // Set random document title on component mount
  useEffect(() => {
    const randomTitle = RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
    document.title = randomTitle;
    
    // Optional: Cleanup function to reset title when component unmounts
    return () => {
      document.title = '404 - Not Found'; // or whatever default you want
    };
  }, []); // Empty dependency array = runs once on mount

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      position: "relative",
      overflow: "hidden",
      backgroundColor: CONFIG.colors.background,
    }}>
      <TextPressure
        text={CONFIG.text}
        colors={CONFIG.colors}
        axes={CONFIG.axes}
        physics={CONFIG.physics}
        fontSpring={CONFIG.fontSpring}
        animation={CONFIG.animation}
        features={CONFIG.features}
        layout={CONFIG.layout}
      />
      <p
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.5,
          fontSize: "0.9rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "monospace",
          color: CONFIG.colors.text,
          zIndex: 20,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        This page does not exist
      </p>
    </div>
  );
}
