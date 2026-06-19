import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const PAST_EVENT_IMAGES = Array.from(
  { length: 11 },
  (_, i) => `/media/past-events/${i + 1}.jpg`,
);
const CAROUSEL_IMAGES = [...PAST_EVENT_IMAGES, ...PAST_EVENT_IMAGES];

export default function PastEvents() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimationControls();
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const shouldPlay = isInView && !isHovered && !isDragging;

  useEffect(() => {
    if (shouldPlay) {
      controls.start({
        x: '-50%',
        transition: {
          duration: 40,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [shouldPlay, controls]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-950 border-t border-ink-800 py-20 md:py-28 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <p className="text-white/50 tracking-widest uppercase text-sm mb-4">
              {t('pastEvents.eyebrow')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              {t('pastEvents.title')}
            </h2>
          </div>

          <a href={t('hero.ctaHref')} className="btn-primary group shrink-0">
            <span className="tracking-widest uppercase text-xs">{t('hero.cta')}</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>

      {/* Infinite draggable carousel */}
      <div className="w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex w-max gap-4 md:gap-5 cursor-grab active:cursor-grabbing will-change-transform"
          animate={controls}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ touchAction: 'pan-y' }}
        >
          {CAROUSEL_IMAGES.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={`${t('pastEvents.title')} ${(i % PAST_EVENT_IMAGES.length) + 1}`}
              draggable={false}
              className="h-[280px] md:h-[360px] lg:h-[400px] w-auto shrink-0 rounded-xl border border-white/10 select-none"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
