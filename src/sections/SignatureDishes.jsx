import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIGNATURE_DISHES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureDishes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current.querySelectorAll('.storytelling-row');
      
      rows.forEach((row, index) => {
        const imageFrame = row.querySelector('.dish-image-frame');
        const textBlock = row.querySelector('.dish-text-block');
        
        // Stagger fade-in from left or right depending on even/odd index
        const direction = index % 2 === 0 ? 60 : -60;

        gsap.fromTo(imageFrame,
          { opacity: 0, x: -direction, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );

        gsap.fromTo(textBlock.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 bg-deep-dark flex flex-col items-center overflow-hidden border-t border-white/3"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-24 select-none">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-3">
            Gourmet Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            THE SIGNATURE SHOWCASES
          </h2>
          <div className="h-[1px] w-24 bg-accent-gold/40" />
        </div>

        {/* Alternating Stories */}
        <div className="flex flex-col gap-32">
          {SIGNATURE_DISHES.map((dish, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index}
                className="storytelling-row grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full"
              >
                {/* Visual Image - Ordered left/right based on screen sizing */}
                <div 
                  className={`lg:col-span-6 overflow-hidden border border-white/5 shadow-2xl rounded-sm dish-image-frame ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="h-[350px] sm:h-[450px] overflow-hidden relative group">
                    <div className="absolute inset-0 bg-deep-dark/15 group-hover:bg-transparent transition-all duration-700 z-10 pointer-events-none" />
                    <img 
                      src={dish.image} 
                      alt={dish.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 select-none"
                    />
                  </div>
                </div>

                {/* Editorial Text - Ordered left/right */}
                <div 
                  className={`lg:col-span-6 flex flex-col text-left dish-text-block ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dish.badges.map((badge, bIdx) => (
                      <span 
                        key={bIdx} 
                        className="px-3 py-1 bg-white/3 border border-white/8 text-[9px] tracking-[0.2em] uppercase text-accent-gold/80 font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Title & Price */}
                  <div className="mb-4 flex justify-between items-baseline gap-4">
                    <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                      {dish.title}
                    </h3>
                    {dish.price && (
                      <span className="font-serif text-xl sm:text-3xl font-bold text-accent-gold shrink-0">
                        ₹{dish.price}
                      </span>
                    )}
                  </div>

                  {/* Divider Line */}
                  <div className="h-[1px] w-full bg-white/10 mb-6" />

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8">
                    {dish.description}
                  </p>

                  {/* Call-to-action button */}
                  <div>
                    <button 
                      onClick={() => {
                        const contactEl = document.getElementById('contact');
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-xs tracking-[0.25em] uppercase text-accent-gold hover:text-white font-semibold flex items-center gap-2 group/btn"
                    >
                      Reserve Culinary Table
                      <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
