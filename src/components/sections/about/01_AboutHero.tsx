'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import heroData from '@/data/about/hero.json';

/**
 * AboutHero — top of the /about route.
 *
 * Two-band layout: the heading band uses the shared `/ Label` +
 * border-b + staggered-slide-up headline pattern (matching the
 * contact and products heroes), and below it sits a deck of
 * overlapping portrait cards. The image deck is full-bleed within
 * the header's horizontal padding column and stands 80dvh tall.
 * Every 4 seconds the front card rotates, and the whole deck
 * parallaxes as the user scrolls past.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  / About                                                 │
 *   │  ──────────────────────────────────────────────────────  │
 *   │  The studio                                              │
 *   │  behind the spaces.                                      │
 *   │              We approach every space with intention…    │
 *   │  ──────────────────────────────────────────────────────  │
 *   ├──────────────────────────────────────────────────────────┤
 *   │                                                           │
 *   │  ┌─────── stacked portrait deck (80dvh, full-bleed) ───┐ │
 *   │  │ front  ─── ken burns + parallax (slower than scroll) │ │
 *   │  │ behind1 (offset, dim)                                 │ │
 *   │  │ behind2 (more offset, dimmer)                         │ │
 *   │  └───────────────────────────────────────────────────────┘ │
 *   └──────────────────────────────────────────────────────────┘
 */

const { label, lines, subtext } = heroData as {
  label: string;
  lines: string[];
  subtext: string;
};

/* Stagger container — controls cadence for the per-line motion. */
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* Per-line slide-up — pushes the line down 120% of its height
   (clipped by the wrapping overflow-hidden span) so it appears
   to rise into place once visible. */
const lineVariants = {
  hidden: { y: '120%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

type Portrait = {
  src: string;
  alt: string;
};

const portraits: Portrait[] = [
  {
    src: 'https://framerusercontent.com/images/jUWNrPDlMhHHMXperEiwRX9Ao.jpg',
    alt: 'Shiv Interior studio and team image',
  },
  {
    src: 'https://framerusercontent.com/images/m0KP7RtySZPyBxO2zkJRPgK0A.jpg',
    alt: 'Shiv Interior studio and team image',
  },
  {
    src: 'https://framerusercontent.com/images/Gd958YdcceMpHXysQgUg0GERNYw.jpg',
    alt: 'Shiv Interior studio and team image',
  },
  {
    src: 'https://framerusercontent.com/images/yhldyykwU5S6qHv5hCyIRLb8sM.jpg',
    alt: 'Shiv Interior studio and team image',
  },
  {
    src: 'https://framerusercontent.com/images/YasFy82xr2m7KIh1EiyW5t6ENc.jpg',
    alt: 'Shiv Interior studio and team image',
  },
  {
    src: 'https://framerusercontent.com/images/YxeSxYKCno2WwM7mmeX4Lp4XLE.jpg',
    alt: 'Shiv Interior studio and team image',
  },
];

const IMAGE_ADVANCE_MS = 4000;

/**
 * Overlapping portrait deck.
 *
 * Layout
 *   • Container is 80dvh tall and full-bleed within the header's
 *     horizontal padding column (same `px-6 lg:px-10` as the heading).
 *   • Each portrait sits at one of three depth slots — front (full
 *     opacity, Ken Burns), behind1 (offset, dim), behind2 (more
 *     offset, dimmer). Every 4 s the active index advances.
 *
 * Parallax
 *   • The image wrapper inside every card translates from 0% to
 *     -10% as the user scrolls past the container. The image
 *     wrapper itself is 110% the card's height (top-aligned) so
 *     the extra room at the bottom is invisible at rest, and the
 *     card stays fully covered as the image slides up.
 *   • Combined with the front card's Ken Burns scale (1 → 1.04),
 *     the front image feels like it's floating above the others
 *     while drifting at a slower speed than the page.
 *
 * Timer
 *   • Heartbeat at 250 ms that compares `performance.now()` against
 *     the last advance — drift-free across tab visibility.
 */
function HeroImageStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax — scroll-driven translateY on the image wrapper inside
  // each card. As the container scrolls from top-of-viewport to
  // out-of-viewport, the image shifts up 10% of its height (slower
  // than the 100% the container travels) — classic parallax lag.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  // Auto-advance timer for the deck rotation.
  const lastAdvanceRef = useRef<number>(performance.now());
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (portraits.length <= 1) return;

    const tick = () => {
      if (document.hidden) return;
      const elapsed = performance.now() - lastAdvanceRef.current;
      if (elapsed >= IMAGE_ADVANCE_MS) {
        setActiveIdx((i) => (i + 1) % portraits.length);
        lastAdvanceRef.current = performance.now();
      }
    };

    tickRef.current = setInterval(tick, 250);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[80dvh] w-full overflow-hidden rounded-2xl"
      role="group"
      aria-label="Studio image gallery"
    >
      {portraits.map((p, idx) => {
        const depth = (idx - activeIdx + portraits.length) % portraits.length;
        const isFront = depth === 0;
        const isBehind1 = depth === 1;
        const isBehind2 = depth === 2;

        return (
          <motion.div
            key={p.src}
            initial={false}
            animate={{
              opacity: isFront ? 1 : isBehind1 ? 0.55 : isBehind2 ? 0.3 : 0,
              scale: isFront ? 1 : isBehind1 ? 0.95 : 0.9,
              y: isFront ? 0 : isBehind1 ? 14 : 28,
              rotate: isFront ? 0 : isBehind1 ? -2 : 1.5,
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ zIndex: portraits.length - depth }}
            className="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]"
          >
            {/*
              Image wrapper is 110% the card height and top-aligned,
              so the bottom 10% extends below the card (clipped). As
              it parallaxes up to -10%, the image slides up but the
              card remains fully covered.
            */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[110%]"
              style={{ y: parallaxY }}
              animate={isFront ? { scale: [1, 1.04] } : { scale: 1 }}
              transition={
                isFront
                  ? { duration: IMAGE_ADVANCE_MS / 1000, ease: 'linear' }
                  : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="100vw"
                priority={idx < 3}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AboutHero() {
  return (
    <section className="relative w-full bg-[#F2EDE4] text-black">
      {/* Top content — `/ Label` + border + staggered headline + subtext. */}
      <div className="w-full px-6 pt-32 lg:px-10">
        <div className="border-b border-black/10 pb-6 mb-12 md:mb-16">
          <p className="text-sm md:text-base opacity-60 font-medium">
            / {label}
          </p>
        </div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              <span
                className={`inline-flex overflow-hidden pb-2 -mb-2 ${
                  index === 0 ? 'md:ml-[7vw] lg:ml-[15vw]' : ''
                }`}
              >
                <motion.span variants={lineVariants} className="inline-block">
                  {line}
                </motion.span>
              </span>

              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:mt-20 md:w-[45%] md:text-right md:text-xl md:leading-[1.7]"
        >
          {subtext}
        </motion.p>

        <div
          aria-hidden
          className="mt-10 h-px w-full bg-black/15 md:mt-14"
        />
      </div>

      {/* Image band — same horizontal padding as the header above,
          full-bleed inside that padding, 80dvh tall. Parallax + auto-
          advancing deck inside. */}
      <div className="px-6 pt-12 pb-20 md:px-10 md:pt-16 md:pb-28">
        <HeroImageStack />
      </div>
    </section>
  );
}