"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, hasAdSlot } from "@/lib/adsense";

type AdFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface AdSlotProps {
  slotId: string;
  className?: string;
  format?: AdFormat;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSlot({
  slotId,
  className = "",
  format = "auto",
}: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!hasAdSlot(slotId) || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not loaded yet */
    }
  }, [slotId]);

  if (!hasAdSlot(slotId)) {
    return null;
  }

  return (
    <div
      className={`ad-slot-wrapper my-6 flex min-h-[90px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-subtle/50 bg-surface-card/50 ${className}`}
      aria-hidden={false}
    >
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
