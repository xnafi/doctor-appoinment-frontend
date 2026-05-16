"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import scrollToElement from "scroll-to-element";

const navLinks = [
  { label: "Home", target: "#home" },
  { label: "About", target: "#about" },
  { label: "Services", target: "#services" },
  { label: "Schedule", target: "#schedule" },
  { label: "Testimonials", target: "#testimonials" },
  { label: "Contact", target: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const scrollToTarget = (target: string) => {
    scrollToElement(target, {
      offset: -80,
      ease: "outQuad",
      duration: 600,
    });
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-[var(--color-primary-dark)] text-white/80 text-body-xs py-2">
        <div className="container-site flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={12} />
              Appointment: 01312-612890
            </span>
            <span>📍 Chowmohona, Shomshernagar Road, Moulvibazar, Sylhet</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Sat–Thu: 11:00 AM – 11:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-md)]"
            : "bg-white"
        }`}
      >
        <nav className="container-site" aria-label="Main navigation">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToTarget("#home")}
              className="flex items-center gap-3 group"
              aria-label="Dr. Tirthankar Bhattacharjee — Home"
            >
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                <Plus size={22} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-body-sm font-bold text-[var(--color-primary)] leading-none">
                  Dr. Tirthankar
                </span>
                <span className="block text-body-xs text-[var(--color-text-muted)] leading-none mt-0.5">
                  General Physician
                </span>
              </div>
            </button>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollToTarget(link.target)}
                    className="px-4 py-2 text-body-sm font-medium text-[var(--color-text-secondary)] rounded hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-light)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:01312612890"
                className="flex items-center gap-2 text-body-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <Phone size={16} />
                01312-612890
              </a>
              <Button as="link" href="#appointment" variant="primary" size="sm">
                Book Appointment
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden border-t border-[var(--color-surface-muted)] bg-white transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="container-site py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => {
                  scrollToTarget(link.target);
                  closeMenu();
                }}
                className="px-4 py-3 text-body-md font-medium text-[var(--color-text-secondary)] rounded-lg hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-light)] transition-all"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[var(--color-surface-muted)] mt-2">
              <Button
                as="link"
                href="#appointment"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
