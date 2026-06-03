/** Google AdSense publisher ID (ca-pub-...) */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ||
  "ca-pub-5583917415724434";

/** Create ad units in AdSense → copy slot IDs into .env */
export const ADSENSE_SLOTS = {
  formTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FORM?.trim() || "",
  formBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FORM_BOTTOM?.trim() || "",
  result: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT?.trim() || "",
} as const;

export function isAdSenseEnabled(): boolean {
  return Boolean(ADSENSE_CLIENT);
}

export function hasAdSlot(slot: string): boolean {
  return Boolean(slot && ADSENSE_CLIENT);
}
