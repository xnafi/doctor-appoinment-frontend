// src/components/queue/NextPatientCard.tsx
import type { Appointment } from "@/types";
import { Bell } from "lucide-react";

interface Props {
  next: Appointment | null;
  upcoming: Appointment | null;
}

export function NextPatientCard({ next, upcoming }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Next */}
      <div className="bg-slate-800 border border-emerald-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-emerald-400" />
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            Please Get Ready
          </p>
        </div>
        {next ? (
          <>
            <p className="text-4xl font-black text-white tabular-nums">
              {String(next.serialNumber).padStart(2, "0")}
            </p>
            <p className="text-lg font-semibold text-slate-200 mt-1">{next.patientName}</p>
          </>
        ) : (
          <p className="text-slate-500 italic">No one next</p>
        )}
      </div>

      {/* Upcoming */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
          Following
        </p>
        {upcoming ? (
          <>
            <p className="text-4xl font-black text-slate-400 tabular-nums">
              {String(upcoming.serialNumber).padStart(2, "0")}
            </p>
            <p className="text-lg font-semibold text-slate-400 mt-1">{upcoming.patientName}</p>
          </>
        ) : (
          <p className="text-slate-500 italic">—</p>
        )}
      </div>
    </div>
  );
}
