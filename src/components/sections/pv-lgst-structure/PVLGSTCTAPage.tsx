'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import ctaData from '@/data/pv-lgst-structure/cta-page.json';

/**
 * PVLGSTCTAPage — dedicated CTA landing page for the PV & LGSF
 * Structure route, mounted at `/products/pv-lgst-structure/contact`.
 *
 * Mirrors the site's cream + sand visual system: a hero band on top
 * with a big serif headline + subtext + dark CTA pill, then a 4-card
 * feature grid (sand) underneath, then a closing CTA band.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  [ 01 ]                                                 │
 *   │                                                          │
 *   │  Let's Build Your PV & LGSF Project                     │
 *   │                                                          │
 *   │  <subtext paragraph>                                    │
 *   │                                          [ Book A … ● ] │
 *   ├──────────────────────────────────────────────────────────┤
 *   │  [ card ] [ card ] [ card ] [ card ]                    │
 *   │  Custom   AZ 150   Fast       Earthquake                │
 *   │  Engineered Galvalume Erection Resistant               │
 *   ├──────────────────────────────────────────────────────────┤
 *   │  Ready to begin?                                         │
 *   │  <subtext>      [ Book A Consultation ● ]              │
 *   └──────────────────────────────────────────────────────────┘
 *
 * All copy lives in `src/data/pv-lgst-structure/cta-page.json`.
 */

type Feature = {
  title: string;
  description: string;
};

const {
  sectionNumber,
  label,
  heading,
  subtext,
  features,
  cta,
} = ctaData as {
  sectionNumber: string;
  label: string;
  heading: string;
  subtext: string;
  features: Feature[];
  cta: { label: string; href: string };
};

/* ----------------------------- Pieces ----------------------------- */

/** Section heading — small horizontal rule on the left of the serif H2. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-4 font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:gap-6 md:text-7xl">
      <span
        aria-hidden
        className="block h-[2px] w-10 shrink-0 bg-black md:w-14"
      />
      {children}
    </h2>
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

/** One sand feature card — small uppercase label + title + body. */
function FeatureCard({
  feature,
  delay = 0,
}: {
  feature: Feature;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="flex h-full flex-col rounded-2xl bg-[#E8DCC4] p-6 text-black md:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60 md:text-sm">
        [ Feature ]
      </p>
      <h3 className="mt-4 font-serif text-2xl font-light leading-tight md:text-3xl">
        {feature.title}
      </h3>
      <p className="mt-4 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
        {feature.description}
      </p>
    </motion.article>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function PVLGSTCTAPage() {
  return (
    <main className="bg-[#F2EDE4] text-black">
      {/* ============================== HERO ============================== */}
      <section className="relative w-full overflow-hidden bg-[#F2EDE4] py-12 md:py-16 lg:py-20">
        <div className="px-6 lg:px-10">
          {/* Top row — section number tag (right) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-end gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label={`Section ${sectionNumber}`}
          >
            <span>[</span>
            <span>{sectionNumber}</span>
            <span>]</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 max-w-4xl font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:mt-14 md:text-7xl"
          >
            {heading}
          </motion.h1>

          {/* Label kicker (small uppercase above subtext) */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-black/60 md:text-base"
          >
            {label}
          </motion.p>

          {/* Body — subtext on the left, CTA pill on the right */}
          <div className="mt-16 grid grid-cols-1 items-end gap-8 md:mt-20 md:grid-cols-12 md:gap-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="max-w-xl text-base font-light leading-relaxed text-neutral-700 md:col-span-7 md:text-xl md:leading-[1.7]"
            >
              {subtext}
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

      {/* ========================== FEATURES ========================== */}
      <section className="bg-[#F2EDE4] py-12 md:py-16 lg:py-20">
        <div className="px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionHeading>Why Shiv Indoor</SectionHeading>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CLOSING CTA ============================ */}
      <section className="bg-[#F2EDE4] py-12 md:py-16 lg:py-20">
        <div className="px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            Ready to begin?
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 items-end gap-8 md:mt-20 md:grid-cols-12 md:gap-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="max-w-md text-base font-light leading-relaxed text-neutral-700 md:col-span-7 md:text-xl md:leading-[1.7]"
            >
              Share your site details and we'll prepare a feasibility note +
              indicative cost within 48 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="md:col-span-5 md:flex md:justify-end"
            >
              <PrimaryCTA href={cta.href} label={cta.label} />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}