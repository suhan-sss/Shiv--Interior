'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import videoData from '@/data/home/video.json';

/**
 * Video / Inside-the-studio section.
 *
 * Full-bleed looping video background, a subtle dark gradient for
 * legibility, and content split between the top and bottom of the
 * screen — the heading lives up top with breathing room, the
 * subtext + CTA sit at the bottom, and the video fills the middle.
 *
 *   ┌────────────────────────────────────────┐
 *   │  [ H2 "Inside Shiv Interior"   [ 05 ] ]│   ← top group (pt-32)
 *   │                                        │
 *   │                                        │
 *   │           VIDEO BACKGROUND             │
 *   │           (loop · autoplay · muted)    │
 *   │                                        │
 *   │                                        │
 *   │  [ subtext paragraph ]   [ Secondary CTA ]   ← bottom (pb-20)
 *   └────────────────────────────────────────┘
 *
 * Height = viewport minus the fixed header (64px on mobile, 76px on
 * desktop — matches the Header component's actual height).
 * Keeps the video from extending behind the header.
 *
 * The "secondary" CTA inverts colors (cream bg, dark text/border)
 * so it pops against the dark gradient.
 *
 * The video URL and poster image live in `src/data/video.json`.
 */

const { sectionNumber, heading, subtext, cta, video } = videoData;

/**
 * The "secondary" CTA — cream pill with dark text + dark-bordered
 * circle. Inverts to brand amber on hover for a clear affordance.
 */
function SecondaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center gap-4 rounded-full bg-[#F2EDE4] px-6 text-black transition-colors duration-300 hover:bg-amber-700 hover:text-[#F2EDE4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <span
        aria-hidden
        className="block h-6 w-6 rounded-full border-[1.5px] border-black transition-[transform,border-color] duration-500 ease-out group-hover:rotate-45 group-hover:border-[#F2EDE4]"
      />
    </Link>
  );
}

export default function VideoSection() {
  return (
    <section
      id="studio"
      className="relative h-[calc(100dvh-64px)] min-h-[400px] w-full overflow-hidden bg-black text-[#F2EDE4] md:h-[calc(100dvh-76px)]"
    >
      {/* Looping video background. `muted` is required for autoplay
          to work in modern browsers; `playsInline` allows it on iOS. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={video.poster}
        src={video.src}
        aria-hidden
      />

      {/* Subtle dark gradient for text legibility — the video stays
          visible behind it but the cream text reads cleanly. */}
      <div aria-hidden className="absolute inset-0 bg-black/15" />

      {/* Top-anchored heading + bottom-anchored subtext/CTA, with the
          video filling the middle. justify-between spreads the two
          groups to opposite ends of the screen. */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-6 lg:px-10">
        {/* Top group — heading + tag */}
        <div className="pt-20 md:pt-28 lg:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
            >
              {heading}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="flex items-center gap-2 text-2xl font-medium text-[#F2EDE4]/60 sm:text-3xl md:text-4xl"
              aria-label={`Section ${sectionNumber}`}
            >
              <span>[</span>
              <span>{sectionNumber}</span>
              <span>]</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom group — subtext + secondary CTA */}
        <div className="pb-20 md:pb-28 lg:pb-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-lg font-bold leading-relaxed text-[#F2EDE4]/80 md:col-span-7 md:text-xl md:leading-[1.7]"
            >
              {subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className="md:col-span-5 md:flex md:justify-end"
            >
              <SecondaryCTA href={cta.href} label={cta.label} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}