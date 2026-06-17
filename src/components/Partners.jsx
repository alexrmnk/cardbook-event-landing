import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const names = textData.partners.names;

  return (
    <section ref={ref} className="relative bg-ink-900 py-32 md:py-44">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="eyebrow">{t('partners.eyebrow')}</span>
          <h2 className="section-heading">{t('partners.titleLine1')}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-700">
          {names.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
              className="bg-ink-900 aspect-video flex items-center justify-center p-8 group hover:bg-ink-800 transition-colors duration-400"
            >
              {/* Logo placeholder — replace with <img> when assets are provided */}
              <span className="font-serif text-ink-500 text-sm tracking-wider group-hover:text-ink-300 transition-colors duration-400">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
