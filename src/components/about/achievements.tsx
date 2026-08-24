"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

/**
 * Records, not features — so they're set as a ledger of oversized numerals on
 * hairline rules instead of a row of cards. The numerals are deliberately the
 * loudest thing on the page; everything around them stays quiet.
 *
 * They reveal with a mask wipe rather than counting up: both are rankings,
 * and counting a 3rd place upward from zero would read backwards.
 *
 * The national placement is passed in from the CTFtime sync rather than
 * written here — it was hardcoded once and was two seasons out of date by
 * the time anyone noticed. See scripts/sync-ctftime.mjs.
 */
export function Achievements({
  nationalPlace,
  nationalNote,
}: {
  nationalPlace: string;
  nationalNote: string;
}) {
  const records = [
    {
      stat: nationalPlace,
      label: "In the Netherlands 🇳🇱",
      body: nationalNote,
    },
    {
      stat: "47th",
      label: "In an international Competition🌍",
      body: "Top 4% placement in DownUnderCTF, out of 1,200+ teams.",
    },
  ];

  return <AchievementsLedger records={records} />;
}

type AchievementRecord = { stat: string; label: string; body: string };

function AchievementsLedger({ records }: { records: AchievementRecord[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!inView) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();
        tl.from(".record-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
          ease: "power3.inOut",
          stagger: 0.12,
        })
          .from(
            ".record-numeral",
            {
              yPercent: 110,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
            },
            "-=0.75",
          )
          .from(
            ".record-copy",
            {
              opacity: 0,
              y: 12,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.12,
            },
            "-=0.45",
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [inView] },
  );

  return (
    <section className="bg-blue-900 px-6 py-24 md:px-14">
      <div ref={rootRef} className="mx-auto flex max-w-[1160px] flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-[560px] font-display text-[clamp(30px,3.6vw,48px)] leading-[1.06] font-bold tracking-[-0.03em] text-white text-balance">
            Proof of Work
          </h2>
        </div>

        <dl className="flex flex-col">
          {records.map((record) => (
            <div key={record.stat} className="relative">
              <span
                aria-hidden
                className="record-rule block h-px w-full bg-blue-200/25"
              />
              <div className="grid items-baseline gap-x-10 gap-y-1 py-8 md:grid-cols-[minmax(0,340px)_1fr] md:py-10">
                {/* The wipe needs a clipping frame, and leading-[0.8] keeps the
                    numeral's own line box tight enough that it doesn't leave a
                    visible gap under the mask. */}
                <dt className="overflow-hidden">
                  <span className="record-numeral block font-display text-[clamp(64px,11vw,132px)] leading-[0.8] font-extrabold tracking-[-0.05em] text-white">
                    {record.stat}
                  </span>
                </dt>
                <dd className="record-copy flex flex-col gap-1.5 md:pb-2">
                  <span className="font-display text-lg leading-snug font-semibold text-white">
                    {record.label}
                  </span>
                  {/* Wide enough for the longest record to sit on a single
                      line at desktop widths; still wraps naturally on mobile,
                      where one line is impossible either way. */}
                  <span className="max-w-[640px] font-body text-[15px] leading-relaxed text-blue-200">
                    {record.body}
                  </span>
                </dd>
              </div>
            </div>
          ))}
          <span aria-hidden className="record-rule block h-px w-full bg-blue-200/25" />
        </dl>
      </div>
    </section>
  );
}
