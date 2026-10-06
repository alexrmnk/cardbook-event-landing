import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../../../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function FinalCTA() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldReduceMotion) return;
    video.pause();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-32"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay={!shouldReduceMotion}
          muted
          loop={!shouldReduceMotion}
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          aria-hidden="true"
        >
          <source
            src="https://assets.cardbookecosystem.com/video_back.mp4"
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

          <p className="mt-5 font-mono text-[10px] uppercase tracking-widest2 text-ink-300">
            {t('finalCta.priceNote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
