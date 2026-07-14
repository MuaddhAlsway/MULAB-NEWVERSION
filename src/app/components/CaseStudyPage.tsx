import { useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ExternalLink, Github, Linkedin, ArrowUpRight, Shield, Zap, Database, Layout, Globe, Lock, Code2, Server, GitBranch, BarChart3, Clock, Target, Layers, Monitor, Smartphone, Tablet, Users, Settings, Search, Bell, FileText, Image, Mail, Calendar, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, Rocket, ChevronRight } from "lucide-react";
import { trqStudioCaseStudy as cs } from "../data/trqStudioCaseStudy";

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

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 pt-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,216,255,0.06) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,216,255,0.03) 0%, transparent 60%)" }} />

      <div className="relative w-full max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">{cs.hero.industry}</p>
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.h1 initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            {cs.hero.projectName}
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-10">
          <p className="text-white/50 max-w-2xl" style={{ fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.5 }}>
            {cs.hero.projectTagline}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-wrap gap-6 mb-12">
          {[
            { label: "Role", value: cs.hero.role },
            { label: "Duration", value: cs.hero.duration },
            { label: "Year", value: cs.hero.year }
          ].map((item) => (
            <div key={item.label}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1">{item.label}</p>
              <p className="text-white/70 text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="flex flex-wrap gap-2">
          {cs.hero.techStack.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] text-white/40">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Executive Summary ────────────────────────────────────────────────────────
function ExecutiveSummarySection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="02 — Executive Summary" />
          <SectionTitle>What We Built & Why</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-6 text-white/55 leading-relaxed" style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>
            {cs.executiveSummary.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Project Overview ─────────────────────────────────────────────────────────
function ProjectOverviewSection() {
  const o = cs.projectOverview;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="03 — Project Overview" />
          <SectionTitle>At a Glance</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <DataTable rows={[
            ["Client", o.client],
            ["Industry", o.industry],
            ["Role", o.role],
            ["Timeline", o.timeline],
            ["Team Size", o.teamSize],
            ["Platform", o.platform],
            ["Tech Stack", o.techStack],
            ["Deployment", o.deployment],
            ["Status", o.status]
          ]} />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Business Challenge ───────────────────────────────────────────────────────
function BusinessChallengeSection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="04 — Business Challenge" />
          <SectionTitle>The Problem Space</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-6 text-white/55 leading-relaxed" style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>
            {cs.businessChallenge.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Project Goals ────────────────────────────────────────────────────────────
function ProjectGoalsSection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="05 — Project Goals" />
          <SectionTitle>Measurable Objectives</SectionTitle>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cs.projectGoals.map((g, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-white/25" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">Goal {String(i + 1).padStart(2, "0")}</p>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{g.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-3">{g.description}</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <BarChart3 size={12} className="text-white/30" />
                  <span className="font-mono text-[10px] text-white/40">{g.metric}</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Discovery & Research ─────────────────────────────────────────────────────
function DiscoverySection() {
  const d = cs.discoveryAndResearch;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="06 — Discovery & Research" />
          <SectionTitle>Understanding the Landscape</SectionTitle>
        </FadeIn>

        {/* Market Research */}
        <FadeIn delay={0.1} className="mb-12">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Search size={14} className="text-white/25" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Market Research</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{d.marketResearch}</p>
          </Card>
        </FadeIn>

        {/* Competitor Analysis */}
        <FadeIn delay={0.15} className="mb-12">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={14} className="text-white/25" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Competitor Analysis</p>
            </div>
            <div className="space-y-4">
              {d.competitorAnalysis.split("\n\n").map((p, i) => (
                <p key={i} className="text-white/50 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          </Card>
        </FadeIn>

        {/* User Personas */}
        <FadeIn delay={0.2} className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">User Personas</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {d.userPersonas.map((p, i) => (
              <Card key={i}>
                <div className="flex items-center gap-2 mb-3">
                  <Users size={14} className="text-white/25" />
                  <p className="text-white font-semibold text-sm">{p.name}</p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-3">{p.role}</p>
                <p className="text-white/45 text-xs leading-relaxed mb-2"><span className="text-white/30">Needs:</span> {p.needs}</p>
                <p className="text-white/45 text-xs leading-relaxed"><span className="text-white/30">Pain:</span> {p.pain}</p>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Key Findings */}
        <FadeIn delay={0.25} className="mb-12">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={14} className="text-white/25" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Key Findings</p>
            </div>
            <div className="space-y-2">
              {d.keyFindings.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-white/20 font-mono text-xs mt-0.5">→</span>
                  <span className="text-white/50 text-sm leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        {/* Risks & Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FadeIn delay={0.3}>
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={14} className="text-white/25" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Project Risks</p>
              </div>
              <div className="space-y-2">
                {d.projectRisks.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-white/15 text-xs">•</span>
                    <span className="text-white/45 text-xs leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={14} className="text-white/25" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Technical Constraints</p>
              </div>
              <div className="space-y-2">
                {d.technicalConstraints.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-white/15 text-xs">•</span>
                    <span className="text-white/45 text-xs leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-white/25" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Business Constraints</p>
              </div>
              <div className="space-y-2">
                {d.businessConstraints.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-white/15 text-xs">•</span>
                    <span className="text-white/45 text-xs leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Strategy & Planning ──────────────────────────────────────────────────────
function StrategySection() {
  const s = cs.strategyAndPlanning;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="07 — Strategy & Planning" />
          <SectionTitle>Architectural Decisions</SectionTitle>
        </FadeIn>

        {/* Technology Decisions */}
        <FadeIn delay={0.1} className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Technology Decisions</p>
          <div className="space-y-4">
            {s.technologyDecisions.map((td, i) => (
              <Card key={i}>
                <h3 className="text-white font-semibold text-sm mb-2">{td.choice}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{td.rationale}</p>
                <div className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-1">Rejected</p>
                  <p className="text-white/35 text-xs leading-relaxed">{td.rejected}</p>
                </div>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Decision Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Product Decisions", items: s.productDecisions, icon: <Layout size={14} /> },
            { title: "Scalability Decisions", items: s.scalabilityDecisions, icon: <TrendingUp size={14} /> },
            { title: "Security Decisions", items: s.securityDecisions, icon: <Shield size={14} /> }
          ].map((cat, ci) => (
            <FadeIn key={ci} delay={0.2 + ci * 0.05}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/25">{cat.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{cat.title}</p>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-white/15 text-xs">•</span>
                      <span className="text-white/45 text-xs leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Information Architecture ──────────────────────────────────────────────────
function InformationArchitectureSection() {
  const ia = cs.informationArchitecture;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="08 — Information Architecture" />
          <SectionTitle>System Structure</SectionTitle>
        </FadeIn>

        <div className="space-y-8">
          {[
            { title: "Sitemap", content: ia.sitemap },
            { title: "User Flow", content: ia.userFlow },
            { title: "System Flow", content: ia.systemFlow },
            { title: "Content Structure", content: ia.contentStructure },
            { title: "Navigation Structure", content: ia.navigationStructure }
          ].map((block, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">{block.title}</p>
                <pre className="font-mono text-[11px] text-white/40 leading-relaxed overflow-x-auto whitespace-pre-wrap">{block.content}</pre>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── System Architecture ──────────────────────────────────────────────────────
function SystemArchitectureSection() {
  const sa = cs.systemArchitecture;
  const layers = [
    { label: "Frontend Layer", content: sa.frontendLayer, icon: <Monitor size={16} /> },
    { label: "Backend Layer", content: sa.backendLayer, icon: <Server size={16} /> },
    { label: "API Layer", content: sa.apiLayer, icon: <GitBranch size={16} /> },
    { label: "Database Layer", content: sa.databaseLayer, icon: <Database size={16} /> },
    { label: "Infrastructure Layer", content: sa.infrastructureLayer, icon: <Globe size={16} /> },
    { label: "Authentication Layer", content: sa.authenticationLayer, icon: <Lock size={16} /> },
    { label: "External Services", content: sa.externalServices, icon: <Zap size={16} /> }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="09 — System Architecture" />
          <SectionTitle>Technical Foundation</SectionTitle>
        </FadeIn>

        {/* Architecture Diagram */}
        <FadeIn delay={0.1} className="mb-12">
          <Card>
            <pre className="font-mono text-[10px] text-white/35 leading-relaxed overflow-x-auto whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  React 19.2 + TypeScript + Tailwind CSS + Vite 7.2             │
│  Context API State Management | Bilingual i18n | RTL Engine     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────────────┐
│                     CDN LAYER (Cloudflare)                       │
│  Static Assets | Edge Caching | Brotli Compression | HTTP/3    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      API LAYER (Cloudflare Workers)              │
│  Express.js 4.21 | JWT Auth | Rate Limiting | Input Validation │
│  CORS | Error Handling | Request Logging                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                   DATABASE LAYER (Turso Edge)                    │
│  SQLite | WAL Mode | Edge Replication | Connection Pooling      │
│  Projects | Blog Posts | Users | Media | Settings               │
└─────────────────────────────────────────────────────────────────┘
`}</pre>
          </Card>
        </FadeIn>

        {/* Layer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {layers.map((l, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.04}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white/25">{l.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">{l.label}</p>
                </div>
                <p className="text-white/45 text-sm leading-relaxed">{l.content}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Database Design ──────────────────────────────────────────────────────────
function DatabaseDesignSection() {
  const db = cs.databaseDesign;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="10 — Database Design" />
          <SectionTitle>Data Architecture</SectionTitle>
        </FadeIn>

        {/* ER Diagram */}
        <FadeIn delay={0.1} className="mb-12">
          <Card>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Entity Relationship Overview</p>
            <pre className="font-mono text-[10px] text-white/35 leading-relaxed overflow-x-auto whitespace-pre">{db.entityRelationship}</pre>
          </Card>
        </FadeIn>

        {/* Core Tables */}
        <FadeIn delay={0.15} className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Core Tables</p>
          <div className="space-y-3">
            {db.coreTables.map((t, i) => (
              <Card key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <Database size={12} className="text-white/25" />
                  <h3 className="text-white font-semibold text-sm">{t.table}</h3>
                </div>
                <p className="text-white/40 text-xs mb-3">{t.purpose}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.columns.map((c, ci) => (
                    <span key={ci} className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05] font-mono text-[9px] text-white/35">{c}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Indexing & Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.2}>
            <Card className="h-full">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Indexing Strategy</p>
              <div className="space-y-2">
                {db.indexingStrategy.map((idx, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-white/15 text-xs">•</span>
                    <span className="text-white/45 text-xs leading-relaxed">{idx}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Card className="h-full">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Data Modeling Decisions</p>
              <div className="space-y-2">
                {db.dataModelingDecisions.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-white/15 text-xs">•</span>
                    <span className="text-white/45 text-xs leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Design System ────────────────────────────────────────────────────────────
function DesignSystemSection() {
  const ds = cs.designSystem;
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="11 — Design System" />
          <SectionTitle>Visual Language</SectionTitle>
        </FadeIn>

        <div className="space-y-8">
          {/* Typography */}
          <FadeIn delay={0.1}>
            <Card>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Typography</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(ds.typography).map(([key, val]) => (
                  <div key={key}>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-1">{key}</p>
                    <p className="text-white/50 text-sm">{val}</p>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Color System */}
          <FadeIn delay={0.15}>
            <Card>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Color System</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(ds.colorSystem).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-white/10" style={{ background: val.startsWith("#") ? val : val.includes("rgba") ? undefined : "#333" }} />
                    <div>
                      <p className="font-mono text-[9px] text-white/30">{key}</p>
                      <p className="font-mono text-[8px] text-white/20 truncate max-w-[120px]">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Spacing & Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FadeIn delay={0.2}>
              <Card className="h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Spacing System</p>
                <div className="space-y-2">
                  {Object.entries(ds.spacingSystem).map(([key, val]) => (
                    <div key={key}>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">{key}</p>
                      <p className="text-white/45 text-xs">{val}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
            <FadeIn delay={0.25}>
              <Card className="h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Grid System</p>
                <div className="space-y-2">
                  {Object.entries(ds.gridSystem).map(([key, val]) => (
                    <div key={key}>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">{key}</p>
                      <p className="text-white/45 text-xs">{val}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Component Library */}
          <FadeIn delay={0.3}>
            <Card>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Component Library</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(ds.componentLibrary).map(([key, val]) => (
                  <div key={key}>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-2">{key}</p>
                    <div className="space-y-1.5">
                      {val.map((v, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-white/15 text-xs">•</span>
                          <span className="text-white/40 text-xs leading-relaxed">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Core Features ────────────────────────────────────────────────────────────
function CoreFeaturesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    "Authentication & Security": <Lock size={16} />,
    "Content Management": <FileText size={16} />,
    "Admin Dashboard": <Settings size={16} />,
    "Bilingual Experience": <Globe size={16} />,
    "Performance & Deployment": <Zap size={16} />
  };

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="12 — Core Features" />
          <SectionTitle>Platform Capabilities</SectionTitle>
        </FadeIn>

        <div className="space-y-8">
          {cs.coreFeatures.map((cat, ci) => (
            <FadeIn key={ci} delay={ci * 0.05}>
              <Card>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-white/25">{iconMap[cat.category] || <Code2 size={16} />}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{cat.category}</p>
                </div>
                <div className="space-y-4">
                  {cat.features.map((f, fi) => (
                    <div key={fi} className={`${fi !== cat.features.length - 1 ? "pb-4 border-b border-white/[0.04]" : ""}`}>
                      <h4 className="text-white font-semibold text-sm mb-1">{f.name}</h4>
                      <p className="text-white/45 text-sm leading-relaxed">{f.businessValue}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Engineering Challenges ───────────────────────────────────────────────────
function EngineeringChallengesSection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="13 — Engineering Challenges" />
          <SectionTitle>Complexity & Solutions</SectionTitle>
        </FadeIn>

        <div className="space-y-6">
          {cs.engineeringChallenges.map((ch, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm pt-1">{ch.challenge}</h3>
                </div>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{ch.description}</p>
                <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-2">Solution</p>
                  <p className="text-white/50 text-sm leading-relaxed">{ch.solution}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <CheckCircle2 size={12} className="text-white/30" />
                  <span className="font-mono text-[10px] text-white/40">{ch.impact}</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Security Implementation ──────────────────────────────────────────────────
function SecuritySection() {
  const sec = cs.securityImplementation;
  const items = [
    { label: "Authentication", content: sec.authentication, icon: <Lock size={14} /> },
    { label: "Authorization", content: sec.authorization, icon: <Shield size={14} /> },
    { label: "Rate Limiting", content: sec.rateLimiting, icon: <Zap size={14} /> },
    { label: "Input Validation", content: sec.inputValidation, icon: <CheckCircle2 size={14} /> },
    { label: "File Upload Security", content: sec.fileUploadSecurity, icon: <Image size={14} /> },
    { label: "CORS", content: sec.cors, icon: <Globe size={14} /> },
    { label: "XSS Protection", content: sec.xssProtection, icon: <Shield size={14} /> },
    { label: "SQL Injection Prevention", content: sec.sqlInjectionPrevention, icon: <Database size={14} /> },
    { label: "Audit Logging", content: sec.auditLogging, icon: <FileText size={14} /> }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="14 — Security Implementation" />
          <SectionTitle>Defense in Depth</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white/25">{item.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">{item.label}</p>
                </div>
                <p className="text-white/45 text-sm leading-relaxed">{item.content}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Performance Optimization ─────────────────────────────────────────────────
function PerformanceSection() {
  const p = cs.performanceOptimization;
  const items = [
    { label: "Strategy", content: p.strategy },
    { label: "Caching", content: p.caching },
    { label: "Lazy Loading", content: p.lazyLoading },
    { label: "Code Splitting", content: p.codeSplitting },
    { label: "Database Optimization", content: p.databaseOptimization },
    { label: "Asset Optimization", content: p.assetOptimization },
    { label: "CDN Usage", content: p.cdnUsage },
    { label: "Bundle Optimization", content: p.bundleOptimization },
    { label: "API Optimization", content: p.apiOptimization }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="15 — Performance Optimization" />
          <SectionTitle>Speed & Efficiency</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} className="text-white/25" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">{item.label}</p>
                </div>
                <p className="text-white/45 text-sm leading-relaxed">{item.content}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Development Timeline ─────────────────────────────────────────────────────
function TimelineSection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="16 — Development Timeline" />
          <SectionTitle>Milestone Roadmap</SectionTitle>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-6">
            {cs.developmentTimeline.map((phase, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="relative pl-12">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-white/[0.08] border-2 border-white/[0.2]" />
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-white font-semibold text-sm">{phase.phase}</h3>
                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{phase.duration}</span>
                  </div>
                  <div className="space-y-1.5">
                    {phase.milestones.map((m, mi) => (
                      <div key={mi} className="flex items-start gap-2">
                        <ChevronRight size={10} className="text-white/15 mt-1 flex-shrink-0" />
                        <span className="text-white/40 text-xs leading-relaxed">{m}</span>
                      </div>
                    ))}
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

// ─── Final Product Showcase ───────────────────────────────────────────────────
function ShowcaseSection() {
  const fp = cs.finalProductShowcase;
  const experiences = [
    { label: "Desktop Experience", content: fp.desktopExperience, icon: <Monitor size={16} /> },
    { label: "Tablet Experience", content: fp.tabletExperience, icon: <Tablet size={16} /> },
    { label: "Mobile Experience", content: fp.mobileExperience, icon: <Smartphone size={16} /> },
    { label: "Admin Experience", content: fp.adminExperience, icon: <Settings size={16} /> },
    { label: "Dashboard Experience", content: fp.dashboardExperience, icon: <BarChart3 size={16} /> },
    { label: "User Experience", content: fp.userExperience, icon: <Users size={16} /> }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="17 — Final Product Showcase" />
          <SectionTitle>The Experience</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white/25">{exp.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">{exp.label}</p>
                </div>
                <p className="text-white/45 text-sm leading-relaxed">{exp.content}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Results & Impact ─────────────────────────────────────────────────────────
function ResultsSection() {
  const r = cs.resultsAndImpact;
  const categories = [
    { title: "Business Results", items: r.businessResults, icon: <TrendingUp size={14} /> },
    { title: "Technical Results", items: r.technicalResults, icon: <Code2 size={14} /> },
    { title: "Performance Results", items: r.performanceResults, icon: <Zap size={14} /> },
    { title: "Operational Improvements", items: r.operationalImprovements, icon: <Settings size={14} /> },
    { title: "User Experience Improvements", items: r.userExperienceImprovements, icon: <Users size={14} /> },
    { title: "Product Improvements", items: r.productImprovements, icon: <Rocket size={14} /> }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="18 — Results & Impact" />
          <SectionTitle>Measurable Outcomes</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, ci) => (
            <FadeIn key={ci} delay={ci * 0.05}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/25">{cat.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">{cat.title}</p>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-white/15 text-xs">→</span>
                      <span className="text-white/45 text-xs leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lessons Learned ──────────────────────────────────────────────────────────
function LessonsSection() {
  const l = cs.lessonsLearned;
  const lessons = [
    { label: "Technical", content: l.technical, icon: <Code2 size={14} /> },
    { label: "Product", content: l.product, icon: <Layout size={14} /> },
    { label: "Architecture", content: l.architecture, icon: <Layers size={14} /> },
    { label: "Scalability", content: l.scalability, icon: <TrendingUp size={14} /> },
    { label: "Security", content: l.security, icon: <Shield size={14} /> },
    { label: "Project Management", content: l.projectManagement, icon: <Clock size={14} /> }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="19 — Lessons Learned" />
          <SectionTitle>Reflections</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((l, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white/25">{l.icon}</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">{l.label}</p>
                </div>
                <p className="text-white/45 text-sm leading-relaxed">{l.content}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Future Roadmap ───────────────────────────────────────────────────────────
function RoadmapSection() {
  const priorityColors: Record<string, string> = {
    High: "text-white/60 border-white/20 bg-white/[0.06]",
    Medium: "text-white/40 border-white/12 bg-white/[0.03]",
    Low: "text-white/25 border-white/08 bg-white/[0.02]"
  };

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.04]" style={{ background: "#050505" }}>
      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <FadeIn>
          <SectionLabel text="20 — Future Roadmap" />
          <SectionTitle>What's Next</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cs.futureRoadmap.map((item, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <Card className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">{item.feature}</h3>
                  <span className={`px-2 py-0.5 rounded-full border font-mono text-[8px] uppercase tracking-widest ${priorityColors[item.priority] || priorityColors.Low}`}>{item.priority}</span>
                </div>
                <p className="text-white/45 text-sm leading-relaxed mb-3">{item.description}</p>
                <div className="flex items-center gap-2">
                  <Calendar size={10} className="text-white/20" />
                  <span className="font-mono text-[9px] text-white/25">{item.timeline}</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function CaseStudyPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-black min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[950] flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Case Study</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-white/60 text-sm font-medium">{cs.title}</span>
        </div>
        <button onClick={onBack} className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-200 group">
          <ChevronLeft size={14} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      <HeroSection />
      <ExecutiveSummarySection />
      <ProjectOverviewSection />
      <BusinessChallengeSection />
      <ProjectGoalsSection />
      <DiscoverySection />
      <StrategySection />
      <InformationArchitectureSection />
      <SystemArchitectureSection />
      <DatabaseDesignSection />
      <DesignSystemSection />
      <CoreFeaturesSection />
      <EngineeringChallengesSection />
      <SecuritySection />
      <PerformanceSection />
      <TimelineSection />
      <ShowcaseSection />
      <ResultsSection />
      <LessonsSection />
      <RoadmapSection />

      {/* Footer CTA */}
      <section className="py-24 md:py-32 border-t border-white/[0.04]" style={{ background: "#050505" }}>
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">End of Case Study</p>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: false }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-white leading-none" style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
                {cs.title}
              </motion.h2>
            </div>
            <p className="text-white/40 max-w-lg mx-auto mb-8" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
              {cs.hero.projectTagline}
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
