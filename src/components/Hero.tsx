import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-workspace.webp";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="badge-pill mb-8"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-background text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
              Next-Gen
            </span>
            <span className="text-foreground font-semibold">AI-Accelerated Product Development</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.08] text-foreground mb-8"
          >
            Build Smarter.
            <br />
            Launch Faster.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-medium"
          >
            JJR SOFTWARE combines AI technology with expert developers to turn your idea into a
            market-ready product — in record time.
          </motion.p>

          {/* Avatar Stack + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="avatar-stack">
              {avatars.map((avatar, index) => (
                <motion.img
                  key={index}
                  src={avatar}
                  alt={`Client ${index + 1}`}
                  className="w-11 h-11 rounded-full object-cover border-2 border-background"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-semibold">2000+ Happy Clients</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                <ArrowRight className="w-4 h-4" />
                Start Your Project
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/about">
                <ArrowRight className="w-4 h-4" />
                See Our Process
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-elevated">
            <img
              src={heroImage}
              alt="Modern workspace"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
