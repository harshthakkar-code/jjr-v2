import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    label: "For early-stage products",
    labelColor: "bg-amber-100 text-amber-800",
    name: "MVP Launch",
    price: "$3,500",
    period: "/project",
    features: [
      "AI-assisted design & development",
      "1-month launch timeline",
      "Email & chat support",
    ],
    featured: false,
  },
  {
    label: "For scaling startups",
    labelColor: "bg-blue-100 text-blue-800",
    name: "Growth Build",
    price: "$7,500",
    period: "/project",
    features: [
      "Full-stack development",
      "AI-accelerated QA & integrations",
      "Weekly strategy calls",
    ],
    featured: false,
  },
  {
    label: "For complex or high-scale projects",
    labelColor: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white",
    name: "Custom Enterprise",
    price: "Tailored Quote",
    period: "",
    features: [
      "Dedicated AI + human team",
      "Advanced architecture planning",
      "SLA-backed performance",
    ],
    featured: true,
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

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
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
            Plans Overview
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Startup-Friendly Pricing
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`relative p-7 rounded-3xl border transition-all duration-300 ${
                plan.featured
                  ? "bg-card border-2 border-transparent shadow-card"
                  : "bg-card border-border hover:border-primary/20 hover:shadow-card"
              }`}
              style={plan.featured ? {
                borderImage: "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6) 1",
              } : {}}
            >
              {/* Gradient Border for Featured */}
              {plan.featured && (
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 -z-10">
                  <div className="w-full h-full rounded-3xl bg-card" />
                </div>
              )}

              {/* Label */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${plan.labelColor}`}>
                {plan.label}
              </span>

              {/* Plan Name */}
              <h3 className="font-serif text-2xl text-foreground mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-8">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.featured ? "hero" : "outline"}
                className="w-full"
                asChild
              >
                <Link to="/contact">
                  <ArrowRight className="w-4 h-4" />
                  Get Started
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
