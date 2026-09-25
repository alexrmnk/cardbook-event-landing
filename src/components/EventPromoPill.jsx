import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CURRENT_EVENT } from '../config/currentEvent';

export function EventPulse({ reduceMotion = false }) {
  return (
    <span className="relative flex size-2 shrink-0" aria-hidden="true">
      {!reduceMotion && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent motion-reduce:hidden" />
      )}
      <span className="relative inline-flex size-2 rounded-full bg-accent" />
    </span>
  );
}

export default function EventPromoPill({ reduceMotion = false }) {
  if (!CURRENT_EVENT.isActive) return null;

  return (
    <Link
      to={CURRENT_EVENT.path}
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accent/60 bg-black/65 px-5 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
    >
      <EventPulse reduceMotion={reduceMotion} />
      <span className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]">
        {CURRENT_EVENT.promoLabel}
      </span>
      <ArrowRight
        size={14}
        strokeWidth={1.5}
        className="shrink-0 text-accent-light transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
