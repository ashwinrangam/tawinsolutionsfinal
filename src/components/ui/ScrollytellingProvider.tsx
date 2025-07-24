import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// Types for the context
interface ScrollytellingContextType {
  registerSection: (id: string, ref: React.RefObject<HTMLElement>) => void;
  unregisterSection: (id: string) => void;
  activeSection: string | null;
  progress: number;
  scrollY: number;
}

// Create the context
const ScrollytellingContext = createContext<ScrollytellingContextType | null>(null);

// Hook for components to consume the context
export const useScrollytelling = () => {
  const context = useContext(ScrollytellingContext);
  if (!context) {
    throw new Error("useScrollytelling must be used within a ScrollytellingProvider");
  }
  return context;
};

// Types for the provider props
interface ScrollytellingProviderProps {
  children: React.ReactNode;
}

export const ScrollytellingProvider: React.FC<ScrollytellingProviderProps> = ({ children }) => {
  const [sections, setSections] = useState<Record<string, React.RefObject<HTMLElement>>>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Register a section to be tracked
  const registerSection = (id: string, ref: React.RefObject<HTMLElement>) => {
    setSections(prev => ({ ...prev, [id]: ref }));
  };

  // Unregister a section
  const unregisterSection = (id: string) => {
    setSections(prev => {
      const newSections = { ...prev };
      delete newSections[id];
      return newSections;
    });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      setScrollY(window.scrollY);

      // Calculate overall scroll progress (0 to 1)
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = window.scrollY / (docHeight - windowHeight);
      setProgress(Math.min(Math.max(scrollPercent, 0), 1));

      // Determine which section is currently in view
      let currentSection: string | null = null;
      Object.entries(sections).forEach(([id, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return (
    <ScrollytellingContext.Provider value={{ 
      registerSection, 
      unregisterSection, 
      activeSection, 
      progress, 
      scrollY 
    }}>
      {children}
    </ScrollytellingContext.Provider>
  );
};

// Scene component for a scrollytelling section
interface SceneProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
  duration?: number;
}

export const Scene: React.FC<SceneProps> = ({ 
  id, 
  children, 
  className = "", 
  pin = false,
  duration = 1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSection, unregisterSection, activeSection, scrollY } = useScrollytelling();
  const isActive = activeSection === id;
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  // Register this section with the provider
  useEffect(() => {
    if (ref.current) {
      registerSection(id, ref);
    }
    return () => unregisterSection(id);
  }, [id, registerSection, unregisterSection]);

  return (
    <div 
      ref={ref} 
      className={`scrolly-scene ${isActive ? 'active' : ''} ${className}`}
      data-scene-id={id}
    >
      {children}
    </div>
  );
};

// Layer component for parallax effects within a scene
interface AnimationProps {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  [key: string]: unknown;
}

interface LayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "vertical" | "horizontal";
  style?: React.CSSProperties;
  initial?: AnimationProps;
  animate?: AnimationProps;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
    [key: string]: unknown;
  };
}

export const Layer: React.FC<LayerProps> = ({ 
  children, 
  speed = 1, 
  className = "", 
  direction = "vertical",
  style = {},
  initial,
  animate,
  transition
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScrollytelling();
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });
  
  // Create parallax effect
  const y = useTransform(
    scrollY, 
    [0, 1000], 
    [0, 200 * speed * (direction === "vertical" ? 1 : 0)]
  );
  
  const x = useTransform(
    scrollY,
    [0, 1000],
    [0, 100 * speed * (direction === "horizontal" ? 1 : 0)]
  );

  return (
    <motion.div
      ref={ref}
      style={{ 
        ...style,
        y: direction === "vertical" ? y : 0,
        x: direction === "horizontal" ? x : 0
      }}
      className={`scrolly-layer ${className}`}
      initial={initial || { opacity: 0 }}
      animate={animate || (isInView ? { opacity: 1 } : { opacity: 0 })}
      transition={transition || { duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

// Progress-based animation component
interface ProgressAnimProps {
  children: React.ReactNode;
  startAt?: number; // 0-1, when to start animation
  endAt?: number; // 0-1, when to end animation
  className?: string;
  style?: React.CSSProperties;
  from?: AnimationProps;
  to?: AnimationProps;
  transition?: {
    ease?: string;
    [key: string]: unknown;
  };
}

export const ProgressAnim: React.FC<ProgressAnimProps> = ({ 
  children, 
  startAt = 0,
  endAt = 1, 
  className = "",
  style = {},
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  transition = { ease: "easeOut" }
}) => {
  const { progress } = useScrollytelling();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px" });
  
  // Calculate local progress for this element
  const elementProgress = Math.min(
    Math.max((progress - startAt) / (endAt - startAt), 0),
    1
  );
  
  // Interpolate animation values based on progress
  const animateValues: Record<string, unknown> = {};
  Object.keys(from).forEach(key => {
    if (typeof from[key] === 'number' && typeof to[key] === 'number') {
      animateValues[key] = (from[key] as number) + ((to[key] as number) - (from[key] as number)) * elementProgress;
    }
  });
  
  return (
    <motion.div
      ref={ref}
      className={`progress-anim ${className}`}
      style={style}
      animate={isInView ? animateValues : from}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

// Narrative section with scroll-triggered content
interface NarrativeSectionProps {
  children: React.ReactNode;
  className?: string;
  id: string;
}

export const NarrativeSection: React.FC<NarrativeSectionProps> = ({ 
  children, 
  className = "",
  id 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSection, unregisterSection } = useScrollytelling();
  const isInView = useInView(ref, { margin: "-40% 0px" });
  
  // Register this section with the provider
  useEffect(() => {
    if (ref.current) {
      registerSection(id, ref as React.RefObject<HTMLElement>);
    }
    return () => unregisterSection(id);
  }, [id, registerSection, unregisterSection]);
  
  return (
    <div 
      ref={ref}
      className={`narrative-section ${className}`}
      id={id}
    >
      {children}
    </div>
  );
};