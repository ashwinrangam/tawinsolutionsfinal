import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/layout/HeroSection';
import ServicesSection from '../components/layout/ServicesSection';
import AboutSection from '../components/layout/AboutSection';
import TeamSection from '../components/layout/TeamSection';
import ContactSection from '../components/layout/ContactSection';
import Footer from '../components/layout/Footer';
import { ParallaxBackground, ParticleField } from '../components/ui/ParallaxBackground';

export default function IndexPage() {
  // Define parallax background layers
  const parallaxLayers = [
    {
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      speed: 0.1,
      opacity: 0.07,
      zIndex: -30,
    },
    {
      image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      speed: 0.3,
      opacity: 0.05,
      zIndex: -20,
    }
  ];

  useEffect(() => {
    // Initialize particles.js for background effects
    const loadParticles = () => {
      try {
        // Configure particles
        if (typeof window !== 'undefined' && window.particlesJS) {
          window.particlesJS('particles-js', {
            particles: {
              number: { 
                value: 30, // Reduced from 60 to avoid overcrowding with our new parallax particles
                density: { enable: true, value_area: 1000 } 
              },
              color: { value: "#D4AF37" },
              shape: {
                type: ["circle", "triangle"],
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
              },
              opacity: { 
                value: 0.2, // Reduced opacity for better text readability
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
                opacity: 0.15, // Reduced opacity
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
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Enhanced parallax background */}
      <ParallaxBackground layers={parallaxLayers} />
      <ParticleField count={80} color="rgba(212, 175, 55, 0.1)" />
      
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