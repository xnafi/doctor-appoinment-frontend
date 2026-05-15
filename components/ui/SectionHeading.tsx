import React from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  inverted = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const textColor = inverted ? "text-white" : "text-[var(--color-text-primary)]";
  const subtitleColor = inverted ? "text-white/70" : "text-[var(--color-text-secondary)]";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {label && (
        <span className="section-label text-label text-[var(--color-accent)]">
          {label}
        </span>
      )}
      <h2 className={`text-heading-xl ${textColor} max-w-2xl`}>{title}</h2>
      <div className={`divider ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`text-body-lg ${subtitleColor} max-w-xl mt-1`}>{subtitle}</p>
      )}
    </div>
  );
}
