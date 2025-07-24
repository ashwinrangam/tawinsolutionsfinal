import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayer {
  image: string;
  speed: number;
  opacity: number;
  zIndex: number;
}

interface ParallaxBackgroundProps {
  layers: ParallaxLayer[];
  className?: string;
}

// Helper component to avoid React Hook rules violation
const ParallaxLayer = ({ layer, scrollY }: { layer: ParallaxLayer; scrollY: ReturnType<typeof useScroll>['scrollY'] }) => {
  const y = useTransform(scrollY, [0, 3000], [0, 500 * layer.speed]);
  
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ 
        y,
        zIndex: layer.zIndex,
        backgroundImage: `url(${layer.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: layer.opacity,
      }}
    />
  );
};

export function ParallaxBackground({ layers, className = "" }: ParallaxBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Only enable parallax on client-side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`fixed inset-0 -z-10 ${className}`} />;
  }
  
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {layers.map((layer, index) => (
        <ParallaxLayer key={index} layer={layer} scrollY={scrollY} />
      ))}
      
      {/* Additional overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-0"></div>
    </div>
  );
}

// Particle field that moves in parallax
interface ParticleFieldProps {
  count?: number;
  depth?: number;
  color?: string;
}

// Individual particle component to follow React Hooks rules
interface ParticleProps {
  particle: {
    id: number;
    size: number;
    x: number;
    y: number;
    opacity: number;
    speed: number;
    depthLevel: number;
  };
  color: string;
  scrollY: any;
}

const Particle: React.FC<ParticleProps> = ({ particle, color, scrollY }) => {
  const y = useTransform(scrollY, [0, 3000], [0, 1000 * particle.speed]);
  
  return (
    <motion.div
      key={particle.id}
      className="absolute rounded-full"
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: color,
        opacity: particle.opacity,
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        y,
        zIndex: -10 + particle.depthLevel,
      }}
    />
  );
};

export function ParticleField({ 
  count = 100, 
  depth = 3, 
  color = "rgba(212, 175, 55, 0.2)" 
}: ParticleFieldProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  // Generate particles with different sizes and positions
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const depthLevel = Math.floor(Math.random() * depth) + 1;
      const opacity = Math.random() * 0.5 + 0.1;
      const speed = (1 / depthLevel) * 0.3; // Deeper particles move slower
      
      return {
        id: i,
        size,
        x: Math.random() * 100, // % position
        y: Math.random() * 150, // % position (extended to allow more particles to come into view)
        opacity,
        speed,
        depthLevel
      };
    });
  }, [count, depth]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <Particle 
          key={particle.id} 
          particle={particle} 
          color={color} 
          scrollY={scrollY} 
        />
      ))}
    </div>
  );
}

// Section parallax effect that activates based on scroll position
interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = "" 
}: ParallaxSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200 * speed]);

  return (
    <motion.div 
      style={{ y }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}