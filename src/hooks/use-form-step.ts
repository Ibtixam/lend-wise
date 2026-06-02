"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { id: 1, label: "About the Borrower" },
  { id: 2, label: "Loan Details" },
  { id: 3, label: "Behavioral Signals" },
] as const;

export type FormStep = 1 | 2 | 3;

export function useFormStepObserver(stepIds: string[]) {
  const [activeStep, setActiveStep] = useState<FormStep>(1);

  useEffect(() => {
    const elements = stepIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const id = visible[0].target.id;
        const index = stepIds.indexOf(id);
        if (index >= 0) {
          setActiveStep((index + 1) as FormStep);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [stepIds]);

  return { activeStep, steps: STEPS };
}

export function getStepProgress(step: FormStep): number {
  return (step / 3) * 100;
}
