import type {
  ApproachStyle,
  BorrowingReason,
  ComfortLevel,
  FinancialSituation,
  GutFeeling,
  RelationshipType,
  RepaymentHistory,
  RepaymentTimeline,
} from "./types";

export const relationshipOptions: { value: RelationshipType; label: string }[] =
  [
    { value: "close-family", label: "Close Family" },
    { value: "distant-relative", label: "Distant Relative" },
    { value: "friend", label: "Friend" },
    { value: "colleague", label: "Colleague" },
    { value: "acquaintance", label: "Acquaintance" },
  ];

export const repaymentOptions: { value: RepaymentHistory; label: string }[] = [
  { value: "always", label: "Always Pays Back" },
  { value: "sometimes", label: "Sometimes" },
  { value: "never", label: "Never" },
  { value: "first-time", label: "First Time" },
];

export const reasonOptions: { value: BorrowingReason; label: string }[] = [
  { value: "medical", label: "Medical Emergency" },
  { value: "business", label: "Business" },
  { value: "luxury", label: "Personal Luxury" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export const comfortOptions: { value: ComfortLevel; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "somewhat", label: "Somewhat" },
  { value: "no", label: "No" },
];

export const timelineOptions: { value: RepaymentTimeline; label: string }[] = [
  { value: "1-month", label: "1 Month" },
  { value: "3-months", label: "3 Months" },
  { value: "6-months", label: "6 Months" },
  { value: "1-year", label: "1 Year" },
  { value: "unclear", label: "Unclear" },
];

export const financialOptions: {
  value: FinancialSituation;
  label: string;
}[] = [
  { value: "stable", label: "Stable" },
  { value: "struggling", label: "Struggling" },
  { value: "unknown", label: "Unknown" },
];

export const approachOptions: { value: ApproachStyle; label: string }[] = [
  { value: "respectful", label: "Respectful" },
  { value: "pressure", label: "Emotional Pressure" },
  { value: "guilt", label: "Guilt-Tripping" },
];

export const gutOptions: { value: GutFeeling; label: string }[] = [
  { value: "good", label: "Good" },
  { value: "neutral", label: "Neutral" },
  { value: "bad", label: "Bad" },
];
