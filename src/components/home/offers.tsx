"use client";

import { useState } from "react";

// Matches offersData in the canvas Hero component (accordion layout).
const offers = [
  {
    num: "01",
    title: "Capture the Flag",
    desc: "We compete internationally as MaaSec and rank among the Netherlands' best teams. Welcoming beginners wanting to learn and experienced students looking to contribute to the team.",
  },
  {
    num: "02",
    title: "Weekly labs",
    desc: "Hands-on sessions on campus every week. Learn to use cybersecurity tools for defending, attacking, and everything in between.",
  },
  {
    num: "03",
    title: "Consultancy",
    desc: "Supervised security reviews for organisations in the region. Make real impact and show something concrete on your CV.",
  },
];

export function Offers() {
  const [active, setActive] = useState(0);

  return (
    <section id="offers" className="bg-white px-6 py-22 md:px-14">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-7">
        <h2
          data-reveal
          className="font-display text-[clamp(34px,3.6vw,52px)] leading-[1.06] font-bold tracking-[-0.035em] text-blue-900"
        >
          What MaaSec offers
        </h2>

        <div className="flex flex-col border-t border-gray-300">
          {offers.map((offer, i) => {
            const isActive = i === active;
            return (
              <button
                key={offer.num}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className="cursor-pointer border-b border-gray-300 py-10 text-left transition-[padding] duration-[220ms]"
              >
                <div className="grid grid-cols-[56px_1fr_auto] items-center gap-5 md:grid-cols-[96px_1fr_auto] md:gap-8">
                  <span
                    className={`font-mono text-xl leading-none font-semibold transition-colors duration-200 ${
                      isActive ? "text-blue-900" : "text-blue-600"
                    }`}
                  >
                    {offer.num}
                  </span>
                  <h3 className="font-display text-[clamp(28px,3vw,42px)] leading-[1.1] font-bold tracking-[-0.02em] text-blue-900">
                    {offer.title}
                  </h3>
                  <span
                    className="font-display text-[22px] leading-none font-semibold text-blue-600 transition-transform duration-[220ms]"
                    style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
                    aria-hidden
                  >
                    ⌄
                  </span>
                </div>
                <div
                  className="grid transition-[grid-template-rows] duration-[260ms] ease-[var(--ease-out-soft)]"
                  style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="max-w-[680px] font-body text-[clamp(16px,1.4vw,19px)] leading-relaxed text-gray-700 transition-[padding] duration-200 md:pl-[128px]"
                      style={{ paddingTop: isActive ? 14 : 0 }}
                    >
                      {offer.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
