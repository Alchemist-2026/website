import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TESTIMONIALS } from '../data/content';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);

  const handleNext = () => {
    // Elegant transition triggers
    gsap.fromTo(cardRef.current,
      { opacity: 1, x: 0 },
      { 
        opacity: 0, 
        x: -20, 
        duration: 0.35, 
        ease: "power2.in", 
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        } 
      }
    );
  };

  const handlePrev = () => {
    gsap.fromTo(cardRef.current,
      { opacity: 1, x: 0 },
      { 
        opacity: 0, 
        x: 20, 
        duration: 0.35, 
        ease: "power2.in", 
        onComplete: () => {
          setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
        } 
      }
    );
  };

  useEffect(() => {
    // Cascade slide-in animation when activeIndex changes
    const direction = 30; // Slide offset
    gsap.fromTo(cardRef.current,
      { opacity: 0, x: direction },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [activeIndex]);

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section 
      id="reviews" 
      className="relative py-24 px-6 md:px-12 bg-deep-dark flex flex-col items-center overflow-hidden border-t border-white/3"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-3">
            Voices of Alchemist
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            GUEST EXPERIENCES
          </h2>
          <div className="h-[1px] w-24 bg-accent-gold/40" />
        </div>

        {/* Testimonial Active Display Panel */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Decorative Quote Icon */}
          <div className="absolute top-[-25px] left-[15px] sm:left-[30px] opacity-10 text-accent-gold pointer-events-none select-none">
            <Quote size={80} />
          </div>

          <div 
            ref={cardRef}
            className="w-full glass-card border border-white/5 rounded-sm p-8 sm:p-14 shadow-2xl relative z-10 text-left flex flex-col sm:flex-row gap-8 items-start sm:items-center"
          >
            {/* Guest Avatar Portrait Frame */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 overflow-hidden rounded-full border-2 border-accent-gold/30 shrink-0 select-none">
              <img 
                src={activeTestimonial.avatar} 
                alt={activeTestimonial.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Testimonial Core Copy */}
            <div className="flex-1 flex flex-col">
              {/* Star Ratings */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent-gold text-accent-gold" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="font-serif italic text-lg sm:text-xl text-white/80 leading-relaxed font-light mb-6">
                "{activeTestimonial.review}"
              </blockquote>

              {/* Guest Identity */}
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                  {activeTestimonial.name}
                </h4>
                <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-accent-gold/80 font-medium mt-0.5">
                  {activeTestimonial.role}
                </p>
              </div>
            </div>

          </div>

          {/* Testimonial Control Sliders */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-accent-gold hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-300 active:scale-95"
              aria-label="Previous Review"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-accent-gold hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-300 active:scale-95"
              aria-label="Next Review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
