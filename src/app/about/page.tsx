import { PageSections } from '@/components/sections/PageSections';

import AboutHero from '@/components/sections/about/01_AboutHero';
import StorySection from '@/components/sections/about/02_StorySection';
import ApproachSection from '@/components/sections/about/03_ApproachSection';
import ProcessSection from '@/components/sections/about/04_ProcessSection';
import TeamSection from '@/components/sections/about/05_TeamSection';
import AboutCTASection from '@/components/sections/about/06_CTASection';

/**
 * About page — `/about`.
 *
 *   01 Hero        — "The Studio Behind the Spaces" + horizontal-scroll portraits
 *   02 Story       — our story paragraph + 3 count-up stat tiles
 *   03 Approach    — three approach items + sticky image
 *   04 Process     — four process steps (mirrors home/06)
 *   05 Team        — 4 team members in a row
 *   06 CTA         — closing band
 *
 * Section tags ([01], [02], ...) are NOT hard-coded anywhere. Each
 * numbered section renders a `<SectionTag />` inside its header; the
 * `<PageSections>` provider below hands out numbers in render order,
 * so the layout and order you see in this file *is* the numbering.
 *
 * Hero doesn't render a SectionTag → no [01] in the corner.
 */
export default function AboutPage() {
  return (
    <PageSections>
      <AboutHero />
      <StorySection />
      <ApproachSection />
      <ProcessSection />
      <TeamSection />
      <AboutCTASection />
    </PageSections>
  );
}