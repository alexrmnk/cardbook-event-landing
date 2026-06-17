import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function Venue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section ref={ref} className="relative bg-ink-900 py-32 md:py-44 lg:py-52 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">{t('venue.eyebrow')}</span>
          <h2 className="section-heading mb-16">{t('venue.titleLine1')}</h2>

          {/* Bento grid placeholder — images to be added */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`bg-ink-800 border border-ink-700/50 rounded-sm ${i === 1 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <MapPin size={16} className="text-accent shrink-0" />
            <div>
              <p className="font-sans text-base text-ink-100">{t('venue.address')}</p>
              <p className="font-sans text-sm text-ink-400 mt-1">{t('venue.addressSub')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
