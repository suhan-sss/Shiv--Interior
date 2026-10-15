import ContactHero from '@/components/sections/contact/01_ContactHero';
import ContactPreview from '@/components/sections/contact/02_ContctPreview';
import ContactConsultationSection from '@/components/sections/contact/03_ConsultationSection';
import ContactFAQ from '@/components/sections/contact/04_FAQ';
import CTASection from '@/components/sections/contact/05_CTASection';

/**
 * Contact page — five sections that flow as one continuous cream band:
 *
 *   01 ContactHero        — "Get in Touch" intro + animated headline
 *   02 ContactPreview     — parallax image window
 *   03 Consultation       — two-column body (info + inquiry form)
 *   04 FAQ                — 60% centered accordion
 *   05 CTA                — closing "Let's Create Something Timeless!" band
 *
 * All sections share the cream surface (#F2EDE4) so the page reads as
 * one uninterrupted band, anchored only by the parallax image and the
 * amber-700 FAQ cards.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactPreview />
      <ContactConsultationSection />
      <ContactFAQ />
      <CTASection />
      
    </>
  );
}