import React from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Rahima Begum",
    role: "Patient — Moulvibazar",
    stars: 5,
    text: "Dr. Tirthankar is an exceptionally kind physician. He listened patiently to all my concerns and explained my condition in plain language. His treatment worked wonderfully.",
  },
  {
    name: "Karim Ahmed",
    role: "Patient — Shomshernagar",
    stars: 5,
    text: "Extremely difficult to get an appointment because he is so popular — and rightly so! His approach is thoroughly professional and his diagnoses are spot-on. Highly recommended.",
  },
  {
    name: "Farida Akter",
    role: "Patient — Moulvibazar",
    stars: 5,
    text: "I have been managing my diabetes under Dr. Tirthankar's care for over two years. His thorough follow-ups and lifestyle guidance have made a huge difference to my health.",
  },
  {
    name: "Sumon Dey",
    role: "Patient — Sylhet",
    stars: 5,
    text: "Speaks less but knows and does his job to perfection. Most modern in his treatment procedures and his smile makes the consultation feel reassuring right from the start.",
  },
  {
    name: "Nasrin Sultana",
    role: "Patient — Moulvibazar",
    stars: 5,
    text: "Truly humanitarian in approach. Takes time to understand each patient individually. I have never felt rushed during any visit. Thank you, Doctor!",
  },
  {
    name: "Jahangir Alam",
    role: "Patient — Shomshernagar",
    stars: 5,
    text: "Brought my elderly mother for a check-up and was amazed at how thorough Dr. Tirthankar was. He explained everything clearly and charged very reasonably.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "var(--color-accent)" : "none"}
          stroke={i < count ? "var(--color-accent)" : "#d1d5db"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-[var(--color-surface-light)]">
      <div className="container-site">
        <SectionHeading
          label="Testimonials"
          title="What Our Patients Say"
          subtitle="Hundreds of patients in Moulvibazar and Sylhet trust Dr. Tirthankar for their healthcare needs."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="card p-6 flex flex-col gap-4"
            >
              <Quote
                size={24}
                style={{ color: "var(--color-accent)", opacity: 0.5 }}
                aria-hidden="true"
              />
              <blockquote>
                <p className="text-body-md text-[var(--color-text-secondary)] leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </blockquote>
              <footer className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-surface-muted)]">
                <div>
                  <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">{t.name}</p>
                  <p className="text-body-xs text-[var(--color-text-muted)]">{t.role}</p>
                </div>
                <StarRating count={t.stars} />
              </footer>
            </article>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl bg-[var(--color-surface-white)] shadow-[var(--shadow-sm)]">
          <div className="flex flex-col items-center">
            <span className="text-display-lg font-bold text-[var(--color-primary)]">5.0</span>
            <StarRating count={5} />
            <span className="text-body-xs text-[var(--color-text-muted)] mt-1">Average Rating</span>
          </div>
          <div className="w-px h-16 bg-[var(--color-surface-muted)] hidden sm:block" aria-hidden="true" />
          <p className="text-body-md text-[var(--color-text-secondary)] text-center max-w-xs">
            Based on patient reviews across Facebook, Justdial, and direct feedback from the Moulvibazar community.
          </p>
        </div>
      </div>
    </section>
  );
}
