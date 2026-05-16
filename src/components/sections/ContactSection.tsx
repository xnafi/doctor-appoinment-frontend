import React from "react";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const clinicMapLink =
  "https://www.google.com/maps/place/%E0%A6%A1%E0%A6%BE%E0%A6%95%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%96%E0%A6%BE%E0%A6%A8%E0%A6%BE/@24.4911333,91.7761259,17z";

const contactInfo = [
  {
    icon: MapPin,
    title: "Clinic Address",
    lines: ["ডাক্তারখানা, Chowmohona,", "Shomshernagar Road, Moulvibazar"],
    link: clinicMapLink,
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
    <section
      id="contact"
      className="section-padding bg-(--color-surface-light)"
    >
      <div className="container-site">
        <SectionHeading
          label="Get In Touch"
          title="Contact Dr. Tirthankar"
          subtitle="Have a question or need to reach us? We’re available 6 days a week."
          className="mb-14"
        />

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14!">
          {contactInfo.map(
            ({ icon: Icon, title, lines, link, linkLabel, external }) => (
              <div
                key={title}
                className="card p-6! flex flex-col gap-4 rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(26,79,122,0.12), rgba(26,79,122,0.04))",
                  }}
                >
                  <Icon
                    size={24}
                    className="text-(--color-primary)"
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-heading-md text-(--color-text-primary)">
                    {title}
                  </h3>

                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-body-sm text-(--color-text-secondary)"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <a
                  href={link}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="mt-auto inline-flex items-center gap-2 text-body-sm font-semibold text-(--color-accent) hover:text-(--color-primary) transition-colors"
                >
                  {linkLabel}
                  <span>→</span>
                </a>
              </div>
            ),
          )}
        </div>

        {/* Working Google Maps Embed */}
        <div className="overflow-hidden rounded-3xl border border-black/5 shadow-(--shadow-lg)">
          <iframe
            title="Dr. Tirthankar Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.738783474543!2d91.77355117536726!3d24.491133260673335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37517550cae38789%3A0x93ca506512ee0df4!2z4Kah4Ka-4KaV4KeN4Kak4Ka-4Kaw4KaW4Ka-4Kao4Ka-!5e0!3m2!1sen!2sbd!4v1778890000000!5m2!1sen!2sbd"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
