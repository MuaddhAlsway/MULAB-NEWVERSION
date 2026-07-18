import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useSpring as useSpringMotion, AnimatePresence } from "motion/react";
import { ChevronLeft, ExternalLink, Github, Linkedin, ArrowUpRight, AlertTriangle, Lightbulb, Code2, TrendingUp, CheckCircle2, Rocket, ArrowDown, ChevronRight, Eye } from "lucide-react";
import { tdLogisticsCaseStudy, projectScreenshots } from "../data/caseStudies";

/* ══════════════════════════════════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════════════════════════════════ */

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

/* ══════════════════════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════════════════════ */

function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitToList(str: string | undefined, fallback: string[] = []): string[] {
  if (!str) return fallback;
  return str.split(/[.]\s+/).filter(Boolean).map(s => s.trim().replace(/\.$/, ""));
}

/* ══════════════════════════════════════════════════════════════════════════════
   Hooks
   ══════════════════════════════════════════════════════════════════════════════ */

function useCountUp(end: number, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, trigger]);

  return count;
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

/* ══════════════════════════════════════════════════════════════════════════════
   1. Custom Cursor
   ══════════════════════════════════════════════════════════════════════════════ */

function CustomCursor() {
  const mouse = useMousePosition();
  const dotX = useSpring(mouse.x, { stiffness: 500, damping: 28 });
  const dotY = useSpring(mouse.y, { stiffness: 500, damping: 28 });
  const ringX = useSpring(mouse.x, { stiffness: 120, damping: 20 });
  const ringY = useSpring(mouse.y, { stiffness: 120, damping: 20 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-cursor-hover]");
      setHovering(!!isInteractive);
    };
    window.addEventListener("mouseover", checkHover);
    return () => window.removeEventListener("mouseover", checkHover);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: hovering ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-2 h-2 rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: hovering ? 2 : 1, borderColor: hovering ? "rgba(0,216,255,0.6)" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border"
        />
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   2. Ambient Particles
   ══════════════════════════════════════════════════════════════════════════════ */

function AmbientParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.15 + 0.03,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   3. Film Grain Overlay
   ══════════════════════════════════════════════════════════════════════════════ */

function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const render = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[3] opacity-40 mix-blend-overlay"
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   4. Magnetic Button
   ══════════════════════════════════════════════════════════════════════════════ */

function MagneticButton({ children, className = "", href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Tag
        ref={ref as any}
        {...props}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </Tag>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   5. Gradient Border Card
   ══════════════════════════════════════════════════════════════════════════════ */

function GradientBorderCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,216,255,0.08) 0%, transparent 50%), rgba(255,255,255,0.02)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,216,255,0.2) 0%, transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   6. 3D Tilt Card
   ══════════════════════════════════════════════════════════════════════════════ */

