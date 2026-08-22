"use client";

import { Flag, Megaphone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { JoinTeam } from "@/lib/content";

const ICONS: Record<string, typeof Flag> = {
  ctf: Flag,
  marketing: Megaphone,
  consultancy: ShieldCheck,
};

/**
 * The three teams are parallel choices, not a sequence — so they're panels you
 * pick between rather than a row of equal cards. The open panel is the only one
 * that spends space on detail, which is what choosing actually looks like.
 *
 * On mobile the panels stack and every one shows its detail: horizontal
 * expansion has no room to read there, and hiding content behind hover would
 * strand it on touch.
 */
export function WhatWeDo({ teams }: { teams: JoinTeam[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-blue-100 px-6 py-24 md:px-14">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[620px] font-display text-[clamp(30px,3.6vw,48px)] leading-[1.06] font-bold tracking-[-0.03em] text-blue-900 text-balance">
              Three teams. Pick the one that fits you.
            </h2>
          </div>
          <ButtonLink href="/join" size="lg">
            Join us
          </ButtonLink>
        </div>

        <div className="flex flex-col gap-4 lg:h-[380px] lg:flex-row">
          {teams.map((team, i) => {
            const Icon = ICONS[team.id] ?? Flag;
            const isActive = i === active;
            return (
              <button
                key={team.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                // basis-0 makes the whole row free space, so the grow ratios
                // actually set the widths — with content-driven basis the
                // panels come out near-identical no matter what they grow by.
                className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-card p-7 text-left transition-[flex-grow,background-color] duration-[420ms] ease-[var(--ease-out-soft)] lg:min-w-0 lg:basis-0 ${
                  // No hover background: hovering already promotes the panel
                  // to active (onMouseEnter), so a separate hover tint would
                  // never be visible for more than a frame.
                  isActive ? "bg-blue-900 lg:grow-[2.4]" : "bg-white lg:grow"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-6 -bottom-8 transition-[color,transform] duration-[420ms] ${
                    isActive
                      ? "text-white/10"
                      : "text-blue-900/[0.06] group-hover:scale-105"
                  }`}
                >
                  <Icon className="h-40 w-40" strokeWidth={1.25} />
                </span>

                <div className="relative flex items-center gap-3">
                  <Icon
                    className={`h-6 w-6 flex-none transition-colors duration-[420ms] ${
                      isActive ? "text-blue-200" : "text-blue-900"
                    }`}
                  />
                  <h3
                    className={`font-display text-xl leading-tight font-bold tracking-[-0.01em] transition-colors duration-[420ms] ${
                      isActive ? "text-white" : "text-blue-900"
                    }`}
                  >
                    {team.title}
                  </h3>
                </div>

                <div className="relative flex flex-col gap-5">
                  <p
                    className={`max-w-[420px] font-body text-[15px] leading-relaxed transition-colors duration-[420ms] ${
                      isActive ? "text-blue-100" : "text-gray-700"
                    }`}
                  >
                    {team.tagline}
                  </p>

                  {/* Benefits belong to the open panel only — collapsing them
                      with grid-template-rows animates height without a fixed
                      pixel guess about how tall the list is. */}
                  <div
                    data-open={isActive ? "" : undefined}
                    className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-[420ms] ease-[var(--ease-out-soft)] lg:grid-rows-[0fr] lg:opacity-0 lg:data-open:grid-rows-[1fr] lg:data-open:opacity-100"
                  >
                    <ul className="flex flex-col gap-2 overflow-hidden">
                      {team.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className={`flex gap-2.5 font-body text-[14px] leading-snug transition-colors duration-[420ms] ${
                            isActive ? "text-blue-100" : "text-gray-700"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`mt-[7px] h-1 w-1 flex-none rounded-full transition-colors duration-[420ms] ${
                              isActive ? "bg-blue-300" : "bg-blue-600"
                            }`}
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
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
