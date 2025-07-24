import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "TAWIN's strategic approach to our digital transformation challenges helped us completely revamp our operations. Their expertise in both technology and business strategy was instrumental in our success.",
    author: "Sarah Johnson",
    title: "CTO, Global Retail Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "The data analytics solution provided by TAWIN allowed us to unlock insights we never knew existed in our data. This has revolutionized our decision-making process and given us a significant competitive edge.",
    author: "Michael Chen",
    title: "CEO, InnoTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "Working with TAWIN on our cybersecurity strategy has been a game-changer. They identified vulnerabilities we weren't aware of and implemented robust security measures that have protected us from multiple threats.",
    author: "Priya Patel",
    title: "CISO, FinSecure Banking",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "TAWIN's cloud migration strategy was perfectly tailored to our needs. Their team managed the entire process seamlessly, ensuring zero downtime and immediate efficiency gains.",
    author: "David Rodriguez",
    title: "CIO, Healthcare Innovations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "The AI solution developed by TAWIN has automated 60% of our manual processes, allowing our team to focus on strategic initiatives. The ROI has been exceptional, and the implementation was flawless.",
    author: "Emma Lewis",
    title: "COO, Logistics Master",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px 0px" });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      className="section-padding bg-gradient-to-b from-background to-secondary/30"
      style={{
        backgroundImage: `url('/assets/grid-pattern.svg')`,
        backgroundSize: "auto",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2">Client Success</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Testimonials</h3>
          <p className="text-muted-foreground">
            Hear what our clients say about their experience working with TAWIN Solutions.
          </p>
        </motion.div>

        <motion.div
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={isContentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border border-gold/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-cyan"></div>
            <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gold/5 pointer-events-none"></div>
            <div className="absolute -left-12 -top-12 w-40 h-40 rounded-full bg-cyan/5 pointer-events-none"></div>
            
            <CardContent className="pt-8 pb-4 relative z-10">
              <motion.div 
                className="flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-gold/20 animate-pulse-soft">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </motion.div>
              <motion.div 
                className="min-h-[180px] flex items-center justify-center"
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg md:text-xl text-center leading-relaxed">
                  {testimonials[activeIndex].quote}
                </p>
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col items-center pb-8 pt-4 space-y-3 relative z-10">
              <motion.div 
                className="flex items-center space-x-4"
                key={`author-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-gold/30 shadow-md">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].author}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{testimonials[activeIndex].author}</h4>
                  <p className="text-sm text-gold/80">{testimonials[activeIndex].title}</p>
                </div>
              </motion.div>
              <div className="flex items-center space-x-3 mt-6">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline" 
                    size="icon"
                    className="rounded-full border-gold/30 hover:border-gold hover:bg-gold/10"
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gold">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </Button>
                </motion.div>
                
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className={`w-3 h-3 p-0 rounded-full transition-all duration-300 ${
                        index === activeIndex 
                          ? "bg-gradient-to-r from-gold to-gold/80 scale-125" 
                          : "bg-muted hover:bg-gold/50"
                      }`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    ></Button>
                  ))}
                </div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline" 
                    size="icon"
                    className="rounded-full border-gold/30 hover:border-gold hover:bg-gold/10"
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gold">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </Button>
                </motion.div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}