import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const packages = [
  {
    id: 'visibility-1',
    name: 'Visibility Partner',
    waName: 'Visibility Partner',
    target:
      'Perfect for individuals and startups looking to increase visibility within a curated audience of founders, investors, and executives.',
    perks: [
      'Logo on the event website',
      'Logo on event screens',
      '5 warm intros of members on our network',
    ],
    images: [
      '/media/sponsor/1stpac_1.png',
      '/media/sponsor/1stpac_2.png',
      '/media/sponsor/1stpac_3.png',
    ],
  },
  {
    id: 'visibility-2',
    name: 'Visibility Partner (Premium)',
    waName: 'Visibility Partner Premium',
    target:
      'Perfect for individuals and startups looking to increase visibility within a curated audience of founders, investors, executives, and business leaders.',
    perks: [
      'Logo on the event website',
      'Logo on event screens',
      'Company profile on the event page',
      'Recognition as an official event partner',
      'Social media mention before the event',
      '10 warm intros of members on our network.',
    ],
    images: [
      '/media/sponsor/2stpac_1.png',
      '/media/sponsor/2stpac_2.png',
      '/media/sponsor/2stpac_3.png',
    ],
  },
  {
    id: 'business',
    name: 'Business Opportunity Partner',
    waName: 'Business Opportunity Partner',
    target:
      'Designed for businesses and companies looking to engage directly with attendees and create meaningful business conversations.',
    perks: [
      'All Visibility Partner benefits',
      'Dedicated Executive Connection Room',
      'Opportunity showcased on the Opportunity Wall',
      'Featured company profile in Connect',
      'Featured on the networking magazine and resending to all members',
      'Priority visibility throughout the event',
      '25 warm intros of all previous event members',
    ],
    images: [
      '/media/sponsor/3stpac_1.png',
      '/media/sponsor/3stpac_2.png',
      '/media/sponsor/3stpac_3.png',
    ],
  },
  {
    id: 'strategic',
    name: 'Strategic Ecosystem Partner',
    waName: 'Strategic Ecosystem Partner',
    target:
      'For organizations seeking maximum visibility, access, and engagement within the CardBook Ecosystem.',
    perks: [
      'All Business Opportunity Partner benefits',
      'Featured placement across the CardBook Ecosystem',
      'Article or company spotlight in the Networking Magazine',
      'Featured newsletter exposure to all our event past members (1000+ C-level)',
      '50 Connect Tokens for AI-powered introductions',
      'Priority access to ecosystem networking opportunities',
      'Premium branding before, during, and after the event',
    ],
    images: ['/media/sponsor/Strategic Ecosystem Partner.png'],
    mobileImage: '/media/sponsor/Strategic Ecosystem Partner_mob.png',
  },
];

const IMAGE_W = 240;
const IMAGE_ROW_MAX_W = IMAGE_W * 3 + 12 * 2;
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function CustomCheckIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3344 2.75018H7.66537C4.64437 2.75018 2.75037 4.88918 2.75037 7.91618V16.0842C2.75037 19.1112 4.63537 21.2502 7.66537 21.2502H16.3334C19.3644 21.2502 21.2504 19.1112 21.2504 16.0842V7.91618C21.2504 4.88918 19.3644 2.75018 16.3344 2.75018Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.43982 12.0002L10.8138 14.3732L15.5598 9.6272"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageMedia({ images, packageName, mobileImage }) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isMobile || images.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images, isMobile]);

  if (images.length === 1) {
    const src = isMobile && mobileImage ? mobileImage : images[0];

    return (
      <img
        src={src}
        alt={packageName}
        style={{ maxWidth: isMobile ? undefined : IMAGE_ROW_MAX_W }}
        className="w-full h-auto object-contain"
      />
    );
  }

  if (images.length === 3) {
    if (isMobile) {
      return (
        <div className="w-full">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '560 / 522' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[activeIndex]}
                src={images[activeIndex]}
                alt="Package visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row items-start gap-3 flex-shrink-0 justify-start">
        {images.map((src) => (
          <img
            key={src}
            src={src}
            alt="Package visual"
            style={{ width: IMAGE_W, flexShrink: 0 }}
            className="h-auto object-contain hover:scale-[1.03] transition-transform duration-500"
          />
        ))}
      </div>
    );
  }

  return null;
}

function PackageCard({ pkg, index }) {
  const isMobile = useIsMobile();
  const waText = encodeURIComponent(
    `Hi, I am interested in the ${pkg.waName ?? pkg.name} package.`
  );
  const waHref = `https://wa.me/972509025013?text=${waText}`;

  return (
    <motion.div
      {...fadeUp(0.05 * index)}
      className="bg-white/[0.02] py-16 md:py-24 px-8 md:px-16 lg:px-24"
    >
      <div className="flex flex-col gap-12 lg:gap-14 pl-4 md:pl-8 lg:pl-12">
        <div className="flex flex-col max-w-xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/30 mb-4">
            0{index + 1}
          </p>

          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            {pkg.name}
          </h3>

          <p className="font-sans text-base text-zinc-400 leading-relaxed mb-10">
            {pkg.target}
          </p>

          <ul className="space-y-3 mb-10">
            {pkg.perks.map((perk) => (
              <li key={`${pkg.id}-${perk}`} className="flex items-start gap-3">
                <CustomCheckIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {perk}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary group justify-center ${isMobile ? 'w-full' : 'self-start'}`}
          >
            <span className="tracking-widest uppercase text-xs leading-snug md:hidden">
              Apply
            </span>
            <span className="hidden md:inline tracking-widest uppercase text-xs leading-snug">
              Apply as {pkg.waName ?? pkg.name}
            </span>
            <MessageCircle
              size={14}
              className="shrink-0 transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </a>
        </div>

        <PackageMedia
          images={pkg.images}
          packageName={pkg.name}
          mobileImage={pkg.mobileImage}
        />
      </div>
    </motion.div>
  );
}

export default function SponsorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#09090b] min-h-screen text-white overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 pt-6 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors duration-300"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          Back
        </Link>
        <Link to="/" aria-label="CardBook home">
          <Logo className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="w-16" aria-hidden="true" />
      </nav>

      {/* ── Hero & Intro ── */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]"
        />

        <div className="relative">
          <motion.p
            {...fadeUp(0)}
            className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-500 mb-6"
          >
            Strategic Partnerships
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif text-5xl md:text-6xl lg:text-8xl leading-[1.05] text-white mb-10 max-w-4xl text-balance"
          >
            Transform Relationships into Capital.
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="max-w-2xl">
            <div className="w-12 h-px bg-violet-500/40 mb-8" />
            <p className="font-sans text-lg md:text-xl text-zinc-400 leading-relaxed">
              As a sponsor, you gain far more than visibility. You gain access to
              highly curated communities, new audiences of decision-makers, and
              opportunities to build relationships with people who can become
              clients, partners, investors, or strategic allies. Because the most
              valuable business opportunities rarely come from advertising — they
              come from trusted relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Packages ── */}
      <section className="px-6 max-w-7xl mx-auto py-16">
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">
            Partnership Tiers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            Choose Your Level of Access.
          </h2>
        </motion.div>

        <div className="rounded-3xl border border-white/5 overflow-hidden">
          {packages.map((pkg, index) => (
            <div key={pkg.id}>
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="mx-8 md:mx-16 lg:mx-24 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"
                />
              )}
              <PackageCard pkg={pkg} index={index} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
