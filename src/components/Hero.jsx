import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Lock } from 'lucide-react';
import textData from '../locales/en.json';
import Header from './Header';
import Logo from './Logo';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-ink-950"
    >
      {/* ── Background video with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 scale-110 origin-center"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          aria-hidden="true"
        >
          <source src="https://pub-b7756046fce648dab5deb0c7fd91a650.r2.dev/video_back.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Dark overlay for text legibility ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-zinc-950/90 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-radial-accent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-48 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

      {/* ── Foreground content ── */}
      <div className="relative z-10 flex flex-col justify-between flex-1 min-h-screen w-full">
        <Header />

        <motion.div
          style={{ y: contentY }}
          className="flex flex-col items-center justify-center flex-1 px-6 md:px-12 text-center pb-12 pt-8 md:pt-12"
        >
          {/* Headline — logo with sr-only h1 for SEO */}
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mb-4 w-full max-w-2xl mx-auto"
          >
            <h1 className="sr-only">{t('nav.brand')}</h1>
            <Logo className="w-full h-auto" aria-hidden="true" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.9)}
            className="font-sans font-light text-sm md:text-base tracking-[0.18em] uppercase text-ink-300 mb-12 md:mb-16"
          >
            <a
              href="https://cardbookecosystem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {t('hero.subtitle')}
            </a>
          </motion.p>

          {/* Meta row — date & location */}
          <motion.div
            {...fadeUp(1.05)}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-12 md:mb-16"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[9px] tracking-widest3 uppercase text-ink-400">{t('hero.dateLabel')}</span>
              <span className="font-sans text-2xl md:text-3xl text-ink-100 tracking-wider">
                {t('hero.date')} &nbsp;·&nbsp; {t('hero.time')}
              </span>
            </div>

            <span className="hidden sm:block w-px h-10 bg-ink-600" />

            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[9px] tracking-widest3 uppercase text-ink-400">{t('hero.locationLabel')}</span>
              <span className="flex items-center gap-2 font-sans text-2xl md:text-3xl text-ink-100 tracking-wider">
                <MapPin size={20} className="text-accent shrink-0" />
                {t('hero.locationCity')}
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(1.2)}>
            <a href={t('hero.ctaHref')} className="btn-primary group">
              <span className="tracking-widest uppercase text-xs">{t('hero.cta')}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
            <div className="flex items-center justify-center gap-2 md:gap-3 mt-10 md:mt-8 px-5 py-2.5 md:px-6 md:py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md w-fit mx-auto max-w-[90vw]">
              <Lock className="w-3.5 h-3.5 md:w-3 md:h-3 text-white shrink-0" aria-hidden="true" />
              <div className="flex flex-col md:flex-row items-center text-center text-[11px] md:text-xs uppercase tracking-wider md:tracking-[0.2em] text-white font-medium leading-tight">
                <span>BY INVITATION ONLY</span>
                <span className="hidden md:inline mx-2">·</span>
                <span>STRICTLY LIMITED SEATS</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
