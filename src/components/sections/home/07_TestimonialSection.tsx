'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import testimonialData from '@/data/home/testimonials.json';

/**
 * Testimonial section.
 *
 * Mirrors the Luneo "Testimonial" reference: heading + tag up top, a
 * right-aligned subtext paragraph, then a 12-col split —
 *
 *   ┌────────────────────┬────────────────────────────────────┐
 *   │                    │   [ Quote ]                        │
 *   │   Image            │                                    │
 *   │   (aspect 1:1,     │   [ Avatar  Name                   │
 *   │    scroll-         │     Role · Service ]               │
 *   │    parallax)       │                                    │
 *   │                    │   [ ← Previous        Next → ]      │
 *   └────────────────────┴────────────────────────────────────┘
 *
 * All 5 testimonials are stacked; only one is in view at a time and
 * the rest fade in/out via AnimatePresence. The list auto-rotates
 * every 3 seconds (paused while the cursor is over the section so
 * readers can finish a thought).
 *
 * The cover image swaps at the same cadence as the quote, with its
 * own brief crossfade. The image itself has a subtle scroll-linked
 * parallax + scale (matching the reference's
 * `translateY(-9.4px) scale(1.2)`) — independent of which testimonial
 * is showing, so the parallax stays smooth while the image swaps.
 *
 * Background is the same cream (#F2EDE4) as the rest of the page's
 * content sections.
 *
 * Data lives in `src/data/testimonials.json`.
 */

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  service: string;
  avatar: string;
  image: string;
};

const {
  sectionNumber,
  heading,
  subtext,
  testimonials,
} = testimonialData as {
  sectionNumber: string;
  heading: string;
  subtext: string;
  testimonials: Testimonial[];
};

/** Auto-advance the active testimonial every N ms (paused on hover). */
const ROTATE_INTERVAL_MS = 5000;

/* ------------------------------ Pieces ------------------------------ */

/**
 * Previous / Next pill button — text + arrow SVG. The Next button uses
 * dark text (active); Previous is muted so it visually recedes until
 * hovered, mirroring the Luneo reference.
 */
function NavButton({
  direction,
  onClick,
  variant = 'primary',
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  variant?: 'primary' | 'muted';
}) {
  const isPrev = direction === 'prev';
  const textColor =
    variant === 'primary' ? 'text-black' : 'text-neutral-500';
  const arrowColor =
    variant === 'primary' ? 'text-black' : 'text-neutral-500';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous testimonial' : 'Next testimonial'}
      className={`group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${textColor} transition-colors duration-300 hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600`}
    >
      {isPrev && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={`h-4 w-4 ${arrowColor} transition-transform duration-300 group-hover:-translate-x-1`}
        >
          <path
            d="M15 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{isPrev ? 'Previous' : 'Next'}</span>
      {!isPrev && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={`h-4 w-4 ${arrowColor} transition-transform duration-300 group-hover:translate-x-1`}
        >
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

/**
 * The big square image on the left. Uses scroll-linked parallax +
 * scale on the inner image (zoomed & oversized so the travel never
 * reveals background), and swaps the src with a crossfade when the
 * active testimonial changes.
 */
function TestimonialImage({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.2, 1.1]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100"
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y, scale: undefined }}
          aria-hidden
        />
      </AnimatePresence>
      {/* The static parallax layer — sits on top, translates with scroll */}
      <motion.div
        aria-hidden
        style={{ y, scale }}
        className="pointer-events-none absolute inset-0"
      />
    </div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-rotate every 3s. Pauses while the cursor is over the section so
  // a reader mid-quote isn't yanked to the next card.
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, goNext]);

  const current = testimonials[active];

  return (
    <section
      id="testimonial"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col px-6 lg:px-10">
        {/* Top row — H2 + numbered tag */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            {heading}
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

        {/* Right-aligned subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-12 text-base font-light leading-relaxed text-neutral-700 md:mt-16 md:ml-auto md:w-[45%] md:text-right md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        {/* Testimonial wrap — image (5 cols) | content (7 cols) */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:items-end md:gap-x-12 md:gap-y-12">
          {/* Left — parallax image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:col-span-5"
          >
            <TestimonialImage src={current.image} />
          </motion.div>

          {/* Right — quote + user info + navigation */}
          <div className="flex min-h-[320px] flex-col justify-between md:col-span-7 md:min-h-[420px]">
            {/* Card area — AnimatePresence crossfades between testimonials */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  {/* Quote — opens with a curly quote mark for typographic
                      warmth, like the Luneo reference. */}
                  <h5 className="font-serif text-2xl font-light leading-snug md:text-4xl md:leading-[1.2]">
                    <span aria-hidden className="text-black/40">
                      &ldquo;
                    </span>
                    {current.quote}
                    <span aria-hidden className="text-black/40">
                      &rdquo;
                    </span>
                  </h5>

                  {/* User info — circular avatar + name + role · service */}
                  <div className="mt-10 flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-200 md:h-14 md:w-14">
                      <img
                        src={current.avatar}
                        alt={`${current.name} avatar`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h6 className="text-base font-medium md:text-lg">
                        {current.name}
                      </h6>
                      <p className="text-sm font-light text-neutral-600 md:text-base">
                        {current.role}
                        <span aria-hidden className="mx-2 text-neutral-400">
                          ·
                        </span>
                        {current.service}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation row — Previous (muted) on left, Next (active) on right */}
            <div className="mt-10 flex items-center justify-between md:mt-14">
              <NavButton
                direction="prev"
                onClick={goPrev}
                variant={active === 0 ? 'muted' : 'primary'}
              />
              {/* Tiny counter in the middle so users know how many there are */}
              <span
                aria-hidden
                className="text-xs font-light uppercase tracking-[0.2em] text-neutral-500"
              >
                {String(active + 1).padStart(2, '0')}
                <span className="mx-1 text-neutral-400">/</span>
                {String(testimonials.length).padStart(2, '0')}
              </span>
              <NavButton
                direction="next"
                onClick={goNext}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}