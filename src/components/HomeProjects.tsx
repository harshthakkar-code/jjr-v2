import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "NovaHire – AI Recruitment Platform",
    category: "TECHNOLOGY",
    description: "Automated candidate screening, matching, and outreach using machine learning.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
  },
  {
    title: "RetailSense – Smart Store Analytics",
    category: "RETAIL",
    description: "AI-powered shopper insights and predictive inventory management for global retail chains.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  },
  {
    title: "FinVision – Predictive Finance Dashboard",
    category: "TECHNOLOGY",
    description: "Real-time forecasting and personalized investment insights using data modeling.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "MedAssist – Virtual Health Companion",
    category: "HEALTHCARE",
    description: "AI chatbot and patient tracking platform, improving appointment adherence by 35%.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const HomeProjects = () => {
  return (
    <section className="py-24 bg-secondary/40">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground mb-6">
            Our Projects
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Where Ideas Become
            <br />
            Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            See how we turn ideas into high-performance digital products.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider text-white ${
                    project.category === "TECHNOLOGY" ? "bg-blue-600" :
                    project.category === "RETAIL" ? "bg-emerald-600" :
                    project.category === "HEALTHCARE" ? "bg-purple-600" : "bg-gray-600"
                  }`}>
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="default" asChild>
            <Link to="/projects">
              <ArrowRight className="w-4 h-4" />
              See More Projects
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
