import type { ValidatedField } from "./validate-form";

export const fieldHints: Record<ValidatedField, string> = {
  relationship:
    "Closer family ties often come with more social pressure to lend, even when it's risky.",
  repaymentHistory:
    "Past behavior is one of the strongest predictors — be honest, not hopeful.",
  reason:
    "Medical and education needs are viewed differently than luxury or unclear business asks.",
  amount:
    "Enter the full amount in PKR. Only lend what you can afford to never see again.",
  comfortable:
    "If the amount makes you uneasy, that feeling matters as much as the numbers.",
  timeline:
    "Vague timelines often lead to awkward follow-ups and damaged relationships.",
  financialSituation:
    "Someone who is struggling may need help — but may also struggle to repay.",
  approach:
    "Respectful asks are easier to decline calmly than guilt-driven pressure.",
  gutFeeling:
    "Your intuition picks up red flags your logical mind might ignore.",
};
