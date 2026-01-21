import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { servicesData, getServiceBySlug } from "@/data/services";
import { SEO } from "@/components/SEO";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const currentIndex = servicesData.findIndex(s => s.slug === slug);
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={service.title}
        description={service.description}
        keywords={`${service.title}, software development service, ${service.title.toLowerCase()} Ahmedabad, custom software solutions`}
        canonical={`/services/${service.slug}`}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="gradient-mesh">
          <div className="gradient-blob gradient-blob-1" />
          <div className="gradient-blob gradient-blob-2" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {service.description}
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${service.gradient} overflow-hidden`}>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt={service.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Services List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4"
            >
              <div className="bg-secondary/30 rounded-3xl p-8 sticky top-32">
                <h3 className="font-serif text-xl text-foreground mb-6">Our Services</h3>
                <nav className="space-y-2">
                  {servicesData.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 group ${
                        s.slug === slug 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <span className="text-sm font-medium">{s.shortTitle}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${
                        s.slug === slug ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`} />
                    </Link>
                  ))}
                </nav>

                {/* CTA Box */}
                <div className="mt-8 p-6 bg-foreground rounded-2xl text-center">
                  <p className="text-background/80 text-sm mb-4">Ready to get started?</p>
                  <Button variant="outline" size="sm" asChild className="bg-background text-foreground hover:bg-background/90">
                    <Link to="/contact">
                      Request a Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-8"
            >
              {/* About Section */}
              <div className="mb-16">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  {service.aboutTitle}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {service.aboutContent}
                </p>
              </div>

              {/* Features Section */}
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                  What We Offer?
                </h3>
                <div className="space-y-6">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex gap-4 p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Between Services */}
      <section className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevService ? (
              <Link 
                to={`/services/${prevService.slug}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-wider">Previous</span>
                  <p className="font-serif text-foreground">{prevService.shortTitle}</p>
                </div>
              </Link>
            ) : <div />}
            
            {nextService && (
              <Link 
                to={`/services/${nextService.slug}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group text-right"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider">Next</span>
                  <p className="font-serif text-foreground">{nextService.shortTitle}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
