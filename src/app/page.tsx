import HeroSection from '@/components/sections/home/01_HeroSection';
import AboutSection from '@/components/sections/home/02_AboutSection';
import FeaturedProjectsSection from '@/components/sections/home/03_FeaturedProjectsSection';
import ServicesSection from '@/components/sections/home/04_ServicesSection';
import VideoSection from '@/components/sections/home/05_VideoSection';
import ProcessSection from '@/components/sections/home/06_ProcessSection';
import TestimonialSection from '@/components/sections/home/07_TestimonialSection';
import FAQSection from '@/components/sections/home/08_FAQSection';
import CTASection from '@/components/sections/home/09_CTASection';
import ConsultationSection from '@/components/sections/home/10_ConsultationSection';

/**
 * Home page — hero, then the cream-bg content sections that flow as
 * one continuous band (About, Featured Projects, Services, Process,
 * Testimonial, FAQ), with a full-bleed video showcase between
 * Services and Process as a dark visual break. The CTA section sits
 * before the inquiry form, and the Consultation form closes the page
 * with a full-bleed dark workspace photo. Only the hero photo, the
 * video section, and the consultation form break the cream, so the
 * page reads as alternating cream bands anchored by dark visual
 * moments.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      <VideoSection />
      <ProcessSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <ConsultationSection />
    </>
  );
}
