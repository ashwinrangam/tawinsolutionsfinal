import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/layout/HeroSection';
import ServicesSection from '../components/layout/ServicesSection';
import EnhancedAboutSection from '../components/layout/EnhancedAboutSection';
import TeamSection from '../components/layout/TeamSection';
import EnhancedContactSection from '../components/layout/EnhancedContactSection';
import Footer from '../components/layout/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function IndexPage() {
  useEffect(() => {
    // Optimize for performance
    gsap.ticker.lagSmoothing(1000, 16); // Help with performance during scrolling
    
    // Setup smooth scrolling with better performance
    const setupSmoothScroll = () => {
      // Add hardware acceleration for smoother animations
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.style.willChange = 'transform, opacity';
        section.style.transform = 'translateZ(0)';
      });
      
      // Add smooth scrolling behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    };
    
    // Initialize scrolltrigger refresh on resize for responsive animations
    const setupResizeHandler = () => {
      // Debounce function to avoid excessive refreshes
      let resizeTimer;
      
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      });
    };
    
    // Load background effects
    const loadBackgroundEffects = () => {
      try {
        // Configure particles with higher quality settings for premium look
        if (typeof window !== 'undefined' && window.particlesJS) {
          window.particlesJS('particles-js', {
            particles: {
              number: { 
                value: 40, 
                density: { enable: true, value_area: 1200 } 
              },
              color: { value: "#D4AF37" },
              shape: {
                type: ["circle", "triangle"],
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
              },
              opacity: { 
                value: 0.2,
                random: true,
                anim: { enable: true, speed: 0.8, opacity_min: 0.1 }
              },
              size: { 
                value: 3, 
                random: true,
                anim: { enable: true, speed: 1.5, size_min: 1, size_max: 5 }
              },
              line_linked: { 
                enable: true,
                distance: 150,
                color: "#D4AF37",
                opacity: 0.2,
                width: 0.7
              },
              move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                repulse: { distance: 120, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
              }
            },
            retina_detect: true
          });
        }
      } catch (error) {
        console.error('Failed to load particles.js', error);
      }
    };
    
    // Setup page transitions
    const setupPageTransitions = () => {
      // Setup initial reveal animation
      gsap.from('body', { 
        duration: 1,
        opacity: 0,
        ease: 'power2.inOut'
      });
      
      // Create a reusable animation for section transitions
      const createSectionTransition = (selector) => {
        ScrollTrigger.create({
          trigger: selector,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(selector, {
              duration: 0.5,
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              clearProps: 'all'
            });
          },
          once: true
        });
      };
      
      // Apply transitions to main sections
      ['#hero', '#services', '#team', '#footer'].forEach(selector => {
        createSectionTransition(selector);
      });
    };

    // Initialize all effects
    setupSmoothScroll();
    setupResizeHandler();
    loadBackgroundEffects();
    setupPageTransitions();
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = '';
      
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-foreground relative overflow-hidden">
      {/* Premium background particles */}
      <div 
        id="particles-js" 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)'
        }} 
      />
      
      {/* Gradient overlay for depth */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-70"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)'
        }} 
      />
      
      {/* Page content with enhanced animations */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <EnhancedAboutSection />
        <TeamSection />
        <EnhancedContactSection />
        <Footer />
      </div>
    </div>
  );
}