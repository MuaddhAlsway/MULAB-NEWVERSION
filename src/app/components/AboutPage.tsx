import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = ["Building", "Digital", "Products", "That", "Scale", "With", "Purpose."];

const STATS = [
  { value: "44+", label: "Projects Built" },
  { value: "3+", label: "Professional Roles" },
  { value: "Full Stack", label: "Engineering" },
  { value: "Product", label: "Development" },
];

const EXPERIENCE = [
  {
    index: "01",
    period: "2026 — Present",
    role: "Technical Product Engineer",
    company: "MADD",
    description:
      "Leading product strategy, technical architecture, and scalable software development across modern digital products. Collaborating with stakeholders, engineers, and business teams to transform ideas into production-ready solutions.",
    focus: ["Product Engineering", "Technical Strategy", "System Architecture", "Performance Optimization", "Product Delivery"],
  },
  {
    index: "02",
    period: "2025 — Present",
    role: "Frontend Web Developer",
    company: "Establishment MIBDAAT EL-THELATH",
    description:
      "Delivering responsive websites and client-focused digital experiences with a focus on usability, performance, and modern frontend technologies.",
    focus: ["React Development", "Responsive Design", "UI Engineering", "Performance"],
  },
  {
    index: "03",
    period: "2026",
    role: "Full Stack Developer",
    company: "TRQ Studio",
    description:
      "Built bilingual portfolio and content management platforms with scalable architecture and enterprise-level security practices.",
    focus: ["Full Stack Development", "Authentication Systems", "CMS Platforms", "API Development"],
  },
];

const PHILOSOPHY = [
  {
    num: "01",
    title: "Understand The Problem",
    desc: "Every successful product begins with understanding user needs, business objectives, and technical constraints.",
  },
  {
    num: "02",
    title: "Design The Experience",
    desc: "Transforming complex workflows into intuitive user experiences and scalable interfaces.",
  },
  {
    num: "03",
    title: "Engineer The Solution",
    desc: "Building reliable, secure, and maintainable systems using modern technologies and engineering principles.",
  },
  {
    num: "04",
    title: "Optimize & Scale",
    desc: "Continuously improving performance, usability, and scalability to support long-term growth.",
  },
];

const EXPERTISE = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Authentication"] },
  { category: "Database", items: ["Turso", "SQLite", "PostgreSQL"] },
  { category: "Infrastructure", items: ["Cloudflare", "Vercel", "GitHub Actions", "CI/CD"] },
];

