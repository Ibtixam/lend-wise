import { Sparkles } from "lucide-react";

function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`skeleton-pulse rounded-md bg-zinc-800/80 ${className}`}
      aria-hidden
    />
  );
}

export function AssessmentLoading() {
  return (
    <div
      className="space-y-6"
      role="status"
      aria-live="polite"
      aria-label="Generating your assessment"
    >
      <div className="flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
        <Sparkles className="h-5 w-5 animate-pulse text-gold-text" />
        <p className="text-sm font-medium text-gold-text">
          LendWise is analyzing your situation…
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8">
        <Bone className="h-8 w-36 rounded-full" />
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1 space-y-3">
            <Bone className="h-7 w-full max-w-sm" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 max-w-xs w-full" />
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <Bone className="h-3 w-20" />
            <Bone className="h-14 w-16 rounded-lg" />
            <Bone className="h-3 w-16" />
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-border-subtle bg-surface-card p-6">
          <Bone className="mb-4 h-5 w-16" />
          <div className="space-y-3">
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-11/12 max-w-full" />
            <Bone className="h-4 max-w-[85%] w-full" />
          </div>
        </section>
        <section className="rounded-2xl border border-border-subtle bg-surface-card p-6">
          <Bone className="mb-4 h-5 w-16" />
          <div className="space-y-3">
            <Bone className="h-4 w-full" />
            <Bone className="h-4 max-w-[90%] w-full" />
            <Bone className="h-4 max-w-[75%] w-full" />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-gold/10 bg-gold/5 p-6 sm:p-8">
        <Bone className="mb-4 h-5 w-32" />
        <Bone className="h-4 w-full" />
        <Bone className="mt-2 h-4 max-w-[85%] w-full" />
        <Bone className="mt-2 h-4 max-w-[65%] w-full" />
      </section>

      <p className="text-center text-xs text-muted-subtle">
        This usually takes a few seconds
      </p>
    </div>
  );
}
