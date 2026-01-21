import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const marqueeText = [
  "From Idea to MVP in 8 Weeks",
  "Build Smarter. Launch Faster.",
  "Where AI Meets Human Expertise",
  "AI-Accelerated Product Development",
];

export const MarqueeStrip = () => {
  return (
    <section className="py-6 bg-foreground text-primary-foreground overflow-hidden">
      <div className="flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 items-center whitespace-nowrap"
        >
          {[...marqueeText, ...marqueeText, ...marqueeText, ...marqueeText].map((text, index) => (
            <span
              key={index}
              className="text-lg md:text-xl lg:text-2xl font-serif flex items-center gap-6"
            >
              {text}
              <Sparkles className="w-4 h-4 text-primary" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
