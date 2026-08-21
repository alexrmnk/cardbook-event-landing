import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import NewNavbar from '../components/NewNavbar';
import PastEvents from '../components/PastEvents';
import Membership from '../components/Membership';
import UpcomingEvents from '../components/UpcomingEvents';
import MoreWaysToConnect from '../components/MoreWaysToConnect';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import SponsorLogos from '../archive/v1-networking-club/components/SponsorLogos';

const HERO_VIDEO_SRC = 'https://assets.cardbookecosystem.com/video_back.mp4';

export default function NewHome() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <NewNavbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink-950">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>

          {/* Legibility overlays */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/60 to-ink-950/95"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-radial-accent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-ink-950 to-transparent"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-20 pt-32 text-center md:pb-24 md:pt-36">
            <motion.p
              {...fadeUp(0)}
              className="font-sans text-xs uppercase tracking-widest2 text-accent-light"
            >
              CardBook Networking Club Events
            </motion.p>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">Every connection starts somewhere.</span>
              <span className="block">This is where yours begins.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg"
            >
              A premium networking experience for founders, investors and business leaders,
              where one conversation can become your next opportunity.
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-12 flex w-full flex-col items-center gap-5 sm:w-auto sm:flex-row sm:gap-8"
            >
              <a
                href="#membership"
                className="btn-primary group w-full justify-center sm:w-auto"
              >
                Become a Member
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#upcoming"
                className="group inline-flex min-h-11 items-center gap-2 rounded-sm px-1 text-sm text-zinc-300 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              >
                <span className="underline-offset-4 group-hover:underline">
                  See upcoming events
                </span>
                <ArrowDown
                  size={14}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Partner ticker ── */}
        <SponsorLogos />

        {/* ── Past events ── */}
        <PastEvents />

        {/* ── Membership ── */}
        <Membership />

        {/* ── Upcoming events ── */}
        <UpcomingEvents />

        {/* ── More ways to connect ── */}
        <MoreWaysToConnect />

        {/* ── Closing CTA ── */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
