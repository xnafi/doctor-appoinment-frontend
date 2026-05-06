// src/components/queue/QueueTable.tsx
"use client";

import { useState } from "react";
import { Pencil, Trash2, Phone } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Appointment } from "@/types";

interface Props {
  appointments: Appointment[];
  onEdit: (a: Appointment) => void;
  onDelete: (a: Appointment) => void;
  deletingId?: string;
}

export function QueueTable({ appointments, onEdit, onDelete, deletingId }: Props) {
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = filter === "ALL"
    ? appointments
    : appointments.filter((a) => a.status === filter);

  const filters = ["ALL", "WAITING", "CALLED", "DONE", "SKIPPED", "CANCELLED"];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      {/* Filter tabs */}
      <div className="flex gap-1 p-3 border-b border-slate-700 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f
                ? "bg-sky-500 text-white"
                : "text-slate-400 hover:bg-slate-700"
            }`}
          >
            {f === "ALL" ? `All (${appointments.length})` : f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
              <th className="text-left px-4 py-3 w-16">#</th>
              <th className="text-left px-4 py-3">Patient</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Note</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Skips</th>
              <th className="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-slate-500 py-12 italic">
                  No appointments
                </td>
              </tr>
            )}
            {filtered.map((appt, i) => (
              <tr
                key={appt.id}
                className={`border-b border-slate-700/50 transition-colors ${
                  appt.status === "CALLED"
                    ? "bg-sky-500/5"
                    : i % 2 === 0
                    ? ""
                    : "bg-slate-800/50"
                }`}
              >
                <td className="px-4 py-3 font-bold text-white tabular-nums">
                  {String(appt.serialNumber).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 font-medium text-white">
                  {appt.patientName}
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {appt.phone ? (
                    <a
                      href={`tel:${appt.phone}`}
                      className="flex items-center gap-1 hover:text-sky-400"
                    >
                      <Phone className="w-3 h-3" />
                      {appt.phone}
                    </a>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-400 max-w-[160px] truncate">
                  {appt.note ?? <span className="text-slate-600">—</span>}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={appt.status} />
                </td>
                <td className="px-4 py-3 text-slate-500 tabular-nums text-center">
                  {appt.skipCount > 0 ? (
                    <span className="text-amber-400">{appt.skipCount}</span>
                  ) : (
                    "0"
                  )}
                </td>
                <td className="px-4 py-3">
                  {appt.status !== "DONE" && appt.status !== "CANCELLED" && (
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => onEdit(appt)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(appt)}
                        disabled={deletingId === appt.id}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                        title="Cancel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
