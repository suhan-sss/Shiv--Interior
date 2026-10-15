'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import CountUp from '@/components/ui/CountUp';
import { SectionTag } from '@/components/sections/PageSections';
import storyData from '@/data/about/story.json';

/**
 * StorySection — "/about" second section.
 *
 * Mirrors the home page's 02_AboutSection structure: H2 + section
 * tag on top, a left-side image (30% wide, same height as the
 * right column) with a scroll-driven parallax effect, the welcome
 * copy and pull quote on the right (~60% wide), then a hairline
 * divider, then a stats callout with a highlighted heading and
 * four count-up tiles.
 *
 *   [ H2 "Our Story"          ·   [ 01 ] tag ]
 *
 *   [                ]  [ Welcome heading                       ]
 *   [ Story image    ]  [   — Founding narrative (Luneo-style) ]
 *   [ (parallax)     ]  [ "Quote" — pull quote                 ]
 *   [   30%          ]  [              ~60% wide, right-aligned ]
 *
 *   ───────────── hairline separator ─────────────
 *
 *   [ "Together, let's build a future filled with Opportunities
 *     and Success." callout heading ]
 *   [   25+   ]  [   50+   ]  [   1,800+   ]  [   300+   ]    <- count-up
 *   [ Years   ]  [ Designs ]  [  Projects  ]  [  Team    ]
 *
 * The "[NN]" tag is rendered by <SectionTag />, which reads its
 * number from the <PageSections> provider so the value auto-matches
 * this section's position in the page. No number lives in the JSON.
 *
 * All copy lives in `src/data/about/story.json`.
 */

const { heading, welcome, stats } = storyData as {
  heading: string;
  welcome: {
    heading: string;
    paragraphs: string[];
    quote: string;
  };
  stats: {
    heading: string;
    items: { value: number; suffix: string; label: string }[];
  };
};

/**
 * Splits a paragraph on the literal "(SICL)" token and renders each
 * occurrence in semibold, so the brand shorthand stays consistent
 * everywhere without a heavy markdown layer.
 */
function renderSiclParagraph(text: string) {
  const parts = text.split('(SICL)');
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <strong className="font-semibold">(SICL)</strong>}
      {part}
    </span>
  ));
}

/* ----------------------------- Story image ----------------------------- */

/**
 * Story image — left column.
 *
 * Scale-on-scroll effect driven by useScroll with offset
 * ['start end', 'end start']. As the container scrolls through
 * the viewport, the image scales from 1× → 1.1× — a subtle zoom
 * that gives the still photo a sense of motion as the user moves
 * past it. The container has overflow-hidden so the edges of the
 * zoom are clipped and the frame stays the same.
 */
function StoryImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-200"
    >
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.pexels.com/photos/17640379/pexels-photo-17640379.jpeg"
          alt="Shiv Interior workspace"
          fill
          sizes="30vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

/* ----------------------------- Stats helpers ----------------------------- */

/**
 * Words that get highlighted in the stats callout heading.
 * Matched against whole words only (boundary on both sides) so
 * "Successful" doesn't accidentally match "Success".
 */
const HIGHLIGHT_WORDS = ['Opportunities', 'Success'] as const;

/**
 * Renders the stats heading with "Opportunities" and "Success" in
 * the brand amber. The rest of the text stays default weight.
 */
function renderStatsHeading(text: string) {
  const pattern = new RegExp(`\\b(${HIGHLIGHT_WORDS.join('|')})\\b`, 'g');
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const isHighlighted = (HIGHLIGHT_WORDS as readonly string[]).includes(part);
    return (
      <span key={i} className={isHighlighted ? 'text-amber-700' : undefined}>
        {part}
      </span>
    );
  });
}

/**
 * Single stat cell — large serif number (counting up) plus a small
 * uppercase label. The "+" suffix is colored in brand amber so it
 * reads as a brand stamp.
 */
function StatCell({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="md:px-6"
    >
      <p className="font-serif text-5xl font-light leading-none sm:text-6xl md:text-7xl lg:text-8xl">
        <CountUp value={value} duration={3} delay={delay} />
        <span className="text-amber-700">{suffix}</span>
      </p>
      <p className="mt-4 text-sm font-light uppercase tracking-[0.16em] text-black/60 md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function StorySection() {
  return (
    <section
      id="our-story"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
    >
      <div className="flex flex-col px-6 lg:px-10">
        {/* Section header — H2 + section tag (auto-numbered) */}
        <div className="flex flex-wrap items-end justify-between gap-6 md:mb-20">
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

        {/* Body — image on left (30%), welcome on right (~60%) */}
        <div className="mt-12 flex flex-col gap-8 md:mt-20 md:flex-row md:items-stretch">
          {/* Left — story image, matches right column height */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="min-h-[280px] md:min-h-0 md:w-[30%]"
          >
            <StoryImage />
          </motion.div>

          {/* Right — welcome, paragraphs, pull quote (~60% wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="md:ml-auto md:w-3/5"
          >
            <h3 className="font-serif text-3xl font-light leading-snug md:text-4xl md:leading-[1.2]">
              {welcome.heading}
            </h3>

            <div className="mt-8 space-y-6 text-base font-light leading-relaxed md:text-xl md:leading-[1.7]">
              {welcome.paragraphs.map((paragraph, i) => (
                <p key={i}>{renderSiclParagraph(paragraph)}</p>
              ))}
            </div>

            <blockquote className="mt-12 border-l-2 border-black/30 pl-6 font-serif text-2xl font-light uppercase leading-[1.15] md:text-3xl md:leading-[1.15]">
              &ldquo;{welcome.quote}&rdquo;
            </blockquote>
          </motion.div>
        </div>

        {/* Stats — count-up callout at the bottom, separated by a hairline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-24 border-t border-black/10 pt-16 md:mt-32 md:pt-20"
        >
          <h3 className="max-w-4xl font-serif text-3xl font-light leading-snug md:text-5xl md:leading-[1.15]">
            {renderStatsHeading(stats.heading)}
          </h3>

          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-4 md:gap-0 md:divide-x md:divide-black/15">
            {stats.items.map((stat, i) => (
              <StatCell
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.2}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}