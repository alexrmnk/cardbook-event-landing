import { motion } from 'framer-motion';
import Logo from './Logo';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      className="relative z-10 flex items-center justify-center md:justify-between px-6 md:px-12 lg:px-20 pt-8 md:pt-10"
    >
      {/* Logo — centered on mobile, left on md+ */}
      <a href="/" aria-label={t('nav.brand')} className="flex-shrink-0">
        <Logo className="h-12 md:h-[3.375rem] w-auto" />
      </a>

      {/* Right-side tag — hidden on mobile */}
      <p className="hidden md:block font-mono text-[10px] tracking-widest2 uppercase text-ink-400">
        {t('hero.ctaNote')}
      </p>
    </motion.header>
  );
}
