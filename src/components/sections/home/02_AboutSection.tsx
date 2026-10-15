'use client';

import { motion } from 'framer-motion';

import CountUp from '@/components/ui/CountUp';
import about from '@/data/home/about.json';

/**
 * About / Studio section.
 *
 * Layout:
 *
 *   [ H2 heading          ·   [ 02 ] tag ]
 *
 *   [ Year chip            ]  [ Welcome heading + paragraphs ]
 *   [ ─────── divider ──   ]  [ "Quote" — pull quote ]
 *   [ Studio label         ]
 *
 *   ───────────── hairline separator ─────────────
 *
 *   [ "Together, let's build a future filled with Opportunities
 *     and Success." callout heading ]
 *   [   25+   ]  [   50+   ]  [   1,800+   ]  [   300+   ]    <- count-up
 *   [ Years   ]  [ Designs ]  [  Projects  ]  [  Team    ]
 *
 * Background uses the header cream (#F2EDE4) so the page reads as
 * one continuous band from header → hero → about → footer.
 * All copy lives in `src/data/about.json`.
 */

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
 * Counts up from 0 → `value` once the element scrolls into view.
 * Implementation lives in `@/components/ui/CountUp` — see that file
 * for the native IntersectionObserver + reduced-motion handling.
 */

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

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
    >
      <div className="flex flex-col px-6 lg:px-10">
        {/* Section header — H2 + numbered tag */}
        <div className="flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            {about.heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label={`Section ${about.sectionNumber}`}
          >
            <span>[</span>
            <span>{about.sectionNumber}</span>
            <span>]</span>
          </motion.div>
        </div>

        {/* Bottom content — side chip on left, copy on right */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-12">
          {/* Left — side chip: year · divider · studio label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-3"
          >
            <div className="flex flex-col gap-5 text-base font-light md:text-lg">
              <p>{about.sideChip.year}</p>
              <span aria-hidden className="block h-px w-full bg-black/15" />
              <p>{about.sideChip.studio}</p>
            </div>
          </motion.div>

          {/* Right — welcome, paragraphs, pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="md:col-span-9"
          >
            <h3 className="font-serif text-3xl font-light leading-snug md:text-4xl md:leading-[1.2]">
              {about.welcome.heading}
            </h3>

            <div className="mt-8 space-y-6 text-base font-light leading-relaxed md:text-xl md:leading-[1.7]">
              {about.welcome.paragraphs.map((paragraph, i) => (
                <p key={i}>{renderSiclParagraph(paragraph)}</p>
              ))}
            </div>

            <blockquote className="mt-12 border-l-2 border-black/30 pl-6 font-serif text-2xl font-light uppercase leading-[1.15] md:text-3xl md:leading-[1.15]">
              &ldquo;{about.welcome.quote}&rdquo;
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
            {renderStatsHeading(about.stats.heading)}
          </h3>

          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-4 md:gap-0 md:divide-x md:divide-black/15">
            {about.stats.items.map((stat, i) => (
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