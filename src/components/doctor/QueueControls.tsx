// src/components/doctor/QueueControls.tsx
"use client";

import { useState } from "react";
import { SkipForward, ChevronRight, PauseCircle, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { doctorApi } from "@/lib/api";
import { useDoctorStore } from "@/store/doctorStore";
import type { QueueSnapshot } from "@/types";

interface Props {
  snapshot: QueueSnapshot;
  onUpdate: () => void;
}

export function QueueControls({ snapshot, onUpdate }: Props) {
  const { doctorKey } = useDoctorStore();
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSkip, setLoadingSkip] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);

  const isPaused = snapshot.state.isPaused;
  const hasCurrent = !!snapshot.current;
  const hasNext = snapshot.waitingCount > 0;

  async function handleNext() {
    setLoadingNext(true);
    try {
      await doctorApi.next(doctorKey);
      onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNext(false);
    }
  }

  async function handleSkip() {
    setLoadingSkip(true);
    try {
      await doctorApi.skip(doctorKey, "DOCTOR");
      onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSkip(false);
    }
  }

  async function handlePause() {
    setLoadingPause(true);
    try {
      await doctorApi.setPause(doctorKey, !isPaused);
      onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPause(false);
    }
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Queue Controls
      </h3>

      {/* Current patient info */}
      <div className="mb-4 p-4 bg-slate-900 rounded-xl">
        {snapshot.current ? (
          <div>
            <p className="text-xs text-slate-500 mb-1">Currently Calling</p>
            <p className="text-white font-bold text-lg">
              #{String(snapshot.current.serialNumber).padStart(2, "0")} —{" "}
              {snapshot.current.patientName}
            </p>
          </div>
        ) : (
          <p className="text-slate-500 italic text-sm">No patient currently called</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleNext}
          loading={loadingNext}
          disabled={!hasNext || isPaused}
          icon={<ChevronRight className="w-4 h-4" />}
          size="lg"
          className="flex-1"
        >
          {hasCurrent ? "Done → Next" : "Call Next"}
        </Button>

        <Button
          onClick={handleSkip}
          loading={loadingSkip}
          disabled={!hasCurrent || isPaused}
          variant="secondary"
          icon={<SkipForward className="w-4 h-4" />}
          size="lg"
        >
          Skip
        </Button>

        <Button
          onClick={handlePause}
          loading={loadingPause}
          variant={isPaused ? "primary" : "ghost"}
          icon={
            isPaused
              ? <PlayCircle className="w-4 h-4" />
              : <PauseCircle className="w-4 h-4" />
          }
          size="lg"
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
      </div>

      {isPaused && (
        <p className="text-amber-400 text-xs mt-3 text-center">
          ⚠️ Queue is paused — patients are not being called
        </p>
      )}
    </div>
  );
}
