import { useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ExternalLink, Github, Linkedin, ArrowUpRight, Shield, Zap, Database, Layout, Globe, Lock, Code2, Server, GitBranch, BarChart3, Clock, Target, Layers, Monitor, Smartphone, Tablet, Users, Settings, Search, Bell, FileText, Image, Mail, Calendar, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, Rocket, ChevronRight } from "lucide-react";

interface CaseStudyProject {
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
  client?: string;
  duration?: string;
  longDescription?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">{text}</p>;
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-display text-white leading-none mb-6 ${className}`} style={{ fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em" }}>{children}</h2>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 rounded-2xl border border-white/[0.06] bg-card ${className}`}>{children}</div>;
}

function DataTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden">
      {rows.map(([label, value], i) => (
        <div key={i} className={`flex ${i !== rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
          <div className="w-1/3 md:w-1/4 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 bg-white/[0.02]">{label}</div>
          <div className="flex-1 px-5 py-3.5 text-white/60 text-sm">{value}</div>
        </div>
      ))}
    </div>
  );
}

function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative min-h-screen flex items-end pb-20 pt-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,216,255,0.06) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,216,255,0.03) 0%, transparent 60%)" }} />

      <div className="relative w-full max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">{project.category} — Case Study</p>
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.h1 initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            {project.title}
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-10">
          <p className="text-white/50 max-w-2xl" style={{ fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.5 }}>
            {project.shortDesc}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-wrap gap-6 mb-12">
          {[
            project.client && { label: "Client", value: project.client },
            project.duration && { label: "Duration", value: project.duration },
            { label: "Year", value: project.year }
          ].filter(Boolean).map((item) => item && (
            <div key={item.label}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1">{item.label}</p>
              <p className="text-white/70 text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] text-white/40">{t}</span>
          ))}
        </motion.div>

        {/* Project Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-wrap gap-3 mt-10">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/70 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300">
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/70 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300">
              <Github size={12} /> Source Code
            </a>
          )}
          {project.linkedinUrl && project.linkedinUrl !== "#" && (
            <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white/70 hover:text-white font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300">
              <Linkedin size={12} /> LinkedIn Post
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function OverviewSection({ project }: { project: CaseStudyProject }) {
  const desc = project.longDescription || project.overview;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Overview" />
          <SectionTitle>About This Project</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-6 text-white/55 leading-relaxed" style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>
            {desc.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Project Overview Table ───────────────────────────────────────────────────
function ProjectOverviewSection({ project }: { project: CaseStudyProject }) {
  const rows: [string, string][] = [
    ["Client", project.client || "Case Study"],
    ["Industry", project.category === 'fullstack' ? 'Full Stack Development' : project.category === 'purebackend' ? 'Backend Development' : project.category === 'htmlcssjs' ? 'Frontend Development' : project.category === 'htmlcss' ? 'Static Design' : 'C Programming'],
    ["Role", "Full-Stack Developer & Solutions Architect"],
    ["Timeline", project.duration || "N/A"],
    ["Team Size", "1 developer"],
    ["Platform", "Web (Desktop, Tablet, Mobile)"],
    ["Tech Stack", project.tech.join(", ")],
    ["Status", "Production — Live"]
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Project Overview" />
          <SectionTitle>At a Glance</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <DataTable rows={rows} />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Problem & Solution ───────────────────────────────────────────────────────
function ProblemSolutionSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Challenge & Solution" />
          <SectionTitle>Problem Space</SectionTitle>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={0.1}>
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={14} className="text-white/25" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">The Challenge</p>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{project.problem}</p>
            </Card>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={14} className="text-white/25" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">The Solution</p>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{project.solution}</p>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Engineering Challenges ───────────────────────────────────────────────────
function EngineeringChallengesSection({ project }: { project: CaseStudyProject }) {
  const challenges = project.challenges || project.problem;
  const learnings = project.learnings || project.solution;

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Engineering Challenges" />
          <SectionTitle>Complexity & Solutions</SectionTitle>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-8">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={14} className="text-white/25" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Challenges Encountered</p>
            </div>
            <div className="space-y-4">
              {challenges.split(". ").filter(Boolean).map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-white/15 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white/50 text-sm leading-relaxed">{c.trim()}.</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={14} className="text-white/25" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Key Learnings</p>
            </div>
            <div className="space-y-4">
              {learnings.split(". ").filter(Boolean).map((l, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-white/15 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white/50 text-sm leading-relaxed">{l.trim()}.</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
function TechStackSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Technology Stack" />
          <SectionTitle>Built With</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <div key={t} className="px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
                <span className="font-display text-white/70 font-semibold text-sm">{t}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Core Features ────────────────────────────────────────────────────────────
function CoreFeaturesSection({ project }: { project: CaseStudyProject }) {
  const features = project.features || project.results;
  if (!features || features.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Core Features" />
          <SectionTitle>Platform Capabilities</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{f}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Results & Impact ─────────────────────────────────────────────────────────
function ResultsSection({ project }: { project: CaseStudyProject }) {
  const results = project.results || project.features || [];
  if (results.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Results & Impact" />
          <SectionTitle>Outcomes</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((r, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="h-full">
                <div className="flex items-start gap-3">
                  <TrendingUp size={14} className="text-white/25 mt-0.5 flex-shrink-0" />
                  <p className="text-white/55 text-sm leading-relaxed">{r}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Project Links ────────────────────────────────────────────────────────────
function ProjectLinksSection({ project }: { project: CaseStudyProject }) {
  const links = [
    project.liveUrl && project.liveUrl !== "#" && { label: "Live Demo", url: project.liveUrl, icon: <ExternalLink size={16} /> },
    project.githubUrl && project.githubUrl !== "#" && { label: "Source Code", url: project.githubUrl, icon: <Github size={16} /> },
    project.linkedinUrl && project.linkedinUrl !== "#" && { label: "LinkedIn Post", url: project.linkedinUrl, icon: <Linkedin size={16} /> },
  ].filter(Boolean) as { label: string; url: string; icon: React.ReactNode }[];

  if (links.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="Project Links" />
          <SectionTitle>Explore</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {links.map((link, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-2xl border border-white/[0.06] bg-card hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 group-hover:text-white transition-colors">{link.icon}</span>
                  <span className="font-display text-white font-semibold text-sm">{link.label}</span>
                </div>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function CaseStudyPage({ project, onBack }: { project: CaseStudyProject; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-black min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[950] flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Case Study</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-white/60 text-sm font-medium">{project.title}</span>
        </div>
        <button onClick={onBack} className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-200 group">
          <ChevronLeft size={14} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      <HeroSection project={project} />
      <OverviewSection project={project} />
      <ProjectOverviewSection project={project} />
      <ProblemSolutionSection project={project} />
      <EngineeringChallengesSection project={project} />
      <TechStackSection project={project} />
      <CoreFeaturesSection project={project} />
      <ResultsSection project={project} />
      <ProjectLinksSection project={project} />

      {/* Footer CTA */}
      <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">End of Case Study</p>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: false }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-white leading-none" style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                {project.title}
              </motion.h2>
            </div>
            <p className="text-white/40 max-w-lg mx-auto mb-8" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
              {project.shortDesc}
            </p>
            <button onClick={onBack} className="px-8 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
              Back to Portfolio
            </button>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
