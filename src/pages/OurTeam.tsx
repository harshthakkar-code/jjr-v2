import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { SEO } from "@/components/SEO";
import { isValidEmail } from "@/lib/googleSheets";
import { submitLead } from "@/lib/leads";

const teamMembers = [
  { name: "Sara Thompson", role: "Startup Growth Strategist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face" },
  { name: "Daniel Foster", role: "Back-End Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face" },
  { name: "Liam Carter", role: "Front-End Developer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face" },
  { name: "Ryan Chen", role: "Full-Stack Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
  { name: "Maya Brooks", role: "Lead UX/UI Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face" },
  { name: "Ethan White", role: "AI Solutions Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
];

const OurTeam = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<{
    status: "idle" | "sending" | "success" | "error";
    message?: string;
  }>({ status: "idle" });
  const isSending = submitState.status === "sending";

  useEffect(() => {
    if (submitState.status !== "success" && submitState.status !== "error") return;
    const t = window.setTimeout(() => setSubmitState({ status: "idle" }), 5000);
    return () => window.clearTimeout(t);
  }, [submitState.status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    if (!form.name.trim()) {
      setSubmitState({ status: "error", message: "Please enter your name." });
      return;
    }
    if (!form.email.trim() || !isValidEmail(form.email.trim())) {
      setSubmitState({ status: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!form.message.trim()) {
      setSubmitState({ status: "error", message: "Please enter your message." });
      return;
    }

    setSubmitState({ status: "sending" });
    try {
      await submitLead({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: "",
        subject: "Team Page Inquiry",
        message: form.message.trim(),
        page: "Our Team",
      });
      setSubmitState({
        status: "success",
        message: "Thanks! We received your message.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitState({ status: "error", message: msg });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Team"
        description="Meet the talented professionals at JJR SOFTWARE - expert developers, designers, and strategists delivering exceptional software solutions in Ahmedabad, Gujarat."
        keywords="JJR SOFTWARE team, software development team, Ahmedabad developers, IT professionals Gujarat"
        canonical="/team"
      />
      <Header />
      
      <PageHero title="Our Team" breadcrumb="Our Team" />

      {/* Team Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[3/4] bg-secondary">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Talk to Our Team and Unlock New Opportunities
              </h2>
              <p className="text-muted-foreground mb-8">
                If you have any questions, you can contact us. Please, fill out the form below.
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                />
                {submitState.status !== "idle" && (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      submitState.status === "success"
                        ? "border-primary/30 bg-primary/10 text-foreground"
                        : submitState.status === "error"
                          ? "border-destructive/30 bg-destructive/10 text-foreground"
                          : "border-border bg-secondary/40 text-foreground"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitState.message}
                  </div>
                )}

                <Button variant="hero" size="lg" type="submit" disabled={isSending}>
                  <Send className="w-4 h-4" />
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;
