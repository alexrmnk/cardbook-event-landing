import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Handshake,
  IdCard,
  Key,
  MonitorPlay,
  Newspaper,
  Percent,
  Ticket,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Ticket,
    title: '4 Networking Club Events',
    description: 'Full access, without buying tickets one by one.',
  },
  {
    icon: IdCard,
    title: 'Digital Membership Card',
    description: 'One QR code, and anyone you meet can save your profile instantly.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Member Status',
    description: 'Your profile marked as a trusted member across the network.',
  },
  {
    icon: MonitorPlay,
    title: 'Featured on Event Screens',
    description: 'Get seen by the room, not just by people you personally talk to.',
  },
  {
    icon: Handshake,
    title: 'Priority Access to Intros',
    description: 'First in line for relevant warm introductions.',
  },
  {
    icon: Percent,
    title: '20% Off Paid Meetings',
    description: 'Exclusive member discount on private networking and strategic sessions.',
  },
  {
    icon: Newspaper,
    title: '20% Off CardBook Magazine',
    description: 'Discount on publications, interviews, and media features.',
  },
  {
    icon: Key,
    title: '2 Intro Tokens',
    description: 'Use them for guaranteed, highly targeted personal introductions.',
  },
];

function BenefitCard({ icon: Icon, title, description, index, reduceMotion }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.1,
      }}
      className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors duration-300 hover:bg-white/10 md:gap-4 md:p-6"
    >
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-light md:size-12"
      >
        <Icon className="size-5 md:size-6" strokeWidth={1.5} />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-base font-semibold text-white md:text-lg">{title}</p>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </motion.li>
  );
}

// Stylised QR modules on a 9×9 grid — decorative only, corners hold the finder marks.
const QR_MODULES = [
  [3, 0], [5, 0], [4, 1], [3, 2], [4, 3], [0, 4], [1, 4], [3, 4], [4, 4], [6, 4],
  [8, 4], [4, 5], [5, 5], [7, 5], [2, 6], [4, 6], [6, 6], [8, 6], [5, 7], [7, 7],
  [3, 8], [4, 8], [6, 8], [8, 8],
];

const FINDER_POSITIONS = [
  [0, 0],
  [6, 0],
  [0, 6],
];

