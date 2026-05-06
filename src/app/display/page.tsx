// src/app/display/page.tsx
"use client";

import { useQueue } from "@/hooks/useQueue";
import { CurrentPatientCard } from "@/components/queue/CurrentPatientCard";
import { NextPatientCard } from "@/components/queue/NextPatientCard";
import { StatsBar } from "@/components/queue/StatsBar";
import { ConnectionStatus } from "@/components/ui/ConnectionStatus";
import { format } from "date-fns";

export default function DisplayPage() {
  const { snapshot, isConnected, isLoading } = useQueue({
    room: "display",
    voice: true,
  });

  if (isLoading || !snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400">Loading queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 gap-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">🏥 Doctor Queue</h1>
          <p className="text-sm text-slate-500">
            {format(new Date(), "EEEE, dd MMMM yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-slate-400 text-sm tabular-nums" suppressHydrationWarning>
            {format(new Date(), "hh:mm a")}
          </p>
          <ConnectionStatus connected={isConnected} />
        </div>
      </header>

      {/* Main: current patient */}
      <div className="flex-1 flex flex-col justify-center gap-6">
        <CurrentPatientCard
          patient={snapshot.current}
          isPaused={snapshot.state.isPaused}
        />
        <NextPatientCard next={snapshot.next} upcoming={snapshot.upcoming} />
      </div>

      {/* Stats footer */}
      <StatsBar snapshot={snapshot} />
    </div>
  );
}
