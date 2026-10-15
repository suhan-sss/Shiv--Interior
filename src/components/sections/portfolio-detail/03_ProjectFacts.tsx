'use client';

import { motion } from 'framer-motion';

import type { ProjectDetail } from '@/types/portfolio-detail';

/**
 * ProjectFacts — project meta-grid with year, location, area, services.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Year       │ Location                                    │
 *   │  2025       │ Bandra Kurla Complex, Mumbai               │
 *   ├─────────────┼────────────────────────────────────────────┤
 *   │  Area       │ Services                                    │
 *   │  14,000 sqft│ Space Planning, Custom Millwork, …          │
 *   └─────────────┴────────────────────────────────────────────┘
 *
 * The grid uses two rows × two columns on md+ (year/location on top,
 * area/services below) so the layout reads as a clear spec sheet.
 * Each fact has a small uppercase label and a larger value.
 */
export default function ProjectFacts({ project }: { project: ProjectDetail }) {
  const facts: Array<{ label: string; value: string }> = [
    { label: 'Year', value: project.year },
    { label: 'Location', value: project.location },
    { label: 'Area', value: project.area },
    {
      label: 'Services',
      value: project.services.join(' · '),
    },
  ];

  return (
    <section className="w-full bg-[#E8DCC4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-light sm:text-4xl md:text-5xl"
          >
            Project Facts
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="font-serif text-base text-black/50 md:text-lg"
            aria-label="Section 03"
          >
            [ 03 ]
          </motion.span>
        </div>

        {/* Facts grid */}
        <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-12 md:grid-cols-2 md:gap-y-12">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50 md:text-sm">
                {fact.label}
              </dt>
              {/* `whitespace-nowrap` was removed because the services list
                  ("Space Planning · Custom Millwork · Lighting Design · …")
                  runs ~78 chars and overflows the cell on mobile (~312px
                  content width) and on the md+ 2-col cell (~336px) without
                  it. Year / area / location are all short enough to stay
                  on a single line naturally, so dropping nowrap doesn't
                  change their layout — it just lets services wrap. */}
              <dd className="mt-3 max-w-md text-base font-light leading-relaxed text-neutral-900 md:text-lg md:leading-[1.6]">
                {fact.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        {/* Client line — single small line at the bottom */}
        {project.client && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center gap-3 border-t border-black/15 pt-6 text-xs uppercase tracking-[0.2em] text-black/60 md:text-sm"
          >
            <span className="font-semibold">Client</span>
            <span aria-hidden className="block h-px w-8 bg-black/30" />
            <span className="font-normal normal-case tracking-normal text-neutral-800 md:text-base">
              {project.client}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}