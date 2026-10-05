import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, UserCheck, Martini, Utensils } from 'lucide-react';
import textData from '../../../locales/en.json';
import TickerMarquee from './TickerMarquee';

const ITEM_ICONS = [ShieldCheck, UserCheck, Martini, Utensils];

export default function ValueProps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  const items = textData.valueProps.items;

  return (
    <section ref={ref} className="relative bg-paper">
      <TickerMarquee />

      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {items.map((item, i) => {
            const isRightCol = i % 2 === 1;
            const isTopRow = i < 2;
            const Icon = ITEM_ICONS[i];

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
                  'group relative px-8 py-12 md:px-12 md:py-14 lg:px-16 lg:py-16',
                  'border-b border-paper-line',
                  isRightCol ? 'md:border-l md:border-paper-line' : '',
                  !isTopRow ? 'md:border-b-0' : '',
                ].join(' ')}
              >
                <div className="pointer-events-none absolute inset-0 bg-accent/8 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="mb-6">
                  {Icon && (
                    <Icon
                      className="size-14 text-accent"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="mb-3 flex flex-wrap items-center gap-2.5">
                  <h3 className="font-serif text-xl font-medium leading-snug text-paper-ink md:text-2xl">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="inline-flex shrink-0 rounded-full border border-accent/15 bg-accent/8 px-2.5 py-0.5 font-sans text-xs uppercase tracking-wider text-accent">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className="mb-4 block h-px w-6 bg-accent/40 transition-all duration-500 group-hover:w-10" />

                <p className="max-w-xs font-sans text-sm font-light leading-relaxed text-ink-400">
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
