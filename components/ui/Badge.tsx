import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "primary" | "success" | "neutral";
  className?: string;
}

const variantMap = {
  accent: "badge-accent",
  primary: "badge-primary",
  success: "bg-green-50 text-green-700",
  neutral: "bg-gray-100 text-gray-600",
};

export function Badge({ children, variant = "accent", className = "" }: BadgeProps) {
  return (
    <span className={`badge ${variantMap[variant]} ${className}`}>{children}</span>
  );
}
