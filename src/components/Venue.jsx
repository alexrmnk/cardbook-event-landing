import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

// ─── Data ────────────────────────────────────────────────────────────────────

const ASPECT_WEIGHTS = {
  'aspect-[4/5]':  5 / 4,   // 1.25 — portrait
  'aspect-[9/16]': 16 / 9,  // 1.78 — tall portrait
  'aspect-square': 1,        // 1.00 — square
};

const VENUE_VIDEO_SRC =
  'https://pub-b7756046fce648dab5deb0c7fd91a650.r2.dev/video_back.mp4';

const VENUE_MEDIA = [
  { id: 1,  type: 'image', aspectRatio: 'aspect-[4/5]',   mediaSrc: '/media/1.jpeg'  },
  { id: 2,  type: 'image', aspectRatio: 'aspect-[9/16]',  mediaSrc: '/media/2.jpeg'  },
  { id: 3,  type: 'image', aspectRatio: 'aspect-square',  mediaSrc: '/media/3.jpeg'  },
  { id: 4,  type: 'image', aspectRatio: 'aspect-[9/16]',  mediaSrc: '/media/4.jpeg'  },
  { id: 5,  type: 'image', aspectRatio: 'aspect-[4/5]',   mediaSrc: '/media/5.jpeg'  },
  { id: 6,  type: 'video', aspectRatio: 'aspect-[9/16]',  mediaSrc: 'https://pub-b7756046fce648dab5deb0c7fd91a650.r2.dev/pantera_1.mp4'  },
  { id: 7,  type: 'image', aspectRatio: 'aspect-[4/5]',   mediaSrc: '/media/7.jpeg'  },
  { id: 8,  type: 'video', aspectRatio: 'aspect-[9/16]',  mediaSrc: 'https://pub-b7756046fce648dab5deb0c7fd91a650.r2.dev/pantera_2.mp4'  },
  { id: 9,  type: 'image', aspectRatio: 'aspect-square',  mediaSrc: '/media/9.jpeg'  },
  { id: 10, type: 'image', aspectRatio: 'aspect-[4/5]',   mediaSrc: '/media/10.jpeg' },
  { id: 11, type: 'image', aspectRatio: 'aspect-[9/16]',  mediaSrc: '/media/8.jpeg'},
  { id: 12, type: 'image', aspectRatio: 'aspect-square',  mediaSrc: '/media/6.jpeg'},
];

// ─── Column builder ───────────────────────────────────────────────────────────

/**
 * Greedy height-balancing: assigns each item to the lightest column.
 * Returns an array of column item arrays.
 */
function buildColumns(items, count) {
  const cols = Array.from({ length: count }, () => ({ items: [], weight: 0 }));
  for (const item of items) {
    const lightestIdx = cols.reduce(
      (minIdx, col, i) => (col.weight < cols[minIdx].weight ? i : minIdx),
      0,
    );
    cols[lightestIdx].items.push(item);
    cols[lightestIdx].weight += ASPECT_WEIGHTS[item.aspectRatio] ?? 1;
  }
  return cols.map((c) => c.items);
}

// ─── Layout config per breakpoint ────────────────────────────────────────────

const OFFSETS_2 = ['pt-0', 'pt-10'];
const OFFSETS_3 = ['pt-0', 'pt-12', 'pt-4'];
const OFFSETS_4 = ['pt-0', 'pt-16', 'pt-6', 'pt-24'];

// Parallax travel in px — even cols slower, odd cols faster
const BASE_TRAVEL = 160;
const SPEEDS = [0.8, 1.2, 0.8, 1.2]; // index → speed multiplier

// ─── Sub-component ────────────────────────────────────────────────────────────

function MediaCard({ item }) {
  return (
    <div
      className={`relative ${item.aspectRatio} w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-ink-800`}
    >
      {item.type === 'video' ? (
        <video
          src={item.mediaSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <img
          src={item.mediaSrc}
          alt=""
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      )}
    </div>
  );
}

function MasonryColumn({ items, parallaxY, topOffset }) {
  return (
    <motion.div
      style={{ y: parallaxY }}
      className={`flex flex-col gap-3 md:gap-4 ${topOffset}`}
    >
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Venue() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // One transform per column (max 4); declared at top level per hooks rules
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -(BASE_TRAVEL * SPEEDS[0])]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -(BASE_TRAVEL * SPEEDS[1])]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -(BASE_TRAVEL * SPEEDS[2])]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -(BASE_TRAVEL * SPEEDS[3])]);
  const yTransforms = [y0, y1, y2, y3];

  const cols4 = buildColumns(VENUE_MEDIA, 4);
  const cols3 = buildColumns(VENUE_MEDIA, 3);
  const cols2 = buildColumns(VENUE_MEDIA, 2);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-900 pt-28 md:pt-40 lg:pt-52 pb-0 overflow-hidden"
    >
      {/* ── Header (constrained to page typography) ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <span className="eyebrow">{t('venue.eyebrow')}</span>
          <div className="flex flex-nowrap justify-between items-center gap-3 sm:gap-4 w-full mb-6">
            <h2 className="section-heading mb-0 shrink min-w-0">{t('venue.titleLine1')}</h2>
            <a
              href="https://www.instagram.com/panthera_pro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Panthera on Instagram"
              className="w-20 md:w-32 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
            >
              <img
                src="/media/logos/panthera.png"
                alt="Panthera"
                className="w-full h-auto"
              />
            </a>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=19+Harbaa+Street,+Tel+Aviv,+Israel"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer block"
          >
            <div className="flex items-start gap-3">
              <MapPin
                size={16}
                className="text-zinc-400 group-hover:text-white shrink-0 mt-[3px] transition-colors duration-300"
              />
              <div>
                <p className="font-sans text-lg text-zinc-400 group-hover:text-white leading-snug transition-colors duration-300 flex items-center gap-1.5">
                  {t('venue.address')}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#7541F6]" />
                </p>
                <p className="font-sans text-base text-zinc-400 group-hover:text-white mt-0.5 transition-colors duration-300">
                  {t('venue.addressSub')}
                </p>
                <p className="font-sans text-base text-zinc-400 group-hover:text-white transition-colors duration-300">
                  {t('venue.city')}
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      </div>

      {/* ── Masonry Grid — full-bleed, edge-to-edge ──────────────────────── */}
      <div
        className="w-full px-2 md:px-4 overflow-hidden -mb-24 md:-mb-32 lg:-mb-40"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent)',
        }}
      >
        {/* Mobile – 2 columns */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {cols2.map((colItems, colIdx) => (
            <MasonryColumn
              key={`mob-${colIdx}`}
              items={colItems}
              parallaxY={yTransforms[colIdx]}
              topOffset={OFFSETS_2[colIdx]}
            />
          ))}
        </div>

        {/* Tablet – 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:hidden">
          {cols3.map((colItems, colIdx) => (
            <MasonryColumn
              key={`tab-${colIdx}`}
              items={colItems}
              parallaxY={yTransforms[colIdx]}
              topOffset={OFFSETS_3[colIdx]}
            />
          ))}
        </div>

        {/* Desktop – 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-5">
          {cols4.map((colItems, colIdx) => (
            <MasonryColumn
              key={`desk-${colIdx}`}
              items={colItems}
              parallaxY={yTransforms[colIdx]}
              topOffset={OFFSETS_4[colIdx]}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex justify-center w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-12 md:pb-16">
        <a href={t('hero.ctaHref')} className="btn-primary group">
          <span className="tracking-widest uppercase text-xs">{t('hero.cta')}</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
