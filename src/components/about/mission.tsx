"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BicepsFlexed, Construction, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

/**
 * The three commitments are a real progression, so they're laid out as a
 * spine you travel down rather than three interchangeable cards. Each
 * stage's icon *is* its node on the spine.
 */
const stages = [
  {
    Icon: Construction,
    title: "Lower the barrier to entry",
    body: "No certifications, no prior coursework needed. If you're curious, there's a seat for you.",
  },
  {
    Icon: BicepsFlexed,
    title: "Build real, provable skill",
    body: "CTF placements, bug bounty reports, and consultancy work. Gain valuable experience.",
  },
  {
    Icon: Users,
    title: "Close the workforce gap",
    body: "4.8 million security roles sit empty worldwide. We're training people to fill them.",
  },
];

export function Mission() {
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
      { threshold: 0.2 },
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
        // The spine draws downward, then each node lands on it in turn.
        tl.from(".mission-spine", {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.55,
          ease: "power2.inOut",
          stagger: 0.14,
        })
          .from(
            ".mission-node",
            {
              scale: 0,
              duration: 0.5,
              ease: "back.out(2)",
              stagger: 0.14,
            },
            0,
          )
          .from(
            ".mission-copy",
            {
              opacity: 0,
              x: 18,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.14,
            },
            0.12,
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [inView] },
  );

  return (
    <section className="px-6 py-24 md:px-14">
      <div
        ref={rootRef}
        className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[minmax(320px,1fr)_1fr] lg:gap-20"
      >
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.06] font-bold tracking-[-0.03em] text-blue-900 text-balance">
            Our Mission
          </h2>
          {/* Capped by measure rather than a pixel width so it fills its column
              at lg+ and still breaks at a readable line length when stacked. */}
          <p className="max-w-[58ch] font-body text-[16.5px] leading-[1.6] font-medium text-gray-700">
            MaaSec empowers students to become the next generation of cybersecurity professionals. We create opportunities to learn from industry experts, build practical skills, gain real-world experience, and connect with a diverse cybersecurity community. Through workshops, professional events, and international CTF competitions, we aim to bridge the gap between university and industry while giving every student the opportunity to learn, compete, and grow.
          </p>
        </div>

        <ol className="flex flex-col gap-12 pl-16 md:gap-16">
          {stages.map((stage, i) => (
            <li key={stage.title} className="relative">
              {/* One connector per gap rather than a single full-height spine:
                  anchored to this item's node and stretched exactly one gap
                  past its bottom edge, it always lands on the next node no
                  matter how tall the copy runs — and the last stage gets none,
                  so no line dangles past the end. */}
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="mission-spine absolute top-14 -bottom-12 -left-9 w-px bg-blue-200 md:-bottom-16"
                />
              )}
              <span
                aria-hidden
                className="mission-node absolute top-0 -left-16 flex h-14 w-14 items-center justify-center rounded-full border border-blue-200 bg-canvas"
              >
                <stage.Icon className="h-6 w-6 text-blue-900" />
              </span>
              <div className="mission-copy flex flex-col gap-2 pt-2.5">
                <h3 className="font-display text-[22px] leading-tight font-bold tracking-[-0.01em] text-blue-900">
                  {stage.title}
                </h3>
                <p className="max-w-[440px] font-body text-[15px] leading-relaxed text-gray-700">
                  {stage.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
