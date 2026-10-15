'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * 404 — "This space doesn't exist."
 *
 * Matches the Shiv Interior visual language:
 *   - cream surface (#F2EDE4) like every other page
 *   - giant "404" logomark in light gray filling the background
 *   - "This space doesn't exist." H4 + [01] section tag, centered
 *   - muted subtext below
 *   - "Back to Home" pill button with the small dark ring on the right
 *
 * Renders for any unmatched route under the app router.
 */
export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-[#F2EDE4] text-black">
      {/* Giant background "404" — centered using a fixed-width row so the
            glyph's optical baseline (taller than the line-box) lands dead
            in the middle of the viewport. Shifted up ~100px so it sits
            behind the upper half of the foreground content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(-200px)' }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="select-none font-serif text-[38vw] font-bold leading-none tracking-tighter text-black/[0.07]"
          style={{ transformOrigin: 'center center' }}
        >
          404
        </motion.span>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
        {/* Heading row: H4 + [01] tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex w-full max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-1"
        >
          <h1 className="font-sans text-2xl font-medium tracking-tight md:text-3xl">
            This space doesn&rsquo;t exist.
          </h1>
          <span
            aria-label="Section 01"
            className="text-base font-medium text-black/60 md:text-lg"
          >
            [01]
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 max-w-md text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]"
        >
          The page you&rsquo;re looking for may have moved, been removed, or
          never existed.
        </motion.p>

        {/* Back to Home pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/"
            className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border-[1.5px] border-black bg-black px-7 text-[#F2EDE4] transition-colors duration-300 hover:border-amber-700 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">
              Back to Home
            </span>
            <span
              aria-hidden
              className="block h-6 w-6 rounded-full border-[1.5px] border-current transition-transform duration-500 ease-out group-hover:rotate-45"
            />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}