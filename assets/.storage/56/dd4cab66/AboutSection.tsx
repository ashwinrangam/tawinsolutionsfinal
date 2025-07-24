import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px 0px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px 0px" });

  return (
    <section id="about" className="relative section-padding overflow-hidden bg-gradient-to-b from-black to-background/95">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black opacity-80"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Vision Section - KEEP */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24 space-y-6"
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2">OUR VISION</h2>
          
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

        {/* "SHAPING TOMORROW, TODAY" section - KEEP */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-8 gradient-heading">
            SHAPING TOMORROW, TODAY
          </h2>
        </motion.div>

        {/* Our Story - NEW */}
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gold mb-6">Our Story</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  TAWIN was born in 2024 at the inflection point of the AI revolution. From day one, 
                  we set out to challenge legacy providers by building cloud and AI systems that learn, 
                  heal, and scale on their own.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our team of engineers and visionaries moves at startup speed, yet delivers 
                  enterprise‑grade security and reliability. In just months, we've partnered with 
                  leading firms to deploy quantum‑safe encryption, neural cloud architectures, and 
                  edge frameworks that drive real business impact.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gold/20">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Modern Tech Workspace" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Mission - NEW */}
        <motion.div
          ref={missionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 rounded-2xl overflow-hidden border border-gold/20">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Abstract Tech Visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-gold mb-6">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Our mission is simple: solve tomorrow's challenges today. We design and deliver 
                  adaptive, self‑healing platforms that blend quantum‑ready encryption, multi‑agent 
                  AI orchestration, and sub‑millisecond edge computing.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Every solution we build empowers clients to innovate faster, stay secure against 
                  emerging threats, and unlock new opportunities at the edge of technology.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Final quote - KEEP */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl text-gray-300 italic">
            "At TAWIN, we don't just adapt to technological change—we create it. 
            Our mission is to harness emerging technologies to solve tomorrow's challenges, today."
          </p>
        </motion.div>
        
        {/* Image grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-video rounded-xl overflow-hidden border border-gold/20">
            <img 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border border-gold/20">
            <img 
              src="https://images.unsplash.com/photo-1573164574230-db1d5e960238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
              alt="Tech Solutions" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border border-gold/20">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Future Technology" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}