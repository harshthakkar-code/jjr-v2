import { servicesData } from "./services";

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  href: string;
  image?: string;
}

// Static pages
const staticPages: SearchableItem[] = [
  {
    id: "home",
    title: "Home",
    description: "Welcome to JJR SOFTWARE - AI-Powered Product Development",
    content: "JJR SOFTWARE digital agency software development AI machine learning startup growth consulting",
    category: "Page",
    href: "/",
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about our mission, values, and the team behind JJR SOFTWARE.",
    content: "About us mission values team company history experience expertise innovation technology",
    category: "Page",
    href: "/about",
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with our team. We'd love to hear from you.",
    content: "Contact us email phone address location support help inquiry question",
    category: "Page",
    href: "/contact",
  },
  {
    id: "team",
    title: "Our Team",
    description: "Meet the talented professionals who make JJR SOFTWARE great.",
    content: "Team members staff employees professionals experts developers designers engineers",
    category: "Page",
    href: "/team",
  },
  {
    id: "projects",
    title: "Our Projects",
    description: "Explore our portfolio of successful projects and case studies.",
    content: "Projects portfolio case studies work examples clients success stories",
    category: "Page",
    href: "/projects",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Stay updated with the latest insights, tips, and industry news.",
    content: "Blog articles posts news insights tips technology development design",
    category: "Page",
    href: "/blog",
  },
  {
    id: "services",
    title: "Services",
    description: "Discover our comprehensive range of digital services.",
    content: "Services offerings solutions development design consulting AI automation cloud",
    category: "Page",
    href: "/services",
  },
];

// Blog posts for search
const blogPosts: SearchableItem[] = [
  {
    id: "blog-1",
    title: "The Future of AI in Business: Trends to Watch in 2026",
    description: "Explore the latest AI trends that are reshaping how businesses operate and compete in the digital landscape.",
    content: "AI artificial intelligence machine learning business trends technology innovation automation future",
    category: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    id: "blog-2",
    title: "Building Scalable Applications: Best Practices for Startups",
    description: "Learn the essential strategies for building applications that can grow with your business needs.",
    content: "Scalable applications startups best practices development architecture growth performance",
    category: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
  {
    id: "blog-3",
    title: "UX Design Principles That Drive Conversion",
    description: "Discover the key UX design principles that can significantly improve your website's conversion rates.",
    content: "UX design user experience conversion optimization principles usability interface",
    category: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    id: "blog-4",
    title: "How to Choose the Right Tech Stack for Your Project",
    description: "A comprehensive guide to selecting the perfect technology stack for your next software project.",
    content: "Tech stack technology selection development programming frameworks tools",
    category: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop",
  },
  {
    id: "blog-5",
    title: "The Rise of No-Code and Low-Code Platforms",
    description: "Understanding how no-code and low-code platforms are democratizing software development.",
    content: "No-code low-code platforms development democratizing software applications",
    category: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "blog-6",
    title: "Creating Effective Digital Marketing Strategies",
    description: "Learn how to create digital marketing strategies that deliver measurable results for your business.",
    content: "Digital marketing strategies SEO content social media advertising",
    category: "Blog",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
  },
];

// Convert services to searchable items
const serviceItems: SearchableItem[] = servicesData.map((service) => ({
  id: `service-${service.slug}`,
  title: service.title,
  description: service.description,
  content: `${service.aboutContent} ${service.features.map((f) => f.title + " " + f.description).join(" ")}`,
  category: "Service",
  href: `/services/${service.slug}`,
}));

// Combine all searchable content
export const searchableContent: SearchableItem[] = [
  ...staticPages,
  ...serviceItems,
  ...blogPosts,
];

// Normalize text by removing spaces and converting to lowercase
const normalize = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, "");
};

// Search function - space and case insensitive
export const searchContent = (query: string): SearchableItem[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = normalize(query);
  
  return searchableContent.filter((item) => {
    const searchableText = `${item.title} ${item.description} ${item.content}`;
    return normalize(searchableText).includes(normalizedQuery);
  });
};

// Highlight matching text
export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let result = text;
  
  searchTerms.forEach((term) => {
    const regex = new RegExp(`(${term})`, "gi");
    result = result.replace(regex, '<mark class="bg-primary/20 text-primary px-0.5 rounded">$1</mark>');
  });
  
  return result;
};
