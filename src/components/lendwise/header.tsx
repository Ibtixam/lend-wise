import { Coins } from "lucide-react";

export function LendWiseHeader() {
  return (
    <header className="mb-8 text-center md:mb-10">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-surface-card md:mb-5 md:h-14 md:w-14 md:rounded-2xl">
        <Coins className="h-6 w-6 text-gold md:h-7 md:w-7" strokeWidth={1.75} />
      </div>
      <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
        <span className="text-white">Lend</span>
        <span className="text-gold">Wise</span>
      </h1>
      <p className="mx-auto mt-2 max-w-lg px-2 text-sm leading-relaxed text-zinc-500 md:mt-3 md:text-[15px]">
        AI-powered insights to help you make smarter decisions about lending
        money to friends and family
      </p>
    </header>
  );
}
