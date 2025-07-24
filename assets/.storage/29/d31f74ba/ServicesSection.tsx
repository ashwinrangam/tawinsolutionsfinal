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
      "Highly Skilled Tech Talents to Boost Team Productivity and Cost Savings",
      "Improve team flexibility, store operations and product support",
      "Technology Consulting Services",
      "Full Stack Development and Software Engineering",
      "Cloud & Digital Transformation",
      "Delivery as a Service Integration",
      "Online IT eCommerce and Retail Technology Consulting",
      "Global Delivery and Product"
    ]
  },
  {
    title: "Cloud Journey, Digital Technology Transformation and Online IT e-Commerce",
    subtitle: "Trusted source for technology solutions.",
    content: [
      "GCP, AWS and Azure Cloud Transformation",
      "Cloud Business Solution with ML and AI (Google Vertex AI Agent Builder, LLM, Gemini)",
      "Mapping, Geo Coding and GIS technology",
      "Java, Microservices, API and Webhooks",
      "Drone and Hybrid On-demand Delivery",
      "Online Digital Transformation with Omnichannel Retail and Supply Chain Technology",
      "Online IT eCommerce (B2B, B2C), Data Analytics and Management",
      "FinTech and HealthTech digital transformation"
    ]
  },
  {
    title: "Business Transformation and Program Management",
    subtitle: "Building future leaders and moving business forward.",
    content: [
      "Technical Program/Project Management",
      "Scrum Master and Coaching",
      "Product Management",
      "Business Technology Consulting",
      "Business Transformation and Go-to-market Strategy",
      "Brand Recognition and Data Analytics (ML, AI)",
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
    >
      <Card 
        className={`relative border-gold/30 h-full transition-all duration-500 overflow-hidden ${
          isActive 
            ? "shadow-[0_0_30px_rgba(212,175,55,0.3)] border-gold scale-105 z-20" 
            : "hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:border-gold/60"
        }`}
        onClick={handleCardInteraction}
        onMouseEnter={() => !isMobile && onClick()}
        onMouseLeave={() => !isMobile && onClick()}
        style={{
          background: isActive 
            ? "linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,20,1) 100%)" 
            : "linear-gradient(135deg, rgba(25,25,25,0.8) 0%, rgba(18,18,18,0.9) 100%)"
        }}
      >
        <CardHeader className="relative overflow-hidden pb-4">
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "30%" }}
            transition={{ duration: 0.7 }}
          />
          <CardTitle className="text-xl md:text-2xl font-playfair text-white group-hover:text-gold">
            {title}
          </CardTitle>
          <p className="text-gold italic mt-2">{subtitle}</p>
        </CardHeader>
        <CardContent>
          <motion.ul
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0.7, height: isMobile ? "auto" : "100px" },
              visible: { opacity: 1, height: "auto" }
            }}
            transition={{ duration: 0.5 }}
            className="space-y-2 text-gray-300 overflow-hidden"
          >
            {content.map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                className="flex items-start"
              >
                <span className="text-gold mr-2">•</span>
                <span>{item}</span>
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
                className="text-gold flex items-center text-sm"
                aria-label={isActive ? "Show less" : "Show more"}
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
          className="absolute bottom-0 left-0 h-1 bg-gold"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
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