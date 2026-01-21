import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SearchModal } from "./SearchModal";

interface NavItem {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", hasDropdown: false },
  { 
    label: "Services", 
    href: "/services", 
    hasDropdown: true,
    dropdownItems: [
      { label: "AI-Accelerated Product Development", href: "/services/ai-accelerated-product-development" },
      { label: "Custom Software & App Development", href: "/services/custom-software-app-development" },
      { label: "Prototyping & UX Design", href: "/services/prototyping-ux-design" },
      { label: "AI Integration & Automation", href: "/services/ai-integration-automation" },
      { label: "Cloud Architecture & DevOps", href: "/services/cloud-architecture-devops" },
      { label: "Startup Growth Consulting", href: "/services/startup-growth-consulting" },
    ]
  },
  // { label: "Pricing", href: "#pricing", hasDropdown: false }, // (disabled) Pricing section
  { 
    label: "Pages", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      { label: "About Us", href: "/about" },
      { label: "Our Projects", href: "/projects" },
      { label: "Our Team", href: "/team" },
      { label: "Blog", href: "/blog" },
    ]
  },
  { label: "Contacts", href: "/contact", hasDropdown: false },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide header when scrolling down past threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      }
      // Only show header when at the top of the page
      else if (currentScrollY <= 50) {
        setIsHidden(false);
      }
      // Keep hidden when scrolling up (don't show again)
      
      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.hasDropdown) {
      e.preventDefault();
      setOpenDropdown(openDropdown === item.label ? null : item.label);
    } else if (item.href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isHidden ? -100 : 0, 
        opacity: isHidden ? 0 : 1 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/logo.png"
              alt="JJR SOFTWARE - Custom Software Development Company"
              className="h-10 md:h-12 w-auto object-contain max-w-[200px]"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          ref={dropdownRef}
          className={`hidden lg:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-card"
              : "bg-white/70 backdrop-blur-sm"
          }`}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.hasDropdown ? (
                <button
                  onClick={(e) => handleNavClick(item, e)}
                  className={`flex items-center gap-1 px-5 py-2.5 text-sm font-medium transition-colors rounded-full hover:bg-secondary/50 ${
                    openDropdown === item.label ? "text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : item.href.startsWith("/") ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-5 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-secondary/50"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className="flex items-center gap-1 px-5 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-secondary/50"
                >
                  {item.label}
                </a>
              )}
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.hasDropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 mt-2 bg-white rounded-xl shadow-elevated border border-border py-2 z-50 ${
                      item.label === "Services" ? "w-[600px] flex" : "w-48"
                    }`}
                  >
                    {item.label === "Services" ? (
                      <>
                        {/* Services List */}
                        <div className="flex-1 p-4">
                          <h4 className="font-serif text-sm text-foreground mb-3 px-2">All Services</h4>
                          <div className="space-y-1">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                to={dropdownItem.href}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* CTA Image Section */}
                        <div className="w-64 p-3">
                          <div className="relative h-full rounded-xl overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                              alt="Get in touch"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-foreground/40 flex flex-col items-center justify-center text-center p-4">
                              <p className="text-white font-serif text-lg mb-3">Every project starts with a conversation</p>
                              <Link 
                                to="/contact"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-foreground rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <ArrowRight className="w-4 h-4" />
                                Get in Touch
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button 
            onClick={() => setSearchOpen(true)}
            className="p-2.5 text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-secondary/50"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/contact">
            <Button variant="nav" size="default">
              <ArrowRight className="w-4 h-4" />
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-full bg-white/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md mt-4 mx-4 rounded-2xl shadow-elevated overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-secondary rounded-xl transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 overflow-hidden"
                          >
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                to={dropdownItem.href}
                                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-secondary rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-secondary rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="hero" className="mt-4 w-full">
                  <ArrowRight className="w-4 h-4" />
                  Get Started
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </motion.header>
  );
};
