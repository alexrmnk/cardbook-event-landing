import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import WaitlistModal from './WaitlistModal';

const EVENTS = [
  {
    tag: 'Upcoming · Open registration soon',
    title: 'Networking Club',
    meta: 'September 2026 · Tel Aviv',
    description:
      '200+ founders, investors and business leaders in one room, structured to help you meet the right people — not just more people. (Included in Membership)',
    cta: 'Join the Waitlist',
    image: encodeURI('/new/Networking Club.jpg'),
    imageAlt: 'Guests networking at a CardBook Networking Club evening',
  },
  {
    tag: 'Private · By invitation',
    title: 'Business morning meeting',
    meta: 'Tel Aviv · Limited seats',
    description:
      'For founders and business leaders who want direct access to the right conversations, not another networking crowd.',
    cta: 'Join the Waitlist',
    image: '/new/meeting.jpg',
    imageAlt: 'Founders and business leaders in conversation at a morning meeting',
  },
  {
    tag: 'Flagship event',
    title: 'CardBook Big Conference',
    meta: 'December 2026 · Tel Aviv',
    description:
      '1,000 people. One network. Infinite opportunities. The largest CardBook event of the year — where the next generation of founders, investors and dealmakers meet.',
    cta: 'Join the Waitlist',
    image: encodeURI('/new/Big Conference.jpg'),
    imageAlt: 'A full auditorium at the CardBook annual conference',
  },
];

export default function UpcomingEvents() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;

    setScrollProgress(progress * 100);
    setActiveIndex(
      Math.min(EVENTS.length, Math.max(1, Math.round(progress * (EVENTS.length - 1)) + 1)),
    );
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    syncScrollState();
    window.addEventListener('resize', syncScrollState);
    return () => window.removeEventListener('resize', syncScrollState);
  }, [syncScrollState]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.firstElementChild;
    const step = card ? card.clientWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <section id="upcoming" className="overflow-hidden py-12 md:py-24">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-accent-light">
            Upcoming Events
          </p>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance md:text-5xl">
            Secure your spot in the room.
          </h2>
        </div>

        <div className={`flex shrink-0 items-center gap-4 ${EVENTS.length <= 3 ? 'lg:hidden' : ''}`}>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous events"
            className="rounded-full border border-white/20 p-3 text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Next events"
            className="rounded-full border border-white/20 p-3 text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <ul
          ref={trackRef}
          onScroll={syncScrollState}
          className={`${
            EVENTS.length <= 3 ? 'lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible' : ''
          } hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8`}
        >
          {EVENTS.map((event) => (
            <li
              key={event.title}
              className={`${
                EVENTS.length <= 3 ? 'lg:w-full' : 'lg:w-[480px]'
              } group flex w-[85vw] shrink-0 flex-none snap-start flex-col md:w-[420px]`}
            >
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900">
              <img
                src={event.image}
                alt={event.imageAlt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"
              />
              <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                {event.tag}
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold leading-snug text-white">{event.title}</h3>
            <p className="mb-4 text-sm text-zinc-400">{event.meta}</p>
            <p className="mb-8 grow leading-relaxed text-zinc-400">{event.description}</p>

            <button
              type="button"
              onClick={() => {
                setSelectedEvent(event.title);
                setIsModalOpen(true);
              }}
              className="self-start rounded-xl bg-white px-6 py-3 text-sm font-medium text-violet-950 transition-colors duration-300 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
            >
              {event.cta}
            </button>
          </li>
        ))}
        </ul>
      </div>

      <div
        className={`mx-auto mt-12 flex max-w-7xl items-center gap-6 px-6 lg:mt-16 ${
          EVENTS.length <= 3 ? 'lg:hidden' : ''
        }`}
      >
        <div className="relative h-[2px] flex-grow overflow-hidden bg-white/10">
          <div
            className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div className="font-mono text-xs tracking-widest text-zinc-500 md:text-sm">
          <span className="text-white">0{activeIndex}</span> / 0{EVENTS.length}
        </div>
      </div>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventName={selectedEvent}
      />
    </section>
  );
}
