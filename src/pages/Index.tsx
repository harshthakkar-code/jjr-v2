import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HomeProjects } from "@/components/HomeProjects";
import { Testimonials } from "@/components/Testimonials";
import { HomeTeam } from "@/components/HomeTeam";
import { MarqueeStrip } from "@/components/MarqueeStrip";
// import { Pricing } from "@/components/Pricing"; // (disabled) Pricing section
import { Footer } from "@/components/Footer";
import { SEO, getOrganizationSchema, getLocalBusinessSchema } from "@/components/SEO";
import { HomeCta } from "@/components/HomeCta";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Custom Software Development Company in Ahmedabad"
        description="JJR SOFTWARE is a software development company in Ahmedabad, Gujarat providing web, mobile, and enterprise solutions. Expert custom software development services."
        keywords="software development company, custom software development, web development Ahmedabad, mobile app development, software company Gujarat, enterprise solutions"
        canonical="/"
        structuredData={[getOrganizationSchema(), getLocalBusinessSchema()]}
      />
      <Header />
      <Hero />
      <LogoMarquee />
      <Features />
      <Services />
      <WhyChooseUs />
      <HomeProjects />
      <Testimonials />
      <HomeTeam />
      <MarqueeStrip />
      {/* <Pricing /> */}
      <HomeCta />
      <Footer />
    </div>
  );
};

export default Index;
