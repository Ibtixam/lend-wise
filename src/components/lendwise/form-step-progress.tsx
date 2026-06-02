"use client";

import { getStepProgress, useFormStepObserver } from "@/hooks/use-form-step";

const STEP_IDS = ["form-step-1", "form-step-2", "form-step-3"];

export function FormStepProgress() {
  const { activeStep, steps } = useFormStepObserver(STEP_IDS);
  const progress = getStepProgress(activeStep);
  const current = steps[activeStep - 1];

  return (
    <div className="sticky top-0 z-30 -mx-1 mb-5 rounded-xl border border-border-subtle bg-black/90 px-4 py-3 backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-zinc-400">
          Step {activeStep} of 3
        </p>
        <p className="truncate text-xs font-semibold text-gold">{current.label}</p>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-valuenow={activeStep}
        aria-valuemin={1}
        aria-valuemax={3}
        aria-label={`Form progress: step ${activeStep} of 3`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-border via-gold to-gold-bright transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
        {steps.map((step) => (
          <span
            key={step.id}
            className={
              step.id === activeStep
                ? "font-medium text-gold"
                : step.id < activeStep
                  ? "text-zinc-500"
                  : ""
            }
          >
            {step.id}. {step.label.split(" ")[0]}
          </span>
        ))}
      </div>
    </div>
  );
}
