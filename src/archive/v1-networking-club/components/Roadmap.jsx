import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../../../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const STEP_IMAGES = [
  '/media/1_connect.jpg',
  '/media/2_profile.jpg',
  '/media/3_reccive.jpg',
];

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

function RequestInvitationButton({ className = '' }) {
  return (
    <a
      href={t('hero.ctaHref')}
      className={`btn-primary group focus-visible:ring-offset-paper ${className}`}
    >
      <span className="text-xs uppercase tracking-widest">{t('hero.cta')}</span>
      <ArrowRight
        size={14}
        className="transition-transform duration-500 group-hover:translate-x-1"
      />
    </a>
  );
}

export default function Roadmap() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  const steps = textData.roadmap.steps;

  return (
    <section ref={sectionRef} className="relative bg-paper">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />

      <div className="mx-auto max-w-screen-xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-start gap-6 md:mb-20 lg:mb-24 lg:flex-row lg:items-center lg:justify-between"
        >
          <h2 className="section-heading text-paper-ink">
            {t('roadmap.title')}
          </h2>
          <RequestInvitationButton className="hidden shrink-0 lg:inline-flex" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[15px] hidden h-px
              bg-gradient-to-r from-transparent via-paper-ink/15 to-transparent
              lg:block"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[15px] top-[15px] w-px
              bg-gradient-to-b from-paper-ink/15 to-transparent
              lg:hidden"
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 xl:gap-14">
            {steps.map((step, i) => (
              <motion.article
                key={step.title}
                variants={stepVariants}
                className="group relative pl-10 lg:pl-0 lg:pt-10"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 flex size-[30px] items-center
                    justify-center rounded-full border border-paper-ink/15 bg-paper
                    font-mono text-[9px] tracking-[0.14em] text-paper-ink/40
                    transition-colors duration-500
                    group-hover:border-accent group-hover:text-accent
                    lg:left-1/2 lg:-translate-x-1/2"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div
                  className="relative mb-7 aspect-[4/3] overflow-hidden rounded-2xl
                    border border-paper-ink/10 bg-white/70
                    shadow-[0_20px_50px_-24px_rgba(22,21,28,0.18)]
                    transition-all duration-500 ease-out
                    group-hover:scale-[1.02]
                    group-hover:border-accent/20
                    group-hover:shadow-[0_24px_56px_-22px_rgba(22,21,28,0.22)]"
                >
                  <img
                    src={STEP_IMAGES[i]}
                    alt={step.title}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl
                      bg-accent/10 opacity-0 transition-opacity duration-500
                      group-hover:opacity-100"
                  />
                </div>

                <h3 className="mb-3.5 font-serif text-xl font-medium leading-snug text-paper-ink md:text-2xl">
                  {step.title}
                </h3>

                <span className="mb-4 block h-px w-5 bg-accent/40 transition-all duration-500 group-hover:w-9" />

                <p className="font-sans text-sm font-light leading-relaxed text-ink-400">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex w-full justify-center md:mt-16 lg:hidden"
          >
            <RequestInvitationButton />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
