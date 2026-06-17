import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      ref={ref}
      className="relative bg-ink-950 border-t border-ink-800 py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-accent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-ink-100 leading-tight tracking-tight mb-6 md:mb-8"
        >
          {t('finalCta.headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base md:text-lg text-ink-300 font-light leading-relaxed mb-10 md:mb-12 max-w-3xl md:max-w-4xl mx-auto md:whitespace-nowrap"
        >
          {t('finalCta.subline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href={t('hero.ctaHref')} className="btn-primary group">
            <span className="tracking-widest uppercase text-xs">{t('hero.cta')}</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </a>
          <p className="mt-5 font-mono text-[9px] tracking-widest2 uppercase text-zinc-500">
            {t('hero.ctaNote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
