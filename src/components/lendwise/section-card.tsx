import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function SectionCard({ icon: Icon, title, children }: SectionCardProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-border-subtle bg-surface-card p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Icon className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={2} />
        <h2 className="text-base font-semibold text-gold md:text-lg">{title}</h2>
      </div>
      <div className="min-w-0 space-y-6 md:space-y-7">{children}</div>
    </section>
  );
}