function QrPlaceholder() {
  return (
    <svg
      viewBox="0 0 9 9"
      aria-hidden="true"
      className="h-16 w-16 text-white"
      shapeRendering="crispEdges"
    >
      {FINDER_POSITIONS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x + 0.35}
            y={y + 0.35}
            width={2.3}
            height={2.3}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.55}
          />
          <rect x={x + 1.15} y={y + 1.15} width={0.7} height={0.7} fill="currentColor" />
        </g>
      ))}
      {QR_MODULES.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x + 0.1}
          y={y + 0.1}
          width={0.8}
          height={0.8}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function DigitalTicket() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center">
      {/* Radial glow behind the pass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[100px]"
      />

      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="group mx-auto w-full max-w-[340px] [perspective:1000px]"
      >
        <div className="relative rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform [transform-style:preserve-3d] group-hover:shadow-[20px_20px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1),-5px_-5px_20px_rgba(127,83,229,0.5)] group-hover:[transform:rotateX(5deg)_rotateY(-10deg)_scale(1.02)] group-active:[transform:rotateX(15deg)_rotateY(-5deg)_scale(0.98)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none]">
          {/* Sheen sweep on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-[linear-gradient(115deg,transparent_0%,transparent_40%,rgba(255,255,255,0.10)_45%,rgba(255,255,255,0.30)_50%,rgba(255,255,255,0.10)_55%,transparent_60%,transparent_100%)] bg-[length:250%_250%] bg-[position:100%_100%] mix-blend-overlay transition-[background-position] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-[position:0%_0%]"
          />

          {/* ── Ticket body ── */}
          <div className="relative overflow-hidden rounded-t-2xl bg-[radial-gradient(circle_at_bottom_left,transparent_13px,#17171E_13.5px),radial-gradient(circle_at_bottom_right,transparent_13px,#17171E_13.5px)] bg-[length:51%_100%] bg-[position:bottom_left,bottom_right] bg-no-repeat px-7 pb-9 pt-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 animate-grid-scroll bg-[linear-gradient(rgba(127,83,229,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(127,83,229,0.15)_1px,transparent_1px)] bg-[length:32px_32px] opacity-60 [transform:perspective(500px)_rotateX(20deg)_scale(1.5)] motion-reduce:animate-none"
            />

            <div className="relative z-[1]">
              <div className="flex items-start justify-between gap-3">
                <p className="flex items-center gap-2 text-[15px] font-black -tracking-[0.03em] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    className="size-5 animate-logo-pulse text-accent motion-reduce:animate-none"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  CARDBOOK
                </p>

                <span className="shrink-0 rounded-full border border-accent/70 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest2 text-accent-light">
                  VIP Pass
                </span>
              </div>

              <p className="mt-6 bg-gradient-to-br from-white to-[#A5B4FC] bg-clip-text text-[30px] font-black uppercase leading-[1.05] text-transparent">
                Networking
                <br />
                Club
              </p>
              <p className="mt-2 text-sm text-ink-300">Annual Membership · Tel Aviv</p>

              <div className="mt-7 flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.07] p-4">
                <div className="rounded-lg bg-white/10 p-2">
                  <QrPlaceholder />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-widest2 text-ink-300">
                    Member
                  </p>
                  <p className="mt-1 truncate text-base font-bold uppercase tracking-wide text-white">
                    Member
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-widest text-ink-300">
                    Scan to connect
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest2 text-ink-300">
                    Season
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">2026</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest2 text-ink-300">
                    Access
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">All Events</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stub ── */}
          <div className="relative rounded-b-2xl bg-[radial-gradient(circle_at_top_left,transparent_13px,#24242E_13.5px),radial-gradient(circle_at_top_right,transparent_13px,#24242E_13.5px)] bg-[length:51%_100%] bg-[position:top_left,top_right] bg-no-repeat px-7 pb-7 pt-8 transition-[transform,opacity] duration-200 group-active:translate-y-[5px] group-active:rotate-[2deg] group-active:opacity-80 motion-reduce:transition-none">
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 border-t-2 border-dashed border-white/20"
            />

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest2 text-ink-300">
                  Valid for
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide text-white">
                  4 Events
                </p>
              </div>
              <p className="text-4xl font-black leading-none text-accent-light [text-shadow:0_0_15px_rgba(127,83,229,0.5)]">
                04
              </p>
            </div>

            <div
              aria-hidden="true"
              className="mt-5 h-10 w-full bg-[repeating-linear-gradient(90deg,#fff_0,#fff_2px,transparent_2px,transparent_4px,#fff_4px,#fff_5px,transparent_5px,transparent_8px,#fff_8px,#fff_12px,transparent_12px,transparent_15px,#fff_15px,#fff_16px,transparent_16px,transparent_18px)] opacity-80"
            />
            <p className="mt-2 font-mono text-[10px] tracking-widest2 text-ink-300">
              CB-26-VIP-0042
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Membership() {
  const shouldReduceMotion = useReducedMotion();

  const revealUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="membership" className="mx-auto max-w-7xl px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ── Offer ── */}
        <motion.div {...revealUp()}>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest2 text-accent-light">
            Join the Networking Club
          </p>

          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white text-balance md:text-6xl">
            Access the right room. Meet the right people.
          </h2>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
            Your all-access pass to CardBook&rsquo;s four flagship events — plus everything
            that keeps you visible and connected between them.
          </p>

          <div
            id="membership-apply"
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-[#8B61F8] via-[#7541F6] to-[#5C2ED4] p-8 shadow-[0_0_40px_rgba(117,65,246,0.35)]"
          >
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <p className="text-5xl font-bold tracking-tight text-white md:text-6xl">₪400</p>
              <p className="pb-2 text-sm uppercase tracking-wide text-violet-100/80">
                One-time Membership · No subscription
              </p>
            </div>

            <a
              href="https://allpay.to/~cardbook/65280a3585"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 font-sans text-sm uppercase tracking-widest text-violet-950 shadow-xl transition-colors duration-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-700 sm:w-auto"
            >
              Become a Member
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>

        {/* ── Digital pass ── */}
        <motion.div {...revealUp(0.15)} className="relative">
          <DigitalTicket />
        </motion.div>
      </div>

      <ul className="mt-8 grid w-full grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:gap-6">
        {BENEFITS.map((benefit, index) => (
          <BenefitCard
            key={benefit.title}
            index={index}
            reduceMotion={shouldReduceMotion}
            {...benefit}
          />
        ))}
      </ul>

      <a
        href="https://allpay.to/~cardbook/65280a3585"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block w-full rounded-xl bg-white py-4 text-center text-sm font-bold uppercase tracking-wide text-violet-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform active:scale-95 motion-reduce:active:scale-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
      >
        Become a Member
      </a>
    </section>
  );
}
