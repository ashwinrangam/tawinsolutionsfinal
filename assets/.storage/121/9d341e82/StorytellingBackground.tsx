import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StorytellingBackgroundProps {
  className?: string;
  intensity?: number;
  color?: string;
  children?: React.ReactNode;
  variant?: "wave" | "grid" | "particles" | "lines";
  section?: "about" | "contact";
}

// Wave pattern component
const WaveBackground: React.FC<{ 
  intensity: number, 
  baseColor: string, 
  scrollY: ReturnType<typeof useScroll>['scrollY'] 
}> = ({ intensity, baseColor, scrollY }) => {
  const translateY = useTransform(scrollY, [0, 1000], [0, -200 * intensity]);
  const bgColor = `rgba(${baseColor}, ${0.03 * intensity})`;
  
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-25" 
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path 
        d="M -100 300 Q 150 250, 400 300 T 900 300 V 800 H -100 Z" 
        fill={bgColor}
        initial={{ y: 100 }}
        style={{ 
          y: translateY,
          filter: "blur(30px)"
        }}
      />
      <motion.path 
        d="M -100 400 Q 100 350, 400 400 T 900 400 V 800 H -100 Z" 
        fill={bgColor}
        initial={{ y: 50 }}
        style={{ 
          y: useTransform(scrollY, [0, 1000], [50, -150 * intensity]),
          filter: "blur(20px)"
        }}
      />
    </svg>
  );
};

// Grid pattern component
const GridBackground: React.FC<{ 
  intensity: number, 
  baseColor: string, 
  scrollY: ReturnType<typeof useScroll>['scrollY'] 
}> = ({ intensity, baseColor, scrollY }) => {
  const translateY = useTransform(scrollY, [0, 1000], [0, -150 * intensity]);
  const opacity = useTransform(scrollY, [0, 300, 600], [0.2, 0.6, 0.2]);
  
  return (
    <motion.div
      className="absolute inset-0"
      style={{ 
        backgroundImage: `linear-gradient(rgba(${baseColor}, 0.07) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(${baseColor}, 0.07) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        y: translateY,
        opacity
      }}
    />
  );
};

// Particle pattern component
const ParticleBackground: React.FC<{ 
  intensity: number, 
  baseColor: string, 
  scrollY: ReturnType<typeof useScroll>['scrollY'],
  mousePosition: { x: number, y: number }
}> = ({ intensity, baseColor, scrollY, mousePosition }) => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const speed = (Math.random() + 0.5) * intensity;
        
        return (
          <ParticleElement 
            key={i}
            size={size}
            initialX={initialX}
            initialY={initialY}
            speed={speed}
            baseColor={baseColor}
            intensity={intensity}
            scrollY={scrollY}
            mousePosition={mousePosition}
          />
        );
      })}
    </>
  );
};

// Individual particle element
const ParticleElement: React.FC<{ 
  size: number, 
  initialX: number, 
  initialY: number, 
  speed: number,
  baseColor: string,
  intensity: number,
  scrollY: ReturnType<typeof useScroll>['scrollY'],
  mousePosition: { x: number, y: number }
}> = ({ size, initialX, initialY, speed, baseColor, intensity, scrollY, mousePosition }) => {
  const y = useTransform(scrollY, [0, 1000], [0, -300 * speed]);
  const x = useTransform(
    { get: () => mousePosition.x },
    [-1, 1], 
    [-10 * speed, 10 * speed]
  );
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        backgroundColor: `rgba(${baseColor}, ${0.3 * intensity})`,
        boxShadow: `0 0 ${size * 3}px rgba(${baseColor}, ${0.3 * intensity})`,
        y,
        x
      }}
    />
  );
};

// Lines pattern component
const LinesBackground: React.FC<{ 
  intensity: number, 
  baseColor: string, 
  scrollY: ReturnType<typeof useScroll>['scrollY'] 
}> = ({ intensity, baseColor, scrollY }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => {
        const width = Math.random() * 2 + 1;
        const initialY = i * 20;
        const speed = (Math.random() + 0.5) * intensity;
        
        return (
          <LineElement 
            key={i}
            width={width}
            initialY={initialY}
            speed={speed}
            baseColor={baseColor}
            intensity={intensity}
            scrollY={scrollY}
          />
        );
      })}
    </div>
  );
};

// Individual line element
const LineElement: React.FC<{ 
  width: number, 
  initialY: number, 
  speed: number,
  baseColor: string,
  intensity: number,
  scrollY: ReturnType<typeof useScroll>['scrollY']
}> = ({ width, initialY, speed, baseColor, intensity, scrollY }) => {
  const y = useTransform(scrollY, [0, 1000], [0, -200 * speed]);
  
  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{
        height: `${width}px`,
        top: `${initialY}%`,
        backgroundImage: `linear-gradient(90deg, rgba(${baseColor}, 0) 0%, rgba(${baseColor}, ${0.3 * intensity}) 50%, rgba(${baseColor}, 0) 100%)`,
        y
      }}
    />
  );
};

export const StorytellingBackground: React.FC<StorytellingBackgroundProps> = ({
  className = "",
  intensity = 0.5,
  color = "rgba(212, 175, 55, 0.1)",
  children,
  variant = "wave",
  section = "about",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 2;
      const y = ((e.clientY - top) / height - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Colors based on section
  const baseColor = section === "about" ? "212, 175, 55" : "100, 200, 255";

  return (
    <div 
      ref={containerRef}
      className={`storytelling-background absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Render background based on variant type */}
      {variant === "wave" && (
        <WaveBackground intensity={intensity} baseColor={baseColor} scrollY={scrollY} />
      )}
      
      {variant === "grid" && (
        <GridBackground intensity={intensity} baseColor={baseColor} scrollY={scrollY} />
      )}
      
      {variant === "particles" && (
        <ParticleBackground 
          intensity={intensity} 
          baseColor={baseColor} 
          scrollY={scrollY} 
          mousePosition={mousePosition} 
        />
      )}
      
      {variant === "lines" && (
        <LinesBackground intensity={intensity} baseColor={baseColor} scrollY={scrollY} />
      )}
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  delay?: number;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = 1,
  className = "",
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 500], [0, 50 * speed]);

  return (
    <motion.div
      ref={ref}
      className={`parallax-text ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

interface FloatingElementProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: string;
  color?: string;
  delay?: number;
  speed?: number;
  blur?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  top,
  left,
  right,
  bottom,
  size = "100px",
  color = "rgba(212, 175, 55, 0.05)",
  delay = 0,
  speed = 1,
  blur = "30px"
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100 * speed]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: top || undefined,
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur})`,
        y,
        scale
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay }}
    />
  );
};