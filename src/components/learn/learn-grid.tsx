"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import type { LearnEntry } from "@/lib/content";
import { longDate } from "@/lib/format";
import { LEARN_CATEGORY_COLOR } from "@/lib/learn";

gsap.registerPlugin(useGSAP);

const FILTERS = ["all", "Resource", "Guide", "Writeup", "Blog"] as const;

/**
 * Filterable Learn index. Category badges carry the same colour every time a
 * given type appears, so the palette becomes a legend rather than decoration.
 */
export function LearnGrid({ entries }: { entries: LearnEntry[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("all");
  const listRef = useRef<HTMLDivElement>(null);
  const filtered =
    active === "all"
      ? entries
      : entries.filter((entry) => entry.category === active);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Cards stay fully visible at all times — only the badge pops in, so a
      // dropped or interrupted tween can never leave content hidden.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".learn-badge", {
          scale: 0.4,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: 0.05,
          overwrite: true,
        });
      });
      return () => mm.revert();
    },
    { scope: listRef, dependencies: [active] },
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2.5">
        {FILTERS.map((filter) => {
          const selected = filter === active;
          const count =
            filter === "all"
              ? entries.length
              : entries.filter((e) => e.category === filter).length;
          if (filter !== "all" && count === 0) return null;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={selected}
              className={`cursor-pointer rounded-full px-[18px] py-2.5 font-display text-sm leading-none font-semibold transition-[background-color,color] duration-[160ms] ${
                selected
                  ? "bg-blue-900 text-white"
                  : "bg-blue-100 text-blue-900 hover:bg-blue-200"
              }`}
            >
              {filter === "all" ? "All" : `${filter}s`}
            </button>
          );
        })}
      </div>

      <div ref={listRef} className="flex flex-col border-t border-gray-300">
        {filtered.map((entry) => (
          <Link
            key={entry.slug}
            href={`/learn/${entry.slug}`}
            className="learn-item flex flex-col gap-2.5 border-b border-gray-300 py-8 transition-opacity hover:opacity-90"
          >
            <span
              className="learn-badge w-fit rounded-full px-3 py-[5px] font-mono text-[11px] leading-none font-semibold tracking-[0.05em] text-white"
              style={{ background: LEARN_CATEGORY_COLOR[entry.category] }}
            >
              {entry.category}
            </span>
            <h2 className="font-display text-2xl leading-[1.2] font-bold tracking-[-0.02em] text-blue-900">
              {entry.title}
            </h2>
            <span className="font-mono text-xs leading-none text-gray-600">
              {longDate(entry.date)} · {entry.author}
            </span>
            <p className="max-w-[640px] font-body text-[15px] leading-relaxed text-gray-700">
              {entry.excerpt}
            </p>
            <span className="font-display text-sm font-semibold text-blue-600">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
