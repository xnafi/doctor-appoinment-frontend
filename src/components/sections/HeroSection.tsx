import React from "react";
import { Phone, CalendarCheck, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const trustBadges = [
  { icon: ShieldCheck, label: "MBBS Certified" },
  { icon: ShieldCheck, label: "6+ Years Experience" },
  { icon: ShieldCheck, label: "500+ Happy Patients" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[var(--color-surface-dark)] via-[#0f2d4a] to-[var(--color-primary)]"
      aria-label="Hero — Dr. Tirthankar Bhattacharjee"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(130,180,64,0.08)" }}
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <Badge variant="accent" className="self-start animate-fade-up">
              🩺 General Physician · Moulvibazar
            </Badge>

            <h1 className="text-display-xl text-white animate-fade-up delay-100">
              Good Health{" "}
              <span
                className="italic"
                style={{ color: "var(--color-accent)" }}
              >
                Moves Us
              </span>{" "}
              Forward
            </h1>

            <p className="text-body-lg text-white/75 max-w-lg animate-fade-up delay-200">
              Dr. Tirthankar Bhattacharjee — MBBS — offers compassionate, evidence-based general medical care. From everyday ailments to chronic disease management, your wellbeing is our mission.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-1.5 text-body-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full"
                >
                  <badge.icon size={12} className="text-[var(--color-accent)]" aria-hidden="true" />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2 animate-fade-up delay-400">
              <Button
                as="link"
                href="#appointment"
                variant="primary"
                size="lg"
                icon={<CalendarCheck size={18} aria-hidden="true" />}
              >
                Book Appointment
              </Button>
              <Button
                as="link"
                href="#about"
                variant="outline-white"
                size="lg"
                icon={<ChevronRight size={18} aria-hidden="true" />}
                iconPosition="right"
              >
                Learn More
              </Button>
            </div>

            {/* Phone */}
            <a
              href="tel:01312612890"
              className="flex items-center gap-3 w-fit mt-2 group animate-fade-up delay-500"
              aria-label="Call Dr. Tirthankar: 01312-612890"
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-accent)]">
                <div
                  className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-50"
                  style={{ animation: "pulse-ring 2s ease-out infinite" }}
                  aria-hidden="true"
                />
                <Phone size={20} className="text-white relative z-10" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-body-xs text-white/60">Call for appointment</span>
                <span className="block text-body-md font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                  01312-612890
                </span>
              </div>
            </a>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:flex justify-center items-end animate-fade-in delay-300">
            {/* Main doctor image */}
            <div className="relative w-[420px] h-[480px] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
              <PlaceholderImage
                width={420}
                height={480}
                label="Dr. Tirthankar Bhattacharjee"
                variant="doctor"
              />
            </div>

            {/* Floating card — experience */}
            <div
              className="absolute -left-8 top-1/4 bg-white rounded-xl p-4 shadow-[var(--shadow-lg)] w-[160px]"
              aria-hidden="true"
            >
              <p className="text-display-md font-bold text-[var(--color-primary)]">6+</p>
              <p className="text-body-xs text-[var(--color-text-secondary)] mt-0.5">Years of Experience</p>
            </div>

            {/* Floating card — patients */}
            <div
              className="absolute -right-4 bottom-1/4 bg-[var(--color-accent)] rounded-xl p-4 shadow-[var(--shadow-accent)] w-[160px] text-white"
              aria-hidden="true"
            >
              <p className="text-display-md font-bold">500+</p>
              <p className="text-body-xs opacity-85 mt-0.5">Satisfied Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 48L1440 48L1440 0C1200 40 960 50 720 30C480 10 240 40 0 0L0 48Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
