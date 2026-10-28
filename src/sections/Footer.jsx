import React from 'react';
import { BRAND_INFO } from '../data/content';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: "Experience", id: "about" },
    { label: "Menu Catalog", id: "menu" },
    { label: "Gaming Zone", id: "gaming" },
    { label: "Dome Theatre", id: "dome" },
    { label: "Reservations", id: "contact" }
  ];

  const handleScrollTo = (id) => {
    if (id === 'gallery') {
      window.location.hash = '#gallery';
      return;
    }

    // If we are currently on the gallery page, return to home and scroll
    if (window.location.hash === '#gallery') {
      window.location.hash = '#home';
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-[#040202] py-20 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Visual top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />

    {/*}  <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 text-left mb-16 relative z-10">
    {/*}    
    {/*}    {/* Column 1: Brand details */}
    {/*}    <div className="lg:col-span-5 flex flex-col gap-6">
    {/*}      <div>
    {/*}        <span className="font-serif text-2xl font-bold tracking-[0.25em] text-white">
    {/*}          {BRAND_INFO.name}
    {/*}        </span>
    {/*}        <span className="text-[10px] tracking-[0.4em] text-accent-gold font-light block mt-1">
    {/*}          {BRAND_INFO.subtitle}
    {/*}        </span>
    {/*}      </div>
    {/*}      <p className="font-sans text-xs sm:text-sm text-white/50 font-light leading-relaxed max-w-sm">
    {/*}        Synthesizing lakeside tranquility with Michelin-inspired cuisines, state-of-the-art competitive gaming, and cinematic dome projections. An immersive destination.
    {/*}      </p>
    {/*}      <div className="flex gap-4">
    {/*}        <a 
    {/*}          href="https://instagram.com" 
    {/*}          target="_blank" 
    {/*}          rel="noopener noreferrer"
    {/*}          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-accent-gold hover:text-accent-gold transition-colors duration-300"
    {/*}          aria-label="Instagram"
    {/*}        >
    {/*}          <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    {/*}        </a>
    {/*}        <a 
    {/*}          href="https://facebook.com" 
    {/*}          target="_blank" 
    {/*}          rel="noopener noreferrer"
    {/*}          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-accent-gold hover:text-accent-gold transition-colors duration-300"
    {/*}          aria-label="Facebook"
    {/*}        >
    {/*}          <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    {/*}        </a>
    {/*}        <a 
    {/*}          href="https://twitter.com" 
    {/*}          target="_blank" 
    {/*}          rel="noopener noreferrer"
    {/*}          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-accent-gold hover:text-accent-gold transition-colors duration-300"
    {/*}          aria-label="Twitter"
    {/*}        >
    {/*}          <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
    {/*}        </a>
    {/*}      </div>
    {/*}    </div>
{/*}
    {/*}    {/* Column 2: Hours details */}
    {/*}    <div className="lg:col-span-4 flex flex-col gap-6">
    {/*}      <h4 className="font-serif text-sm tracking-[0.25em] uppercase text-accent-gold font-bold">
    {/*}        OPERATING HOURS
    {/*}      </h4>
    {/*}      <div className="flex flex-col gap-4">
    {/*}        {BRAND_INFO.hours.map((hour, idx) => (
    {/*}          <div key={idx} className="flex justify-between border-b border-white/3 pb-2 max-w-xs">
    {/*}            <span className="font-sans text-xs text-white/60 font-light">{hour.days}</span>
    {/*}            <span className="font-sans text-xs text-white/95 font-medium">{hour.time}</span>
    {/*}          </div>
    {/*}        ))}
    {/*}      </div>
    {/*}    </div>
{/*}
    {/*}    {/* Column 3: Quick Navigation links */}
    {/*}    <div className="lg:col-span-3 flex flex-col gap-6">
    {/*}      <h4 className="font-serif text-sm tracking-[0.25em] uppercase text-accent-gold font-bold">
    {/*}        QUICK LINKS
    {/*}      </h4>
    {/*}      <div className="flex flex-col gap-3">
    {/*}        {navLinks.map((link, idx) => (
    {/*}          <button
    {/*}            key={idx}
    {/*}            onClick={() => handleScrollTo(link.id)}
    {/*}            className="text-left font-sans text-xs text-white/50 hover:text-accent-gold tracking-widest uppercase transition-all duration-300 max-w-max"
    {/*}          >
    {/*}            {link.label}
    {/*}          </button>
    {/*}        ))}
    {/*}      </div>
    {/*}    </div>
{/*}
    {/*}  </div>

      {/* Footer Bottom Block */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10 select-none">
        <span className="font-sans text-[10px] tracking-[0.2em] text-white/30 uppercase">
          &copy; 2026 Alchemist Lake Viewery. Created with luxury standards.
        </span>

        {/* Floating Back to Top Button */}
        <button
          onClick={handleScrollTop}
          className="group flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-sm hover:border-accent-gold/40 transition-colors active:scale-95"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/40 group-hover:text-accent-gold transition-colors">
            Back To Top
          </span>
          <ArrowUp size={12} className="text-white/40 group-hover:text-accent-gold transition-colors" />
        </button>
      </div>
    </footer>
  );
}
