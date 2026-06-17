import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function ValueProps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  const items = textData.valueProps.items;

  return (
    <section ref={ref} className="relative bg-ink-950 border-t border-ink-800">
      {/* Subtle top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
      />

      <div className="max-w-screen-xl mx-auto">
        {/* 2×2 grid — hairline borders between cells */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {items.map((item, i) => {
            const isRightCol = i % 2 === 1;
            const isTopRow = i < 2;

            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1.0,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={[
                  'group relative px-8 md:px-12 lg:px-16 py-12 md:py-14 lg:py-16',
                  'border-b border-ink-800',
                  isRightCol ? 'md:border-l md:border-ink-800' : '',
                  !isTopRow ? 'md:border-b-0' : '',
                ].join(' ')}
              >
                {/* Hover fill */}
                <div className="absolute inset-0 bg-accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Index */}
                <span className="block font-mono text-[10px] tracking-widest3 text-accent/60 mb-6 uppercase">
                  {item.index}
                </span>

                {/* Title + optional badge */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <h3 className="font-serif text-xl md:text-2xl text-ink-100 font-medium leading-snug group-hover:text-white transition-colors duration-500">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="inline-flex shrink-0 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-xs tracking-wider uppercase text-zinc-400 font-sans">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Hairline rule */}
                <span className="block w-6 h-px bg-accent/30 mb-4 group-hover:w-10 transition-all duration-500" />

                {/* Description */}
                <p className="font-sans text-sm text-ink-400 leading-relaxed font-light max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
