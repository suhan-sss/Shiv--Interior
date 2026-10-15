'use client';

/**
 * Contact FAQ — accordion section.
 *
 * Reads from `src/data/contact/faq.json` and matches the Shiv Interior
 * visual language: cream surface (`bg-[#F2EDE4]`) so it blends with the
 * rest of the contact page, large serif heading on the left, [03] section
 * tag on the right, then a 60%-wide centered accordion stack on sand
 * (`#E8DCC4`) cards — single-open behavior, first question open by default.
 *
 *   ┌─────────────────────────┬─────────────────────────────┐
 *   │  Frequently Asked //    │                       [ 03 ] │
 *   │                         │                             │
 *   │           FAQs          │                             │
 *   └─────────────────────────┴─────────────────────────────┘
 *
 *      [ Q1 ............................ (−) ]   ← open
 *      [ Q2 ............................ (+) ]
 *      [ ...                                   ]
 *      [ Q8 ............................ (+) ]
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import faqJson from '@/data/contact/faq.json';

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const {
  sectionNumber,
  heading,
  subtext,
  faqs,
} = faqJson as {
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
        aria-controls={`contact-faq-answer-${faq.id}`}
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
            id={`contact-faq-answer-${faq.id}`}
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

export default function ContactFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="flex flex-col px-6 lg:px-10">
        {/* Header — heading (left) + [03] tag (right) */}
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

        {/* Subtitle */}
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
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() =>
                  setOpenId((prev) =>
                    prev === faq.id ? null : faq.id,
                  )
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