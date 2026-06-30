import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
    image: '/Projects/TRQ.png',
    github: 'https://github.com/MuaddhAlsway/TRQ-Archicator-Studio.git',
    live: 'https://trqstudio.com/',
    brand: 'MULAB'
  },
  {
    id: 2,
    name: 'TD Logistics',
    description: 'Logistics services platform',
    tech: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind'],
    image: '/Projects/TD.png',
    github: 'https://github.com/MuaddhAlsway/TD-cloudflare-deploy.git',
    live: 'https://tdlogistics.co/',
    brand: 'MIBDAAT AL-THELATH for advertising'
  },
  {
    id: 3,
    name: "Writer's Journey",
    description: 'Book Launch Platform',
    tech: ['React', 'Express.js', 'Turso', 'Resend'],
    image: '/Projects/WRITING.png',
    github: 'https://github.com/MuaddhAlsway/Writer-Website-Landing-Page.git',
    live: ' https://authorfsk.com/',
    brand: 'MIBDAAT AL-THELATH for advertising'
  },
  {
    id: 4,
    name: 'Riyadah',
    description: 'Accounting firm website',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: '/Projects/ALRYADH.png',
    github: 'https://github.com/MuaddhAlsway/Alryadah.git',
    live: 'https://bc0161e1.riyadah-certified-accountants-saudi-arabia.pages.dev/',
    brand: 'MULAB'
  },
  {
    id: 5,
    name: 'Mesaha Lakum',
    description: 'Event Management & Cultural Platform',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    image: '/Projects/LAKUM.png',
    github: 'https://github.com/MuaddhAlsway/LAKUMPremiumVersion.git',
    live: ' https://lakumartspace.com/',
    brand: 'MIBDAAT AL-THELATH for advertising'
  }
];

export function FeaturedClients() {
  return (
    <section className="py-20 bg-[#0f0f0f] overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-[#e8ab61]">Client Showcase</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of 5 client projects showcasing expertise in web development and programming
          </p>
        </motion.div>
      </div>

      {/* Company Logo Section */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 px-6"
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
                className="flex-shrink-0 w-full md:w-96"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#e8ab61]/50 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 bg-gray-900 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#e8ab61] transition-colors mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm flex-grow">
                      {project.description}
                    </p>

                    {/* Brand Section */}
                    <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
                      <div className="w-5 h-5 bg-[#e8ab61] rounded-full flex items-center justify-center font-bold text-[#0f0f0f] text-xs flex-shrink-0">
                        <Building2 className="w-3 h-3" />
                      </div>
                      <span>{project.brand || 'MIBDAAT AL-THELATH for advertising'}</span>
                    </div>

                    {/* Links - Fixed Height Container */}
                    <div className="flex gap-2">
                      {project.live && (
                        <a
                          href={project.live.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-[#e8ab61]/10 text-[#e8ab61] rounded-lg text-sm font-medium hover:bg-[#e8ab61]/20 transition-colors text-center flex items-center justify-center"
                        >
                          Live
                        </a>
                      )}
                      {!project.live && (
                        <div className="flex-1"></div>
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
