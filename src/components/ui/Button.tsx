import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent-gold text-white hover:brightness-95 active:brightness-90",
  secondary: "bg-transparent border border-border text-ink hover:bg-bg-panel-alt",
  ghost: "bg-transparent text-ink hover:bg-bg-panel-alt",
  danger: "bg-danger text-white hover:brightness-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-label",
  md: "px-5 py-2.5 text-label",
  lg: "px-7 py-3.5 text-label",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
