import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import WaitlistModal from './WaitlistModal';
import { CURRENT_EVENT } from '../config/currentEvent';

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const SEASON = [
  { year: 2026, month: 11 },
  { year: 2026, month: 12 },
  { year: 2027, month: 1 },
  { year: 2027, month: 2 },
  { year: 2027, month: 3 },
  { year: 2027, month: 4 },
];

const EVENTS = [
  {
    id: 'networking-club',
    year: 2026,
    month: 11,
    day: 4,
    tag: 'Upcoming · Open registration soon',
    title: 'Networking Club',
    meta: '04.11.2026 · Tel Aviv',
    description:
      'Founders, investors and business leaders in one room, structured to help you meet the right people — not just more people. (Included in Membership)',
    cta: 'Join the Waitlist',
    image: encodeURI('/new/Networking Club-new.jpg'),
    imageAlt: 'Guests networking at a CardBook Networking Club evening',
  },
  {
    id: 'big-conference',
    year: 2027,
    month: 2,
    tag: 'Flagship event',
    title: 'CardBook Big Conference',
    meta: 'February 2027 · Tel Aviv',
    description:
      '1,000 people. One network. Infinite opportunities. The largest CardBook event of the year — where the next generation of founders, investors and dealmakers meet.',
    cta: 'Join the Waitlist',
    image: encodeURI('/new/Big Conference.jpg'),
    imageAlt: 'A full auditorium at the CardBook annual conference',
  },
  {
    id: 'business-morning',
    year: 2027,
    month: 3,
    tag: 'Private · By invitation',
    title: 'Business morning meeting',
    meta: 'March 2027 · Tel Aviv · Limited seats',
    description:
      'For founders and business leaders who want direct access to the right conversations, not another networking crowd.',
    cta: 'Join the Waitlist',
    image: '/new/meeting.jpg',
    imageAlt: 'Founders and business leaders in conversation at a morning meeting',
  },
];

const EVENTS_BY_MONTH = Object.fromEntries(
  EVENTS.map((event) => [`${event.year}-${event.month}`, event]),
);

function pad2(value) {
  return String(value).padStart(2, '0');
}

function isFeatured(event) {
  return (
    CURRENT_EVENT.isActive &&
    CURRENT_EVENT.ctaMode === 'register' &&
    event.id === CURRENT_EVENT.eventId
  );
}

function EventPreview({ event, onWaitlist }) {
  const featured = isFeatured(event);

  return (
    <div className="flex h-full flex-col">
      <div
        className={`relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900 ${
          featured ? 'ring-1 ring-accent/40' : ''
        }`}
      >
        <img
          src={event.image}
          alt={event.imageAlt}
          width={800}
          height={600}
          className="size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
          {featured ? CURRENT_EVENT.cardTag : event.tag}
        </span>
      </div>

      <h3 className="mb-2 text-2xl font-bold leading-snug text-white">{event.title}</h3>
      <p className="mb-4 text-sm text-zinc-400">{event.meta}</p>
      <p className="mb-8 grow leading-relaxed text-zinc-400">{event.description}</p>

      {featured ? (
        <Link
          to={CURRENT_EVENT.path}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-[#7541F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light md:w-auto md:self-start md:py-3"
        >
          {CURRENT_EVENT.cardCta}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onWaitlist}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-center text-sm font-medium text-violet-950 transition-colors duration-300 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light md:w-auto md:self-start md:py-3"
        >
          {event.cta}
        </button>
      )}
    </div>
  );
}

function MonthCell({ year, month, event, selected, onSelect }) {
  const label = `${MONTHS_SHORT[month - 1]} ${year}`;

  if (!event) {
    return (
      <div className="flex min-h-28 flex-col justify-between rounded-2xl border border-white/5 px-4 py-4 md:min-h-32 md:px-5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-zinc-500">{MONTHS_SHORT[month - 1]}</span>
          <span className="font-mono text-[10px] tracking-widest text-zinc-600">{year}</span>
        </div>
        <p className="text-sm text-zinc-600">No events</p>
      </div>
    );
  }

  const dateLine = event.day
    ? `${pad2(event.day)}.${pad2(event.month)}.${event.year}`
    : 'Date to be announced';

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${event.title}, ${label}${event.day ? `, ${dateLine}` : ', date to be announced'}`}
      onClick={() => onSelect(event.id)}
      className={`flex min-h-28 flex-col rounded-2xl border px-4 py-4 text-left transition-colors duration-200 md:min-h-32 md:px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${
        selected
          ? 'border-accent/40 bg-accent/10 ring-1 ring-accent/40'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className={`text-sm font-medium ${selected ? 'text-white' : 'text-zinc-300'}`}>
          {MONTHS_SHORT[month - 1]}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-zinc-500">{year}</span>
      </div>

      <div className="mt-3">
        {event.day ? (
          <span
            aria-hidden="true"
            className={`mb-2 inline-flex size-9 items-center justify-center rounded-full font-mono text-xs font-medium md:size-10 md:text-sm ${
              selected ? 'bg-accent text-white' : 'bg-white/10 text-white'
            }`}
          >
            {pad2(event.day)}
          </span>
        ) : null}
        <p className="line-clamp-2 text-sm font-medium leading-snug text-white">{event.title}</p>
        <p className="mt-1 text-xs text-zinc-400">{dateLine}</p>
      </div>
    </button>
  );
}

export default function UpcomingEvents() {
  const shouldReduceMotion = useReducedMotion();
  const [activeEventId, setActiveEventId] = useState(
    EVENTS.some((event) => event.id === CURRENT_EVENT.eventId)
      ? CURRENT_EVENT.eventId
      : EVENTS[0].id,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeEvent = EVENTS.find((event) => event.id === activeEventId) ?? EVENTS[0];

  return (
    <section id="upcoming" className="py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-10 md:mb-12">
          <p className="font-mono text-xs uppercase tracking-widest2 text-accent-light">
            Upcoming Events
          </p>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance md:text-5xl">
            Secure your spot in the room.
          </h2>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 lg:self-start md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="text-lg font-semibold text-white md:text-xl">Upcoming Events</h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Nov 2026 – Apr 2027
              </p>
            </div>

            <div
              role="group"
              aria-label="Events by month"
              className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
            >
              {SEASON.map(({ year, month }) => {
                const event = EVENTS_BY_MONTH[`${year}-${month}`];

                return (
                  <MonthCell
                    key={`${year}-${month}`}
                    year={year}
                    month={month}
                    event={event}
                    selected={event?.id === activeEventId}
                    onSelect={setActiveEventId}
                  />
                );
              })}
            </div>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
              >
                <EventPreview
                  event={activeEvent}
                  onWaitlist={() => setIsModalOpen(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={activeEvent}
      />
    </section>
  );
}
