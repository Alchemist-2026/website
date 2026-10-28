import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Gamepad, Compass, Heart, Award } from 'lucide-react';
import ThreeBurger from '../components/ThreeBurger';
import ThreePizza from '../components/ThreePizza';
import { PHOTO_GALLERY } from '../data/content';

export default function GalleryPage({ onBack }) {
  const containerRef = useRef(null);
  const itemsRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Window scroll reset on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Staggered entrance for header elements
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
      );

      // Staggered entrance for 3D showcase rows
      const showcases = containerRef.current.querySelectorAll('.showcase-row');
      gsap.fromTo(showcases,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }
      );

      // Staggered entrance for masonry grid items
      const gridItems = itemsRef.current?.querySelectorAll('.gallery-grid-item');
      if (gridItems) {
        gsap.fromTo(gridItems,
          { opacity: 0, y: 30, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1, 
            stagger: 0.08, 
            ease: "power3.out",
            delay: 0.4
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-deep-dark text-white pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative Gold Blurred Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-accent-gold/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-coffee-brown/4 blur-[160px] pointer-events-none" />

      {/* Floating Progress Tracker Accent */}
      <div className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-coffee-brown via-accent-gold to-white w-full z-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="flex flex-col items-start gap-4 mb-20">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-full hover:border-accent-gold hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-300 active:scale-95 cursor-pointer text-xs tracking-[0.25em] uppercase font-bold text-white/70"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
            Back to Sanctuary
          </button>
          
          <div className="text-left mt-4 select-none">
            <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-2 block">
              Dimensional Journal
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4">
              THE ALCHEMIST ARCHIVES
            </h1>
            <p className="font-sans text-sm sm:text-base text-white/50 max-w-xl font-light leading-relaxed">
              Step inside our immersive 3D show kitchen and explore raw spatial assets. Rotate models in 3D space to explore culinary craftsmanship.
            </p>
            <div className="h-[1px] w-24 bg-accent-gold/40 mt-8" />
          </div>
        </div>

        {/* ==================== 3D INTERACTIVE SHOWCASES ==================== */}
        <div className="flex flex-col gap-24 mb-32">
          
          {/* Row 1: The 3D Burger Showcase */}
          <div className="showcase-row grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border border-white/5 bg-white/2 rounded-md p-8 sm:p-12 shadow-2xl relative overflow-hidden group hover:border-accent-gold/20 transition-all duration-500">
            {/* Radial Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,107,0.02),transparent_70%)] pointer-events-none" />

            {/* 3D WebGL Canvas */}
            <div className="lg:col-span-6 bg-black/30 border border-white/5 rounded-sm p-4 relative flex items-center justify-center">
              <ThreeBurger />
              <div className="absolute bottom-4 left-4 pointer-events-none select-none text-left">
                <span className="text-[8px] tracking-[0.3em] uppercase text-accent-gold font-bold bg-accent-gold/10 px-2.5 py-1 rounded-full">
                  🖱️ Drag to rotate 3D model
                </span>
              </div>
            </div>

            {/* Editorial Information */}
            <div className="lg:col-span-6 flex flex-col text-left justify-center lg:pl-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-accent-gold/10 border border-accent-gold/25 text-[9px] tracking-[0.2em] uppercase text-accent-gold font-bold">
                  WebGL Interactive
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">Gilded Series</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                THE ALCHEMIST GOLD-LEAF BURGER
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                A masterpiece of premium gastronomy. Built procedurally in our 3D test kitchen, we stack 250 grams of A5 Grade seared Wagyu beef, melting aged tandoori cheddar sheets, crisp green organic leaf folds, and encase them inside a toasted glazed bun finished with edible 24k gold leaf dustings.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-sm bg-white/3 border border-white/5 flex items-center justify-center text-accent-gold shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">A5 Grade</h4>
                    <span className="text-[10px] text-white/40 font-light">Japanese Wagyu</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-sm bg-white/3 border border-white/5 flex items-center justify-center text-accent-gold shrink-0">
                    <Heart size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">24k Gilded</h4>
                    <span className="text-[10px] text-white/40 font-light">Edible Gold Foliage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: The 3D Pizza Showcase */}
          <div className="showcase-row grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border border-white/5 bg-white/2 rounded-md p-8 sm:p-12 shadow-2xl relative overflow-hidden group hover:border-accent-gold/20 transition-all duration-500">
            {/* Radial Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,164,107,0.02),transparent_70%)] pointer-events-none" />

            {/* Editorial Information - Ordered Left on Desktop */}
            <div className="lg:col-span-6 flex flex-col text-left justify-center lg:pr-8 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-accent-gold/10 border border-accent-gold/25 text-[9px] tracking-[0.2em] uppercase text-accent-gold font-bold">
                  WebGL Interactive
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">Woodfired Crust</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                TRUFFLE &amp; PEPPERONI GOLD PIZZA
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                Artisan pizza baking reaches its absolute zenith. The sourdough base undergoes 72 hours of slow-ferment maturation, hand-stretched and cooked inside our custom gold-domed stone oven. Layered with melting cream cheese, spicy circular pepperoni clusters, and fresh wild basil sprigs.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-sm bg-white/3 border border-white/5 flex items-center justify-center text-accent-gold shrink-0">
                    <Compass size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">72h Sourdough</h4>
                    <span className="text-[10px] text-white/40 font-light">Natural Fermentation</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-sm bg-white/3 border border-white/5 flex items-center justify-center text-accent-gold shrink-0">
                    <Gamepad size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">Gourmet Toppings</h4>
                    <span className="text-[10px] text-white/40 font-light">Truffle &amp; Basil Dust</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D WebGL Canvas - Ordered Right on Desktop */}
            <div className="lg:col-span-6 bg-black/30 border border-white/5 rounded-sm p-4 relative flex items-center justify-center order-1 lg:order-2">
              <ThreePizza />
              <div className="absolute bottom-4 left-4 pointer-events-none select-none text-left">
                <span className="text-[8px] tracking-[0.3em] uppercase text-accent-gold font-bold bg-accent-gold/10 px-2.5 py-1 rounded-full">
                  🖱️ Drag to rotate 3D model
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ==================== MASONRY IMAGE GRID ==================== */}
        <div className="mb-12 text-left select-none">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-2 block">
            Visual Portfolio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            IMAGERY SNAPSHOT WALL
          </h2>
          <div className="h-[1px] w-24 bg-accent-gold/40" />
        </div>

        <div 
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {PHOTO_GALLERY.map((item, idx) => (
            <div
              key={idx}
              className="gallery-grid-item relative group overflow-hidden border border-white/5 rounded-sm shadow-xl cursor-crosshair h-[300px] sm:h-[380px]"
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              />

              {/* Hover Text reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 sm:p-8 text-left z-20">
                <span className="text-[9px] tracking-[0.3em] uppercase text-accent-gold font-bold mb-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
              </div>

              {/* Cover Mask */}
              <div className="absolute inset-0 bg-deep-dark/15 z-10 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
