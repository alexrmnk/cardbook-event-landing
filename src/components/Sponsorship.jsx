import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

/* ── Animation variants ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export default function Sponsorship() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const anim = (delay) => ({
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    variants: fadeUp(delay),
  });

  return (
    <section
      ref={ref}
      className="relative bg-ink-950 border-y border-white/[0.05] overflow-hidden"
    >
      {/* Centered radial glow — magnetic depth without breaking dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[900px] h-[600px] rounded-full bg-[#7541F6] opacity-[0.06] blur-[120px]" />
      </div>

      {/* Top & bottom accent lines that scale in on entry */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-left"
      />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto text-center py-32 px-6">

        {/* Eyebrow */}
        <motion.p
          {...anim(0)}
          className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 mb-6"
        >
          {t('sponsorship.eyebrow')}
        </motion.p>

        {/* Title */}
        <motion.h2
          {...anim(0.12)}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8 text-balance"
        >
          {t('sponsorship.title')}
        </motion.h2>

        {/* Description */}
        <motion.p
          {...anim(0.22)}
          className="font-sans text-lg text-zinc-400 leading-relaxed mb-12 max-w-2xl mx-auto text-balance"
        >
          {t('sponsorship.description')}
        </motion.p>

        {/* CTA */}
        <motion.div {...anim(0.32)}>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2.5 mx-auto w-fit
              px-8 py-3.5 rounded-lg
              border border-white/20 bg-white/[0.04]
              font-sans text-sm tracking-widest uppercase text-white/80
              hover:bg-white hover:text-black hover:border-white
              transition-all duration-500"
          >
            <span>{t('sponsorship.cta')}</span>
            <ArrowRight className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
