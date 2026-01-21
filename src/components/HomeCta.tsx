import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HomeCta = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/40 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.12),_transparent_55%)]" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-card/80 backdrop-blur border border-border text-sm text-foreground/80 shadow-soft"
          >
            Your Product Could Be Next
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-foreground mt-8"
          >
            Let&apos;s Build Your
            <br />
            Next Big Thing
            <br />
            Together
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            With JJR SOFTWARE, you don&apos;t just build faster — you build smarter.
            <br className="hidden sm:block" />
            Let&apos;s make your launch unforgettable.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact" aria-label="Get started with JJR SOFTWARE">
                <ArrowRight className="w-4 h-4" />
                Get Started Now
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact" aria-label="Schedule a demo with JJR SOFTWARE">
                <ArrowRight className="w-4 h-4" />
                Schedule a Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


