"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Routes whose last segment is a language code, e.g. /grants/ai-pentest/nl. */
export function langForPath(pathname: string): "nl" | "en" {
  return /\/nl\/?$/.test(pathname) ? "nl" : "en";
}

/**
 * The site is English except for pages ending in /nl. Only the root layout
 * renders <html>, so the exported Dutch pages get lang="nl" from
 * scripts/set-html-lang.mjs after the build; this keeps the attribute right
 * when the reader moves between pages without a full reload.
 */
export function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = langForPath(pathname);
  }, [pathname]);

  return null;
}
