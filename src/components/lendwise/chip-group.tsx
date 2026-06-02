"use client";

import { FieldLabel } from "./field-label";

type Option<T extends string> = { value: T; label: string };

interface ChipGroupProps<T extends string> {
  fieldId: string;
  label: string;
  hint?: string;
  error?: string;
  options: Option<T>[];
  value: T | "";
  onChange: (value: T) => void;
  columns?: "auto" | 3 | 4 | 5;
}

const gridClass: Record<NonNullable<ChipGroupProps<string>["columns"]>, string> =
  {
    auto: "chip-grid chip-grid--5",
    3: "chip-grid chip-grid--3",
    4: "chip-grid chip-grid--4",
    5: "chip-grid chip-grid--5",
  };

export function ChipGroup<T extends string>({
  fieldId,
  label,
  hint,
  error,
  options,
  value,
  onChange,
  columns = "auto",
}: ChipGroupProps<T>) {
  return (
    <div
      id={`field-${fieldId}`}
      className={`chip-field min-w-0 scroll-mt-28 space-y-3 ${error ? "chip-field--error" : ""}`}
    >
      <FieldLabel label={label} hint={hint} error={error} />
      <div className={gridClass[columns]} role="group" aria-invalid={error ? true : undefined}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`chip-btn min-w-0 ${selected ? "chip-btn--selected" : ""}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
