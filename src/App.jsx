import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Core UI enhancers
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import AmbientCursor from './components/AmbientCursor';
import WhatsAppButton from './components/WhatsAppButton';
import InstagramAppButton from './components/InstaAppButton';
// Pages
import GalleryPage from './pages/GalleryPage';

// 11 experiential sections
import Hero from './sections/Hero';
//import About from './sections/About';
import FoodExperience from './sections/FoodExperience';
import SignatureDishes from './sections/SignatureDishes';
import GamingLounge from './sections/GamingLounge';
//import VrExperience from './sections/VrExperience';
import DomeTheatre from './sections/DomeTheatre';
import PhotoGallery from './sections/PhotoGallery';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Sync hash routing changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gallery') {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };

    // Run once on initial render
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth scroll activation
  useEffect(() => {
    if (!loaded) {
      // Prevent body scroll while loading
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'unset';

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis scroll
    lenis.on('scroll', () => {
      // Ensure ScrollTrigger updates on smooth scrolls
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.update();
      });
    });

    return () => {
      lenis.destroy();
    };
  }, [loaded, currentPage]); // Reinitialize scroll logic on page change

  return (
    <>
      {/* Luxury Loading Preloader Curtain (fades out and unmounts) */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Main Orchestration Structure (Always present in the DOM for maximum SEO and fail-safety) */}
      <div className="bg-deep-dark text-white min-h-screen relative font-sans antialiased overflow-x-hidden selection:bg-accent-gold selection:text-deep-dark">
        
        {/* Spatial Spotlight, Ambient Cursor, and Floating CTAs */}
        <AmbientCursor />
        <Navbar />
        <WhatsAppButton />
        <InstagramAppButton />
        {/* Sequential Single-Page experience sections */}
        <main>
          {currentPage === 'home' ? (
            <>
              <Hero />
              {/* <About /> */}
              <FoodExperience />
              <SignatureDishes />
              <GamingLounge />
              {/*<VrExperience />*/}
              <DomeTheatre />
              <PhotoGallery />
              <Testimonials />
              <Contact />
            </>
          ) : (
            <GalleryPage onBack={() => { window.location.hash = '#home'; }} />
          )}
        </main>

        {/* Master Editorial Footer */}
        <Footer />

      </div>
    </>
  );
}
