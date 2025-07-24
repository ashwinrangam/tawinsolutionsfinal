import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Innovation", "Excellence", "Strategy", "Growth"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-black text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Particles background */}
      <div id="particles-js" className="particles-container"></div>
      
      {/* Adding a darker gradient filter for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20 pt-16 pb-36">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl text-gold uppercase tracking-widest mb-4 font-light"
          >
            Your Ambition, Accelerated.
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold mb-8"
          >
            Transforming Business Through <br />
            <span className="relative inline-block h-[60px] md:h-[90px] w-full text-center">
              {words.map((word, index) => (
                <span
                  key={word}
                  className={`absolute left-0 right-0 text-gold transition-all duration-500 ${
                    index === currentWord ? "opacity-100 top-0" : "opacity-0 top-20"
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6 max-w-3xl mx-auto mb-12"
          >
            <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed">
              TAWIN SOLUTIONS specializes in cloud migration, digital transformation, AI/ML implementation, software engineering, strategic team augmentation, and technology consulting.
            </p>
            <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed">
              We empower organizations to transform customer experiences, modernize operations, and unlock their full potential. Leveraging cutting-edge technology, actionable insights, and data-driven strategies, our expert engineers and consultants inspire teams, navigate complex solutions, solve critical challenges, and deliver measurable results.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
          >
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-black font-medium tracking-wide text-base py-6 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  window.scrollTo({
                    top: (element as HTMLElement).offsetTop - 100,
                    behavior: "smooth"
                  });
                }
              }}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 font-medium tracking-wide text-base py-6 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#services");
                if (element) {
                  window.scrollTo({
                    top: (element as HTMLElement).offsetTop - 100,
                    behavior: "smooth"
                  });
                }
              }}
            >
              Our Services
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={() => {
            const element = document.querySelector("#services");
            if (element) {
              window.scrollTo({
                top: (element as HTMLElement).offsetTop - 100,
                behavior: "smooth"
              });
            }
          }}
        >
          <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}