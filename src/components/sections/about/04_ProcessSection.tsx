'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

import { SectionTag } from '@/components/sections/PageSections';
import processData from '@/data/home/process.json';

/**
 * Process section — "/about" fourth section.
 *
 * Mirrors the home page's 06_ProcessSection exactly so the two share
 * the same 4-step delivery cycle, same image, same parallax treatment,
 * and same typography:
 *
 *   Discovery & Consultation → Concept & Design →
 *   Visualization & Planning → Execution & Handover.
 *
 *   [ H2 "Our Process"                       ·   [ NN ] tag ]
 *
 *                                       [ right-aligned subtext  ]
 *
 *   [ step 01 ] [ step 02 ] [ step 03 ] [ step 04 ]    <- lg: 4 cols
 *   [ step 01 ] [ step 02 ]                         <- md: 2 cols
 *   [ step 01 ]                                    <- mobile: 1 col
 *
 * Each card has a tall portrait cover image with a scroll-linked
 * parallax + scale (matching the Luneo reference's
 * `translateY(...) scale(1.2)` look). The image fill is zoomed in
 * slightly (1.1-1.2) so the parallax travel never reveals a gap.
 *
 * The "[NN]" tag uses <SectionTag />, which auto-numbers based on
 * position via the <PageSections> provider. Data is sourced from
 * `src/data/home/process.json` so both routes always render the same
 * process — neither carries a sectionNumber of its own.
 */

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  image: string;
};

const { heading, subtext, steps } = processData as {
  heading: string;
  subtext: string;
  steps: ProcessStep[];
};

/* ------------------------------ Pieces ------------------------------ */

/**
 * One process step — image on top, then number + title on a single line,
 * then the description paragraph. The image has a scroll-linked parallax
 * (translateY ±8%) and a slow scale breathe (1.1 ↔ 1.2) so it feels
 * premium as it scrolls past the viewport.
 */
function ProcessCard({ step, delay = 0 }: { step: ProcessStep; delay?: number }) {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.2, 1.1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="group"
    >
      {/* Portrait image wrap — crops the parallax+zoomed child image. */}
      <div
        ref={imageWrapRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-100"
      >
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 h-[120%] w-[120%] -translate-x-[10%]"
        >
          <Image
            src={step.image}
            alt={`${step.title} process step image`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </div>

      {/* Number + title on a single line, then the description below. */}
      <div className="mt-6 flex items-baseline gap-4">
        <span className="font-serif text-base font-light text-black/60 md:text-lg">
          {step.step}
        </span>
        <h3 className="font-serif text-base font-light md:text-lg">
          {step.title}
        </h3>
      </div>

      <p className="mt-3 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
        {step.description}
      </p>
    </motion.div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function ProcessSection() {
  return (
    <section
      id="our-process"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
    >
      <div className="flex flex-col px-6 lg:px-10">
        {/* Top row — H2 + numbered tag */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            {heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <SectionTag />
          </motion.div>
        </div>

        {/* Right-aligned subtext — sits opposite the heading on lg+ */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-12 text-base font-light leading-relaxed text-neutral-700 md:mt-16 md:ml-auto md:max-w-2xl md:text-right md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        {/* Process steps grid — 1 col mobile, 2 cols md, 4 cols lg */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-2 md:gap-x-6 md:gap-y-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {steps.map((step, i) => (
            <ProcessCard key={step.step} step={step} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}