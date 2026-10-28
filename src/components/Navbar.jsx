import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setIsOpen(false);
    
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
      // Offset for sticky header
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

  const navLinks = [
    { label: "Experience", id: "about" },
    { label: "Menu", id: "menu" },
    { label: "Gaming", id: "gaming" },
    { label: "Dome Theatre", id: "dome" },
    { label: "Gallery", id: "gallery" },
    { label: "Reviews", id: "reviews" }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-4 lg:px-8 xl:px-12 py-4 ${
          scrolled 
            ? 'bg-deep-dark/80 backdrop-blur-md border-b border-white/5 shadow-2xl py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col cursor-pointer group"
          >
            <span className="font-serif text-lg lg:text-base xl:text-xl font-bold tracking-[0.2em] xl:tracking-[0.25em] text-white group-hover:text-accent-gold transition-colors duration-300">
              {BRAND_INFO.name}
            </span>
            <span className="text-[9px] tracking-[0.3em] xl:tracking-[0.4em] text-accent-gold font-light px-2 group-hover:text-white transition-colors duration-300 ">
              {BRAND_INFO.subtitle}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center lg:gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="lg:text-[10px] xl:text-xs lg:tracking-[0.12em] xl:tracking-[0.2em] uppercase text-white/70 hover:text-accent-gold transition-colors duration-300 font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Book CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo('contact')}
              className="group relative flex items-center justify-center gap-2 overflow-hidden border border-accent-gold bg-transparent lg:px-4 lg:py-2 lg:text-[10px] lg:tracking-[0.15em] xl:px-6 xl:py-2.5 xl:text-xs xl:tracking-[0.25em] text-white transition-all duration-300 hover:text-deep-dark hover:bg-accent-gold"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book A Table
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white/90 hover:text-accent-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 z-30 bg-deep-dark/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className="text-lg tracking-[0.25em] uppercase text-white hover:text-accent-gold transition-colors"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo('contact')}
            className="mt-6 border border-accent-gold px-8 py-3 text-sm tracking-[0.25em] uppercase text-accent-gold hover:bg-accent-gold hover:text-deep-dark transition-all duration-300"
          >
            Book A Table
          </button>
        </div>
      </div>
    </>
  );
}
