'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import studioWork from '@/data/portfolio/studio-work.json';
import projects from '@/data/portfolio/projects.json';

/**
 * StudioWork — gallery of all projects with category filter tabs.
 *
 * Layout:
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │  Studio Work                       [ 01 ]            │  ← H2 + tag
 *   │                                                       │
 *   │                A collection of considered interiors…  │  ← right-aligned subtext
 *   │  ──────────────────────────────────────────────────  │  ← w-full hairline
 *   │                                                       │
 *   │  [All] [Modern Traditional] [Organic Modern]         │  ← filter tabs
 *   │  [Minimalist] [Japandi]                              │
 *   │                                                       │
 *   │   [ card 1 ]  [ card 2 ]                              │  ← 2-up (Marlow, Everly)
 *   │             [   card 3   ]                            │  ← centered (Ashgrove)
 *   │   [ c4 ]  [ c5 ]  [ c6 ]                              │  ← 3-up (Ferris, Linden, Kessler)
 *   │             [   card 7   ]                            │  ← centered (Calloway)
 *   │   [ c8 ]  [ c9 ]                                      │  ← 2-up (Hollis, Whitfield)
 *   │   [ c10 ]  [ c11 ]                                    │  ← 2-up (Wren, Prescott)
 *   └──────────────────────────────────────────────────────┘
 *
 * Filter tabs are purely client-side (useState), and cards animate
 * in with framer-motion when their category is selected.
 */

const { sectionNumber, heading, subtext, filters } = studioWork as {
  sectionNumber: string;
  heading: string;
  subtext: string;
  filters: string[];
};

type Project = {
  id: string;
  number: number;
  title: string;
  category: string;
  href: string;
  image: { src: string; alt: string };
};

const allProjects = projects as Project[];

/* ----------------------------- Tabs ----------------------------- */

/**
 * Filter tab — black filled when active, transparent when inactive.
 * Mirrors the reference's filled/outline toggle exactly.
 */
function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'h-11 rounded-md border px-4 text-sm font-medium transition-colors duration-300 sm:h-12 sm:px-5 md:px-6 md:text-base',
        active
          ? 'border-black bg-black text-[#F2EDE4]'
          : 'border-black/10 bg-transparent text-black hover:bg-black/5',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

/* ----------------------------- Card ----------------------------- */

/**
 * One project card — full-bleed image, then a "1  The Marlow Residence"
 * caption row beneath. Used in every row of the editorial grid.
 */
function ProjectCard({
  project,
  index,
  delay = 0,
}: {
  project: Project;
  index: number;
  delay?: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <Link href={project.href} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200 md:aspect-[16/10]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-4 flex items-baseline gap-2 text-base font-normal text-black md:mt-5 md:text-lg">
          <span className="tabular-nums">{project.number}</span>
          <span>{project.title}</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------- Row wrappers ------------------------- */

/** 2-column row, equal widths. */
function Row2({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
      {children}
    </div>
  );
}

/** 3-column row, equal widths. */
function Row3({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
      {children}
    </div>
  );
}

/** Centered single column at ~60% width — same width as the FAQ accordion. */
function RowCentered({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full md:w-[60%]">{children}</div>;
}

/* ----------------------------- Section ----------------------------- */

export default function StudioWorkSection() {
  const [active, setActive] = useState<string>('All');

  // "All" shows everything; otherwise filter by category.
  const visible = allProjects.filter(
    (p) => active === 'All' || p.category === active,
  );

  // Build the editorial row pattern. The reference alternates
  // 2-up → centered → 3-up → centered → 2-up → 2-up. We mirror it
  // by indexing the visible array in chunks of [2, 1, 3, 1, 2, 2].
  const rows: { kind: 'r2' | 'r3' | 'rc'; items: Project[] }[] = [];
  const pattern: ('r2' | 'r3' | 'rc')[] = ['r2', 'rc', 'r3', 'rc', 'r2', 'r2'];
  let i = 0;
  let pIdx = 0;
  while (i < visible.length) {
    const kind = pattern[rows.length % pattern.length];
    const take = kind === 'r3' ? 3 : kind === 'r2' ? 2 : 1;
    const items = visible.slice(i, i + take);
    if (items.length === 0) break;
    rows.push({ kind, items });
    i += items.length;
  }

  return (
    <section
      id="studio-work"
      className="relative w-full bg-[#F2EDE4] text-black"
    >
      <div className="flex flex-col px-6 pt-24 pb-20 lg:px-10 lg:pt-32 lg:pb-32">
        {/* ============================== TOP HEADER ============================== */}
        <div className="flex flex-wrap items-start justify-between gap-6">
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
            className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label={`Section ${sectionNumber}`}
          >
            <span>[</span>
            <span>{sectionNumber}</span>
            <span>]</span>
          </motion.div>
        </div>

        {/* ============================== SUBTEXT ============================== */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-8 text-right text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:w-2/5 md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        {/* Hairline divider */}
        <div
          aria-hidden
          className="mt-8 h-px w-full bg-black/15 md:mt-10"
        />

        {/* ============================== FILTERS ============================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12 md:gap-4"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {filters.map((f) => (
            <FilterTab
              key={f}
              label={f}
              active={f === active}
              onClick={() => setActive(f)}
            />
          ))}
        </motion.div>

        {/* ============================== GRID ============================== */}
        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          <AnimatePresence mode="popLayout">
            {rows.map((row, rowIdx) => {
              const Wrapper =
                row.kind === 'r3' ? Row3 : row.kind === 'r2' ? Row2 : RowCentered;
              return (
                <Wrapper key={`${active}-${rowIdx}`}>
                  {row.items.map((project, itemIdx) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={pIdx++}
                      delay={itemIdx * 0.08}
                    />
                  ))}
                </Wrapper>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}