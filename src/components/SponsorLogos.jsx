import { useState } from 'react';
import { motion } from 'framer-motion';

const SPONSORS = [
  {
    src: '/media/sponsor-logo/mellius-logo.svg',
    alt: 'Mellius',
    href: 'https://mellius.com',
  },
  {
    src: '/media/sponsor-logo/smartexe-logo.svg',
    alt: 'Smartexe',
    href: 'https://smartexe.com',
  },
];

const TRACK_ITEMS = Array.from({ length: 8 }, () => SPONSORS).flat();

const EDGE_FADE_LEFT =
  'linear-gradient(to right, #060608 0%, #060608 28%, rgba(6,6,8,0.92) 48%, rgba(6,6,8,0.55) 68%, transparent 100%)';

const EDGE_FADE_RIGHT =
  'linear-gradient(to left, #060608 0%, #060608 18%, rgba(6,6,8,0.88) 42%, rgba(6,6,8,0.45) 68%, transparent 100%)';

function LogoTrack({ items, ariaHidden = false }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 md:gap-20 lg:gap-24"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((sponsor, index) => (
        <a
          key={`${sponsor.alt}-${index}`}
          href={sponsor.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex shrink-0 items-center"
          aria-label={ariaHidden ? undefined : `Visit ${sponsor.alt} website`}
          tabIndex={ariaHidden ? -1 : undefined}
        >
          <img
            alt={sponsor.alt}
            className="h-6 w-auto select-none object-contain opacity-45 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100 md:h-11"
            decoding="async"
            height="auto"
            loading="eager"
            src={sponsor.src}
            width="auto"
          />
        </a>
      ))}
    </div>
  );
}

export default function SponsorLogos() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section aria-label="Event sponsors" className="relative w-full bg-ink-950">
      <p className="pointer-events-none px-6 pb-3 text-center font-mono text-[8px] tracking-widest2 uppercase text-ink-500/90 md:hidden">
        Supported by
      </p>

      <div className="relative border-y border-ink-800">
        <div
          className="relative overflow-hidden py-5 md:py-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex w-max will-change-transform"
            initial={{ x: '-50%' }}
            animate={{ x: '0%' }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: isHovered ? 80 : 60,
              repeatType: 'loop',
            }}
          >
            <LogoTrack items={TRACK_ITEMS} />
            <LogoTrack items={TRACK_ITEMS} ariaHidden />
          </motion.div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 md:w-44 lg:w-52"
            style={{ background: EDGE_FADE_LEFT }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 md:w-28 lg:w-36"
            style={{ background: EDGE_FADE_RIGHT }}
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-44 items-center justify-end pr-5 md:flex lg:w-52">
            <span className="font-mono text-[9px] leading-tight tracking-widest2 uppercase text-ink-500/90">
              Supported by
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
