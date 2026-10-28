import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VR_DETAILS } from '../data/content';
import { ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VrExperience() {
  const containerRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Full image parallax translation
      gsap.fromTo(parallaxBgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // 2. Text layout slide in
      gsap.fromTo(textRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center py-24 px-6 md:px-12 bg-deep-dark overflow-hidden"
    >
      {/* Heavy layered background parallax container */}
      <div 
        ref={parallaxBgRef}
        className="absolute inset-0 bg-cover bg-center select-none pointer-events-none w-full h-[120%] top-[-10%]"
        style={{ 
          backgroundImage: `url('${VR_DETAILS.image}')` // High-fidelity active VR visual
        }}
      />

      {/* Luxury Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-dark via-deep-dark/85 to-transparent lg:bg-gradient-to-r lg:from-deep-dark lg:via-deep-dark/80 lg:to-deep-dark/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-transparent to-deep-dark" />

      {/* Interactive Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12">
        <div 
          ref={textRef}
          className="lg:col-span-6 flex flex-col text-left justify-center bg-deep-dark/50 backdrop-blur-md border border-white/5 p-8 sm:p-12 rounded-sm shadow-2xl"
        >
          <span className="text-xs tracking-[0.3em] text-[#ba55d3] uppercase font-bold mb-4">
            Virtual Reality Arena
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            {VR_DETAILS.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8">
            {VR_DETAILS.description}
          </p>

          {/* List of Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VR_DETAILS.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ba55d3]/15 border border-[#ba55d3]/30 flex items-center justify-center text-[#ba55d3]">
                  <ShieldCheck size={12} />
                </div>
                <span className="font-sans text-xs sm:text-sm text-white/80 font-medium tracking-wide">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[1px] w-24 bg-[#ba55d3]/40 mt-10 mb-6" />

          {/* Booking Link */}
          <div>
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 border border-[#ba55d3]/40 text-xs tracking-[0.2em] uppercase text-white hover:bg-[#ba55d3] hover:border-[#ba55d3] hover:text-white transition-all duration-300 font-bold"
            >
              Reserve VR Simulator
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
