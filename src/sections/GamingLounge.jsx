import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GAMING_INFO } from '../data/content';
import { Gamepad2, Layers, Users, Gauge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GamingLounge() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.querySelectorAll('.gaming-card');
      
      // Staggered GSAP reveal of gaming cards
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Update card spotlight CSS coordinates
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Get matching Lucide icon based on name
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Gamepad2": return <Gamepad2 size={28} />;
      case "VrHeadset": return <Layers size={28} />; // Beautiful multi-layered dimension icon
      case "Users": return <Users size={28} />;
      case "Tv": return <Gauge size={28} />; // Gauge dials represent racing sims
      default: return <Gamepad2 size={28} />;
    }
  };

  // Map neon border accent classes
  const getAccentClass = (accent) => {
    switch (accent) {
      case "ps5": return "neon-glow-ps5";
      case "vr": return "neon-glow-vr";
      default: return "neon-glow-gold";
    }
  };

  // Map text badge highlights
  const getBadgeColor = (accent) => {
    switch (accent) {
      case "ps5": return "text-[#0070f3] bg-[#0070f3]/10";
      case "vr": return "text-[#ba55d3] bg-[#ba55d3]/10";
      default: return "text-accent-gold bg-accent-gold/10";
    }
  };

  return (
    <section 
      ref={containerRef}
      id="gaming" 
      className="relative py-28 px-6 md:px-12 bg-[#050303] flex flex-col items-center overflow-hidden border-t border-b border-white/3"
    >
      {/* Dynamic Cosmic Vector Elements */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-coffee-brown/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 select-none">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-3">
            Premium Play
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            {GAMING_INFO.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/50 max-w-xl font-light leading-relaxed">
            {GAMING_INFO.subheadline}
          </p>
          <div className="h-[1px] w-24 bg-accent-gold/40 mt-8" />
        </div>

        {/* Spotlit Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {GAMING_INFO.features.map((feature, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              className={`gaming-card spotlight-card glass-card relative flex flex-col sm:flex-row border rounded-md overflow-hidden p-6 md:p-8 gap-6 group hover:translate-y-[-4px] ${getAccentClass(feature.accent)}`}
            >
              {/* Left Side: Text and Icon */}
              <div className="flex-1 flex flex-col text-left justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-sm bg-white/2 border border-white/5 flex items-center justify-center text-accent-gold">
                      {getIcon(feature.iconName)}
                    </div>
                    <span className={`px-3 py-1 text-[9px] tracking-widest font-semibold uppercase ${getBadgeColor(feature.accent)}`}>
                      {feature.accent === 'ps5' ? 'PS5 VIP' : (feature.accent === 'vr' ? 'VR Active' : 'SIM Arena')}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/55 font-light leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="h-[1px] w-12 bg-white/10 group-hover:bg-accent-gold/40 group-hover:w-full transition-all duration-500" />
              </div>

              {/* Right Side: Showcase Image */}
              <div className="w-full sm:w-[180px] h-[180px] sm:h-auto overflow-hidden relative border border-white/5 rounded-sm select-none pointer-events-none">
                <div className="absolute inset-0 bg-deep-dark/30 z-10" />
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
