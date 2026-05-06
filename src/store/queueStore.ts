// src/store/queueStore.ts
import { create } from "zustand";
import type { QueueSnapshot, Appointment } from "@/types";

interface QueueStore {
  snapshot: QueueSnapshot | null;
  isConnected: boolean;
  isLoading: boolean;
  lastCalledPatient: Appointment | null;

  setSnapshot: (s: QueueSnapshot) => void;
  setConnected: (v: boolean) => void;
  setLoading: (v: boolean) => void;
  setLastCalled: (a: Appointment) => void;
}

export const useQueueStore = create<QueueStore>((set) => ({
  snapshot: null,
  isConnected: false,
  isLoading: true,
  lastCalledPatient: null,

  setSnapshot: (snapshot) => set({ snapshot, isLoading: false }),
  setConnected: (isConnected) => set({ isConnected }),
  setLoading: (isLoading) => set({ isLoading }),
  setLastCalled: (lastCalledPatient) => set({ lastCalledPatient }),
}));
