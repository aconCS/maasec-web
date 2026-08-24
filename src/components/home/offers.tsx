"use client";

import Link from "next/link";
import { useState } from "react";

// Matches offersData in the canvas Hero component (accordion layout).
// `href` is omitted for offers with nowhere to send a reader yet — no CTA
// renders for those rather than linking somewhere half-built.
const offers = [
  {
    title: "Capture the Flag",
    desc: "We compete internationally as MaaSec and rank among the Netherlands' best teams. Welcoming beginners wanting to learn and experienced students looking to contribute to the team.",
    href: "/ctf",
  },
  {
    title: "Weekly labs",
    desc: "Hands-on sessions on campus every week. Learn to use cybersecurity tools for defending, attacking, and everything in between.",
    href: "/events",
  },
  {
    title: "Consultancy",
    desc: "Supervised security reviews for organisations in the region. Make real impact and show something concrete on your CV.",
  },
  {
    title: "Software Development",
    desc: "Currently building Almo, a Duolingo-style app helping medicine students study smarter. Join a small team shipping real, used software.",
    href: "/software",
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
              // A link inside the expanded copy can't nest inside a <button>
              // (invalid HTML, and it'd double as a toggle), so the row is a
              // <div> with the toggle control and the collapsible content as
              // separate children rather than one big button.
              <div key={offer.title} className="relative border-b border-gray-300">
                {/* Replaces the old 01-04 markers: a soft gradient rule that
                    fades in on the open row, so which offer is expanded
                    still reads at a glance without a number doing that job
                    — quiet enough not to compete with the title. */}
                <span
                  aria-hidden
                  className={`absolute inset-y-2 left-0 w-[2px] bg-gradient-to-b from-blue-600/70 via-blue-600/25 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="w-full cursor-pointer py-10 pl-6 text-left transition-[padding] duration-[220ms] md:pl-[96px]"
                >
                  <div className="grid grid-cols-[1fr_auto] items-center gap-5 md:gap-8">
                    <h3
                      className={`font-display text-[clamp(28px,3vw,42px)] leading-[1.1] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                        isActive ? "text-blue-900" : "text-blue-900/45"
                      }`}
                    >
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
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[260ms] ease-[var(--ease-out-soft)]"
                  style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col items-start gap-4 pt-3.5 pb-10 pl-6 md:pl-[96px]">
                      <p className="max-w-[680px] font-body text-[clamp(16px,1.4vw,19px)] leading-relaxed text-gray-700">
                        {offer.desc}
                      </p>
                      {offer.href && (
                        <Link
                          href={offer.href}
                          tabIndex={isActive ? 0 : -1}
                          aria-hidden={!isActive}
                          className="font-display text-[15px] font-semibold text-blue-600 hover:text-blue-800"
                        >
                          Read more →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
