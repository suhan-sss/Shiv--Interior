import PVLGSTCTAPage from '@/components/sections/pv-lgst-structure/PVLGSTCTAPage';

/**
 * PV & LGST — Dedicated CTA landing page.
 *
 * Route: `/products/pv-lgst-structure/contact`.
 *
 * Full landing page focused on conversion: hero with PV-LGST-specific
 * headline + CTA pill, 4-card feature grid (sand), and a closing CTA
 * band that funnels users to `/contact` (where the actual inquiry form
 * lives).
 *
 * All copy lives in `src/data/pv-lgst-structure/cta.json`.
 */
export default function PVLGSTStructureContactPage() {
  return <PVLGSTCTAPage />;
}