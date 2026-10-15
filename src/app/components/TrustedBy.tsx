import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ClientLogo {
  name: string;
  src: string;
  href?: string;
}

const clientLogos: ClientLogo[] = [
  { name: 'TRQ Studio', src: '/logoclient/trqstudio.png', href: 'https://trqstudio.com/' },
  { name: 'TD Logistics', src: '/logoclient/tdlogistic.jpg', href: 'https://tdlogistics.co/' },
  { name: 'Mesaha Lakum', src: '/logoclient/lakumartspace.png', href: 'https://lakumartspace.com/' },
  { name: 'Three Sister', src: '/logoclient/threesister.jpg' },
  { name: 'MADD', src: '/logoclient/madd.png' },
];

export function TrustedBy() {
  const row = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 md:py-20 bg-black border-b border-white/[0.06] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Trusted By</p>
          <h2
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em' }}
          >
            Brands I've <span className="text-white/[0.7]">Built For</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-black to-transparent" />

        <motion.div
          className="flex items-center gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((logo, i) => {
            const content = (
              <ImageWithFallback
                src={logo.src}
                alt={logo.name}
                className="max-h-12 md:max-h-14 max-w-[70%] object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
              />
            );

            const tileClass =
              'group flex-shrink-0 flex items-center justify-center h-24 md:h-28 w-52 md:w-64 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] px-6 transition-colors';

            return logo.href ? (
              <a
                key={`${logo.name}-${i}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
                className={tileClass}
              >
                {content}
              </a>
            ) : (
              <div key={`${logo.name}-${i}`} className={tileClass} aria-label={logo.name}>
                {content}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
