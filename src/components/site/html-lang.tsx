"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Dutch routes: pages ending in /nl (e.g. /grants/ai-pentest/nl) and the
 * student pages under /join/studenten. Keep in sync with
 * scripts/set-html-lang.mjs.
 */
export function langForPath(pathname: string): "nl" | "en" {
  return /\/nl\/?$/.test(pathname) || /^\/join\/studenten(\/|$)/.test(pathname)
    ? "nl"
    : "en";
}

/**
 * The site is English except for the Dutch routes above. Only the root layout
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
