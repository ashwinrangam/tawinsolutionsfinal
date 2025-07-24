import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PremiumSection, ScrollElement, ParallaxLayer, usePremiumScroll } from "../ui/PremiumScrollProvider";
import SplitText from "../../utils/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function PremiumAboutSection() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { createScrollTrigger } = usePremiumScroll();

  // Initialize premium animations
  useEffect(() => {
    if (mainRef.current) {
      // Ensure a clean setup
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id?.includes("about")) {
          trigger.kill();
        }
      });

      // Golden gradient animation
      gsap.to(".golden-gradient", {
        backgroundPosition: "200% center",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Timeline animation sequence
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll(".timeline-item");
        
        gsap.fromTo(timelineItems, 
          { 
            scale: 0.8, 
            opacity: 0 
          },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Main heading reveal animation
      if (headingRef.current) {
        const headingLines = headingRef.current.querySelectorAll(".heading-line");
        
        gsap.fromTo(headingLines, 
          {
            opacity: 0,
            y: 100,
            rotationX: -30,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    }
  }, [createScrollTrigger]);

  // Timeline narrative points
  const timelinePoints = [
    { year: '2024', label: 'Founded', description: 'TAWIN was born at the inflection point of the AI revolution' },
    { year: '2024', label: 'First Client', description: 'Partnered with leading enterprise to deploy neural architecture' },
    { year: '2025', label: 'Expansion', description: 'Growing our team of visionary engineers and AI specialists' },
  ];

  return (
    <PremiumSection
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-black py-24"
    >
      <div ref={mainRef} className="w-full h-full">
        {/* Floating particles with premium rendering */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, index) => (
            <ScrollElement
              key={`particle-${index}`}
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
                  opacity: [0, 0.7, 0],
                  scale: 0.8,
                }
              }}
              start="top bottom"
              end="bottom top"
              scrub={1}
              style={{
                position: 'absolute',
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                backgroundColor: 'rgba(212, 175, 55, 0.6)',
                borderRadius: '50%',
                filter: 'blur(2px)'
              }}
            >
              <div className="w-full h-full" />
            </ScrollElement>
          ))}
        </div>

        {/* Premium grid background */}
        <ScrollElement
          className="absolute inset-0 pointer-events-none"
          animation={{
            from: { opacity: 0 },
            to: { opacity: 0.15 }
          }}
          start="top 90%"
          end="top 30%"
          scrub={1}
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: 'center'
          }}
        />

        {/* Premium layered parallax background */}
        <ParallaxLayer 
          className="absolute inset-0 z-0" 
          speed={0.2}
        >
          <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full bg-gold/5 filter blur-[100px]" />
          <div className="absolute bottom-[30%] right-[20%] w-[350px] h-[350px] rounded-full bg-gold/5 filter blur-[100px]" />
        </ParallaxLayer>

        <ParallaxLayer 
          className="absolute inset-0 z-0" 
          speed={0.1}
          direction="horizontal"
        >
          <div className="absolute top-[45%] left-[35%] w-[300px] h-[300px] rounded-full bg-gold/3 filter blur-[120px]" />
          <div className="absolute top-[60%] right-[5%] w-[250px] h-[250px] rounded-full bg-gold/3 filter blur-[80px]" />
        </ParallaxLayer>

        <div className="container relative z-10 mx-auto px-4">
          {/* Hero Section with premium animations */}
          <div className="pt-24 pb-40 flex flex-col items-center justify-center text-center">
            <ScrollElement
              animation={{
                from: { opacity: 0, scale: 0.9 },
                to: { opacity: 1, scale: 1 }
              }}
              start="top 80%"
              end="top 30%"
              scrub={0.5}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-gold/10 backdrop-blur-sm text-sm uppercase text-gold tracking-widest mb-4 transform-gpu">
                OUR VISION
              </span>
            </ScrollElement>

            <div ref={headingRef} className="overflow-hidden">
              <h2 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mb-6">
                <span className="heading-line block text-white">BORN IN THE AI ERA</span>
                <span className="heading-line block golden-gradient bg-gradient-to-r from-gold via-amber-400 to-gold bg-[length:200%_auto] text-transparent bg-clip-text">
                  THE NEXT GENERATION
                </span>
              </h2>
            </div>

            <ScrollElement
              animation={{
                from: { opacity: 0, y: 50 },
                to: { opacity: 1, y: 0 }
              }}
              start="top 70%"
              end="top 50%"
              scrub={0.5}
            >
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mt-6 font-light leading-relaxed">
                "We founded TAWIN in the era of new innovations to solve what legacy providers can't. 
                While others maintain outdated systems, we build tomorrow's infrastructure."
              </p>
            </ScrollElement>

            <ScrollElement
              animation={{
                from: { opacity: 0, y: 30 },
                to: { opacity: 1, y: 0 }
              }}
              start="top 50%"
              end="center 50%"
              scrub={0.5}
              className="mt-16"
            >
              <div className="flex flex-col items-center">
                <p className="text-gold/80 text-sm mb-2">Scroll to explore our story</p>
                <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex items-start justify-center p-1">
                  <div 
                    className="w-2 h-2 bg-gold rounded-full"
                    style={{ 
                      animation: 'scrollIndicator 1.5s infinite',
                    }}
                  />
                </div>
              </div>
              
              <style jsx>{`
                @keyframes scrollIndicator {
                  0% { transform: translateY(0); }
                  50% { transform: translateY(4px); }
                  100% { transform: translateY(0); }
                }
              `}</style>
            </ScrollElement>
          </div>

          {/* "SHAPING TOMORROW, TODAY" premium reveal */}
          <ScrollElement
            className="py-20 mb-32"
            animation={{
              from: { opacity: 0 },
              to: { opacity: 1 }
            }}
            start="top 80%"
            end="center 80%"
            scrub={1}
          >
            <div className="relative py-10">
              <ScrollElement
                className="absolute inset-0 rounded-full blur-[100px] bg-gold/5 z-0"
                animation={{
                  from: { opacity: 0, scale: 0.9 },
                  to: { opacity: 0.3, scale: 1.1 }
                }}
                start="top 90%"
                end="center 70%"
                scrub={true}
              />
              
              <ScrollElement
                animation={{
                  from: { 
                    opacity: 0,
                    y: 50,
                    rotationX: -20,
                    filter: "blur(4px)"
                  },
                  to: { 
                    opacity: 1, 
                    y: 0, 
                    rotationX: 0,
                    filter: "blur(0px)" 
                  }
                }}
                start="top 80%"
                end="top 30%"
                scrub={0.5}
              >
                <h2 className="text-3xl md:text-6xl font-playfair font-bold text-center mb-8 relative z-10 golden-gradient bg-gradient-to-r from-gold via-white to-gold text-transparent bg-clip-text bg-[length:200%_auto]">
                  SHAPING TOMORROW, TODAY
                </h2>
              </ScrollElement>

              <ScrollElement
                animation={{
                  from: { scaleX: 0, opacity: 0 },
                  to: { scaleX: 1, opacity: 0.6 }
                }}
                start="top 70%"
                end="center 70%"
                scrub={true}
                style={{ transformOrigin: "left center" }}
                className="h-[2px] w-full max-w-xl mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>
          </ScrollElement>

          {/* Our Story section with premium animations */}
          <div className="mb-32 relative">
            <ScrollElement
              animation={{
                from: { opacity: 0 },
                to: { opacity: 1 }
              }}
              start="top 80%"
              end="center 80%"
              scrub={0.7}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                <div className="space-y-8">
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, x: -50 },
                      to: { opacity: 1, x: 0 }
                    }}
                    start="top 80%"
                    end="top 50%"
                    scrub={0.5}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-gold mb-6 relative inline-block">
                      Our Story
                      <ScrollElement
                        className="absolute left-0 -bottom-2 h-[3px] w-full bg-gold/40"
                        animation={{
                          from: { scaleX: 0, transformOrigin: "left" },
                          to: { scaleX: 1, transformOrigin: "left" }
                        }}
                        start="top 75%"
                        end="top 55%"
                        scrub={0.3}
                      />
                    </h3>
                  </ScrollElement>
                  
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, y: 30 },
                      to: { opacity: 1, y: 0 }
                    }}
                    start="top 75%"
                    end="top 45%"
                    scrub={0.5}
                  >
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                      TAWIN was born in 2024 at the inflection point of the AI revolution. From day one, 
                      we set out to challenge legacy providers by building cloud and AI systems that learn, 
                      heal, and scale on their own.
                    </p>
                  </ScrollElement>
                  
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, y: 30 },
                      to: { opacity: 1, y: 0 }
                    }}
                    start="top 70%"
                    end="top 40%"
                    scrub={0.5}
                  >
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                      Our team of engineers and visionaries moves at startup speed, yet delivers 
                      enterprise‑grade security and reliability. In just months, we've partnered with 
                      leading firms to deploy quantum‑safe encryption, neural cloud architectures, and 
                      edge frameworks that drive real business impact.
                    </p>
                  </ScrollElement>
                  
                  {/* Premium timeline visualization */}
                  <div ref={timelineRef} className="mt-12 pt-10 relative">
                    <ScrollElement
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ 
                        background: "linear-gradient(90deg, rgba(212, 175, 55, 0.7), rgba(212, 175, 55, 0.2))",
                        transformOrigin: "left"
                      }}
                      animation={{
                        from: { scaleX: 0 },
                        to: { scaleX: 1 }
                      }}
                      start="top 65%"
                      end="top 45%"
                      scrub={0.3}
                    />
                    
                    <div className="flex justify-between mt-4">
                      {timelinePoints.map((point, index) => (
                        <div 
                          key={index} 
                          className="timeline-item text-center relative px-2"
                        >
                          <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold" />
                          <p className="font-bold text-gold text-lg">{point.year}</p>
                          <p className="text-white font-medium mt-1">{point.label}</p>
                          <p className="text-gray-400 max-w-[120px] mx-auto mt-2 text-sm">
                            {point.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <ScrollElement
                  animation={{
                    from: { opacity: 0, x: 50, rotationY: 15 },
                    to: { opacity: 1, x: 0, rotationY: 0 }
                  }}
                  start="top 80%"
                  end="center 60%"
                  scrub={0.5}
                  className="perspective-1000"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-lg shadow-gold/10 transform-gpu">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-60" />
                    
                    <img 
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Modern Tech Workspace" 
                      className="w-full h-full object-cover"
                    />
                    
                    <ScrollElement
                      animation={{
                        from: { opacity: 0, y: 20 },
                        to: { opacity: 1, y: 0 }
                      }}
                      start="top 70%"
                      end="top 40%"
                      scrub={0.7}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-black/70 backdrop-blur-md px-8 py-6 rounded-lg transform-gpu">
                        <p className="text-white font-bold text-2xl">Innovative Workspace</p>
                        <p className="text-gold text-md mt-1">Where Tomorrow's Solutions Are Born</p>
                      </div>
                    </ScrollElement>
                  </div>
                </ScrollElement>
              </div>
            </ScrollElement>
          </div>

          {/* Our Mission with premium scroll animations */}
          <div className="mb-32 relative">
            <ScrollElement
              animation={{
                from: { opacity: 0 },
                to: { opacity: 1 }
              }}
              start="top 80%"
              end="center 80%"
              scrub={0.7}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                <ScrollElement
                  animation={{
                    from: { opacity: 0, x: -30, rotationY: -15 },
                    to: { opacity: 1, x: 0, rotationY: 0 }
                  }}
                  start="top 80%"
                  end="center 60%"
                  scrub={0.5}
                  className="perspective-1000 order-2 md:order-1"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-lg shadow-gold/10 transform-gpu">
                    <ScrollElement
                      animation={{
                        from: { opacity: 0.3 },
                        to: { opacity: 0.7 }
                      }}
                      start="top 70%"
                      end="center 50%"
                      scrub={true}
                      className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent"
                    />
                    
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Abstract Tech Visualization" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </ScrollElement>

                <div className="space-y-8 order-1 md:order-2">
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, x: 50 },
                      to: { opacity: 1, x: 0 }
                    }}
                    start="top 80%"
                    end="top 50%"
                    scrub={0.5}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-gold mb-6 relative inline-block">
                      Our Mission
                      <ScrollElement
                        className="absolute left-0 -bottom-2 h-[3px] w-full bg-gold/40"
                        animation={{
                          from: { scaleX: 0, transformOrigin: "left" },
                          to: { scaleX: 1, transformOrigin: "left" }
                        }}
                        start="top 75%"
                        end="top 55%"
                        scrub={0.3}
                      />
                    </h3>
                  </ScrollElement>
                  
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, y: 30 },
                      to: { opacity: 1, y: 0 }
                    }}
                    start="top 75%"
                    end="top 45%"
                    scrub={0.5}
                  >
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                      Our mission is simple: solve tomorrow's challenges today. We design and deliver 
                      adaptive, self‑healing platforms that blend quantum‑ready encryption, multi‑agent 
                      AI orchestration, and sub‑millisecond edge computing.
                    </p>
                  </ScrollElement>
                  
                  <ScrollElement
                    animation={{
                      from: { opacity: 0, y: 30 },
                      to: { opacity: 1, y: 0 }
                    }}
                    start="top 70%"
                    end="top 40%"
                    scrub={0.5}
                  >
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                      Every solution we build empowers clients to innovate faster, stay secure against 
                      emerging threats, and unlock new opportunities at the edge of technology.
                    </p>
                  </ScrollElement>
                  
                  {/* Mission highlight points with staggered reveal */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { icon: "🚀", text: "Accelerate Innovation" },
                      { icon: "🔒", text: "Quantum-Safe Security" },
                      { icon: "🔄", text: "Self-Healing Systems" },
                      { icon: "🌐", text: "Edge Computing" }
                    ].map((item, index) => (
                      <ScrollElement
                        key={index}
                        animation={{
                          from: { opacity: 0, y: 20, scale: 0.9 },
                          to: { opacity: 1, y: 0, scale: 1 }
                        }}
                        start="top 65%"
                        end="top 45%"
                        scrub={0.5}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        className="flex items-center space-x-3 bg-gold/5 backdrop-blur-sm p-4 rounded-lg border border-gold/10 transform-gpu"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-gold font-medium">{item.text}</span>
                      </ScrollElement>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollElement>
          </div>
          
          {/* Final quote with premium reveal animations */}
          <ScrollElement
            className="max-w-4xl mx-auto text-center mb-16 relative py-20"
            animation={{
              from: { opacity: 0 },
              to: { opacity: 1 }
            }}
            start="top 80%"
            end="center 70%"
            scrub={0.7}
          >
            <ScrollElement
              className="absolute inset-x-0 top-0 bottom-0 rounded-3xl -z-10"
              animation={{
                from: { opacity: 0, scale: 0.95 },
                to: { opacity: 0.2, scale: 1 }
              }}
              start="top 80%"
              end="center 60%"
              scrub={0.5}
              style={{
                background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 70%)",
              }}
            />
            
            <ScrollElement
              animation={{
                from: { opacity: 0, y: 30, scale: 0.9 },
                to: { opacity: 1, y: 0, scale: 1 }
              }}
              start="top 80%"
              end="center 70%"
              scrub={0.5}
            >
              <span className="text-7xl text-gold/20 font-serif leading-none block mb-4">"</span>
              <p className="text-2xl md:text-3xl text-white font-light leading-relaxed px-4">
                At TAWIN, we don't just adapt to technological change—we create it. 
                Our mission is to harness emerging technologies to solve tomorrow's challenges, today.
              </p>
              <span className="text-7xl text-gold/20 font-serif leading-none block mt-4">"</span>
              
              <ScrollElement
                className="h-[1px] w-1/3 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-8"
                animation={{
                  from: { scaleX: 0 },
                  to: { scaleX: 1 }
                }}
                start="top 70%"
                end="center 60%"
                scrub={0.3}
              />
            </ScrollElement>
          </ScrollElement>
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