import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import textData from '../../../locales/en.json';
import TearTicket from '../../../components/TearTicket';

const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], textData);

const TICKET_IMAGE = '/new/Networking%20Club-new.jpg';
const INCLUDES = t('admission.includes');

export default function Admission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section ref={ref} className="relative border-t border-ink-800 bg-ink-950">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32 xl:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="section-heading"
        >
          {t('admission.title')}
        </motion.h2>

        <div className="mt-10 grid items-center gap-14 md:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-5xl font-semibold tracking-tight text-ink-100 md:text-6xl">
            {t('admission.price')}
          </p>
          <p className="mt-3 font-mono text-lg uppercase tracking-widest text-accent/80 md:text-xl">
            {t('admission.priceLabel')}
          </p>

          <div className="mt-8 max-w-md">
            <ul className="grid grid-cols-1 gap-y-2.5">
              {INCLUDES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-sans text-sm text-ink-200 md:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-accent-light"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-ink-200 md:text-lg">
            {t('admission.memberNote')}
          </p>

          <div className="mt-10 flex flex-col items-start gap-5">
            <a href={t('hero.ctaHref')} className="btn-primary group w-full justify-center md:w-auto">
              <span className="text-xs uppercase tracking-widest">{t('hero.cta')}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
            <Link
              to="/#membership"
              className="font-mono text-lg uppercase tracking-widest text-ink-200 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light md:text-xl"
            >
              {t('admission.membershipLink')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-[640px] justify-center justify-self-center lg:w-[640px] lg:justify-end"
        >
          <TearTicket
            className="admission-ticket"
            width={640}
            height={348}
            stubSize={196}
            holes={14}
            holeSize={7}
            parallax={8}
            image={TICKET_IMAGE}
            imageAlt={t('admission.imageAlt')}
            background="#17171E"
            color="#F4F4F8"
            ariaLabel={t('admission.stubAria')}
            stub={
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <p className="font-mono text-[11px] uppercase tracking-widest2">{t('admission.stubAdmit')}</p>
                <p className="mt-4 font-sans text-4xl font-semibold leading-none">{t('admission.price')}</p>
                <p className="mt-2.5 font-sans text-sm tracking-wide text-white/75">{t('admission.stubMembers')}</p>
                <p className="mt-6 font-mono text-[11px] tracking-widest2 text-white/55">{t('admission.stubNumber')}</p>
              </div>
            }
          >
            <div className="flex h-full flex-col justify-end px-6 pb-6">
              <p className="font-serif text-3xl leading-tight">{t('admission.ticketTitle')}</p>
              <p className="mt-2.5 font-sans text-base text-white/80">{t('admission.ticketWhen')}</p>
              <p className="font-sans text-base text-white/80">{t('admission.ticketWhere')}</p>
            </div>
          </TearTicket>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
