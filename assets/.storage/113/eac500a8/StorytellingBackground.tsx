import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface StorytellingBackgroundProps {
  className?: string;
  intensity?: number;
  color?: string;
  children?: React.ReactNode;
  variant?: "wave" | "grid" | "particles" | "lines";
  section?: "about" | "contact";
}

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

  // Scrolling transforms
  const translateY = useTransform(scrollY, [0, 1000], [0, -200 * intensity]);
  const scale = useTransform(scrollY, [0, 500], [1, 1 + 0.1 * intensity]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 15 * intensity]);
  const opacity = useTransform(scrollY, [0, 300, 600], [0.2, 0.6, 0.2]);

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

  // Calculate variants based on section and variant type
  const renderBackground = () => {
    // Colors based on section
    const baseColor = section === "about" ? "212, 175, 55" : "100, 200, 255";
    const bgColor = `rgba(${baseColor}, ${0.03 * intensity})`;
    
    // Generate wave pattern
    if (variant === "wave") {
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
    }
    
    // Generate grid pattern
    if (variant === "grid") {
      return (
        <motion.div
          className="absolute inset-0"
          style={{ 
            backgroundImage: `linear-gradient(rgba(${baseColor}, 0.07) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(${baseColor}, 0.07) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            y: translateY,
            opacity: opacity
          }}
        />
      );
    }
    
    // Generate particle pattern
    if (variant === "particles") {
      return Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const speed = (Math.random() + 0.5) * intensity;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              backgroundColor: `rgba(${baseColor}, ${0.3 * intensity})`,
              boxShadow: `0 0 ${size * 3}px rgba(${baseColor}, ${0.3 * intensity})`,
              y: useTransform(scrollY, [0, 1000], [0, -300 * speed]),
              x: useTransform(mousePosition.x, [-1, 1], [-10 * speed, 10 * speed])
            }}
          />
        );
      });
    }
    
    // Generate lines pattern
    if (variant === "lines") {
      return (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => {
            const width = Math.random() * 2 + 1;
            const initialY = i * 20;
            const speed = (Math.random() + 0.5) * intensity;
            
            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  height: `${width}px`,
                  top: `${initialY}%`,
                  backgroundImage: `linear-gradient(90deg, rgba(${baseColor}, 0) 0%, rgba(${baseColor}, ${0.3 * intensity}) 50%, rgba(${baseColor}, 0) 100%)`,
                  y: useTransform(scrollY, [0, 1000], [0, -200 * speed])
                }}
              />
            );
          })}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div 
      ref={containerRef}
      className={`storytelling-background absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {renderBackground()}
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
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={`parallax-text ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      style={{ y: springY }}
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