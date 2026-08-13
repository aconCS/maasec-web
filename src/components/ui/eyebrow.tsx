import type { ReactNode } from "react";

/** Uppercase mono label — letter-spaced, never shouting. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] leading-none font-medium tracking-[0.18em] uppercase ${className}`}
    >
      {children}
    </span>
  );
}
