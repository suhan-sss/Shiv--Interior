import PrivacyPolicySection from '@/components/sections/privacy/PrivacyPolicySection';

/**
 * Privacy Policy — `/privacy-policy`.
 *
 * Single-section page: hero pill + heading + right-aligned subtext, then
 * hairline, then intro + 13 numbered sections (some with bullet lists
 * inside), then a closing CTA band with [02] tag.
 *
 * All copy lives in `src/data/privacy/privacy-policy.json` (body) and
 * `src/data/privacy/cta.json` (closing CTA).
 */
export default function PrivacyPolicyPage() {
  return <PrivacyPolicySection />;
}