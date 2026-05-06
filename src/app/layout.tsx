// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doctor Queue System",
  description: "Live appointment queue management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
