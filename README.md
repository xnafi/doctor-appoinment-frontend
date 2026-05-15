# Dr. Tirthankar Bhattacharjee — Medical Website

A production-ready medical clinic website built with **Next.js 16.2**, **Tailwind CSS v4**, and **TypeScript**. Zero build errors. Statically pre-rendered.

---

## 🚀 Quick Start

```bash
unzip dr-tirthankar-website.zip
cd dr-tirthankar
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

Deploy instantly: `npx vercel` (free tier, zero config)

---

## 👨‍⚕️ Doctor Details

| Field | Value |
|-------|-------|
| Name | Dr. Tirthankar Bhattacharjee |
| Qualification | MBBS (2016), North East Medical College & Hospital |
| Additional | CCD · CMU · DMU · PGT |
| Speciality | General Physician — Daktar Khana |
| Location | Chowmohona, Shomshernagar Road, Moulvibazar, Sylhet |
| Phone | 01312-612890 |
| Hours | Sat–Thu 11 AM – 11 PM · Friday Closed |
| Facebook | https://www.facebook.com/share/18ydosw1LX/ |

---

## 🛠 Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.2.6 |
| React | 19.2 |
| Tailwind CSS | v4 |
| TypeScript | 5.x |
| Lucide React | latest |
| Fonts | DM Serif Display + DM Sans |

---

## 🎨 Design System

### Color Tokens — `app/globals.css`

```css
--color-primary:       #1a4f7a   /* Deep Medical Blue */
--color-primary-dark:  #0e3357
--color-primary-light: #2a6fa8
--color-accent:        #82b440   /* Lime Green — brand accent */
--color-accent-dark:   #6a9434
--color-surface-dark:  #0e1e30   /* Hero / dark section bg */
--color-text-primary:  #1a1a2e
--color-text-secondary:#545454
--color-text-muted:    #8a8a9a
```

### Typography Classes (fluid — all devices)

| Class | Size Range | Use |
|-------|-----------|-----|
| `.text-display-xl` | 2.5 – 4.5rem | Hero h1 |
| `.text-display-lg` | 2 – 3.25rem | Section hero |
| `.text-display-md` | 1.6 – 2.5rem | Stat numbers |
| `.text-heading-xl` | 1.5 – 2.25rem | Section h2 (serif) |
| `.text-heading-lg` | 1.25 – 1.875rem | Card titles |
| `.text-heading-md` | 1.1 – 1.375rem | Sub-headings |
| `.text-body-lg` | 1 – 1.125rem | Lead paragraphs |
| `.text-body-md` | 1rem | Body copy |
| `.text-body-sm` | 0.875rem | Secondary text |
| `.text-body-xs` | 0.75rem | Captions, badges |
| `.text-label` | 0.75rem + caps | Section eyebrows |

---

## 📁 Project Structure

```
dr-tirthankar/
├── app/
│   ├── globals.css          ← All design tokens + utility classes
│   ├── layout.tsx           ← Root layout, metadata, font preload
│   └── page.tsx             ← Main page — assembles all sections
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx        ← Polymorphic button (button | Link)
│   │   ├── Badge.tsx         ← Status/category pill
│   │   ├── SectionHeading.tsx← Reusable section title + divider
│   │   ├── StatCard.tsx      ← Metric display card (light/dark)
│   │   ├── DoctorImage.tsx   ← Branded SVG doctor illustration
│   │   ├── PlaceholderImage.tsx ← Generic SVG placeholders
│   │   ├── ScrollToTop.tsx   ← Floating scroll-to-top button
│   │   └── WhatsAppFAB.tsx   ← WhatsApp floating action button
│   │
│   ├── layout/
│   │   ├── Navbar.tsx        ← Sticky, responsive, mobile hamburger
│   │   └── Footer.tsx        ← Full-width footer
│   │
│   └── sections/
│       ├── HeroSection.tsx         ← Dark gradient hero + floating cards
│       ├── AboutSection.tsx        ← Doctor bio, highlights, quote
│       ├── ServicesSection.tsx     ← 8 service cards grid
│       ├── StatsSection.tsx        ← Why choose + metric cards
│       ├── AppointmentSection.tsx  ← Booking form (client component)
│       ├── ScheduleSection.tsx     ← Weekly schedule, today highlight
│       ├── TestimonialsSection.tsx ← 6 patient reviews + rating
│       ├── BlogSection.tsx         ← 3 health article cards
│       └── ContactSection.tsx      ← Info cards + map placeholder
│
├── tailwind.config.ts       ← All tokens mirrored as Tailwind classes
├── next.config.ts           ← Security headers, image config
└── tsconfig.json
```

---

## 🧩 Component API

### Button
```tsx
// Renders as <button>
<Button variant="primary" size="lg" icon={<Phone />}>Call Now</Button>

// Renders as Next.js <Link>
<Button as="link" href="#appointment" variant="secondary" size="md">
  Book Appointment
</Button>

// Variants: primary | secondary | outline-white | ghost
// Sizes:    sm | md | lg | xl
```

### SectionHeading
```tsx
<SectionHeading
  label="Our Services"          // optional eyebrow label
  title="Comprehensive Care"
  subtitle="Supporting text..."  // optional
  align="center"                 // "left" | "center"
  inverted={false}               // true = white text for dark bg
/>
```

### StatCard
```tsx
<StatCard value="500+" label="Satisfied Patients" inverted />
```

---

## ✅ 2026 Best Practices Applied

- **App Router** — React 19 server components by default
- `"use client"` only on interactive components (Navbar, AppointmentSection, ScrollToTop)
- **Fluid typography** via `clamp()` — zero layout shifts across breakpoints
- **Semantic HTML** — `<section>`, `<article>`, `<address>`, `<nav>`, `<main>`, `<blockquote>`
- **WCAG 2.2 AA** — `aria-label`, `aria-expanded`, `aria-hidden`, `role`, focus-visible rings
- **Skip to content** link for keyboard users
- **CSS Custom Properties** for all design tokens — no raw hex in components
- **Polymorphic Button** with TypeScript discriminated union types
- **Security headers** in `next.config.ts` (X-Frame-Options, CSP hints, etc.)
- `rel="noopener noreferrer"` on all external links
- Google Fonts `preconnect` in `<head>`
- `Viewport` export separate from `Metadata` (Next.js 14+ requirement)
- WhatsApp FAB with pre-filled message for instant patient contact

---

## 🔧 Customisation Checklist

- [ ] **Real photos** — replace `DoctorImage` / `PlaceholderImage` with `<Image>` from `next/image`
- [ ] **Google Maps** — swap map placeholder in `ContactSection` with an `<iframe>` embed
- [ ] **Form backend** — connect appointment form to WhatsApp API, email service, or backend
- [ ] **WhatsApp number** — verify `8801312612890` in `WhatsAppFAB.tsx`
- [ ] **Favicon** — add `/public/favicon.ico` with clinic logo
- [ ] **OG image** — add `/public/og-image.jpg` and update `metadata.openGraph.images`
- [ ] **Blog** — replace static posts in `BlogSection.tsx` with CMS data (Sanity, Contentful, etc.)
- [ ] **Analytics** — add Vercel Analytics or Plausible
