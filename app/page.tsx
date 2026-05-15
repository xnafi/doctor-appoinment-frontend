import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";

export default function Home() {
  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--color-accent)] focus:text-white focus:font-semibold focus:text-body-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <AppointmentSection />
        <ScheduleSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFAB />
      <ScrollToTop />
    </>
  );
}
