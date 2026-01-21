import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L12 6L18 4L14 10L20 12L14 14L18 20L12 16L10 22L8 16L2 20L6 14L0 12L6 10L2 4L8 6L10 0Z" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: "AI-Accelerated Product Development",
    description:
      "We combine advanced AI tools with expert engineering to take your concept from idea to MVP in record time — without sacrificing quality.",
    gradient: "from-pink-200/40 via-purple-200/30 to-blue-200/40",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="12" y="2" width="6" height="6" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="2" y="12" width="6" height="6" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="12" y="12" width="6" height="6" rx="1" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: "Custom Software & App Development",
    description:
      "From mobile apps to web platforms, we build scalable, high-performance solutions tailored to your market and business needs.",
    gradient: "from-orange-200/40 via-yellow-200/30 to-pink-200/40",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.6"/>
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      </svg>
    ),
    title: "Prototyping & UX Design",
    description:
      "Rapidly test ideas with interactive AI-generated prototypes and data-backed design decisions that put users first.",
    gradient: "from-blue-200/40 via-purple-200/30 to-pink-200/40",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: "AI Integration & Automation",
    description:
      "Enhance your product with AI features — from predictive analytics to smart chatbots — to improve efficiency and user engagement.",
    gradient: "from-purple-200/40 via-pink-200/30 to-orange-200/40",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M14 2L18 6L14 10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
      </svg>
    ),
    title: "Cloud Architecture & DevOps",
    description:
      "Deploy with confidence. We design secure, scalable, and cost-efficient cloud infrastructure, with automated testing and CI/CD pipelines.",
    gradient: "from-cyan-200/40 via-blue-200/30 to-purple-200/40",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 14L10 4L17 14H3Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
      </svg>
    ),
    title: "Startup Growth Consulting",
    description:
      "We're more than a dev shop — we help you refine your business model, optimize workflows, and prepare for funding rounds.",
    gradient: "from-yellow-200/40 via-orange-200/30 to-red-200/40",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/40">
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
            Our Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Smart Solutions for
            <br />
            Fast-Growing Startups
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Code, strategy, and AI in perfect sync.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer"
            >
              {/* Gradient Background */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${service.gradient} opacity-60`} />
              
              <div className="relative p-7">
                {/* Icon */}
                <div className="mb-6 text-foreground/40">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <span className="text-lg text-foreground font-serif">Ready to Innovate?</span>
          <Button variant="hero" size="default" asChild>
            <Link to="/contact">
              <ArrowRight className="w-4 h-4" />
              Start Your Project
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
