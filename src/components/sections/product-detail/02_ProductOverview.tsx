'use client';

import { motion } from 'framer-motion';

import type { ProductDetail } from '@/types/product-detail';

/**
 * ProductOverview — the "Design Philosophy" section. Mirrors the
 * PortfolioDetail overview pattern (small `[NN]` tag + serif H2 +
 * long-form intro paragraph) but is a single column — products don't
 * have a Challenge/Solution narrative arc like projects do, so the
 * split layout would feel forced.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  Design Philosophy                          [ 02 ]       │
 *   │  ───────                                                 │
 *   │                                                          │
 *   │  <overview paragraph — 3-5 sentences about the product>  │
 *   └──────────────────────────────────────────────────────────┘
 */
export default function ProductOverview({
  product,
}: {
  product: ProductDetail;
}) {
  return (
    <section className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        {/* Section header — `[ 02 ]` tag + heading */}
        <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-light sm:text-4xl md:text-5xl"
          >
            Design Philosophy
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="font-serif text-base text-black/50 md:text-lg"
            aria-label="Section 02"
          >
            [ 02 ]
          </motion.span>
        </div>

        {/* Overview — long-form intro paragraph. Generous leading
            (1.7) and max-w-3xl so the line length stays comfortable
            for sustained reading. */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 max-w-3xl text-base font-light leading-[1.7] text-neutral-800 md:mt-12 md:text-lg md:leading-[1.8]"
        >
          {product.overview}
        </motion.p>
      </div>
    </section>
  );
}