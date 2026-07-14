import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { ChevronLeft, ExternalLink, Github, Linkedin, ArrowUpRight, AlertTriangle, Lightbulb, Code2, TrendingUp, CheckCircle2, Rocket, ArrowDown, ChevronRight, Eye } from "lucide-react";

/* ─────────────────────── Types ─────────────────────── */

interface CaseStudyProject {
  id: number;
  num?: string;
  title: string;
  shortDesc?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  category?: string;
  categorySlug?: string;
  year?: string;
  tech: string[];
  image: string;
  screenshots?: string[];
  alt?: string;
  results?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  linkedinUrl?: string;
  notionUrl?: string;
  wikiUrl?: string;
  diagramUrl?: string;
  client?: string;
  duration?: string;
  longDescription?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  name?: string;
  description?: string;
  github?: string;
  live?: string;
  linkedin?: string;
  folderStructure?: string[];
}

interface NextProject {
  title: string;
  slug: string;
  image: string;
  category?: string;
}

/* ─────────────────────── Helpers ─────────────────────── */

function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitToList(str: string | undefined, fallback: string[] = []): string[] {
  if (!str) return fallback;
  return str.split(/[.]\s+/).filter(Boolean).map(s => s.trim().replace(/\.$/, ""));
}

function generateFolderStructure(project: CaseStudyProject): string[] {
  if (project.folderStructure && project.folderStructure.length > 0) {
    return project.folderStructure;
  }

  const tech = project.tech.map(t => t.toLowerCase());
  const cat = (project.category || "").toLowerCase();
  const name = (project.name || project.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const has = (s: string) => tech.some(t => t.includes(s));
  const isFullstack = cat === "fullstack" || cat === "";
  const isBackend = cat === "purebackend";
  const isHtmlCss = cat === "htmlcssjs" || cat === "htmlcss";
  const isC = cat === "c";

  const lines: string[] = [`${name}/`];

  if (isC) {
    lines.push("├── src/");
    lines.push("│   ├── main.c");
    lines.push("│   ├── utils.c");
    lines.push("│   └── utils.h");
    lines.push("├── include/");
    lines.push("│   └── project.h");
    lines.push("├── Makefile");
    lines.push("├── README.md");
    lines.push("└── .gitignore");
    return lines;
  }

  if (isHtmlCss) {
    lines.push("├── public/");
    lines.push("│   └── assets/");
    lines.push("│       ├── images/");
    lines.push("│       └── css/");
    lines.push("├── src/");
    lines.push("│   ├── index.html");
    lines.push("│   ├── styles.css");
    lines.push("│   ├── script.js");
    lines.push("│   └── pages/");
    if (has("javascript")) {
      lines.push("│       ├── app.js");
      lines.push("│       └── utils.js");
    }
    lines.push("├── README.md");
    lines.push("└── .gitignore");
    return lines;
  }

  if (isBackend) {
    lines.push("├── src/");
    lines.push("│   ├── index.js");
    lines.push("│   ├── routes/");
    if (has("auth") || has("jwt")) {
      lines.push("│   │   ├── auth.js");
    }
    lines.push("│   │   └── api.js");
    lines.push("│   ├── middleware/");
    if (has("auth") || has("jwt")) {
      lines.push("│   │   ├── auth.js");
    }
    lines.push("│   │   ├── validate.js");
    lines.push("│   │   └── rateLimit.js");
    lines.push("│   ├── models/");
    lines.push("│   │   └── schema.js");
    if (has("turso") || has("sqlite") || has("libsql")) {
      lines.push("│   ├── db/");
      lines.push("│   │   ├── connection.js");
      lines.push("│   │   └── migrations/");
    }
    if (has("express")) {
      lines.push("│   └── app.js");
    }
    lines.push("├── package.json");
    lines.push("├── .env");
    lines.push("├── README.md");
    lines.push("└── .gitignore");
    return lines;
  }

  // Fullstack / default
  lines.push("├── src/");
  lines.push("│   ├── components/");

  if (has("react") || has("next")) {
    lines.push("│   │   ├── ui/");
    lines.push("│   │   │   ├── Button.jsx");
    lines.push("│   │   │   ├── Card.jsx");
    lines.push("│   │   │   └── Modal.jsx");
    lines.push("│   │   ├── layout/");
    lines.push("│   │   │   ├── Header.jsx");
    lines.push("│   │   │   ├── Footer.jsx");
    lines.push("│   │   │   └── Sidebar.jsx");
    lines.push("│   │   └── sections/");
    lines.push("│   │       ├── Hero.jsx");
    lines.push("│   │       └── Features.jsx");
  } else {
    lines.push("│   │   └── components/");
  }

  lines.push("│   ├── pages/");
  if (has("next")) {
    lines.push("│   │   ├── page.jsx");
    lines.push("│   │   ├── layout.jsx");
    lines.push("│   │   └── about/");
    lines.push("│   │       └── page.jsx");
  } else if (has("react")) {
    lines.push("│   │   ├── Home.jsx");
    lines.push("│   │   ├── About.jsx");
    lines.push("│   │   └── Projects.jsx");
  } else {
    lines.push("│   │   └── index.js");
  }

  if (has("react") || has("next")) {
    lines.push("│   ├── hooks/");
    lines.push("│   │   └── useAuth.js");
    lines.push("│   ├── context/");
    lines.push("│   │   └── AppContext.jsx");
  }

  if (has("typescript")) {
    lines.push("│   ├── types/");
    lines.push("│   │   └── index.ts");
  }

  if (isFullstack && (has("express") || has("node") || has("api"))) {
    lines.push("│   ├── api/");
    lines.push("│   │   ├── index.js");
    lines.push("│   │   ├── routes/");
    lines.push("│   │   │   └── index.js");
    lines.push("│   │   ├── middleware/");
    lines.push("│   │   │   ├── auth.js");
    lines.push("│   │   │   └── validate.js");
    lines.push("│   │   └── models/");
    lines.push("│   │       └── index.js");
  }

  lines.push("│   ├── assets/");
  lines.push("│   │   ├── images/");
  lines.push("│   │   └── styles/");
  lines.push("│   ├── utils/");
  lines.push("│   │   └── helpers.js");
  lines.push("│   ├── App.jsx");
  lines.push("│   └── main.jsx");

  if (has("turso") || has("sqlite") || has("libsql") || has("prisma") || has("mongoose") || has("mongodb")) {
    lines.push("├── db/");
    lines.push("│   ├── schema.js");
    lines.push("│   ├── seed.js");
    lines.push("│   └── migrations/");
  }

  if (has("next")) {
    lines.push("├── public/");
    lines.push("│   ├── favicon.ico");
    lines.push("│   └── images/");
  } else {
    lines.push("├── public/");
    lines.push("│   └── assets/");
  }

  lines.push("├── package.json");
  if (has("typescript")) {
    lines.push("├── tsconfig.json");
  }
  if (has("tailwind")) {
    lines.push("├── tailwind.config.js");
  }
  if (has("vite")) {
    lines.push("├── vite.config.js");
  }
  if (has("next")) {
    lines.push("├── next.config.js");
  }
  lines.push("├── .env");
  lines.push("├── .gitignore");
  lines.push("└── README.md");

  return lines;
}

/* ─────────────────────── Hooks ─────────────────────── */

function useCountUp(end: number, duration = 2000, startOnView = false, ref?: React.RefObject<HTMLElement | null>) {
  const [count, setCount] = useState(0);
  const isInView = useInView(ref || { current: null }, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView]);

  return count;
}

