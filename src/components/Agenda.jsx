import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function Agenda() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const items = textData.agenda.items;

  return (
    <section ref={ref} className="relative bg-ink-950 pt-16 md:pt-20 lg:pt-24 pb-32 md:pb-44 lg:pb-52">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="eyebrow">{t('agenda.eyebrow')}</span>
          <h2 className="section-heading">{t('agenda.titleLine1')}</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[88px] md:left-[112px] top-0 bottom-0 w-px bg-ink-700" />

          <div className="flex flex-col gap-0">
            {items.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-8 md:gap-12 py-8 md:py-10 border-b border-ink-800 last:border-0"
              >
                {/* Time */}
                <span className="font-mono text-sm md:text-xl text-ink-400 w-16 md:w-20 shrink-0 pt-0.5">
                  {item.time}
                </span>

                {/* Dot on timeline */}
                <span className="absolute left-[84px] md:left-[108px] top-[2.6rem] w-2 h-2 rounded-full bg-accent/60 border border-accent/30" />

                {/* Content */}
                <div className="pl-6 md:pl-8">
                  <p className="font-serif text-lg md:text-xl text-ink-100 font-medium mb-1">{item.title}</p>
                  <p className="font-sans text-base text-ink-200 font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
