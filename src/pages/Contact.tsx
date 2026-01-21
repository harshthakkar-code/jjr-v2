import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MapPin, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { isValidEmail, normalizePhone } from "@/lib/googleSheets";
import { submitLead } from "@/lib/leads";

// Removed locations section as per company details - single location in Ahmedabad

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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

    const fullName = `${form.firstName} ${form.lastName}`.trim();

    if (!fullName) {
      setSubmitState({ status: "error", message: "Please enter your name." });
      return;
    }
    if (!form.email.trim() || !isValidEmail(form.email.trim())) {
      setSubmitState({ status: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!form.subject.trim()) {
      setSubmitState({ status: "error", message: "Please enter a subject." });
      return;
    }
    if (!form.message.trim()) {
      setSubmitState({ status: "error", message: "Please enter your message." });
      return;
    }

    setSubmitState({ status: "sending" });

    try {
      await submitLead({
        name: fullName,
        email: form.email.trim(),
        phone: normalizePhone(form.phone),
        subject: form.subject.trim(),
        message: form.message.trim(),
        page: "Contact",
      });

      setSubmitState({
        status: "success",
        message: "Thanks! Your message has been sent successfully.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitState({ status: "error", message: msg });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us"
        description="Get in touch with JJR SOFTWARE in Ahmedabad, Gujarat. Call us at +(91) 94-281-951-57 or email info@jjrsoftware.com for software development services."
        keywords="contact JJR SOFTWARE, software company contact, Ahmedabad software development contact, Gujarat IT services"
        canonical="/contact"
      />
      <Header />
      
      {/* Hero Section with Wave Background */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Gradient wave background */}
        <div className="absolute inset-0">
          <div className="gradient-mesh h-full">
            <div className="gradient-blob gradient-blob-1" />
            <div className="gradient-blob gradient-blob-2" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="container relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                Contact Us Easily Online
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Start your path to digital excellence with our thoroughly selected specialists.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Link to="/about">
                  <Button variant="hero" size="lg">
                    <ArrowRight className="w-4 h-4" />
                    More About Us
                  </Button>
                </Link>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Give Us a Call:</p>
                  <a href="tel:+919428195157" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                    +(91) 94-281-951-57
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information with Map */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Contact Information
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Get in touch with JJR SOFTWARE. Whether you have questions about our services, want to discuss your project, or need technical guidance, our team is ready to help.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address:</h3>
                    <address className="text-muted-foreground text-sm not-italic">
                      Ahmedabad, Gujarat, India
                    </address>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone:</h3>
                    <a href="tel:+919428195157" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      +(91) 94-281-951-57
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email:</h3>
                    <a href="mailto:info@jjrsoftware.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      info@jjrsoftware.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
                alt="Map location"
                className="w-full h-[350px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Ask a Question
              </h2>
              <p className="text-muted-foreground text-lg">
                If you have any questions, you can contact us. Please, fill out the form below.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border"
              onSubmit={handleSubmit}
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="John"
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="+91 94 281 951 57"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full h-14 px-5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-5 py-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              {submitState.status !== "idle" && (
                <div
                  className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
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

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full sm:w-auto"
                disabled={isSending}
              >
                <Send className="w-4 h-4" />
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
