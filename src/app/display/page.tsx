"use client";

import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AppointmentItem = {
  id?: string;
  serialNumber?: number;
  patientName?: string;
  status?: string;
};

type QueueCardItem = {
  serialNumber?: number;
  patientName?: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

function toAppointments(data: unknown): AppointmentItem[] {
  let items: AppointmentItem[] = [];

  if (Array.isArray(data)) {
    items = data as AppointmentItem[];
  } else if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.appointments))
      items = obj.appointments as AppointmentItem[];
    else if (Array.isArray(obj.items))
      items = obj.items as AppointmentItem[];
  }

  // Filter out internal sentinel/probe entries used for auth validation
  return items.filter((a) => a.patientName !== "__ping__");
}

export default function DisplayPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/appointments", { cache: "no-store" });
        const json = (await res.json()) as ApiResponse;

        if (!mounted) return;

        if (!res.ok || !json.success) {
          setError(json.message || "Failed to load appointments");
          return;
        }

        setAppointments(toAppointments(json.data));
        setError("");
        setUpdatedAt(new Date());
      } catch {
        if (!mounted) return;
        setError("Network error while loading appointments");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    const interval = window.setInterval(load, 10000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const { waiting, current, next } = useMemo(() => {
    const waitingItems = appointments
      .filter((a) => {
        const status = (a.status || "").toLowerCase();
        return !status || status === "pending" || status === "waiting";
      })
      .sort(
        (a, b) => (a.serialNumber ?? Infinity) - (b.serialNumber ?? Infinity),
      );

    const servingCandidate = appointments.find((a) => {
      const status = (a.status || "").toLowerCase();
      return (
        status === "serving" || status === "in_progress" || status === "active"
      );
    });

    const fallbackCurrentSerial =
      waitingItems.length > 0 &&
      typeof waitingItems[0].serialNumber === "number"
        ? Math.max(1, waitingItems[0].serialNumber - 1)
        : undefined;

    const currentItem: QueueCardItem | undefined = servingCandidate
      ? {
          serialNumber: servingCandidate.serialNumber,
          patientName: servingCandidate.patientName,
        }
      : typeof fallbackCurrentSerial === "number"
        ? {
            serialNumber: fallbackCurrentSerial,
            patientName: "Currently being served",
          }
        : undefined;

    const nextItem = waitingItems[0];

    return {
      waiting: waitingItems,
      current: currentItem,
      next: nextItem,
    };
  }, [appointments]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-(--color-surface-light)">
        <section className="section-padding">
          <div className="container-site">
            <SectionHeading
              label="Live Queue"
              title="Display Board"
              subtitle="Real-time waiting room appointment display"
              align="left"
              className="mb-8"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-body-sm text-(--color-text-secondary) mb-5!">
                Track who is being served and who is next in line.
              </p>
              <p className="text-body-xs text-(--color-text-muted)">
                {updatedAt
                  ? `Last updated: ${updatedAt.toLocaleTimeString()}`
                  : "Updating..."}
              </p>
            </div>

            {loading ? (
              <div className="card p-8! sm:p-10! text-center text-(--color-text-muted)">
                Loading queue...
              </div>
            ) : error ? (
              <div className="card p-8! sm:p-10! text-center text-red-600">
                {error}
              </div>
            ) : (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                <div className="card p-6! sm:p-8!">
                  <p className="text-body-xs uppercase tracking-wide text-(--color-text-muted)">
                    Now Serving
                  </p>
                  <p className="text-display-lg sm:text-display-xl text-(--color-primary) mt-2!">
                    {current?.serialNumber ? `#${current.serialNumber}` : "—"}
                  </p>
                  <p className="text-heading-md text-(--color-text-primary) mt-2! wrap-break-word">
                    {current?.patientName || "No active queue"}
                  </p>
                </div>

                <div className="card p-6! sm:p-8!">
                  <p className="text-body-xs uppercase tracking-wide text-(--color-text-muted)">
                    Next Patient
                  </p>
                  <p className="text-display-md sm:text-display-lg text-(--color-accent) mt-2!">
                    {next?.serialNumber ? `#${next.serialNumber}` : "—"}
                  </p>
                  <p className="text-heading-md text-(--color-text-primary) mt-2! wrap-break-word">
                    {next?.patientName || "No upcoming patient"}
                  </p>
                </div>
              </section>
            )}

            <section className="card p-5! sm:p-6! mt-6!">
              <div className="flex items-center justify-between mb-4 gap-3">
                <h2 className="text-heading-md text-(--color-primary) mb-5!">
                  Queue List
                </h2>
                <span className="text-body-xs text-(--color-text-muted) ">
                  {waiting.length} waiting
                </span>
              </div>

              {waiting.length === 0 ? (
                <p className="text-body-sm text-(--color-text-muted)">
                  No waiting appointments right now.
                </p>
              ) : (
                <ul className="space-y-2">
                  {waiting.map((item) => (
                    <li
                      key={
                        item.id || `${item.serialNumber}-${item.patientName}`
                      }
                      className="border border-(--color-surface-muted) rounded-lg p-3! flex items-center justify-between gap-3"
                    >
                      <span className="font-semibold text-(--color-text-primary) shrink-0">
                        #{item.serialNumber ?? "--"}
                      </span>
                      <span className="text-(--color-text-secondary) text-right wrap-break-word">
                        {item.patientName || "Unknown"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
