// src/lib/api.ts
import type { Appointment, QueueSnapshot } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// ─── Device ID ────────────────────────────────────────────────────────────────

/** Generates or retrieves a persistent device UUID stored in localStorage. */
export function getDeviceId(): string {
  if (typeof window === "undefined") return "ssr";
  const key = "dq_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  doctorKey?: string;
}

async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { doctorKey, ...rest } = opts;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Device-ID": getDeviceId(),
    ...(doctorKey ? { "X-Doctor-Key": doctorKey } : {}),
    ...(rest.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${BASE}/api${path}`, { ...rest, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message ?? `HTTP ${res.status}`) as Error & {
      code?: string;
      status?: number;
    };
    err.code = body.error;
    err.status = res.status;
    throw err;
  }

  return res.json() as Promise<T>;
}

// ─── Public APIs ──────────────────────────────────────────────────────────────

export const queueApi = {
  getSnapshot: () =>
    apiFetch<{ data: QueueSnapshot }>("/queue").then((r) => r.data),

  getAppointments: (date?: string) =>
    apiFetch<{ data: Appointment[] }>(
      `/appointments${date ? `?date=${date}` : ""}`
    ).then((r) => r.data),
};

export const patientApi = {
  book: (data: { patientName: string; phone?: string; note?: string }) =>
    apiFetch<{ data: Appointment }>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.data),
};

// ─── Doctor APIs ──────────────────────────────────────────────────────────────

function doctorFetch<T>(
  path: string,
  opts: FetchOptions & { doctorKey: string }
): Promise<T> {
  return apiFetch<T>(path, opts);
}

export const doctorApi = {
  // Appointments
  create: (
    key: string,
    data: { patientName: string; phone?: string; note?: string; serialNumber?: number; date?: string }
  ) =>
    doctorFetch<{ data: Appointment }>("/doctor/appointments", {
      method: "POST",
      body: JSON.stringify(data),
      doctorKey: key,
    }).then((r) => r.data),

  update: (
    key: string,
    id: string,
    data: Partial<Pick<Appointment, "patientName" | "phone" | "note" | "status">>
  ) =>
    doctorFetch<{ data: Appointment }>(`/doctor/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      doctorKey: key,
    }).then((r) => r.data),

  delete: (key: string, id: string) =>
    doctorFetch<{ data: Appointment }>(`/doctor/appointments/${id}`, {
      method: "DELETE",
      doctorKey: key,
    }).then((r) => r.data),

  // Queue
  next: (key: string) =>
    doctorFetch<{ data: QueueSnapshot }>("/doctor/queue/next", {
      method: "POST",
      body: "{}",
      doctorKey: key,
    }).then((r) => r.data),

  skip: (key: string, reason: string = "DOCTOR") =>
    doctorFetch<{ data: QueueSnapshot }>("/doctor/queue/skip", {
      method: "POST",
      body: JSON.stringify({ reason }),
      doctorKey: key,
    }).then((r) => r.data),

  setPause: (key: string, isPaused: boolean) =>
    doctorFetch<{ data: QueueSnapshot }>("/doctor/queue/pause", {
      method: "PATCH",
      body: JSON.stringify({ isPaused }),
      doctorKey: key,
    }).then((r) => r.data),
};
