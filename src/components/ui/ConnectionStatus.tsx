// src/components/ui/ConnectionStatus.tsx
import clsx from "clsx";

export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={clsx(
          "w-2 h-2 rounded-full",
          connected ? "bg-emerald-400 shadow-[0_0_6px_#4ade80]" : "bg-red-500"
        )}
      />
      <span className="text-xs text-slate-400">
        {connected ? "Live" : "Reconnecting…"}
      </span>
    </div>
  );
}
