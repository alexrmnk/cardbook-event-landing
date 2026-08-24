import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Loader2, X } from 'lucide-react';
import MoltenMetal from './MoltenMetal';

const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzPPs36QSx5kofnB46WBQVIwq2qrXb9dYg6StJFU4rrfB1SasKnwDRKrOGgp0FhfDznJA/exec';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  goals: '',
  linkedin: '',
};

const FIELD_CLASS =
  'w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors duration-200 focus:border-violet-500';

const LABEL_CLASS = 'mb-1 block text-xs uppercase tracking-widest text-zinc-400';

export default function WaitlistModal({ isOpen, onClose, eventName }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setForm(INITIAL_FORM);
      setIsSubmitting(false);
      setIsSuccess(false);
      setNameError('');
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === 'name' && nameError) setNameError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.name.trim().includes(' ')) {
      setNameError('Please enter your full name (first and last name).');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          goals: form.goals,
          linkedin: form.linkedin,
        }),
      });

      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-0 backdrop-blur-md md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-modal-title"
        >
          <motion.div
            className="relative z-50 flex h-full w-full flex-col overflow-hidden bg-zinc-900 md:h-auto md:max-h-[90vh] md:min-h-[640px] md:max-w-5xl md:flex-row md:rounded-3xl md:border md:border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative hidden overflow-hidden p-12 md:flex md:w-1/2 md:flex-col md:justify-center">
              <div id="molten-metal-bg" className="absolute inset-0 bg-zinc-800">
                {isDesktop ? <MoltenMetal className="h-full w-full" /> : null}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
              />
              <div className="pointer-events-none relative z-10">
                {eventName ? (
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-light">
                    {eventName}
                  </p>
                ) : null}
                <h2 className="text-4xl font-bold tracking-tight text-white">
                  Join CardBook Networking Club
                </h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Tell us a bit about yourself — takes less than a minute!
                </p>
              </div>
            </div>

            <div className="relative h-full w-full overflow-y-auto bg-zinc-900/95 p-6 backdrop-blur-xl md:w-1/2 md:p-12">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close waitlist form"
                className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-lg text-zinc-400 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>

              {isSuccess ? (
                <div className="flex min-h-full flex-col items-center justify-center py-16 text-center">
                  <CheckCircle
                    className="mb-6 size-12 text-violet-500"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h2
                    id="waitlist-modal-title"
                    className="mb-2 text-3xl font-bold text-white"
                  >
                    Request Received.
                  </h2>
                  <p className="mx-auto mb-8 max-w-sm text-center leading-relaxed text-zinc-400">
                    Thank you for your interest. We have safely received your details and
                    will be in touch shortly, or closer to the event date, with your
                    invitation.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <header className="mb-8 pr-10 md:hidden">
                    {eventName ? (
                      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-light">
                        {eventName}
                      </p>
                    ) : null}
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      Join CardBook Networking Club
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      Tell us a bit about yourself — takes less than a minute!
                    </p>
                  </header>

                  <h2 id="waitlist-modal-title" className="sr-only">
                    Join CardBook Networking Club
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="waitlist-name" className={LABEL_CLASS}>
                          Full Name
                        </label>
                        <input
                          id="waitlist-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jane Cohen"
                          value={form.name}
                          onChange={handleChange}
                          aria-invalid={nameError ? 'true' : 'false'}
                          aria-describedby={nameError ? 'waitlist-name-error' : undefined}
                          className={FIELD_CLASS}
                        />
                        {nameError ? (
                          <p
                            id="waitlist-name-error"
                            className="mt-2 text-sm text-red-400"
                          >
                            {nameError}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="waitlist-company" className={LABEL_CLASS}>
                          Company / Role
                        </label>
                        <input
                          id="waitlist-company"
                          name="company"
                          type="text"
                          required
                          autoComplete="organization"
                          placeholder="COO at CardBook"
                          value={form.company}
                          onChange={handleChange}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div>
                        <label htmlFor="waitlist-email" className={LABEL_CLASS}>
                          Email
                        </label>
                        <input
                          id="waitlist-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div>
                        <label htmlFor="waitlist-phone" className={LABEL_CLASS}>
                          Phone
                        </label>
                        <input
                          id="waitlist-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="+972 50 000 0000"
                          value={form.phone}
                          onChange={handleChange}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <label htmlFor="waitlist-goals" className={LABEL_CLASS}>
                          What are you looking for from the club?
                        </label>
                        <textarea
                          id="waitlist-goals"
                          name="goals"
                          rows={4}
                          required
                          placeholder="e.g. investors, potential clients, partners, new connections..."
                          value={form.goals}
                          onChange={handleChange}
                          className={`${FIELD_CLASS} resize-y`}
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <label htmlFor="waitlist-linkedin" className={LABEL_CLASS}>
                          LinkedIn or other social networks
                        </label>
                        <input
                          id="waitlist-linkedin"
                          name="linkedin"
                          type="text"
                          autoComplete="url"
                          placeholder="https://linkedin.com/in/..."
                          value={form.linkedin}
                          onChange={handleChange}
                          className={FIELD_CLASS}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:pointer-events-none disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                          Sending...
                        </>
                      ) : (
                        'Submit Request →'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
