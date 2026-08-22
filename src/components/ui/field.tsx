import type { ComponentProps } from "react";

const control =
  "w-full rounded-sm border bg-white px-4 font-body text-[15px] text-blue-900 placeholder:text-gray-600 transition-[border-color,box-shadow] duration-[180ms] ease-[var(--ease-out-soft)] focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-600/35 disabled:opacity-60 aria-[invalid=true]:border-[var(--color-danger)]";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={`${control} h-12 border-gray-300 ${className ?? ""}`}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={`${control} min-h-16 resize-y border-gray-300 py-3.5 leading-relaxed ${className ?? ""}`}
    />
  );
}
