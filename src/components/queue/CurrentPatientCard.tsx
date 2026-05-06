// src/components/queue/CurrentPatientCard.tsx
import type { Appointment } from "@/types";
import { Mic2 } from "lucide-react";

interface Props {
  patient: Appointment | null;
  isPaused: boolean;
}

export function CurrentPatientCard({ patient, isPaused }: Props) {
  if (isPaused) {
    return (
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl p-10 text-center">
        <p className="text-5xl mb-4">⏸️</p>
        <p className="text-2xl font-bold text-amber-400">Queue Paused</p>
        <p className="text-slate-400 mt-2">Doctor will resume shortly</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-10 text-center">
        <p className="text-5xl mb-4">🏥</p>
        <p className="text-2xl font-bold text-slate-400">Queue not started</p>
        <p className="text-slate-500 mt-2">Waiting for doctor to begin</p>
      </div>
    );
  }

  return (
    <div className="bg-sky-500/10 border-2 border-sky-400 rounded-3xl p-10 text-center pulse-ring slide-up">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Mic2 className="w-6 h-6 text-sky-400 animate-pulse" />
        <p className="text-sky-400 font-semibold uppercase tracking-widest text-sm">
          Now Calling
        </p>
      </div>

      <p className="text-8xl font-black text-white mb-4 tabular-nums">
        {String(patient.serialNumber).padStart(2, "0")}
      </p>

      <p className="text-3xl font-bold text-sky-300 mb-2">{patient.patientName}</p>

      {patient.note && (
        <p className="text-slate-400 text-sm italic">{patient.note}</p>
      )}
    </div>
  );
}
