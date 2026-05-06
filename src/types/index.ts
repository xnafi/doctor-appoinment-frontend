// src/types/index.ts

export type AppointmentStatus =
  | "WAITING"
  | "CALLED"
  | "IN_PROGRESS"
  | "DONE"
  | "SKIPPED"
  | "CANCELLED";

export type SkipReason = "NO_RESPONSE" | "SELF_CANCEL" | "DOCTOR";

export interface Appointment {
  id: string;
  serialNumber: number;
  patientName: string;
  phone?: string | null;
  note?: string | null;
  status: AppointmentStatus;
  date: string;
  skipCount: number;
  calledAt?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QueueState {
  id: number;
  currentSerial: number;
  isPaused: boolean;
  date: string;
  updatedAt: string;
}

export interface QueueSnapshot {
  state: QueueState;
  current: Appointment | null;
  next: Appointment | null;
  upcoming: Appointment | null;
  waitingCount: number;
  totalToday: number;
  doneCount: number;
  skippedCount: number;
  cancelledCount: number;
  appointments: Appointment[];
}

// Socket.io event payloads
export interface QueueUpdatedPayload extends QueueSnapshot {
  type?: string;
  appointment?: Appointment;
}
