/**
 * Type definitions for `/portfolio/[slug]` project detail pages.
 *
 * Each project's data is at
 * `src/data/portfolio/projects/{slug}/project.json` and conforms to
 * the `ProjectDetail` shape defined here. The dynamic route uses
 * `generateStaticParams()` to scan the projects directory and pre-render
 * every project at build time.
 *
 * Why one big type instead of per-section types:
 *   • The data shape is small (one JSON file, ~8 entries)
 *   • Sections always receive the full project — even if they only
 *     render a slice, the typecheck still catches missing fields
 *   • Adding a new field (e.g., `awards[]`) means editing one type
 *     and one JSON file, not hunting across section components
 */
export interface ProjectDetail {
  /** URL-safe slug — matches `href` in featured.json / projects.json */
  id: string;
  /** Display title, e.g. "Greenfield Corporate Office" */
  title: string;
  /** Design style / typology — used as the hero tag pill */
  category: string;
  /**
   * Right-aligned tagline shown over the cover image in the hero.
   * One or two sentences — written to read at a glance.
   */
  tagline: string;
  /** Year delivered, e.g. "2024" or "Q1 2025" */
  year: string;
  /** City or full address — keep short for the facts grid */
  location: string;
  /** Total area, e.g. "14,000 sq ft" */
  area: string;
  /** Client name — optional in case of NDA projects */
  client?: string;
  /** List of services rendered on this project, joined with ` · ` in UI */
  services: string[];
  /** Long-form intro paragraph — 3-5 sentences */
  overview: string;
  /** What's tricky about this brief — 2-3 sentences */
  challenge: string;
  /** How we resolved it — 2-3 sentences */
  solution: string;
  /** Hero cover image (rendered full-bleed) */
  coverImage: {
    src: string;
    alt: string;
  };
  /**
   * Gallery images. The 04_ProjectGallery section picks the first 4;
   * any extras are reserved for future expansion (lightbox, etc).
   */
  gallery: Array<{
    src: string;
    alt: string;
  }>;
}