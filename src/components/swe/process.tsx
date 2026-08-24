"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Bodies are held to roughly one sentence and a similar length, so the four
   stages stay close in height and the spine's segments come out even. */
const stages = [
  {
    num: "01",
    title: "Discover",
    body: "A short brief to understand what you want to build, who it’s for, and what success looks like.",
  },
  {
    num: "02",
    title: "Design",
    body: "Scope, architecture, and interface agreed with you before a line of code is written.",
  },
  {
    num: "03",
    title: "Build",
    body: "A small, dedicated team builds in short iterations. You receive working software every week.",
  },
  {
    num: "04",
    title: "Ship",
    body: "Deployed, documented, and maintained. We stay involved well beyond launch.",
  },
];

/**
 * A vertical spine, paired with a sticky section heading beside it (see the
 * "How we work" section in app/software/page.tsx) — the heading holds the
 * left column while the stages scroll past, which is what keeps the section
 * from leaving half of its 1160px width empty.
 *
 * Each connector is scoped to its own <li> — "top-14 -bottom-12" reaches from
 * just below this stage's node to exactly the gap's end, regardless of how
 * tall this stage's copy happens to run. Scrubbing its scaleY to that same
 * stage's scroll position turns the four independent segments into one line
 * that appears to draw itself down the page as you read.
 */
export function Process() {
  const rootRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".process-connector-fill", {
          scaleY: 0,
          transformOrigin: "top center",
        });
        gsap.set(".process-stage", { opacity: 0.32 });

        // One trigger per stage, unlike the horizontal arrangement: stacked
        // vertically each stage reaches the viewport at its own moment, so
        // its own scroll position is the honest thing to scrub against.
        gsap.utils.toArray<HTMLElement>(".process-stage").forEach((stage) => {
          const trigger = {
            trigger: stage,
            start: "top 78%",
            end: "top 42%",
            scrub: 0.6,
          };
          gsap.to(stage, { opacity: 1, ease: "none", scrollTrigger: trigger });
          const fill = stage.querySelector(".process-connector-fill");
          if (fill) {
            gsap.to(fill, { scaleY: 1, ease: "none", scrollTrigger: trigger });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <ol ref={rootRef} className="flex flex-col gap-12 pl-16 md:gap-14">
      {stages.map((stage, i) => (
        <li key={stage.num} className="process-stage relative">
          {i < stages.length - 1 && (
            <span
              aria-hidden
              className="absolute top-14 -bottom-12 -left-9 w-px bg-blue-200 md:-bottom-14"
            />
          )}
          {i < stages.length - 1 && (
            <span
              aria-hidden
              className="process-connector-fill absolute top-14 -bottom-12 -left-9 w-px bg-blue-600 md:-bottom-14"
            />
          )}
          <span
            aria-hidden
            className="absolute top-0 -left-16 flex h-14 w-14 items-center justify-center rounded-full border border-blue-200 bg-canvas font-mono text-[13px] font-semibold text-blue-900"
          >
            {stage.num}
          </span>
          <div className="flex flex-col gap-2 pt-2.5">
            <h3 className="font-display text-[22px] leading-tight font-bold tracking-[-0.01em] text-blue-900">
              {stage.title}
            </h3>
            <p className="font-body text-[15px] leading-relaxed text-gray-700">
              {stage.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
