import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  delay: number;
}

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    title: "Strategic Consulting",
    description: "We help you develop comprehensive strategies to navigate technological disruption and drive business growth.",
    details: "Our strategic consulting services include technology roadmapping, digital strategy development, IT portfolio assessment, competitive analysis, and technology trend forecasting. We work closely with your leadership team to create a vision that aligns technology initiatives with your business objectives, ensuring maximum return on investment and sustainable growth."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    title: "Digital Transformation",
    description: "Transform your traditional business models with cutting-edge digital solutions for the modern era.",
    details: "Our digital transformation services encompass business process reengineering, legacy system modernization, customer experience enhancement, digital workplace implementation, and change management. We guide organizations through every step of their digital journey, from strategy development to implementation and beyond, ensuring successful adoption and sustainable results."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"></path>
        <path d="M14 3v5h5M16 16v6M16 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
      </svg>
    ),
    title: "Data Analytics",
    description: "Unlock the power of your data with advanced analytics solutions that drive informed decision-making.",
    details: "Our data analytics services include data strategy development, data warehousing and lake implementation, business intelligence dashboards, predictive analytics modeling, and machine learning integration. We help organizations transform raw data into actionable insights, enabling data-driven decision-making that creates competitive advantages and identifies new business opportunities."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: "Cybersecurity",
    description: "Protect your business with comprehensive security solutions designed for today's threat landscape.",
    details: "Our cybersecurity services include security assessment and audits, threat detection and response, identity and access management, security architecture design, compliance management, and security awareness training. We help organizations identify vulnerabilities, implement robust security measures, and develop protocols to safeguard digital assets and maintain business continuity in the face of evolving cyber threats."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    title: "Cloud Solutions",
    description: "Maximize efficiency and scalability with our comprehensive cloud transformation services.",
    details: "Our cloud solutions include cloud strategy development, migration planning and execution, hybrid and multi-cloud architecture design, cloud-native application development, and managed cloud services. We design, implement, and manage secure cloud environments tailored to your specific business needs, optimizing performance, reducing costs, and enabling innovation and growth."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
        <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
        <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
        <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
        <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
        <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
      </svg>
    ),
    title: "AI & Machine Learning",
    description: "Harness the power of artificial intelligence to automate processes and gain predictive insights.",
    details: "Our AI and machine learning services include AI strategy development, custom algorithm design and training, natural language processing, computer vision implementation, intelligent automation, and AI model operationalization. We develop custom solutions that address your unique business challenges, enabling process automation, predictive insights, and innovative customer experiences that drive competitive advantage."
  }
];

function ServiceCard({ icon, title, description, details, delay }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay }}
      className="relative"
    >
      <Card 
        className={`border border-border/50 hover:shadow-lg transition-all duration-300 ${
          expanded ? "shadow-xl transform scale-105 z-20" : ""
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <CardHeader className="relative overflow-hidden">
          <div className="mb-4 text-gold transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <CardTitle className="text-xl font-playfair">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
          <div className={`overflow-hidden transition-all duration-500 ${
            expanded ? "mt-4 max-h-[500px]" : "max-h-0"
          }`}>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {details}
            </p>
            <div className="mt-4 text-sm text-gold flex items-center cursor-pointer">
              <span>{expanded ? "Read less" : "Read more"}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`ml-1 w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px 0px" });

  return (
    <section 
      id="services" 
      className="relative section-padding bg-gradient-to-b from-background to-secondary/30"
      style={{
        backgroundImage: `url('/assets/grid-pattern.svg')`,
        backgroundSize: "auto",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Premium Services</h3>
          <p className="text-muted-foreground">
            We provide top-tier consultancy services to help businesses leverage technology for sustainable growth and competitive advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              details={service.details}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}