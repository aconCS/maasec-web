"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Illustrative props, not content — these filenames stand for "the mess a
 * medicine student actually revises from" and are deliberately absurd in the
 * way real coursework folders are. They are not read from content/ because
 * nothing here is a fact about Almo that could go stale; changing them is a
 * design change, not a copy edit.
 */
/* Ten rather than six: with the cursor able to scatter the pile, a sparser
   set left obvious gaps once a few cards got shoved aside. Two loose
   columns, `left` values kept inset (max ~63%) so the drift-in offset below
   still lands every card inside the section's left margin — a card poking
   past the page's content edge mid-animation reads as a bug, not a
   flourish. */
const files = [
  { name: "lecture_14.pdf", top: 0, left: 8, rotate: -7 },
  { name: "IMG_2847.HEIC", top: 20, left: 49, rotate: 6 },
  { name: "notes_final_v3.docx", top: 48, left: 15, rotate: 4 },
  { name: "slides.pptx", top: 74, left: 63, rotate: -5 },
  { name: "notes_final_final_v4.pdf", top: 100, left: 8, rotate: -3 },
  { name: "recording_wk3.mp4", top: 126, left: 41, rotate: 9 },
  { name: "exam_notes(2).xlsx", top: 150, left: 22, rotate: -8 },
  { name: "IMG_3012.HEIC", top: 172, left: 58, rotate: 5 },
  { name: "revision_plan_v2.pdf", top: 196, left: 5, rotate: 7 },
  { name: "untitled.docx", top: 198, left: 44, rotate: -4 },
];

/** Today's session, as the card shows it. 9 of 24 is the 38%. */
const session = { due: 24, done: 9, subject: "Cardiology, week 4" };
const percent = Math.round((session.done / session.due) * 100);

/**
 * The scattered pile drifts toward the card as it rises — the mess flowing
 * into the one place that replaces it. Scrubbed rather than played once, so
 * the reader controls the resolution with their own scroll.
 *
 * Deliberately animates position only, never opacity: a `from({opacity: 0})`
 * paints the section invisible the moment GSAP loads and relies on
 * ScrollTrigger firing to bring it back, so any failure to initialise leaves
 * the whole section blank. Moving a visible element a few pixels degrades to
 * "no animation" instead of "no content". The progress bar is static for the
 * same reason — a scaled-from-zero fill that never gets scrubbed is an empty
 * bar, and it isn't worth the risk for one more moving part.
 *
 * Each card is two nested elements, not one: an outer `.almo-file-wrap`
 * (positioned by top/left, carries the scroll-driven drift-in) around an
 * inner `.almo-file` (carries the cursor-repel nudge). Both animate x/y —
 * putting them on the same element would mean one tween fighting the other
 * for the same transform every frame. Nested, each owns its own transform
 * and the two compose without touching each other.
 */
export function AlmoScatter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = {
          trigger: rootRef.current,
          start: "top 82%",
          end: "top 38%",
          scrub: 0.8,
        };

        gsap.from(".almo-file-wrap", {
          x: -14,
          y: 14,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: trigger,
        });

        gsap.from(".almo-card", {
          y: 28,
          ease: "none",
          scrollTrigger: trigger,
        });
      });

      // Cursor scatter: real pointer only — a touch tap has no "hover near"
      // to repel from, so this stays a desktop-mouse flourish rather than a
      // synthetic touch effect.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const pile = pileRef.current;
          if (!pile) return;

          const cards = gsap.utils.toArray<HTMLElement>(".almo-file", pile);
          const movers = cards.map((card) => ({
            card,
            moveX: gsap.quickTo(card, "x", {
              duration: 0.5,
              ease: "power3.out",
            }),
            moveY: gsap.quickTo(card, "y", {
              duration: 0.5,
              ease: "power3.out",
            }),
          }));

          const RADIUS = 90;
          const STRENGTH = 50;

          function onMove(event: MouseEvent) {
            const bounds = pile!.getBoundingClientRect();
            const px = event.clientX - bounds.left;
            const py = event.clientY - bounds.top;

            for (const { card, moveX, moveY } of movers) {
              // getBoundingClientRect, not offsetLeft/Top: the card's
              // positioned ancestor is its own .almo-file-wrap (for the
              // scroll drift-in), not the pile, so offset* would be
              // relative to the wrong element and read ~0 for every card.
              const cardRect = card.getBoundingClientRect();
              const cx = cardRect.left - bounds.left + cardRect.width / 2;
              const cy = cardRect.top - bounds.top + cardRect.height / 2;
              const dx = cx - px;
              const dy = cy - py;
              const dist = Math.hypot(dx, dy) || 1;

              if (dist < RADIUS) {
                const force = (1 - dist / RADIUS) * STRENGTH;
                moveX((dx / dist) * force);
                moveY((dy / dist) * force);
              } else {
                moveX(0);
                moveY(0);
              }
            }
          }

          function onLeave() {
            for (const { moveX, moveY } of movers) {
              moveX(0);
              moveY(0);
            }
          }

          pile.addEventListener("mousemove", onMove);
          pile.addEventListener("mouseleave", onLeave);

          return () => {
            pile.removeEventListener("mousemove", onMove);
            pile.removeEventListener("mouseleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      // The card column is capped rather than a second 1fr: at half of 1160
      // one short figure sits marooned in ~520px of white. Fixed at 400 it
      // still ends flush with the section's right margin.
      className="grid items-center gap-6 md:grid-cols-[1fr_auto_minmax(0,400px)] md:gap-6"
    >
      <div ref={pileRef} aria-hidden className="relative h-[240px] w-full">
        {files.map((file) => (
          <span
            key={file.name}
            style={{ top: `${file.top}px`, left: `${file.left}%` }}
            className="almo-file-wrap absolute"
          >
            <span
              style={{ transform: `rotate(${file.rotate}deg)` }}
              className="almo-file block rounded-lg border border-blue-200 bg-canvas px-3 py-2 font-mono text-[11.5px] whitespace-nowrap text-blue-700"
            >
              {file.name}
            </span>
          </span>
        ))}
      </div>

      {/* The arrow is the point (mess flowing into the one organised card),
          so it stays on screen at every width rather than disappearing
          below md — it just rotates to point down the stack instead of
          across it. */}
      <span
        aria-hidden
        className="block rotate-90 justify-self-center text-lg font-bold text-blue-600 md:rotate-0 md:justify-self-auto"
      >
        &rarr;
      </span>

      {/* Chunky, high-contrast, one dominant figure: the card has to hold its
          own against a heading twice its size, so it carries a 2px border
          with a heavier bottom edge rather than the site's usual hairline. */}
      <div className="almo-card rounded-[16px] border-2 border-b-[5px] border-blue-200 bg-canvas p-6">
        <p className="flex items-baseline gap-2.5">
          <span className="font-display text-[52px] leading-[0.85] font-extrabold tracking-[-0.05em] text-blue-900 tabular-nums">
            {session.due}
          </span>
          <span className="font-display text-base font-bold text-blue-900">
            cards due
          </span>
        </p>
        <p className="mt-2.5 mb-3.5 font-display text-sm font-semibold text-gray-600">
          {session.subject}
        </p>
        <div className="flex items-center gap-3">
          <div className="h-[13px] flex-1 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-display text-sm font-bold text-blue-900 tabular-nums">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
