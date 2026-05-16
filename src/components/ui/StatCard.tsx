import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  inverted?: boolean;
}

export function StatCard({ value, label, icon, inverted = false }: StatCardProps) {
  const bg = inverted ? "bg-white/10" : "bg-white";
  const textPrimary = inverted ? "text-white" : "text-[var(--color-primary)]";
  const textSecondary = inverted ? "text-white/70" : "text-[var(--color-text-secondary)]";

  return (
    <div className={`${bg} rounded-xl py-3! flex flex-col items-center text-center gap-2 transition-all duration-300 hover:-translate-y-1`}>
      {icon && <div className={`${textPrimary} mb-1`}>{icon}</div>}
      <span className={`text-display-md font-bold ${textPrimary}`}>{value}</span>
      <span className={`text-body-sm ${textSecondary}`}>{label}</span>
    </div>
  );
}
