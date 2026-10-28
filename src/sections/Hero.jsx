import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BRAND_INFO } from '../data/content';
import { ArrowDown, Calendar } from 'lucide-react';
import coffeeVideo from "./video/cafe.MOV";
import logoImage from "./video/logo.png";

export default function Hero() {
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtly zoom the background image endlessly
      gsap.fromTo(bgRef.current,
        { scale: 1.05 },
        { scale: 1.15, duration: 20, ease: "none", repeat: -1, yoyo: true }
      );

      // Hero content staggered entry (after preloader complete)
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(subtitleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 0.6, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(taglineRef.current,
        { opacity: 0, letterSpacing: "0.1em" },
        { opacity: 1, letterSpacing: "0.25em", duration: 1.2, ease: "power3.out" },
        "-=1.0"
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.8, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      )
      .fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

      // Bouncing scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id) => {
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
   <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center px-6">

  {/* Background Video */}
  <video
    ref={bgRef}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
  >
    <source src={coffeeVideo} type="video/mp4" />
  </video>

  {/* Dark Overlay (optional) */}
  <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Cinematic Luxury Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/40 to-deep-dark/80" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Editorial Subtitle */}
        <img src={logoImage} alt="Background" className="w-100 h-100 object-cover opacity-10"
/>
       {/* <h1 
          ref={titleRef}
          className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white mb-4 select-none leading-none"
        >
         {BRAND_INFO.name}
        </h1>
        <span 
          ref={subtitleRef}
          className="text-xs md:text-sm tracking-[0.4em] text-accent-gold uppercase font-semibold mb-3 select-none"
        >
          {BRAND_INFO.subtitle}
        </span>
*/}
        {/* Master Heading */}

        {/* Serif Tagline */}
        <p 
          ref={taglineRef}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-warm-beige mb-6 font-light select-none"
        >
          {BRAND_INFO.tagline}
        </p>

        {/* Description */}
        <p 
          ref={descRef}
          className="font-sans text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mb-10 leading-relaxed font-light select-none"
        >
          {BRAND_INFO.description}
        </p>

        {/* CTAs */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Accent Filled Button */}
          <button
            onClick={() => handleScrollTo('about')}
            className="w-full sm:w-auto relative px-8 py-3.5 bg-accent-gold border border-accent-gold rounded-full px-8 py-3.5 text-deep-dark font-sans text-xs tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:bg-white hover:border-white shadow-[0_4px_20px_rgba(200,164,107,0.25)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.4)]"
          >
            Explore Experience
          </button>

          {/* Bordered Button */}
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 bg-white/5 backdrop-blur-md rounded-full px-8 py-3.5 text-white font-sans text-xs tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:bg-white hover:text-deep-dark hover:border-white"
          >
            <Calendar size={14} />
            Book A Table
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto relative px-8 py-3.5 bg-accent-gold border border-accent-gold rounded-full px-8 py-3.5 text-deep-dark font-sans text-xs tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:bg-white hover:border-white shadow-[0_4px_20px_rgba(200,164,107,0.25)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.4)]"
          >
            Host an Event
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 select-none pointer-events-auto group"
      >
        {/* <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 group-hover:text-accent-gold transition-colors duration-300">
          Scroll to explore
        </span> */}
        {/* <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-gold transition-colors duration-300">
          <ArrowDown size={14} className="text-white/40 group-hover:text-accent-gold transition-colors duration-300" />
        </div> */}
      </div>
    </section>
  );
}
