import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(4, {
    message: "Subject must be at least 4 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function EnhancedContactSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  // For scroll-based animations
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isTitleInView = useInView(titleRef, { once: false, margin: "-30% 0px" });
  const isContentInView = useInView(contentRef, { once: false, margin: "-30% 0px" });
  const isFormInView = useInView(formRef, { once: false, margin: "-30% 0px" });
  
  // Parallax scroll effects
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Transform values for parallax elements
  const bgY1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -40]);
  const contentY = useTransform(scrollY, [0, 1000], [50, -20]);
  const titleY = useTransform(scrollY, [0, 500], [20, -20]);
  
  // Floating elements with parallax
  const floatingElements = [
    { top: "10%", right: "5%", size: "200px", color: "rgba(212, 175, 55, 0.04)", transform: bgY1 },
    { top: "70%", left: "10%", size: "150px", color: "rgba(212, 175, 55, 0.03)", transform: bgY2 },
    { top: "30%", left: "5%", size: "120px", color: "rgba(212, 175, 55, 0.025)", transform: bgY1 },
    { bottom: "20%", right: "15%", size: "180px", color: "rgba(212, 175, 55, 0.03)", transform: bgY2 },
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    alert("Thank you for your message. We will get back to you shortly.");
    form.reset();
  }

  // Create connector lines between elements
  const ConnectorLine = ({ startPosition, endPosition, delay = 0 }) => {
    const pathRef = useRef(null);
    
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
        <motion.path 
          d={`M${startPosition.x},${startPosition.y} C${(startPosition.x + endPosition.x)/2},${startPosition.y} ${(startPosition.x + endPosition.x)/2},${endPosition.y} ${endPosition.x},${endPosition.y}`}
          stroke="rgba(212, 175, 55, 0.3)"
          strokeWidth="1"
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isContentInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay }}
        />
      </svg>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative section-padding overflow-hidden bg-gradient-to-b from-secondary/30 to-background"
    >
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gold via-amber-400 to-gold z-50"
        style={{ 
          width: `${Math.min((scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`,
          opacity: 0.8
        }}
      />
      
      {/* Animated background image with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-f4ba2a6f9f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2129&q=80')] opacity-[0.05] bg-cover bg-center"
        style={{ y: bgY1 }}
        animate={{
          backgroundPosition: ["0% 0%", "2% 2%", "0% 0%"],
          filter: ["blur(8px)", "blur(10px)", "blur(8px)"]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Enhanced animated flowing grid background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          y: bgY2
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          backgroundSize: ['50px 50px', '55px 55px', '50px 50px']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Animated light beam effect */}
      <motion.div 
        className="absolute h-full w-[300px] blur-[100px] left-1/2 -translate-x-1/2"
        style={{ 
          background: "linear-gradient(to bottom, rgba(212, 175, 55, 0), rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0))",
        }}
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          width: ["250px", "350px", "250px"],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div 
          key={index}
          className="absolute rounded-full bg-gold/20"
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
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        />
      ))}
      
      {/* Enhanced decorative orbs with parallax */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8 + i * 3, 
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: el.size,
            height: el.size,
            top: el.top || "auto",
            right: el.right || "auto",
            bottom: el.bottom || "auto",
            left: el.left || "auto",
            background: `radial-gradient(circle, ${el.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
            y: el.transform,
          }}
        />
      ))}
      
      {/* Connector lines for visual storytelling */}
      <ConnectorLine 
        startPosition={{ x: 100, y: 200 }} 
        endPosition={{ x: 300, y: 300 }} 
        delay={0.5} 
      />
      <ConnectorLine 
        startPosition={{ x: 500, y: 100 }} 
        endPosition={{ x: 700, y: 200 }} 
        delay={0.8} 
      />
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y: contentY }}
      >
        {/* Enhanced Title Section */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20 relative"
          style={{ y: titleY }}
        >
          {/* Add subtle accent behind section title */}
          <motion.div 
            className="absolute w-40 h-40 rounded-full bg-gold/[0.03] -z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
          
          <motion.h2 
            className="text-sm uppercase text-gold tracking-widest mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in Touch
          </motion.h2>
          
          <motion.h3 
            className="text-3xl md:text-4xl font-playfair font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Contact Us
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Have a question or want to discuss how we can help your business? Reach out to us.
          </motion.p>
          
          {/* Animated accent line */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={isTitleInView ? { width: "80%", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative"
        >
          {/* Contact Information with enhanced animations */}
          <div className="space-y-8">
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, x: -30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-xl font-playfair font-bold">Contact Information</h4>
              <p className="text-muted-foreground">
                Our team of experts is ready to help you navigate the complexities of digital transformation.
              </p>
            </motion.div>

            <div className="space-y-6 relative">
              {/* Contact cards with staggered reveal */}
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-6 w-6">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  ),
                  title: "Address",
                  content: "123 Tech Boulevard, Silicon Valley, CA 94043"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-6 w-6">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  ),
                  title: "Phone",
                  content: "+1 (555) 123-4567"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-6 w-6">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  ),
                  title: "Email",
                  content: "contact@tawin-consultancy.com"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                >
                  <motion.div 
                    className="bg-gold/10 p-3 rounded-full"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h5 className="font-medium mb-1">{item.title}</h5>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h4 className="text-xl font-playfair font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {/* Social icons with hover effects */}
                {[
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold h-5 w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                ].map((icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="bg-gold/10 p-3 rounded-full hover:bg-gold/20 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isContentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced contact form with animated elements */}
          <motion.div 
            ref={formRef}
            className="bg-card rounded-lg shadow-xl p-8 border border-gold/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-cyan"
              initial={{ scaleX: 0 }}
              animate={isFormInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ transformOrigin: "left" }}
            />
            
            {/* Animated background elements */}
            <motion.div 
              className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gold/5 pointer-events-none"
              initial={{ scale: 0 }}
              animate={isFormInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div 
              className="absolute -left-12 -top-12 w-40 h-40 rounded-full bg-cyan/5 pointer-events-none"
              initial={{ scale: 0 }}
              animate={isFormInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <motion.h4 
              initial={{ opacity: 0, y: -10 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-playfair font-bold mb-6 relative z-10"
            >
              Send us a message
            </motion.h4>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                {/* Form fields with enhanced animations */}
                {[
                  {
                    name: "name",
                    label: "Name",
                    placeholder: "Your name",
                    delay: 0.1
                  },
                  {
                    name: "email",
                    label: "Email",
                    placeholder: "Your email address",
                    delay: 0.2
                  },
                  {
                    name: "subject",
                    label: "Subject",
                    placeholder: "Subject of your message",
                    delay: 0.3
                  }
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: field.delay + 0.4 }}
                  >
                    <FormField
                      control={form.control}
                      name={field.name as "name" | "email" | "subject"}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium">{field.label}</FormLabel>
                          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                            <FormControl>
                              <Input 
                                placeholder={field.placeholder} 
                                {...formField} 
                                className="border-gold/30 focus:border-gold focus:ring-gold/30 transition-all duration-300"
                              />
                            </FormControl>
                          </motion.div>
                          <FormMessage className="text-gold" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                ))}
                
                {/* Message textarea with enhanced animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90 font-medium">Message</FormLabel>
                        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your message here" 
                              className="min-h-[120px] border-gold/30 focus:border-gold focus:ring-gold/30 transition-all duration-300" 
                              {...field} 
                            />
                          </FormControl>
                        </motion.div>
                        <FormMessage className="text-gold" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                {/* Submit button with enhanced animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}