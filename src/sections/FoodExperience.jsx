import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FOOD_CATEGORIES, FOOD_MENU } from '../data/content';

export default function FoodExperience() {
  const [activeTab, setActiveTab] = useState(FOOD_CATEGORIES[0].id);
  const gridRef = useRef(null);
  const bannerRef = useRef(null);
  const containerRef = useRef(null);

  // Find active category detail
  const activeCategory = FOOD_CATEGORIES.find(cat => cat.id === activeTab);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.menu-card-item');
    const banner = bannerRef.current;

    // Smooth fade & scale stagger entrance for menu cards
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 15, scale: 0.99 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: "power2.out" 
        }
      );
    }

    // Category banner parallax scale-up
    if (banner) {
      gsap.fromTo(banner,
        { opacity: 0.5, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <section 
      ref={containerRef}
      id="menu" 
      className="relative py-24 px-6 md:px-12 bg-deep-dark flex flex-col items-center overflow-hidden border-t border-white/3"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="text-xs tracking-[0.3em] text-accent-gold uppercase font-bold mb-3">
            Gourmet Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            ALCHEMIST SIGNATURE MENU
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/50 max-w-xl font-light leading-relaxed">
            Take a sensory journey through our gourmet selections—from fresh woodfired artisan sourdough to signature milkshakes and mocktails.
          </p>
          <div className="h-[1px] w-24 bg-accent-gold/40 mt-8" />
        </div>

        {/* Categories Tab Navigation */}
        <div className="w-full overflow-x-auto scrollbar-none mb-12 pb-3">
          <div className="flex w-max mx-auto bg-white/2 border border-white/5 p-1.5 rounded-full backdrop-blur-md whitespace-nowrap">
            {FOOD_CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-accent-gold text-deep-dark shadow-lg font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/3'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Image Banner */}
        <div className="w-full h-[220px] sm:h-[320px] overflow-hidden border border-white/5 shadow-2xl rounded-sm relative mb-12 select-none">
          <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/30 to-deep-dark/65 z-10" />
          <img
            ref={bannerRef}
            src={activeCategory?.image}
            alt={activeCategory?.label}
            className="w-full h-full object-cover absolute top-0 left-0"
          />
          
          {/* Banner Title Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-12 text-left">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent-gold font-bold mb-2">
              Explore Culinary Category
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              {activeCategory?.label}
            </h3>
          </div>
        </div>

        {/* Typographic Menu List Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {FOOD_MENU[activeTab]?.map((item, index) => (
            <div
              key={index}
              className="menu-card-item glass-card p-6 sm:p-8 flex flex-col text-left border rounded-sm relative group hover:translate-y-[-2px] hover:border-accent-gold/25 transition-all duration-300"
            >
              {/* Background gradient flare */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(200,164,107,0.02),transparent_70%)] pointer-events-none" />

              {/* Title, Price & Badges */}
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-accent-gold transition-colors duration-300">
                    {item.title}
                  </h4>
                 {/* {item.price && (
                     <span className="font-serif text-base sm:text-lg font-bold text-accent-gold shrink-0">
                    ₹{item.price}
                  </span>
                  )}*/}
                </div>
                
                {/* Custom Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags?.map((tag, tIdx) => {
                    const isVeg = tag === 'Veg';
                    const isNonVeg = tag === 'Non-Veg';
                    const isSpecial = tag.includes('Special') || tag.includes('Signature');
                    
                    return (
                      <span
                        key={tIdx}
                        className={`px-2 py-0.5 rounded-full text-[8px] tracking-widest font-semibold uppercase ${
                          isVeg 
                            ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' 
                            : (isNonVeg 
                                ? 'text-rose-400 bg-rose-400/10 border border-rose-400/20' 
                                : (isSpecial 
                                    ? 'text-accent-gold bg-accent-gold/15 border border-accent-gold/20 font-bold' 
                                    : 'text-white/40 bg-white/3 border border-white/5'))
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                {item.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
