'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import projectsData from '@/data/home/projects-featured.json';

/**
 * Featured Projects / Work section.
 *
 * Mirrors the Luneo reference layout:
 *
 *   [ H2 "Featured projects"            ·   [ 03 ] tag ]
 *
 *   [ ........... ] [ right-aligned subtext paragraph ]
 *   [ CTA         ]
 *
 *   [ Project 1 ]  [ Project 2 ]                            <- 2 cols
 *   [ Project 3 — large (~60%) ]                            <- 1 col
 *   [ Project 4 ]  [ Project 5 ]  [ Project 6 ]              <- 3 cols
 *   [ Project 7 ]  [ Project 8 ]                            <- 2 cols
 *
 * Each card has a 16:9 cover image and a caption row below it:
 * "[ number ]  ─────  [ project name ]".
 *
 * Background is the same cream (#F2EDE4) as the header, about, and
 * services sections, so the page reads as one continuous band from
 * top to bottom — only the hero photo breaks the cream flow.
 *
 * All content lives in `src/data/projects-featured.json`.
 */

type Project = {
  number: string;
  slug: string;
  name: string;
  image: string;
  href: string;
};

const {
  sectionNumber,
  heading,
  subtext,
  cta,
  projects,
} = projectsData as {
  sectionNumber: string;
  heading: string;
  subtext: string;
  cta: { label: string; href: string };
  projects: Project[];
};

/* ------------------------------ Pieces ------------------------------ */

/** The dark pill CTA with cream-bordered circle on the right. */
function PrimaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center gap-4 rounded-full bg-black px-6 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <span
        aria-hidden
        className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45"
      />
    </Link>
  );
}

/** Single project tile — image on top, caption row beneath. */
function ProjectCard({
  project,
  delay = 0,
  priority = false,
}: {
  project: Project;
  delay?: number;
  /** Set true for above-the-fold images so Next.js adds fetchpriority="high"
   *  and skips lazy-loading. Without this, the browser doesn't start
   *  fetching the LCP image until after JS hydrates, hurting LCP score. */
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      <Link href={project.href} className="group block">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={project.image}
            alt={`${project.name} project cover image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-base font-light text-black/60 md:text-lg">
            {project.number}
          </span>
          <span aria-hidden className="block h-px flex-1 bg-black/15" />
          <span className="text-base font-light md:text-lg">
            {project.name}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/** 2- or 3-column row of project cards. */
function ProjectsRow({
  items,
  cols = 2,
  /** Index range to mark as priority (above-the-fold). Pass e.g. [0, 1]
   *  to mark the first 2 cards as priority. Only the first row on the
   *  home page is above the fold, so only projects[0] and projects[1]
   *  get priority — the rest stay lazy. */
  priorityIndices = [],
}: {
  items: Project[];
  cols?: 2 | 3;
  priorityIndices?: number[];
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 md:gap-12 ${
        cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
      }`}
    >
      {items.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          delay={i * 0.08}
          priority={priorityIndices.includes(i)}
        />
      ))}
    </div>
  );
}

/** Single hero project — wider card (~60% of row width).
 *  The large feature row is also above the fold on tall viewports, so
 *  it gets priority too. */
function ProjectsRowLarge({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="md:w-[60%]"
    >
      <ProjectCard project={project} priority={priority} />
    </motion.div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function FeaturedProjectsSection() {
  return (
    <section
      id="work"
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
            className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label={`Section ${sectionNumber}`}
          >
            <span>[</span>
            <span>{sectionNumber}</span>
            <span>]</span>
          </motion.div>
        </div>

        {/* Subtext + CTA — CTA on the left, right-aligned paragraph on the right */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="md:col-span-5"
          >
            <PrimaryCTA href={cta.href} label={cta.label} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="text-base font-light leading-relaxed text-neutral-700 md:col-span-7 md:text-right md:text-xl md:leading-[1.7]"
          >
            {subtext}
          </motion.p>
        </div>

        {/* Projects grid — 2 / 1-large / 3 / 2 rows.
            `priorityIndices={[0, 1]}` marks the first row as above-the-fold
            so Next.js emits `<link rel="preload">` for those images and the
            browser fetches them during HTML parse instead of after hydration.
            This eliminates the LCP warning for `photo-1604328698692…`
            (projects[1]) and improves Largest Contentful Paint score.
            The large feature row also gets priority since it can be above
            the fold on taller viewports. */}
        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-20">
          <ProjectsRow items={[projects[0], projects[1]]} priorityIndices={[0, 1]} />
          <ProjectsRowLarge project={projects[2]} priority />
          <ProjectsRow items={[projects[3], projects[4], projects[5]]} cols={3} />
          <ProjectsRow items={[projects[6], projects[7]]} />
        </div>
      </div>
    </section>
  );
}