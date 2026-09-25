import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import textData from '../../../locales/en.json';
import Logo from '../../../components/Logo';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      className="relative z-10 flex items-center px-6 pt-8 md:px-12 md:pt-10 lg:px-20"
    >
      <Link
        to="/"
        aria-label="CardBook home"
        className="relative z-10 shrink-0 rounded-sm opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
      >
        <Logo className="h-8 w-auto md:h-9" />
      </Link>
      <p className="pointer-events-none absolute inset-x-0 top-8 flex h-8 items-center justify-center px-28 text-center text-xs font-medium uppercase tracking-[0.14em] text-white/60 sm:tracking-[0.25em] md:top-10 md:h-9 md:px-40 md:text-sm">
        {t('hero.eyebrow')}
      </p>
    </motion.header>
  );
}
