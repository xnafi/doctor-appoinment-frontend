// src/hooks/useQueue.ts
"use client";

import { useEffect, useRef } from "react";
import { getSocket, SocketEvents, SocketRooms } from "@/lib/socket";
import { queueApi } from "@/lib/api";
import { useQueueStore } from "@/store/queueStore";
import { announcePatient, announceNextPatient } from "@/lib/voice";
import type { QueueSnapshot, Appointment } from "@/types";

interface UseQueueOptions {
  /** "display" joins the display room and triggers voice. "doctor" joins doctor room. */
  room: "display" | "doctor";
  /** Enable voice announcements (display screen only) */
  voice?: boolean;
}

export function useQueue({ room, voice = false }: UseQueueOptions) {
  const { setSnapshot, setConnected, setLoading, setLastCalled } = useQueueStore();
  const lastCalledIdRef = useRef<string | null>(null);
  const lastManualCallAtRef = useRef<number>(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const socket = getSocket();

    // ── Initial load via REST ─────────────────────────────────────────────────
    setLoading(true);
    queueApi.getSnapshot().then(setSnapshot).catch(console.error);

    // ── Socket.io ─────────────────────────────────────────────────────────────
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit(SocketEvents.JOIN_ROOM, room);
      // Stop polling once connected
      if (pollRef.current) clearInterval(pollRef.current);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      // Start polling as fallback
      pollRef.current = setInterval(() => {
        queueApi.getSnapshot().then(setSnapshot).catch(console.error);
      }, 5_000);
    });

    socket.on(SocketEvents.QUEUE_UPDATED, (data: QueueSnapshot) => {
      setSnapshot(data);
    });

    socket.on(SocketEvents.PATIENT_CALLED, (patient: Appointment) => {
      setLastCalled(patient);

      // Prevent double-announcing same patient
      if (voice && patient.id !== lastCalledIdRef.current) {
        lastCalledIdRef.current = patient.id;
        lastManualCallAtRef.current = Date.now();
        announcePatient(patient.serialNumber, patient.patientName);
      }
    });

    socket.on(SocketEvents.PATIENT_NEXT, (patient: Appointment) => {
      if (!voice) return;

      // Only announce "next patient be ready" if it follows a real/manual call flow.
      // This avoids unrelated automatic next events from triggering audio unexpectedly.
      const justCalledPatient = Date.now() - lastManualCallAtRef.current < 10_000;
      if (!justCalledPatient) return;

      setTimeout(() => announceNextPatient(patient.serialNumber, patient.patientName), 6_000);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(SocketEvents.QUEUE_UPDATED);
      socket.off(SocketEvents.PATIENT_CALLED);
      socket.off(SocketEvents.PATIENT_NEXT);
      socket.disconnect();
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [room, voice, setSnapshot, setConnected, setLoading, setLastCalled]);

  return useQueueStore();
}
