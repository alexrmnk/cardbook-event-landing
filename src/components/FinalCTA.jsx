import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-32"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          aria-hidden="true"
        >
          <source
            src="https://zsbvvwzdczfrmsaxowpg.supabase.co/storage/v1/object/public/landing-media-ecosystem/video_back.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
      </div>

      {/* Subtle purple radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-radial-accent"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight tracking-tight mb-6 md:mb-8"
        >
          {t('finalCta.headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-10 md:mb-12"
        >
          {t('finalCta.subline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
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
      </div>
    </section>
  );
}
