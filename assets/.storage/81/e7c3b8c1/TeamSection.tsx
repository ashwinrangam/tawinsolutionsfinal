import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ParallaxSection } from "@/components/ui/ParallaxBackground";

const team = [
  {
    name: "Sarah Johnson",
    title: "Chief Executive Officer",
    bio: "With over 20 years of experience in technology leadership, Sarah drives the strategic vision of TAWIN SOLUTIONS. Her background in enterprise digital transformation has helped countless organizations reimagine their business models.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Michael Chen",
    title: "Chief Technology Officer",
    bio: "Michael oversees all technological innovations and implementations at TAWIN SOLUTIONS. With deep expertise in cloud architecture, AI, and enterprise systems, he ensures our solutions remain at the cutting edge.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Priya Patel",
    title: "VP of Cybersecurity",
    bio: "Priya leads our cybersecurity practice with her extensive background in information security. Her team develops robust security frameworks that protect our clients from evolving digital threats.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    name: "David Rodriguez",
    title: "Director of Cloud Services",
    bio: "David specializes in cloud migration strategies and multi-cloud environments. His expertise helps organizations leverage the full potential of cloud technologies while optimizing performance and costs.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Emma Lewis",
    title: "Head of Data Analytics",
    bio: "Emma directs our data analytics practice, helping clients transform raw data into actionable insights. Her background in machine learning and statistical analysis drives our innovative analytics solutions.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    name: "James Wilson",
    title: "Director of Digital Transformation",
    bio: "James leads our digital transformation initiatives, combining technical expertise with business acumen. He helps organizations navigate complex change processes to achieve their digital ambitions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    linkedin: "https://linkedin.com"
  }
];

export default function TeamSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px 0px" });
  
  // Parallax scroll effects
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Transform values for parallax elements
  const bgY = useTransform(scrollY, [0, 1000], [0, -100]);
  const patternY = useTransform(scrollY, [0, 1000], [0, -50]);
  const titleY = useTransform(scrollY, [0, 500], [30, -30]);

  return (
    <section 
      ref={sectionRef}
      id="team" 
      className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden"
    >
      {/* Parallax background pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url('/assets/grid-pattern.svg')`,
          backgroundSize: "auto",
          y: patternY
        }}
      />
      
      {/* Subtle overlay with parallax */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] opacity-[0.02] bg-cover bg-center mix-blend-overlay"
        style={{ y: bgY }}
      />
      
      {/* Decorative element */}
      <motion.div
        className="absolute top-1/3 -right-32 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollY, [0, 500], [50, -30]) }}
      />
      <motion.div
        className="absolute bottom-10 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollY, [0, 500], [-50, 30]) }}
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
          style={{ y: titleY }}
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2">Our Experts</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Leadership Team</h3>
          <p className="text-muted-foreground">
            Meet the talented professionals driving innovation and excellence at TAWIN SOLUTIONS.
          </p>
        </motion.div>

        <motion.div
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={isContentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="border border-border/50 h-full hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-[#0077B5] hover:bg-[#0077B5]/90 p-2 rounded-full"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h4 className="font-playfair font-bold text-xl mb-1">{member.name}</h4>
                    <p className="text-gold text-sm mb-4">{member.title}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}