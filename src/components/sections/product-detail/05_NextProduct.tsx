'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import type { ProductDetail } from '@/types/product-detail';

/**
 * NextProduct — closing band that hands the reader off to the next
 * product in the sequence. Mirrors NextProject (portfolio detail's
 * closing band) so the two detail page types share the same visual
 * handoff.
 *
 *   Default layout (multiple products with detail data):
 *     ┌────────────────────────────────────────────────────────┐
 *     │                       Next Product                     │
 *     │                          ──                           │
 *     │                                                        │
 *     │                  → [ Product title ]                    │
 *     │                  → [ category ]                        │
 *     └────────────────────────────────────────────────────────┘
 *
 *   Catalog fallback (only one product with detail data, or when
 *   the wrap-around would loop to the same product):
 *     ┌────────────────────────────────────────────────────────┐
 *     │                     All Products                       │
 *     │                       ──                               │
 *     │                                                        │
 *     │        Explore the full catalog  →                      │
 *     └────────────────────────────────────────────────────────┘
 *
 * `currentProductId` is required so we can detect the wrap-around
 * case (`nextProduct.id === currentProductId`) and swap the panel
 * to a "back to catalog" variant linking to `/products`.
 */
export default function NextProduct({
  nextProduct,
  currentProductId,
}: {
  nextProduct: ProductDetail;
  currentProductId: string;
}) {
  const isWrapAround = nextProduct.id === currentProductId;

  return (
    <section className="relative w-full overflow-hidden bg-black text-[#F2EDE4]">
      {/* Background — the next product's hero image at low opacity so
            the CTA text reads cleanly on top. */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src={nextProduct.heroImage.src}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      <Link
        // Wrap-around → send the user back to the catalog listing
        // instead of looping to the current product again.
        href={isWrapAround ? '/products' : `/products/${nextProduct.id}`}
        className="group relative flex min-h-[60dvh] flex-col items-start justify-center gap-8 px-6 py-16 md:min-h-[70dvh] md:px-10 md:py-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2EDE4]/70 md:text-sm"
        >
          {isWrapAround ? 'All Products' : 'Next Product'}
        </motion.span>

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="block h-px w-16 origin-left bg-[#F2EDE4]/40"
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-4xl font-light leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {isWrapAround ? 'Explore the full catalog.' : nextProduct.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="mt-2 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F2EDE4]/80 md:text-sm"
        >
          <span>
            {isWrapAround ? 'Browse all products' : nextProduct.category}
          </span>
          <span
            aria-hidden
            className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4]/70 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:rotate-45"
          />
        </motion.div>
      </Link>
    </section>
  );
}