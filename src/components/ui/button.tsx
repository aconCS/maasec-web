import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold whitespace-nowrap transition-[background-color,color,border-color,filter] duration-[180ms] ease-[var(--ease-out-soft)] disabled:cursor-not-allowed disabled:opacity-60";

// The system darkens on hover (600 -> 700) and darkens again on press (-> 800).
// No lightening, no scale effects. See the design system readme.
const variants: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:hover:bg-blue-600",
  ghost:
    "bg-transparent text-blue-900 border border-black hover:bg-blue-600 hover:text-white hover:border-blue-600 active:bg-blue-700",
  outline:
    "bg-transparent text-white border border-white/40 hover:bg-white hover:text-blue-900 active:bg-blue-100",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={classesFor(variant, size, className)}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={classesFor(variant, size, className)}>
      {children}
    </Link>
  );
}
