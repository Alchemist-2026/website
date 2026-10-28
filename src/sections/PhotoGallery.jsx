import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PhotoGallery() {
  const containerRef = useRef(null);
  const visualsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text entrance reveal
      gsap.fromTo(textRef.current.children,
        { opacity: 0, x: -50 },
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

      // 2. Overlapping images parallax translation
      const images = visualsRef.current.querySelectorAll('.parallax-img-card');
      images.forEach((img, idx) => {
        const speed = (idx + 1) * 12; // Alternating scroll speeds
        gsap.fromTo(img,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavigateToGallery = () => {
    window.location.hash = '#gallery';
  };

  return (
    <section 
      ref={containerRef}
      id="gallery" 
      className="relative py-28 px-6 md:px-12 bg-[#050303] flex flex-col justify-center overflow-hidden border-t border-white/3"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Editorial Description and CTA */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col text-left justify-center">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-4">
            Visual Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            THE DIMENSIONAL ARCHIVES
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/50 font-light leading-relaxed mb-8 max-w-xl">
            Experience Alchemist at another depth. Explore our dedicated widescreen gallery displaying high-resolution journals, tandoori preparations, and active WebGL interactive 3D models.
          </p>

          <div>
            <button
              onClick={handleNavigateToGallery}
              className="group relative flex items-center justify-center gap-3 overflow-hidden border border-accent-gold bg-transparent px-8 py-4 text-xs tracking-[0.25em] uppercase text-accent-gold transition-all duration-500 hover:text-deep-dark hover:bg-accent-gold cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold">
                Enter Widescreen 3D Gallery
                <Compass size={14} className="group-hover:rotate-45 transition-transform duration-500" />
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Overlapping Parallax Cards */}
        <div 
          ref={visualsRef} 
          className="lg:col-span-6 relative h-[450px] sm:h-[550px] flex items-center justify-center select-none"
        >
          {/* Card 1: Lakeside View (Back layer) */}
          <div 
            className="parallax-img-card absolute w-[260px] h-[340px] border border-white/5 rounded-sm overflow-hidden shadow-2xl transition-all duration-500"
            style={{ 
              top: '5%', 
              left: '10%',
              zIndex: 10,
              transform: 'rotate(-6deg)'
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80" 
              alt="Lakeside Vibe" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 2: VR Active (Middle layer) */}
          <div 
            className="parallax-img-card absolute w-[240px] h-[300px] border border-white/5 rounded-sm overflow-hidden shadow-2xl transition-all duration-500"
            style={{ 
              bottom: '10%', 
              right: '12%',
              zIndex: 15,
              transform: 'rotate(6deg)'
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <img 
              src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=600&q=80" 
              alt="Immersive VR" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3: Woodfired Margherita (Front layer) */}
          <div 
            className="parallax-img-card absolute w-[220px] h-[280px] border-2 border-accent-gold/20 rounded-sm overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-accent-gold transition-all duration-500"
            style={{ 
              top: '25%', 
              left: '32%',
              zIndex: 20,
              transform: 'rotate(-2deg)'
            }}
          >
            <div className="absolute inset-0 bg-black/5" />
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" 
              alt="Artisan Culinary" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
