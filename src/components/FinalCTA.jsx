import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const FOUNDERS = [
  {
    href: 'https://www.linkedin.com/in/elli-glaybman-0b6a8a127/',
    src: '/media/elli.jpg',
    alt: 'Elli Glaybman',
    name: 'Elli Glaybman',
    title: 'Co-Founder & CEO',
  },
  {
    href: 'https://www.linkedin.com/in/alex-lyhovez-mba/',
    src: '/media/alex.jpg',
    alt: 'Alex Lyhovez',
    name: 'Alex Lyhovez',
    title: 'Co-Founder & Head of Business Growth',
  },
  {
    href: 'https://www.linkedin.com/in/alena-morozova-625969238/',
    src: '/media/alona.jpg',
    alt: 'Alena Morozov',
    name: 'Alena Morozov',
    title: 'Co-Founder, Technical Product & Marketing',
  },
];

const CONTACT_HREF = 'https://wa.me/972509025013';

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const revealUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="join"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-accent/[0.14]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[460px] bg-[radial-gradient(ellipse_55%_100%_at_50%_100%,rgba(127,83,229,0.26)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...revealUp()}>
            <p className="font-mono text-xs uppercase tracking-widest2 text-accent-light">
              The Founders
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance md:text-6xl">
              Your next opportunity is one room away.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
              Talk to the team behind CardBook Networking Club — or walk into the next
              event already connected.
            </p>
            <a
              href={CONTACT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex min-h-11 items-center gap-2 rounded-lg border border-accent px-6 py-3 font-mono text-[10px] uppercase tracking-widest2 text-accent transition-colors duration-300 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Contact us
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.ul
            {...revealUp(0.12)}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4"
          >
            {FOUNDERS.map((founder) => (
              <li
                key={founder.href}
                className="flex flex-row items-center gap-4 text-left sm:flex-col sm:items-center sm:text-center"
              >
                <img
                  src={founder.src}
                  alt={founder.alt}
                  width={1518}
                  height={1518}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-16 shrink-0 rounded-full object-cover ring-2 ring-white/10 md:size-20"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white md:text-base">
                    {founder.name}
                  </p>
                  <p className="mt-1 max-w-[180px] text-[10px] uppercase leading-snug tracking-wider text-zinc-400 sm:mx-auto">
                    {founder.title}
                  </p>
                  <a
                    href={founder.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[10px] uppercase tracking-widest text-zinc-500 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
