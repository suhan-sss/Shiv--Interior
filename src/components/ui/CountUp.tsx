'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** The final number the counter should reach. */
  value: number;
  /** Animation length in seconds. */
  duration?: number;
  /** Optional delay before the count starts (cascades multiple counters). */
  delay?: number;
  /** What fraction of the element must be visible before the count
   *  starts. Defaults to 0.2 (20%) so it fires once the number is
   *  comfortably on screen on both mobile and desktop. */
  threshold?: number;
  /** Locale string for `toLocaleString()`. Defaults to en-IN. */
  locale?: string;
}

/**
 * CountUp — animates from 0 → `value` once the element enters view.
 *
 * Why native IntersectionObserver?
 * ────────────────────────────────
 * The previous implementation used framer-motion's `useInView` hook,
 * which on mobile browsers (especially Safari iOS with smooth scroll)
 * sometimes doesn't fire its initial callback when the element is
 * already in view at mount — the counters would stay pinned at `0+`.
 * Native IO is what the browser actually uses to track visibility, so
 * we get reliable cross-platform behavior.
 *
 * Animation
 * ─────────
 * `requestAnimationFrame` with cubic ease-out so the value climbs
 * fast, then settles in. The animation runs exactly once per mount
 * (`hasAnimated` ref guard) so re-renders don't replay it.
 *
 * Reduced motion
 * ──────────────
 * If the user has `prefers-reduced-motion: reduce` set, we skip the
 * animation entirely and jump straight to the final value — the
 * number is still visible, just without the count-up.
 */
export default function CountUp({
  value,
  duration = 3,
  delay = 0,
  threshold = 0.2,
  locale = 'en-IN',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Honor user's motion preference — skip the count, show final value.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setFinal = () => {
      setDisplayValue(value);
      hasAnimated.current = true;
    };

    if (prefersReducedMotion) {
      setFinal();
      return;
    }

    let rafId: number | null = null;

    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now() + delay * 1000;

      const tick = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        if (elapsed < 0) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(elapsed / duration, 1);
        // Cubic ease-out — fast start, gentle settle.
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayValue(Math.round(eased * value));

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold },
    );

    observer.observe(element);

    // Safety net: if the observer never fires (very old browser, IO
    // blocked, element already off-screen on mount and never comes
    // back), set the final value after `duration + delay + 1s` so the
    // number doesn't sit at 0 forever.
    const fallback = window.setTimeout(() => {
      if (!hasAnimated.current) {
        runAnimation();
      }
    }, (duration + delay + 1) * 1000);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.clearTimeout(fallback);
    };
  }, [value, duration, delay, threshold]);

  return <span ref={ref}>{displayValue.toLocaleString(locale)}</span>;
}