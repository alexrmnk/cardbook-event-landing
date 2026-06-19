import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

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
      {/* Accent scan lines */}
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

      {/* Asymmetric 12-col grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto px-6 py-24">

        {/* ── LEFT: eyebrow + massive title + outline CTA (7 cols) ── */}
        <div className="lg:col-span-7 flex flex-col items-start">

          <motion.p
            {...anim(0)}
            className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 mb-6"
          >
            {t('sponsorship.eyebrow')}
          </motion.p>

          <motion.h2
            {...anim(0.1)}
            className="font-serif text-left text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white mb-10 text-balance"
          >
            {t('sponsorship.title')}
          </motion.h2>

          <motion.div {...anim(0.2)}>
            <a
              href="#"
              className="inline-flex items-center gap-2.5
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

        {/* ── RIGHT: description with decorative separator + glow (5 cols) ── */}
        <div className="lg:col-span-5 relative border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">

          {/* Glow orb — sits behind the text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-12 w-80 h-80 rounded-full bg-[#7541F6]/10 blur-3xl"
          />

          <motion.p
            {...anim(0.18)}
            className="relative font-sans text-lg text-zinc-400 leading-relaxed text-balance"
          >
            {t('sponsorship.description')}
          </motion.p>
        </div>

      </div>
    </section>
  );
}
