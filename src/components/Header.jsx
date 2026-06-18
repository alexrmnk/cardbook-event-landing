import { motion } from 'framer-motion';
import textData from '../locales/en.json';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      className="relative z-10 flex items-center justify-center px-6 md:px-12 lg:px-20 pt-8 md:pt-10"
    >
      <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/60 font-medium text-center">
        {t('hero.eyebrow')}
      </p>
    </motion.header>
  );
}
