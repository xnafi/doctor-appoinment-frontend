// src/app/page.tsx
import Link from "next/link";
import { Monitor, UserPlus, Stethoscope } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center slide-up">
        <h1 className="text-4xl font-bold text-white mb-2">🏥 Doctor Queue</h1>
        <p className="text-slate-400">Select your role to continue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl slide-up">
        <Link href="/display" className="group">
          <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500 rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-200">
            <Monitor className="w-10 h-10 text-sky-400 group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="font-semibold text-white">Display Screen</p>
              <p className="text-xs text-slate-400 mt-1">Waiting room board</p>
            </div>
          </div>
        </Link>

        <Link href="/book" className="group">
          <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-200">
            <UserPlus className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="font-semibold text-white">Book Appointment</p>
              <p className="text-xs text-slate-400 mt-1">Patient self-booking</p>
            </div>
          </div>
        </Link>

        <Link href="/doctor" className="group">
          <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-200">
            <Stethoscope className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="font-semibold text-white">Doctor Panel</p>
              <p className="text-xs text-slate-400 mt-1">Manage queue</p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
