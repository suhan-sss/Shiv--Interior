'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * ProductCTA — closing call-to-action band on the product detail
 * page. Mirrors ProjectCTA exactly so the two detail page types
 * end the same way.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │                                          [ 05 ]          │
 *   │                                                          │
 *   │   Found the right desk for your office?                   │
 *   │   Let's design yours.                                     │
 *   │                                                          │
 *   │   <subtext>                  [ Book Consultation ●]      │
 *   └──────────────────────────────────────────────────────────┘
 *
 * The CTA links to `/contact` where the actual inquiry form lives.
 */
export default function ProductCTA() {
  return (
    <section
      id="product-cta"
      className="relative w-full overflow-hidden bg-[#F2EDE4] text-black"
    >
      <div className="px-6 py-12 lg:px-10 lg:py-16">
        {/* Header row — Heading (left) + [05] tag (right) */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            Found the right desk
            <br />
            for your office?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label="Section 05"
          >
            <span>[</span>
            <span>05</span>
            <span>]</span>
          </motion.div>
        </div>

        {/* Body — subtext on the left, CTA pill on the right */}
        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:mt-16 md:grid-cols-12 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="max-w-md text-base font-light leading-relaxed text-neutral-700 md:col-span-7 md:text-xl md:leading-[1.7]"
          >
            Every desk we build is custom. Tell us about your space, your
            team, and how you work &mdash; we&rsquo;ll come back with a
            considered proposal inside 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="md:col-span-5 md:flex md:justify-end"
          >
            <Link
              href="/contact"
              className="group inline-flex h-14 items-center gap-4 rounded-full bg-black px-7 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 md:h-16"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] md:text-base">
                Book A Consultation
              </span>
              <span
                aria-hidden
                className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45 md:h-7 md:w-7"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}