const MARQUEE_WORDS = ["Product Engineering", "System Architecture", "Performance", "Scalability", "UX Design", "Full Stack Development"];

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[10px] text-white/25">{index}</span>
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{label}</span>
      </div>
      <h2 className="font-display text-white leading-[0.95]" style={{ fontSize: "clamp(38px, 6vw, 84px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
        {title}
      </h2>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />

        {/* Ghost wordmark */}
        <div className="absolute -bottom-[6vw] right-0 leading-none pointer-events-none select-none font-display font-black whitespace-nowrap"
          style={{ fontSize: "clamp(140px, 26vw, 380px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.025)" }}>
          MULAB
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-32 lg:pt-40 pb-16 md:pb-24">
          {/* Eyebrow row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="flex items-center justify-between gap-4 mb-12 md:mb-16"
          >
            <div className="flex items-center gap-4">
              <span className="font-display text-white font-bold tracking-tight text-sm" style={{ letterSpacing: "-0.02em" }}>MULAB</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">About</span>
            </div>
            <div className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Technical Product Engineer — MADD
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-end">
            {/* Headline + description */}
            <div className="lg:col-span-7">
              <h1 className="font-display text-white leading-[0.9] select-none" style={{ fontSize: "clamp(42px, 7.6vw, 108px)", fontWeight: 800, letterSpacing: "-0.045em" }}>
                {HEADLINE.map((word, i) => (
                  <span key={word} className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em] mr-[0.22em] last:mr-0">
                    <motion.span
                      className={word === "Purpose." ? "inline-block text-white/[0.14]" : "inline-block"}
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.09, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
                className="mt-10 text-white/45 leading-relaxed max-w-xl"
                style={{ fontSize: "clamp(15px, 1.35vw, 18px)" }}
              >
                Technical Product Engineer focused on transforming ideas into scalable digital products
                through modern engineering, user-centered design, and business-driven execution.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.25 }}
                className="mt-10 flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Available for new opportunities</span>
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
              className="lg:col-span-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Portrait — 2026</span>
                <span className="font-mono text-[10px] text-white/20">01</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-neutral-900">
                <div className="relative aspect-[4/5]">
                  <img
                    src="/mystory/1780947090830.jpg"
                    alt="Muaddh Alsway — Technical Product Engineer"
                    className="w-full h-full object-cover grayscale contrast-110 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="font-display text-white font-bold leading-tight" style={{ fontSize: "clamp(20px, 2vw, 26px)", letterSpacing: "-0.02em" }}>
                        Muaddh Alsway
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                        Founder — MULAB
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
            className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.1]"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="py-7 pr-6 border-white/[0.1] flex flex-col justify-end" style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined }}>
                <div className="font-display text-white font-bold leading-none mb-2" style={{ fontSize: "clamp(26px, 3.2vw, 44px)", letterSpacing: "-0.03em" }}>
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-gradient-to-b from-white/25 to-transparent" />
          <ArrowDown size={12} className="text-white/25" />
        </div>
      </section>

      {/* ─── CAREER PATH ─────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 bg-black border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading index="(01)" label="My Journey" title="Career Path" />
                <Reveal delay={0.15} className="mt-8 max-w-sm">
                  <p className="text-white/40 leading-relaxed text-sm">
                    From client-focused frontend delivery to full-stack platforms and product engineering —
                    a path built on depth, precision, and shipping production-quality software.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-white/[0.1]">
                {EXPERIENCE.map((item, i) => (
                  <Reveal key={item.index} delay={i * 0.08}>
                    <div className="group relative py-10 md:py-12 border-b border-white/[0.1] grid grid-cols-1 md:grid-cols-12 gap-4 transition-colors duration-300 hover:bg-white/[0.02] px-2 md:-mx-2 md:px-4">
                      <div className="md:col-span-2 flex items-start">
                        <span className="font-mono text-[11px] text-white/20 group-hover:text-white/60 transition-colors">{item.index}</span>
                      </div>
                      <div className="md:col-span-4">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35 mb-3">{item.period}</div>
                        <div className="font-display text-white font-bold leading-tight" style={{ fontSize: "clamp(20px, 2.2vw, 26px)", letterSpacing: "-0.02em" }}>
                          {item.role}
                        </div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/45 mt-2">{item.company}</div>
                      </div>
                      <div className="md:col-span-6">
                        <p className="text-white/45 text-sm leading-relaxed mb-5">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.focus.map((f) => (
                            <span key={f} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-white/45 group-hover:border-white/20 group-hover:text-white/70 transition-colors duration-300">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-black border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <SectionHeading index="(02)" label="Method" title="How I Build Products" />
            <Reveal delay={0.15} className="md:pb-2 max-w-xs">
              <p className="text-white/40 text-sm leading-relaxed">
                A disciplined process that moves from problem to production — without skipping the fundamentals.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
            {PHILOSOPHY.map((card, i) => (
              <Reveal key={card.num} delay={i * 0.08}>
                <div className="group relative h-full bg-black p-8 md:p-12 transition-colors duration-500 hover:bg-white/[0.03] overflow-hidden">
                  <div className="absolute -top-6 -right-2 font-display font-black leading-none pointer-events-none select-none"
                    style={{ fontSize: "clamp(96px, 10vw, 150px)", letterSpacing: "-0.04em", color: "rgba(255,255,255,0.03)", transition: "color 0.5s ease" }}>
                    {card.num}
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-16 md:mb-24">
                      <span className="font-mono text-[11px] text-white/25">{card.num}</span>
                      <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                    <h3 className="font-display text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em" }}>
                      {card.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed max-w-md">{card.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERTISE ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-black border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20">
          <SectionHeading index="(03)" label="Stack" title="Technical Expertise" className="mb-16 md:mb-24" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
            {EXPERTISE.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.08}>
                <div className="border-t border-white/20 pt-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">{group.category}</span>
                    <span className="font-mono text-[10px] text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <ul className="space-y-1">
                    {group.items.map((tech) => (
                      <li key={tech}>
                        <span className="group/tech flex items-center justify-between py-2.5 cursor-default">
                          <span className="text-white/50 group-hover/tech:text-white transition-colors duration-200 text-sm">{tech}</span>
                          <span className="opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 font-mono text-[10px] text-white/40">→</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-44 bg-black overflow-hidden border-t border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(255,255,255,0.045) 0%, transparent 65%)" }} />
        <div className="relative px-6 md:px-12 lg:px-20">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
              className="font-display text-white leading-[0.95]"
              style={{ fontSize: "clamp(40px, 7.5vw, 104px)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Creating Digital Experiences
              <br />
              That Deliver <span className="text-white/[0.14]">Real Impact.</span>
            </motion.h2>
          </div>

          <Reveal delay={0.15} className="mt-12 max-w-lg">
            <p className="text-white/45 leading-relaxed" style={{ fontSize: "clamp(15px, 1.35vw, 18px)" }}>
              I help businesses and startups transform ideas into modern digital products through thoughtful
              design, scalable engineering, and product-focused execution.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-12">
            <a
              href="mailto:muaddhalsway@gmail.com"
              className="group relative inline-flex items-center gap-4 rounded-full bg-white text-black px-8 py-5 md:px-11 md:py-6 overflow-hidden transition-colors duration-300 hover:bg-[#e8e8e8]"
            >
              <span className="font-display font-bold whitespace-nowrap" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", letterSpacing: "-0.02em" }}>
                Let's Build Something Exceptional
              </span>
              <span className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <ArrowUpRight size={15} />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.3} className="mt-24 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {[
                  { icon: Github, label: "GitHub", url: "https://github.com/MuaddhAlsway" },
                  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/muaddh-alsway/" },
                  { icon: Mail, label: "Email", url: "mailto:muaddhalsway@gmail.com" },
                ].map(({ icon: Icon, label, url }) => (
                  <a key={label} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-200 group">
                    <Icon size={14} />
                    <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block">{label}</span>
                  </a>
                ))}
              </div>
              <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                © 2026 MULAB — Muaddh Alsway
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER MARQUEE ──────────────────────────────────────────────── */}
      <section className="py-6 border-t border-white/[0.06] overflow-hidden bg-black">
        <div className="relative flex">
          <div className="flex gap-0 whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span key={i} className="font-display text-white/[0.12] text-xl font-bold px-8 uppercase tracking-wider" style={{ letterSpacing: "-0.01em" }}>
                {word}<span className="text-white/[0.05] ml-10">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
