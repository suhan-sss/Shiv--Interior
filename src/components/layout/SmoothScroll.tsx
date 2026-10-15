'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import type { Lenis, LenisOptions } from 'lenis';

/**
 * Premium smooth-scroll provider powered by Lenis (https://lenis.darkroom.engineering).
 * Mount once near the root of your app, wrapping the children you want
 * to smooth-scroll. Sticky headers / fixed navs etc. can stay outside the
 * provider — they don't need to be wrapped.
 *
 *     <SmoothScroll>
 *       <main>{children}</main>
 *     </SmoothScroll>
 *
 * Behavior:
 *   - `lerp: 0.1` — lower = snappier, higher = floatier (range 0.05–0.2)
 *   - `smoothWheel: true` — animates mouse-wheel scrolling
 *   - Touch / native momentum scrolling is preserved on mobile
 *   - Honors `prefers-reduced-motion` automatically
 *
 *   Install with: `npm i lenis`
 */
const options: LenisOptions = {
  lerp: 0.1,
  smoothWheel: true,
  // Wheel multiplier — dial up/down for faster/slower wheel response
  wheelMultiplier: 1,
  // Touch multiplier — kept low so mobile native scroll stays native-feeling
  touchMultiplier: 1.2,
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}

/**
 * Hook giving direct access to the active Lenis instance so callers can
 * `.stop()` / `.start()` / `.scrollTo()` etc.
 *
 * Used by the off-canvas menu to pause smooth-scroll while the modal is
 * open and by any in-page "scroll to section" links that need to account
 * for the sticky header offset.
 */
export function useSmoothScroll(): Lenis | undefined {
  return useLenis();
}