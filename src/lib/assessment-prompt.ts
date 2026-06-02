import { formatPkrLabel } from "./format-pkr";
import type { LendingFormData } from "./types";
import {
  approachOptions,
  comfortOptions,
  financialOptions,
  gutOptions,
  reasonOptions,
  relationshipOptions,
  repaymentOptions,
  timelineOptions,
} from "./labels";

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? (value || "Not specified");
}

export function buildAssessmentPrompt(data: LendingFormData): string {
  return `You are LendWise, an empathetic AI advisor helping someone in Pakistan decide whether to lend money to a friend or family member.

Analyze this lending scenario and respond with ONLY valid JSON (no markdown fences) matching this schema:
{
  "verdict": "LEND" | "LEND WITH CAUTION" | "DECLINE",
  "trustScore": number 0-100,
  "headline": "short punchy summary",
  "reasoning": "2-3 paragraphs of thoughtful analysis, culturally aware of Pakistani family/social dynamics",
  "pros": ["string", ...],
  "cons": ["string", ...],
  "practicalAdvice": "actionable advice: conditions if lending, or diplomatic ways to decline in Urdu/English mix if appropriate",
  "islamicPerspective": "brief Islamic finance / qard hasan perspective (only if requested)"
}

Scenario:
- Relationship: ${labelFor(relationshipOptions, data.relationship)}
- Repayment history: ${labelFor(repaymentOptions, data.repaymentHistory)}
- Reason for borrowing: ${labelFor(reasonOptions, data.reason)}
- Amount requested (PKR): ${formatPkrLabel(data.amount) || "Not specified"}
- Comfortable with amount: ${labelFor(comfortOptions, data.comfortable)}
- Repayment timeline: ${labelFor(timelineOptions, data.timeline)}
- Borrower financial situation: ${labelFor(financialOptions, data.financialSituation)}
- How they approached: ${labelFor(approachOptions, data.approach)}
- Lender gut feeling: ${labelFor(gutOptions, data.gutFeeling)}
- Additional notes: ${data.notes || "None"}
- Include Islamic perspective in response: ${data.includeIslamicPerspective ? "yes" : "no — omit islamicPerspective field"}

Be honest, compassionate, and practical. Factor in guilt, family pressure, and financial self-protection.`;
}
