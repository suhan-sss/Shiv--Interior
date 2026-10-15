'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import previewData from '@/data/products/preview.json';

/**
 * ProductsPreview — full-bleed parallax image window (third section on /products).
 *
 * The container is exactly 1 viewport tall (110dvh for breathing room).
 * Inside, the image wrapper is 130% the container's height and starts
 * pulled UP by 15%. As the user scrolls past, the wrapper translates
 * DOWN by 15% — so the visible window "opens from the top" and the
 * image slides down to cover the frame. Classic reveal-parallax.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  ┌── image wrapper (130% tall, anchored at −15%) ──┐   │
 *   │  │                                                     │ │
 *   │  │            [ full-bleed interior photo ]           │ │
 *   │  │                                                     │ │
 *   │  └─────────────────────────────────────────────────────┘ │
 *   └──────────────────────────────────────────────────────────┘
 *
 * Image lives in `src/data/products/preview.json`.
 */

const { image } = previewData as {
  image: { src: string; alt: string };
};

export default function ProductsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax — the container scrolls through the full viewport range,
  // and we map progress → translateY 0% → 15%.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section className="relative w-full text-[#1A1A1A] z-10 /*  */">
      <div
        ref={containerRef}
        className="relative w-full h-[110dvh] overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="absolute top-[-15%] left-0 w-full h-[130%]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}