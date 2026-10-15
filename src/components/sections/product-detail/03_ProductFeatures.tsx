'use client';

import { motion } from 'framer-motion';

import type { ProductDetail } from '@/types/product-detail';

/**
 * ProductFeatures — the "Crafted Details" section. Two parts:
 *
 *   1. Features bullet list (left)  — what the product does
 *   2. Specs grid (right)           — what's the table-stakes data
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Crafted Details                            [ 03 ]       │
 *   │  ─────                                                 ║
 *   │                                                          │
 *   │  FEATURES                       SPECIFICATIONS           │
 *   │  • Hand-finished top            Dimensions   2.0m × 1.0m │
 *   │  • Cable management …           Height       760mm      │
 *   │  • Integrated power module      Lead Time    8–12 weeks │
 *   │  • …                            Warranty     10 yr …     │
 *   │                                                          │
 *   │  ─── MATERIALS & FINISHES ────                          │
 *   │  Veneer — Walnut · Oak · Teak · Mahogany · Ebony         │
 *   │  Solid — Sapelli · Beech · Maple                         │
 *   │  Top inlay — Leather · Marble · Sintered stone           │
 *   │                                                          │
 *   │  ─── CUSTOMIZATION ────                                  │
 *   │  Custom dimensions · Integrated AV · Lockable pedestal   │
 *   └──────────────────────────────────────────────────────────┘
 *
 * Mobile: stacks to single column. Tablet+: features on left,
 * specs on right.
 */
export default function ProductFeatures({
  product,
}: {
  product: ProductDetail;
}) {
  return (
    <section className="w-full bg-[#E8DCC4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-light sm:text-4xl md:text-5xl"
          >
            Crafted Details
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="font-serif text-base text-black/50 md:text-lg"
            aria-label="Section 03"
          >
            [ 03 ]
          </motion.span>
        </div>

        {/* Features (left) + Specs (right) */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:gap-12">
          {/* Features — bullet list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 md:text-sm">
              Features
            </h3>
            <ul className="mt-5 space-y-3 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Specs — 2x2-ish dl grid */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-x-12 gap-y-8"
          >
            {product.specs.map((spec, i) => (
              <div key={spec.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50 md:text-sm">
                  {spec.label}
                </dt>
                <dd className="mt-3 text-base font-light leading-relaxed text-neutral-900 md:text-lg md:leading-[1.6]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Materials — chip rows under a hairline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 border-t border-black/15 pt-8 md:mt-16"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 md:text-sm">
            Materials & Finishes
          </h3>
          <ul className="mt-5 space-y-2 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
            {product.materials.map((material) => (
              <li key={material} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                />
                <span>{material}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Customization — same pattern as materials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className="mt-10 border-t border-black/15 pt-8"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 md:text-sm">
            Customization
          </h3>
          <ul className="mt-5 space-y-2 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
            {product.customization.map((option) => (
              <li key={option} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Lead time — split into label + body value. Originally this
            was a single `uppercase tracking-[0.2em]` paragraph, but the
            value runs "8–12 weeks from design approval; 4-week rush
            option available on request." (~90 chars). With text-xs +
            uppercase + 0.2em tracking each glyph is ~14px wide, so on
            a 312px-wide mobile content area it wrapped to 4-5 lines of
            spaced-out caps — looked broken. Splitting mirrors the
            Materials & Customization sections directly above. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="mt-10 border-t border-black/15 pt-8"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 md:text-sm">
            Lead Time
          </h3>
          <p className="mt-4 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
            {product.leadTime}
          </p>
        </motion.div>
      </div>
    </section>
  );
}