import { motion, useReducedMotion } from 'framer-motion';
import CircularGallery from './CircularGallery';

const STATS = [
  { value: '14,000+', label: 'entrepreneurs, investors & leaders connected in Israel' },
  { value: '150,000+', label: 'professionals in our global CardBook network' },
  { value: '3,000+', label: 'meaningful introductions made' },
  { value: '1,000+', label: 'partnerships started' },
];

const GALLERY_ITEMS = [
  { image: '/new/1e.webp', text: 'Founders' },
  { image: '/new/2e.webp', text: 'CEOs' },
  { image: '/new/3e.webp', text: 'Investors' },
  { image: '/new/4e.webp', text: 'Industry Leaders' },
  { image: '/new/5e.webp', text: 'Honorary Consuls' },
  { image: '/new/6e.webp', text: 'C-Level Executives' },
  { image: '/new/7e.webp', text: 'Managing Partners' },
  { image: '/new/8e.webp', text: 'Ambassadors' },
];

export default function PastEvents() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="past-events" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs uppercase tracking-widest2 text-accent-light">
          Past Events
        </p>

        <h2 className="mb-16 mt-6 max-w-3xl font-sans text-3xl font-bold leading-[1.15] tracking-tight text-white text-balance md:text-5xl">
          Every CardBook event is built to create outcomes — not just conversations.
        </h2>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12 lg:grid-cols-4 lg:gap-10">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-zinc-400 lg:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 h-[380px] w-full overflow-hidden px-0 sm:h-[460px] md:h-[560px]">
        <CircularGallery items={GALLERY_ITEMS} />
      </div>

      <p className="mx-auto mt-16 max-w-2xl px-6 text-center text-lg font-medium leading-relaxed text-zinc-300 md:text-xl">
        From Tel Aviv to the global CardBook network — this is what happens when the right
        people are in the room.
      </p>
    </section>
  );
}
