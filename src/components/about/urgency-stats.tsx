"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Briefcase, Clock, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const stats = [
  {
    key: "cost",
    n: "$11.88T",
    t: "lost to cybercrime in 2026, on pace for $19.71T by 2030",
    lead: true,
  },
  {
    key: "clock",
    n: "39s",
    t: "between cyber attacks worldwide",
    lead: false,
  },
  {
    key: "jobs",
    n: "4.8M",
    t: "security jobs unfilled worldwide",
    lead: false,
  },
  {
    key: "percent",
    n: "44%",
    t: "of breaches involve ransomware",
    lead: false,
  },
] as const;

function MoneyGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className="shrink-0 h-9 w-9 text-blue-900"
    >
      <g className="sparkline-bars">
        <rect x="2" y="24" width="6" height="12" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="11" y="16" width="6" height="20" rx="1.5" fill="currentColor" opacity="0.7" />
        <rect x="20" y="6" width="6" height="30" rx="1.5" fill="currentColor" />
      </g>
      <circle cx="32" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text x="32" y="12.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">
        $
      </text>
    </svg>
  );
}

// Only the cost stat animates (the sparkline it's built around). The rest
// are static lucide icons — plain markers for their stat, not illustrations.
function ClockIcon() {
  return <Clock aria-hidden className="h-9 w-9 shrink-0 text-blue-900" strokeWidth={1.75} />;
}

function JobsIcon() {
  return <Briefcase aria-hidden className="h-9 w-9 shrink-0 text-blue-900" strokeWidth={1.75} />;
}

function RansomIcon() {
  return <Lock aria-hidden className="h-9 w-9 shrink-0 text-blue-900" strokeWidth={1.75} />;
}

const graphics = {
  cost: MoneyGraphic,
  clock: ClockIcon,
  jobs: JobsIcon,
  percent: RansomIcon,
};

export function UrgencyStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!inView) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".sparkline-bars rect", {
          scaleY: 1.08,
          transformOrigin: "bottom",
          duration: 1.4,
          stagger: { each: 0.15, yoyo: true, repeat: -1 },
          ease: "sine.inOut",
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [inView] },
  );

  return (
    <section ref={containerRef} className="bg-blue-900 px-6 py-24 md:px-14">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
        <h2
          data-reveal
          className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-white"
        >
          Security is only becoming more urgent
        </h2>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {stats.map((stat, i) => {
            const Graphic = graphics[stat.key];
            return (
              <div
                key={stat.key}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                // All four cards share one surface: the lead stat is already
                // set apart by its wider column and larger number, so it does
                // not need a fourth background colour to carry the emphasis.
                className="flex flex-col gap-4 rounded-card bg-white p-7"
              >
                <div className="flex items-center gap-3">
                  <Graphic />
                  <span className="font-display text-[36px] leading-none font-extrabold tracking-[-0.03em] text-blue-900">
                    {stat.n}
                  </span>
                </div>
                <span className="font-body text-sm leading-relaxed text-gray-700">
                  {stat.t}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
