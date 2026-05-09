// ─── Portfolio data ───────────────────────────────────────────────────────────
export const HERO_TAGLINES = [
  "Full-Stack Developer",
  "Shopify Expert",
  "3D Web Engineer",
  "Performance Architect",
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Projects Shipped", value: 15, suffix: "+" },
  { label: "Shopify Stores", value: 8, suffix: "" },
  { label: "GPA", value: 3.86, suffix: "" },
];

// ─── Particles (shared background decoration) ─────────────────────────────────
export const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const h = (i * 2654435761) >>> 0;
  return {
    id: i,
    left: `${h % 97}%`,
    delay: `${(h >> 4) % 12}s`,
    duration: `${10 + ((h >> 8) % 10)}s`,
    size: 3 + ((h >> 12) % 4),
    colorIdx: i % 3,
  };
});

export const PARTICLE_COLORS = [
  "rgba(139,158,108,0.6)",
  "rgba(212,168,67,0.5)",
  "rgba(74,127,165,0.45)",
];

// ─── Tech Stack by Category ───────────────────────────────────────────────────
export interface TechCategory {
  id: string;
  label: string;
  emoji: string;
  accentRgb: string;
  techs: string[];
  description: string;
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🎨",
    accentRgb: "74,127,165",
    description: "Crafting responsive, interactive UIs with modern frameworks and animations",
    techs: [
      "React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3",
      "Tailwind CSS", "Material UI", "Redux", "Redux Toolkit", "Zustand",
      "Motion.js", "React Router DOM",
    ],
  },
  {
    id: "3d-canvas",
    label: "3D & Canvas",
    emoji: "🧊",
    accentRgb: "139,158,108",
    description: "WebGL-powered 3D/2D graphics and canvas manipulation without plugins",
    techs: ["Three.js", "Fabric.js", "WebGL", "Canvas API"],
  },
   {
    id: "orm-query",
    label: "ORM & Query",
    emoji: "🗄️",
    accentRgb: "212,168,67",
    description: "Type-safe database access, query building and performance tuning",
    techs: ["TypeORM", "Sequelize", "Kysely", "GroupBy", "SQL", "NoSQL"],
  },
  {
    id: "backend",
    label: "Backend",
    emoji: "⚙️",
    accentRgb: "139,158,108",
    description: "Scalable APIs, microservices, and event-driven systems",
    techs: [
      "Node.js", "Express.js", "TRPC", "Inversify", "ArkType",
      "JWT", "MVC", "Job Queues", "Event Listeners", "SWC/core",
      "Middleware", "REST APIs",
    ],
  },
  {
    id: "image",
    label: "Image Processing",
    emoji: "🖼️",
    accentRgb: "139,158,108",
    description: "High-performance image transformation, optimization and format handling",
    techs: [
      "Sharp (WebP · GIF · High-perf)", "Jimp",
      "PNG (transparency)", "JPEG (no transparency)",
      "Cloudflare Images",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    emoji: "💾",
    accentRgb: "74,127,165",
    description: "Relational and NoSQL databases hosted across modern platforms",
    techs: ["PostgreSQL (Neon)", "MySQL", "MongoDB", "NoSQL", "Redis"],
  },
 
  {
    id: "shopify",
    label: "Shopify",
    emoji: "🛍️",
    accentRgb: "212,168,67",
    description: "Custom Shopify experiences from storefronts to 3D product tools",
    techs: [
      "Hydrogen", "Oxygen", "Liquid", "Metaobjects",
      "Shopify API", "3D Product Customization",
    ],
  },
  {
    id: "devtools",
    label: "Dev Tools & Other",
    emoji: "🔧",
    accentRgb: "74,127,165",
    description: "Tooling, integrations and advanced browser APIs",
    techs: [
      "Git", "GitHub", "Bitbucket", "Jira", "OpenAI", "Chrome Extensions",
      "IP Registry", "ResizeObserver", "process.env", "process.argv",
    ],
  },


  {
    id: "deployment",
    label: "Deployment & Infra",
    emoji: "🚀",
    accentRgb: "74,127,165",
    description: "Zero-downtime deployments across cloud and edge platforms",
    techs: [
      "Fly.io (frontend + backend)", "Vercel", "Oxygen (Shopify)",
      "Cloudflare (CDN · Images)", "Neon DB", "AWS S3 → Cloudflare R2",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    emoji: "📱",
    accentRgb: "212,168,67",
    description: "Cross-platform mobile development",
    techs: ["React Native", "Dart", "Flutter"],
  },

    {
    id: "testing",
    label: "Testing",
    emoji: "🧪",
    accentRgb: "139,158,108",
    description: "Automated unit, integration and end-to-end test coverage",
    techs: ["Jest", "Playwright"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  name: string;
  url: string;
  description: string;
  tags: string[];
  category: "fullstack" | "shopify" | "freelance";
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Brando",
    url: "https://brando.no",
    description:
      "Full-stack Norwegian brand platform. Built with React, Node.js and PostgreSQL. Deployed on Fly.io with Cloudflare for asset delivery.",
    tags: ["React", "Node.js", "PostgreSQL", "Cloudflare"],
    category: "fullstack",
    accent: "74,127,165",
  },
  {
    name: "Sainte",
    url: "https://sainte.fly.dev",
    description:
      "Modern web application with event-driven backend, Kysely-powered database layer and full Playwright test suite.",
    tags: ["Node.js", "Kysely", "TypeScript", "Playwright"],
    category: "fullstack",
    accent: "139,158,108",
  },
  {
    name: "Sparknow",
    url: "https://sparknow.fly.dev",
    description:
      "Feature-rich SaaS platform with job queues, TRPC, Sharp image processing and SWC-compiled backend.",
    tags: ["TRPC", "Sharp", "Job Queues", "TypeScript", "Fly.io"],
    category: "fullstack",
    accent: "212,168,67",
  },
  {
    name: "AK",
    url: "https://ak-new.fly.dev",
    description:
      "Furniture showcase platform built with React, Node.js and PostgreSQL. Features smooth animations and a modern storefront experience, deployed on Fly.io.",
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    category: "fullstack",
    accent: "0,212,255",
  },
  {
    name: "Zaher Rumman",
    url: "https://zaher-rumman-2.vercel.app",
    description:
      "Freelance project — personal portfolio/showcase site built with Next.js, deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Vercel"],
    category: "freelance",
    accent: "212,168,67",
  },
];

// ─── Shopify Stores ───────────────────────────────────────────────────────────
export interface ShopifyStore {
  name: string;
  url: string;
  niche: string;
}

export const SHOPIFY_STORES: ShopifyStore[] = [
  { name: "Athlora", url: "https://athlora.ca", niche: "Fitness Apparel" },
  { name: "Arch Angel", url: "https://arch-angel-shop.myshopify.com", niche: "Streetwear" },
  { name: "Discipline AU", url: "https://disciplineau.myshopify.com", niche: "Performance Wear" },
  { name: "Legends Barbell", url: "https://legendsbarbell.myshopify.com", niche: "Powerlifting" },
  { name: "Game Athletics", url: "https://gameathletics.myshopify.com", niche: "Sport & Gaming" },
  { name: "Morfactive", url: "https://morfactive.myshopify.com", niche: "Active Lifestyle" },
  { name: "Numuv", url: "https://numuveshop.myshopify.com", niche: "Lifestyle" },
  { name: "WetSkin", url: "https://shopwetskin.myshopify.com", niche: "Skincare" },
  { name: "Hyparx Fitness", url: "https://hyparxfitness.myshopify.com", niche: "Fitness" },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  accent: string;
}

export const EXPERIENCES: Experience[] = [
  {
    company: "FITTDESIGN",
    role: "Full-Stack Developer",
    period: "2025 – Present",
    location: "Beirut, On-site",
    type: "Full-time",
    accent: "139,158,108",
    highlights: [
      "Built flexible admin panel (similar to Shopify) for non-developer content management",
      "Developed 3D product customization tool using Three.js + Fabric.js for text/image on models",
      "Optimized backend with Kysely; implemented Jest & Playwright automated tests",
      "Caching, job queues, workflows and event-driven analytics; deployed on Fly.io",
      "Migrated Liquid sites to React; moved assets from AWS S3 → Cloudflare R2",
      "Chrome Extension with OpenAI integration for email summarization & smart Q&A",
    ],
  },
  {
    company: "ETE-Services",
    role: "Full-Stack Developer",
    period: "2024 – 2025",
    location: "Remote",
    type: "Full-time",
    accent: "74,127,165",
    highlights: [
      "Engineered responsive web apps with Next.js, Redux Toolkit, TypeScript, Node.js",
      "Built scalable backends using Inversify (DI), TypeORM, MySQL and MongoDB",
      "Optimized DB queries for speed; managed solo projects under tight deadlines",
      "Used Cheerio to convert HTML to Excel with Arabic/English text support",
      "Integrated Stripe payment gateway, JWT auth, and CRUD operations",
    ],
  },
];

// ─── Mobile Apps ──────────────────────────────────────────────────────────────
export interface MobileApp {
  name: string;
  playStoreUrl: string;
  appStoreUrl: string;
  category: string;
  shortDescription: string;
  features: string[];
  tags: string[];
  accent: string;
  emoji: string;
  downloads: string;
  platform: "android" | "ios" | "both";
}

export const MOBILE_APPS: MobileApp[] = [
  {
    name: "HISENSE IRAQ",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.eteservices.hisenseiraq",
    appStoreUrl: "https://apps.apple.com/lb/app/hisense-iraq/id6741577388",
    category: "Tools · Utilities",
    shortDescription:
      "A B2B mobile platform for professional AC technicians to register installation jobs, track work history, and earn rewards through Hisense Iraq's incentive program.",
    features: [
      "Easy job registration with customer & AC details",
      "Rewards & incentive program per installation",
      "Proof of work uploads — photos, invoices, signatures",
      "Real-time notifications & performance analytics",
    ],
    tags: ["React Native", "Mobile", "B2B", "Tools"],
    accent: "0,212,255",
    emoji: "❄️",
    downloads: "1K+",
    platform: "both",
  },
  {
    name: "Escapyo",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.eteservices.escapyo",
    appStoreUrl: "https://apps.apple.com/lb/app/escapyo/id6744685301",
    category: "Travel & Local",
    shortDescription:
      "The ultimate travel companion for discovering top-rated tourist destinations, restaurants, hotels, rooftop bars, and hidden gems — all in one app.",
    features: [
      "Browse top-rated attractions & hidden gems",
      "Explore detailed reviews, ratings & menus",
      "Find experiences tailored to your preferences",
      "Plan the perfect outing with ease",
    ],
    tags: ["React Native", "Mobile", "Travel", "Discovery"],
    accent: "168,85,247",
    emoji: "🌍",
    downloads: "5+",
    platform: "both",
  },
];

// ─── Ghost words (parallax bg decoration) ─────────────────────────────────────
export const GHOST_WORDS = ["CODE", "BUILD", "SHIP", "SCALE", "CREATE"];
export const GHOST_CONFIG = [
  { left: "-2%", top: "8%", pSpeed: 0.14, reverse: false },
  { left: "22%", top: "28%", pSpeed: 0.08, reverse: true },
  { left: "58%", top: "5%", pSpeed: 0.18, reverse: false },
  { left: "72%", top: "42%", pSpeed: 0.06, reverse: true },
  { left: "6%", top: "60%", pSpeed: 0.11, reverse: false },
];
