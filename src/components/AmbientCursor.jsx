import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function AmbientCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const spotlightRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      const mobile = window.matchMedia("(max-width: 1024px)").matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isMobile) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const spotlight = spotlightRef.current;

    if (!dot || !ring) return;

    // Center coordinates
    let mouse = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Update native spotlight CSS variables
      if (spotlight) {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
      }

      // Quick move for the core dot
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: "power2.out"
      });

      // Delayed lag move for the gold outer ring
      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.35,
        ease: "power2.out"
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: "rgba(200, 164, 107, 0.1)",
        borderColor: "#ffffff",
        borderWidth: "1px",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.2
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#c8a46b",
        borderWidth: "1.5px",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.2
      });
    };

    // Attach listeners
    window.addEventListener('mousemove', onMouseMove);

    // Dynamic selectors for premium interactive targets
    const attachHoverStates = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], .interactive-card, input, select, textarea');
      targets.forEach(target => {
        target.addEventListener('mouseenter', onMouseEnterLink);
        target.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    // Wait for DOM to completely structure
    const timeout = setTimeout(attachHoverStates, 1000);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timeout);
      
      const targets = document.querySelectorAll('a, button, [role="button"], .interactive-card, input, select, textarea');
      targets.forEach(target => {
        target.removeEventListener('mouseenter', onMouseEnterLink);
        target.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Global Spotlight Underlay */}
      <div 
        ref={spotlightRef}
        className="fixed inset-0 z-10 pointer-events-none spotlight mix-blend-screen transition-opacity duration-300"
      />

      {/* Custom Pointer Core Dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-gold rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#c8a46b]"
      />

      {/* Custom Outer Drag Ring */}
      <div 
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-accent-gold rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference shadow-[0_0_8px_rgba(200,164,107,0.3)]"
      />
    </>
  );
}