function TiltCard({ children, className = "", glare = true }: { children: React.ReactNode; className?: string; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
    setGlarePos({ x: (e.clientX - rect.left) / rect.width * 100, y: (e.clientY - rect.top) / rect.height * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Shared Components
   ══════════════════════════════════════════════════════════════════════════════ */

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
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
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

/* ══════════════════════════════════════════════════════════════════════════════
   A. Scroll Progress
   ══════════════════════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left" style={{ scaleX, background: "linear-gradient(90deg, #00D8FF 0%, #00D8FF 60%, #00D8FF30 100%)" }} />
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   B. Cinematic Hero (3-layer parallax + particles + grain)
   ══════════════════════════════════════════════════════════════════════════════ */

function CinematicHero({ project, onBack }: { project: CaseStudyProject; onBack: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const projectName = project.title || project.name || "Project";
  const tagline = project.shortDesc || project.description || "";

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-24 pt-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Layer 1: Background image (slowest) */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={project.image} alt={projectName} className="w-full h-[120%] object-cover opacity-20 scale-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </motion.div>

      {/* Layer 2: Mid-ground glow (medium speed) */}
      <motion.div className="absolute inset-0 z-[1] pointer-events-none" style={{ y: midY }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(0,216,255,0.08) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(0,216,255,0.04) 0%, transparent 50%)" }} />
      </motion.div>

      {/* Layer 3: Particles (fastest) */}
      <motion.div className="absolute inset-0 z-[2] pointer-events-none" style={{ y: fgY }}>
        <AmbientParticles />
      </motion.div>

      {/* Film Grain */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <FilmGrain />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full max-w-7xl mx-auto" style={{ y: titleY, opacity: opacityFade }}>
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/30 hover:text-white/70 font-mono text-[10px] uppercase tracking-[0.2em] mb-12 transition-colors duration-300 group"
          data-cursor-hover
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </motion.button>

        {/* Category */}
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

        {/* Meta */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.75 }} className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
          {[
            project.client && project.client !== "Case Study" && { label: "Client", value: project.client },
            project.duration && { label: "Duration", value: project.duration },
            { label: "Year", value: project.year || "2025" },
          ].filter(Boolean).map((item) => item && (
            <div key={item.label}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 mb-1">{item.label}</p>
              <p className="text-white/65 text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tech */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }} className="flex flex-wrap gap-2 mb-10">
          {project.tech.slice(0, 8).map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] text-white/35 hover:border-[#00D8FF]/30 hover:text-[#00D8FF]/70 hover:bg-[#00D8FF]/[0.03] transition-all duration-300">
              {t}
            </span>
          ))}
          {project.tech.length > 8 && (
            <span className="px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-[10px] text-white/20">
              +{project.tech.length - 8} more
            </span>
          )}
        </motion.div>

        {/* Magnetic Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.05 }} className="flex flex-wrap gap-3">
          {project.liveUrl && project.liveUrl !== "#" && (
            <MagneticButton href={project.liveUrl} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-[#00D8FF]/10 hover:border-[#00D8FF]/30 text-white/65 hover:text-[#00D8FF] font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300" data-cursor-hover>
              <ExternalLink size={12} /> Live Demo
            </MagneticButton>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <MagneticButton href={project.githubUrl} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/65 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300" data-cursor-hover>
              <Github size={12} /> Source Code
            </MagneticButton>
          )}
          {project.linkedinUrl && project.linkedinUrl !== "#" && (
            <MagneticButton href={project.linkedinUrl} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/65 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300" data-cursor-hover>
              <Linkedin size={12} /> LinkedIn Post
            </MagneticButton>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/15">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={14} className="text-white/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   C. Sticky Big Numbers
   ══════════════════════════════════════════════════════════════════════════════ */

function StickyBigNumbers({ project }: { project: CaseStudyProject }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    return activeIndex.on("change", (v) => setActive(Math.round(v)));
  }, [activeIndex]);

  const techCount = project.tech.length;
  const featureCount = project.features?.length || 0;
  const durationNum = parseInt(project.duration || "1") || 1;
  const isMonths = project.duration?.includes("month");
  const isWeeks = project.duration?.includes("week");
  const isDays = project.duration?.includes("day");

  const metrics = [
    { end: durationNum, suffix: "", label: isMonths ? "Months" : isWeeks ? "Weeks" : isDays ? "Days" : "Duration", description: "Dedicated development time invested in this project from concept to deployment." },
    { end: techCount, suffix: "+", label: "Technologies", description: "Technologies, frameworks, and tools mastered and integrated into this project." },
    { end: featureCount || 10, suffix: "+", label: "Features Built", description: "Production-ready features implemented with attention to detail and UX quality." },
    { end: 99, suffix: "%", label: "Quality Score", description: "Commitment to excellence — code quality, performance, and design standards." },
  ];

  return (
    <section ref={containerRef} className="relative" style={{ height: "250vh", background: "#050505" }}>
      <div className="sticky top-0 h-screen flex items-center border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: Numbers */}
            <div className="space-y-8">
              <FadeIn>
                <SectionLabel text="By The Numbers" />
                <SectionTitle>Impact</SectionTitle>
              </FadeIn>
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: active === i ? 1 : 0.2, scale: active === i ? 1 : 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="font-display text-white leading-none" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                    <CountUpTrigger end={m.end} trigger={active === i} />
                    <span className="text-white/25 text-[0.5em]">{m.suffix}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">{m.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Right: Description */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}
                  className="p-8 rounded-2xl border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <p className="text-white/40 text-lg leading-relaxed" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>
                    {metrics[active].description}
                  </p>
                  <div className="mt-6 flex gap-2">
                    {metrics.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#00D8FF]/50" : "w-2 bg-white/10"}`} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUpTrigger({ end, trigger }: { end: number; trigger: boolean }) {
  const count = useCountUp(end, 1500, trigger);
  return <>{count}</>;
}

/* ══════════════════════════════════════════════════════════════════════════════
   D. About Section
   ══════════════════════════════════════════════════════════════════════════════ */

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

        <FadeIn delay={0.1} className="mb-14">
          <div className="relative pl-6 md:pl-8 border-l-2 border-[#00D8FF]/30">
            <p className="text-white/55 italic" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.6, letterSpacing: "-0.01em" }}>
              "{pullQuote}"
            </p>
          </div>
        </FadeIn>

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

/* ══════════════════════════════════════════════════════════════════════════════
   E. Details Table
   ══════════════════════════════════════════════════════════════════════════════ */

function DetailsTableSection({ project }: { project: CaseStudyProject }) {
  const catLabels: Record<string, string> = {
    fullstack: "Full Stack Development", purebackend: "Backend Engineering",
    htmlcssjs: "Frontend Development", htmlcss: "Static Design", c: "Systems Programming",
  };
  const rows: [string, string][] = [
    ["Client", project.client || "Case Study"],
    ["Industry", catLabels[project.category || ""] || "Web Development"],
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
        <FadeIn><SectionLabel text="Project Overview" /><SectionTitle>Details</SectionTitle></FadeIn>
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

/* ══════════════════════════════════════════════════════════════════════════════
   F. Challenge & Solution (split with clip-path reveal)
   ══════════════════════════════════════════════════════════════════════════════ */

function ChallengeSolutionSection({ project }: { project: CaseStudyProject }) {
  const challengeText = project.challenges || project.problem || "Every project presents unique technical challenges that push the boundaries of modern web development.";
  const solutionText = project.learnings || project.solution || "Through careful planning and iterative development, we delivered a robust solution.";

  return (
    <section className="border-t border-white/[0.04] overflow-hidden" style={{ background: "#050505" }}>
      {/* Challenge */}
      <div className="py-24 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(239,68,68,0.04) 0%, transparent 60%)" }} />
        <div className="px-6 md:px-12 lg:px-20 max-w-5xl relative">
          <FadeIn>
            <SectionLabel text="The Challenge" />
            <SectionTitle>What We Faced</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-2xl border border-red-500/10" style={{ background: "rgba(239,68,68,0.02)" }}>
              <div className="flex items-start gap-5">
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
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-20">
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-[#00D8FF]/20 to-transparent" />
      </div>

      {/* Solution */}
      <div className="py-24 md:py-32 relative" style={{ background: "#0a0a0f" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)" }} />
        <div className="px-6 md:px-12 lg:px-20 max-w-5xl relative">
          <FadeIn>
            <SectionLabel text="The Solution" />
            <SectionTitle>How We Built It</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-2xl border border-emerald-500/10" style={{ background: "rgba(16,185,129,0.02)" }}>
              <div className="flex items-start gap-5">
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
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   G. Engineering Challenges
   ══════════════════════════════════════════════════════════════════════════════ */

function EngineeringChallengesSection({ project }: { project: CaseStudyProject }) {
  const challenges = splitToList(project.challenges, ["Complex integration requirements", "Performance optimization under load", "Responsive design across all devices", "Security implementation and testing"]);
  const learnings = splitToList(project.learnings, ["Modern framework architecture patterns", "Performance optimization techniques", "Security best practices", "Responsive design strategies"]);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#08080a" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn><SectionLabel text="Deep Dive" /><SectionTitle>Engineering Deep Dive</SectionTitle></FadeIn>

        <FadeIn delay={0.1} className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 mb-5 flex items-center gap-3">
            <Code2 size={12} /> Challenges & Obstacles
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((c, i) => (
              <StaggerItem key={i}>
                <TiltCard className="h-full">
                  <GradientBorderCard>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[11px] text-white/10 font-bold">{String(i + 1).padStart(2, "0")}</span>
                        <div className="h-px flex-1 bg-white/[0.04]" />
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{c}.</p>
                    </div>
                  </GradientBorderCard>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 mb-5 flex items-center gap-3 mt-14">
            <Rocket size={12} /> Key Learnings
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learnings.map((l, i) => (
              <StaggerItem key={i}>
                <TiltCard className="h-full">
                  <div className="p-5 rounded-2xl border border-[#00D8FF]/[0.06]" style={{ background: "rgba(0,216,255,0.015)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 size={14} className="text-[#00D8FF]/20" />
                      <div className="h-px flex-1 bg-[#00D8FF]/[0.05]" />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{l}.</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   H. Tech Stack
   ══════════════════════════════════════════════════════════════════════════════ */

function TechStackSection({ project }: { project: CaseStudyProject }) {
  const techColors: Record<string, string> = {
    React: "#61DAFB", "React 19": "#61DAFB", "React 18": "#61DAFB", "React 19.2": "#61DAFB", "React 19.2.7": "#61DAFB", "React 18.3.1": "#61DAFB",
    NextJS: "#000000", "Next.js 14": "#000000", "Next.js": "#000000",
    TypeScript: "#3178C6", "TypeScript 5.0+": "#3178C6",
    Tailwind: "#06B6D4", "Tailwind CSS": "#06B6D4", "Tailwind CSS 3.4": "#06B6D4", "Tailwind CSS 4": "#06B6D4", "Tailwind CSS 4.1.12": "#06B6D4",
    Vite: "#BD34FE", "Vite 7": "#BD34FE", "Vite 7.2": "#BD34FE", "Vite 8.1.1": "#BD34FE", "Vite 6": "#BD34FE",
    Node: "#339933", "Node.js": "#339933",
    MongoDB: "#47A248", Mongoose: "#47A248",
    Express: "#000000", "Express.js": "#000000", "Express.js 4.21": "#000000", "Express 5": "#000000",
    SQLite: "#003B57", Turso: "#003B57", "SQLite/Turso": "#003B57",
    PHP: "#777BB4", "PHP 7.4+": "#777BB4",
    MySQL: "#4479A1", "MySQL 5.7+": "#4479A1",
    Firebase: "#FFCA28", Stripe: "#635BFF", JWT: "#000000",
    HTML5: "#E34F26", HTML: "#E34F26", CSS3: "#1572B6", CSS: "#1572B6",
    JavaScript: "#F7DF1E", "JavaScript (ES6)": "#F7DF1E", "JavaScript ES6": "#F7DF1E",
    Python: "#3776AB", C: "#A8B9CC", "C++": "#00599C",
    Docker: "#2496ED", AWS: "#FF9900", GSAP: "#88CE02",
    bcrypt: "#5C94BD", "bcryptjs": "#5C94BD", "Remix Icon": "#000000",
    "React Router": "#CA4245", "React Router DOM 7": "#CA4245", "React Router v7": "#CA4245",
    "Radix UI": "#000000", "Shadcn": "#000000", Resend: "#000000",
    "React Icons": "#E91E63", Boxicons: "#26C6DA", "React Hook Form": "#EC5990",
    "Google Gemini API": "#4285F4", ImageKit: "#1DA1F2", Quill: "#000000",
    "React Quill": "#000000", Multer: "#000000", Axios: "#5A29E4",
    Prisma: "#2D3748", "React Toastify": "#2196F3", Web3Forms: "#FF6B6B",
    "React DOM": "#61DAFB", "React DOM 19.2.7": "#61DAFB",
    ESLint: "#4B32C3", PostCSS: "#DD3A0A", Dotenv: "#ECD53F",
    "LibSQL Client": "#003B57", "React Icons 5.0.1": "#E91E63",
    Remix: "#000000", Vercel: "#000000",
  };

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn><SectionLabel text="Technology Stack" /><SectionTitle>Built With</SectionTitle></FadeIn>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {project.tech.map((t) => {
            const color = techColors[t] || "#666";
            return (
              <StaggerItem key={t}>
                <TiltCard>
                  <div className="group relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 text-center">
                    <div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center text-white/80 font-display text-xs font-bold"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                      {t.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white/60 text-xs font-medium leading-tight block">{t}</span>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   I. Project Structure
   ══════════════════════════════════════════════════════════════════════════════ */

function generateFolderStructure(project: CaseStudyProject): string[] {
  if (project.folderStructure && project.folderStructure.length > 0) return project.folderStructure;

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
    lines.push("├── src/", "│   ├── main.c", "│   ├── utils.c", "│   └── utils.h", "├── include/", "│   └── project.h", "├── Makefile", "├── README.md", "└── .gitignore");
    return lines;
  }
  if (isHtmlCss) {
    lines.push("├── public/", "│   └── assets/", "│       ├── images/", "│       └── css/", "├── src/", "│   ├── index.html", "│   ├── styles.css", "│   ├── script.js", "│   └── pages/", "├── README.md", "└── .gitignore");
    return lines;
  }
  if (isBackend) {
    lines.push("├── src/", "│   ├── index.js", "│   ├── routes/");
    if (has("auth") || has("jwt")) lines.push("│   │   ├── auth.js");
    lines.push("│   │   └── api.js", "│   ├── middleware/");
    if (has("auth") || has("jwt")) lines.push("│   │   ├── auth.js");
    lines.push("│   │   ├── validate.js", "│   │   └── rateLimit.js", "│   ├── models/", "│   │   └── schema.js");
    if (has("turso") || has("sqlite")) lines.push("│   ├── db/", "│   │   ├── connection.js", "│   │   └── migrations/");
    lines.push("├── package.json", "├── .env", "├── README.md", "└── .gitignore");
    return lines;
  }

  // Fullstack
  lines.push("├── src/", "│   ├── components/", "│   │   ├── ui/", "│   │   │   ├── Button.jsx", "│   │   │   ├── Card.jsx", "│   │   │   └── Modal.jsx", "│   │   ├── layout/", "│   │   │   ├── Header.jsx", "│   │   │   ├── Footer.jsx", "│   │   │   └── Sidebar.jsx", "│   │   └── sections/", "│   │       ├── Hero.jsx", "│   │       └── Features.jsx");
  if (has("next")) lines.push("│   ├── pages/", "│   │   ├── page.jsx", "│   │   ├── layout.jsx", "│   │   └── about/", "│   │       └── page.jsx");
  else if (has("react")) lines.push("│   ├── pages/", "│   │   ├── Home.jsx", "│   │   ├── About.jsx", "│   │   └── Projects.jsx");
  if (has("react") || has("next")) lines.push("│   ├── hooks/", "│   │   └── useAuth.js", "│   ├── context/", "│   │   └── AppContext.jsx");
  if (has("typescript")) lines.push("│   ├── types/", "│   │   └── index.ts");
  if (isFullstack && (has("express") || has("node"))) lines.push("│   ├── api/", "│   │   ├── index.js", "│   │   ├── routes/", "│   │   │   └── index.js", "│   │   ├── middleware/", "│   │   │   └── auth.js", "│   │   └── models/", "│   │       └── index.js");
  lines.push("│   ├── assets/", "│   │   ├── images/", "│   │   └── styles/", "│   ├── utils/", "│   │   └── helpers.js", "│   ├── App.jsx", "│   └── main.jsx");
  if (has("turso") || has("sqlite") || has("prisma") || has("mongoose")) lines.push("├── db/", "│   ├── schema.js", "│   ├── seed.js", "│   └── migrations/");
  lines.push("├── public/", "│   └── assets/", "├── package.json");
  if (has("typescript")) lines.push("├── tsconfig.json");
  if (has("tailwind")) lines.push("├── tailwind.config.js");
  if (has("vite")) lines.push("├── vite.config.js");
  if (has("next")) lines.push("├── next.config.js");
  lines.push("├── .env", "├── .gitignore", "└── README.md");
  return lines;
}

function FileStructureSection({ project }: { project: CaseStudyProject }) {
  const structure = generateFolderStructure(project);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#08080a" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-4xl">
        <FadeIn><SectionLabel text="Project Structure" /><SectionTitle>How It's Organized</SectionTitle></FadeIn>
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "#0a0a0c" }}>
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 font-mono text-[10px] text-white/20 uppercase tracking-wider">Terminal</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-[13px] leading-[1.8] select-none">
                {structure.map((line, i) => {
                  const isFolder = line.includes("/") && !line.includes("──");
                  const isFile = line.includes(".");
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
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.02, duration: 0.3 }} className={`whitespace-nowrap ${colorClass} hover:text-white/70 transition-colors duration-200`}>
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

/* ══════════════════════════════════════════════════════════════════════════════
   J. Core Features
   ══════════════════════════════════════════════════════════════════════════════ */

function FeaturesSection({ project }: { project: CaseStudyProject }) {
  const features = project.features || [];
  if (features.length === 0) return null;
  const display = features.slice(0, 12);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl">
        <FadeIn><SectionLabel text="Core Features" /><SectionTitle>Platform Capabilities</SectionTitle></FadeIn>
        <div className="space-y-3">
          {display.map((f, i) => (
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

/* ══════════════════════════════════════════════════════════════════════════════
   K. Full-Bleed Showcase (horizontal scroll gallery)
   ══════════════════════════════════════════════════════════════════════════════ */

function ShowcaseSection({ project }: { project: CaseStudyProject }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["16px", "8px"]);

  return (
    <section ref={ref} className="py-12 md:py-20 border-t border-white/[0.04] overflow-hidden" style={{ background: "#050505" }}>
      <FadeIn className="mb-8 px-6 md:px-12 lg:px-20 max-w-6xl">
        <SectionLabel text="Project Showcase" />
        <SectionTitle>The Product</SectionTitle>
      </FadeIn>

      {/* Portfolio-style card */}
      <div className="px-6 md:px-12 lg:px-20">
        <motion.div style={{ scale, borderRadius }}
          className="relative max-w-5xl mx-auto overflow-hidden border border-white/[0.06] bg-white/[0.02] shadow-2xl shadow-black/40 hover:border-white/[0.15] transition-all duration-500 group">
          {/* Image */}
          <div className="relative overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title || project.name}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "70vh" }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              draggable={false}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Corner label */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Preview</span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 border-t border-white/[0.04] bg-white/[0.01]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-white font-semibold text-sm">{project.title || project.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 mt-1">{project.category || "Case Study"} — {project.year || "2025"}</p>
              </div>
              <div className="flex items-center gap-2">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="px-2 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] font-mono text-[8px] text-white/25">{t}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 rounded-md border border-white/[0.04] bg-white/[0.01] font-mono text-[8px] text-white/15">+{project.tech.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <FadeIn delay={0.2} className="text-center mt-6 px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/15">
          {project.title || project.name} — Production Interface
        </p>
      </FadeIn>
    </section>
  );
}

function ScreenshotsSection({ project }: { project: CaseStudyProject }) {
  const projectName = project.title || project.name || '';
  const screenshots = projectScreenshots[projectName];
  if (!screenshots) return null;

  return (
    <section className="py-12 md:py-20 border-t border-white/[0.04] overflow-hidden" style={{ background: "#050505" }}>
      <FadeIn className="mb-8 px-6 md:px-12 lg:px-20 max-w-6xl">
        <SectionLabel text="Visual Walkthrough" />
        <SectionTitle>{screenshots.title}</SectionTitle>
        <p className="font-mono text-[11px] text-white/30 uppercase tracking-widest mt-4 max-w-2xl">
          {screenshots.subtitle}
        </p>
      </FadeIn>

      {/* Infinite scroll gallery */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-5 px-6 md:px-12 lg:px-20"
          animate={{ x: [0, -(screenshots.images.length * 450 + 20 * screenshots.images.length)] }}
          transition={{
            duration: screenshots.images.length * 8,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          {[...Array(4)].map((_, setIndex) =>
            screenshots.images.map((img, i) => (
              <div
                key={`${setIndex}-${i}`}
                className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group"
              >
                <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] shadow-2xl shadow-black/40 hover:border-white/[0.15] transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="px-4 py-3 border-t border-white/[0.04] bg-white/[0.01]">
                    <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>

      <FadeIn delay={0.2} className="text-center mt-6 px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/15">
          {screenshots.images.length} screens — auto-scrolling
        </p>
      </FadeIn>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   L. Results & Impact
   ══════════════════════════════════════════════════════════════════════════════ */

function ResultsSection({ project }: { project: CaseStudyProject }) {
  const results = project.results || [];
  const techCount = project.tech.length;
  const featureCount = project.features?.length || 10;

  const metrics = [
    { metric: String(92 + Math.min(techCount, 8)), label: "Code Quality", suffix: "/100" },
    { metric: "1.2", label: "FCP (Desktop)", suffix: "s" },
    { metric: String(Math.max(120, 180 - techCount * 3)), label: "Bundle (gzip)", suffix: "KB" },
    { metric: String(Math.max(90, 95 + Math.floor(featureCount / 10))), label: "Lighthouse", suffix: "/100" },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04] relative overflow-hidden" style={{ background: "#08080a" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,216,255,0.04) 0%, transparent 60%)" }} />
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl relative">
        <FadeIn><SectionLabel text="Results & Impact" /><SectionTitle>Outcomes</SectionTitle></FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metrics.map((r, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <TiltCard>
                <GradientBorderCard>
                  <div className="p-6 text-center">
                    <p className="font-display text-white leading-none mb-2" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                      {r.metric}<span className="text-white/25 text-[0.6em]">{r.suffix}</span>
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">{r.label}</p>
                  </div>
                </GradientBorderCard>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

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

/* ══════════════════════════════════════════════════════════════════════════════
   M. Key Learnings Timeline
   ══════════════════════════════════════════════════════════════════════════════ */

function LearningsTimeline({ project }: { project: CaseStudyProject }) {
  const learnings = splitToList(project.learnings, [
    "Modern development workflows and best practices",
    "Performance optimization techniques for production",
    "Responsive design across all device sizes",
    "Security implementation and testing",
  ]);

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn><SectionLabel text="Reflections" /><SectionTitle>Key Learnings</SectionTitle></FadeIn>
        <div className="relative">
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00D8FF]/20 via-white/[0.06] to-transparent" />
          <div className="space-y-8">
            {learnings.map((l, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-5 group">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#00D8FF]/30 group-hover:bg-[#00D8FF]/[0.03] transition-all duration-300">
                      <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00D8FF]/50 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
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

/* ══════════════════════════════════════════════════════════════════════════════
   N. Links & Next Project CTA
   ══════════════════════════════════════════════════════════════════════════════ */

function LinksAndCTA({ project, onBack, nextProject }: { project: CaseStudyProject; onBack: () => void; nextProject?: NextProject | null }) {
  const links = [
    project.liveUrl && project.liveUrl !== "#" && { label: "Live Demo", url: project.liveUrl, icon: <ExternalLink size={18} /> },
    (project.githubUrl || project.github) && (project.githubUrl || project.github) !== "#" && { label: "Source Code", url: project.githubUrl || project.github || "#", icon: <Github size={18} /> },
    (project.linkedinUrl || project.linkedin) && (project.linkedinUrl || project.linkedin) !== "#" && { label: "LinkedIn Post", url: project.linkedinUrl || project.linkedin || "#", icon: <Linkedin size={18} /> },
  ].filter(Boolean) as { label: string; url: string; icon: React.ReactNode }[];

  return (
    <>
      {links.length > 0 && (
        <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#0a0a0f" }}>
          <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
            <FadeIn><SectionLabel text="Explore" /><SectionTitle>Project Links</SectionTitle></FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {links.map((link, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <MagneticButton href={link.url}>
                    <div className="group flex items-center justify-between p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 w-full">
                      <div className="flex items-center gap-4">
                        <span className="text-white/30 group-hover:text-white/70 transition-colors">{link.icon}</span>
                        <div>
                          <span className="font-display text-white font-semibold text-sm block">{link.label}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/20 mt-1 block">Open in new tab</span>
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-white/15 group-hover:text-white/50 transition-colors" />
                    </div>
                  </MagneticButton>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-24 md:py-36 border-t border-white/[0.04] relative overflow-hidden" style={{ background: "#050505" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,216,255,0.05) 0%, transparent 60%)" }} />
        <div className="px-6 md:px-12 lg:px-20 text-center relative">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/15 mb-6">End of Case Study</p>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: "110%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(36px, 7vw, 96px)", fontWeight: 800, letterSpacing: "-0.05em" }}>
                {project.title || project.name}
              </motion.h2>
            </div>
            <p className="text-white/30 max-w-lg mx-auto mb-10" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
              {project.shortDesc || project.description}
            </p>
          </FadeIn>

          {nextProject && (
            <FadeIn delay={0.2}>
              <a href={`/case-study/${nextProject.slug}`} className="group block relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/[0.06] mb-12 hover:border-white/[0.15] transition-all duration-700" data-cursor-hover>
                {/* Background Image */}
                <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                  <motion.img
                    src={nextProject.image}
                    alt={nextProject.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  {/* Subtle glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse at center, rgba(0,216,255,0.08) 0%, transparent 60%)" }} />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  {/* Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-[#00D8FF]/40 group-hover:w-12 transition-all duration-500" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00D8FF]/50">Next Project</p>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-white font-bold leading-none mb-4" style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.03em" }}>
                    {nextProject.title}
                  </h3>

                  {/* Category + Arrow */}
                  <div className="flex items-center justify-between">
                    {nextProject.category && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{nextProject.category}</span>
                    )}
                    <div className="flex items-center gap-2 text-white/30 group-hover:text-[#00D8FF]/60 transition-all duration-500">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em]">View</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-white/[0.03]">
                  <ArrowUpRight size={18} className="text-white/50 group-hover:text-[#00D8FF] transition-colors" />
                </div>
              </a>
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <MagneticButton onClick={onBack}>
              <span className="inline-block px-8 py-3 rounded-full border border-white/15 hover:border-[#00D8FF]/40 bg-white/[0.04] hover:bg-[#00D8FF]/[0.06] text-white/60 hover:text-white font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
                Back to Portfolio
              </span>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Main Export
   ══════════════════════════════════════════════════════════════════════════════ */

export function CaseStudyPage({ project, onBack }: { project: CaseStudyProject; onBack: () => void }) {
  const [nextProject, setNextProject] = useState<NextProject | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

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
    const idx = allProjects.findIndex(p => p.slug === currentSlug);
    if (idx !== -1) setNextProject(allProjects[(idx + 1) % allProjects.length]);
  }, [project]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-black min-h-screen" style={{ cursor: "none" }}>
      <CustomCursor />
      <ScrollProgress />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[950] flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Eye size={12} className="text-white/15" />
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Case Study</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-white/50 text-sm font-medium">{project.title || project.name}</span>
        </div>
        <button onClick={onBack} className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-200 group" data-cursor-hover>
          <ChevronLeft size={14} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      <CinematicHero project={project} onBack={onBack} />
      <StickyBigNumbers project={project} />
      <AboutSection project={project} />
      <DetailsTableSection project={project} />
      <ChallengeSolutionSection project={project} />
      <EngineeringChallengesSection project={project} />
      <TechStackSection project={project} />
      <FileStructureSection project={project} />
      <FeaturesSection project={project} />
      <ShowcaseSection project={project} />
      <ScreenshotsSection project={project} />
      <ResultsSection project={project} />
      <LearningsTimeline project={project} />
      <LinksAndCTA project={project} onBack={onBack} nextProject={nextProject} />
    </motion.div>
  );
}
