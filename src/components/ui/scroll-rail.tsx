"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Shared horizontal-scroll-rail chrome: real click-and-drag scrolling (native
 * overflow-x-auto only responds to touch/trackpad/scrollbar drag, not a
 * mouse-down drag) and fade indicators on whichever edge(s) still have more
 * content to reveal. The vertical mouse wheel is deliberately left alone —
 * these rails sit inside a normally-scrolling page, and hijacking the wheel
 * would trap the page scroll the moment the cursor crosses one. Scroll-snap
 * is suspended while actively dragging so a drag can stop mid-card instead
 * of being yanked to the nearest snap point.
 *
 * Callers own the row's items — give each a fixed width, `flex-none`, and
 * (if `snap`) `snap-start` so the container's snap-type has something to
 * align to.
 */
export function ScrollRail({
  children,
  fadeFrom,
  gapClassName = "gap-8",
  snap = true,
  arrows = false,
  ariaLabel,
}: {
  children: ReactNode;
  /** Tailwind `from-*` class matching the section's own background, so the edge fade blends in instead of showing a seam. */
  fadeFrom: string;
  gapClassName?: string;
  snap?: boolean;
  /**
   * Adds clickable prev/next buttons (desktop only — touch already has
   * drag/swipe). They sit just outside the rail's own box, in the section's
   * side gutter, rather than floating over the cards: padding around the
   * rail only stays empty at the very start/end of the scrollable content,
   * not at every scroll position, so an overlay button placed *inside* the
   * rail would still end up on top of a card mid-scroll. Needs a parent with
   * some horizontal gutter around this component (this site's section
   * padding covers it) — on a full-bleed rail, disable `arrows`.
   */
  arrows?: boolean;
  ariaLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // Thumb size/position for the drag indicator below the rail — visibleRatio
  // is also what decides whether the rail overflows at all, so the
  // indicator (and drag-to-scroll affordance) simply don't render when the
  // content already fits.
  const [thumb, setThumb] = useState({ visibleRatio: 1, offsetRatio: 0 });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateEdges = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      setThumb({
        visibleRatio: el.clientWidth / el.scrollWidth,
        offsetRatio: el.scrollLeft / el.scrollWidth,
      });
    };

    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const overflows = thumb.visibleRatio < 0.999;
  const thumbWidthPct = Math.max(thumb.visibleRatio * 100, 15);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
    };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current.dragging) return;
    el.scrollLeft =
      dragState.current.startScrollLeft - (e.clientX - dragState.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    dragState.current.dragging = false;
    setIsDragging(false);
    el?.releasePointerCapture(e.pointerId);
  };

  const scrollByPage = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    // Slightly less than a full page so the card that was at the edge stays
    // partly visible as a continuity cue for where the row picked up.
    const amount = Math.round(el.clientWidth * 0.85) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="group"
        aria-label={ariaLabel}
        className={`no-scrollbar flex cursor-grab touch-pan-y overflow-x-auto pb-1 select-none active:cursor-grabbing ${gapClassName} ${
          snap && !isDragging ? "snap-x snap-mandatory" : ""
        }`}
      >
        {children}
      </div>

      {/* Fade, shown only on edges with more to scroll to. Purely a visual
          cue — the actual controls are the buttons below, which is what
          keeps this from ever sitting on top of a card. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 bottom-1 left-0 w-16 bg-gradient-to-r ${fadeFrom} to-transparent transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 right-0 bottom-1 w-16 bg-gradient-to-l ${fadeFrom} to-transparent transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {arrows && (
        <>
          <RailButton
            direction="left"
            onClick={() => scrollByPage("left")}
            visible={canScrollLeft}
          />
          <RailButton
            direction="right"
            onClick={() => scrollByPage("right")}
            visible={canScrollRight}
          />
        </>
      )}

      {/* Drag indicator: a mini scrollbar-style track/thumb that makes the
          row's draggability obvious at a glance, since overflow-x-auto gives
          no such affordance on its own. Hidden when nothing overflows. */}
      {overflows && (
        <div
          aria-hidden
          className="relative mx-auto mt-2.5 h-[3px] w-16 rounded-full bg-blue-900/10"
        >
          <div
            className="absolute inset-y-0 rounded-full bg-blue-900/40 transition-[left,width] duration-100 ease-out"
            style={{
              width: `${thumbWidthPct}%`,
              left: `${(thumb.offsetRatio / (1 - thumb.visibleRatio)) * (100 - thumbWidthPct)}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

function RailButton({
  direction,
  onClick,
  visible,
}: {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
}) {
  // Anchored at the rail's own edge, then pushed fully clear of it (100% of
  // the button's own width, plus a gap) via transform. That keeps the
  // button's box from ever intersecting the rail's — and so from ever
  // intersecting a card — at any scroll position, rather than only at the
  // very start/end of the scrollable content.
  const edge = direction === "left" ? "left-0" : "right-0";
  const push =
    direction === "left" ? "-translate-x-[130%]" : "translate-x-[130%]";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      tabIndex={visible ? 0 : -1}
      className={`absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md ring-1 ring-blue-200 transition-opacity duration-200 md:flex ${edge} ${push} ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-400"
    >
      {direction === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}
