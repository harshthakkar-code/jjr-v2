import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0L20 12L32 16L20 20L16 32L12 20L0 16L12 12L16 0Z" fill="currentColor"/>
      </svg>
    ),
    title: "AI-Generated Prototypes",
    description: "Get wireframes and mockups in hours, not weeks.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="10" height="10" fill="currentColor"/>
        <rect x="18" y="4" width="10" height="10" fill="currentColor"/>
        <rect x="4" y="18" width="10" height="10" fill="currentColor"/>
        <rect x="18" y="18" width="10" height="10" fill="currentColor"/>
      </svg>
    ),
    title: "Accelerated Development",
    description: "AI-assisted coding speeds up delivery.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="4" fill="currentColor"/>
        <rect x="14" y="2" width="4" height="8" fill="currentColor"/>
        <rect x="14" y="22" width="4" height="8" fill="currentColor"/>
        <rect x="2" y="14" width="8" height="4" fill="currentColor"/>
        <rect x="22" y="14" width="8" height="4" fill="currentColor"/>
      </svg>
    ),
    title: "Smart QA Testing",
    description: "AI-driven testing for fewer bugs and smoother launches.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L20 12L28 8L24 16L32 20L24 24L28 32L20 28L16 36L12 28L4 32L8 24L0 20L8 16L4 8L12 12L16 4Z" fill="currentColor"/>
      </svg>
    ),
    title: "Full Support",
    description: "A dedicated team to guide you every step of the way.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const Features = () => {
  return (
    <section className="py-24 bg-secondary/40 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 3D Blob Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://softy-solutions.cmsmasters.studio/light-demo/wp-content/uploads/sites/3/2025/09/71-home-1-2.webp"
              alt="3D Abstract Shape"
              className="w-full max-w-lg mx-auto lg:mx-0"
            />
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group"
              >
                <div className="mb-5 text-[#9C8B7A] w-8 h-8">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-foreground leading-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Main Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center mt-24"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-relaxed">
            At JJR SOFTWARE, we harness AI-assisted design, development, and testing to help
            startups move from idea to launch{" "}
            <span className="text-primary">up to 3x faster</span> than traditional agencies.
          </p>
          <Button variant="outline" className="mt-8 group" asChild>
            <Link to="/about">
              Find Out More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
