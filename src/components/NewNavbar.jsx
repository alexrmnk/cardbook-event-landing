import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Membership', href: '#membership' },
  { label: 'Upcoming Events', href: '#upcoming' },
  { label: 'For Sponsors', to: '/archive/v1/sponsors' },
  { label: 'More Ways to Connect', href: '#more-ways' },
];

export default function NewNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const isSolid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isSolid
          ? 'border-white/10 bg-ink-950/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-12"
      >
        <Link
          to="/"
          aria-label="CardBook home"
          className="shrink-0 rounded-sm opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
        >
          <Logo className="h-9 w-auto md:h-10" />
        </Link>

        {/* ── Desktop menu ── */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((link) => {
            const className = 'nav-link group px-0.5 py-2';
            const label = (
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent-light after:transition-all after:duration-300 group-hover:after:w-full">
                {link.label}
              </span>
            );

            return (
              <li key={link.label}>
                {link.to ? (
                  <Link to={link.to} className={className}>
                    {label}
                  </Link>
                ) : (
                  <a href={link.href} className={className}>
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Mobile toggle ── */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-100 transition-colors duration-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light lg:hidden"
        >
          {isMenuOpen ? (
            <X className="size-5" strokeWidth={1.5} />
          ) : (
            <Menu className="size-5" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {/* ── Mobile menu panel ── */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-6 py-2 md:px-10">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="border-b border-white/5 last:border-b-0">
                  {link.to ? (
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="nav-link min-h-11 w-full py-4"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="nav-link min-h-11 w-full py-4"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
