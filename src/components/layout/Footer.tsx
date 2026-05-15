import React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Plus, ExternalLink, Mail } from "lucide-react";

const quickLinks = [
  { label: "About Doctor", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Appointment", href: "#appointment" },
  { label: "Schedule", href: "#schedule" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "General Health Check-up",
  "Diabetes Management",
  "Hypertension Care",
  "Fever & Infections",
  "Chronic Disease Management",
  "Health Counselling",
];

const schedule = [
  { day: "Saturday – Thursday", time: "11:00 AM – 11:00 PM" },
  { day: "Friday", time: "Closed" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface-dark)] text-white" role="contentinfo">
      {/* Main footer */}
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
                <Plus size={22} strokeWidth={2.5} className="text-white" />
              </div>
              <div>
                <span className="block text-body-sm font-bold text-white leading-none">Dr. Tirthankar</span>
                <span className="block text-body-xs text-white/60 leading-none mt-0.5">Bhattacharjee</span>
              </div>
            </div>
            <p className="text-body-sm text-white/65 leading-relaxed mb-5">
              Providing compassionate, evidence-based general medical care to patients in Moulvibazar, Sylhet. Your health is our priority.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/18ydosw1LX/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-200"
                aria-label="Facebook"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href="mailto:info@drtirthankar.com"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-body-sm font-semibold text-white mb-4 text-label tracking-widest text-white/50">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-white/65 hover:text-[var(--color-accent)] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-body-sm font-semibold text-white mb-4 text-label tracking-widest text-white/50">
              Services
            </h3>
            <ul className="space-y-2" role="list">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-body-sm text-white/65 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-body-sm font-semibold text-white mb-4 text-label tracking-widest text-white/50">
              Contact Info
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-body-sm text-white/65">
                  Chowmohona, Shomshernagar Road,<br />
                  Moulvibazar, Sylhet, Bangladesh
                </span>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:01312612890" className="text-body-sm text-white/65 hover:text-[var(--color-accent)] transition-colors">
                  01312-612890
                </a>
              </div>
              <div className="flex gap-3">
                <Clock size={16} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="text-body-sm text-white/65">
                  {schedule.map((s) => (
                    <div key={s.day}>
                      <span className="text-white/85">{s.day}:</span> {s.time}
                    </div>
                  ))}
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-body-xs text-white/45">
            © {new Date().getFullYear()} Dr. Tirthankar Bhattacharjee. All rights reserved.
          </p>
          <p className="text-body-xs text-white/45">
            MBBS · North East Medical College & Hospital, 2016
          </p>
        </div>
      </div>
    </footer>
  );
}
