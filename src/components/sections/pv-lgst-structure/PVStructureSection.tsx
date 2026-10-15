'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import data from '@/data/pv-lgst-structure/pv-lgst-structure.json';

/**
 * PVStructureSection — top of the `/products/pv-lgst-structure` route.
 *
 * Mirrors the first section from the reference HTML (shivindustries.co),
 * restyled to match the site's cream + sand visual standards.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  ─ PV Structure                                          │
 *   │  intro paragraph about what a PV Structure is …          │
 *   │                                                          │
 *   │   [ body paragraph + bullet list ]  [ cover image ]    │
 *   └──────────────────────────────────────────────────────────┘
 *
 * All copy lives in `src/data/pv-lgst-structure/pv-lgst-structure.json`
 * under the `pvStructure` key.
 */

const { pvStructure } = data as {
  pvStructure: {
    sectionNumber: string;
    title: string;
    intro: string;
    body: string;
    bullets: string[];
    image: { src: string; alt: string };
  };
};

/* ----------------------------- Pieces ----------------------------- */

/**
 * Section header — horizontal-rule + serif H2 on the left, [NN] tag on
 * the right. Matches the closing CTA's flex pattern for consistent
 * numbering across the page.
 */
function SectionHeader({
  sectionNumber,
  children,
}: {
  sectionNumber: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-4 font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:gap-6 md:text-7xl"
      >
        <span
          aria-hidden
          className="block h-[2px] w-10 shrink-0 bg-black md:w-14"
        />
        {children}
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
  );
}

/** A bulleted list using the site's standard `text-neutral-700` body. */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-black"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Rounded-2xl image wrapper that fills its grid space cleanly. */
function CoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function PVStructureSection() {
  return (
    <section className="bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        {/* Heading */}
        <SectionHeader sectionNumber={pvStructure.sectionNumber}>
          {pvStructure.title}
        </SectionHeader>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-8 max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:mt-10 md:text-xl md:leading-[1.7]"
        >
          {pvStructure.intro}
        </motion.p>

        {/* Hairline */}
        <div
          aria-hidden
          className="mt-10 h-px w-full bg-black/10 md:mt-14"
        />

        {/* Body — text + bullets on left, image on right */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:items-start md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="md:pt-2"
          >
            <p className="text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
              {pvStructure.body}
            </p>

            <div className="mt-8">
              <BulletList items={pvStructure.bullets} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          >
            <CoverImage
              src={pvStructure.image.src}
              alt={pvStructure.image.alt}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}