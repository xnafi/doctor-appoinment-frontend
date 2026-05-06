// src/app/book/page.tsx
"use client";

import { useState, useEffect } from "react";
import { UserPlus, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { patientApi, queueApi } from "@/lib/api";
import type { Appointment, QueueSnapshot } from "@/types";

type PageState = "form" | "success" | "already_booked";

export default function BookPage() {
  const [pageState, setPageState] = useState<PageState>("form");
  const [snapshot, setSnapshot] = useState<QueueSnapshot | null>(null);
  const [booked, setBooked] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    queueApi.getSnapshot().then(setSnapshot).catch(console.error);
  }, []);

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.patientName.trim()) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    try {
      const appt = await patientApi.book({
        patientName: form.patientName.trim(),
        phone: form.phone.trim() || undefined,
        note: form.note.trim() || undefined,
      });
      setBooked(appt);
      setPageState("success");
    } catch (err: unknown) {
      const e2 = err as { status?: number; message?: string };
      if (e2.status === 429) {
        setPageState("already_booked");
      } else {
        setError(e2.message ?? "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (pageState === "success" && booked) {
    const waitingAhead = (snapshot?.waitingCount ?? booked.serialNumber) - 1;
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-slate-800 border border-emerald-500/40 rounded-2xl p-8 w-full max-w-sm text-center slide-up">
          <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-1">Booked!</h2>
          <p className="text-slate-400 mb-6">Your appointment is confirmed</p>

          <div className="bg-slate-900 rounded-xl p-5 mb-6">
            <p className="text-slate-400 text-xs mb-1">Your Serial Number</p>
            <p className="text-6xl font-black text-emerald-400 tabular-nums">
              {String(booked.serialNumber).padStart(2, "0")}
            </p>
            <p className="text-white font-semibold mt-2">{booked.patientName}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-6">
            <Clock className="w-4 h-4" />
            <p>
              {waitingAhead > 0
                ? `${waitingAhead} patient(s) ahead of you`
                : "You're next!"}
            </p>
          </div>

          <p className="text-xs text-slate-500">
            Watch the display screen in the waiting room for your number to be called.
          </p>
        </div>
      </div>
    );
  }

  // ── Already booked screen ──────────────────────────────────────────────────
  if (pageState === "already_booked") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-slate-800 border border-amber-500/40 rounded-2xl p-8 w-full max-w-sm text-center slide-up">
          <p className="text-5xl mb-4">⚠️</p>
          <h2 className="text-xl font-bold text-white mb-2">Already Booked Today</h2>
          <p className="text-slate-400 mb-6">
            আপনি আজকে ইতিমধ্যে একটি অ্যাপয়েন্টমেন্ট নিয়েছেন।
            <br />
            <span className="text-sm">Only one booking per device per day is allowed.</span>
          </p>
          <Link href="/">
            <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Booking form ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-sm slide-up">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-bold text-white">Book Appointment</h1>
            {snapshot && (
              <p className="text-xs text-slate-400">
                {snapshot.waitingCount} patient(s) waiting today
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Your Name *"
            placeholder="e.g. Rahim Uddin"
            value={form.patientName}
            onChange={set("patientName")}
            autoFocus
          />
          <Input
            label="Phone (optional)"
            placeholder="01711234567"
            value={form.phone}
            onChange={set("phone")}
            type="tel"
          />
          <Textarea
            label="Reason for visit (optional)"
            placeholder="e.g. Blood pressure, follow-up..."
            value={form.note}
            onChange={set("note")}
          />

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <Button type="submit" loading={loading} size="lg" className="mt-2">
            Get My Token
          </Button>

          <p className="text-xs text-slate-500 text-center">
            One booking per device per day allowed
          </p>
        </form>
      </div>
    </div>
  );
}
