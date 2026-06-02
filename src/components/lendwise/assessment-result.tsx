"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { fireLendConfetti } from "@/lib/confetti";
import { buildAssessmentShareText, openWhatsAppShare } from "@/lib/share-result";
import type { AssessmentResult, Verdict } from "@/lib/types";

interface AssessmentResultPanelProps {
  result: AssessmentResult;
  loanAmount: string;
  showIslamic: boolean;
  onToggleIslamic: (show: boolean) => void;
  onReset: () => void;
}

const verdictConfig: Record<
  Verdict,
  { icon: typeof CheckCircle2; className: string; ring: string }
> = {
  LEND: {
    icon: CheckCircle2,
    className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    ring: "from-emerald-400/20",
  },
  "LEND WITH CAUTION": {
    icon: AlertTriangle,
    className: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    ring: "from-amber-400/20",
  },
  DECLINE: {
    icon: XCircle,
    className: "text-red-400 bg-red-400/10 border-red-400/30",
    ring: "from-red-400/20",
  },
};

export function AssessmentResultPanel({
  result,
  loanAmount,
  showIslamic,
  onToggleIslamic,
  onReset,
}: AssessmentResultPanelProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<"png" | "pdf" | null>(null);
  const animatedScore = useAnimatedCounter(result.trustScore);

  useEffect(() => {
    if (result.verdict === "LEND") {
      void fireLendConfetti();
    }
  }, [result.verdict]);

  const config = verdictConfig[result.verdict];
  const VerdictIcon = config.icon;
  const scoreColor =
    result.trustScore >= 70
      ? "text-emerald-400"
      : result.trustScore >= 45
        ? "text-amber-400"
        : "text-red-400";

  const shareText = buildAssessmentShareText(result, {
    amount: loanAmount,
    showIslamic: showIslamic && Boolean(result.islamicPerspective),
  });

  const runExport = async (type: "png" | "pdf") => {
    if (!exportRef.current) return;
    setExporting(type);
    try {
      const { downloadResultAsPng, downloadResultAsPdf } = await import(
        "@/lib/export-result"
      );
      if (type === "png") {
        await downloadResultAsPng(exportRef.current);
      } else {
        await downloadResultAsPdf(exportRef.current);
      }
    } catch (err) {
      console.error("Export failed:", err);
      alert("Could not export. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <div
        id="lendwise-result-export"
        ref={exportRef}
        className="export-capture space-y-6 rounded-2xl bg-black p-2"
      >
        <section className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card">
          <div
            className={`bg-gradient-to-b ${config.ring} to-transparent px-6 py-8 sm:px-8`}
          >
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${config.className}`}
            >
              <VerdictIcon className="h-4 w-4" />
              {result.verdict}
            </div>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  {result.headline}
                </h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zinc-400">
                  {result.reasoning}
                </p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Trust & Safety
                </p>
                <p
                  className={`text-5xl font-bold tabular-nums ${scoreColor}`}
                  aria-live="polite"
                  aria-atomic
                >
                  {animatedScore}
                </p>
                <p className="text-sm text-zinc-500">out of 100</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-border-subtle bg-surface-card p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <Plus className="h-4 w-4" />
              Pros
            </h3>
            <ul className="space-y-2.5">
              {result.pros.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border-subtle bg-surface-card p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-red-400">
              <Minus className="h-4 w-4" />
              Cons
            </h3>
            <ul className="space-y-2.5">
              {result.cons.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-2xl border border-gold/20 bg-gold/5 p-6 sm:p-8">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold">
            <Sparkles className="h-4 w-4" />
            Practical Advice
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300">
            {result.practicalAdvice}
          </p>
        </section>

        {(result.islamicPerspective || showIslamic) && (
          <section className="animate-in fade-in rounded-2xl border border-border-subtle bg-surface-card p-6 duration-300">
            <h3 className="mb-3 text-sm font-semibold text-gold">
              Islamic Finance Perspective
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {result.islamicPerspective ??
                "Enable the toggle before assessment to include this perspective."}
            </p>
          </section>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={exporting !== null}
          onClick={() => runExport("png")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-zinc-600 hover:bg-zinc-900 disabled:opacity-50 sm:flex-none sm:min-w-[140px]"
        >
          <Download className="h-4 w-4" />
          {exporting === "png" ? "Saving…" : "Save PNG"}
        </button>
        <button
          type="button"
          disabled={exporting !== null}
          onClick={() => runExport("pdf")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-zinc-600 hover:bg-zinc-900 disabled:opacity-50 sm:flex-none sm:min-w-[140px]"
        >
          <FileText className="h-4 w-4" />
          {exporting === "pdf" ? "Saving…" : "Save PDF"}
        </button>
        <button
          type="button"
          onClick={() => openWhatsAppShare(shareText)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20 sm:flex-none sm:min-w-[160px]"
        >
          <Share2 className="h-4 w-4" />
          Share on WhatsApp
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={showIslamic}
            onChange={(e) => onToggleIslamic(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600 bg-surface-elevated accent-gold"
          />
          Show Islamic finance perspective
        </label>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-elevated px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-zinc-600 hover:bg-zinc-900"
        >
          <RotateCcw className="h-4 w-4" />
          Analyze Another Request
        </button>
      </div>
    </div>
  );
}
