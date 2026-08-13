import type { LearnCategory } from "@/lib/content";

/** Shared so the category badge reads the same colour everywhere it appears. */
export const LEARN_CATEGORY_COLOR: Record<LearnCategory, string> = {
  Resource: "var(--color-gray-600)",
  Guide: "var(--color-yellow-500)",
  Writeup: "var(--color-blue-600)",
  Blog: "var(--color-blue-400)",
};
