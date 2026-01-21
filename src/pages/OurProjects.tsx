import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";

const projects = [
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
  { 
    title: "FinVision – Predictive Finance Dashboard", 
    category: "TECHNOLOGY",
    categoryColor: "bg-teal-500",
    description: "Real-time forecasting and personalized investment insights using data modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  { 
    title: "MedAssist – Virtual Health Companion", 
    category: "HEALTHCARE",
    categoryColor: "bg-rose-500",
    description: "AI-powered virtual health assistant for personalized medical guidance.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
  },
  { 
    title: "EduMind – Personalized Learning Hub", 
    category: "AI LEARNING",
    categoryColor: "bg-amber-500",
    description: "EduMind leverages AI to create tailored learning paths for students, offering real-time progress tracking.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
  },
  { 
    title: "WorkSync – AI-Powered Team Collaboration Tool", 
    category: "WORKPLACE TECH",
    categoryColor: "bg-cyan-600",
    description: "Smart collaboration platform that uses AI to optimize team productivity and communication.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
  },
];

const OurProjects = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Projects"
        description="Explore our portfolio of successful software development projects. See how JJR SOFTWARE delivers innovative solutions for clients in Ahmedabad, Gujarat and beyond."
        keywords="software development portfolio, IT projects, software company projects, Ahmedabad software projects, case studies"
        canonical="/projects"
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Our Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              We build bold ideas, powered by AI and human creativity, that push boundaries and spark growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${project.categoryColor}`}>
                    {project.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurProjects;
