import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { servicesData } from "@/data/services";
import { SEO } from "@/components/SEO";

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

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Services"
        description="Explore JJR SOFTWARE's comprehensive software development services including web development, mobile app development, custom software solutions, and enterprise applications in Ahmedabad, Gujarat."
        keywords="software development services, web development services, mobile app development, custom software solutions, enterprise software, Ahmedabad software services"
        canonical="/services"
      />
      <Header />
      <PageHero title="Our Services" breadcrumb="Services" />

      <section className="py-24">
        <div className="container">
          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesData.map((service) => (
              <motion.div
                key={service.slug}
                variants={itemVariants}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block relative rounded-3xl bg-card border border-border overflow-hidden hover:shadow-card transition-all duration-300"
                >
                  {/* Gradient Background */}
                  <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${service.gradient} opacity-60`} />
                  
                  <div className="relative p-7">
                    {/* Icon placeholder */}
                    <div className="mb-6 text-foreground/40">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0L12 6L18 4L14 10L20 12L14 14L18 20L12 16L10 22L8 16L2 20L6 14L0 12L6 10L2 4L8 6L10 0Z" fill="currentColor" opacity="0.6"/>
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
