import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
}

export const PageHero = ({ title, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
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
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary">{breadcrumb}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
