import { formatPkrLabel } from "./format-pkr";
import type { AssessmentResult, LendingFormData } from "./types";

export function getMockAssessment(data: LendingFormData): AssessmentResult {
  const amount = parseInt(data.amount.replace(/\D/g, ""), 10) || 0;
  const risky =
    data.repaymentHistory === "never" ||
    data.gutFeeling === "bad" ||
    data.approach === "guilt" ||
    data.comfortable === "no" ||
    data.reason === "luxury";

  const cautious =
    data.repaymentHistory === "sometimes" ||
    data.gutFeeling === "neutral" ||
    data.financialSituation === "struggling" ||
    data.timeline === "unclear";

  let verdict: AssessmentResult["verdict"] = "LEND";
  let trustScore = 72;

  if (risky) {
    verdict = "DECLINE";
    trustScore = 28;
  } else if (cautious) {
    verdict = "LEND WITH CAUTION";
    trustScore = 52;
  }

  if (data.repaymentHistory === "always" && data.gutFeeling === "good") {
    trustScore = Math.min(88, trustScore + 15);
    if (verdict === "DECLINE" && data.comfortable !== "no") {
      verdict = "LEND WITH CAUTION";
      trustScore = 48;
    }
  }

  const formattedAmount = formatPkrLabel(data.amount) || "this amount";

  return {
    verdict,
    trustScore,
    headline:
      verdict === "LEND"
        ? "This request shows reasonable signs of trustworthiness"
        : verdict === "LEND WITH CAUTION"
          ? "Proceed only with clear boundaries and documentation"
          : "Protecting your finances is the wiser choice here",
    reasoning: `Based on your relationship (${data.relationship || "unspecified"}) and their repayment track record, this ${formattedAmount} request deserves careful thought. In Pakistani social contexts, saying no can feel harder than the loan itself — but your comfort level and gut feeling matter as much as the numbers.\n\nThe stated reason (${data.reason || "unspecified"}) and their financial picture (${data.financialSituation || "unknown"}) shape whether this is a genuine need or a pattern. How they approached you (${data.approach || "unspecified"}) also signals respect for your boundaries.\n\n${verdict === "DECLINE" ? "Leaning toward decline protects you from repeat requests and resentment if repayment stalls." : verdict === "LEND WITH CAUTION" ? "If you lend, treat it as a structured arrangement — not an open-ended family favor." : "If you choose to help, a written timeline and amount cap keep expectations clear for everyone."}`,
    pros: [
      data.repaymentHistory === "always"
        ? "Strong history of repaying past loans"
        : "You know this person personally",
      data.reason === "medical" || data.reason === "education"
        ? "Purpose aligns with genuine need"
        : "Opportunity to support someone you care about",
      data.approach === "respectful"
        ? "They approached you respectfully"
        : "Clear repayment timeline discussed",
    ].slice(0, 3),
    cons: [
      data.repaymentHistory === "never" || data.repaymentHistory === "sometimes"
        ? "Inconsistent or poor repayment history"
        : "First-time borrower — no track record",
      data.comfortable === "no" || data.comfortable === "somewhat"
        ? "You are not fully comfortable with the amount"
        : "Amount may strain your own finances",
      data.approach === "guilt" || data.approach === "pressure"
        ? "Emotional pressure in how they asked"
        : "Unclear or long repayment window",
    ].slice(0, 3),
    practicalAdvice:
      verdict === "DECLINE"
        ? `Try: "Bhai, main abhi khud tight hoon — poora amount dena possible nahi. Agar chaho to thodi si madad soch sakta hoon, lekin loan ki form mein nahi." Keep it kind but firm. You do not owe a detailed financial audit.`
        : verdict === "LEND WITH CAUTION"
          ? `Lend only what you can afford to lose. Put the amount, timeline, and PKR ${amount ? amount.toLocaleString() : "X"} repayment date in writing (WhatsApp message is fine). Consider smaller installments rather than one lump sum.`
          : `If you proceed, document the agreement casually but clearly. Suggest a realistic monthly return that fits their situation. Check in at the halfway point — early silence often predicts problems.`,
    ...(data.includeIslamicPerspective
      ? {
          islamicPerspective:
            "Islam encourages kindness (ihsan) and qard hasan (benevolent loans without riba). Lending is virtuous when it does not harm your own dependents. If doubt is strong, declining kindly is preferable to lending resentfully or with unclear terms that damage the relationship.",
        }
      : {}),
  };
}
