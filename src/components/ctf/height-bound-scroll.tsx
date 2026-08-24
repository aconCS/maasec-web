"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Caps `scrollable`'s height to whatever `reference` actually renders at,
 * so a variable-length results table never grows the row past the standing
 * panel beside it — it scrolls internally instead. This has to be measured,
 * not hardcoded: the panel's own height depends on real data (a global
 * placement adds a second row; a country placement alone doesn't), and the
 * results list grows with every competition synced from CTFtime.
 *
 * max-h-[420px] is the fallback for the instant before the ResizeObserver
 * reports a real number — inline style overrides it the moment it does, at
 * any width, so there's no separate mobile-only cap to keep in sync.
 */
export function HeightBoundScroll({
  scrollable,
  reference,
}: {
  scrollable: ReactNode;
  reference: ReactNode;
}) {
  const referenceRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const el = referenceRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div
          className="max-h-[420px] overflow-y-auto rounded-[10px] border border-blue-200"
          style={height ? { maxHeight: height } : undefined}
        >
          {scrollable}
        </div>
      </div>

      <div ref={referenceRef} className="flex flex-col">
        {reference}
      </div>
    </>
  );
}
