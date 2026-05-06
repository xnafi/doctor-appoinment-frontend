// src/store/doctorStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DoctorStore {
  doctorKey: string;
  isAuthenticated: boolean;
  setKey: (key: string) => void;
  logout: () => void;
}

export const useDoctorStore = create<DoctorStore>()(
  persist(
    (set) => ({
      doctorKey: "",
      isAuthenticated: false,

      setKey: (doctorKey) => set({ doctorKey, isAuthenticated: !!doctorKey }),
      logout: () => set({ doctorKey: "", isAuthenticated: false }),
    }),
    { name: "doctor-auth" }
  )
);
