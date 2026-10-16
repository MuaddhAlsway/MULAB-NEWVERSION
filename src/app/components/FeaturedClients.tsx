import { motion } from 'motion/react';
import { LazyImage } from './LazyImage';

interface ClientProject {
  id: number;
  name: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  linkedin?: string;
  brand?: string;
}

const clientProjects: ClientProject[] = [
  {
    id: 1,
    name: 'TRQ Studio',
    description: 'Modern Portfolio & CMS Platform',
    tech: ['Next.js', 'React', 'Tailwind', 'CMS'],
    image: '/Projects/mockup/TRQ.png',
    github: 'https://github.com/MuaddhAlsway/TRQ-Archicator-Studio.git',
    live: 'https://trqstudio.com/',
    brand: 'MULAB'
  },
  {
    id: 2,
    name: 'TD Logistics',
    description: 'Logistics & Tracking Platform',
    tech: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind'],
    image: '/Projects/mockup/TD.png',
    github: 'https://github.com/MuaddhAlsway/TD-cloudflare-deploy.git',
    live: 'https://tdlogistics.co/',
    brand: 'MIBDAAT AL-THELATH for advertising'
  },
  {
    id: 3,
    name: "Writer's Journey",
    description: 'Book Launch & Email Platform',
    tech: ['React', 'Express.js', 'Turso', 'Resend'],
    image: '/Projects/mockup/WRITING.png',
    github: 'https://github.com/MuaddhAlsway/Writer-Website-Landing-Page.git',
    live: ' https://authorfsk.com/',
    brand: 'MIBDAAT AL-THELATH for advertising'
  },
  {
    id: 4,
    name: 'Riyadah',
    description: 'Accounting Firm Platform',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: '/Projects/mockup/ALRYADH.png',
    github: 'https://github.com/MuaddhAlsway/Alryadah.git',
    live: 'https://bc0161e1.riyadah-certified-accountants-saudi-arabia.pages.dev/',
    brand: 'MULAB'
  },
  {
    id: 5,
    name: 'Mesaha Lakum',
    description: 'Event Management Platform',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    image: '/Projects/mockup/LAKUM.png',
    github: 'https://github.com/MuaddhAlsway/LAKUMPremiumVersion.git',
    live: ' https://lakumartspace.com/',
    brand: 'MIBDAAT AL-THELATH for advertising'
  }
];

const brandLogos: Record<string, string> = {
  'MULAB': '/logoclient/mulab.png',
  'MIBDAAT AL-THELATH for advertising': '/logoclient/threesister.jpg',
};

export function FeaturedClients() {
  return (
    <section className="py-24 md:py-36 bg-black">
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Client Showcase</p>
          <h2 className="font-display text-white leading-none mb-6" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Featured <span className="text-white/[0.7]">Client</span> Work
          </h2>
          <p className="font-mono text-[11px] text-white/35 uppercase tracking-widest max-w-2xl">
            A curated selection of client projects demonstrating professional web development expertise
          </p>
        </motion.div>
      </div>

      {/* Client Projects Carousel */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-stretch gap-6 px-6 md:px-12 lg:px-20"
          animate={{ x: [0, -(clientProjects.length * 400 + 24 * clientProjects.length)] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          {/* Repeat projects 4 times for seamless infinite loop */}
          {[...Array(4)].map((_, setIndex) =>
            clientProjects.map((project) => (
              <div
                key={`${project.id}-${setIndex}`}
                className="flex-shrink-0 w-[82vw] md:w-[44vw] lg:w-[36vw]"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56 md:h-72 bg-neutral-900 flex-shrink-0">
                    <LazyImage
                      src={project.image}
                      alt={project.name}
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content Container */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-display text-white font-bold group-hover:text-white/[0.9] transition-colors line-clamp-1" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", letterSpacing: "-0.02em" }}>
                        {project.name}
                      </h3>
                      <span className="font-mono text-[10px] text-white/25 flex-shrink-0 mt-1">Client</span>
                    </div>
                    
                    <p className="font-mono text-[11px] text-white/35 uppercase tracking-widest mb-4 line-clamp-2 min-h-[2.6em]">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[3.25rem] content-start">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-white/40">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Brand Section */}
                    <div className="flex items-center flex-wrap gap-x-2.5 gap-y-2 mb-4 pt-3 border-t border-white/[0.06] min-h-[40px]">
                      {project.brand && brandLogos[project.brand] && (
                        <img
                          src={brandLogos[project.brand]}
                          alt={project.brand}
                          className="h-5 max-w-[130px] object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                        />
                      )}
                      <span className="font-mono text-[10px] text-white/40 tracking-[0.1em] uppercase">
                        {project.brand || 'MIBDAAT AL-THELATH'}
                      </span>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 mt-auto">
                      {project.live && (
                        <a
                          href={project.live.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-white/[0.8] hover:text-white rounded-lg font-mono text-[10px] uppercase tracking-[0.1em] text-center transition-all duration-200 flex items-center justify-center"
                        >
                          View Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
