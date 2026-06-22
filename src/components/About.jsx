import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const CO_ORGANISER_LOGOS = [
  { name: 'Connect', src: '/media/logos/connect.png' },
  { name: 'CardBook', src: '/media/logos/CardBook.png' },
  { name: 'Dealsflow', src: '/media/logos/dealsflow.png' },
];

const AVATAR_PROFILES = [
  {
    href: 'https://www.linkedin.com/in/elli-glaybman-0b6a8a127/',
    src: '/media/elli.jpg',
    alt: 'Elli Glaybman',
    name: 'Elli Glaybman',
    title: 'CO-FOUNDER & CEO',
  },
  {
    href: 'https://www.linkedin.com/in/alex-lyhovez-mba/',
    src: '/media/alex.jpg',
    alt: 'Alex Lyhovez',
    name: 'Alex Lyhovez',
    title: 'CO-FOUNDER & HEAD OF BUSINESS GROWTH',
  },
  {
    href: 'https://www.linkedin.com/in/alena-morozova-625969238/',
    src: '/media/alona.jpg',
    alt: 'Alena Morozov',
    name: 'Alena Morozov',
    title: 'CO-FOUNDER AND DIRECTOR OF TECHNICAL PRODUCT & MARKETING',
  },
];

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
      className="relative bg-ink-950 pt-16 pb-32 md:pt-20 md:pb-44 lg:pt-24 lg:pb-52 overflow-hidden"
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
            <div className="overflow-hidden mb-12 md:mb-16">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
              >
                {t('about.titleLine1')}{' '}
                <br className="hidden md:block" />
                <span className="text-[#7541F6]">{t('about.titleLine2')}</span>
              </motion.h2>
            </div>

            {/* Stat trio */}
            <div className="grid grid-cols-3 gap-0 min-w-0">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={revealVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={0.35 + i * 0.12}
                  className={`flex flex-col gap-1.5 py-6 min-w-0 ${i < 2 ? 'border-r border-ink-700 pr-3 md:pr-6' : ''} ${i > 0 ? 'pl-3 md:pl-6' : ''} ${i === 2 ? 'pr-0' : ''}`}
                >
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-ink-100 leading-none">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 max-w-[120px] leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column — body copy */}
          <div className="flex flex-col min-w-0">
            <motion.p
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.4}
              className="text-zinc-400 leading-relaxed text-base md:text-lg mb-6 last:mb-0"
            >
              {t('about.body1')}
            </motion.p>
            <motion.p
              variants={revealVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.52}
              className="text-zinc-400 leading-relaxed text-base md:text-lg mb-6 last:mb-0"
            >
              {t('about.body2')}
            </motion.p>
          </div>
        </div>

        {/* ── Culture block + merged co-organisers ── */}
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 24 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 md:mt-40"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start md:items-center mb-14 md:mb-16">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink-100 font-medium leading-snug mb-4">
                {t('about.cultureTitleLine1')}{' '}
                <br className="hidden md:block" />
                {t('about.cultureTitleLine2')}
              </h3>
              <p className="font-sans text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-lg">
                {t('about.cultureSubtitle')}
              </p>
            </div>

            <div className="min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 w-full">
                {AVATAR_PROFILES.map((profile) => (
                  <div
                    key={profile.href}
                    className="flex flex-row items-center md:flex-col md:items-start text-left md:text-center gap-4 md:gap-3 w-full min-w-0"
                  >
                    <img
                      src={profile.src}
                      alt={profile.alt}
                      loading="lazy"
                      draggable={false}
                      className="w-16 h-16 shrink-0 md:w-20 md:h-20 rounded-full object-cover md:mx-auto border-2 border-[#0e1013]"
                    />
                    <div className="flex flex-col items-start md:items-center min-w-0">
                      <p className="text-white font-medium text-sm md:text-base">
                        {profile.name}
                      </p>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-wider leading-snug mt-1 max-w-[200px] md:max-w-[150px]">
                        {profile.title}
                      </p>
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest mt-2 transition-colors duration-300"
                      >
                        LinkedIn ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-8 border-t border-ink-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 min-w-0">
              <span className="font-mono text-[10px] tracking-widest2 uppercase text-ink-500 shrink-0">
                {t('about.coOrganisersEyebrow')}
              </span>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {CO_ORGANISER_LOGOS.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    draggable={false}
                    className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 h-8 md:h-10 w-auto object-contain"
                  />
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/972509025013"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 w-fit self-start sm:self-auto border border-[#7541F6] text-[#7541F6] px-5 py-2 rounded-lg hover:bg-[#7541F6] hover:text-white transition-colors duration-300 shrink-0 font-mono text-[10px] tracking-widest2 uppercase"
            >
              {t('about.contactUs')}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
