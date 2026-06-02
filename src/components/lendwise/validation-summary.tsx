"use client";

import { AlertCircle } from "lucide-react";
import { fieldLabels, type FormErrors, type ValidatedField } from "@/lib/validate-form";

interface ValidationSummaryProps {
  errors: FormErrors;
  onFieldClick: (field: ValidatedField) => void;
}

export function ValidationSummary({ errors, onFieldClick }: ValidationSummaryProps) {
  const entries = Object.entries(errors) as [ValidatedField, string][];
  if (entries.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-4"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-red-200">
            {entries.length === 1
              ? "1 field needs your attention"
              : `${entries.length} fields need your attention`}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {entries.map(([field, message]) => (
              <li key={field}>
                <button
                  type="button"
                  onClick={() => onFieldClick(field)}
                  className="group w-full text-left text-sm text-red-300/90 transition-colors hover:text-red-200"
                >
                  <span className="font-medium text-red-200 group-hover:underline">
                    {fieldLabels[field]}
                  </span>
                  <span className="text-red-400/80"> — {message}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
