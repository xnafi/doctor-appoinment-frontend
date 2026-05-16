import React from "react";
import {
  Stethoscope,
  Thermometer,
  Heart,
  Activity,
  Pill,
  Brain,
  Baby,
  Eye,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const services = [
  {
    icon: Stethoscope,
    title: "General Check-up",
    desc: "Routine health examinations, vital sign monitoring, and preventive care assessments.",
    color: "#1a4f7a",
  },
  {
    icon: Activity,
    title: "Hypertension Care",
    desc: "Diagnosis, monitoring, and management of high blood pressure and cardiovascular risk.",
    color: "#82b440",
  },
  {
    icon: Pill,
    title: "Diabetes Management",
    desc: "CCD-certified management of Type 1 & 2 diabetes including lifestyle counselling.",
    color: "#1a4f7a",
  },
  {
    icon: Thermometer,
    title: "Fever & Infections",
    desc: "Diagnosis and treatment of viral, bacterial, and other common infectious diseases.",
    color: "#82b440",
  },
  {
    icon: Heart,
    title: "Cardiac Screening",
    desc: "Basic cardiac assessments, ECG interpretation, and referral management.",
    color: "#1a4f7a",
  },
  {
    icon: Brain,
    title: "Chronic Disease Care",
    desc: "Long-term management plans for chronic conditions with regular follow-ups.",
    color: "#82b440",
  },
  {
    icon: Baby,
    title: "Paediatric Consults",
    desc: "Compassionate medical care for children of all ages, including growth monitoring.",
    color: "#1a4f7a",
  },
  {
    icon: Eye,
    title: "Health Counselling",
    desc: "Lifestyle, nutrition, and preventive health guidance tailored to your needs.",
    color: "#82b440",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding bg-(--color-surface-light)"
    >
      <div className="container-site">
        <SectionHeading
          label="Our Services"
          title="Comprehensive Medical Care You Can Trust"
          subtitle="From acute illness to long-term health management — Dr. Tirthankar provides a full range of general medical services."
          className="mb-12!"
        />

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
        >
          {services.map(({ icon: Icon, title, desc, color }) => (
            <li key={title} className="card px-4! py-4! group cursor-default">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ background: `${color}14` }}
              >
                <Icon
                  size={22}
                  aria-hidden="true"
                  style={{ color }}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-heading-md text-(--color-text-primary) mb-2">
                {title}
              </h3>
              <p className="text-body-sm text-(--color-text-secondary)">
                {desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-10!">
          <Button as="link" href="#appointment" variant="primary" size="lg">
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
