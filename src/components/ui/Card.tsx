import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  alt?: boolean;
}

export default function Card({ children, alt = false, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border p-6 ${alt ? "bg-bg-panel-alt" : "bg-bg-panel"} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
