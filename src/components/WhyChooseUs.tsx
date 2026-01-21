import { motion } from "framer-motion";
import { Users, DollarSign, Scale, Zap } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Expert + AI Combo",
    description: "Innovation with human insight",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
    size: "large",
  },
  {
    icon: DollarSign,
    title: "Lower Development Costs",
    description: "Save up to 40% without sacrificing quality",
    size: "small",
  },
  {
    icon: Scale,
    title: "Scalable Architecture",
    description: "Always ready for growth and pivots",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=600&fit=crop",
    size: "medium",
  },
  {
    icon: Zap,
    title: "3x Faster Delivery",
    description: "Agile sprints powered by AI acceleration",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
    size: "large",
  },
];

export const WhyChooseUs = () => {
  const Reason0Icon = reasons[0].icon;
  const Reason1Icon = reasons[1].icon;
  const Reason2Icon = reasons[2].icon;
  const Reason3Icon = reasons[3].icon;

  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Why Choose Us</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            AI + Human Expertise =
            <br />
            Your Competitive Edge
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {/* Card 1 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 lg:row-span-1 relative rounded-3xl overflow-hidden group"
          >
            <img
              src={reasons[0].image}
              alt={reasons[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
              <div className="flex items-center gap-3 mb-2">
                <Reason0Icon className="w-5 h-5" />
                <h3 className="font-serif text-2xl">{reasons[0].title}</h3>
              </div>
              <p className="text-primary-foreground/80">{reasons[0].description}</p>
            </div>
          </motion.div>

          {/* Card 2 - Small */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-3xl bg-primary p-8 flex flex-col justify-end"
          >
            <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Reason1Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-serif text-2xl text-primary-foreground mb-2">
              {reasons[1].title}
            </h3>
            <p className="text-primary-foreground/80">{reasons[1].description}</p>
          </motion.div>

          {/* Card 3 - Medium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img
              src={reasons[2].image}
              alt={reasons[2].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-1">
                <Reason2Icon className="w-4 h-4 text-primary-foreground" />
                <h3 className="font-serif text-lg text-primary-foreground">{reasons[2].title}</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm">{reasons[2].description}</p>
            </div>
          </motion.div>

          {/* Card 4 - Takes remaining space */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden group"
          >
            <img
              src={reasons[3].image}
              alt={reasons[3].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-2">
                <Reason3Icon className="w-5 h-5 text-primary-foreground" />
                <h3 className="font-serif text-2xl text-primary-foreground">{reasons[3].title}</h3>
              </div>
              <p className="text-primary-foreground/80">{reasons[3].description}</p>
            </div>
          </motion.div>
        </div>

        {/* Tagline with animated text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
            JJR SOFTWARE can help you with{" "}
            <motion.span
              className="inline-block text-foreground font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              a SaaS platform
            </motion.span>{" "}
            or{" "}
            <motion.span
              className="inline-block text-foreground font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              a custom app
            </motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
