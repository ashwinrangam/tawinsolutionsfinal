import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Types for the context
interface ScrollContextType {
  registerSection: (id: string, element: HTMLElement) => void;
  unregisterSection: (id: string) => void;
  scrollProgress: number;
  activeSection: string | null;
  createScrollTrigger: (
    trigger: string | HTMLElement,
    config: ScrollTriggerConfig
  ) => ScrollTrigger;
}

// ScrollTrigger configuration
interface ScrollTriggerConfig {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  pin?: boolean;
  pinSpacing?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  animation?: gsap.core.Timeline | gsap.core.Tween;
  toggleClass?: string | { targets: string | Element | Element[], className: string };
  id?: string;
  [key: string]: unknown;
}

// Create the context
const ScrollContext = createContext<ScrollContextType | null>(null);

// Hook for consuming the context
export const usePremiumScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("usePremiumScroll must be used within a PremiumScrollProvider");
  }
  return context;
};

// Component props
interface PremiumScrollProviderProps {
  children: React.ReactNode;
  smoothScroll?: boolean;
}

export const PremiumScrollProvider: React.FC<PremiumScrollProviderProps> = ({ 
  children, 
  smoothScroll = true 
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef<Record<string, HTMLElement>>({});
  const triggersRef = useRef<Record<string, ScrollTrigger>>({});

  // Initialize smooth scrolling if enabled
  useEffect(() => {
    // Clean up all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      Object.values(triggersRef.current).forEach(trigger => {
        if (trigger && typeof trigger.kill === 'function') {
          trigger.kill();
        }
      });
    };
  }, []);

  // Track overall scroll progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      
      setScrollProgress(progress);
    };

    // Initial calculation
    updateProgress();

    // Set up ScrollTrigger for global progress tracking
    const progressTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      progressTrigger.kill();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Register a section to be tracked
  const registerSection = (id: string, element: HTMLElement) => {
    sectionsRef.current[id] = element;
    
    // Create a ScrollTrigger for this section
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setActiveSection(id),
      onEnterBack: () => setActiveSection(id),
      id: `section-${id}`
    });
    
    triggersRef.current[id] = trigger;
  };

  // Unregister a section
  const unregisterSection = (id: string) => {
    delete sectionsRef.current[id];
    
    // Kill and remove the ScrollTrigger for this section
    if (triggersRef.current[id]) {
      triggersRef.current[id].kill();
      delete triggersRef.current[id];
    }
  };

  // Create a ScrollTrigger for animation
  const createScrollTrigger = (
    trigger: string | HTMLElement, 
    config: ScrollTriggerConfig
  ): ScrollTrigger => {
    const triggerInstance = ScrollTrigger.create({
      trigger,
      ...config,
      // Ensure it's properly killed on cleanup
      onRefresh: (self) => {
        config.onRefresh?.(self);
      }
    });
    
    if (config.id) {
      triggersRef.current[config.id] = triggerInstance;
    }
    
    return triggerInstance;
  };

  return (
    <ScrollContext.Provider value={{
      registerSection,
      unregisterSection,
      scrollProgress,
      activeSection,
      createScrollTrigger
    }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Premium Scroll Section component
interface ScrollSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  style?: React.CSSProperties;
  pin?: boolean;
  pinSpacing?: boolean;
  startPosition?: string;
  endPosition?: string;
  markers?: boolean;
}

export const PremiumSection: React.FC<ScrollSectionProps> = ({
  children,
  id,
  className = "",
  style = {},
  pin = false,
  pinSpacing = true,
  startPosition = "top 20%",
  endPosition = "bottom 20%",
  markers = false
}) => {
  const { registerSection, unregisterSection, activeSection } = usePremiumScroll();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Register this section with the context
  useEffect(() => {
    if (sectionRef.current) {
      registerSection(id, sectionRef.current);

      // Configure pinning if needed
      if (pin) {
        const pinConfig = {
          trigger: sectionRef.current,
          start: startPosition,
          end: endPosition,
          pin: true,
          pinSpacing,
          markers,
          id: `pin-${id}`
        };

        const pinTrigger = ScrollTrigger.create(pinConfig);
        
        return () => {
          pinTrigger.kill();
          unregisterSection(id);
        };
      }
    }
    
    return () => unregisterSection(id);
  }, [id, pin, pinSpacing, registerSection, unregisterSection, startPosition, endPosition, markers]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`premium-section ${activeSection === id ? 'active' : ''} ${className}`}
      style={{
        position: 'relative',
        ...style
      }}
    >
      {children}
    </section>
  );
};

