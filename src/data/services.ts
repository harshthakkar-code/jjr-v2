export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  aboutTitle: string;
  aboutContent: string;
  features: {
    title: string;
    description: string;
  }[];
  gradient: string;
}

export const servicesData: ServiceData[] = [
  {
    slug: "ai-accelerated-product-development",
    title: "AI-Accelerated Product Development",
    shortTitle: "AI-Accelerated Product Development",
    description: "We combine advanced AI tools with expert engineering to take your concept from idea to MVP in record time — without sacrificing quality.",
    aboutTitle: "About AI-Accelerated Product Development",
    aboutContent: "AI-Accelerated Product Development leverages advanced artificial intelligence to streamline the entire product lifecycle. From idea validation and market research to design, prototyping, and iterative testing, this service speeds up development, reduces costs, and minimizes risks. By combining AI-driven insights with agile methodologies, businesses can bring innovative products to market faster, with smarter decisions at every stage.",
    features: [
      {
        title: "Faster Time-to-Market",
        description: "We leverage AI-driven tools to streamline research, prototyping, and testing, helping your product reach customers significantly faster."
      },
      {
        title: "Smarter Decision-Making",
        description: "Our AI models analyze vast amounts of data, enabling data-backed insights that guide design, features, and market positioning."
      },
      {
        title: "Cost-Efficient Development",
        description: "By automating repetitive tasks and optimizing workflows, we reduce unnecessary expenses while maintaining top quality."
      },
      {
        title: "Personalized User Experiences",
        description: "We build AI-powered products that adapt to users' behaviors, increasing engagement, satisfaction, and retention."
      },
      {
        title: "Scalable Innovation",
        description: "Our approach ensures that your product can grow seamlessly, supported by future-ready AI architectures and automation."
      }
    ],
    gradient: "from-pink-200/40 via-purple-200/30 to-blue-200/40"
  },
  {
    slug: "custom-software-app-development",
    title: "Custom Software & App Development",
    shortTitle: "Custom Software & App Development",
    description: "From mobile apps to web platforms, we build scalable, high-performance solutions tailored to your market and business needs.",
    aboutTitle: "About Custom Software & App Development",
    aboutContent: "Our Custom Software & App Development service delivers tailored solutions designed to meet your unique business requirements. We build everything from mobile applications to enterprise-grade web platforms, ensuring scalability, security, and exceptional user experiences. Our agile development process keeps you in the loop at every stage, from initial concept to final deployment.",
    features: [
      {
        title: "Tailored Solutions",
        description: "Every line of code is written with your specific business needs in mind, ensuring a perfect fit for your operations."
      },
      {
        title: "Cross-Platform Development",
        description: "We build applications that work seamlessly across web, iOS, and Android, maximizing your reach and user engagement."
      },
      {
        title: "Scalable Architecture",
        description: "Our solutions are designed to grow with your business, handling increased load and new features with ease."
      },
      {
        title: "Agile Methodology",
        description: "Regular sprints and continuous feedback ensure your project stays on track and adapts to changing requirements."
      },
      {
        title: "Quality Assurance",
        description: "Rigorous testing at every stage guarantees a polished, bug-free product ready for your users."
      }
    ],
    gradient: "from-orange-200/40 via-yellow-200/30 to-pink-200/40"
  },
  {
    slug: "prototyping-ux-design",
    title: "Prototyping & UX Design",
    shortTitle: "Prototyping & UX Design",
    description: "Rapidly test ideas with interactive AI-generated prototypes and data-backed design decisions that put users first.",
    aboutTitle: "About Prototyping & UX Design",
    aboutContent: "Our Prototyping & UX Design service transforms your ideas into interactive, user-tested prototypes before a single line of production code is written. We use AI-powered tools to accelerate the design process while ensuring every decision is backed by user research and data. The result is a product that not only looks beautiful but delivers an exceptional user experience.",
    features: [
      {
        title: "Rapid Prototyping",
        description: "Go from concept to clickable prototype in days, not weeks, allowing faster validation of your ideas."
      },
      {
        title: "User Research",
        description: "We conduct thorough user research to understand your audience's needs, behaviors, and pain points."
      },
      {
        title: "Interactive Wireframes",
        description: "High-fidelity wireframes that demonstrate the full user flow, ready for stakeholder review and user testing."
      },
      {
        title: "Design System Creation",
        description: "We build comprehensive design systems that ensure consistency across your entire product ecosystem."
      },
      {
        title: "Usability Testing",
        description: "Real user feedback guides design iterations, ensuring your product meets user expectations."
      }
    ],
    gradient: "from-blue-200/40 via-purple-200/30 to-pink-200/40"
  },
  {
    slug: "ai-integration-automation",
    title: "AI Integration & Automation",
    shortTitle: "AI Integration & Automation",
    description: "Enhance your product with AI features — from predictive analytics to smart chatbots — to improve efficiency and user engagement.",
    aboutTitle: "About AI Integration & Automation",
    aboutContent: "Our AI Integration & Automation service empowers your business with cutting-edge artificial intelligence capabilities. Whether you need intelligent chatbots, predictive analytics, or automated workflows, we seamlessly integrate AI into your existing systems. The result is improved operational efficiency, better decision-making, and enhanced user experiences that set you apart from the competition.",
    features: [
      {
        title: "Intelligent Chatbots",
        description: "Deploy AI-powered conversational agents that provide 24/7 customer support and improve user engagement."
      },
      {
        title: "Predictive Analytics",
        description: "Leverage machine learning models to forecast trends, identify opportunities, and make data-driven decisions."
      },
      {
        title: "Process Automation",
        description: "Automate repetitive tasks and workflows, freeing your team to focus on high-value activities."
      },
      {
        title: "Natural Language Processing",
        description: "Extract insights from unstructured text data, enabling smarter search, classification, and analysis."
      },
      {
        title: "Computer Vision",
        description: "Implement image and video analysis capabilities for quality control, security, and user experiences."
      }
    ],
    gradient: "from-purple-200/40 via-pink-200/30 to-orange-200/40"
  },
  {
    slug: "cloud-architecture-devops",
    title: "Cloud Architecture & DevOps",
    shortTitle: "Cloud Architecture & DevOps",
    description: "Deploy with confidence. We design secure, scalable, and cost-efficient cloud infrastructure, with automated testing and CI/CD pipelines.",
    aboutTitle: "About Cloud Architecture & DevOps",
    aboutContent: "Our Cloud Architecture & DevOps service ensures your applications are built on a solid, scalable foundation. We design and implement cloud infrastructure that handles growth effortlessly while maintaining security and cost efficiency. Our DevOps practices automate testing, deployment, and monitoring, enabling rapid, reliable releases and reduced time-to-market.",
    features: [
      {
        title: "Cloud Infrastructure Design",
        description: "We architect scalable, secure cloud environments on AWS, Azure, or GCP tailored to your needs."
      },
      {
        title: "CI/CD Pipelines",
        description: "Automated build, test, and deployment pipelines ensure rapid, reliable software releases."
      },
      {
        title: "Infrastructure as Code",
        description: "Version-controlled infrastructure definitions enable reproducible, auditable deployments."
      },
      {
        title: "Monitoring & Observability",
        description: "Comprehensive monitoring and alerting keep you informed of system health and performance."
      },
      {
        title: "Security & Compliance",
        description: "Built-in security best practices and compliance frameworks protect your data and users."
      }
    ],
    gradient: "from-cyan-200/40 via-blue-200/30 to-purple-200/40"
  },
  {
    slug: "startup-growth-consulting",
    title: "Startup Growth Consulting",
    shortTitle: "Startup Growth Consulting",
    description: "We're more than a dev shop — we help you refine your business model, optimize workflows, and prepare for funding rounds.",
    aboutTitle: "About Startup Growth Consulting",
    aboutContent: "Our Startup Growth Consulting service goes beyond development to help you build a sustainable, scalable business. We work with founders to refine product-market fit, optimize operations, and prepare for investment rounds. Drawing on our experience with numerous startups, we provide strategic guidance that accelerates your path to success.",
    features: [
      {
        title: "Business Model Refinement",
        description: "We help you identify and validate the most promising revenue models for your product and market."
      },
      {
        title: "Go-to-Market Strategy",
        description: "Develop a clear, actionable strategy for launching and scaling your product in the market."
      },
      {
        title: "Pitch Deck Preparation",
        description: "Craft compelling narratives and materials that resonate with investors and stakeholders."
      },
      {
        title: "Operational Optimization",
        description: "Streamline your processes and workflows to maximize efficiency and minimize costs."
      },
      {
        title: "Funding Round Preparation",
        description: "Get ready for seed, Series A, or beyond with thorough preparation and strategic positioning."
      }
    ],
    gradient: "from-yellow-200/40 via-orange-200/30 to-red-200/40"
  }
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};
