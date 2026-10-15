import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompanyLogo {
  name: string;
  src: string;
  href?: string;
}

const logoMap: Record<string, CompanyLogo> = {
  'MADD': { name: 'MADD', src: '/logoclient/madd.png', href: 'https://mad-d.net/' },
  'Establishment MIBDAAT EL-THELATH': { name: 'Three Sister', src: '/logoclient/threesister.jpg' },
  'TRQ Studio': { name: 'TRQ Studio', src: '/logoclient/trqstudio.png', href: 'https://trqstudio.com/' },
};

export function CompanyLogo({ company }: { company: string }) {
  const logo = logoMap[company];
  if (!logo) return null;
  const img = (
    <ImageWithFallback
      src={logo.src}
      alt={company}
      className="max-h-8 sm:max-h-9 max-w-[160px] object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-75 group-hover:opacity-100"
    />
  );
  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
        aria-label={company}
      >
        {img}
      </a>
    );
  }
  return <div className="flex items-center">{img}</div>;
}
