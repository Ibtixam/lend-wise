import { ADSENSE_CLIENT, isAdSenseEnabled } from "@/lib/adsense";

/**
 * Native script tag — do not use next/script; AdSense rejects data-nscript.
 * @see https://support.google.com/adsense/answer/9274015
 */
export function AdSenseScript() {
  if (!isAdSenseEnabled()) {
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
