import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

const WAYS = [
  {
    label: 'MatchBook',
    title: 'Meet the right person.',
    description:
      'Get a personal introduction to someone relevant to your goals — or discover new connections through regular 1:1 networking.',
    linkLabel: 'Explore MatchBook',
    href: '#matchbook',
  },
  {
    label: 'CardBook Magazine',
    title: 'Get seen by the right people.',
    description:
      'Share your story, expertise or business with the CardBook community through interviews, articles and social distribution.',
    linkLabel: 'Get Featured',
    href: '#magazine',
  },
  {
    label: 'Networking Strategy',
    title: 'Turn your network into a strategy.',
    description:
      'A personal session to identify who you need to know, where to find them and how to turn relationships into business opportunities.',
    linkLabel: 'Book a Session',
    href: '#strategy',
  },
  {
    label: 'For Business',
    title: 'Turn networking into business growth.',
    description:
      'Corporate networking, business introductions, event sponsorship and tailored networking solutions for companies.',
    linkLabel: 'Explore Business',
    href: '#business',
  },
];

export default function MoreWaysToConnect() {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section
      id="more-ways"
      aria-labelledby={`${baseId}-heading`}
      className="mx-auto max-w-7xl px-6 py-24 text-left md:py-32"
    >
      <h2
        id={`${baseId}-heading`}
        className="mb-4 font-mono text-xs uppercase tracking-widest2 text-accent-light"
      >
        More Ways to Connect
      </h2>

      <p className="mb-16 max-w-3xl text-2xl font-medium leading-snug text-zinc-300 text-balance lg:mb-24 md:text-3xl">
        Your networking journey doesn&rsquo;t end at the event. CardBook gives you different ways
        to build relationships, increase your visibility and turn your network into opportunities.
      </p>

      <ul className="border-t border-white/10">
        {WAYS.map((way, index) => {
          const isOpen = openIndex === index;
          const triggerId = `${baseId}-trigger-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <li key={way.label} className="border-b border-white/10">
              <h3>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-start justify-between gap-6 rounded-sm py-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light md:py-12"
                >
                  <span className="min-w-0 grow text-4xl font-bold leading-none tracking-tighter text-white transition-colors duration-300 group-hover:text-violet-400 md:text-6xl lg:text-7xl">
                    <span className="block uppercase">{way.label}</span>
                    <span className="mt-2 block">{way.title}</span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border text-white transition-[transform,border-color] duration-300 ease-out motion-reduce:transition-none md:mt-3 md:size-12 ${
                      isOpen
                        ? 'rotate-45 border-white/40'
                        : 'border-white/15 group-hover:border-white/40'
                    }`}
                  >
                    <Plus className="size-5 md:size-6" strokeWidth={1.5} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 md:pb-14">
                      <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
                        {way.description}
                      </p>

                      <a
                        href={way.href}
                        className="group/link mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-white transition-colors duration-300 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
                      >
                        {way.linkLabel}
                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                          className="shrink-0 transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
