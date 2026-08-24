import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

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
  {
    src: '/media/sponsor-logo/anat-cherpak.png',
    alt: 'Anat Cherpak',
    href: 'https://www.linkedin.com/in/anat-cherpak-%D7%A2%D7%A0%D7%AA-%D7%A6-%D7%A8%D7%A4%D7%A7-%D7%9E%D7%97%D7%A0%D7%90%D7%99-142b2822/',
  },
  {
    src: '/media/sponsor-logo/deal%20ventures.png',
    alt: 'Deal Ventures',
    href: 'https://www.linkedin.com/in/ido-yonesi/',
  },
  {
    src: '/media/sponsor-logo/acro.png',
    alt: 'Acro',
    href: 'https://acronadlan.com/en/',
  },
  {
    src: '/media/sponsor-logo/partner4.png',
    alt: 'Passport News',
    href: 'https://passport.news/',
  },
  {
    src: '/media/sponsor-logo/TBC.svg',
    alt: 'TBC',
    href: 'https://tbcbank.ge/en',
  },
  {
    src: '/media/sponsor-logo/agile.png',
    alt: 'Agile',
    href: 'https://getagile.ai/',
  },
  {
    src: '/media/sponsor-logo/AB_media.png',
    alt: 'AB media',
    href: 'https://www.instagram.com/ab.media.il',
  },
];

const TRACK_ITEMS = Array.from({ length: 8 }, () => SPONSORS).flat();
const MARQUEE_DURATION_MS = 100_000;
const DRAG_CLICK_THRESHOLD_PX = 6;

const EDGE_FADE_LEFT =
  'linear-gradient(to right, #060608 0%, #060608 28%, rgba(6,6,8,0.92) 48%, rgba(6,6,8,0.55) 68%, transparent 100%)';

const EDGE_FADE_RIGHT =
  'linear-gradient(to left, #060608 0%, #060608 18%, rgba(6,6,8,0.88) 42%, rgba(6,6,8,0.45) 68%, transparent 100%)';

function normalizeOffset(value, halfWidth) {
  if (!halfWidth) return value;
  let next = value;
  while (next > 0) next -= halfWidth;
  while (next <= -halfWidth) next += halfWidth;
  return next;
}

function LogoTrack({ items, ariaHidden = false, onLinkClick }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-20 md:pr-20 lg:gap-24 lg:pr-24"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((sponsor, index) => {
        const logo = (
          <img
            alt={sponsor.alt}
            className="pointer-events-none block h-6 w-auto max-w-none select-none object-contain opacity-45 brightness-0 invert transition-opacity duration-300 group-hover/link:opacity-100 md:h-11"
            decoding="async"
            draggable={false}
            height="auto"
            loading="eager"
            src={sponsor.src}
            width="auto"
          />
        );

        if (!sponsor.href) {
          return (
            <div
              key={`${sponsor.alt}-${index}`}
              className="group/link flex shrink-0 items-center"
              aria-hidden={ariaHidden || undefined}
            >
              {logo}
            </div>
          );
        }

        return (
          <a
            key={`${sponsor.alt}-${index}`}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link relative z-10 flex shrink-0 items-center rounded-sm outline-none transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-label={ariaHidden ? undefined : `Visit ${sponsor.alt}`}
            tabIndex={ariaHidden ? -1 : undefined}
            onClick={onLinkClick}
            onDragStart={(event) => event.preventDefault()}
          >
            {logo}
          </a>
        );
      })}
    </div>
  );
}

export default function SponsorLogos() {
  const trackRef = useRef(null);
  const halfWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);

  const x = useMotionValue(0);

  const setPaused = (paused) => {
    isPausedRef.current = paused;
  };

  const syncPausedState = () => {
    setPaused(
      isDraggingRef.current || isHoveredRef.current || prefersReducedMotionRef.current,
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
      syncPausedState();
    };
    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let initialized = false;

    const updateHalfWidth = () => {
      const half = track.scrollWidth / 2;
      if (!half) return;

      halfWidthRef.current = half;

      if (!initialized) {
        x.set(-half);
        initialized = true;
        return;
      }

      x.set(normalizeOffset(x.get(), half));
    };

    updateHalfWidth();

    const resizeObserver = new ResizeObserver(updateHalfWidth);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (isPausedRef.current) return;

    const half = halfWidthRef.current;
    if (!half) return;

    const speed = half / MARQUEE_DURATION_MS;
    x.set(normalizeOffset(x.get() + speed * delta, half));
  });

  const handleDragStart = () => {
    suppressClickRef.current = false;
    isDraggingRef.current = true;
    syncPausedState();
  };

  const handleDrag = (_, info) => {
    if (Math.abs(info.offset.x) > DRAG_CLICK_THRESHOLD_PX) {
      suppressClickRef.current = true;
    }
  };

  const handleDragEnd = () => {
    const half = halfWidthRef.current;
    if (half) {
      x.set(normalizeOffset(x.get(), half));
    }

    isDraggingRef.current = false;
    syncPausedState();

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const handleLinkClick = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault();
    }
  };

  return (
    <section aria-label="Event sponsors" className="relative w-full bg-ink-950">
      <p className="pointer-events-none px-6 pb-3 text-center font-mono text-[8px] tracking-widest2 uppercase text-ink-500/90 md:hidden">
        Supported by
      </p>

      <div className="relative border-y border-ink-800">
        <div className="relative overflow-hidden py-5 md:py-6">
          <motion.div
            ref={trackRef}
            className="flex w-max cursor-grab select-none will-change-transform active:cursor-grabbing"
            style={{ x, touchAction: 'none' }}
            drag="x"
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onHoverStart={() => {
              isHoveredRef.current = true;
              syncPausedState();
            }}
            onHoverEnd={() => {
              isHoveredRef.current = false;
              syncPausedState();
            }}
          >
            <LogoTrack items={TRACK_ITEMS} onLinkClick={handleLinkClick} />
            <LogoTrack items={TRACK_ITEMS} ariaHidden onLinkClick={handleLinkClick} />
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
