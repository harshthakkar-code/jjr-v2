import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";

const testimonials = [
  {
    quote:
      '"JJR SOFTWARE took our rough concept and turned it into a polished SaaS product in just 8 weeks. The speed and quality blew us away!"',
    author: "Alex Carter",
    role: "Founder of Taskify",
    company: "Taskify",
    rating: 5,
    type: "text",
  },
  {
    quote:
      '"Their AI-powered workflow is a game-changer. We launched ahead of schedule and under budget."',
    author: "Lena Torres",
    role: "CEO of BrightFinance",
    company: "BrightFinance",
    rating: 5,
    type: "text",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    type: "video",
  },
  {
    quote:
      '"JJR SOFTWARE turned our scattered idea into a polished MVP in under two months. The AI-driven workflow saved us months of trial and error."',
    author: "Sofia Patel",
    role: "Co-Founder at EcoLink",
    company: "EcoLink",
    rating: 5,
    type: "text",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    type: "video",
  },
  {
    quote:
      '"They didn\'t just build our product — they challenged our thinking and made it better. Their AI prototypes nailed 90% of our vision on the first try."',
    author: "Daniel Wright",
    role: "CEO of FlowPilot",
    company: "FlowPilot",
    rating: 5,
    type: "text",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-pink-100/30 via-purple-100/20 to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground mb-6">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Trusted by Innovators
            <br />
            Worldwide
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl p-7 border border-border"
          >
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-foreground leading-relaxed mb-6">
              {testimonials[0].quote}
            </blockquote>
            <div>
              <p className="text-sm text-muted-foreground">
                — <span className="text-primary font-medium">{testimonials[0].author}</span>, {testimonials[0].role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-3xl p-7 border border-border"
          >
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-foreground leading-relaxed mb-6">
              {testimonials[1].quote}
            </blockquote>
            <div>
              <p className="text-sm text-muted-foreground">
                — <span className="text-primary font-medium">{testimonials[1].author}</span>, {testimonials[1].role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] md:row-span-2"
          >
            <img
              src={testimonials[2].image}
              alt="Video testimonial"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <Play className="w-5 h-5 text-foreground ml-1" fill="currentColor" />
              </button>
            </div>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-3xl p-7 border border-border"
          >
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-foreground leading-relaxed mb-6">
              {testimonials[3].quote}
            </blockquote>
            <div>
              <p className="text-sm text-muted-foreground">
                — <span className="text-primary font-medium">{testimonials[3].author}</span>, {testimonials[3].role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden aspect-square"
          >
            <img
              src={testimonials[4].image}
              alt="Video testimonial"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <Play className="w-5 h-5 text-foreground ml-1" fill="currentColor" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-3xl p-7 border border-border"
          >
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-foreground leading-relaxed mb-6">
              {testimonials[5].quote}
            </blockquote>
            <div>
              <p className="text-sm text-muted-foreground">
                — <span className="text-primary font-medium">{testimonials[5].author}</span>, {testimonials[5].role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
