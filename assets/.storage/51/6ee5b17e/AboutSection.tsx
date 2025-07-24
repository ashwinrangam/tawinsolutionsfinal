import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Tech icons for the floating orb
const techIcons = [
  { name: "AI", icon: "💡", color: "text-cyan" },
  { name: "Cloud", icon: "☁️", color: "text-blue-400" },
  { name: "Blockchain", icon: "🔗", color: "text-purple-500" },
  { name: "IoT", icon: "📡", color: "text-amber-500" },
  { name: "Quantum", icon: "⚛️", color: "text-emerald-400" },
  { name: "AR/VR", icon: "🥽", color: "text-indigo-500" },
  { name: "Robotics", icon: "🤖", color: "text-rose-400" },
];

// Industries being transformed
const transformingIndustries = [
  "Finance", "Healthcare", "Manufacturing", "Retail", 
  "Energy", "Transportation", "Education"
];

// Technologies being deployed
const deployedTechnologies = [
  "AI/ML", "Cloud Native", "Edge Computing", "Quantum Security",
  "Blockchain", "AR/VR", "IoT", "Neural Interfaces", 
  "5G Networks", "Robotics", "Digital Twins", "Sustainable Tech",
  "Biometrics", "Autonomous Systems"
];

export default function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px 0px" });
  const isFutureInView = useInView(futureRef, { once: true, margin: "-100px 0px" });
  
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [globeRotation, setGlobeRotation] = useState(0);
  const [assembledSolutions, setAssembledSolutions] = useState<number[]>([]);

  // Rotate through tech icons in the orb
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIconIndex((prev) => (prev + 1) % techIcons.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Rotate the globe
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobeRotation((prev) => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Particle animation for background
  const Particles = ({ count = 50 }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          const opacity = Math.random() * 0.5 + 0.1;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          
          return (
            <div
              key={i}
              className="absolute bg-gold/30 rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${initialX}%`,
                top: `${initialY}%`,
                opacity: opacity,
                animation: `floatParticle ${duration}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>
    );
  };

  // Future-forward solutions
  const solutions = [
    {
      title: "Quantum-Ready Infrastructure",
      icon: "⚛️",
      components: ["Quantum-Safe Encryption", "Lattice-Based Cryptography", "Post-Quantum Algorithms"],
      color: "from-emerald-500/20 to-emerald-900/10",
      textColor: "text-emerald-400"
    },
    {
      title: "Neural Cloud Architecture",
      icon: "🧠",
      components: ["Adaptive Scaling", "Self-Healing Networks", "Autonomous Deployment"],
      color: "from-blue-500/20 to-blue-900/10",
      textColor: "text-blue-400"
    },
    {
      title: "Synthetic Intelligence Mesh",
      icon: "🌐",
      components: ["AI Orchestration", "Federated Learning", "Multi-Agent Systems"],
      color: "from-purple-500/20 to-purple-900/10",
      textColor: "text-purple-400"
    },
    {
      title: "Distributed Edge Framework",
      icon: "📡",
      components: ["Sub-ms Latency", "Spatial Computing", "Ubiquitous Connectivity"],
      color: "from-amber-500/20 to-amber-900/10", 
      textColor: "text-amber-400"
    },
  ];

  return (
    <section id="about" className="relative section-padding overflow-hidden bg-gradient-to-b from-black to-background/95">
      {/* Cosmic background with particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black opacity-80"></div>
      <Particles count={80} />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24 space-y-6"
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2 animate-shimmer">OUR VISION</h2>
          
          <motion.h3 
            className="text-4xl md:text-6xl font-playfair font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-white">BORN IN THE AI ERA</span>
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-400 to-gold">
              THE NEXT GENERATION OF TECH CONSULTING
            </span>
          </motion.h3>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto italic"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            "We founded TAWIN in the era of new innovations to solve what legacy providers can't. 
            While others maintain outdated systems, we build tomorrow's infrastructure."
          </motion.p>
        </motion.div>

        {/* THE "NOW" SECTION */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={isContentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16 gradient-heading">
            SHAPING TOMORROW, TODAY
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Floating 3D orb with tech icons */}
            <motion.div
              className="relative col-span-1 lg:col-span-1 p-8 rounded-2xl h-96 flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at center, rgba(33,33,33,0.5) 0%, rgba(0,0,0,0) 70%)"
              }}
            >
              <div className="absolute inset-0 rounded-2xl border border-gold/10"></div>
              
              {/* Floating orb */}
              <motion.div
                ref={orbRef}
                className="relative w-64 h-64 rounded-full"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  perspective: "1000px",
                }}
              >
                {/* Central sphere */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-black/80 to-gray-900 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(212,175,55,0.2)",
                      "0 0 60px rgba(212,175,55,0.4)",
                      "0 0 30px rgba(212,175,55,0.2)",
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <div className="absolute inset-0 rounded-full border border-gold/30"></div>
                </motion.div>
                
                {/* Tech icon orbiting elements */}
                {techIcons.map((tech, index) => {
                  const angle = (index / techIcons.length) * Math.PI * 2;
                  const isActive = index === activeIconIndex;
                  
                  return (
                    <motion.div
                      key={tech.name}
                      className={`absolute flex items-center justify-center ${isActive ? 'z-10' : ''}`}
                      initial={{ opacity: 0.5, scale: 0.9 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.5, 
                        scale: isActive ? 1.1 : 0.9,
                        x: Math.cos(angle) * 100,
                        y: Math.sin(angle) * 100,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-900 border-2 ${isActive ? 'border-gold' : 'border-gray-800'}`}
                      >
                        <span className="text-xl">{tech.icon}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          className="absolute mt-16 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className={`font-semibold text-lg ${tech.color}`}>
                            {tech.name}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-gold text-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    ✧
                  </motion.div>
                </div>
              </motion.div>
              
              <div className="absolute bottom-8 inset-x-0 text-center">
                <h3 className="text-xl font-bold text-gold mb-2">2024 LABS</h3>
                <p className="text-gray-300">Currently incubating:</p>
                <p className="font-semibold animate-pulse-soft">AI governance frameworks for EU regulators</p>
              </div>
            </motion.div>
            
            {/* Founder vision */}
            <motion.div
              className="col-span-1 lg:col-span-1 rounded-2xl overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
              
              <div className="relative z-20 flex flex-col h-96 p-8 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gold mb-2">FOUNDER VISION</h3>
                  <div className="w-16 h-1 bg-gold mb-4"></div>
                </div>
                
                <div className="flex flex-col justify-end h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold">
                      <img 
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                        alt="Tawin Founder" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Founder & CEO</p>
                      <h4 className="text-white font-semibold">Alexander Chen</h4>
                    </div>
                  </div>
                  
                  <motion.div
                    className="p-4 bg-black/50 rounded-lg border border-gold/20"
                    whileHover={{ borderColor: "rgba(212,175,55,0.5)" }}
                  >
                    <p className="text-gray-200 italic mb-2">
                      "Why we launched as AI hit inflection point"
                    </p>
                    <p className="text-gold font-semibold">
                      "Microsoft built the past. We're engineering the future."
                    </p>
                  </motion.div>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center border border-gold/30">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">Watch video profile</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Live impact map */}
            <motion.div
              className="col-span-1 lg:col-span-1 rounded-2xl bg-black/30 border border-gold/10 p-6 relative overflow-hidden"
              whileHover={{ borderColor: "rgba(212,175,55,0.3)" }}
            >
              <h3 className="text-xl font-bold text-gold mb-2">LIVE IMPACT MAP</h3>
              <div className="w-16 h-1 bg-gold mb-6"></div>
              
              {/* Globe visualization */}
              <div className="h-48 relative my-4 flex items-center justify-center">
                <motion.div 
                  className="w-48 h-48 rounded-full border border-gold/20 absolute"
                  style={{ 
                    transform: `rotateY(${globeRotation}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="w-full h-full rounded-full border-4 border-gray-800/30 border-dashed absolute"></div>
                  <div className="w-full h-full rounded-full bg-black/40 absolute" style={{ transform: "translateZ(-5px)" }}></div>
                  
                  {/* Globe dots */}
                  {transformingIndustries.map((_, i) => {
                    const phi = Math.acos(-1 + (2 * i) / transformingIndustries.length);
                    const theta = Math.sqrt(transformingIndustries.length * Math.PI) * phi;
                    
                    const x = 100 * Math.cos(theta) * Math.sin(phi);
                    const y = 100 * Math.sin(theta) * Math.sin(phi);
                    const z = 100 * Math.cos(phi);
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gold"
                        style={{
                          transform: `translate3d(${x}%, ${y}%, ${z}px)`,
                          transformStyle: "preserve-3d",
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    );
                  })}
                </motion.div>
                
                {/* Centered element */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(212,175,55,0.3)",
                        "0 0 40px rgba(212,175,55,0.5)",
                        "0 0 20px rgba(212,175,55,0.3)",
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <span className="text-gold text-lg font-bold">TAWIN</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Impact stats */}
              <div className="mt-8 text-center">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg border border-gold/10">
                  <div>
                    <span className="text-gold font-bold text-2xl">{transformingIndustries.length}</span>
                    <p className="text-xs text-gray-300 uppercase">Industries transforming now</p>
                  </div>
                  
                  <div className="h-10 w-px bg-gold/20"></div>
                  
                  <div>
                    <span className="text-gold font-bold text-2xl">{deployedTechnologies.length}</span>
                    <p className="text-xs text-gray-300 uppercase">Technologies deployed</p>
                  </div>
                </div>
              </div>
              
              {/* Industry list - collapsible */}
              <div className="mt-4 text-xs text-gray-400">
                <div className="flex flex-wrap gap-1">
                  {transformingIndustries.map((industry, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-black/30 rounded border border-gold/10"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FUTURE-FORWARD VISUALS */}
        <motion.div
          ref={futureRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isFutureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16 gradient-heading">
            ARCHITECTING THE FUTURE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-black/30 border border-gold/10 rounded-2xl overflow-hidden"
                whileHover={() => {
                  setAssembledSolutions((prev) => 
                    prev.includes(index) ? prev : [...prev, index]
                  );
                  return { 
                    borderColor: "rgba(212,175,55,0.3)",
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                  };
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`h-full p-6 bg-gradient-to-br ${solution.color}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-2xl border border-gold/20">
                      {solution.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${solution.textColor}`}>
                      {solution.title}
                    </h3>
                  </div>

                  <div className="pl-16">
                    {solution.components.map((component, compIndex) => (
                      <motion.div
                        key={compIndex}
                        className="flex items-center gap-3 mb-3"
                        initial={{ opacity: 0.5, x: -10 }}
                        animate={{ 
                          opacity: assembledSolutions.includes(index) || isFutureInView ? 1 : 0.5,
                          x: assembledSolutions.includes(index) || isFutureInView ? 0 : -10
                        }}
                        transition={{ duration: 0.3, delay: compIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full ${solution.textColor}`}></div>
                        <p className="text-gray-300">{component}</p>
                        
                        {assembledSolutions.includes(index) && (
                          <motion.div
                            className={`h-6 w-6 ${solution.textColor} rounded-full flex items-center justify-center text-xs`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: compIndex * 0.1 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Assembling indicator */}
                  {assembledSolutions.includes(index) && (
                    <motion.div 
                      className="mt-4 p-3 bg-black/30 rounded-lg border border-gold/20 flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="text-sm text-gray-300">Solution components assembled</span>
                      <span className={`px-2 py-1 rounded-md bg-black/50 text-xs font-mono ${solution.textColor}`}>
                        100% COMPLETE
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Final CTA */}
          <motion.div 
            className="max-w-2xl mx-auto text-center mt-16"
            initial={{ opacity: 0 }}
            animate={isFutureInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-lg text-gray-300 mb-6">
              At TAWIN, we don't just adapt to technological change—we create it. 
              Our mission is to harness emerging technologies to solve tomorrow's challenges, today.
            </p>
            
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-black font-medium transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transform hover:scale-105">
              Join Our Journey
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}