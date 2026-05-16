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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const scrollToTarget = (target: string) => {
    scrollToElement(target, {
      offset: -80,
      ease: "outQuad",
      duration: 600,
    });

    closeMenu();
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-(--color-primary-dark) text-white/80 text-body-xs py-2 relative z-60">
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

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-70 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-(--shadow-md)"
            : "bg-white"
        }`}
      >
        <nav className="container-site" aria-label="Main navigation">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToTarget("#home")}
              className="flex items-center gap-3 group appearance-none bg-transparent border-0 p-0 text-left"
              aria-label="Dr. Tirthankar Bhattacharjee — Home"
            >
              <div className="w-10 h-10 bg-(--color-primary) rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-(--color-accent) transition-colors duration-300">
                <Plus size={22} strokeWidth={2.5} />
              </div>

              <div>
                <span className="block text-body-sm font-bold text-(--color-primary) leading-none">
                  Dr. Tirthankar
                </span>

                <span className="block text-body-xs text-(--color-text-muted) leading-none mt-0.5">
                  General Physician
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-3!">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollToTarget(link.target)}
                    className="px-4 py-2 text-body-sm font-bold uppercase text-(--color-text-secondary) rounded hover:text-(--color-primary) hover:bg-(--color-surface-light) transition-colors duration-200 appearance-none bg-transparent border-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button as="link" href="/display" variant="secondary" size="sm">
                Display Board
              </Button>

              <Button
                as="link"
                href="#appointment"
                variant="primary"
                size="sm"
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-(--color-text-primary) hover:bg-(--color-surface-muted) transition-colors appearance-none bg-transparent border-0 shrink-0 relative z-[90]"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-80 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-out py-4! ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          {/* Top Header */}
          <div className="container-site h-18 flex items-center justify-between border-b border-(--color-surface-muted)">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToTarget("#home")}
              className="flex items-center gap-3 appearance-none bg-transparent border-0 p-0 text-left"
            >
              <div className="w-10 h-10 bg-(--color-primary) rounded-lg flex items-center justify-center text-white">
                <Plus size={22} strokeWidth={2.5} />
              </div>

              <div>
                <span className="block text-body-sm font-bold text-(--color-primary) leading-none">
                  Dr. Tirthankar
                </span>

                <span className="block text-body-xs text-(--color-text-muted) leading-none mt-0.5">
                  General Physician
                </span>
              </div>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeMenu}
              className="p-2 rounded-lg text-(--color-text-primary) hover:bg-(--color-surface-muted) transition-colors appearance-none bg-transparent border-0"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <div className="container-site py-6 flex flex-col gap-2 mt-2!">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => scrollToTarget(link.target)}
                className="px-4 py-4 text-body-md font-medium text-left rounded-xl text-(--color-text-secondary) hover:bg-(--color-surface-light) hover:text-(--color-primary) transition-colors appearance-none bg-transparent border-0"
              >
                {link.label}
              </button>
            ))}

            {/* Footer CTA */}
            <div className="pt-4! mt-4! border-t border-(--color-surface-muted)">
              <a
                href="/display"
                className="inline-flex mb-3! text-body-sm font-semibold text-(--color-primary) hover:text-(--color-accent) transition-colors"
              >
                Open Display Board
              </a>

              <a
                href="tel:01312612890"
                className="flex items-center gap-2 text-body-sm font-semibold text-(--color-primary) mb-4!"
              >
                <Phone size={16} />
                01312-612890
              </a>

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
      </div>
    </>
  );
}