// ScrollElement for animating elements based on scroll position
interface ScrollElementProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation: {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
  };
  trigger?: string | HTMLElement | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  id?: string;
  immediateRender?: boolean;
  refreshPriority?: number;
  toggleActions?: string;
  fastScrollEnd?: boolean;
}

export const ScrollElement: React.FC<ScrollElementProps> = ({
  children,
  className = "",
  style = {},
  animation,
  trigger = null,
  start = "top 80%",
  end = "bottom 20%",
  scrub = true,
  markers = false,
  id,
  immediateRender = false,
  refreshPriority = 0,
  toggleActions = "play none none none",
  fastScrollEnd = true
}) => {
  const { createScrollTrigger } = usePremiumScroll();
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (elementRef.current) {
      // Set initial state
      gsap.set(elementRef.current, animation.from);

      // Create the animation
      const tween = gsap.to(elementRef.current, {
        ...animation.to,
        paused: true,
        ease: "power2.out",
        immediateRender,
        overwrite: "auto"
      });

      // Create ScrollTrigger that controls the animation
      const actualTrigger = trigger || elementRef.current;
      const scrollTrigger = createScrollTrigger(actualTrigger, {
        start,
        end,
        scrub,
        markers,
        animation: tween,
        refreshPriority,
        id: id || undefined,
        toggleActions,
        fastScrollEnd
      });

      return () => {
        tween.kill();
        scrollTrigger.kill();
      };
    }
  }, [animation, trigger, start, end, scrub, markers, id, immediateRender, refreshPriority, toggleActions, fastScrollEnd, createScrollTrigger]);

  return (
    <div
      ref={elementRef}
      className={`premium-scroll-element ${className}`}
      style={{
        willChange: "transform, opacity",
        ...style
      }}
    >
      {children}
    </div>
  );
};

// HorizontalScrollSection for creating horizontal scroll sections
interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id: string;
  duration?: number;
  pin?: boolean;
  markers?: boolean;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  children,
  className = "",
  style = {},
  id,
  duration = 1,
  pin = true,
  markers = false
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      // Make sure the section is high enough to allow scrolling for the duration
      const contentWidth = contentRef.current.scrollWidth;
      const containerWidth = contentRef.current.offsetWidth;
      
      // Create horizontal scroll animation
      gsap.to(contentRef.current, {
        x: () => -(contentWidth - containerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${contentWidth}`,
          scrub: true,
          pin: pin,
          anticipatePin: 1,
          markers: markers,
          invalidateOnRefresh: true,
        }
      });
    }
  }, [pin, duration, markers]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`horizontal-scroll-section ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      <div
        ref={contentRef}
        className="horizontal-scroll-content"
        style={{
          display: 'flex',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ParallaxLayer for Apple-style parallax effects
interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  trigger?: string | HTMLElement | null;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className = "",
  style = {},
  speed = 0.5,
  direction = 'vertical',
  trigger = null
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (layerRef.current) {
      const element = layerRef.current;
      const triggerElement = trigger || element.parentElement || document.body;
      
      let yMove = 0;
      let xMove = 0;
      
      if (direction === 'vertical' || direction === 'both') {
        yMove = 100 * speed;
      }
      
      if (direction === 'horizontal' || direction === 'both') {
        xMove = 100 * speed;
      }
      
      // Create parallax animation
      gsap.fromTo(
        element,
        {
          y: -yMove / 2,
          x: -xMove / 2,
        },
        {
          y: yMove / 2,
          x: xMove / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, [speed, direction, trigger]);

  return (
    <div
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
};