/** Strip everything except digits from a PKR input string */
export function parsePkrDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Format digits as PKR with en-PK grouping: 50000 → "50,000" */
export function formatPkrAmount(value: string): string {
  const digits = parsePkrDigits(value);
  if (!digits) return "";
  return Number(digits).toLocaleString("en-PK");
}

/** Display label for assessments: "PKR 50,000" */
export function formatPkrLabel(value: string): string {
  const formatted = formatPkrAmount(value);
  return formatted ? `PKR ${formatted}` : "";
}
