// src/components/ui/Input.tsx
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={clsx(
          "bg-slate-800 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500",
          "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
          "transition-all duration-150",
          error ? "border-red-500" : "border-slate-700",
          className
        )}
      />
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={3}
        {...props}
        className={clsx(
          "bg-slate-800 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 resize-none",
          "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
          "transition-all duration-150",
          error ? "border-red-500" : "border-slate-700",
          className
        )}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
