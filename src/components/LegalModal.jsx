import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({
  isOpen,
  onClose,
  title,
  lastUpdated,
  sections,
  closeLabel,
}) {
  useEffect(() => {
    if (!isOpen) return;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[101] font-mono text-[10px] tracking-widest2 uppercase text-zinc-400 hover:text-white transition-colors duration-300"
          >
            {closeLabel}
          </button>

          <motion.div
            className="max-w-2xl mx-auto py-20 px-6 h-full overflow-y-auto w-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="mb-12 md:mb-16 pt-8">
              <h2
                id="legal-modal-title"
                className="font-serif text-3xl md:text-4xl font-medium text-ink-100 tracking-tight mb-4"
              >
                {title}
              </h2>
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-zinc-500">
                {lastUpdated}
              </p>
            </header>

            <div className="flex flex-col gap-10 md:gap-12 pb-12">
              {sections.map((section) => (
                <section key={section.title}>
                  <h3 className="font-serif text-xl md:text-2xl text-ink-100 font-medium mb-4">
                    {section.title}
                  </h3>
                  <p className="font-sans text-base text-ink-300 leading-relaxed font-light">
                    {section.text}
                  </p>
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
