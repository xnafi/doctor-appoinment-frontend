import React from "react";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const contactInfo = [
  {
    icon: MapPin,
    title: "Clinic Address",
    lines: ["Chowmohona, Shomshernagar Road,", "Moulvibazar, Sylhet, Bangladesh"],
    link: "https://maps.google.com/?q=Moulvibazar,+Sylhet,+Bangladesh",
    linkLabel: "View on Map",
  },
  {
    icon: Phone,
    title: "Appointment",
    lines: ["01312-612890"],
    link: "tel:01312612890",
    linkLabel: "Call Now",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Sat – Thu: 11:00 AM – 11:00 PM", "Friday: Closed"],
    link: "#schedule",
    linkLabel: "Full Schedule",
  },
  {
    icon: ExternalLink,
    title: "Facebook Page",
    lines: ["Connect with Dr. Tirthankar", "on Facebook for updates"],
    link: "https://www.facebook.com/share/18ydosw1LX/",
    linkLabel: "Visit Page",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-[var(--color-surface-white)]">
      <div className="container-site">
        <SectionHeading
          label="Get In Touch"
          title="Contact Dr. Tirthankar"
          subtitle="Have a question or need to reach us? We&apos;re available 6 days a week."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map(({ icon: Icon, title, lines, link, linkLabel, external }) => (
            <div
              key={title}
              className="card p-6 flex flex-col gap-3 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(26,79,122,0.08)" }}
              >
                <Icon size={22} className="text-[var(--color-primary)]" aria-hidden="true" />
              </div>
              <h3 className="text-heading-md text-[var(--color-text-primary)]">{title}</h3>
              <div className="flex flex-col gap-0.5">
                {lines.map((line, i) => (
                  <p key={i} className="text-body-sm text-[var(--color-text-secondary)]">
                    {line}
                  </p>
                ))}
              </div>
              <a
                href={link}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-body-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors mt-auto"
              >
                {linkLabel} →
              </a>
            </div>
          ))}
        </div>

        {/* Map embed placeholder */}
        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-md)] bg-[var(--color-surface-muted)] aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center p-8">
            <MapPin size={40} className="text-[var(--color-primary)]" aria-hidden="true" />
            <p className="text-heading-md text-[var(--color-text-primary)]">Daktar Khana — Moulvibazar</p>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Chowmohona, Shomshernagar Road, Moulvibazar, Sylhet
            </p>
            <a
              href="https://maps.google.com/?q=Moulvibazar,+Sylhet,+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-md mt-2"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
