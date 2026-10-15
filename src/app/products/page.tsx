import { PageSections } from '@/components/sections/PageSections';

import ProductsHero from '@/components/sections/products/01_ProductsHero';
import ProductsPlanning from '@/components/sections/products/02_ProductsPlanning';
import ProductsPreview from '@/components/sections/products/03_ProductsPreview';
import ProductsServices from '@/components/sections/products/04_ProductsServices';
import ProductsFAQ from '@/components/sections/products/05_ProductsFAQ';
import ProductsCTA from '@/components/sections/products/06_ProductsCTA';
import ContactPreview from '@/components/sections/contact/02_ContctPreview';

/**
 * Products page — `/products`.
 *
 *   01 Hero        — `/ Products` indicator + staggered headline + lead subtext
 *   02 Planning    — three large sand service cards (Space Planning,
 *                    Renovation & Remodeling, Full-Service Design) with
 *                    category, title, description, pills, and an inset
 *                    includes grid
 *   03 Preview     — full-bleed parallax image window
 *   04 Services    — full catalog: H2 + [02] tag + CTA + right-aligned
 *                    subtext + 10 product tiles in a 2-column grid
 *                    (cover image + stage/title/desc + chips)
 *   05 FAQ         — accordion with 7 questions, plus/minus toggle on
 *                    the right, single-open, all questions closed by default
 *   06 CTA         — closing band: H2 "Let's Create Something Timeless!"
 *                    + [04] tag + subtext + "Book A Consultation" pill
 *
 * Section tags use hardcoded sectionNumber values from each section's
 * JSON so the visible numbers stay stable regardless of render order:
 *   - Plan     → [01] (auto via <SectionTag />)
 *   - Services → [02] (from src/data/products/services-grid.json)
 *   - FAQ      → [03] (from src/data/products/faq.json)
 *   - CTA      → [04] (from src/data/products/cta.json)
 * Hero, Preview, and the imported ContactPreview don't render tags.
 */
export default function ProductsPage() {
  return (
    <PageSections>
      <ProductsHero />
      <ProductsPreview />
      <ProductsPlanning />
      <ContactPreview />
      <ProductsServices />
      <ProductsFAQ />
      <ProductsCTA />
    </PageSections>
  );
}