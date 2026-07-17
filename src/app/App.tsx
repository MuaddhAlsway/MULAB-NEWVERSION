import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Instagram, ExternalLink, X, ChevronLeft, BookOpen, FileText, GitBranch } from "lucide-react";
import { projects as importedProjects } from "./data/projects";
import { FeaturedClients } from "./components/FeaturedClients";
import { CaseStudyPage } from "./components/CaseStudyPage";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: 'fullstack' | 'htmlcssjs' | 'htmlcss' | 'c';
  features?: string[];
  challenges?: string;
  learnings?: string;
  image: string;
  github?: string;
  live?: string;
  linkedin?: string;
  notion?: string;
  wiki?: string;
  diagram?: string;
  client?: string;
  duration?: string;
}

interface FullProject {
  id: number;
  num: string;
  title: string;
  shortDesc: string;
  overview: string;
  problem: string;
  solution: string;
  category: string;
  categorySlug: string;
  year: string;
  tech: string[];
  image: string;
  screenshots: string[];
  alt: string;
  results: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  linkedinUrl?: string;
  notionUrl?: string;
  wikiUrl?: string;
  diagramUrl?: string;
}

// Convert imported projects to match component interface
const transformProject = (p: Project, idx: number) => ({
  id: p.id,
  num: String(idx + 1).padStart(2, '0'),
  title: p.name,
  shortDesc: p.description,
  overview: p.longDescription || p.description,
  problem: p.challenges?.split('.')[0] || "Building with modern technologies",
  solution: p.learnings?.split('.')[0] || "Implemented best practices",
  category: p.category,
  categorySlug: p.category,
  year: new Date().getFullYear().toString(),
  tech: p.tech,
  image: p.image, // Keep original path from projects.ts
  screenshots: [p.image], // Use cover image as screenshot
  alt: p.name,
  results: p.features || [],
  liveUrl: p.live || "#",
  githubUrl: p.github || "#",
  linkedinUrl: p.linkedin || undefined,
  notionUrl: p.notion || undefined,
  wikiUrl: p.wiki || undefined,
  diagramUrl: p.diagram || undefined,
  featured: p.id <= 3,
});

const ALL_PROJECTS = importedProjects.map((p) => transformProject(p as any, importedProjects.indexOf(p)));

