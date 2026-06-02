import { formatPkrLabel } from "./format-pkr";
import type { AssessmentResult } from "./types";

export function buildAssessmentShareText(
  result: AssessmentResult,
  options?: { amount?: string; showIslamic?: boolean },
): string {
  const lines: string[] = [
    "✨ *LendWise Assessment*",
    "",
    `*Verdict:* ${result.verdict}`,
    `*Trust & Safety Score:* ${result.trustScore}/100`,
  ];

  if (options?.amount) {
    const pkr = formatPkrLabel(options.amount);
    if (pkr) lines.push(`*Amount:* ${pkr}`);
  }

  lines.push(
    "",
    `*${result.headline}*`,
    "",
    result.reasoning,
    "",
    "*Pros*",
    ...result.pros.map((p) => `• ${p}`),
    "",
    "*Cons*",
    ...result.cons.map((c) => `• ${c}`),
    "",
    "*Practical Advice*",
    result.practicalAdvice,
  );

  if (options?.showIslamic && result.islamicPerspective) {
    lines.push("", "*Islamic Finance Perspective*", result.islamicPerspective);
  }

  lines.push(
    "",
    "—",
    "Guidance only. Always trust your judgment.",
    typeof window !== "undefined" ? window.location.origin : "",
  );

  return lines.join("\n");
}

export function openWhatsAppShare(text: string): void {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
