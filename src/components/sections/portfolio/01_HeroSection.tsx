'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import heroData from '@/data/portfolio/hero.json';
import projects from '@/data/portfolio/featured.json';

/**
 * PortfolioHero — top of the /portfolio route.
 *
 * Two-band layout: the heading band uses the shared `/ Label` +
 * border-b + staggered-slide-up headline pattern (matching the
 * about, contact, and products heroes), and below it sits a
 * full-bleed carousel of featured projects. The carousel advances
 * every 5s and is click-navigable.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  / Portfolio                                              │
 *   │  ──────────────────────────────────────────────────────  │
 *   │  Spaces made to                                           │
 *   │  be lived in.                                             │
 *   │  A collection of interiors shaped by natural materials…  │
 *   │  ──────────────────────────────────────────────────────  │
 *   ├──────────────────────────────────────────────────────────┤
 *   │                                                           │
 *   │  ┌───────── full-bleed hero card (auto-advances) ─────┐ │
 *   │  │  [ category pill ]  [ View Project ]                  │
 *   │  │                                                       │
 *   │  │  ◀ click left half ..................  click right ▶  │
 *   │  └──────────────────────────────────────────────────────┘ │
 *   └──────────────────────────────────────────────────────────┘
 *
 * Cards read from `src/data/portfolio/featured.json`.
 */

const { label, lines, subtext } = heroData as {
  label: string;
  lines: string[];
  subtext: string;
};

/* Stagger container — controls cadence for the per-line motion. */
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

type Project = {
  id: string;
  category: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
};

const cards = projects as Project[];
const AUTO_ADVANCE_MS = 5000;

/* ----------------------------- Pieces ----------------------------- */

function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-black backdrop-blur">
      <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-black" />
      {children}
    </span>
  );
}

function ViewProjectPill({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-11 items-center gap-3 rounded-full bg-black px-5 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em]">
        View Project
      </span>
      <span
        aria-hidden
        className="block h-5 w-5 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45"
      />
    </Link>
  );
}

/**
 * One project card — full-bleed image with bottom overlay carrying
 * category pill, title, and View Project.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative h-full w-full overflow-hidden  bg-neutral-200">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="flex flex-col gap-3">
            <CategoryPill>{project.category}</CategoryPill>
            <h3 className="font-serif text-3xl font-light leading-tight text-white drop-shadow-sm md:text-5xl">
              {project.title}
            </h3>
          </div>
          <div className="md:pb-1">
            <ViewProjectPill href={project.href} />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
      />
    </article>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function PortfolioHero() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Stash the timer + "last activity" timestamp in refs so the
  // interval never restarts on re-render. Every 1s we check whether
  // 5s have elapsed since the last interaction; if so, advance.
  const lastAdvanceRef = useRef<number>(performance.now());
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cards.length <= 1) return;

    const tick = () => {
      if (document.hidden) return;
      const elapsed = performance.now() - lastAdvanceRef.current;
      if (elapsed >= AUTO_ADVANCE_MS) {
        setActiveIdx((i) => (i + 1) % cards.length);
        // Reset the clock so the next slide also gets a full 5s.
        lastAdvanceRef.current = performance.now();
      }
    };

    tickRef.current = setInterval(tick, 250);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#F2EDE4] text-black">
      {/* Top content — `/ Label` + border + staggered headline + subtext. */}
      <div className="w-full px-6 pt-32 lg:px-10">
        <div className="border-b border-black/10 pb-6 mb-12 md:mb-16">
          <p className="text-sm md:text-base opacity-60 font-medium">
            / {label}
          </p>
        </div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              <span
                className={`inline-flex overflow-hidden pb-2 -mb-2 ${
                  index === 0 ? 'md:ml-[7vw] lg:ml-[15vw]' : ''
                }`}
              >
                <motion.span variants={lineVariants} className="inline-block">
                  {line}
                </motion.span>
              </span>

              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:mt-20 md:w-[45%] md:text-right md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        <div
          aria-hidden
          className="mt-10 h-px w-full bg-black/15 md:mt-14"
        />
      </div>

      {/* Carousel — one card at a time, advances every 5s, click left/right
          half to navigate. */}
      <div className="relative mx-auto mt-12 w-full md:mt-14">
        <div className="relative w-full px-6 pb-8 lg:px-10">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: 'min(72dvh, 720px)' }}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={cards[activeIdx].id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <ProjectCard project={cards[activeIdx]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}