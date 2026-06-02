import type { LendingFormData } from "./types";

export type ValidatedField = keyof Omit<
  LendingFormData,
  "notes" | "includeIslamicPerspective"
>;

export type FormErrors = Partial<Record<ValidatedField, string>>;

export const fieldLabels: Record<ValidatedField, string> = {
  relationship: "Relationship Type",
  repaymentHistory: "Repayment History",
  reason: "Reason for Borrowing",
  amount: "Amount Requested",
  comfortable: "Comfortable with Amount",
  timeline: "Repayment Timeline",
  financialSituation: "Financial Situation",
  approach: "How They Approached You",
  gutFeeling: "Your Gut Feeling",
};

export function validateForm(data: LendingFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.relationship) {
    errors.relationship = "Select how you're related to the borrower.";
  }
  if (!data.repaymentHistory) {
    errors.repaymentHistory = "Select their past repayment behavior.";
  }
  if (!data.reason) {
    errors.reason = "Select why they need the money.";
  }
  if (!data.amount.trim()) {
    errors.amount = "Enter the amount they're asking for in PKR.";
  } else if (parseInt(data.amount.replace(/\D/g, ""), 10) < 1) {
    errors.amount = "Enter a valid amount greater than zero.";
  }
  if (!data.comfortable) {
    errors.comfortable = "Say whether this amount feels okay for you.";
  }
  if (!data.timeline) {
    errors.timeline = "Select when you expect repayment.";
  }
  if (!data.financialSituation) {
    errors.financialSituation = "Select their current financial situation.";
  }
  if (!data.approach) {
    errors.approach = "Select how they asked you for the loan.";
  }
  if (!data.gutFeeling) {
    errors.gutFeeling = "Trust your instinct — pick a gut feeling.";
  }

  return errors;
}

export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
