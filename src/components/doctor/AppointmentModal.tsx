// src/components/doctor/AppointmentModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { doctorApi } from "@/lib/api";
import { useDoctorStore } from "@/store/doctorStore";
import type { Appointment } from "@/types";

interface Props {
  appointment?: Appointment | null;
  onClose: () => void;
  onSaved: () => void;
}

export function AppointmentModal({ appointment, onClose, onSaved }: Props) {
  const { doctorKey } = useDoctorStore();
  const isEdit = !!appointment;

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (appointment) {
      setForm({
        patientName: appointment.patientName,
        phone: appointment.phone ?? "",
        note: appointment.note ?? "",
      });
    }
  }, [appointment]);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.patientName.trim()) {
      setError("Patient name is required");
      return;
    }
    setLoading(true);
    try {
      const data = {
        patientName: form.patientName.trim(),
        phone: form.phone.trim() || undefined,
        note: form.note.trim() || undefined,
      };
      if (isEdit) {
        await doctorApi.update(doctorKey, appointment!.id, data);
      } else {
        await doctorApi.create(doctorKey, data);
      }
      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md slide-up">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="font-bold text-white">
            {isEdit ? "Edit Appointment" : "Add Appointment"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <Input
            label="Patient Name *"
            placeholder="e.g. Rahim Uddin"
            value={form.patientName}
            onChange={set("patientName")}
            autoFocus
          />
          <Input
            label="Phone"
            placeholder="01711234567"
            value={form.phone}
            onChange={set("phone")}
            type="tel"
          />
          <Textarea
            label="Note"
            placeholder="Reason for visit..."
            value={form.note}
            onChange={set("note")}
          />

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {isEdit ? "Save Changes" : "Add Patient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
