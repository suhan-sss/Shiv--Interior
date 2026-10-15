'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import type { ProductDetail } from '@/types/product-detail';

/**
 * ProductHero — full-bleed cover image with overlaid tag, title, and
 * right-aligned tagline. Mirrors the portfolio detail hero so the two
 * detail page types feel like one family.
 *
 *   ┌───────────────────────────────────────────────────────┐
 *   │  [ Dark pill: category tag ]                           │
 *   │  H1 product title                                     │
 *   │                                                       │
 *   │                          (right-aligned tagline)       │
 *   │                          A statement piece for the…    │
 *   └───────────────────────────────────────────────────────┘
 *   [ …………………………… COVER IMAGE …………………………… ]
 *
 * The cover image is the section background (absolute, full-bleed);
 * a subtle dark gradient at the bottom ensures the tagline reads on
 * light photos. The content overlay uses a flex-justify-between
 * layout so the title sits at the top and the tagline sits at the
 * bottom of the viewport on desktop.
 */
export default function ProductHero({ product }: { product: ProductDetail }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#1c1c1a] text-[#F2EDE4]">
      {/* Cover image — full-bleed, behind the content. */}
      <div className="absolute inset-0">
        <Image
          src={product.heroImage.src}
          alt={product.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Subtle vignette so light/airy photos don't wash out the text
            overlay. Pointer-events-none so it doesn't block taps on any
            future CTAs placed on top. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55"
        />
      </div>

      {/* Content overlay — min-h-screen ensures the section always shows
          the full cover even on tall screens. */}
      <div className="relative flex min-h-[88dvh] flex-col justify-between px-6 pb-12 pt-32 md:min-h-[92dvh] md:px-10 md:pb-16 md:pt-40 lg:min-h-screen">
        {/* Top content — tag + title */}
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F2EDE4] backdrop-blur md:text-sm"
          >
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full bg-amber-400"
            />
            {product.category}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="max-w-4xl font-serif text-4xl font-light leading-[1.05] text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {product.title}
          </motion.h1>
        </div>

        {/* Bottom content — right-aligned tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-12 md:mt-20 lg:mt-32"
        >
          <div className="md:ml-auto md:max-w-2xl md:text-right">
            <p className="font-serif text-lg font-light leading-snug text-white/90 md:text-xl md:leading-[1.5] lg:text-2xl">
              {product.tagline}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}