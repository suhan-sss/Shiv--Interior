'use client';

import React from 'react';
import { motion } from 'framer-motion';

import heroData from '@/data/contact/hero.json';

/**
 * ContactHero — top of the /contact route.
 *
 * Heading now uses the home page typography (serif, light, tight
 * leading) so the four headline lines feel like the rest of the
 * site's H2s. Copy is read from `src/data/contact/hero.json`.
 */

const { label, lines, subtext } = heroData as {
  label: string;
  lines: string[];
  subtext: string;
};

// Staggered slide-up reveal.
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

const lineVariants = {
  hidden: { y: '120%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactHero() {
  return (
    <section className="relative w-full bg-[#F2EDE4] text-black pt-32 pb-20 md:pb-32 min-h-[70dvh] flex flex-col justify-end">

      {/* Top Label & Border Line */}
      <div className="w-full px-6 md:px-8">
        <div className="border-b border-black/10 pb-6 mb-12 md:mb-20">
          <p className="text-sm md:text-base opacity-60 font-medium">/ {label}</p>
        </div>
      </div>

      {/* Massive Headline */}
      <div className="w-full px-6 md:px-8">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-light"
        >
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {/* inline-flex to allow the mask clipping while keeping layout intact */}
              <span
                className={`inline-flex overflow-hidden pb-2 -mb-2 ${
                  // Indent ONLY the first line deeply to the right
                  index === 0 ? 'md:ml-[7vw] lg:ml-[15vw]' : ''
                }`}
              >
                <motion.span variants={lineVariants} className="inline-block">
                  {line}
                </motion.span>
              </span>

              {/* Insert line breaks for all but the last line */}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>
      </div>

      {/* Subtext + w-full hairline divider */}
      <div className="w-full px-6 md:px-8">
        <p className="mt-12 max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:mt-20 md:w-[45%] md:text-right md:text-xl md:leading-[1.7]">
          {subtext}
        </p>
        <div
          aria-hidden
          className="mt-10 h-px w-full bg-black/15 md:mt-14"
        />
      </div>

    </section>
  );
}