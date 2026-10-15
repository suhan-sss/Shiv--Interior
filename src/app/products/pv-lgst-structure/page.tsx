import PVStructureSection from '@/components/sections/pv-lgst-structure/PVStructureSection';
import LGSFStructureSection from '@/components/sections/pv-lgst-structure/LGSFStructureSection';
import PVLGSTCTASection from '@/components/sections/pv-lgst-structure/PVLGSTCTASection';

/**
 * PV & LGST Structure — `/products/pv-lgst-structure`.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  PVStructureSection  (heading + intro + body + image)    │
 *   ├──────────────────────────────────────────────────────────┤
 *   │  LGSFStructureSection (heading + intro + body + image +   │
 *   │                        spec rows)                       │
 *   ├──────────────────────────────────────────────────────────┤
 *   │  PVLGSTCTASection    (closing band: H2 + subtext + pill)│
 *   └──────────────────────────────────────────────────────────┘
 *
 * All copy lives in `src/data/pv-lgst-structure/pv-lgst-structure.json`
 * (PV and LGSF sections) and `src/data/pv-lgst-structure/cta.json`
 * (closing CTA).
 */
export default function PVLGSTStructurePage() {
  return (
    <main>
      <PVStructureSection />
      <LGSFStructureSection />
      <PVLGSTCTASection />
    </main>
  );
}