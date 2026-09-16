import type { ReactNode } from "react";
import type { UrineStatus } from "../../lib/types";

const statusStyles: Record<UrineStatus, string> = {
  normal: "bg-success/15 text-success border-success/30",
  borderline: "bg-warning/15 text-warning border-warning/30",
  abnormal: "bg-danger/15 text-danger border-danger/30",
};

export function StatusBadge({ status, children }: { status: UrineStatus; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-caption uppercase tracking-wide ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export default function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-bg-panel-alt px-2.5 py-1 text-caption text-ink-dim ${className}`}
    >
      {children}
    </span>
  );
}