// Fallback projects if import fails
const FALLBACK_PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Nexus Dashboard",
    shortDesc: "Real-time analytics platform built for enterprise decision-making at scale.",
    overview: "Nexus Dashboard is an enterprise-grade analytics platform that transforms raw data into actionable intelligence. Built from the ground up with performance as a first principle, it handles millions of data points while maintaining sub-100ms render times.",
    problem: "A Fortune 500 client needed a unified view of their global operations — 14 separate legacy dashboards that each told a different story. Teams were spending 3+ hours daily reconciling conflicting reports.",
    solution: "I architected a single source of truth using React with a custom D3.js rendering layer, backed by a WebSocket real-time data pipeline. The interface collapses 14 views into one adaptive layout with intelligent data hierarchy.",
    category: "Web Application",
    categorySlug: "web-apps",
    year: "2024",
    tech: ["React", "TypeScript", "D3.js", "WebSocket", "Tailwind CSS", "Vite"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Abstract colorful digital visualization",
    results: ["40% faster decision cycles", "3h → 12min daily reporting time", "98 Lighthouse performance score", "Zero reported data discrepancies in Q1 2024"],
    liveUrl: "https://nexus.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: true,
  },
  {
    id: 2,
    num: "02",
    title: "Void Commerce",
    shortDesc: "Dark-mode e-commerce experience designed to convert through atmosphere.",
    overview: "Void Commerce is a fashion e-commerce platform that proves dark themes can outperform light themes in conversion. Every element — from micro-copy to checkout flow — was obsessively tested and refined.",
    problem: "The brand's existing Shopify store felt generic. High bounce rates on mobile (74%) and a 1.2% conversion rate told the story: the experience wasn't matching the premium product.",
    solution: "Custom Next.js storefront with server components for instant page loads, Stripe integration with a 2-step checkout, and a motion-rich UI that creates product desire through atmosphere rather than aggressive CTAs.",
    category: "E-Commerce",
    categorySlug: "e-commerce",
    year: "2024",
    tech: ["Next.js", "TypeScript", "Stripe", "Framer Motion", "Prisma", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Retro neon computer monitor",
    results: ["Bounce rate dropped from 74% to 31%", "Conversion rate: 1.2% → 4.7%", "Mobile revenue +210% in 60 days", "Checkout completion +88%"],
    liveUrl: "https://void.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 3,
    num: "03",
    title: "Aura Design System",
    shortDesc: "Component library and design language adopted across eight product teams.",
    overview: "Aura is a full-scale design system encompassing 120+ components, design tokens, documentation, and an interactive Storybook — all built to serve a multi-team engineering org.",
    problem: "Eight teams, eight inconsistent UIs. Redesigning any single component required touching 40+ files. Designer-developer handoff was costing 2 days per sprint.",
    solution: "A monorepo-based design system with CSS custom properties as the single source of truth, a Figma plugin for token syncing, and automated visual regression testing that runs on every PR.",
    category: "Design System",
    categorySlug: "web-apps",
    year: "2023",
    tech: ["React", "Storybook", "CSS Variables", "Figma API", "TypeScript", "Rollup"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Minimal developer workspace with clean design",
    results: ["120+ production-ready components", "Handoff time cut by 60%", "Zero visual regressions in 8 months", "Adopted by 8 teams within 3 weeks"],
    liveUrl: "https://aura.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 4,
    num: "04",
    title: "Orbital Analytics",
    shortDesc: "Three.js-powered data visualization platform with real-time orbital simulations.",
    overview: "Orbital Analytics is a WebGL-based data visualization tool that maps complex relational datasets to interactive 3D orbital systems. Data relationships become instantly legible through spatial metaphor.",
    problem: "A data science team needed to present network relationship data to non-technical stakeholders. Spreadsheets and 2D charts failed to convey the structural complexity of their findings.",
    solution: "Built a Three.js rendering engine with custom shaders, orbit controls, and a data ingestion pipeline that maps CSV/JSON to 3D node graphs. Force-directed layout ensures legibility regardless of dataset size.",
    category: "Dashboard",
    categorySlug: "dashboards",
    year: "2023",
    tech: ["Three.js", "WebGL", "GSAP", "React", "TypeScript", "D3-force"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "3D data visualization orbital system",
    results: ["Datasets up to 50,000 nodes at 60fps", "Stakeholder comprehension +300%", "Winner — Data Viz Awards 2023", "Featured in Awwwards collection"],
    liveUrl: "https://orbital.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 5,
    num: "05",
    title: "Phantom Studio",
    shortDesc: "Award-winning creative agency landing page with cinematic WebGL transitions.",
    overview: "Phantom Studio is the digital home of a boutique creative agency — a landing page that had to exemplify everything the agency stands for: bold vision, technical mastery, and storytelling.",
    problem: "A previous agency site was lost a pitch to a competitor whose portfolio site alone closed the deal. The new site needed to be the pitch.",
    solution: "Full-screen WebGL transitions between sections using custom GLSL shaders, GSAP ScrollTrigger for scene-based storytelling, and a Three.js particle system that responds to user scroll velocity.",
    category: "Landing Page",
    categorySlug: "landing-pages",
    year: "2023",
    tech: ["Next.js", "Three.js", "GSAP", "GLSL Shaders", "TypeScript", "Lenis"],
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1612832020382-2e8e9f22bdf6?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Abstract 3D neon shapes",
    results: ["Awwwards SOTD — November 2023", "CSS Design Awards Winner", "Agency revenue +65% in 90 days", "3 major client wins attributed to the site"],
    liveUrl: "https://phantom.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 6,
    num: "06",
    title: "Helix Productivity",
    shortDesc: "Minimalist task management app with intelligent scheduling and focus modes.",
    overview: "Helix is a productivity application designed around a single insight: most apps create more work than they eliminate. The interface gets out of the way and lets users think.",
    problem: "Power users of competing apps reported spending 20+ minutes per day managing their task manager. The app designed to save time was costing it.",
    solution: "A stripped-back React app with keyboard-first interaction, automatic scheduling via a simple heuristic algorithm, and a distraction-free focus mode that hides everything except the current task.",
    category: "Web Application",
    categorySlug: "web-apps",
    year: "2023",
    tech: ["React", "TypeScript", "Zustand", "IndexedDB", "CSS Modules", "Vite"],
    image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Clean minimal interface",
    results: ["4.9★ rating on Product Hunt", "#3 Product of the Day", "12,000 active users in 3 months", "Average session: 4min vs 24min industry average"],
    liveUrl: "https://helix.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 7,
    num: "07",
    title: "Nova Fashion Store",
    shortDesc: "Premium fashion e-commerce with editorial-style product presentation.",
    overview: "Nova blurs the line between editorial and commerce. Products are presented with the visual weight of a luxury magazine, backed by a blazing-fast shopping experience.",
    problem: "Fashion brands lose customers in the gap between inspiration (social media) and purchase (generic storefront). The drop-off at the product page was 83%.",
    solution: "Full-bleed editorial product layouts, a custom image transition system, and a cart that persists as a side experience rather than interrupting the browsing flow.",
    category: "E-Commerce",
    categorySlug: "e-commerce",
    year: "2022",
    tech: ["Next.js", "Shopify Storefront API", "GSAP", "TypeScript", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Fashion product grid editorial",
    results: ["Product page drop-off: 83% → 29%", "Average order value +42%", "Return customer rate 61%", "Load time: 2.8s → 0.7s"],
    liveUrl: "https://nova.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 8,
    num: "08",
    title: "Flux SaaS Dashboard",
    shortDesc: "B2B analytics dashboard with complex data hierarchy and real-time updates.",
    overview: "Flux serves a SaaS company's clients with a rich analytics dashboard — multi-tenant, real-time, and complex enough that information architecture was the central design challenge.",
    problem: "Onboarding new enterprise clients took 3+ days because the dashboard required training. Churn analysis showed that 60% of cancellations cited 'too complicated' as the reason.",
    solution: "Progressive disclosure architecture: simple view by default, depth available on demand. Role-based views ensure each user type sees exactly what they need. Guided onboarding overlay on first login.",
    category: "Dashboard",
    categorySlug: "dashboards",
    year: "2022",
    tech: ["React", "TypeScript", "Recharts", "React Query", "Socket.io", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "SaaS analytics dashboard",
    results: ["Onboarding: 3 days → 4 hours", "Churn rate -34%", "NPS score: 24 → 71", "Support tickets -58%"],
    liveUrl: "https://flux.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 9,
    num: "09",
    title: "Echo WebGL",
    shortDesc: "Experimental WebGL audio-reactive visual environment built in the browser.",
    overview: "Echo is a creative coding experiment that transforms audio input into real-time generative art using WebGL shaders and the Web Audio API. Browser as canvas.",
    problem: "This was a personal challenge: could I build a visually compelling audio-reactive experience entirely in the browser, without any external rendering engine?",
    solution: "Custom GLSL fragment shaders that sample FFT frequency data from Web Audio API, translated to shader uniforms. Four distinct visual modes, each with its own aesthetic register.",
    category: "Experiment",
    categorySlug: "experiments",
    year: "2022",
    tech: ["WebGL", "GLSL", "Web Audio API", "JavaScript", "Canvas API"],
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Abstract audio reactive visuals",
    results: ["60fps at 4K resolution", "8 sharing on CodePen", "500+ GitHub stars", "Featured in CSS Tricks"],
    liveUrl: "https://echo.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 10,
    num: "10",
    title: "Prism UI Concepts",
    shortDesc: "Series of experimental UI/UX concepts pushing the boundaries of browser capability.",
    overview: "Prism is an ongoing collection of interface concepts that explore what's possible when interaction design is unconstrained by convention. Each concept is fully functional, built in the browser.",
    problem: "Most UI inspiration boards show static images. Developers can't feel how an interaction works from a screenshot. There needed to be a place for live, playable UI experiments.",
    solution: "A curated collection site with 20+ individual experiments, each a self-contained React component. Filters by category (motion, layout, input, data) with live preview before clicking through.",
    category: "UI/UX Concept",
    categorySlug: "experiments",
    year: "2022",
    tech: ["React", "CSS Houdini", "GSAP", "TypeScript", "Vite"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "UI concept exploration neon",
    results: ["20+ interactive concepts", "Mentioned in Smashing Magazine", "3,200 GitHub stars", "12,000 monthly visitors"],
    liveUrl: "https://prism.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 11,
    num: "11",
    title: "Signal Messaging",
    shortDesc: "Concept redesign of a messaging interface focused on calm, intentional communication.",
    overview: "Signal is a concept redesign that asks: what if a communication app was designed to reduce anxiety rather than maximize engagement? Anti-dark-pattern design with full attention to typography and spacing.",
    problem: "Messaging apps are engineered for addiction. Read receipts, typing indicators, online status — each feature adds ambient anxiety. Users reported checking their phone 80+ times per day.",
    solution: "Redesigned every social signal to be opt-in rather than opt-out. A 'focus mode' that batches notifications. Typography and spacing choices informed by calm technology research.",
    category: "UI/UX Concept",
    categorySlug: "experiments",
    year: "2021",
    tech: ["React Native Web", "TypeScript", "Reanimated", "Expo", "SQLite"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Mobile messaging interface",
    results: ["Featured in UX Collective", "Dribbble Popular: 2,400 likes", "Cited in 3 academic papers on calm tech", "40+ freelance inquiries"],
    liveUrl: "https://signal.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
  {
    id: 12,
    num: "12",
    title: "Arc Creative",
    shortDesc: "Open-source portfolio template with Awwwards-inspired interactions.",
    overview: "Arc is a free, open-source portfolio template for creative developers. It was my way of giving back to the community that taught me everything — with production-quality code and interactions.",
    problem: "Most free portfolio templates feel generic. The good ones cost $100+. New developers are stuck with tools that don't represent their skills to potential employers.",
    solution: "A fully open-source Next.js template with GSAP animations, Three.js background, and a one-command setup. Documented in a way that teaches the techniques, not just delivers them.",
    category: "Landing Page",
    categorySlug: "landing-pages",
    year: "2021",
    tech: ["Next.js", "GSAP", "Three.js", "TypeScript", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=900&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&fit=crop&auto=format",
    ],
    alt: "Portfolio template creative developer",
    results: ["1,800+ GitHub stars", "Used by 400+ developers", "Featured in Dev.to weekly digest", "4 job offers from template users"],
    liveUrl: "https://arc.muaddh.dev",
    githubUrl: "https://github.com/muaddh",
    featured: false,
  },
];

const CATEGORIES = ["All", "Full Stack", "Pure Backend", "HTML/CSS/JS", "HTML/CSS", "C Programming"];

const CATEGORY_MAP: Record<string, string> = {
  "All": "all",
  "Full Stack": "fullstack",
  "Pure Backend": "purebackend",
  "HTML/CSS/JS": "htmlcssjs",
  "HTML/CSS": "htmlcss",
  "C Programming": "c",
};

const EXPERIENCE = [
  { year: "Feb 2025 - Present", role: "Frontend Web Developer", company: "Establishment MIBDAAT EL-THELATH", desc: "Delivering responsive websites and client-focused projects with high usability and on-time delivery. Specializing in modern frontend development, responsive design, and user-centric interfaces for diverse client needs.", tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Express.js", "Turso", "Resend", "RTL Support"] },
  { year: "Mar 2026 - Jun 1, 2026", role: "Full Stack Developer", company: "TRQ Studio", desc: "Building bilingual portfolio and content management platforms with enterprise-grade security and scalable architecture. Specializing in full-stack development with React, TypeScript, and Express.js for creative agencies and design studios.", tags: ["React", "TypeScript", "Vite", "Express.js", "SQLite", "Turso", "JWT", "bcryptjs", "RTL Support"] },
];

const TESTIMONIALS = [
  { quote: "Muaddh transformed our product from a functional tool into a true digital experience. His attention to motion and detail is completely unmatched — he sees things no one else does.", name: "Sarah Chen", role: "CEO, Prisma Labs", avatar: "SC" },
  { quote: "Working with Muaddh felt like collaborating with a designer, a developer, and a storyteller at once. The result was a website that won us three industry awards.", name: "James Falconer", role: "Head of Product, Meridian Digital", avatar: "JF" },
  { quote: "Every pixel intentional, every animation purposeful. Muaddh builds things that feel alive. Our conversion rate went up 28% after his redesign.", name: "Leila Osman", role: "Founder, Orbit Studio", avatar: "LO" },
];

const MARQUEE_WORDS = ["React", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "SQLite", "Turso", "JWT", "Responsive Design", "UI/UX Design"];


const TECH_STACK = [
  // Frontend Skills
  { name: "React 18/19", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "JavaScript (ES6+)", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Vanilla CSS", category: "Frontend" },
  { name: "React Router", category: "Frontend" },
  { name: "React Hooks", category: "Frontend" },
  
  // Backend Skills
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "C Programming", category: "Backend" },
  { name: "SQLite", category: "Backend" },
  { name: "Turso Database", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "JWT Authentication", category: "Backend" },
  
  // Tools & Deployment
  { name: "Git/GitHub", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Netlify", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Font Awesome", category: "Tools" },
  { name: "Devicons", category: "Tools" },
  { name: "Boxicons", category: "Tools" },
  
  // Non-Technical Skills
  { name: "UI/UX Design & Prototyping", category: "Design" },
  { name: "Responsive Web Design", category: "Design" },
  { name: "Problem Solving", category: "Skills" },
  { name: "Debugging", category: "Skills" },
  { name: "Project Management", category: "Skills" },
  { name: "Communication", category: "Skills" },
  { name: "Collaboration", category: "Skills" },
  { name: "Creative Thinking", category: "Skills" },
  { name: "Attention to Detail", category: "Skills" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Create URL-friendly slug from project title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .trim();
}

// Find project by slug
function findProjectBySlug(slug: string): FullProject | undefined {
  return ALL_PROJECTS.find(p => createSlug(p.title) === slug);
}

// ─── Global Styles Injection ──────────────────────────────────────────────────

const GLOBAL_STYLES = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
@keyframes float-orbit {
  from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
  to { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
}
@keyframes drift {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-12px) rotate(1deg); }
  66% { transform: translateY(6px) rotate(-1deg); }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
body { cursor: none; font-family: 'Figtree', sans-serif; }
@media (max-width: 768px) { body { cursor: auto; } }
html { scroll-behavior: smooth; }
::-webkit-scrollbar { display: none; }
.font-display { font-family: 'Bricolage Grotesque', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
`;

// ─── Custom Cursor ────────────────────────────────────────────────────────────

function CustomCursor() {
  const outer = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (outer.current) outer.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      if (dot.current) dot.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={outer} className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/25 pointer-events-none z-[9999] hidden md:block" style={{ willChange: "transform" }} />
      <div ref={dot} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] hidden md:block" style={{ willChange: "transform" }} />
    </>
  );
}

function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[998] opacity-[0.025]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: "128px 128px" }} />
  );
}

// ─── Particle Canvas ──────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    type P = { x: number; y: number; vx: number; vy: number; size: number };
    let particles: P[] = [];
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, size: Math.random() * 1.2 + 0.3 });
      }
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { p.x -= dx * 0.025; p.y -= dy * 0.025; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.fill();
      }
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - d / maxDist)})`; ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Shared Components ────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className, style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  return (
    <motion.div ref={ref} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.32, y: (e.clientY - (r.top + r.height / 2)) * 0.32 });
  }, []);
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 350, damping: 22 }} className={cn("cursor-pointer", className)} onClick={onClick}>
      {children}
    </motion.div>
  );
}

// ─── Preloader ────────────────────────────────────────────────────────────────

function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 2.2 + Math.random() * 1.8;
      if (n >= 100) {
        setCount(100);
        clearInterval(id);
        setTimeout(() => { setExiting(true); setTimeout(onDone, 800); }, 300);
      } else {
        setCount(Math.min(99, Math.floor(n)));
      }
    }, 28);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden"
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.04 : 1 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,216,255,0.04) 0%, transparent 70%)" }} />
      <div className="relative font-display leading-none text-white select-none" style={{ fontSize: "clamp(80px, 18vw, 240px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
        {String(count).padStart(2, "0")}<span className="text-white/10">%</span>
      </div>
      <div className="absolute bottom-10 left-8 right-8 md:left-14 md:right-14">
        <div className="relative h-px bg-white/10 overflow-hidden rounded-full">
          <motion.div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${count}%` }} />
        </div>
        <div className="flex justify-between mt-3">
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">Muaddh Alsway — Portfolio</span>
          <span className="font-mono text-[10px] text-white/30">{count}%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string, project?: FullProject) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isProjects = currentPage === "projects";

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "py-4" : "py-6")}>
      <div className={cn("mx-4 md:mx-8 px-6 py-3 rounded-2xl flex items-center justify-between transition-all duration-500", scrolled ? "backdrop-blur-xl bg-black/60 border border-white/[0.06]" : "bg-transparent border border-transparent")}>
        <button onClick={() => onNavigate("home")} className="font-display font-bold text-white tracking-tight text-sm md:text-base" style={{ letterSpacing: "-0.02em" }}>MA</button>

        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
          {!isProjects && ["Skills", "Experience", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">{item}</a>
          ))}
          <button onClick={() => onNavigate(isProjects ? "home" : "projects")}
            className={cn("hover:text-white transition-colors duration-200", isProjects ? "text-white" : "")}>
            {isProjects ? "← Home" : "Projects"}
          </button>
        </div>

        <a href="mailto:muaddhalsway@gmail.com" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-200 font-mono text-[10px] uppercase tracking-[0.1em]">
          Available for work <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </a>

        <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 flex flex-col gap-1">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block h-px bg-white" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-px bg-white" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block h-px bg-white" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2 p-6 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/[0.06] flex flex-col gap-5">
            <button onClick={() => { onNavigate("projects"); setMenuOpen(false); }} className="font-display text-xl font-semibold text-white/70 hover:text-white transition-colors text-left">Projects</button>
            {["Skills", "Experience", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="font-display text-xl font-semibold text-white/70 hover:text-white transition-colors">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── PORTFOLIO PAGE SECTIONS ──────────────────────────────────────────────────

function HeroSection({ onViewProjects }: { onViewProjects: () => void }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 }; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    let cur = { x: 0, y: 0 };
    const loop = () => {
      cur.x += (mouseRef.current.x - cur.x) * 0.06; cur.y += (mouseRef.current.y - cur.y) * 0.06;
      if (floatRef.current) floatRef.current.style.transform = `translate(${cur.x * 18}px, ${cur.y * 12}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-black">
      <ParticleCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,216,255,0.04) 0%, transparent 65%)" }} />

      <div ref={floatRef} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
        <div className="absolute top-[22%] right-[8%] w-36 md:w-48 p-4 rounded-2xl border border-white/[0.07] backdrop-blur-md" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="font-mono text-[9px] text-white/30 mb-2 uppercase tracking-widest">Status</div>
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="font-mono text-[11px] text-white/60">Available for work</span></div>
        </div>
        <div className="absolute top-[38%] left-[5%] md:left-[8%] w-28 md:w-36 p-3 rounded-2xl border border-white/[0.07] backdrop-blur-md hidden sm:block" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="font-mono text-[9px] text-white/30 mb-1">Projects</div>
          <div className="font-display text-2xl font-bold text-white">12+</div>
          <div className="font-mono text-[10px] text-white/40">Delivered</div>
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
        <div className="overflow-hidden mb-3">
          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] mb-6">Muaddh Alsway — Est. 2020</motion.p>
        </div>
        {["Creative", "Front-End", "Developer."].map((word, i) => (
          <div key={word} className="overflow-hidden">
            <motion.h1 initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-white leading-[0.88] block" style={{ fontSize: "clamp(52px, 10vw, 148px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              {word}
            </motion.h1>
          </div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button onClick={onViewProjects} className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-display font-semibold text-sm hover:bg-white/90 transition-all duration-200">
            View Selected Work <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <a href="#contact" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-200">Let's collaborate</a>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">Scroll</span>
      </motion.div>
    </section>
  );
}

function MarqueeSection() {
  const repeated = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <section className="py-8 border-y border-white/[0.06] overflow-hidden bg-black">
      <div className="relative flex">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-0 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite", ...(i === 1 ? { position: "absolute", left: "100%" } as React.CSSProperties : {}) }}>
            {repeated.map((word, j) => (
              <span key={j} className="font-display text-white/[0.12] hover:text-white/40 transition-colors duration-300 text-3xl md:text-4xl font-bold px-8" style={{ letterSpacing: "-0.02em" }}>
                {word}<span className="text-white/[0.06] mx-6">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductionProjectsSection({ onProjectClick }: { onProjectClick?: (project: FullProject) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const productionProjects = [
    {
      id: 4,
      name: 'MUCOMMERANCE',
      description: 'Full-stack luxury fashion e-commerce platform',
      tech: ['Cloudflare Workers', 'D1', 'React 18', 'Stripe', 'Shippo'],
      image: '/Projects/mockup/MUCOMMERANCE (2).png',
      stats: { endpoints: '95+', tables: '16', pages: '14' }
    },
    {
      id: 5,
      name: 'Nova-Ecommerance-Platform',
      description: 'Production e-commerce platform with logistics system',
      tech: ['Hono', 'Turso', 'React', 'Stripe', 'Shippo'],
      image: '/Projects/mockup/nova.png',
      stats: { endpoints: '20+', tables: '20', carriers: '40+' }
    },
    {
      id: 6,
      name: 'Nexus Network Platform',
      description: 'Full-stack enterprise-grade LinkedIn clone with real-time messaging, analytics, courses, jobs, and admin panel',
      tech: ['React', 'TypeScript', 'Hono', 'Cloudflare', 'Turso', 'WebSocket'],
      image: '/Projects/mockup/Nexus.png',
      stats: { endpoints: '80+', tables: '30+', realtime: 'WS' }
    }
  ];

  const numCards = productionProjects.length;
  const cardWidth = 55;
  const gap = 3;
  const totalWidth = numCards * (cardWidth + gap);
  const maxTranslate = totalWidth - 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${maxTranslate}vw`]);

  return (
    <section ref={sectionRef} className="bg-black" style={{ height: `${numCards * 80}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-8">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Independent Work</p>
                <h2 className="font-display text-white leading-none mb-6" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                  Production <span className="text-white/[0.7]">Projects</span>
                </h2>
                <p className="font-mono text-[11px] text-white/35 uppercase tracking-widest max-w-2xl">
                  Production-grade platforms built independently — fully functional, deployed, and ready for real-world users
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-12 lg:pl-20">
          {productionProjects.map((project, i) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[85vw] md:w-[55vw] lg:w-[48vw] cursor-pointer"
              onClick={() => {
                const fullProject = ALL_PROJECTS.find(p => p.id === project.id);
                if (fullProject) onProjectClick?.(fullProject);
              }}
            >
              <div className="group relative rounded-2xl overflow-hidden bg-card border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative overflow-hidden h-56 md:h-72 bg-neutral-900">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1]">
                    <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest">Production Ready</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-white font-bold group-hover:text-white/90 transition-colors" style={{ fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}>
                      {project.name}
                    </h3>
                  </div>

                  <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-6">
                    {project.description}
                  </p>

                  {/* Stats Row */}
                  <div className="flex gap-6 mb-6 pb-6 border-b border-white/[0.06]">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="font-display text-white text-xl font-bold">{value}</div>
                        <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-white/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress */}
        <div className="px-6 md:px-12 lg:px-20 mt-8">
          <div className="h-[1px] bg-white/[0.06] w-full">
            <motion.div className="h-full bg-white/20 origin-left" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioProjectsSection({ onViewAll, onProjectClick }: { onViewAll: () => void; onProjectClick?: (project: FullProject) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const numCards = 5;
  const cardWidth = 42;
  const gap = 2;
  const totalWidth = numCards * (cardWidth + gap);
  const maxTranslate = totalWidth - 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${maxTranslate}vw`]);

  return (
    <section id="work" ref={sectionRef} className="bg-black" style={{ height: `${numCards * 70}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-8">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Selected Work</p>
                <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>Projects</h2>
              </div>
              <button onClick={onViewAll} className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/30 hover:text-white transition-colors">
                All projects <ArrowUpRight size={12} />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} className="flex gap-5 pl-6 md:pl-12 lg:pl-20">
          {ALL_PROJECTS.slice(0, numCards).map((project, i) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[82vw] md:w-[42vw] lg:w-[36vw] cursor-pointer"
              onClick={() => onProjectClick?.(project)}
            >
              <div className="group relative rounded-2xl overflow-hidden bg-card border border-white/[0.06] hover:border-white/[0.12] h-full transition-all duration-300">
                <div className="relative overflow-hidden h-56 md:h-72 bg-neutral-900">
                  <img src={project.image} alt={project.alt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">{project.num}</div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-white font-bold group-hover:text-white/90 transition-colors" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", letterSpacing: "-0.02em" }}>{project.title}</h3>
                    <span className="font-mono text-[10px] text-white/25">{project.year}</span>
                  </div>
                  <p className="font-mono text-[11px] text-white/35 uppercase tracking-widest mb-4">{project.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-white/40">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress */}
        <div className="px-6 md:px-12 lg:px-20 mt-8">
          <div className="h-[1px] bg-white/[0.06] w-full">
            <motion.div className="h-full bg-white/20 origin-left" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const orbitSizes = [140, 200, 270, 340];
  const techNames = [
    // Frontend (inner orbits)
    { name: "React", letter: "⚛", r: 140, dur: 14 },
    { name: "Next.js", letter: "▲", r: 140, dur: 14 },
    { name: "Vite", letter: "⚡", r: 200, dur: 20 },
    { name: "Tailwind CSS", letter: "T", r: 200, dur: 20 },
    { name: "JavaScript", letter: "JS", r: 200, dur: 20 },
    // Backend
    { name: "Node.js", letter: "⬡", r: 270, dur: 28 },
    { name: "Express.js", letter: "E", r: 270, dur: 28 },
    { name: "SQLite", letter: "DB", r: 270, dur: 28 },
    // Tools & Design (outer orbit)
    { name: "Figma", letter: "◈", r: 340, dur: 36 },
    { name: "Git/GitHub", letter: "GH", r: 340, dur: 36 },
    { name: "TypeScript", letter: "TS", r: 340, dur: 36 },
  ];

  return (
    <section id="skills" className="py-24 md:py-36 bg-black overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Technologies & Skills</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>Skills Galaxy</h2>
        </FadeIn>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-16 px-6 md:px-12 lg:px-20">
        <FadeIn className="relative flex-shrink-0 flex items-center justify-center" style={{ width: 380, height: 380 }}>
          <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>
            {orbitSizes.map((r) => (<div key={r} className="absolute rounded-full border border-white/[0.05]" style={{ width: r * 2, height: r * 2 }} />))}
            <div className="absolute w-16 h-16 rounded-full bg-white flex items-center justify-center z-10" style={{ boxShadow: "0 0 40px 10px rgba(255,255,255,0.08)" }}>
              <span className="font-display text-black font-bold text-xs">MA</span>
            </div>
            {techNames.map((tech, i) => (
              <div key={tech.name} className="absolute" style={{ width: tech.r * 2, height: tech.r * 2, animation: `float-orbit ${tech.dur}s linear infinite`, ["--orbit-r" as string]: `${tech.r}px`, animationDelay: `${-i * (tech.dur / 3)}s` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-black flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300" style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace" }} title={tech.name}>{tech.letter}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {[
            { name: "React / Next.js / Vite", pct: 98 },
            { name: "JavaScript / TypeScript", pct: 95 },
            { name: "HTML5 / CSS3 / Tailwind", pct: 96 },
            { name: "Node.js / Express.js", pct: 90 },
            { name: "SQLite / Turso Database", pct: 88 },
            { name: "REST APIs / JWT Auth", pct: 92 },
            { name: "PHP / C Programming", pct: 80 },
            { name: "UI/UX & Responsive Design", pct: 93 },
          ].map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.06}>
              <div className="group p-4 rounded-xl border border-white/[0.06] bg-card hover:border-white/15 transition-colors duration-300">
                <div className="flex justify-between mb-2.5">
                  <span className="font-display text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{skill.name}</span>
                  <span className="font-mono text-[11px] text-white/30">{skill.pct}%</span>
                </div>
                <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.pct}%` }} viewport={{ once: false }} transition={{ duration: 1.2, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-36 bg-black">
      <div className="px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Career Path</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>Experience</h2>
        </FadeIn>
        <div className="relative max-w-3xl">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.07]" />
          <div className="space-y-0">
            {EXPERIENCE.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className="relative pl-10 md:pl-16 pb-16 group">
                  <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/20 bg-black group-hover:border-white/60 group-hover:bg-white transition-all duration-400" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-3">{item.year}</div>
                  <div className="p-5 md:p-7 rounded-2xl border border-white/[0.05] bg-card hover:border-white/10 transition-all duration-300 hover:bg-white/[0.02]">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display text-white font-bold mb-1" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", letterSpacing: "-0.02em" }}>{item.role}</h3>
                        <p className="font-mono text-[11px] text-white/35 uppercase tracking-wider">{item.company}</p>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (<span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] font-mono text-[10px] text-white/35">{tag}</span>))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STORY_TIMELINE = [
  {
    day: "Day 1",
    title: "🚀 My Backend Learning Journey",
    subtitle: "Pure Backend Focus",
    content: "I recently started a new path in my learning journey: Pure Backend Development using Node.js and Express 🟢⚡ After researching how to improve my skills, I realized I needed one thing most: Focus without distractions. So I decided to build backend projects without frontend — just pure APIs, logic, and server-side development.\n\nMy goal is simple: Master backend fundamentals first, understand how APIs really work, and build strong foundations before moving to full-stack.\n\nI believe real growth comes step by step: Small projects → Consistency → Practice → Mastery. At the beginning, it was confusing. I didn't know the exact path. But I learned something important: Every developer starts from zero — clarity comes through building, not waiting.\n\nNow my learning approach is: Pure backend projects (Node.js + Express) 🟢, Learning from structured courses (like Udemy) 📚, Constant practice and improvement 🔁, Later → full-stack integration with frontend 🌐.\n\nBecause backend mastery is not about speed — it's about depth. It's a journey, not a shortcut. And I'm committed to it. 🚀",
    icon: "🚀"
  },
  {
    day: "Day 2",
    title: "🚀 Building an Advanced Authentication System",
    subtitle: "Depth Over Speed",
    content: "Today, I built an authentication system at an advanced level. The first version was simple, but the second version pushed me much deeper into backend complexity and real-world thinking.\n\nRight now, my focus is not on blindly following tutorials. I'm intentionally choosing a different path: Pure Backend Development. My goal is to master the fundamentals behind how systems really work — not just the surface-level implementation, but the logic, structure, and decisions happening behind the scenes.\n\nThis journey will take time, but that's exactly the point. I'm choosing depth over speed — understanding why things work, not just how to build them.\n\n💡 My learning approach now looks like this:\n\n1. Brainstorm the idea before writing any code\n2. Understand why the system matters in real backend engineering\n3. Identify what I can learn beyond courses (Udemy / tutorials)\n4. Design architecture first (diagrams, logic flow, system structure)\n5. Build step by step\n6. Face real bugs and unexpected issues during development\n7. Document everything I learn from those problems\n8. Reuse that knowledge in future projects to avoid repeating mistakes\n\nEvery project I build is upgrading my level as a backend developer. Real growth happens when you step out of comfort and build things without knowing every answer in advance. That's where real understanding starts — when you're forced to figure it out.\n\nInstead of chasing the \"final result\" from tutorials, I'm learning how every step connects to the system as a whole. Because backend mastery doesn't come from copying execution — it comes from understanding the system deeply enough to build it yourself.\n\n🔥 This is just the beginning of my backend journey. I'm committed to improving, breaking things, fixing them, and becoming stronger with every project.",
    icon: "🔐"
  },
  {
    day: "Day 3",
    title: "🚀 My Journey Today — A Shift in How I Think",
    subtitle: "From Passive Learning to Active Building",
    content: "When I look back, I realize I'm not the same developer I was before. My thinking has changed. It's no longer just about learning concepts or finishing courses — it's about how I approach problems.\n\nThe real change is this: I stopped waiting to \"finish the material\" before building. Instead, I started building first. Because becoming a backend engineer through passive learning is not enough. You have to figure it out while building.\n\nThis approach changed everything for me:\n\nNow I learn in an active way. I build piece by piece until the bigger picture slowly starts to form. And along the way, I don't just consume knowledge — I generate questions. And those questions matter. Because the right questions push you into a level you can't reach through tutorials alone.\n\nI realized something important: You don't become a backend engineer by waiting for clarity. You become one by going through confusion, mistakes, and repeated attempts until you discover your own way of building.\n\nThis is what I call pure backend thinking:\n\n✅ Build before you fully understand\n✅ Learn through breakdowns and real bugs\n✅ Let problems guide the next step\n✅ Improve through repetition and iteration\n✅ Slowly connect the system until the full picture appears\n\nI'm still in the process. Still learning. Still pushing. But now I understand the direction. And that alone changes everything.\n\n🔥 This is not just learning anymore — this is building myself as a backend engineer. The transformation is real, and it starts with action, not perfection.",
    icon: "🧠"
  }
];

function StorySection() {
  const [activeDay, setActiveDay] = useState(0);
  const story = STORY_TIMELINE[activeDay];

  return (
    <section id="story" className="py-24 md:py-36 bg-black">
      <div className="px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">The Journey</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>From Zero to Backend</h2>
        </FadeIn>

        {/* Timeline Cards */}
        <div className="mb-16">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {STORY_TIMELINE.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveDay(i)}
                className={cn(
                  "flex-shrink-0 px-6 py-3 rounded-full border font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap",
                  activeDay === i
                    ? "bg-white text-black border-white"
                    : "border-white/[0.08] text-white/40 hover:text-white hover:border-white/25 bg-transparent"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.day}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Story Card */}
        <div className="max-w-4xl">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:border-white/15 transition-all duration-300"
          >
            {/* Icon and Day */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-2">{story.day}</p>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{story.icon}</span>
                  <div>
                    <h3 className="font-display text-white font-bold" style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.03em" }}>
                      {story.title}
                    </h3>
                    <p className="font-mono text-[11px] text-white/35 uppercase tracking-wider mt-1">{story.subtitle}</p>
                  </div>
                </div>
              </div>
              {/* Progress indicator */}
              <div className="flex gap-1">
                {STORY_TIMELINE.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    animate={{
                      backgroundColor: i === activeDay ? "#ffffff" : "rgba(255,255,255,0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-6 mb-8">
              {story.content.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-white/70 leading-relaxed whitespace-pre-wrap"
                  style={{ fontSize: "clamp(16px, 1.1vw, 18px)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 items-center justify-between">
              <motion.button
                onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
                disabled={activeDay === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-mono text-[11px] uppercase tracking-wider"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Previous
              </motion.button>

              <div className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
                {activeDay + 1} / {STORY_TIMELINE.length}
              </div>

              <motion.button
                onClick={() => setActiveDay(Math.min(STORY_TIMELINE.length - 1, activeDay + 1))}
                disabled={activeDay === STORY_TIMELINE.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-mono text-[11px] uppercase tracking-wider"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { label: "Learning Path", value: "Backend First" },
            { label: "Focus", value: "Depth Over Speed" },
            { label: "Mindset", value: "Journey, Not Sprint" }
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-card text-center hover:border-white/15 transition-all duration-300">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">{stat.label}</p>
                <p className="font-display text-white font-bold" style={{ fontSize: "clamp(20px, 1.5vw, 24px)", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-24 md:py-36 bg-black border-t border-white/[0.04]">
      <div className="px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Kind Words</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>Testimonials</h2>
        </FadeIn>
        <div className="max-w-4xl mb-12">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-display text-white/80 leading-tight mb-10" style={{ fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
                <span className="text-white/[0.12] text-6xl leading-none font-black mr-3">"</span>{TESTIMONIALS[active].quote}<span className="text-white/[0.12] text-6xl leading-none font-black ml-2">"</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-display text-white font-bold text-sm">{TESTIMONIALS[active].avatar}</div>
                <div><div className="font-display text-white font-semibold text-sm">{TESTIMONIALS[active].name}</div><div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{TESTIMONIALS[active].role}</div></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-3">
          {TESTIMONIALS.map((_, i) => (<button key={i} onClick={() => setActive(i)} className={cn("transition-all duration-300 rounded-full", i === active ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40")} />))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);
  const onBtnMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setBtnPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.4, y: (e.clientY - (r.top + r.height / 2)) * 0.4 });
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-black overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 70%, rgba(0,216,255,0.035) 0%, transparent 65%)" }} />
      <div className="relative px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-6"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Get In Touch</p></FadeIn>
        <div className="overflow-hidden mb-16">
          <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: false }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-none" style={{ fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Let's Create<br /><span className="text-white/[0.12]">Together.</span>
          </motion.h2>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-14">
          <div className="max-w-xs">
            <p className="text-white/40 text-sm leading-relaxed mb-8">Open to select freelance projects, full-time roles, and creative collaborations. Let's build something extraordinary.</p>
            <a href="mailto:muaddhalsway@gmail.com" className="group flex items-center gap-3 text-white hover:text-white/60 transition-colors duration-300">
              <Mail size={15} className="text-white/30" /><span className="font-mono text-sm">muaddhalsway@gmail.com</span>
            </a>
          </div>
          <motion.div ref={btnRef} onMouseMove={onBtnMove} onMouseLeave={() => setBtnPos({ x: 0, y: 0 })} animate={{ x: btnPos.x, y: btnPos.y }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex-shrink-0">
            <a href="https://wa.me/966560394576" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-44 h-44 md:w-52 md:h-52 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:border-white transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="relative text-center z-10">
                <div className="font-display font-bold text-white group-hover:text-black transition-colors duration-300 leading-tight" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>Start a<br />Project</div>
                <ArrowUpRight size={16} className="mx-auto mt-2 text-white/40 group-hover:text-black/50 transition-colors duration-300" />
              </div>
            </a>
          </motion.div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {[{ icon: Github, label: "GitHub", url: "https://github.com/MuaddhAlsway" }, { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/muaddh-alsway/" }, { icon: Instagram, label: "Instagram", url: "#" }].map(({ icon: Icon, label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/25 hover:text-white transition-colors duration-200 group">
                <Icon size={15} /><span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] text-white/15 uppercase tracking-[0.2em]">© 2024 Muaddh Alsway</p>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────────────────────────

// Mouse follow preview
function MouseFollowPreview({ src, visible }: { src: string; visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      if (ref.current) ref.current.style.transform = `translate(${cur.current.x + 30}px, ${cur.current.y - 120}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className={cn("fixed top-0 left-0 w-72 h-44 rounded-2xl overflow-hidden pointer-events-none z-[500] transition-all duration-300 shadow-2xl", visible ? "opacity-100 scale-100" : "opacity-0 scale-95")} style={{ willChange: "transform" }}>
      <img src={src} className="w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

// Project Modal
function ProjectModal({ project, onClose, onViewFull }: { project: FullProject; onClose: () => void; onViewFull?: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[900] bg-black flex flex-col" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{project.num}</span>
          <h2 className="font-display text-white font-bold" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "-0.02em" }}>{project.title}</h2>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-200 group">
          <X size={16} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero image */}
        <div className="relative h-[45vh] md:h-[55vh] overflow-hidden bg-neutral-900">
          <img src={project.image} alt={project.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-6 md:left-12">
            <span className="inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 font-mono text-[10px] text-white/70 uppercase tracking-widest mb-3">{project.category}</span>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">{project.shortDesc}</p>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-20 py-16 max-w-5xl">
          {/* Overview */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Overview</p>
            <p className="text-white/65 leading-relaxed" style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>{project.overview}</p>
          </div>

          {/* Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[{ label: "Problem", content: project.problem, icon: "◎" }, { label: "Solution", content: project.solution, icon: "◈" }].map((item) => (
              <div key={item.label} className="p-6 rounded-2xl border border-white/[0.06] bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/30 font-mono text-sm">{item.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{item.label}</p>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[11px] text-white/50 hover:text-white hover:border-white/25 transition-all duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Results</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.05] bg-card">
                  <span className="text-white/20 font-mono text-xs mt-0.5">→</span>
                  <span className="text-white/65 text-sm leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Screenshots</p>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
              {project.screenshots.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={cn("flex-shrink-0 w-56 h-36 md:w-72 md:h-44 rounded-xl overflow-hidden border-2 transition-all duration-200", i === imgIdx ? "border-white/50" : "border-transparent opacity-60 hover:opacity-80")}>
                  <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl overflow-hidden h-64 md:h-80 bg-neutral-900">
              <AnimatePresence mode="wait">
                <motion.img key={imgIdx} src={project.screenshots[imgIdx]} alt="" className="w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
              </AnimatePresence>
            </div>
          </div>

          {/* CTA links */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Project Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Live Demo */}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Live Demo</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* GitHub */}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Source Code</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* LinkedIn */}
              {project.linkedinUrl && project.linkedinUrl !== "#" && project.linkedinUrl !== undefined && (
                <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">LinkedIn Post</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* Notion */}
              {project.notionUrl && project.notionUrl !== "#" && project.notionUrl !== undefined && (
                <a href={project.notionUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <BookOpen size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Notion Doc</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* Wiki */}
              {project.wikiUrl && project.wikiUrl !== "#" && project.wikiUrl !== undefined && (
                <a href={project.wikiUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Wiki</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* Diagram */}
              {project.diagramUrl && project.diagramUrl !== "#" && project.diagramUrl !== undefined && (
                <a href={project.diagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <GitBranch size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Diagram</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Projects Page Hero
function ProjectsHero() {
  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden" style={{ background: "#050505" }}>
      <ParticleCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 60% at 50% 20%, rgba(0,216,255,0.03) 0%, transparent 65%)" }} />

      {/* Large background number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black text-white select-none pointer-events-none" style={{ fontSize: "clamp(120px, 22vw, 320px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.025)" }}>
        {ALL_PROJECTS.length}
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8">
          Portfolio — {ALL_PROJECTS.length} Projects — 2021–2024
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-[0.88] mb-4" style={{ fontSize: "clamp(56px, 12vw, 170px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Selected
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="font-display leading-[0.88]" style={{ fontSize: "clamp(56px, 12vw, 170px)", fontWeight: 800, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.12)" }}>
            Work.
          </motion.h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-white/35 max-w-md leading-relaxed" style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
          A curated exhibition of projects built at the intersection of engineering precision and creative vision. Each project is a case study in solving real problems beautifully.
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">Explore</span>
      </motion.div>
    </section>
  );
}

// Featured Project
function FeaturedProjectSection({ project, onOpen }: { project: FullProject; onOpen: () => void }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    tiltRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }, []);

  const onLeave = useCallback(() => {
    if (tiltRef.current) tiltRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  }, []);

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-20 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <FadeIn className="mb-12">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] text-white/50 uppercase tracking-widest">Featured Project</span>
          <span className="font-mono text-[10px] text-white/25">{project.num}</span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Info */}
        <div>
          <FadeIn>
            <h2 className="font-display text-white leading-none mb-5" style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em" }}>{project.title}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/50 leading-relaxed mb-8" style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}>{project.overview}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((t) => (<span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] font-mono text-[10px] text-white/40">{t}</span>))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onOpen} className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-display font-semibold text-sm hover:bg-white/90 transition-all duration-200">
                Case Study <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 font-display font-semibold text-sm transition-all duration-200">
                Live Demo <ExternalLink size={14} />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Tilt image */}
        <FadeIn delay={0.1}>
          <div ref={tiltRef} onMouseMove={onMove} onMouseLeave={onLeave} className="relative rounded-2xl overflow-hidden bg-neutral-900 cursor-none" style={{ transition: "transform 0.2s ease-out", aspectRatio: "4/3" }}>
            <img src={project.image} alt={project.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{project.category} — {project.year}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Category filter
function CategoryFilter({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-6 border-y border-white/[0.04] overflow-x-auto" style={{ background: "#050505" }}>
      <div className="flex gap-3 min-w-max">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => onChange(cat)}
            className={cn("px-5 py-2.5 rounded-full border font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap",
              active === cat ? "bg-white text-black border-white" : "border-white/[0.08] text-white/40 hover:text-white hover:border-white/25 bg-transparent")}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// Projects Grid
function ProjectsGrid({ projects, onOpen }: { projects: FullProject[]; onOpen: (p: FullProject) => void }) {
  const filtered = projects.filter((p) => p.id !== 1); // featured project excluded
  return (
    <section className="py-0 px-6 md:px-12 lg:px-20" style={{ background: "#050505" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.04}>
            <motion.button onClick={() => onOpen(project)} className="group text-left relative rounded-2xl overflow-hidden border border-white/[0.06] bg-card hover:border-white/15 transition-all duration-400 w-full"
              whileHover={{ y: -6 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              {/* Image */}
              <div className="relative overflow-hidden bg-neutral-900" style={{ aspectRatio: i % 5 === 0 ? "16/10" : "4/3" }}>
                <img src={project.image} alt={project.alt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-display font-semibold text-sm">
                    View Case Study <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">{project.num}</div>
                <div className="absolute top-4 right-4"><span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 font-mono text-[9px] text-white/50 uppercase tracking-widest">{project.year}</span></div>
              </div>
              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-white font-bold group-hover:text-white transition-colors" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.02em" }}>{project.title}</h3>
                </div>
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-3">{project.category}</p>
                <p className="text-white/40 text-[13px] leading-relaxed line-clamp-2 mb-4">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (<span key={t} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] font-mono text-[9px] text-white/30">{t}</span>))}
                </div>
              </div>
            </motion.button>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// List view with mouse-follow preview
function ProjectsListView({ projects, onOpen, showFeatured }: { projects: FullProject[]; onOpen: (p: FullProject) => void; showFeatured: boolean }) {
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);

  return (
    <section className="px-6 md:px-12 lg:px-20 pb-20 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <MouseFollowPreview src={hoveredSrc || ""} visible={!!hoveredSrc} />
      <div className={`${showFeatured ? 'mb-10 pt-16' : 'mb-0 pt-0'}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">{showFeatured ? 'All Projects' : ''}</p>
      </div>
      <div>
        {projects.map((project, i) => (
          <motion.button key={project.id} onClick={() => onOpen(project)} onMouseEnter={() => setHoveredSrc(project.image)} onMouseLeave={() => setHoveredSrc(null)}
            className="group w-full flex items-center justify-between py-5 border-b border-white/[0.06] hover:border-white/15 transition-all duration-300"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.04 }}>
            <div className="flex items-center gap-6 md:gap-10">
              <span className="font-mono text-[10px] text-white/20 hidden sm:block">{project.num}</span>
              <h3 className="font-display text-white font-bold text-left group-hover:text-white transition-colors" style={{ fontSize: "clamp(18px, 2.5vw, 30px)", letterSpacing: "-0.03em" }}>{project.title}</h3>
              <span className="hidden md:block font-mono text-[10px] text-white/25 uppercase tracking-widest">{project.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-white/25 hidden sm:block">{project.year}</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/[0.03]">
                <ArrowUpRight size={13} className="text-white/50" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

// Metrics section
function MetricsSection() {
  const metrics = [
    { value: "51+", label: "Projects", sub: "Completed" },
    { value: "2+", label: "Years", sub: "Frontend Development Journey" },
    { value: "10+", label: "Technologies", sub: "HTML, CSS, JavaScript, C, Python & SQL" },
    { value: "5+", label: "Major Platforms", sub: "LinkedIn, Airbnb, Spotify, Apple & Udemy" },
    { value: "100+", label: "Hours", sub: "CS50 & Self-Learning Experience" },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">By the Numbers</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em" }}>Project Metrics</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-card hover:border-white/15 transition-all duration-300 group h-full">
                <div className="font-display text-white font-black leading-none mb-2 group-hover:text-white transition-colors" style={{ fontSize: "clamp(36px, 4vw, 52px)", letterSpacing: "-0.04em" }}>
                  <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: i * 0.08 }}>{m.value}</motion.span>
                </div>
                <div className="font-display text-white/60 font-semibold text-sm mb-1">{m.label}</div>
                <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest leading-relaxed">{m.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tech visualization
function TechVisualization() {
  const [activeFilter, setActiveFilter] = useState("All");
  const techFilters = ["All", "Frontend", "Backend", "Tools", "Design", "Skills"];

  const filtered = activeFilter === "All" ? TECH_STACK : TECH_STACK.filter((t) => t.category === activeFilter);

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">Technologies</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em" }}>Tech Stack</h2>
        </FadeIn>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {techFilters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={cn("px-4 py-1.5 rounded-full border font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-250",
                activeFilter === f ? "bg-white text-black border-white" : "border-white/[0.08] text-white/35 hover:text-white hover:border-white/20")}>
              {f}
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {filtered.map((tech, i) => (
              <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-card hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                style={{ animation: `drift ${6 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
                <span className="font-display text-white/70 group-hover:text-white transition-colors font-semibold text-sm">{tech.name}</span>
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">{tech.category}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Projects page CTA
function ProjectsCTA() {
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);
  const onBtnMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setBtnPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.4, y: (e.clientY - (r.top + r.height / 2)) * 0.4 });
  }, []);

  return (
    <section className="relative py-24 md:py-40 overflow-hidden border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,216,255,0.04) 0%, transparent 65%)" }} />
      <div className="relative px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-4"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">Next Chapter</p></FadeIn>
        <div className="overflow-hidden mb-6">
          <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: false }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white leading-none" style={{ fontSize: "clamp(32px, 7vw, 100px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Let's Build Something
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: false }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display leading-none" style={{ fontSize: "clamp(32px, 7vw, 100px)", fontWeight: 800, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.12)" }}>
            Extraordinary Together.
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
          <div>
            <p className="text-white/35 max-w-sm leading-relaxed text-sm mb-8">Every great product starts with a conversation. Tell me about yours.</p>
            <div className="flex flex-col gap-4">
              <a href="mailto:muaddhalsway@gmail.com" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                <Mail size={14} /><span className="font-mono text-sm">muaddhalsway@gmail.com</span><ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-5">
                {[{ icon: Github, label: "GitHub", url: "https://github.com/MuaddhAlsway" }, { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/muaddh-alsway/" }, { icon: Instagram, label: "Instagram", url: "#" }].map(({ icon: Icon, label, url }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white transition-colors"><Icon size={16} /></a>
                ))}
              </div>
            </div>
          </div>

          <motion.div ref={btnRef} onMouseMove={onBtnMove} onMouseLeave={() => setBtnPos({ x: 0, y: 0 })} animate={{ x: btnPos.x, y: btnPos.y }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <a href="https://wa.me/966560394576" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-44 h-44 md:w-56 md:h-56 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:border-white transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="relative text-center z-10">
                <div className="font-display font-bold text-white group-hover:text-black transition-colors duration-300 leading-tight" style={{ fontSize: 16, letterSpacing: "-0.02em" }}>Start a<br />Project</div>
                <ArrowUpRight size={16} className="mx-auto mt-2 text-white/40 group-hover:text-black/50 transition-colors duration-300" />
              </div>
            </a>
          </motion.div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.06] flex justify-between items-center">
          <p className="font-mono text-[10px] text-white/15 uppercase tracking-[0.2em]">© 2024 Muaddh Alsway</p>
          <p className="font-mono text-[10px] text-white/15 uppercase tracking-[0.2em] hidden sm:block">Front-End Developer</p>
        </div>
      </div>
    </section>
  );
}

// Project Detail Page (Full Screen Project View)
function ProjectDetailPage({ project, onBack, onViewCaseStudy }: { project: FullProject; onBack: () => void; onViewCaseStudy: (project: FullProject) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

  return (
    <motion.div className="fixed inset-0 z-[900] bg-black flex flex-col overflow-hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{project.num}</span>
          <h2 className="font-display text-white font-bold" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "-0.02em" }}>{project.title}</h2>
        </div>
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-200 group">
          <ChevronLeft size={16} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero image */}
        <div className="relative h-[45vh] md:h-[55vh] overflow-hidden bg-neutral-900">
          <img src={project.image} alt={project.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-6 md:left-12">
            <span className="inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 font-mono text-[10px] text-white/70 uppercase tracking-widest mb-3">{project.category}</span>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">{project.shortDesc}</p>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-20 py-16 max-w-5xl">
          {/* Overview */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Overview</p>
            <p className="text-white/65 leading-relaxed" style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>{project.overview}</p>
          </div>

          {/* Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[{ label: "Problem", content: project.problem, icon: "◎" }, { label: "Solution", content: project.solution, icon: "◈" }].map((item) => (
              <div key={item.label} className="p-6 rounded-2xl border border-white/[0.06] bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/30 font-mono text-sm">{item.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{item.label}</p>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[11px] text-white/50 hover:text-white hover:border-white/25 transition-all duration-200">{t}</span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Results</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.05] bg-card">
                  <span className="text-white/20 font-mono text-xs mt-0.5">→</span>
                  <span className="text-white/65 text-sm leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <div className="mb-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Screenshots</p>
              <div className="rounded-2xl overflow-hidden h-64 md:h-80 bg-neutral-900">
                <img src={project.screenshots[0]} alt="Project screenshot" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* CTA links */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-5">Project Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Live Demo */}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Live Demo</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* GitHub */}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Source Code</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* LinkedIn */}
              {project.linkedinUrl && project.linkedinUrl !== "#" && project.linkedinUrl !== undefined && (
                <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">LinkedIn Post</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* Notion */}
              {project.notionUrl && project.notionUrl !== "#" && project.notionUrl !== undefined && (
                <a href={project.notionUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <BookOpen size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Notion Doc</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* Wiki */}
              {project.wikiUrl && project.wikiUrl !== "#" && project.wikiUrl !== undefined && (
                <a href={project.wikiUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Wiki</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
              
              {/* Diagram */}
              {project.diagramUrl && project.diagramUrl !== "#" && project.diagramUrl !== undefined && (
                <a href={project.diagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <GitBranch size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-display text-white font-semibold text-sm">Diagram</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Case Study Button */}
          <div className="mb-16">
            <button onClick={() => onViewCaseStudy(project)}
              className="group w-full flex items-center justify-between px-8 py-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.06] hover:from-white/[0.06] hover:to-white/[0.1] hover:border-white/25 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.1] transition-all duration-300">
                  <FileText size={20} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <p className="font-display text-white font-bold text-lg group-hover:text-white transition-colors">View Case Study</p>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-1">Premium Awwwards-style breakdown</p>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-white/20 group-hover:text-white/60 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Full Projects Page
function ProjectsPage({ onBack, onViewProject, initialSelectedProject, onViewCaseStudy }: { onBack: () => void; onViewProject: (project: FullProject) => void; initialSelectedProject?: FullProject | null; onViewCaseStudy: (project: FullProject) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<FullProject | null>(initialSelectedProject || null);

  const filteredProjects = activeCategory === "All"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.categorySlug === CATEGORY_MAP[activeCategory]);

  const featuredProject = ALL_PROJECTS[0];

  const handleProjectClick = (project: FullProject) => {
    setSelectedProject(project);
    // Also update URL to include project slug
    const slug = createSlug(project.title);
    window.history.pushState(null, "", `/portfolio/${slug}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>
      {selectedProject ? (
        // Project Details View
        <>
          <div className="px-6 md:px-12 lg:px-20 py-8 border-b border-white/[0.06]">
            <button
              onClick={() => {
                setSelectedProject(null);
                window.history.pushState(null, "", "/portfolio");
              }}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors"
            >
              ← Back to Projects
            </button>
          </div>
          <ProjectDetailPage project={selectedProject} onBack={() => {
            setSelectedProject(null);
            window.history.pushState(null, "", "/portfolio");
          }} onViewCaseStudy={onViewCaseStudy} />
        </>
      ) : (
        // Projects List View
        <>
          <ProjectsHero />
          <MetricsSection />
          {(activeCategory === "All" || featuredProject.categorySlug === CATEGORY_MAP[activeCategory]) && (
            <FeaturedProjectSection project={featuredProject} onOpen={() => handleProjectClick(featuredProject)} />
          )}
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          <ProjectsGrid projects={filteredProjects} onOpen={handleProjectClick} />
          <ProjectsListView projects={filteredProjects} onOpen={handleProjectClick} showFeatured={activeCategory === "All" || featuredProject.categorySlug === CATEGORY_MAP[activeCategory]} />
          <TechVisualization />
          <ProjectsCTA />
        </>
      )}
    </div>
  );
}

// ─── Main Portfolio Page ──────────────────────────────────────────────────────

function PortfolioPage({ onViewProjects, onProjectClick }: { onViewProjects: () => void; onProjectClick?: (project: FullProject) => void }) {
  return (
    <div className="bg-black">
      <HeroSection onViewProjects={onViewProjects} />
      <MarqueeSection />
      
      <FeaturedClients />
      <PortfolioProjectsSection onViewAll={onViewProjects} onProjectClick={onProjectClick} />
      <ProductionProjectsSection onProjectClick={onProjectClick} />
      <SkillsSection />
      <ExperienceSection />
      <StorySection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState<FullProject | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<FullProject | null>(null);

  // Initialize from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    
    // Handle /portfolio route
    if (path === '/portfolio' || path === '/portfolio/') {
      setCurrentPage("projects");
      return;
    }

    // Handle case study routes like /trq-studio
    if (path === '/trq-studio' || path === '/trq-studio/') {
      setCurrentPage("case-study");
      const project = ALL_PROJECTS.find(p => createSlug(p.title) === 'trq-studio');
      if (project) setCaseStudyProject(project);
      return;
    }

    // Handle generic case study routes like /case-study/project-slug
    const caseStudyMatch = path.match(/^\/case-study\/([^/]+)\/?$/);
    if (caseStudyMatch) {
      const slug = caseStudyMatch[1];
      const project = ALL_PROJECTS.find(p => createSlug(p.title) === slug);
      if (project) {
        setCurrentPage("case-study");
        setCaseStudyProject(project);
        return;
      }
    }
    
    // Handle project detail routes like /portfolio/project-name
    const projectMatch = path.match(/^\/portfolio\/([^/]+)\/?$/);
    if (projectMatch) {
      const projectSlug = projectMatch[1];
      console.log("Looking for project with slug:", projectSlug);
      const project = findProjectBySlug(projectSlug);
      console.log("Found project:", project);
      if (project) {
        setCurrentPage("projects");
        setSelectedProject(project);
        return;
      } else {
        // If project not found, go to projects page
        setCurrentPage("projects");
        return;
      }
    }
    
    // Default to home
    setCurrentPage("home");
  }, []);

  const handlePreloaderDone = useCallback(() => {
    setLoading(false);
    requestAnimationFrame(() => setShowContent(true));
  }, []);

  const handleNavigate = useCallback((page: string, project?: FullProject) => {
    setCurrentPage(page);
    if (page === "project-detail" && project) {
      setSelectedProject(project);
      // Update URL with project slug
      const slug = createSlug(project.title);
      window.history.pushState(null, "", `/portfolio/${slug}`);
    } else if (page === "projects") {
      // Navigate to /portfolio
      window.history.pushState(null, "", "/portfolio");
    } else if (page === "case-study") {
      // Navigate to /case-study/slug
      if (project) {
        const slug = createSlug(project.title);
        window.history.pushState(null, "", `/case-study/${slug}`);
        setCaseStudyProject(project);
      } else {
        window.history.pushState(null, "", "/trq-studio");
      }
    } else if (page === "home") {
      // Reset URL to home
      window.history.pushState(null, "", "/");
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="dark bg-background min-h-screen overflow-x-hidden">
      <style>{GLOBAL_STYLES}</style>
      <CustomCursor />
      <GrainOverlay />

      <AnimatePresence>{loading && <Preloader onDone={handlePreloaderDone} />}</AnimatePresence>

      {showContent && (
        <>
          <Nav currentPage={currentPage} onNavigate={handleNavigate} />
          <AnimatePresence mode="wait">
            {currentPage === "home" ? (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <PortfolioPage onViewProjects={() => handleNavigate("projects")} onProjectClick={(project) => {
                  const slug = createSlug(project.title);
                  window.history.pushState(null, "", `/portfolio/${slug}`);
                  setCurrentPage("projects");
                  setSelectedProject(project);
                }} />
              </motion.div>
            ) : currentPage === "projects" ? (
              <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <ProjectsPage onBack={() => handleNavigate("home")} onViewProject={(project) => handleNavigate("project-detail", project)} initialSelectedProject={selectedProject} onViewCaseStudy={(project) => handleNavigate("case-study", project)} />
              </motion.div>
            ) : currentPage === "project-detail" && selectedProject ? (
              <motion.div key="project-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <ProjectDetailPage project={selectedProject} onBack={() => handleNavigate("projects")} onViewCaseStudy={(project) => handleNavigate("case-study", project)} />
              </motion.div>
            ) : currentPage === "case-study" && caseStudyProject ? (
              <motion.div key="case-study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <CaseStudyPage project={caseStudyProject} onBack={() => handleNavigate("home")} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
