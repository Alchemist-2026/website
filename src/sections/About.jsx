import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_DETAILS, ABOUT_STATS } from '../data/content';
import { Award, Compass, Heart, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title & Paragraphs Stagger Reveal
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Parallax effect on the tall interior image
      gsap.fromTo(imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // 3. Stats Cards Stagger Reveal
      const cards = statsContainerRef.current.querySelectorAll('.stat-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 4. Counter Up numeric animations
      const counters = statsContainerRef.current.querySelectorAll('.counter-val');
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const hasDecimals = target % 1 !== 0;
        const countObj = { val: 0 };
        
        gsap.to(countObj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            counter.textContent = hasDecimals 
              ? countObj.val.toFixed(1) 
              : Math.floor(countObj.val);
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Utility to map corresponding luxury icons
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <Compass size={24} className="text-accent-gold" />;
      case 1: return <Coffee size={24} className="text-accent-gold" />;
      case 2: return <Award size={24} className="text-accent-gold" />;
      case 3: return <Heart size={24} className="text-accent-gold" />;
      default: return <Compass size={24} className="text-accent-gold" />;
    }
  };

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-deep-dark flex flex-col justify-center overflow-hidden"
    >
      {/* Editorial Split layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Premium Brand Text */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col text-left">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-4">
            {ABOUT_DETAILS.sectionTitle || "The Philosophy"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-8 leading-tight max-w-xl">
            {ABOUT_DETAILS.title}
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed mb-6 max-w-2xl">
            {ABOUT_DETAILS.paragraph1}
          </p>
          
          {ABOUT_DETAILS.features && (
            <ul className="space-y-3 mb-8 max-w-2xl pl-1">
              {ABOUT_DETAILS.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-accent-gold mt-1.5 shrink-0 text-[10px]">●</span>
                  <span className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/50 font-light leading-relaxed mb-8 max-w-2xl">
            {ABOUT_DETAILS.paragraph2}
          </p>
          
          <div className="h-[1px] w-1/4 bg-accent-gold/30 mt-4" />
        </div>

        {/* Right Column: Parallax Image Panel */}
        <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[550px] overflow-hidden border border-white/5 shadow-2xl rounded-sm">
          <div className="absolute inset-0 bg-deep-dark/10 z-10" />
          <img 
            ref={imageRef}
            src={ABOUT_DETAILS.image}
            alt="Alchemist Lakeside Interior"
            className="w-full h-[120%] object-cover absolute top-0 left-0"
          />
        </div>
      </div>

      {/* Luxury Stats Block */}
      <div 
        ref={statsContainerRef}
        className="max-w-7xl mx-auto w-full mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 select-none"
      >
        {ABOUT_STATS.map((stat, idx) => {
          // Parse target numbers and prefixes/suffixes
          const isStar = stat.value.includes('5-Star');
          const isPercent = stat.value.includes('100%');
          const isPlus = stat.value.includes('+');
          
          const rawNum = isStar ? 5 : (isPercent ? 100 : parseInt(stat.value));
          const suffix = isStar ? "-Star" : (isPercent ? "%" : (isPlus ? "+" : ""));

          return (
            <div 
              key={idx}
              className="stat-card glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center rounded-sm hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="mb-4 w-12 h-12 rounded-full bg-white/3 border border-white/5 flex items-center justify-center">
                {getIcon(idx)}
              </div>
              <div className="flex items-baseline font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                <span className="counter-val" data-target={rawNum}>0</span>
                <span className="text-accent-gold ml-0.5">{suffix}</span>
              </div>
              <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50 font-light">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
