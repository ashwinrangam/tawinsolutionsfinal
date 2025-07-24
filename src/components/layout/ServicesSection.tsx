import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  content: string[];
  delay: number;
  isActive: boolean;
  onClick: () => void;
}

const services = [
  {
    title: "Strategic Team Augmentation and Technology Consulting",
    subtitle: "Specialized in strategic team augmentation and consulting needs.",
    content: [
      "Boost team productivity and cost savings with highly skilled tech talent", "Improve team flexibility, retail/store operations, and product support", "Expert Technology Consulting Services", "Full Stack Development and Software Engineering"

,"Cloud Solutions & Digital Transformation"

,"Seamless Delivery as a Service (DaaS) Integration"

,"Online IT eCommerce and Retail Technology Consulting"

,"Global Delivery and Product Services"
    ]
  },
  {
    title: "Cloud Journey, Digital Technology Transformation and Online IT e-Commerce",
    subtitle: "Trusted source for technology solutions.",
    content: [
      "Cloud Transformation for GCP, AWS, and Azure",
"Cloud Business Solutions with ML, AI, Google Vertex AI Agent Builder, LLM, and Gemini",
"Mapping, Geo Coding, and GIS Technology",
"Java, Microservices, API, and Webhooks",
"Drone and Hybrid On-demand Delivery",
"Online Digital Transformation with Omnichannel Retail and Supply Chain Technology",
"Online IT eCommerce for B2B and B2C, Data Analytics, and Management",
"FinTech and HealthTech Digital Transformation"
    ]
  },
  {
    title: "Business Transformation and Program Management",
    subtitle: "Building future leaders and moving business forward.",
    content: [
      "Technical Program and Project Management",
"Scrum Master and Coaching",
"Product Management",
"Business Technology Consulting",
"Business Transformation and Go-to-market Strategy",
"Brand Recognition, Data Analytics, Machine Learning, and Artificial Intelligence",
"Business and Engineering Leadership"
    ]
  }
];

function ServiceCard({ title, subtitle, content, delay, isActive, onClick }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleCardInteraction = () => {
    if (isMobile) {
      onClick();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay }}
      className="h-full"
      whileHover={{ scale: isMobile ? 1 : 1.02 }}
      whileTap={{ scale: isMobile ? 1 : 0.98 }}
    >
      <Card 
        className={`relative border-gold/30 h-full transition-all duration-500 overflow-hidden ${
          isActive 
            ? "shadow-[0_0_30px_rgba(212,175,55,0.3)] border-gold z-20" 
            : "hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:border-gold/60"
        }`}
        onClick={handleCardInteraction}
        onMouseEnter={() => !isMobile && !isActive && onClick()}
        onMouseLeave={() => !isMobile && isActive && onClick()}
        style={{
          background: isActive 
            ? "linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,20,1) 100%)" 
            : "linear-gradient(135deg, rgba(25,25,25,0.8) 0%, rgba(18,18,18,0.9) 100%)"
        }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10 bg-gradient-radial from-gold to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-10 bg-gradient-radial from-gold to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <CardHeader className="relative overflow-hidden pb-4">
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-gold to-gold/60"
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "30%" }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
          >
            <CardTitle className="text-xl md:text-2xl font-playfair text-white group-hover:text-gold">
              {title}
            </CardTitle>
          </motion.div>
          <motion.p 
            className="text-gold italic mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          >
            {subtitle}
          </motion.p>
        </CardHeader>
        <CardContent>
          <motion.ul
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0.7, height: isMobile ? "auto" : "100px" },
              visible: { 
                opacity: 1, 
                height: "auto", 
                maxHeight: isMobile ? "70vh" : "60vh", 
                overflowY: "auto" 
              }
            }}
            transition={{ duration: 0.5 }}
            className="space-y-3 text-gray-300 overflow-hidden custom-scrollbar pr-2"
          >
            {content.map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                className="flex items-start"
              >
                <span className="text-gold mr-2 text-lg">•</span>
                <span className="leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          {!isMobile && !isActive && (
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
          )}
          
          {isMobile && (
            <div className="mt-4 flex justify-center">
              <motion.button
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gold flex items-center text-sm bg-black/30 px-3 py-1 rounded-full border border-gold/30"
                aria-label={isActive ? "Show less" : "Show more"}
                whileTap={{ scale: 0.95 }}
              >
                {isActive ? "Show less" : "Show more"}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.button>
            </div>
          )}
        </CardContent>
        
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold/60 to-gold"
          initial={{ width: "0%" }}
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />
        
        <div 
          className={`absolute inset-0 border-2 border-transparent ${isActive ? 'border-gold/20' : ''} pointer-events-none transition-all duration-500`} 
        />
      </Card>
    </motion.div>
  );
}

export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section 
      id="services" 
      className="relative section-padding py-24 bg-gradient-to-b from-background to-black"
      style={{
        backgroundImage: `url('/assets/grid-pattern.svg')`,
        backgroundSize: "auto",
      }}
    >
      {/* Gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particles-gold"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Premium Services</h3>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300">
            We provide top-tier consultancy services to help businesses leverage technology for sustainable growth and competitive advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10 relative">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              content={service.content}
              delay={index * 0.2}
              isActive={activeCard === index}
              onClick={() => toggleCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}