import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DOME_THEATRE } from '../data/content';
import { Orbit, Compass, Volume2, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DomeTheatre() {
  const containerRef = useRef(null);
  const domeCircleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-up & circular expansion of the dome visual
      gsap.fromTo(domeCircleRef.current,
        { scale: 0.7, borderRadius: "50%", opacity: 0.6 },
        {
          scale: 1.05,
          borderRadius: "8px", // Curves slowly into a widescreen panel at bottom scroll
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: 1
          }
        }
      );

      // Stagger details reveal
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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

  // Map premium features to corresponding icons
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <Orbit size={20} className="text-accent-gold" />;
      case 1: return <Compass size={20} className="text-accent-gold" />;
      case 2: return <Volume2 size={20} className="text-accent-gold" />;
      case 3: return <Calendar size={20} className="text-accent-gold" />;
      default: return <Orbit size={20} className="text-accent-gold" />;
    }
  };

  return (
    <section 
      ref={containerRef}
      id="dome" 
      className="relative py-28 px-6 md:px-12 bg-deep-dark flex flex-col items-center overflow-hidden border-t border-b border-white/3"
    >
      {/* Spotlight highlight backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-gold/3 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Dome Immersive Zoom Visual Frame */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div 
            ref={domeCircleRef}
            className="w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(200,164,107,0.15)] bg-black transition-all select-none"
          >
            <div className="w-full h-full relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35 z-10 pointer-events-none" />
              {/* Rotating inner cosmic view */}
              <img 
                src={DOME_THEATRE.image} 
                alt="Cosmic Space Projection" 
                className="w-full h-full object-cover animate-[spin_100s_linear_infinite]"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Text and Core Highlights */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col text-left justify-center">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-4">
            The Cinema Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            {DOME_THEATRE.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8 max-w-xl">
            {DOME_THEATRE.description}
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DOME_THEATRE.features.map((feat, idx) => (
              <div 
                key={idx}
                className="glass-card p-5 border border-white/5 rounded-sm hover:border-accent-gold/25 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-sm bg-white/2 border border-white/5 flex items-center justify-center mb-3">
                  {getIcon(idx)}
                </div>
                <h4 className="font-serif text-base font-bold text-white mb-1.5">
                  {feat.title}
                </h4>
                <p className="font-sans text-xs text-white/50 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs tracking-[0.25em] uppercase text-accent-gold hover:text-white font-semibold flex items-center gap-2 group/btn"
            >
              Book Private Dome Screening
              <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
