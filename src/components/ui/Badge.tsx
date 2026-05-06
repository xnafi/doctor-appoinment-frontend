// src/components/ui/Badge.tsx
import clsx from "clsx";
import type { AppointmentStatus } from "@/types";

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  WAITING:     { label: "Waiting",     className: "bg-slate-700 text-slate-300" },
  CALLED:      { label: "Called",      className: "bg-sky-500/20 text-sky-300 border border-sky-500/40" },
  IN_PROGRESS: { label: "In Progress", className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" },
  DONE:        { label: "Done",        className: "bg-slate-600/40 text-slate-400" },
  SKIPPED:     { label: "Skipped",     className: "bg-amber-500/20 text-amber-300 border border-amber-500/40" },
  CANCELLED:   { label: "Cancelled",   className: "bg-red-500/20 text-red-300 border border-red-500/40" },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", className)}>
      {label}
    </span>
  );
}
