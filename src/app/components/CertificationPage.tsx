import { useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ExternalLink, ArrowUpRight, ShieldCheck } from "lucide-react";
import type { Certification } from "../data/certifications";

const EASE = [0.16, 1, 0.3, 1] as const;

function CertificationCover({ cert }: { cert: Certification }) {
  if (cert.coverType === "pdf") {
    return (
      <object
        data={`${cert.cover}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0&statusbar=0`}
        type="application/pdf"
        aria-label={`${cert.title} certificate`}
        className="w-full h-full"
      >
        <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-neutral-900">
          <ShieldCheck size={40} className="text-white/25" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 text-center px-6">
            PDF preview unavailable — open the certificate via the link below
          </p>
        </div>
      </object>
    );
  }
  return (
    <img
      src={cert.cover}
      alt={`${cert.title} certificate`}
      className="w-full h-full object-contain"
    />
  );
}

export default function CertificationPage({
  certification,
  onBack,
}: {
  certification: Certification;
  onBack: () => void;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [certification]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ─── HEADER ──────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />

        <div className="relative z-10 px-6 md:px-12 lg:px-20">
          {/* Breadcrumb / back */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="flex items-center justify-between gap-4 mb-14 md:mb-20"
          >
            <button
              onClick={onBack}
              className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-200"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to Home
            </button>
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Home — Certifications
            </span>
          </motion.div>

          {/* Eyebrow row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-[10px] text-white/25">{certification.num}</span>
            <div className="h-px w-24 bg-white/[0.08]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Certification</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="font-display text-white leading-[0.95]"
              style={{ fontSize: "clamp(34px, 5.5vw, 76px)", fontWeight: 800, letterSpacing: "-0.04em", maxWidth: "18ch" }}
            >
              {certification.title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-8 text-white/45 leading-relaxed max-w-2xl"
            style={{ fontSize: "clamp(15px, 1.35vw, 18px)" }}
          >
            {certification.summary}
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.1]"
          >
            {[
              { label: "Issuer", value: certification.issuer },
              { label: "Platform", value: certification.platform },
              { label: "Credential", value: "Verified Certificate" },
            ].map((meta) => (
              <div key={meta.label} className="py-7 px-6 border-b border-r border-white/[0.1] flex flex-col justify-end">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">{meta.label}</div>
                <div className="font-display text-white font-bold leading-tight" style={{ fontSize: "clamp(17px, 1.8vw, 22px)", letterSpacing: "-0.02em" }}>
                  {meta.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Verify link icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-10 flex items-center gap-3"
          >
            <a
              href={certification.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-6 py-3.5 md:px-8 md:py-4 transition-colors duration-300 hover:bg-[#e8e8e8]"
            >
              <ExternalLink size={15} />
              <span className="font-display font-bold whitespace-nowrap text-sm md:text-base" style={{ letterSpacing: "-0.02em" }}>
                View Certificate
              </span>
            </a>
            <a
              href={certification.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open certificate in a new tab"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 flex items-center justify-center transition-all duration-200 group"
            >
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── CERTIFICATE ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-black border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Certificate — {certification.num}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">{certification.platform}</span>
            </div>
            <a
              href={certification.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-white/[0.08] bg-neutral-900 hover:border-white/20 transition-colors duration-500"
            >
              <div className={certification.coverType === "pdf" ? "relative h-[70vh]" : "relative p-4 md:p-10"}>
                <CertificationCover cert={certification} />
              </div>
              <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={14} className="text-white/70" />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── OVERVIEW ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-black border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] text-white/25">(01)</span>
                <div className="h-px flex-1 max-w-[120px] bg-white/[0.08]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Overview</span>
              </div>
              <h2 className="font-display text-white font-bold leading-tight" style={{ fontSize: "clamp(26px, 3vw, 40px)", letterSpacing: "-0.03em" }}>
                What This Certification Covers
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="lg:col-span-7"
            >
              <p className="text-white/50 leading-relaxed" style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}>
                {certification.overview}
              </p>

              <div className="flex flex-wrap gap-2 mt-10">
                {certification.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-white/45 hover:border-white/20 hover:text-white/70 transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-black border-t border-white/[0.04]">
        <div className="px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 px-7 py-4 transition-all duration-300 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Home
          </button>

          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 rounded-full bg-white text-black px-8 py-5 overflow-hidden transition-colors duration-300 hover:bg-[#e8e8e8]"
          >
            <span className="font-display font-bold whitespace-nowrap" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", letterSpacing: "-0.02em" }}>
              View Certificate Online
            </span>
            <span className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
