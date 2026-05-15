import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Tirthankar Bhattacharjee | General Physician | Moulvibazar",
  description:
    "Dr. Tirthankar Bhattacharjee — MBBS, General Physician with 6+ years of experience. Offering compassionate, evidence-based care in Moulvibazar, Sylhet. Book your appointment today.",
  keywords: "general physician, doctor, Moulvibazar, Sylhet, MBBS, Tirthankar Bhattacharjee",
  openGraph: {
    title: "Dr. Tirthankar Bhattacharjee | General Physician",
    description: "Trusted general physician in Moulvibazar, Sylhet. Book your appointment.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
