'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { SectionTag } from '@/components/sections/PageSections';
import servicesData from '@/data/products/services.json';

/**
 * ProductsServices — `/products` second section.
 *
 * Mirrors the Framer "Our Service" reference: a section header (H2
 * + auto-numbered [01] tag) sits above a right-aligned subtext on
 * 45% of the row, then a hairline divider, then a vertical stack of
 * service cards. Each card has the same internal structure:
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  [ Category · Title (serif, h3) ]   [ Description ... ]  │
 *   │                                                            │
 *   │  [ pill ] [ pill ] [ pill ] [ pill ]                       │
 *   │                                                            │
 *   │  ── hairline ──                                            │
 *   │                                                            │
 *   │  ┌──img──┐ ┌──img──┐ ┌──img──┐ ┌──img──┐                   │
 *   │  │  C │  │  C │  │  C │  │  C │                          │
 *   │  │  T  │  │  T  │  │  T  │  │  T  │                       │
 *   │  └─────┘  └─────┘  └─────┘  └─────┘                       │
 *   └──────────────────────────────────────────────────────────┘
 *
 * The card uses a slightly darker sand cream (`#E8DCC4`) so the
 * group reads as a "tablet" sitting one notch deeper than the
 * page's `#F2EDE4` cream field — grounded, natural, low-contrast.
 *
 * The "[NN]" tag is rendered by <SectionTag />, which reads its
 * number from the <PageSections> provider so the value auto-matches
 * this section's position in the page. No number lives in the JSON.
 *
 * All copy lives in `src/data/products/services.json`.
 */

type Include = {
  category: string;
  title: string;
  image: { src: string; alt: string };
};

type Service = {
  category: string;
  title: string;
  description: string;
  pills: string[];
  includes: Include[];
};

const { heading, subtext, items } = servicesData as {
  heading: string;
  subtext: string;
  items: Service[];
};

/* ----------------------------- Pieces ----------------------------- */

/** Per-pill — a small dot + label inside a black rounded chip. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F2EDE4]">
      <span aria-hidden className="block h-1 w-1 rounded-full bg-[#F2EDE4]" />
      {children}
    </span>
  );
}

/**
 * One inset include tile — rounded image on top, two-line caption
 * below (small uppercase category, then the include title). The
 * image scales subtly on hover as a tactile signal.
 */
function IncludeTile({ include }: { include: Include }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="group"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-200">
        <Image
          src={include.image.src}
          alt={include.image.alt}
          fill
          sizes="(min-width: 768px) 22vw, 45vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-3">
        <p className="text-xs font-light uppercase tracking-[0.14em] text-black/60">
          {include.category}
        </p>
        <p className="mt-1 text-base font-light leading-snug text-black md:text-lg">
          {include.title}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Single service card — category + title on the left, description
 * on the right; a row of dark pills beneath; a hairline separator;
 * and a 4-column grid of inset include thumbnails.
 */
function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
      }}
      className="rounded-2xl bg-[#E8DCC4] p-6 md:p-10 lg:p-14"
    >
      {/* Top — category + title | description */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-14">
        <div className="md:w-1/2">
          <p className="text-sm font-light uppercase tracking-[0.18em] text-black/60 md:text-base">
            {service.category}
          </p>
          <h3 className="mt-3 font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-6xl">
            {service.title}
          </h3>
        </div>

        <div className="md:pt-2 md:w-1/2">
          <p className="text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
            {service.description}
          </p>
        </div>
      </div>

      {/* Pills */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
        }}
        className="mt-8 flex flex-wrap gap-2 md:mt-12 md:gap-3"
      >
        {service.pills.map((pill) => (
          <motion.span
            key={pill}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <Pill>{pill}</Pill>
          </motion.span>
        ))}
      </motion.div>

      {/* Hairline separator */}
      <div aria-hidden className="my-8 h-px w-full bg-black/15 md:my-12" />

      {/* Includes — 2 cols on mobile, 4 on desktop */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6 md:gap-y-8"
      >
        {service.includes.map((include) => (
          <IncludeTile key={include.title} include={include} />
        ))}
      </motion.div>
    </motion.article>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function ProductsPlanning() {
  return (
    <section className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        {/* Header — H2 + section tag (auto-numbered) */}
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

        {/* Subtext — right-aligned, 45% wide, XL */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-12 max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:mt-20 md:w-[45%] md:text-right md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

       

        {/* Service cards — vertical stack with consistent gaps */}
        <div className="mt-12 flex flex-col gap-6 md:mt-20 md:gap-8">
          {items.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}