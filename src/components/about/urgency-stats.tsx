"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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

function ClockGraphic() {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className="shrink-0 h-9 w-9 text-blue-900">
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <line x1="20" y1="20" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line
        className="clock-hand"
        x1="20"
        y1="20"
        x2="29"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="1.8" fill="currentColor" />
    </svg>
  );
}

function JobsGraphic() {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className="shrink-0 h-9 w-9 text-blue-900">
      <rect x="6" y="16" width="28" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15 16v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="6" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="20" cy="24" r="2.2" fill="currentColor" />
    </svg>
  );
}

function PercentRing() {
  return (
    <div
      className="percent-ring shrink-0 h-9 w-9 rounded-full"
      style={{
        background: `conic-gradient(var(--color-blue-900) 0% 44%, var(--color-blue-200) 44% 100%)`,
      }}
    />
  );
}

const graphics = {
  cost: MoneyGraphic,
  clock: ClockGraphic,
  jobs: JobsGraphic,
  percent: PercentRing,
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
        gsap.to(".clock-hand", {
          rotation: 360,
          svgOrigin: "20 20",
          duration: 39,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".sparkline-bars rect", {
          scaleY: 1.08,
          transformOrigin: "bottom",
          duration: 1.4,
          stagger: { each: 0.15, yoyo: true, repeat: -1 },
          ease: "sine.inOut",
        });
      });

      gsap.from(".percent-ring", {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
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
                className="flex flex-col gap-4 rounded-[10px] bg-white p-7"
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
