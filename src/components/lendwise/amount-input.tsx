"use client";

import { formatPkrAmount, parsePkrDigits } from "@/lib/format-pkr";

interface AmountInputProps {
  id?: string;
  value: string;
  onChange: (digits: string) => void;
  error?: boolean;
  className?: string;
}

export function AmountInput({
  id = "amount",
  value,
  onChange,
  error = false,
  className = "",
}: AmountInputProps) {
  const base =
    "w-full rounded-lg border bg-surface-elevated px-4 py-3 text-white placeholder:text-muted-subtle focus:outline-none focus:ring-1";
  const state = error
    ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/30"
    : "border-border-subtle focus:border-gold-text/50 focus:ring-gold-text/30";

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      placeholder="e.g., 50,000"
      value={formatPkrAmount(value)}
      onChange={(e) => onChange(parsePkrDigits(e.target.value))}
      aria-invalid={error}
      className={className || `${base} ${state}`}
    />
  );
}
