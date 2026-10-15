'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import type { ProductDetail } from '@/types/product-detail';

/**
 * ProductGallery — full-bleed image gallery. Mirrors ProjectGallery
 * so the two detail page types share the same visual rhythm.
 *
 * Layout (desktop):
 *   ┌─────────────────────────────────────────────────────────┐
 *   │              img 1  (full-width, 16:8)                    │
 *   └─────────────────────────────────────────────────────────┘
 *   ┌──────────────────────┐ ┌──────────────────────┐
 *   │       img 2           │ │       img 3           │
 *   └──────────────────────┘ └──────────────────────┘
 *   ┌──────────────────────┐ ┌──────────────────────┐
 *   │       img 4           │ │       img 5           │
 *   └──────────────────────┘ └──────────────────────┘
 *
 * Layout (mobile): single column, alternating aspect ratios for
 * visual rhythm — the first image is wider (16:10) and the rest are
 * 4:3 to keep things compact on small phones.
 *
 * The gallery is intentionally simple — no lightbox (yet) — because
 * the focus is letting the images speak. Each image gets a subtle
 * zoom on hover via group-hover utility.
 */
export default function ProductGallery({
  product,
}: {
  product: ProductDetail;
}) {
  // Only show 4 images in the gallery (the rest of the data's gallery
  // array is reserved for future expansion). If the product has fewer
  // than 4 images, just show what we have.
  const images = product.gallery.slice(0, 4);

  return (
    <section className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20">
      <div className="px-6 lg:px-10">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-serif text-3xl font-light sm:text-4xl md:text-5xl"
          >
            Selected Views
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="font-serif text-base text-black/50 md:text-lg"
            aria-label="Section 04"
          >
            [ 04 ]
          </motion.span>
        </div>

        {/* Gallery grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {/* First image — full-width on desktop for impact */}
          {images[0] && (
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="group relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-100 md:col-span-2 md:aspect-[16/8]"
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                sizes="(min-width: 768px) 90vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.figure>
          )}

          {/* Remaining images — 2-col on desktop, 1-col on mobile */}
          {images.slice(1).map((image, i) => (
            <motion.figure
              key={`${image.src}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}