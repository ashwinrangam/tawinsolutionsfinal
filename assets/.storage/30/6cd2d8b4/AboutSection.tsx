import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "2010",
    title: "Founded",
    description: "TAWIN Solutions was established with a vision to help businesses navigate technological disruption."
  },
  {
    year: "2013",
    title: "Global Expansion",
    description: "Expanded operations to Europe and Asia, serving multinational clients across various industries."
  },
  {
    year: "2016",
    title: "Research Division",
    description: "Launched our research division focused on emerging technologies and their business applications."
  },
  {
    year: "2020",
    title: "Digital Transformation Center",
    description: "Opened our Digital Transformation Center to help organizations reimagine their business models."
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Named as one of the top 10 technology consultancies by Fortune Magazine."
  }
];

export default function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px 0px" });

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-sm uppercase text-gold tracking-widest mb-2">Our Story</h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">About TAWIN</h3>
          <p className="text-muted-foreground">
            Discover our journey of innovation and excellence in technology consultancy over the years.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h4 className="text-2xl font-playfair font-bold">Our Mission</h4>
            <p className="text-muted-foreground">
              At TAWIN, our mission is to empower organizations to harness the full potential of technology 
              and data to transform their operations, create innovative business models, and deliver exceptional 
              value to their customers.
            </p>

            <h4 className="text-2xl font-playfair font-bold">Our Approach</h4>
            <p className="text-muted-foreground">
              We believe in a collaborative approach that begins with understanding your business challenges 
              and goals. Our team of experts then works closely with you to develop tailored solutions that 
              address your unique needs and drive measurable results.
            </p>

            <h4 className="text-2xl font-playfair font-bold">Our Values</h4>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li><span className="font-bold text-foreground">Excellence</span> - We deliver premium quality in everything we do</li>
              <li><span className="font-bold text-foreground">Innovation</span> - We embrace emerging technologies and forward thinking</li>
              <li><span className="font-bold text-foreground">Integrity</span> - We build relationships based on trust and transparency</li>
              <li><span className="font-bold text-foreground">Impact</span> - We focus on delivering measurable business outcomes</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute top-0 bottom-0 left-10 w-px bg-gold"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white font-medium text-sm">
                    {milestone.year}
                  </div>
                  <h4 className="text-xl font-playfair font-bold mb-2">{milestone.title}</h4>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}