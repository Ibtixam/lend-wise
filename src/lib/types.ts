export type RelationshipType =
  | "close-family"
  | "distant-relative"
  | "friend"
  | "colleague"
  | "acquaintance";

export type RepaymentHistory =
  | "always"
  | "sometimes"
  | "never"
  | "first-time";

export type BorrowingReason =
  | "medical"
  | "business"
  | "luxury"
  | "education"
  | "other";

export type ComfortLevel = "yes" | "somewhat" | "no";

export type RepaymentTimeline =
  | "1-month"
  | "3-months"
  | "6-months"
  | "1-year"
  | "unclear";

export type FinancialSituation = "stable" | "struggling" | "unknown";

export type ApproachStyle = "respectful" | "pressure" | "guilt";

export type GutFeeling = "good" | "neutral" | "bad";

export type Verdict = "LEND" | "LEND WITH CAUTION" | "DECLINE";

export interface LendingFormData {
  relationship: RelationshipType | "";
  repaymentHistory: RepaymentHistory | "";
  reason: BorrowingReason | "";
  amount: string;
  comfortable: ComfortLevel | "";
  timeline: RepaymentTimeline | "";
  financialSituation: FinancialSituation | "";
  approach: ApproachStyle | "";
  gutFeeling: GutFeeling | "";
  notes: string;
  includeIslamicPerspective: boolean;
}

export interface AssessmentResult {
  verdict: Verdict;
  trustScore: number;
  headline: string;
  reasoning: string;
  pros: string[];
  cons: string[];
  practicalAdvice: string;
  islamicPerspective?: string;
}

export const initialFormData: LendingFormData = {
  relationship: "",
  repaymentHistory: "",
  reason: "",
  amount: "",
  comfortable: "",
  timeline: "",
  financialSituation: "",
  approach: "",
  gutFeeling: "",
  notes: "",
  includeIslamicPerspective: false,
};
