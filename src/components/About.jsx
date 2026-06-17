import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

function useReveal(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px', ...options });
  return { ref, isInView };
}

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const stats = [
  { value: t('about.stat1Value'), label: t('about.stat1Label') },
  { value: t('about.stat2Value'), label: t('about.stat2Label') },
  { value: t('about.stat3Value'), label: t('about.stat3Label') },
];

export default function About() {
  const { ref: sectionRef, isInView } = useReveal();
  const { ref: quoteRef, isInView: quoteInView } = useReveal();

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-950 py-32 md:py-44 lg:py-52 overflow-hidden"
    >
      {/* Subtle background accent blob */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent-glow blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Header row ── */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="mb-20 md:mb-28"
        >
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <motion.span
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="block h-px bg-accent/30 w-12 mb-8 origin-left"
          />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-start">

          {/* Left column — heading + stats */}
          <div>
            {/* Heading */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
              >
                {t('about.titleLine1')}
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-12 md:mb-16">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading text-accent"
              >
                {t('about.titleLine2')}
              </motion.h2>
            </div>

            {/* Stat trio */}
            <div className="grid grid-cols-3 gap-0">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={revealVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={0.35 + i * 0.12}
                  className={`flex flex-col gap-1.5 py-6 pr-6 ${i < 2 ? 'border-r border-ink-700' : ''} ${i > 0 ? 'pl-6 pr-0' : ''}`}
                >
                  <span className="font-serif text-3xl md:text-4xl font-medium text-ink-100 leading-none">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest2 uppercase text-ink-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column — body copy */}
          <div className="flex flex-col gap-7">
            <motion.p
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.4}
              className="font-sans text-base md:text-lg text-ink-300 leading-relaxed font-light"
            >
              {t('about.body1')}
            </motion.p>
            <motion.p
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.52}
              className="font-sans text-base md:text-lg text-ink-300 leading-relaxed font-light"
            >
              {t('about.body2')}
            </motion.p>
          </div>
        </div>

        {/* ── Pull quote ── */}
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 24 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 md:mt-40 border-l-2 border-accent/50 pl-8 md:pl-12 max-w-2xl"
        >
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink-200 leading-snug italic font-medium">
            &ldquo;{t('about.pullQuote')}&rdquo;
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
