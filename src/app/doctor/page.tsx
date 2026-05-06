// src/app/doctor/page.tsx
"use client";

import { useState, useCallback } from "react";
import { LogOut, Plus, RefreshCw } from "lucide-react";
import { useDoctorStore } from "@/store/doctorStore";
import { DoctorLogin } from "@/components/doctor/DoctorLogin";
import { QueueControls } from "@/components/doctor/QueueControls";
import { AppointmentModal } from "@/components/doctor/AppointmentModal";
import { QueueTable } from "@/components/queue/QueueTable";
import { StatsBar } from "@/components/queue/StatsBar";
import { ConnectionStatus } from "@/components/ui/ConnectionStatus";
import { Button } from "@/components/ui/Button";
import { useQueue } from "@/hooks/useQueue";
import { doctorApi, queueApi } from "@/lib/api";
import type { Appointment } from "@/types";

export default function DoctorPage() {
  const { isAuthenticated, doctorKey, logout } = useDoctorStore();

  if (!isAuthenticated) return <DoctorLogin />;

  return <DoctorDashboard doctorKey={doctorKey} onLogout={logout} />;
}

function DoctorDashboard({
  doctorKey,
  onLogout,
}: {
  doctorKey: string;
  onLogout: () => void;
}) {
  const { snapshot, isConnected, isLoading, setSnapshot } = useQueue({ room: "doctor" });

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Appointment | null>(null);
  const [deletingId, setDeletingId] = useState<string | undefined>();

  const refresh = useCallback(() => {
    queueApi.getSnapshot().then(setSnapshot).catch(console.error);
  }, [setSnapshot]);

  async function handleDelete(appt: Appointment) {
    if (!confirm(`Cancel appointment for ${appt.patientName}?`)) return;
    setDeletingId(appt.id);
    try {
      await doctorApi.delete(doctorKey, appt.id);
      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(undefined);
    }
  }

  function openAdd() {
    setEditTarget(null);
    setModalOpen(true);
  }

  function openEdit(appt: Appointment) {
    setEditTarget(appt);
    setModalOpen(true);
  }

  if (isLoading || !snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">🏥 Doctor Panel</span>
          <ConnectionStatus connected={isConnected} />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full">
        {/* Stats */}
        <StatsBar snapshot={snapshot} />

        {/* Controls */}
        <QueueControls snapshot={snapshot} onUpdate={refresh} />

        {/* Appointments table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-white">
              Today&apos;s Appointments
              <span className="text-slate-500 font-normal ml-2 text-sm">
                ({snapshot.totalToday})
              </span>
            </h2>
            <Button
              onClick={openAdd}
              icon={<Plus className="w-4 h-4" />}
              size="sm"
            >
              Add Patient
            </Button>
          </div>

          <QueueTable
            appointments={snapshot.appointments}
            onEdit={openEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <AppointmentModal
          appointment={editTarget}
          onClose={() => setModalOpen(false)}
          onSaved={refresh}
        />
      )}
    </div>
  );
}
