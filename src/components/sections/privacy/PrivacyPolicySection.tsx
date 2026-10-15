'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import policy from '@/data/privacy/privacy-policy.json';
import ctaData from '@/data/privacy/cta.json';

/**
 * Privacy Policy section — single full-page section that powers
 * `/privacy-policy`.
 *
 * Mirrors the Framer HTML reference: a small pill ("Privacy Policy")
 * above a serif H1 ("Your Privacy, Our Promise"), with a right-aligned
 * subtext paragraph underneath. Then a hairline divider, then the intro
 * + 13 numbered sections (some with bullet lists inside), then a
 * closing CTA band.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  ● Privacy Policy                                        │
 *   │                                                          │
 *   │  Your Privacy, Our Promise                                │
 *   │                                                          │
 *   │   (right-aligned subtext)                                │
 *   │ ─────────────────────────────────────────────────────────│
 *   │ <intro paragraphs>                                       │
 *   │                                                          │
 *   │ 1. Information We Collect                                │
 *   │ <paragraph>                                              │
 *   │ <paragraph>                                              │
 *   │                                                          │
 *   │ 2. How We Use Your Information                           │
 *   │ <paragraph>                                              │
 *   │ • bullet                                                 │
 *   │ • bullet                                                 │
 *   │ <paragraph>                                              │
 *   │ ...                                                      │
 *   ├──────────────────────────────────────────────────────────┤
 *   │                                          [ 02 ]          │
 *   │   Questions About How We Handle Your Data?               │
 *   │   <subtext>      [ Get In Touch ● ]                      │
 *   └──────────────────────────────────────────────────────────┘
 *
 * All copy lives in `src/data/privacy/privacy-policy.json` (body) and
 * `src/data/privacy/cta.json` (closing CTA band).
 */

/* ------------------------------ Types ------------------------------ */

type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

type PrivacySection = {
  id: string;
  title: string;
  blocks: Block[];
};

const { pillLabel, heading, subtext, introBlocks, sections } = policy as {
  pillLabel: string;
  heading: string;
  subtext: string;
  introBlocks: Block[];
  sections: PrivacySection[];
};

const { sectionNumber, label, subtext: ctaSubtext, cta } = ctaData as {
  sectionNumber: string;
  label: string;
  heading: string;
  subtext: string;
  cta: { label: string; href: string };
};

const ctaHeading = ctaData.heading as string;

/* ----------------------------- Pieces ----------------------------- */

/** Pill — small rounded-full muted background with the label centered. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#7A756B] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F2EDE4] md:text-sm">
      {children}
    </span>
  );
}

/** Hairline — 1px black/10 divider, matches the rest of the site. */
function Hairline() {
  return (
    <div
      aria-hidden
      className="h-px w-full bg-black/10"
    />
  );
}

/**
 * Renders one block from a section's `blocks[]` array — either a
 * paragraph or a bullet list. Bullets use the same body typography as
 * paragraphs (text-neutral-700, font-light) with a small dot bullet
 * matching the site's BulletList style.
 */
function BlockRenderer({ block }: { block: Block }) {
  if (block.type === 'ul') {
    return (
      <ul className="space-y-3 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3">
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

  return (
    <p className="text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
      {block.text}
    </p>
  );
}

/**
 * Section body — numbered heading (`1. Information We Collect`) on top,
 * then mixed paragraphs / bullet lists underneath. Number is the
 * section's array index + 1.
 */
function SectionBody({
  index,
  section,
}: {
  index: number;
  section: PrivacySection;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      id={section.id}
      className="scroll-mt-24"
    >
      <h2 className="font-serif text-2xl font-light leading-tight md:text-3xl">
        <span className="font-semibold">{index + 1}.</span>{' '}
        {section.title}
      </h2>

      <div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </motion.section>
  );
}

/** Dark pill CTA — cream text + cream-bordered circle on the right. */
function PrimaryCTA({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex h-14 items-center gap-4 rounded-full bg-black px-7 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 md:h-16"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em] md:text-base">
        {label}
      </span>
      <span
        aria-hidden
        className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45 md:h-7 md:w-7"
      />
    </Link>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function PrivacyPolicySection() {
  return (
    <div className="bg-[#F2EDE4] text-black">
      {/* ============================== HERO ============================== */}
      <section className="w-full bg-[#F2EDE4] py-12 md:py-16 lg:py-20">
        <div className="px-6 lg:px-10">
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Pill>{pillLabel}</Pill>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 max-w-5xl font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:mt-14 md:text-7xl"
          >
            {heading}
          </motion.h1>

          {/* Subtext — right-aligned on desktop, left-aligned on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-10 text-left text-base font-light leading-relaxed text-neutral-700 md:mt-14 md:text-right md:text-lg md:leading-[1.7]"
          >
            {subtext}
          </motion.p>
        </div>
      </section>

      {/* ============================ DIVIDER ============================ */}
      <div className="px-6 lg:px-10">
        <Hairline />
      </div>

      {/* ============================== BODY ============================== */}
      <section className="bg-[#F2EDE4] py-10 md:py-14 lg:py-16">
        <div className="px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            {/* Intro */}
            <div className="space-y-5 md:space-y-6">
              {introBlocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Numbered sections */}
            <div className="mt-12 space-y-14 md:mt-16 md:space-y-20">
              {sections.map((section, i) => (
                <SectionBody key={section.id} index={i} section={section} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CLOSING CTA ============================ */}
      <section className="relative w-full overflow-hidden bg-[#F2EDE4] text-black">
        <div className="px-6 py-12 lg:px-10 lg:py-16">
          {/* Header row — Heading (left) + [02] tag (right) */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl"
            >
              {ctaHeading}
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

          {/* Label kicker + body — subtext on left, CTA pill on right */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-black/60 md:text-base"
          >
            {label}
          </motion.p>

          <div className="mt-16 grid grid-cols-1 items-end gap-8 md:mt-20 md:grid-cols-12 md:gap-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="max-w-md text-base font-light leading-relaxed text-neutral-700 md:col-span-7 md:text-xl md:leading-[1.7]"
            >
              {ctaSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="md:col-span-5 md:flex md:justify-end"
            >
              <PrimaryCTA href={cta.href} label={cta.label} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}