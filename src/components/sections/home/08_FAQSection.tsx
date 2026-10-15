'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

import faqData from '@/data/home/faq.json';

/**
 * FAQ / Inquiries section.
 *
 * Matches the Luneo FAQ reference: small label on the left, a giant
 * "INQUIRIES" heading right-aligned on the right with the section tag
 * tucked into the top-right corner, then a stack of accordion items.
 *
 *   ┌─────────────────────────┬─────────────────────────────┐
 *   │  Frequently Asked //    │                       [ 08 ] │
 *   │                         │                             │
 *   │                         │            INQUIRIES        │
 *   └─────────────────────────┴─────────────────────────────┘
 *
 *   [ Question 1 ............................. (−) ]   ← open
 *   [    Answer text fades in below               ]
 *   [ Question 2 ............................. (+) ]
 *   [ ...                                           ]
 *   [ Question 8 ............................. (+) ]
 *             ← 60% width, horizontally centered
 *
 *              [    Book A Consultation    ]
 *
 * FAQ cards sit on `bg-amber-700` (the same brand red used for hover
 * states elsewhere) with cream text and an inverted cream/amber +/−
 * button. Only one item is open at a time; the first question is open
 * by default.
 *
 * All content lives in `src/data/faq.json`.
 */

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const {
  sectionNumber,
  label,
  heading,
  cta,
  faqs,
} = faqData as {
  sectionNumber: string;
  label: string;
  heading: string;
  cta: { label: string; href: string };
  faqs: Faq[];
};

/* ------------------------------ Pieces ------------------------------ */

/** Filled circle with a white "+" inside. */
function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
    >
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Filled circle with a white "−" inside. */
function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
    >
      <path
        d="M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * One accordion row. The button is the entire header strip (full
 * width, padded); the answer lives in a height-animated container
 * below it so the layout doesn't jump.
 *
 * Colors are inverted vs. the other sections: the card is brand amber
 * with cream accents, since the user requested the FAQ cards adopt the
 * hover-red palette.
 */
function FAQItem({
  faq,
  isOpen,
  onToggle,
  delay = 0,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="overflow-hidden rounded-2xl bg-amber-700"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors duration-300 hover:bg-amber-700/90 md:p-8"
      >
        <h3 className="font-serif text-xl font-medium leading-snug text-[#F2EDE4] md:text-2xl lg:text-[26px]">
          {faq.question}
        </h3>

        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2EDE4] text-amber-700 transition-transform duration-500 ease-out md:h-12 md:w-12"
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <p className="max-w-3xl text-lg font-normal leading-relaxed text-[#F2EDE4]/90 md:text-xl md:leading-[1.75]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Dark pill CTA — reused from the Services section pattern. */
function PrimaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center gap-4 rounded-full bg-black px-6 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <span
        aria-hidden
        className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45"
      />
    </Link>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function FAQSection() {
  // All items closed by default — the user expands what they want to read.
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
    >
      <div className="flex flex-col px-6 lg:px-10">
        {/* Header — INQUIRIES + [08] in one row, FREQUENTLY ASKED // in a
            separate div underneath, right-aligned to sit below [08]. */}
        <div>
          {/* One div — INQUIRIES (left) | [08] tag (right) */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
            >
              {heading}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
              aria-label={`Section ${sectionNumber}`}
            >
              <span>[</span>
              <span>{sectionNumber}</span>
              <span>]</span>
            </motion.div>
          </div>

          {/* Separate div — Frequently Asked // label, right-aligned */}
          <div className="mt-3 flex justify-end">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-black/70 md:text-sm"
            >
              {label}
            </motion.p>
          </div>
        </div>

        {/* FAQ accordion stack — single-open behavior.
            Constrained to 60% of the section width on desktop and
            centered horizontally so the cards read as a focused,
            reading-friendly column rather than hugging one edge. */}
        <div className="mt-16 md:mt-24 md:mx-auto md:w-[60%]">
          <div className="space-y-4 md:space-y-5">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === faq.id ? null : faq.id))
                }
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>

      
      </div>
    </section>
  );
}