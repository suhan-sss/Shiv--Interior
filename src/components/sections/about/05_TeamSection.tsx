'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { SectionTag } from '@/components/sections/PageSections';
import teamData from '@/data/about/team.json';

/**
 * TeamSection — "/about" fifth section.
 *
 * Mirrors the Luneo "Our Team" reference: an H2 + section-tag header
 * with a right-aligned subtext on top, then a 4-column row of team
 * members. Each card is image-on-top + role label below.
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │  Our Team                               [ NN ]       │
 *   │                                                       │
 *   │           Meet the designers and makers behind…      │
 *   │                                                       │
 *   │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                   │
 *   │  │     │  │     │  │     │  │     │                   │
 *   │  │ Img │  │ Img │  │ Img │  │ Img │                   │
 *   │  │     │  │     │  │     │  │     │                   │
 *   │  ├─────┤  ├─────┤  ├─────┤  ├─────┤                   │
 *   │  │Name │  │Name │  │Name │  │Name │                   │
 *   │  │Role │  │Role │  │Role │  │Role │                   │
 *   │  └─────┘  └─────┘  └─────┘  └─────┘                   │
 *   └──────────────────────────────────────────────────────┘
 *
 * The "[NN]" tag uses <SectionTag />, which auto-numbers based on
 * position via the <PageSections> provider — no sectionNumber in JSON.
 */

const { heading, subtext, members } = teamData as {
  heading: string;
  subtext: string;
  members: {
    name: string;
    role: string;
    image: { src: string; alt: string };
  }[];
};

export default function TeamSection() {
  return (
    <section
      id="our-team"
      className="relative w-full bg-[#F2EDE4] text-black"
    >
      <div className="px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-32">
        {/* Header — H2 left, [04] right */}
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

        {/* Subtext — right-aligned, ~40% wide on desktop */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-8 text-right text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:w-[45%] md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        <div
          aria-hidden
          className="mt-8 h-px w-full bg-black/15 md:mt-10"
        />

        {/* 4-column row of team members */}
        <div className="mt-14 grid grid-cols-2 gap-8 md:mt-20 md:grid-cols-4 md:gap-6">
          {members.map((m, idx) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: 0.1 + idx * 0.1,
                ease: 'easeOut',
              }}
              className="flex flex-col"
            >
              {/* Square image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-200">
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>

              {/* Name + role */}
              <div className="mt-5 flex flex-col gap-1 md:mt-6">
                <p className="text-base font-medium text-black md:text-lg">
                  {m.name}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 md:text-sm">
                  {m.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}