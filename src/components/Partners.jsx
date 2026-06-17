import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const PARTNER_LOGOS = [
  {
    name: 'Panthera',
    src: '/media/logos/panthera.png',
    imgClass: 'h-14 md:h-20',
  },
  {
    name: 'Connect',
    src: '/media/logos/connect.png',
  },
  {
    name: 'CardBook',
    src: '/media/logos/CardBook.png',
  },
  {
    name: 'Dealsflow',
    src: '/media/logos/dealsflow.png',
  },
];

const logoImgClass =
  'w-auto object-contain grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100';

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 place-items-center">
          {PARTNER_LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                draggable={false}
                className={`${logo.imgClass ?? 'h-16 md:h-24'} ${logoImgClass}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
