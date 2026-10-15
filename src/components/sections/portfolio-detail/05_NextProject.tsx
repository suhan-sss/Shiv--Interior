'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import type { ProjectDetail } from '@/types/portfolio-detail';

/**
 * NextProject — closing band that hands the reader off to the next
 * project in the sequence.
 *
 *   Default layout (multiple projects in the data file):
 *     ┌────────────────────────────────────────────────────────┐
 *     │                       Next Project                     │
 *     │                          ──                           │
 *     │                                                        │
 *     │                  → [ Project title ]                    │
 *     │                  → [ category ]                        │
 *     └────────────────────────────────────────────────────────┘
 *
 *   Wrap-around layout (last project, or only one project):
 *     ┌────────────────────────────────────────────────────────┐
 *     │                   All Projects                         │
 *     │                       ──                               │
 *     │                                                        │
 *     │        See the full portfolio  →                       │
 *     └────────────────────────────────────────────────────────┘
 *
 * `currentProjectId` is required so we can detect the wrap-around
 * case (`nextProject.id === currentProjectId`) and swap the panel
 * to a "back to portfolio" variant. The wrap-around happens at the
 * end of the list AND when the data file only has one entry.
 */
export default function NextProject({
  nextProject,
  currentProjectId,
}: {
  nextProject: ProjectDetail;
  currentProjectId: string;
}) {
  const isWrapAround = nextProject.id === currentProjectId;

  return (
    <section className="relative w-full overflow-hidden bg-black text-[#F2EDE4]">
      {/* Background — the next project's photo at low opacity so the
            CTA text reads cleanly on top. Using the next project's own
            cover image creates a subtle visual hand-off. */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src={nextProject.coverImage.src}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      <Link
        // Wrap-around → send the user back to the listing instead of
        // linking to the current project again (which would be a loop).
        href={isWrapAround ? '/portfolio' : `/portfolio/${nextProject.id}`}
        className="group relative flex min-h-[60dvh] flex-col items-start justify-center gap-8 px-6 py-16 md:min-h-[70dvh] md:px-10 md:py-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2EDE4]/70 md:text-sm"
        >
          {isWrapAround ? 'All Projects' : 'Next Project'}
        </motion.span>

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="block h-px w-16 origin-left bg-[#F2EDE4]/40"
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-4xl font-light leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {isWrapAround ? 'See the full portfolio.' : nextProject.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="mt-2 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F2EDE4]/80 md:text-sm"
        >
          <span>
            {isWrapAround ? 'Browse all projects' : nextProject.category}
          </span>
          <span
            aria-hidden
            className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4]/70 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:rotate-45"
          />
        </motion.div>
      </Link>
    </section>
  );
}