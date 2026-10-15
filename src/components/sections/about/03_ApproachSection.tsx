'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { SectionTag } from '@/components/sections/PageSections';
import approachData from '@/data/about/approach.json';

/**
 * ApproachSection — "/about" third section.
 *
 * Mirrors the Luneo "Our Approach" reference: an H2 + section-tag
 * header on top, then a two-column body where the left side is
 * a stack of three approach items (each with a category label,
 * title, and description), and the right side is a sticky image
 * that pins while the list scrolls.
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │  Our Approach                            [ NN ]      │
 *   │                                                       │
 *   │  ┌─────────────────────────┐  ┌───────────────────┐  │
 *   │  │ Personal Approach       │  │                   │  │
 *   │  │ Designed Around You     │  │   [ sticky image  │  │
 *   │  │ Every project begins…   │  │     full height   │  │
 *   │  │                         │  │     of the list   │  │
 *   │  │ Material Focus          │  │     (items-       │  │
 *   │  │ Beauty in the Details   │  │     stretch)]     │  │
 *   │  │ From natural materials… │  │                   │  │
 *   │  │                         │  │                   │  │
 *   │  │ Lasting Design          │  │                   │  │
 *   │  │ Made to Stay Relevant   │  │                   │  │
 *   │  │ We balance contemporary…│  │                   │  │
 *   │  └─────────────────────────┘  └───────────────────┘  │
 *   └──────────────────────────────────────────────────────┘
 *
 * The "[NN]" tag is rendered by <SectionTag />, which reads its
 * number from the <PageSections> provider so the value auto-matches
 * this section's position in the page. No number lives in the JSON.
 *
 * Layout note: the grid uses `md:items-stretch` so the right column
 * is the same height as the stacked items on the left, and the
 * sticky image inside is `md:h-full` so it fills that height — the
 * image's height therefore tracks the left column's height exactly.
 */

const { heading, subtext, image, items } = approachData as {
  heading: string;
  subtext: string;
  image: { src: string; alt: string };
  items: { category: string; title: string; description: string }[];
};

export default function ApproachSection() {
  return (
    <section
      id="our-approach"
      className="relative w-full bg-[#F2EDE4] text-black"
    >
      <div className="px-6 pt-20 pb-20 lg:px-10 lg:pt-28 lg:pb-32">
        {/* Header — H2 left, [02] right */}
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

        {/* Subtext — right-aligned, ~50% wide on desktop */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-8 text-right text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:w-2/5 md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        {/* Body — items left, sticky image right (both stretch to the same height) */}
        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:items-stretch md:gap-10">
          {/* Left — list of approach items */}
          <div className="md:col-span-7">
            {items.map((item, idx) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + idx * 0.1,
                  ease: 'easeOut',
                }}
                className={[
                  'flex flex-col gap-4 border-t border-black/15 py-10 md:py-14',
                  idx === items.length - 1 ? 'border-b' : '',
                ].join(' ')}
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500 md:text-base">
                  {item.category}
                </p>
                <h3 className="font-serif text-3xl font-light leading-tight text-black md:text-4xl lg:text-5xl">
                  {item.title}
                </h3>
                <h6 className="max-w-xl text-base font-light leading-relaxed text-neutral-700 md:text-xl md:leading-[1.7]">
                  {item.description}
                </h6>
              </motion.div>
            ))}
          </div>

          {/* Right — sticky image, height tracks the left column */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-neutral-200 md:sticky md:top-32 md:h-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
