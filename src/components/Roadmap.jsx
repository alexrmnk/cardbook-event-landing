import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const STEP_IMAGES = [
  '/media/1_connect.jpg',
  '/media/2_profile.jpg',
  '/media/3_reccive.jpg',
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Roadmap() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  const steps = textData.roadmap.steps;

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-950 border-t border-ink-800"
    >
      {/* Top accent scan line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <span className="eyebrow">{t('roadmap.tag')}</span>
          <h2 className="section-heading mt-4">
            {t('roadmap.title')}
          </h2>
        </motion.div>

        {/* ── Steps grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/*
            Desktop connector: horizontal hairline centred on the badge dots.
            Badge height = 30 px → centre = 15 px from grid top.
          */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[15px] left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-white/[0.10] to-transparent
              pointer-events-none"
          />

          {/*
            Mobile connector: vertical hairline aligned to the centre of each badge (left-[15px]).
            Fades out toward the bottom with a gradient.
          */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute top-[15px] bottom-0 left-[15px] w-px
              bg-gradient-to-b from-white/[0.10] to-transparent
              pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-14">
            {steps.map((step, i) => (
              <motion.article
                key={step.title}
                variants={stepVariants}
                className="group relative pl-10 lg:pl-0 lg:pt-10"
              >
                  {/*
                    Step index badge.
                    Mobile  : absolute top-left of the article (aligns with vertical track).
                    Desktop : absolute top-centre of the article (sits on horizontal connector).
                  */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0
                      lg:left-1/2 lg:-translate-x-1/2 z-10
                      size-[30px] rounded-full
                      border border-white/[0.12] bg-ink-950
                      flex items-center justify-center
                      font-mono text-[9px] tracking-[0.14em] text-white/30
                      group-hover:border-accent/50 group-hover:text-accent/80
                      transition-colors duration-500"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* ── Step illustration ── */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl
                      bg-white/[0.01] border border-white/[0.08]
                      backdrop-blur-sm mb-7
                      transition-all duration-500 ease-out
                      group-hover:scale-[1.02]
                      group-hover:border-white/[0.13]
                      group-hover:shadow-[0_0_56px_-10px_rgba(117,65,246,0.28)]"
                  >
                    <img
                      src={STEP_IMAGES[i]}
                      alt={step.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />

                    {/* Inner accent glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl
                        bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 pointer-events-none"
                    />
                  </div>

                  {/* ── Step title ── */}
                  <h3
                    className="font-serif text-xl md:text-2xl font-medium leading-snug
                      text-ink-200 mb-3.5
                      group-hover:text-white
                      transition-colors duration-500"
                  >
                    {step.title}
                  </h3>

                  {/* Hairline rule */}
                  <span
                    className="block h-px bg-accent/30 mb-4
                      w-5 group-hover:w-9
                      transition-all duration-500"
                  />

                  {/* ── Step description ── */}
                  <p
                    className="font-sans text-sm leading-relaxed font-light
                      text-ink-300
                      group-hover:text-ink-100
                      transition-colors duration-500"
                  >
                    {step.description}
                  </p>
                </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 flex justify-center w-full"
          >
            <a href={t('hero.ctaHref')} className="btn-primary group">
              <span className="tracking-widest uppercase text-xs">{t('hero.cta')}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
