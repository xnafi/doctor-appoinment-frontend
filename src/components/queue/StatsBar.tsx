// src/components/queue/StatsBar.tsx
import type { QueueSnapshot } from "@/types";

export function StatsBar({ snapshot }: { snapshot: QueueSnapshot }) {
  const stats = [
    { label: "Total Today",  value: snapshot.totalToday,   color: "text-slate-300" },
    { label: "Waiting",      value: snapshot.waitingCount,  color: "text-sky-400" },
    { label: "Done",         value: snapshot.doneCount,     color: "text-emerald-400" },
    { label: "Skipped",      value: snapshot.skippedCount,  color: "text-amber-400" },
    { label: "Cancelled",    value: snapshot.cancelledCount, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {stats.map(({ label, value, color }) => (
        <div key={label} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
