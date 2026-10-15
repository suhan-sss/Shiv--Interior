'use client';

import { createContext, useContext, useId, useRef, ReactNode } from 'react';

/**
 * PageSections — auto-numbering wrapper for any page that has
 * multiple sections with `[NN]` tags.
 *
 * How it works
 * ────────────
 * The provider maintains a counter that hands out section numbers
 * in render order:
 *
 *   <PageSections>
 *     <Hero />     ← doesn't call useSectionNumber → no tag
 *     <Story />    ← SectionTag renders "[01]"
 *     <Approach /> ← SectionTag renders "[02]"
 *     <Process />  ← SectionTag renders "[03]"
 *     <Cta />      ← SectionTag renders "[04]"
 *   </PageSections>
 *
 * Each section that wants a number just renders <SectionTag /> in
 * its header. The tag reads from context and shows the next slot.
 * Numbers are stable per render order — adding a new section
 * anywhere pushes every tag below it up by one automatically.
 *
 * Why not just pass numbers as props?
 * ──────────────────────────────────
 * Sections live in JSON files where the number was hard-coded.
 * That meant every page had to be hand-numbered, every reorder
 * needed manual updates, and data files carried structural
 * metadata that didn't belong there. With this provider, JSON
 * files only hold *content* (heading, subtext, body, etc.) and
 * the position-aware tag handles the rest.
 */

interface PageSectionsApi {
  /** Claim a number for the given section id. Stable across renders. */
  claimNumber: (id: string) => string;
}

const Ctx = createContext<PageSectionsApi | null>(null);

export function PageSections({ children }: { children: ReactNode }) {
  // Refs (not state) — we don't want re-renders when numbers are
  // claimed. Subsequent renders use the cached value, so there are
  // no cascading re-renders either. The counter is local to this
  // page instance and resets on navigation.
  const registry = useRef<Map<string, string>>(new Map());
  const counter = useRef(0);

  const api: PageSectionsApi = {
    claimNumber: (id: string) => {
      const existing = registry.current.get(id);
      if (existing !== undefined) return existing;
      counter.current += 1;
      const num = counter.current.toString().padStart(2, '0');
      registry.current.set(id, num);
      return num;
    },
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

/**
 * Returns the auto-assigned section number for this section.
 * Returns `null` if used outside a `<PageSections>` wrapper
 * (so a section can be safely previewed in isolation without
 * a provider — it just won't render a tag).
 *
 * Pass a stable `id` (e.g., `"story"`, `"approach"`) so the
 * mapping is explicit; otherwise an auto-id is used. Render
 * order is what determines the number, not the id.
 */
export function useSectionNumber(id?: string): string | null {
  const ctx = useContext(Ctx);
  const autoId = useId();
  if (!ctx) return null;
  return ctx.claimNumber(id ?? autoId);
}

/**
 * SectionTag — the bracketed tag shown at the top-right of a
 * section's heading area. Reads its number from
 * `useSectionNumber()`, so the displayed number always matches
 * the section's position in the page.
 *
 *   ┌─────────────────────────────────────────────┐
 *   │  Section Heading                  [ 03 ]    │
 *   └─────────────────────────────────────────────┘
 *
 * The visual treatment (text-2xl → text-3xl on sm → text-4xl on md,
 * font-medium, black/60 color) matches the rest of the site. If a
 * section shouldn't display a tag (e.g., a hero), just don't include
 * this component in its header.
 */
export function SectionTag() {
  const n = useSectionNumber();
  if (!n) return null;
  return (
    <div
      className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
      aria-label={`Section ${n}`}
    >
      <span>[</span>
      <span>{n}</span>
      <span>]</span>
    </div>
  );
}