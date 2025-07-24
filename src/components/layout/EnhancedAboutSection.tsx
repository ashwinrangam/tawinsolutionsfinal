import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ParallaxSection } from "../ui/ParallaxBackground";

export default function EnhancedAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for animations
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Enhanced viewport tracking with margins
  const isTitleInView = useInView(titleRef, { once: false, margin: "-30% 0px" });
  const isStoryInView = useInView(storyRef, { once: false, margin: "-30% 0px" });
  const isMissionInView = useInView(missionRef, { once: false, margin: "-30% 0px" });
  
  // Parallax scroll effects
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Transform values for parallax elements
  const bgY1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const bgY3 = useTransform(scrollY, [0, 1000], [0, -200]);
  const contentY = useTransform(scrollY, [0, 1000], [100, -50]);
  
  // Parallax for quote and CEO image
  const quoteY = useTransform(scrollY, [0, 1000], [0, -60]);
  const ceoY = useTransform(scrollY, [0, 1000], [0, 40]);
  
  // Timeline narrative points
  const timelinePoints = [
    { year: '2024', label: 'Founded', description: 'TAWIN was born at the inflection point of the AI revolution' },
    { year: '2024', label: 'First Client', description: 'Partnered with leading enterprise to deploy neural architecture' },
    { year: '2025', label: 'Expansion', description: 'Growing our team of visionary engineers and AI specialists' },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-black to-background/95">
      {/* Scroll indicator */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gold via-amber-400 to-gold z-50"
        style={{ 
          width: `${Math.min((scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`,
          opacity: 0.8
        }}
      />
      
      {/* Dynamic animated background with enhanced parallax */}
      <motion.div 
        style={{ y: bgY1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black opacity-90"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          backgroundSize: ["100% 100%", "120% 120%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Flowing gradient background with enhanced animations */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        {/* Top left golden orb */}
        <motion.div 
          className="absolute -inset-[100px] rounded-full blur-3xl"
          style={{ 
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)",
            top: "30%",
            left: "20%",
          }}
          animate={{ 
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Bottom right golden orb */}
        <motion.div 
          className="absolute -inset-[100px] rounded-full blur-3xl"
          style={{ 
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, transparent 70%)",
            top: "60%",
            right: "10%",
          }}
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4] 
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Central animated light beam */}
        <motion.div 
          className="absolute h-full w-[200px] blur-3xl left-1/2 -translate-x-1/2"
          style={{ 
            background: "linear-gradient(to bottom, rgba(212, 175, 55, 0), rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0))",
          }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            width: ["200px", "300px", "200px"],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
      
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div 
          key={index}
          className="absolute rounded-full bg-gold/30"
          style={{ 
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(1px)"
          }}
          animate={{ 
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        />
      ))}
      
      {/* Animated grid lines with enhanced visibility */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          y: bgY3
        }}
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          backgroundSize: ['60px 60px', '65px 65px', '60px 60px']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Main content with enhanced parallax effects */}
      <motion.div 
        style={{ y: contentY }}
        className="container relative z-10 mx-auto px-4"
      >
        {/* Vision Section with enhanced animations */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, type: 'spring', damping: 18, stiffness: 120 }}
          className="text-center max-w-3xl mx-auto mb-8 space-y-8 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isTitleInView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
            transition={{ type: 'spring', damping: 16, stiffness: 140 }}
          >
            <motion.h2 
              className="text-sm uppercase text-gold tracking-widest mb-4 relative inline-block"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 140 }}
            >
              OUR VISION
              <motion.div 
                className="absolute -inset-x-8 -inset-y-2 bg-gold/5 -z-10 rounded-full blur-md"
                animate={{ 
                  scale: [1, 1.05, 1], 
                  opacity: [0.5, 0.8, 0.5] 
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.h2>
          </motion.div>
          
          <motion.h3 
            className="text-4xl md:text-6xl font-playfair font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.2 }}
          >
            <AnimatePresence>
              {isTitleInView && (
                <motion.span 
                  className="block text-white overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 0.25 }}
                >
                  BORN IN THE AI ERA
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isTitleInView && (
                <motion.span 
                  className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-400 to-gold overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 0.45 }}
                >
                  THE NEXT GENERATION OF TECH CONSULTING
                </motion.span>
              )}
            </AnimatePresence>
          </motion.h3>
          
          <AnimatePresence>
            {isTitleInView && (
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto italic"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.7 }}
              >
                "We founded TAWIN in the era of new innovations to solve what legacy providers can't. 
                While others maintain outdated systems, we build tomorrow's infrastructure."
              </motion.p>
            )}
          </AnimatePresence>
         {/* Scroll indicator at the bottom of vision section, relative */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 2, delay: 1.5 }}
           className="relative flex flex-col items-center mt-2"
         >
           <p className="text-gold/70 text-sm mb-2">Scroll to explore our story</p>
           <motion.div 
             className="w-6 h-10 border-2 border-gold/30 rounded-full flex items-start justify-center p-1"
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
           >
             <motion.div 
               className="w-2 h-2 bg-gold/70 rounded-full"
               animate={{ y: [0, 4, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             />
           </motion.div>
         </motion.div>
        </motion.div>

        {/* "SHAPING TOMORROW, TODAY" section with advanced animations */}
        <div className="py-16 mb-32 overflow-hidden">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-20% 0px" }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full blur-[100px] bg-gold/10 z-0"
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.1, 0.2, 0.1] 
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.h2 
              className="text-3xl md:text-5xl font-playfair font-bold text-center mb-8 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20% 0px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold relative"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                style={{ 
                  backgroundSize: "200% 100%" 
                }}
              >
                SHAPING TOMORROW, TODAY
              </motion.span>
              
              {/* Animated accent behind text */}
              <motion.div 
                className="absolute -inset-x-16 top-1/2 -translate-y-1/2 h-[2px]"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-20% 0px" }}
                transition={{ duration: 1.2, delay: 0.4 }}
                style={{ 
                  background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)",
                  transformOrigin: "left"
                }}
              />
            </motion.h2>
          </motion.div>
        </div>

        {/* Our Story - Enhanced with scroll-triggered animations */}
        <motion.div
          ref={storyRef}
          className="mb-32 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gold mb-2 relative inline-block">
                  Our Story
                  <motion.div 
                    className="absolute left-0 -bottom-2 h-[3px] w-full bg-gold/30"
                    initial={{ scaleX: 0 }}
                    animate={isStoryInView ? { scaleX: 1 } : { scaleX: 0 }}
                    style={{ transformOrigin: "0% 50%" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </h2>
                
                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  TAWIN was born in 2024 at the inflection point of the AI revolution. From day one, 
                  we set out to challenge legacy providers by building cloud and AI systems that learn, 
                  heal, and scale on their own.
                </motion.p>
                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Our team of engineers and visionaries moves at startup speed, yet delivers 
                  enterprise‑grade security and reliability. In just months, we've partnered with 
                  leading firms to deploy quantum‑safe encryption, neural cloud architectures, and 
                  edge frameworks that drive real business impact.
                </motion.p>
                
                {/* Timeline visualization */}
                <motion.div
                  className="mt-8 pt-8 relative"
                  initial={{ opacity: 0 }}
                  animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ 
                      background: "linear-gradient(90deg, rgba(212, 175, 55, 0.4), rgba(212, 175, 55, 0.1))",
                      transformOrigin: "0% 50%"
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isStoryInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="flex justify-between">
                    {timelinePoints.map((point, index) => (
                      <motion.div 
                        key={index} 
                        className="text-center relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                      >
                        <motion.div 
                          className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold/60"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <p className="font-bold text-gold">{point.year}</p>
                        <p className="text-sm text-white">{point.label}</p>
                        <p className="text-xs text-gray-400 max-w-[120px] mx-auto mt-1">
                          {point.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={isStoryInView ? { 
                  opacity: 1,
                  x: 0
                } : { 
                  opacity: 0,
                  x: 50
                }}
                transition={{ duration: 1 }}
              >
                <div className="rounded-2xl overflow-hidden border border-gold/20 shadow-lg shadow-gold/5 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-40"
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Modern Tech Workspace" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Animated overlay elements */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="bg-black/60 px-6 py-4 rounded-lg backdrop-blur-sm">
                      <p className="text-white font-bold text-xl">Innovative Workspace</p>
                      <p className="text-gold text-sm">Where Tomorrow's Solutions Are Born</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Our Mission with enhanced parallax and scroll animations */}
        <motion.div
          ref={missionRef}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -40 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.8 }}
              >
                <div className="rounded-2xl overflow-hidden border border-gold/20 shadow-lg shadow-gold/5 relative">
                  {/* Animated overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                  <img 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Abstract Tech Visualization" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="order-1 md:order-2 space-y-6"
                initial={{ opacity: 0, x: 40 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gold mb-2 relative inline-block">
                  Our Mission
                  <motion.div 
                    className="absolute left-0 -bottom-2 h-[3px] w-full bg-gold/30"
                    initial={{ scaleX: 0 }}
                    animate={isMissionInView ? { scaleX: 1 } : { scaleX: 0 }}
                    style={{ transformOrigin: "0% 50%" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </h2>
                
                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={isMissionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Our mission is simple: solve tomorrow's challenges today. We design and deliver 
                  adaptive, self‑healing platforms that blend quantum‑ready encryption, multi‑agent 
                  AI orchestration, and sub‑millisecond edge computing.
                </motion.p>
                
                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isMissionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Every solution we build empowers clients to innovate faster, stay secure against 
                  emerging threats, and unlock new opportunities at the edge of technology.
                </motion.p>
                
                {/* Mission highlight points with staggered reveal */}
                <motion.div 
                  className="mt-6 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={isMissionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {[
                    { icon: "🚀", text: "Accelerate Innovation" },
                    { icon: "🔒", text: "Quantum-Safe Security" },
                    { icon: "🔄", text: "Self-Healing Systems" },
                    { icon: "🌐", text: "Edge Computing" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-2 bg-gold/5 p-3 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm text-gold">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Final quote with enhanced visibility and animations - removed extra box */}
        <motion.div 
          className="max-w-4xl mx-auto flex flex-col items-center justify-center mb-16 px-4"
          style={{ y: quoteY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-20% 0px" }}
          transition={{ duration: 1.2 }}
        >
          {/* Grand Quote Block */}
          <div className="w-full flex flex-col items-center mb-10">
            <span className="text-5xl md:text-6xl text-gold/20 font-serif mb-2 self-start">“</span>
            <p className="text-2xl md:text-4xl text-gray-100 italic font-semibold text-center leading-snug mb-4 drop-shadow-[0_2px_12px_rgba(212,175,55,0.10)]">
              At TAWIN, we don't just adapt to technological change—we create it.<br/>
              Our mission is to harness emerging technologies to solve tomorrow's challenges, today.
            </p>
            <span className="text-5xl md:text-6xl text-gold/20 font-serif mt-2 self-end">”</span>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-gold via-yellow-300 to-gold shadow-[0_0_8px_2px_rgba(212,175,55,0.25)] animate-pulse-soft mb-2"></div>
          </div>
          {/* CEO Avatar and Description below quote */}
          <motion.div
            className="flex flex-col items-center flex-shrink-0 relative justify-center mt-2 md:mt-4"
            style={{ y: ceoY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            <span className="relative inline-block">
              <img
                src="/assets/ceo.jpg"
                alt="CEO/Founder"
                className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-gold shadow-lg"
                style={{ boxShadow: '0 4px 24px 0 rgba(212,175,55,0.18), 0 0 0 8px rgba(212,175,55,0.10)', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.35)' }}
              />
              <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 0 32px 8px rgba(212,175,55,0.18)' }}></span>
            </span>
            <motion.div
              className="mt-16 text-center w-full space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h4 className="text-xl font-bold leading-tight bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)]">Ravinder Rangamgari</h4>
              <p className="text-base text-gray-300 font-medium">Founder & CEO, TAWIN Solutions</p>
              <p className="text-sm text-gray-400 italic">Visionary leader with a passion for building tomorrow's technology and empowering teams to innovate at scale.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}