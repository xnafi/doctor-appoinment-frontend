import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Tirthankar Bhattacharjee | General Physician | Moulvibazar",
  description:
    "Dr. Tirthankar Bhattacharjee — MBBS, General Physician with 6+ years of experience. Offering compassionate, evidence-based care in Moulvibazar, Sylhet. Book your appointment: 01312-612890.",
  keywords: [
    "general physician",
    "doctor",
    "Moulvibazar",
    "Sylhet",
    "MBBS",
    "Tirthankar Bhattacharjee",
    "Daktar Khana",
    "diabetes",
    "hypertension",
  ],
  authors: [{ name: "Dr. Tirthankar Bhattacharjee" }],
  openGraph: {
    title: "Dr. Tirthankar Bhattacharjee | General Physician",
    description:
      "Trusted general physician in Moulvibazar, Sylhet. MBBS · CCD · CMU · DMU. Book your appointment today.",
    type: "website",
    locale: "en_BD",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a4f7a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
