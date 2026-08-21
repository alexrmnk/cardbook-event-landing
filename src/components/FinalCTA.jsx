import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
      className="relative flex flex-col items-center overflow-hidden px-6 py-24 text-center md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-accent/[0.14]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[460px] bg-[radial-gradient(ellipse_55%_100%_at_50%_100%,rgba(127,83,229,0.26)_0%,transparent_70%)]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          {...revealUp()}
          className="mb-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white text-balance md:text-7xl"
        >
          Your next opportunity is one room away.
        </motion.h2>

        <motion.p
          {...revealUp(0.1)}
          className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-zinc-400"
        >
          Join an upcoming event and become part of the CardBook Networking Club.
        </motion.p>

        <motion.a
          {...revealUp(0.2)}
          href="#membership"
          className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-violet-950 shadow-2xl transition duration-300 hover:scale-105 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          Become a Member
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.a>
      </div>
    </section>
  );
}
