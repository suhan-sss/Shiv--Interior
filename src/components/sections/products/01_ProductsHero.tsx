'use client';

import React from 'react';
import { motion } from 'framer-motion';

import heroData from '@/data/products/hero.json';

/**
 * ProductsHero — top of the /products route.
 *
 * Mirrors the "Expertise" reference: a page-indicator pill
 * (`/ Expertise`) sits above a hairline, then a massive serif
 * headline fills the lower portion of the viewport. Each line of
 * the headline slides up from below in sequence (stagger 0.15s).
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  / Expertise                                             │
 *   │  ──────────────────────────────────────────────────────  │
 *   │                                                           │
 *   │            Strategic thinking.                            │
 *   │  Creative execution. A collection of                     │
 *   │  capabilities built to elevate modern                    │
 *   │  brands.                                                  │
 *   └──────────────────────────────────────────────────────────┘
 *
 * The headline lines and indicator label live in
 * `src/data/products/hero.json`.
 */

const { label, lines, subtext } = heroData as {
  label: string;
  lines: string[];
  subtext: string;
};

/* Stagger container — controls the cadence for the per-line motion. */
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* Per-line slide-up — pushes the line down 120% of its height
   (clipped by the wrapping overflow-hidden span) so it appears
   to rise into place once visible. */
const lineVariants = {
  hidden: { y: '120%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProductsHero() {
  return (
    <section className="relative w-full bg-[#F2EDE4] text-black pt-32 pb-20 md:pb-32 min-h-[65vh] flex flex-col justify-end">
      {/* Page indicator + hairline */}
      <div className="w-full px-6 md:px-8">
        <div className="border-b border-black/10 pb-6 mb-12 md:mb-20">
          <p className="text-sm md:text-base opacity-60 font-medium">
            / {label}
          </p>
        </div>
      </div>

      {/* Headline — each line slides up from a clipped mask */}
      <div className="w-full px-6 md:px-8">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {/* `inline-flex overflow-hidden` is the mask that hides the
                  line at y:120%. `pb-2 -mb-2` compensates for the descender
                  clip so the line still reserves a normal line-box. */}
              <span
                className={`inline-flex overflow-hidden pb-2 -mb-2 ${
                  // First line gets a deep indent on desktop, matching
                  // the offset layout of the reference.
                  index === 0 ? 'md:ml-[7vw] lg:ml-[15vw]' : ''
                }`}
              >
                <motion.span variants={lineVariants} className="inline-block">
                  {line}
                </motion.span>
              </span>

              {/* Hard break between every pair, none after the last line. */}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>

        {/* Subtext — right-aligned, 45% wide, XL */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-12 max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:mt-20 md:w-[45%] md:text-right md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        <div
          aria-hidden
          className="mt-10 h-px w-full bg-black/15 md:mt-14"
        />
      </div>
    </section>
  );
}