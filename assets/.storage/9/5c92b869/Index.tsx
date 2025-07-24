import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/layout/HeroSection';
import ServicesSection from '../components/layout/ServicesSection';
import AboutSection from '../components/layout/AboutSection';
import TeamSection from '../components/layout/TeamSection';
import ContactSection from '../components/layout/ContactSection';
import Footer from '../components/layout/Footer';

export default function IndexPage() {
  useEffect(() => {
    // Initialize particles.js for background effects
    const loadParticles = () => {
      try {
        // Configure particles
        if (typeof window !== 'undefined' && window.particlesJS) {
          window.particlesJS('particles-js', {
            particles: {
              number: { 
                value: 60, 
                density: { enable: true, value_area: 1000 } 
              },
              color: { value: "#D4AF37" },
              shape: {
                type: ["circle", "triangle"],
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
              },
              opacity: { 
                value: 0.3,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1 }
              },
              size: { 
                value: 3, 
                random: true,
                anim: { enable: true, speed: 2, size_min: 1, size_max: 5 }
              },
              line_linked: { 
                enable: true,
                distance: 120,
                color: "#D4AF37",
                opacity: 0.2,
                width: 0.5
              },
              move: {
                enable: true,
                speed: 0.5,
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
                repulse: { distance: 100, duration: 0.4 },
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

    loadParticles();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}