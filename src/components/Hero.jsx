import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import heroImage from '../assets/hero.png';
import textData from '../locales/en.json';
import Header from './Header';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.4, ease: 'easeOut', delay },
});

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.65, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-ink-950"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110 origin-center"
      >
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Layered overlays ── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-ink-950"
      />
      {/* Radial accent from top */}
      <div className="absolute inset-0 bg-radial-accent pointer-events-none" />
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

      {/* ── Header / Logo ── */}
      <Header />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 md:px-12 text-center pb-24 pt-16"
      >
        {/* Eyebrow */}
        <motion.div {...fadeIn(0.4)} className="mb-8 md:mb-10">
          <span className="eyebrow">{t('hero.eyebrow')}</span>
          {/* Decorative line */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px bg-accent/40 w-16 mx-auto mt-3 origin-left"
          />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-medium text-[clamp(3.5rem,10vw,9rem)] leading-[0.95] tracking-tight text-ink-100"
          >
            {t('hero.titleLine1')}
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-medium text-[clamp(3.5rem,10vw,9rem)] leading-[0.95] tracking-tight text-ink-100"
          >
            {t('hero.titleLine2')}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.9)}
          className="font-sans font-light text-sm md:text-base tracking-[0.18em] uppercase text-ink-300 mb-12 md:mb-16"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Meta row — date & location */}
        <motion.div
          {...fadeUp(1.05)}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-12 md:mb-16"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] tracking-widest3 uppercase text-ink-400">{t('hero.dateLabel')}</span>
            <span className="font-sans text-base md:text-lg text-ink-100 tracking-wider">
              {t('hero.date')} &nbsp;·&nbsp; {t('hero.time')}
            </span>
          </div>

          <span className="hidden sm:block w-px h-8 bg-ink-600" />

          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] tracking-widest3 uppercase text-ink-400">{t('hero.locationLabel')}</span>
            <span className="flex items-center gap-1.5 font-sans text-base md:text-lg text-ink-100 tracking-wider">
              <MapPin size={13} className="text-accent" />
              {t('hero.locationCity')}
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(1.2)}>
          <button className="btn-primary group">
            <span className="tracking-widest uppercase text-xs">{t('hero.cta')}</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </button>
          <p className="mt-5 font-mono text-[9px] tracking-widest2 uppercase text-ink-500">
            {t('hero.ctaNote')}
          </p>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        {...fadeIn(1.8)}
        className="relative z-10 flex flex-col items-center pb-10 gap-2"
      >
        <span className="font-mono text-[9px] tracking-widest3 uppercase text-ink-500">{t('hero.scrollHint')}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-8 bg-gradient-to-b from-ink-600 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
