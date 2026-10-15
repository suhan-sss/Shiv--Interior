'use client';

import { motion } from 'framer-motion';

import type { ProjectDetail } from '@/types/portfolio-detail';

/**
 * ProjectOverview — the "story" of the project. Mirrors the Luneo
 * reference pattern: a long-form intro paragraph (left, generous
 * leading), then a 2-column "Challenge / Solution" split.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  [ 02 ]                                                  │
 *   │                                                          │
 *   │  The Story                                               │
 *   │  ───────                                                 │
 *   │                                                          │
 *   │  <overview paragraph>                                    │
 *   │                                                          │
 *   │  ┌──────────────────────┬─────────────────────────┐    │
 *   │  │ THE CHALLENGE         │ THE SOLUTION             │    │
 *   │  │ <challenge text>      │ <solution text>          │    │
 *   │  └──────────────────────┴─────────────────────────┘    │
 *   └──────────────────────────────────────────────────────────┘
 */
export default function ProjectOverview({ project }: { project: ProjectDetail }) {
  return (
    <section className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        {/* Section header — small `[ 02 ]` tag + heading */}
        <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-light sm:text-4xl md:text-5xl"
          >
            The Story
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="font-serif text-base text-black/50 md:text-lg"
            aria-label="Section 02"
          >
            [ 02 ]
          </motion.span>
        </div>

        {/* Overview — long-form intro paragraph. Generous leading
            (1.7) and max-w-3xl so the line length stays comfortable
            for sustained reading. */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 max-w-3xl text-base font-light leading-[1.7] text-neutral-800 md:mt-12 md:text-lg md:leading-[1.8]"
        >
          {project.overview}
        </motion.p>

        {/* Challenge + Solution — 2-col split on md+ */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 md:text-sm">
              The Challenge
            </h3>
            <p className="mt-4 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
              {project.challenge}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 md:text-sm">
              The Solution
            </h3>
            <p className="mt-4 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
              {project.solution}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}