"use client";

import { CircleHelp } from "lucide-react";

interface FieldLabelProps {
  htmlFor?: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

export function FieldLabel({
  htmlFor,
  label,
  hint,
  error,
  optional,
}: FieldLabelProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <label
          htmlFor={htmlFor}
          className={`text-sm font-medium ${error ? "text-red-300" : "text-zinc-300"}`}
        >
          {label}
          {optional && (
            <span className="ml-1 font-normal text-zinc-500">(Optional)</span>
          )}
        </label>
        {hint && <FieldHint text={hint} label={label} />}
      </div>
      {error && (
        <p className="flex items-start gap-1.5 text-xs text-red-400" role="alert">
          <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  );
}

function FieldHint({ text, label }: { text: string; label: string }) {
  const id = `hint-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <span className="group/hint relative inline-flex align-middle">
      <button
        type="button"
        aria-describedby={id}
        className="rounded-full p-0.5 text-zinc-500 transition-colors hover:text-gold focus:outline-none focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold/50"
      >
        <CircleHelp className="h-3.5 w-3.5" aria-hidden />
        <span className="sr-only">Help: {label}</span>
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 hidden w-60 -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-left text-xs leading-relaxed text-zinc-300 shadow-xl group-focus-within/hint:block sm:group-hover/hint:block"
      >
        {text}
      </span>
    </span>
  );
}