function useParallax(ref: React.RefObject<HTMLElement | null>, offset: [string, string] = ["0%", "30%"]) {
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  return y;
}

/* ─────────────────────── Shared Components ─────────────────────── */

function FadeIn({ children, delay = 0, className = "", y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/20 mb-5">{text}</p>;
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-white leading-[1.05] mb-8 ${className}`} style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
      {children}
    </h2>
  );
}

/* ─────────────────────── 1. Scroll Progress ─────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #00D8FF 0%, #00D8FF 60%, #00D8FF40 100%)" }}
    />
  );
}

/* ─────────────────────── 2. Cinematic Hero ─────────────────────── */

function CinematicHero({ project, onBack }: { project: CaseStudyProject; onBack: () => void }) {
  const ref = useRef(null);
  const y = useParallax(ref, ["start start", "end start"]);
  const imgY = useTransform(useScroll({ target: ref, offset: ["start start", "end start"] }).scrollYProgress, [0, 1], [0, 150]);

  const projectName = project.title || project.name || "Project";
  const tagline = project.shortDesc || project.description || "";

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-24 pt-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
        <img src={project.image} alt={projectName} className="w-full h-full object-cover opacity-25 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(0,216,255,0.07) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(0,216,255,0.04) 0%, transparent 50%)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/30 hover:text-white/70 font-mono text-[10px] uppercase tracking-[0.2em] mb-12 transition-colors duration-300 group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </motion.button>

        {/* Category Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 mb-6">
            {project.category || "Case Study"} — {project.year || "2025"}
          </p>
        </motion.div>

        {/* Massive Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-white leading-[0.92]"
            style={{ fontSize: "clamp(52px, 11vw, 160px)", fontWeight: 800, letterSpacing: "-0.05em" }}
          >
            {projectName}
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-8">
          <p className="text-white/45 max-w-2xl" style={{ fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.5 }}>
            {tagline}
          </p>
        </motion.div>

        {/* Meta Row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.75 }} className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
          {[
            project.client && project.client !== "Case Study" && { label: "Client", value: project.client },
            project.duration && { label: "Duration", value: project.duration },
            { label: "Year", value: project.year || "2025" },
          ]
            .filter(Boolean)
            .map((item) => item && (
              <div key={item.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 mb-1">{item.label}</p>
                <p className="text-white/65 text-sm font-medium">{item.value}</p>
              </div>
            ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }} className="flex flex-wrap gap-2 mb-10">
          {project.tech.slice(0, 8).map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] text-white/35 hover:border-white/20 hover:text-white/50 transition-all duration-300">
              {t}
            </span>
          ))}
          {project.tech.length > 8 && (
            <span className="px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-[10px] text-white/20">
              +{project.tech.length - 8} more
            </span>
          )}
        </motion.div>

        {/* Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.05 }} className="flex flex-wrap gap-3">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-[#00D8FF]/10 hover:border-[#00D8FF]/30 text-white/65 hover:text-[#00D8FF] font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300">
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/65 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300">
              <Github size={12} /> Source Code
            </a>
          )}
          {project.linkedinUrl && project.linkedinUrl !== "#" && (
            <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/65 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300">
              <Linkedin size={12} /> LinkedIn Post
            </a>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/15">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={14} className="text-white/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── 3. Big Numbers ─────────────────────── */

function BigNumbersSection({ project }: { project: CaseStudyProject }) {
  const ref = useRef(null);
  const techCount = project.tech.length;
  const featureCount = project.features?.length || 0;
  const durationMonths = project.duration ? (project.duration.match(/\d+/)?.[0] || "1") : "1";

  const nums = [
    { end: parseInt(durationMonths) || 1, suffix: "", label: project.duration?.includes("month") ? "Months" : project.duration?.includes("week") ? "Weeks" : project.duration?.includes("day") ? "Days" : "Duration" },
    { end: techCount, suffix: "+", label: "Technologies" },
    { end: featureCount, suffix: "+", label: "Features Built" },
    { end: 99, suffix: "%", label: "Completion" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {nums.map((n, i) => (
            <BigNumberCard key={i} end={n.end} suffix={n.suffix} label={n.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BigNumberCard({ end, suffix, label, delay }: { end: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null);
  const count = useCountUp(end, 1800, true, ref);

  return (
    <FadeIn delay={delay} className="text-center">
      <div ref={ref}>
        <p className="font-display text-white leading-none mb-3" style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
          {count}<span className="text-white/30">{suffix}</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">{label}</p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────── 4. About Section ─────────────────────── */

function AboutSection({ project }: { project: CaseStudyProject }) {
  const desc = project.longDescription || project.overview || project.description || "";
  const paragraphs = desc.split("\n\n").filter(Boolean);
  const pullQuote = paragraphs[0] || desc.slice(0, 200);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#08080a" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn>
          <SectionLabel text="About This Project" />
          <SectionTitle>The Vision</SectionTitle>
        </FadeIn>

        {/* Pull Quote */}
        <FadeIn delay={0.1} className="mb-14">
          <div className="relative pl-6 md:pl-8 border-l-2 border-[#00D8FF]/30">
            <p className="text-white/55 italic" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.6, letterSpacing: "-0.01em" }}>
              "{pullQuote}"
            </p>
          </div>
        </FadeIn>

        {/* Body Text */}
        <div className="max-w-4xl space-y-6">
          {paragraphs.slice(1).map((p, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.05}>
              <p className="text-white/45 leading-relaxed" style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}>
                {p}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 5. Project Details Table ─────────────────────── */

function DetailsTableSection({ project }: { project: CaseStudyProject }) {
  const categoryLabels: Record<string, string> = {
    fullstack: "Full Stack Development",
    purebackend: "Backend Engineering",
    htmlcssjs: "Frontend Development",
    htmlcss: "Static Design",
    c: "Systems Programming",
  };

  const rows: [string, string][] = [
    ["Client", project.client || "Case Study"],
    ["Industry", categoryLabels[project.category || ""] || "Web Development"],
    ["Role", "Full-Stack Developer & Solutions Architect"],
    ["Timeline", project.duration || "N/A"],
    ["Team", "1 Developer"],
    ["Platform", "Web (Desktop, Tablet, Mobile)"],
    ["Tech Stack", project.tech.join(" · ")],
    ["Status", project.liveUrl ? "Production — Live" : "Case Study"],
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Project Overview" />
          <SectionTitle>Details</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "#0a0a0c" }}>
            {rows.map(([label, value], i) => (
              <div key={i} className={`flex flex-col sm:flex-row ${i !== rows.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.02] transition-colors duration-200`}>
                <div className="w-full sm:w-1/3 md:w-1/4 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25 bg-white/[0.015] shrink-0">{label}</div>
                <div className="flex-1 px-6 py-4 text-white/55 text-sm leading-relaxed">{value}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────── 6. The Challenge ─────────────────────── */

function ChallengeSection({ project }: { project: CaseStudyProject }) {
  const challengeText = project.challenges || project.problem || "Every project presents unique technical and design challenges that push the boundaries of what's possible with modern web technologies.";

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04] relative overflow-hidden" style={{ background: "#050505" }}>
      {/* Dramatic ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(239,68,68,0.04) 0%, transparent 60%)" }} />

      <div className="px-6 md:px-12 lg:px-20 max-w-5xl relative">
        <FadeIn>
          <SectionLabel text="The Challenge" />
          <SectionTitle>What We Faced</SectionTitle>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-start gap-5 p-8 rounded-2xl border border-red-500/10 bg-red-500/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
              <AlertTriangle size={20} className="text-red-400/60" />
            </div>
            <div className="space-y-4">
              {splitToList(challengeText).map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-white/10 font-mono text-xs mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-white/50 text-sm leading-relaxed">{c}.</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────── 7. The Solution ─────────────────────── */

function SolutionSection({ project }: { project: CaseStudyProject }) {
  const solutionText = project.learnings || project.solution || "Through careful planning, iterative development, and leveraging modern tools and frameworks, we delivered a robust and scalable solution.";

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04] relative overflow-hidden" style={{ background: "#0a0a0f" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)" }} />

      <div className="px-6 md:px-12 lg:px-20 max-w-5xl relative">
        <FadeIn>
          <SectionLabel text="The Solution" />
          <SectionTitle>How We Built It</SectionTitle>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-start gap-5 p-8 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Lightbulb size={20} className="text-emerald-400/60" />
            </div>
            <div className="space-y-4">
              {splitToList(solutionText).map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="text-emerald-400/30 mt-1 shrink-0" />
                  <p className="text-white/50 text-sm leading-relaxed">{s}.</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────── 8. Engineering Challenges ─────────────────────── */

function EngineeringChallengesSection({ project }: { project: CaseStudyProject }) {
  const challenges = splitToList(project.challenges, ["Complex integration requirements", "Performance optimization under load", "Responsive design across all devices", "Security implementation and testing"]);
  const learnings = splitToList(project.learnings, ["Modern framework architecture patterns", "Performance optimization techniques", "Security best practices", "Responsive design strategies"]);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn>
          <SectionLabel text="Deep Dive" />
          <SectionTitle>Engineering Deep Dive</SectionTitle>
        </FadeIn>

        {/* Challenges */}
        <FadeIn delay={0.1} className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 mb-5 flex items-center gap-3">
            <Code2 size={12} className="text-white/15" />
            Challenges & Obstacles
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((c, i) => (
              <StaggerItem key={i}>
                <div className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[11px] text-white/10 font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <div className="h-px flex-1 bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors" />
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{c}.</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>

        {/* Learnings */}
        <FadeIn delay={0.2}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 mb-5 flex items-center gap-3 mt-14">
            <Rocket size={12} className="text-white/15" />
            Key Learnings & Takeaways
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learnings.map((l, i) => (
              <StaggerItem key={i}>
                <div className="group p-5 rounded-2xl border border-[#00D8FF]/[0.06] bg-[#00D8FF]/[0.015] hover:border-[#00D8FF]/[0.15] hover:bg-[#00D8FF]/[0.03] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 size={14} className="text-[#00D8FF]/20 group-hover:text-[#00D8FF]/40 transition-colors" />
                    <div className="h-px flex-1 bg-[#00D8FF]/[0.05] group-hover:bg-[#00D8FF]/[0.1] transition-colors" />
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{l}.</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────── 9. Tech Stack ─────────────────────── */

function TechStackSection({ project }: { project: CaseStudyProject }) {
  const techColors: Record<string, string> = {
    React: "#61DAFB", ReactJS: "#61DAFB", "React 19": "#61DAFB", "React 18": "#61DAFB", "React 19.2": "#61DAFB", "React 19.2.7": "#61DAFB", "React 18.3.1": "#61DAFB",
    NextJS: "#000000", "Next.js 14": "#000000", "Next.js": "#000000",
    TypeScript: "#3178C6", "TypeScript 5.0+": "#3178C6",
    Tailwind: "#06B6D4", "Tailwind CSS": "#06B6D4", "Tailwind CSS 3.4": "#06B6D4", "Tailwind CSS 4": "#06B6D4", "Tailwind CSS 4.1.12": "#06B6D4",
    Vite: "#BD34FE", "Vite 7": "#BD34FE", "Vite 7.2": "#BD34FE", "Vite 8.1.1": "#BD34FE", "Vite 6": "#BD34FE", "Vite 6.3.5": "#BD34FE",
    Node: "#339933", "Node.js": "#339933", "Node.js 12": "#339933",
    MongoDB: "#47A248", Mongoose: "#47A248",
    Express: "#000000", "Express.js": "#000000", "Express.js 4.21": "#000000", "Express 5": "#000000",
    SQLite: "#003B57", Turso: "#003B57", "SQLite/Turso": "#003B57", "Turso (libSQL)": "#003B57",
    PHP: "#777BB4", "PHP 7.4+": "#777BB4",
    MySQL: "#4479A1", "MySQL 5.7+": "#4479A1",
    Firebase: "#FFCA28",
    Stripe: "#635BFF",
    JWT: "#000000",
    HTML5: "#E34F26", HTML: "#E34F26", CSS3: "#1572B6", CSS: "#1572B6",
    JavaScript: "#F7DF1E", "JavaScript (ES6)": "#F7DF1E",
    Python: "#3776AB", C: "#A8B9CC", "C++": "#00599C",
    Docker: "#2496ED",
    AWS: "#FF9900",
    GSAP: "#88CE02",
  };

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#08080a" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn>
          <SectionLabel text="Technology Stack" />
          <SectionTitle>Built With</SectionTitle>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {project.tech.map((t) => {
            const color = techColors[t] || "#666";
            return (
              <StaggerItem key={t}>
                <div className="group relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 text-center">
                  <div
                    className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center text-white/80 font-display text-xs font-bold"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    {t.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white/60 text-xs font-medium leading-tight block">{t}</span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─────────────────────── 10. Project Structure ─────────────────────── */

function FileStructureSection({ project }: { project: CaseStudyProject }) {
  const structure = generateFolderStructure(project);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-4xl">
        <FadeIn>
          <SectionLabel text="Project Structure" />
          <SectionTitle>How It's Organized</SectionTitle>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "#0a0a0c" }}>
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 font-mono text-[10px] text-white/20 uppercase tracking-wider">Terminal</span>
            </div>

            {/* File Tree */}
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-[13px] leading-[1.8] text-white/45 select-none">
                {structure.map((line, i) => {
                  const isFolder = line.includes("/") && !line.includes("──");
                  const isFile = line.includes(".");
                  const isLast = line.includes("└──");

                  let colorClass = "text-white/40";
                  if (isFolder) colorClass = "text-[#00D8FF]/60";
                  else if (isFile) {
                    if (line.includes(".json") || line.includes(".config") || line.includes(".env")) colorClass = "text-yellow-400/50";
                    else if (line.includes(".md")) colorClass = "text-emerald-400/50";
                    else if (line.includes(".js") || line.includes(".jsx") || line.includes(".ts") || line.includes(".tsx")) colorClass = "text-blue-400/50";
                    else if (line.includes(".css")) colorClass = "text-pink-400/50";
                    else if (line.includes(".html")) colorClass = "text-orange-400/50";
                    else if (line.includes(".c") || line.includes(".h")) colorClass = "text-purple-400/50";
                  }

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      className={`whitespace-nowrap ${colorClass} hover:text-white/70 transition-colors duration-200`}
                    >
                      {line}
                    </motion.div>
                  );
                })}
              </pre>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────── 11. Core Features ─────────────────────── */

function FeaturesSection({ project }: { project: CaseStudyProject }) {
  const features = project.features || [];
  if (features.length === 0) return null;

  const displayFeatures = features.slice(0, 12);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn>
          <SectionLabel text="Core Features" />
          <SectionTitle>Platform Capabilities</SectionTitle>
        </FadeIn>

        <div className="space-y-3">
          {displayFeatures.map((f, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="group flex items-center gap-5 p-5 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.035] transition-all duration-300">
                <span className="font-mono text-[11px] text-white/10 font-bold shrink-0 w-8">{String(i + 1).padStart(2, "0")}</span>
                <div className="h-6 w-px bg-white/[0.06] group-hover:bg-[#00D8FF]/20 shrink-0 transition-colors" />
                <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{f}</p>
                <ChevronRight size={14} className="text-white/10 group-hover:text-[#00D8FF]/40 ml-auto shrink-0 transition-all group-hover:translate-x-1" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── 12. Full-Bleed Showcase ─────────────────────── */

function ShowcaseSection({ project }: { project: CaseStudyProject }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["24px", "0px"]);

  return (
    <section ref={ref} className="py-12 md:py-20 border-t border-white/[0.04] overflow-hidden" style={{ background: "#050505" }}>
      <FadeIn className="mb-8 px-6 md:px-12 lg:px-20 max-w-6xl">
        <SectionLabel text="Project Showcase" />
        <SectionTitle>The Product</SectionTitle>
      </FadeIn>

      <motion.div style={{ scale, opacity, borderRadius }} className="mx-4 md:mx-8 lg:mx-16 overflow-hidden shadow-2xl shadow-black/50">
        <img
          src={project.image}
          alt={project.title || project.name}
          className="w-full h-auto object-cover"
          style={{ maxHeight: "80vh" }}
        />
      </motion.div>

      <FadeIn delay={0.2} className="text-center mt-8 px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/15">
          {project.title || project.name} — Production Interface
        </p>
      </FadeIn>
    </section>
  );
}

/* ─────────────────────── 13. Results & Impact ─────────────────────── */

function ResultsSection({ project }: { project: CaseStudyProject }) {
  const results = project.results || [];
  const defaultResults = [
    { metric: "96", label: "Lighthouse Score", suffix: "/100" },
    { metric: "1.1", label: "First Contentful Paint", suffix: "s" },
    { metric: "180", label: "Bundle Size (gzipped)", suffix: "KB" },
    { metric: "<50", label: "API Response (p95)", suffix: "ms" },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04] relative overflow-hidden" style={{ background: "#08080a" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,216,255,0.04) 0%, transparent 60%)" }} />

      <div className="px-6 md:px-12 lg:px-20 max-w-6xl relative">
        <FadeIn>
          <SectionLabel text="Results & Impact" />
          <SectionTitle>Outcomes</SectionTitle>
        </FadeIn>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {defaultResults.map((r, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center hover:border-[#00D8FF]/20 transition-all duration-300">
                <p className="font-display text-white leading-none mb-2" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  {r.metric}<span className="text-white/25 text-[0.6em]">{r.suffix}</span>
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">{r.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Detailed Results */}
        {results.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                  <TrendingUp size={16} className="text-[#00D8FF]/30 mt-0.5 shrink-0" />
                  <p className="text-white/50 text-sm leading-relaxed">{r}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────── 14. Key Learnings Timeline ─────────────────────── */

function LearningsTimeline({ project }: { project: CaseStudyProject }) {
  const learnings = splitToList(project.learnings, [
    "Modern development workflows and best practices",
    "Performance optimization techniques for production",
    "Responsive design across all device sizes",
    "Security implementation and testing methodologies",
  ]);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Reflections" />
          <SectionTitle>Key Learnings</SectionTitle>
        </FadeIn>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00D8FF]/20 via-white/[0.06] to-transparent" />

          <div className="space-y-8">
            {learnings.map((l, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-5 group">
                  {/* Timeline Dot */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#00D8FF]/30 group-hover:bg-[#00D8FF]/[0.03] transition-all duration-300">
                      <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00D8FF]/50 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/65 transition-colors">{l}.</p>
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

/* ─────────────────────── 15. Links & Next Project CTA ─────────────────────── */

function LinksAndCTA({ project, onBack, nextProject }: { project: CaseStudyProject; onBack: () => void; nextProject?: NextProject | null }) {
  const links = [
    project.liveUrl && project.liveUrl !== "#" && { label: "Live Demo", url: project.liveUrl, icon: <ExternalLink size={18} />, color: "#00D8FF" },
    (project.githubUrl || project.github) && (project.githubUrl || project.github) !== "#" && { label: "Source Code", url: project.githubUrl || project.github || "#", icon: <Github size={18} />, color: "#fff" },
    (project.linkedinUrl || project.linkedin) && (project.linkedinUrl || project.linkedin) !== "#" && { label: "LinkedIn Post", url: project.linkedinUrl || project.linkedin || "#", icon: <Linkedin size={18} />, color: "#0A66C2" },
  ].filter(Boolean) as { label: string; url: string; icon: React.ReactNode; color: string }[];

  return (
    <>
      {/* Project Links */}
      {links.length > 0 && (
        <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#08080a" }}>
          <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
            <FadeIn>
              <SectionLabel text="Explore" />
              <SectionTitle>Project Links</SectionTitle>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {links.map((link, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <span className="text-white/30 group-hover:text-white/70 transition-colors">{link.icon}</span>
                      <div>
                        <span className="font-display text-white font-semibold text-sm block">{link.label}</span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/20 mt-1 block">Open in new tab</span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-white/15 group-hover:text-white/50 transition-colors" />
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project CTA */}
      <section className="py-24 md:py-36 border-t border-white/[0.04] relative overflow-hidden" style={{ background: "#050505" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,216,255,0.05) 0%, transparent 60%)" }} />

        <div className="px-6 md:px-12 lg:px-20 text-center relative">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/15 mb-6">End of Case Study</p>

            {/* Project Title */}
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-white leading-[0.95]"
                style={{ fontSize: "clamp(36px, 7vw, 96px)", fontWeight: 800, letterSpacing: "-0.05em" }}
              >
                {project.title || project.name}
              </motion.h2>
            </div>

            <p className="text-white/30 max-w-lg mx-auto mb-10" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
              {project.shortDesc || project.description}
            </p>
          </FadeIn>

          {/* Next Project */}
          {nextProject && (
            <FadeIn delay={0.2}>
              <a href={`/case-study/${nextProject.slug}`} className="group inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 max-w-md w-full mb-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">Next Project</p>
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/[0.08]">
                  <img src={nextProject.image} alt={nextProject.title} className="w-full h-full object-cover" />
                </div>
                <span className="font-display text-white font-bold text-lg group-hover:text-[#00D8FF] transition-colors">{nextProject.title}</span>
                {nextProject.category && <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">{nextProject.category}</span>}
              </a>
            </FadeIn>
          )}

          {/* Back Button */}
          <FadeIn delay={0.3}>
            <button onClick={onBack}
              className="px-8 py-3 rounded-full border border-white/15 hover:border-[#00D8FF]/40 bg-white/[0.04] hover:bg-[#00D8FF]/[0.06] text-white/60 hover:text-white font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
              Back to Portfolio
            </button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────── Main Export ─────────────────────── */

export function CaseStudyPage({ project, onBack }: { project: CaseStudyProject; onBack: () => void }) {
  const [nextProject, setNextProject] = useState<NextProject | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

  // Find next project
  useEffect(() => {
    const allProjects = [
      { title: "TRQ Studio", slug: "trq-studio", image: "/Projects/mockup/TRQ.png", category: "Full Stack" },
      { title: "Mesaha Lakum", slug: "mesaha-lakum", image: "/Projects/mockup/LAKUM.png", category: "Full Stack" },
      { title: "TD Logistics", slug: "td-logistics", image: "/Projects/mockup/TD.png", category: "Full Stack" },
      { title: "MUCOMMERANCE", slug: "mucommerance", image: "/Projects/mockup/MUCOMMERANCE (2).png", category: "Full Stack" },
      { title: "Writer's Journey", slug: "writer-s-journey", image: "/Projects/mockup/WRITING.png", category: "Full Stack" },
      { title: "Riyadah", slug: "riyadah", image: "/Projects/mockup/ALRYADH.png", category: "Full Stack" },
    ];

    const currentSlug = createSlug(project.title || project.name || "");
    const currentIndex = allProjects.findIndex(p => p.slug === currentSlug);
    const nextIndex = (currentIndex + 1) % allProjects.length;

    if (currentIndex !== -1 && allProjects[nextIndex]) {
      setNextProject(allProjects[nextIndex]);
    }
  }, [project]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-black min-h-screen">
      <ScrollProgress />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[950] flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Eye size={12} className="text-white/15" />
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Case Study</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-white/50 text-sm font-medium">{project.title || project.name}</span>
        </div>
        <button onClick={onBack} className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-200 group">
          <ChevronLeft size={14} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      <CinematicHero project={project} onBack={onBack} />
      <BigNumbersSection project={project} />
      <AboutSection project={project} />
      <DetailsTableSection project={project} />
      <ChallengeSection project={project} />
      <SolutionSection project={project} />
      <EngineeringChallengesSection project={project} />
      <TechStackSection project={project} />
      <FileStructureSection project={project} />
      <FeaturesSection project={project} />
      <ShowcaseSection project={project} />
      <ResultsSection project={project} />
      <LearningsTimeline project={project} />
      <LinksAndCTA project={project} onBack={onBack} nextProject={nextProject} />
    </motion.div>
  );
}
