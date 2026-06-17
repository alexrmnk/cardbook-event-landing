import { motion } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const REPEAT_COUNT = 12;

function buildSegment() {
  const divider = t('ticker.divider');
  return `${t('hero.date')}  ${divider}  ${t('hero.time')}  ${divider}  ${t('hero.locationCity')}  ${divider}  `;
}

function TickerTrack({ segment }) {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: REPEAT_COUNT }, (_, index) => (
        <span
          key={index}
          className="whitespace-nowrap px-1 font-sans text-xs md:text-sm font-semibold tracking-widest uppercase text-white/90"
        >
          {segment}
        </span>
      ))}
    </div>
  );
}

export default function TickerMarquee() {
  const segment = buildSegment();

  return (
    <div
      className="relative w-full max-w-full overflow-hidden bg-[#7541F6] py-1 md:py-1.5"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max will-change-transform"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 45 }}
      >
        <TickerTrack segment={segment} />
        <TickerTrack segment={segment} />
      </motion.div>
    </div>
  );
}
