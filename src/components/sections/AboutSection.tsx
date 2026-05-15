import React from "react";
import { Award, BookOpen, Heart, Stethoscope } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";

const highlights = [
  {
    icon: BookOpen,
    title: "MBBS, 2016",
    desc: "North East Medical College & Hospital, under Sylhet MAG Osmani Medical College University",
  },
  {
    icon: Stethoscope,
    title: "General Physician",
    desc: "Daktar Khana General Physician with 6+ years of hands-on clinical experience",
  },
  {
    icon: Award,
    title: "Additional Training",
    desc: "CCD · CMU · DMU · PGT — specialized certifications in chronic disease management",
  },
  {
    icon: Heart,
    title: "Patient-First Approach",
    desc: "Known for a warm bedside manner and dedication to holistic patient wellbeing",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[var(--color-surface-white)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <PlaceholderImage
                width={480}
                height={600}
                label="Dr. Tirthankar Bhattacharjee — About"
                variant="doctor"
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
              style={{ background: "var(--color-accent)", opacity: 0.2 }}
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl -z-10"
              style={{ background: "var(--color-primary)", opacity: 0.1 }}
              aria-hidden="true"
            />
          </div>

          {/* Content side */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              label="About Doctor"
              title="The Daktar Khana General Physician"
              subtitle="Born in Moulovibazar and trained with excellence, Dr. Tirthankar Bhattacharjee brings both expertise and empathy to every consultation."
              align="left"
            />

            <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 py-1">
              <p className="text-body-lg italic text-[var(--color-text-secondary)]">
                "Medicine is a form of art. Good health depends on how skilfully a doctor applies their knowledge when dealing with patients."
              </p>
              <footer className="mt-2">
                <cite className="text-body-sm font-semibold text-[var(--color-primary)] not-italic">
                  — Dr. Tirthankar Bhattacharjee
                </cite>
              </footer>
            </blockquote>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="flex gap-3 p-4 rounded-xl bg-[var(--color-surface-light)] hover:shadow-[var(--shadow-sm)] transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(26,79,122,0.1)" }}
                  >
                    <Icon size={18} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-body-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
                    <p className="text-body-xs text-[var(--color-text-secondary)] mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button as="link" href="#appointment" variant="primary" size="md">
                Book a Consultation
              </Button>
              <Button as="link" href="#services" variant="secondary" size="md">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
