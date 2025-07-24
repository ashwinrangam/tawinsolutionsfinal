import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PremiumSection, ScrollElement, ParallaxLayer, usePremiumScroll } from "../ui/PremiumScrollProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, MapPinIcon, ArrowRightIcon } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function PremiumContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { createScrollTrigger } = usePremiumScroll();

  // Initialize premium animations
  useEffect(() => {
    if (sectionRef.current) {
      // Clean up any existing triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id?.includes("contact")) {
          trigger.kill();
        }
      });
      
      // Form fields animation
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll(".form-animate");
        
        gsap.fromTo(formElements,
          { 
            y: 30, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              id: "contact-form"
            }
          }
        );
      }
      
      // Contact info animation
      const contactItems = document.querySelectorAll(".contact-info-item");
      gsap.fromTo(contactItems,
        { 
          x: -30, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
            toggleActions: "play none none reverse",
            id: "contact-info"
          }
        }
      );
    }
  }, [createScrollTrigger]);

  // Decorative elements for visual interest
  const decorativeElements = [
    { size: "300px", opacity: 0.03, top: "10%", left: "-5%", blur: "120px" },
    { size: "400px", opacity: 0.04, bottom: "15%", right: "-10%", blur: "150px" },
    { size: "200px", opacity: 0.05, top: "60%", left: "30%", blur: "100px" }
  ];

  return (
    <PremiumSection
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-black py-24"
    >
      <div ref={sectionRef} className="w-full h-full">
        {/* Premium animated background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Decorative glowing elements */}
          {decorativeElements.map((el, i) => (
            <ParallaxLayer
              key={i}
              speed={0.2 + (i * 0.1)}
              className="absolute rounded-full bg-gold"
              style={{
                width: el.size,
                height: el.size,
                top: el.top || "auto",
                right: el.right || "auto",
                bottom: el.bottom || "auto",
                left: el.left || "auto",
                opacity: el.opacity,
                filter: `blur(${el.blur})`,
              }}
            />
          ))}
          
          {/* Animated grid background with parallax */}
          <ScrollElement
            className="absolute inset-0"
            animation={{
              from: { opacity: 0.1 },
              to: { opacity: 0.2 }
            }}
            start="top 100%"
            end="bottom 0%"
            scrub={true}
            style={{
              backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Animated floating particles */}
          {Array.from({ length: 20 }).map((_, index) => (
            <ScrollElement
              key={`contact-particle-${index}`}
              animation={{
                from: { 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                  scale: 0.2
                },
                to: { 
                  y: `-=${50 + Math.random() * 100}`,
                  x: `+=${(Math.random() - 0.5) * 50}`,
                  opacity: [0, 0.6, 0],
                  scale: 0.7,
                }
              }}
              start="top bottom"
              end="bottom top"
              scrub={1}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                backgroundColor: 'rgba(212, 175, 55, 0.5)',
                borderRadius: '50%',
                filter: 'blur(1px)'
              }}
            >
              <div className="w-full h-full" />
            </ScrollElement>
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4">
          {/* Section Header with premium reveal */}
          <ScrollElement
            animation={{
              from: { opacity: 0, y: 50 },
              to: { opacity: 1, y: 0 }
            }}
            start="top 80%"
            end="top 40%"
            scrub={0.5}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gold/10 backdrop-blur-sm text-sm uppercase text-gold tracking-widest mb-4">
              Get In Touch
            </span>
            
            <h2 className="text-4xl md:text-6xl font-playfair font-bold tracking-tight mb-6">
              <span className="block text-white mb-2">READY TO</span>
              <span className="block golden-gradient bg-gradient-to-r from-gold via-amber-400 to-gold bg-[length:200%_auto] text-transparent bg-clip-text">
                TRANSFORM YOUR TECHNOLOGY
              </span>
            </h2>
            
            <ScrollElement
              animation={{
                from: { scaleX: 0 },
                to: { scaleX: 1 }
              }}
              start="top 70%"
              end="top 40%"
              scrub={0.3}
              className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent my-6"
              style={{ transformOrigin: "center" }}
            />
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with our team of visionaries and engineers to discuss how TAWIN can help you build the future.
            </p>
          </ScrollElement>

          {/* Contact content with premium animations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form with premium animations */}
            <ScrollElement
              animation={{
                from: { opacity: 0, x: -50, rotationY: 5 },
                to: { opacity: 1, x: 0, rotationY: 0 }
              }}
              start="top 80%"
              end="top 40%"
              scrub={0.5}
              className="perspective-1000 transform-gpu"
            >
              <div className="bg-black/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 shadow-lg shadow-gold/5 relative overflow-hidden">
                <ScrollElement
                  animation={{
                    from: { opacity: 0, scale: 0.8 },
                    to: { opacity: 0.7, scale: 1 }
                  }}
                  start="top 80%"
                  end="center 70%"
                  scrub={true}
                  className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gold/10 filter blur-3xl"
                />
                
                <h3 className="text-2xl text-gold mb-6 font-bold">Send us a message</h3>
                
                <form ref={formRef} className="space-y-6">
                  <div className="form-animate space-y-2">
                    <label htmlFor="name" className="text-white text-sm">Full Name</label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="bg-black/30 border-gold/20 focus:border-gold/60 text-white"
                    />
                  </div>
                  
                  <div className="form-animate space-y-2">
                    <label htmlFor="email" className="text-white text-sm">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-black/30 border-gold/20 focus:border-gold/60 text-white"
                    />
                  </div>
                  
                  <div className="form-animate space-y-2">
                    <label htmlFor="subject" className="text-white text-sm">Subject</label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help?" 
                      className="bg-black/30 border-gold/20 focus:border-gold/60 text-white"
                    />
                  </div>
                  
                  <div className="form-animate space-y-2">
                    <label htmlFor="message" className="text-white text-sm">Your Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project..." 
                      className="bg-black/30 border-gold/20 focus:border-gold/60 text-white min-h-[120px]"
                    />
                  </div>
                  
                  <div className="form-animate pt-2">
                    <Button 
                      type="submit" 
                      className="bg-gold hover:bg-gold/90 text-black w-full relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        Send Message 
                        <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    </Button>
                  </div>
                </form>
              </div>
            </ScrollElement>
            
            {/* Contact Info with premium reveal */}
            <div>
              <ScrollElement
                animation={{
                  from: { opacity: 0, x: 50 },
                  to: { opacity: 1, x: 0 }
                }}
                start="top 80%"
                end="top 40%"
                scrub={0.5}
              >
                <div className="contact-info space-y-10">
                  <div className="mb-10">
                    <h3 className="text-2xl text-gold mb-8 font-bold">Contact Information</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Our team is ready to help you navigate the future of technology. Reach out to us through any of the channels below.
                    </p>
                  </div>
                  
                  <div className="contact-info-item flex items-start space-x-4">
                    <div className="bg-gold/10 rounded-full p-3 mt-1">
                      <MailIcon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg text-white font-medium mb-1">Email Us</h4>
                      <p className="text-gray-300">info@tawintech.com</p>
                      <p className="text-gray-300">support@tawintech.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item flex items-start space-x-4">
                    <div className="bg-gold/10 rounded-full p-3 mt-1">
                      <PhoneIcon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg text-white font-medium mb-1">Call Us</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                      <p className="text-gray-300">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item flex items-start space-x-4">
                    <div className="bg-gold/10 rounded-full p-3 mt-1">
                      <MapPinIcon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg text-white font-medium mb-1">Visit Us</h4>
                      <p className="text-gray-300">
                        123 Innovation Drive<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, scale: 0.9 },
                      to: { opacity: 1, scale: 1 }
                    }}
                    start="top 75%"
                    end="center 60%"
                    scrub={0.7}
                    className="pt-6"
                  >
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold/30 transition-colors">
                        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold/30 transition-colors">
                        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold/30 transition-colors">
                        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold/30 transition-colors">
                        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </ScrollElement>
                </div>
              </ScrollElement>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for additional effects */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .golden-gradient {
          background-size: 200% auto;
          animation: shine 8s linear infinite;
        }
        
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </PremiumSection>
  );
}