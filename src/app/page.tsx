import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { AboutSection } from "../components/sections/AboutSection";
import { AppointmentSection } from "../components/sections/AppointmentSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ScheduleSection } from "../components/sections/ScheduleSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { StatsSection } from "../components/sections/StatsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";


export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <AppointmentSection />
        <ScheduleSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
