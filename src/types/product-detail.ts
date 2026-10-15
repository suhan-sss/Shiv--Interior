/**
 * Type definitions for `/products/[slug]` product detail pages.
 *
 * Each product's data lives at
 * `src/data/products/{slug}/project.json` (note: per-product folder
 * under the existing `src/data/products/` data dir — same convention
 * we established for portfolio detail at
 * `src/data/portfolio/projects/{slug}/project.json`).
 *
 * Why a separate type from `ProjectDetail`:
 *   • Projects are case studies with a narrative arc (overview →
 *     challenge → solution). Products are catalog/spec entries.
 *     `ProjectDetail.challenge` / `.solution` have no product analog.
 *   • Products need richer metadata for sales conversations:
 *     lead time, customization options, hardware suppliers, etc.
 *   • Keeping the two types separate means a future product with an
 *     unusual layout (e.g., a configurable "build your desk" widget)
 *     can extend `ProductDetail` without touching portfolio data.
 */
export interface ProductDetail {
  /** URL-safe slug — matches `slug` in services-grid.json */
  id: string;
  /** Display title, e.g. "CEO/MD Desk" */
  title: string;
  /** Product stage / category — drives the hero tag pill */
  category: string;
  /**
   * Right-aligned tagline shown over the hero. Two short sentences
   * — written to read at a glance.
   */
  tagline: string;
  /** Long-form intro paragraph — 3-5 sentences about the product */
  overview: string;
  /** Bullet list of 4-6 short selling points (rendered with disc bullets) */
  features: string[];
  /** Spec grid (3-4 entries) — like PortfolioFacts but product-shaped */
  specs: Array<{ label: string; value: string }>;
  /** Materials & finishes available — chip list */
  materials: string[];
  /** Lead time string, e.g. "8–12 weeks" */
  leadTime: string;
  /** Customization options the buyer can request */
  customization: string[];
  /** Hero cover image (rendered full-bleed) */
  heroImage: {
    src: string;
    alt: string;
  };
  /**
   * Gallery images. The 04_ProductGallery section picks the first 4;
   * any extras are reserved for future expansion (lightbox, etc).
   */
  gallery: Array<{
    src: string;
    alt: string;
  }>;
}