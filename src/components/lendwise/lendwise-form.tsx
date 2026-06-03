"use client";

import { Brain, Sparkles, UserRound, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fieldHints } from "@/lib/field-hints";
import {
  hasFormErrors,
  validateForm,
  type FormErrors,
  type ValidatedField,
} from "@/lib/validate-form";
import type { AssessmentResult, LendingFormData } from "@/lib/types";
import { initialFormData } from "@/lib/types";
import { AmountInput } from "./amount-input";
import { AssessmentLoading } from "./assessment-loading";
import { AssessmentResultPanel } from "./assessment-result";
import { ChipGroup } from "./chip-group";
import { FormStepProgress } from "./form-step-progress";
import { FieldLabel } from "./field-label";
import { LendWiseHeader } from "./header";
import { SectionCard } from "./section-card";
import { ValidationSummary } from "./validation-summary";
import {
  approachOptions,
  comfortOptions,
  financialOptions,
  gutOptions,
  reasonOptions,
  relationshipOptions,
  repaymentOptions,
  timelineOptions,
} from "@/lib/labels";

function scrollToField(field: ValidatedField) {
  document
    .getElementById(`field-${field}`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function LendWiseForm() {
  const [form, setForm] = useState<LendingFormData>(initialFormData);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showIslamic, setShowIslamic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const resultAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) return;
    const timer = window.setTimeout(() => {
      resultAnchorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [result]);

  const update = <K extends keyof LendingFormData>(
    key: K,
    value: LendingFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setApiError(null);
    if (key in fieldErrors) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key as ValidatedField];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (hasFormErrors(errors)) {
      setFieldErrors(errors);
      setApiError(null);
      const first = Object.keys(errors)[0] as ValidatedField;
      scrollToField(first);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Assessment failed. Please try again.");
      }

      const data: AssessmentResult = await res.json();
      setResult(data);
      setShowIslamic(
        form.includeIslamicPerspective || Boolean(data.islamicPerspective),
      );
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormData);
    setResult(null);
    setShowIslamic(false);
    setFieldErrors({});
    setApiError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return (
      <div className="lendwise-shell">
        <LendWiseHeader />
        <div
          id="lendwise-assessment-result"
          ref={resultAnchorRef}
          className="scroll-mt-4"
        >
          <AssessmentResultPanel
            result={result}
            loanAmount={form.amount}
            showIslamic={showIslamic}
            onToggleIslamic={setShowIslamic}
            onReset={handleReset}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="lendwise-shell">
      <LendWiseHeader />

      {loading ? (
        <AssessmentLoading />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" noValidate>
          <FormStepProgress />

          {hasFormErrors(fieldErrors) && (
            <ValidationSummary
              errors={fieldErrors}
              onFieldClick={scrollToField}
            />
          )}

          {apiError && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {apiError}
            </div>
          )}

          <div id="form-step-1" className="scroll-mt-32">
          <SectionCard icon={UserRound} title="About the Borrower">
            <ChipGroup
              fieldId="relationship"
              label="Relationship Type"
              hint={fieldHints.relationship}
              error={fieldErrors.relationship}
              options={relationshipOptions}
              value={form.relationship}
              onChange={(v) => update("relationship", v)}
              columns={5}
            />
            <ChipGroup
              fieldId="repaymentHistory"
              label="Repayment History"
              hint={fieldHints.repaymentHistory}
              error={fieldErrors.repaymentHistory}
              options={repaymentOptions}
              value={form.repaymentHistory}
              onChange={(v) => update("repaymentHistory", v)}
              columns={4}
            />
            <ChipGroup
              fieldId="reason"
              label="Reason for Borrowing"
              hint={fieldHints.reason}
              error={fieldErrors.reason}
              options={reasonOptions}
              value={form.reason}
              onChange={(v) => update("reason", v)}
              columns={5}
            />
          </SectionCard>
          </div>

          <div id="form-step-2" className="scroll-mt-32">
          <SectionCard icon={Wallet} title="Loan Details">
            <div
              id="field-amount"
              className={`scroll-mt-28 space-y-3 ${fieldErrors.amount ? "rounded-lg outline outline-1 outline-offset-4 outline-red-400/35" : ""}`}
            >
              <FieldLabel
                htmlFor="amount"
                label="Amount Requested (PKR)"
                hint={fieldHints.amount}
                error={fieldErrors.amount}
              />
              <AmountInput
                value={form.amount}
                onChange={(digits) => update("amount", digits)}
                error={Boolean(fieldErrors.amount)}
              />
            </div>
            <ChipGroup
              fieldId="comfortable"
              label="Comfortable with Amount?"
              hint={fieldHints.comfortable}
              error={fieldErrors.comfortable}
              options={comfortOptions}
              value={form.comfortable}
              onChange={(v) => update("comfortable", v)}
              columns={3}
            />
            <ChipGroup
              fieldId="timeline"
              label="Repayment Timeline"
              hint={fieldHints.timeline}
              error={fieldErrors.timeline}
              options={timelineOptions}
              value={form.timeline}
              onChange={(v) => update("timeline", v)}
              columns={5}
            />
            <ChipGroup
              fieldId="financialSituation"
              label="Borrower's Financial Situation"
              hint={fieldHints.financialSituation}
              error={fieldErrors.financialSituation}
              options={financialOptions}
              value={form.financialSituation}
              onChange={(v) => update("financialSituation", v)}
              columns={3}
            />
          </SectionCard>
          </div>

          <div id="form-step-3" className="scroll-mt-32">
          <SectionCard icon={Brain} title="Behavioral Signals">
            <ChipGroup
              fieldId="approach"
              label="How They Approached You"
              hint={fieldHints.approach}
              error={fieldErrors.approach}
              options={approachOptions}
              value={form.approach}
              onChange={(v) => update("approach", v)}
              columns={3}
            />
            <ChipGroup
              fieldId="gutFeeling"
              label="Your Gut Feeling"
              hint={fieldHints.gutFeeling}
              error={fieldErrors.gutFeeling}
              options={gutOptions}
              value={form.gutFeeling}
              onChange={(v) => update("gutFeeling", v)}
              columns={3}
            />
            <div id="field-notes" className="scroll-mt-28 space-y-3">
              <FieldLabel
                htmlFor="notes"
                label="Additional Notes"
                optional
                hint="Mention promises made, other lenders, or family pressure — anything that affects your decision."
              />
              <textarea
                id="notes"
                rows={4}
                placeholder="Any other details you'd like to share..."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full resize-none rounded-lg border border-border-subtle bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-muted-subtle focus:border-gold-text/50 focus:outline-none focus:ring-1 focus:ring-gold-text/30"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={form.includeIslamicPerspective}
                onChange={(e) =>
                  update("includeIslamicPerspective", e.target.checked)
                }
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-600 bg-surface-elevated accent-gold"
              />
              <span>
                Include Islamic finance perspective in assessment
                <span className="mt-0.5 block text-xs text-muted-subtle">
                  Adds qard hasan and ethical lending guidance to your result.
                </span>
              </span>
            </label>
          </SectionCard>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-4 text-base font-bold text-black transition-all hover:bg-gold-bright"
          >
            <Sparkles className="h-5 w-5" />
            Get AI Assessment
          </button>
        </form>
      )}

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 space-y-1 text-center">
      <p className="text-sm text-muted">
        Made with care for the Pakistani community
      </p>
      <p className="text-xs text-muted-subtle">
        This tool provides guidance only. Always trust your judgment.
      </p>
    </footer>
  );
}
