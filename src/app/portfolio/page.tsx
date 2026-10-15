import PortfolioHero from '@/components/sections/portfolio/01_HeroSection';
import StudioWorkSection from '@/components/sections/portfolio/02_StudioWorkSection';
import PortfolioCTASection from '@/components/sections/portfolio/03_CTASection';

/**
 * Portfolio page — `/portfolio`.
 *
 *   01 Hero    — "Spaces Made To Be Lived In." + featured carousel
 *   02 Studio Work — full gallery with category filter tabs
 *   03 CTA     — "Let's Create Something Timeless!" closing band
 */
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <StudioWorkSection />
      <PortfolioCTASection />
    </>
  );
}