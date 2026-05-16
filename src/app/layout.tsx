import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Tirthankar Bhattacharjee | General Physician | Moulvibazar",
  description:
    "Dr. Tirthankar Bhattacharjee — MBBS, General Physician with 6+ years of experience. Offering compassionate, evidence-based care in Moulvibazar, Sylhet. Book your appointment today.",
  keywords:
    "general physician, doctor, Moulvibazar, Sylhet, MBBS, Tirthankar Bhattacharjee",
  openGraph: {
    title: "Dr. Tirthankar Bhattacharjee | General Physician",
    description:
      "Trusted general physician in Moulvibazar, Sylhet. Book your appointment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} ${dmSerifDisplay.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
