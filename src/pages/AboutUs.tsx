import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const teamMembers = [
  { name: "Ryan Chen", role: "Full-Stack Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
  { name: "Liam Carter", role: "Front-End Developer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face" },
  { name: "Daniel Foster", role: "Back-End Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" },
  { name: "Ethan White", role: "AI Solutions Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
];

const projects = [
  { 
    title: "EduMind – Personalized Learning Hub", 
    category: "AI LEARNING",
    categoryColor: "bg-amber-500",
    description: "EduMind leverages AI to create tailored learning paths for students, offering real-time progress tracking.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
  },
  { 
    title: "NovaHire – AI Recruitment Platform", 
    category: "TECHNOLOGY",
    categoryColor: "bg-teal-500",
    description: "Automated candidate screening, matching, and outreach using machine learning.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
  },
  { 
    title: "RetailSense – Smart Store Analytics", 
    category: "RETAIL",
    categoryColor: "bg-purple-500",
    description: "AI-powered shopper insights and predictive inventory management for global retail chains.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
  },
];

const testimonials = [
  {
    quote: "The software solutions they developed for us have completely streamlined our workflow. Their team understood the complexity of our electronics systems and delivered a seamless integration.",
    author: "Talia M.",
    role: "CTO at Nexon Electronics",
    rating: 5
  },
  {
    quote: "We needed a custom platform for device monitoring, and they built exactly what we envisioned. The reliability and performance of their software has greatly improved our efficiency.",
    author: "André R.",
    role: "Product Manager at VoltTech",
    rating: 4
  },
  {
    quote: "Their engineers are not only skilled but also very responsive. From concept to deployment, they provided outstanding support and helped us scale our smart devices faster.",
    author: "Jessie L.",
    role: "CEO at CircuitWave",
    rating: 5
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us"
        description="Learn about JJR SOFTWARE - a leading software development company in Ahmedabad, Gujarat. Our mission, values, and expertise in custom software solutions."
        keywords="About JJR SOFTWARE, software company Ahmedabad, about software development company, Gujarat IT company"
        canonical="/about"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="gradient-mesh">
          <div className="gradient-blob gradient-blob-1" />
          <div className="gradient-blob gradient-blob-2" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="section-label mb-4 block">About Us</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Why we are the best
            </h1>
            <p className="text-lg text-muted-foreground">
              By combining innovation with technical expertise, we help businesses optimize performance, connect systems, and bring new ideas to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are a team of passionate innovators dedicated to building modern solutions for businesses that want to grow, adapt, and thrive. Our mission is to combine creativity, technology, and strategy to deliver meaningful results for our clients.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a focus on collaboration and transparency, we bring fresh ideas and practical expertise to every project. From concept to execution, we are committed to excellence, ensuring that each solution is tailored to meet the unique needs of those we serve. Together, we transform challenges into opportunities and visions into reality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="section-label mb-4 block">Meet Our Experts</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Meet the Professional Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-4 rounded-2xl overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-serif text-lg text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/team">
              <Button variant="hero" size="lg">
                <ArrowRight className="w-4 h-4" />
                Meet the Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
            <div>
              <span className="section-label mb-4 block">What we offer</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Explore Our Projects
              </h2>
            </div>
            <Link to="/projects">
              <Button variant="hero" size="lg">
                <ArrowRight className="w-4 h-4" />
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${project.categoryColor}`}>
                    {project.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16"
          >
            Our Clients Reviews
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="section-label mb-4 block">Your Product Could Be Next</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Let's Build Your Next Big Thing Together
            </h2>
            <p className="text-muted-foreground mb-8">
              With JJR SOFTWARE, you don&apos;t just build faster — you build smarter. Let&apos;s make your launch unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  <ArrowRight className="w-4 h-4" />
                  Get Started Now
                </Button>
              </Link>
              <Button variant="hero-outline" size="lg">
                <ArrowRight className="w-4 h-4" />
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
