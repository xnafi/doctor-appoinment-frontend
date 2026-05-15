import React from "react";
import { Users, Clock, Award, ThumbsUp } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { icon: <Users size={24} />, value: "500+", label: "Satisfied Patients" },
  { icon: <Clock size={24} />, value: "6+", label: "Years Experience" },
  { icon: <Award size={24} />, value: "4+", label: "Certifications" },
  { icon: <ThumbsUp size={24} />, value: "24/7", label: "Emergency Support" },
];

const whyChoose = [
  "Evidence-based, patient-centred approach to every consultation",
  "Thorough diagnosis combined with clear, jargon-free explanations",
  "Continuity of care with personalised follow-up plans",
  "Warm, respectful environment welcoming patients of all ages",
  "Affordable consultations with flexible scheduling",
];

export function StatsSection() {
  return (
    <section id="why-choose" className="section-padding bg-[var(--color-surface-white)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              label="Why Choose Us"
              title="People Trust Me — Because My Patients Are My Family"
              align="left"
            />

            <p className="text-body-lg text-[var(--color-text-secondary)]">
              One of the most important factors about people&apos;s lives is their health. At Daktar Khana, the combination of professional training and the growing knowledge of medicine — from CCD, CMU, and DMU certifications — ensures that every patient receives care tailored to their unique needs.
            </p>

            <ul className="space-y-3" role="list">
              {whyChoose.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                    style={{ background: "rgba(130,180,64,0.15)" }}
                    aria-hidden="true"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                  </span>
                  <span className="text-body-md text-[var(--color-text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats + Image */}
          <div className="flex flex-col gap-6">
            {/* Stats grid */}
            <div
              className="rounded-2xl p-6 grid grid-cols-2 gap-4"
              style={{ background: "var(--color-primary)" }}
            >
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} inverted />
              ))}
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-md)] aspect-video">
              <PlaceholderImage
                width={600}
                height={340}
                label="Medical Facility — Daktar Khana"
                variant="facility"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
