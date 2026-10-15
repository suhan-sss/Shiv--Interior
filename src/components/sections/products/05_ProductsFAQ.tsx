'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import faqData from '@/data/products/faq.json';

/**
 * ProductsFAQ — accordion FAQ for `/products`.
 *
 * Matches the contact page's FAQ styling exactly: each question lives
 * on its own sand card (#E8DCC4), the question text uses the same
 * serif treatment as the contact FAQ, and the toggle is a black
 * circle with a cream plus/minus SVG (matching contact).
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Do you work on residential or commercial…     [ − ]     │   <- open
 *   │  We work across residential and select commercial         │
 *   │  interiors, creating spaces that feel personal…          │
 *   └──────────────────────────────────────────────────────────┘
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  What types of projects do you take on?         [ + ]    │   <- closed
 *   └──────────────────────────────────────────────────────────┘
 *   …
 *
 * Background is the page cream (#F2EDE4) with sand (#E8DCC4) cards
 * on top — same relationship as the rest of the products page.
 *
 * The "[NN]" tag is read from the JSON (`sectionNumber`), so the
 * number is independent of any provider slot on the page.
 *
 * All copy lives in `src/data/products/faq.json`.
 */

type Faq = {
  question: string;
  answer: string;
};

const { sectionNumber, heading, subtext, faqs } = faqData as {
  sectionNumber: string;
  heading: string;
  subtext: string;
  faqs: Faq[];
};

/* ------------------------------ Icons ------------------------------ */

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
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

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
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

/* ------------------------------ Item ------------------------------ */

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
      className="overflow-hidden rounded-2xl bg-[#E8DCC4]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors duration-300 hover:bg-[#E8DCC4]/70 md:p-8"
      >
        <h3 className="font-serif text-xl font-medium leading-snug text-black md:text-2xl lg:text-[26px]">
          {faq.question}
        </h3>
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[#F2EDE4] transition-transform duration-500 ease-out md:h-12 md:w-12"
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <p className="max-w-3xl text-lg font-normal leading-relaxed text-neutral-700 md:text-xl md:leading-[1.75]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function ProductsFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="flex flex-col px-6 lg:px-10">
        {/* Header — heading (left) + section tag (right) */}
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

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-3 max-w-2xl text-base font-light leading-relaxed text-neutral-700 md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        {/* Accordion stack — 60% width, centered on desktop */}
        <div className="mt-16 md:mt-24 md:mx-auto md:w-[60%]">
          <div className="space-y-4 md:space-y-5">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIdx === i}
                onToggle={() =>
                  setOpenIdx((prev) => (prev === i ? null : i))
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