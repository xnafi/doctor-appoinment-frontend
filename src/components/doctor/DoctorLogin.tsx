// src/components/doctor/DoctorLogin.tsx
"use client";

import { useState } from "react";
import { KeyRound, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDoctorStore } from "@/store/doctorStore";
import { doctorApi } from "@/lib/api";

export function DoctorLogin() {
  const { setKey } = useDoctorStore();
  const [key, setKeyInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError("");
    try {
      // Validate key by calling a doctor endpoint
      await doctorApi.create(key.trim(), {
        patientName: "__ping__",
      });
    } catch (err: unknown) {
      const e = err as { status?: number };
      if (e.status === 401) {
        setError("Invalid doctor key. Please try again.");
        setLoading(false);
        return;
      }
      // Any other error (e.g. 422 from __ping__ name) means auth passed
    }
    setKey(key.trim());
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-sm slide-up">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Doctor Panel</h1>
          <p className="text-sm text-slate-400 text-center">
            Enter your secret key to access queue management
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="Doctor Secret Key"
            type="password"
            placeholder="Enter your key..."
            value={key}
            onChange={(e) => setKeyInput(e.target.value)}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}
          <Button
            type="submit"
            loading={loading}
            icon={<KeyRound className="w-4 h-4" />}
            size="lg"
            className="mt-2"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
