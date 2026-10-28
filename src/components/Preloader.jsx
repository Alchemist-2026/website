import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const brandTextRef = useRef(null);
  const infoTextRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Percentage loading counter
    const counterObj = { value: 0 };
    const ctx = gsap.context(() => {
      // Elegant percentage text increment
      gsap.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          setPercent(Math.floor(counterObj.value));
        }
      });

      // Split brand text animation
      gsap.fromTo(brandTextRef.current,
        { letterSpacing: "0.1em", opacity: 0, scale: 0.95 },
        { letterSpacing: "0.25em", opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" }
      );

      // Loading subtext reveal
      gsap.fromTo(infoTextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.7, y: 0, duration: 1.5, delay: 0.6, ease: "power2.out" }
      );

      // Expand progress bar
      gsap.fromTo(barRef.current,
        { width: "0%" },
        { width: "100%", duration: 2.2, ease: "power2.out", onComplete: () => {
          // Wait briefly, then trigger elegant slide-up exit
          gsap.timeline({
            onComplete: onComplete
          })
          .to(infoTextRef.current, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" })
          .to(brandTextRef.current, { opacity: 0, scale: 1.05, duration: 0.5, ease: "power2.in" }, "-=0.3")
          .to(containerRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.9,
            ease: "power4.inOut"
          }, "-=0.1");
        }}
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-deep-dark p-8 md:p-16 select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Top Header info */}
      <div className="flex justify-between items-center text-xs tracking-widest text-accent-gold/40 uppercase">
        <span>Alchemist Venue</span>
        <span>Est. 2026</span>
      </div>

      {/* Center Brand Draw */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1 
          ref={brandTextRef}
          className="font-serif text-5xl md:text-8xl font-bold tracking-[0.2em] text-gold-gradient select-none"
        >
          ALCHEMIST
        </h1>
        <p
          ref={infoTextRef}
          className="mt-4 font-sans text-sm md:text-base tracking-[0.3em] uppercase text-warm-beige/70 font-light max-w-lg leading-relaxed"
        >
          Cafe • Dining • Gaming • Dome
        </p>
      </div>

      {/* Bottom Loading Progress */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end text-accent-gold font-light">
          <span className="text-xs tracking-[0.2em] uppercase opacity-60">Initializing Experience</span>
          <span className="font-serif text-4xl md:text-6xl tracking-tighter">
            {percent.toString().padStart(3, '0')}%
          </span>
        </div>
        <div className="w-full h-[1px] bg-white/10 overflow-hidden relative rounded-full">
          <div 
            ref={barRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-coffee-brown via-accent-gold to-white rounded-full"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
