'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import previewData from '@/data/contact/preview.json';

/**
 * ContactPreview — image parallax window between the hero and the
 * consultation form.
 *
 * Reads `image.src/alt` and the parallax tuning values from
 * `src/data/contact/preview.json`:
 *
 *   - containerHeight   → height of the scroll-bound window (e.g. "110dvh")
 *   - parallaxTravel   → "-15% to +15%" → y translation range
 *   - imageHeight      → "130%" of the container, expressed as a
 *                        percentage — converted at runtime into dvh so
 *                        the inner div has a real, non-collapsed height
 *   - imageTopOffset   → "-15%" — same conversion: a percentage of the
 *                        container resolved into dvh
 *
 * Net effect: the image box is fixed, the image inside it scrolls past
 * from top to bottom while the surrounding page scrolls normally.
 */

const { image, containerHeight, parallaxTravel, imageHeight, imageTopOffset } =
  previewData as {
    image: { src: string; alt: string };
    containerHeight: string;
    parallaxTravel: string;
    imageHeight: string;
    imageTopOffset: string;
  };

// Parse "-15% to +15%" into [from, to] for useTransform.
function parseTravel(range: string): [string, string] {
  const [from, to] = range.split(/\s*to\s*/);
  return [from.trim(), to.trim()];
}

/**
 * Convert a percentage-of-container value (e.g. "130%" against a
 * "110dvh" container) into a concrete dvh string ("143dvh") so the
 * inner div has a real, viewport-relative height. Returns the original
 * string if either side doesn't look like percentage-of-dvh.
 *
 *   percentageToDvh("130%", "110dvh") → "143dvh"
 *   percentageToDvh("-15%", "110dvh") → "-16.5dvh"
 *   percentageToDvh("100%",  "100px")  → "100px"   (untouched)
 */
function percentageToDvh(value: string, against: string): string {
  const pctMatch = value.match(/^(-?\d+(?:\.\d+)?)%$/);
  const dvhMatch = against.match(/^(-?\d+(?:\.\d+)?)dvh$/);
  if (!pctMatch || !dvhMatch) return value;
  const pct = parseFloat(pctMatch[1]);
  const base = parseFloat(dvhMatch[1]);
  const resolved = (pct * base) / 100;
  return `${resolved}dvh`;
}

export default function ContactPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [yFrom, yTo] = parseTravel(parallaxTravel);

  // Convert "130%" → "143dvh" so the inner div has real height.
  const imageH = percentageToDvh(imageHeight, containerHeight);
  const imageTop = percentageToDvh(imageTopOffset, containerHeight);

  // Track scroll progress through the image container.
  // "start end" → starts when top of container hits bottom of viewport
  // "end start" → ends when bottom of container hits top of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // The image translates from yFrom → yTo as you scroll past the container.
  const y = useTransform(scrollYProgress, [0, 1], [yFrom, yTo]);

  return (
    <section className="relative w-full text-[#1A1A1A] z-10 ">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: containerHeight }}
      >
        <motion.div style={{ y }} className="absolute left-0 w-full">
          <div
            className="relative w-full"
            style={{
              top: imageTop,
              height: imageH,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}