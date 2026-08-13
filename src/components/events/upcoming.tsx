"use client";

import { useState } from "react";
import type { EventCategory, EventEntry } from "@/lib/content";
import { dayMonth } from "@/lib/format";

const CATEGORY_COLOR: Record<EventCategory, string> = {
  CTF: "var(--color-blue-600)",
  "Bug Bounty": "var(--color-green-500)",
  Lab: "var(--color-yellow-500)",
  Workshop: "var(--color-gray-600)",
  Community: "var(--color-blue-400)",
};

const FILTERS = [
  "all",
  "CTF",
  "Bug Bounty",
  "Lab",
  "Workshop",
  "Community",
] as const;

export function UpcomingEvents({ events }: { events: EventEntry[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("all");
  const filtered =
    active === "all" ? events : events.filter((e) => e.category === active);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2.5">
        {FILTERS.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={selected}
              className={`cursor-pointer rounded-full px-[18px] py-2.5 font-display text-sm leading-none font-semibold transition-[background-color,color] duration-[160ms] ${
                selected
                  ? "bg-blue-900 text-white"
                  : "bg-blue-100 text-blue-900 hover:bg-blue-200"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          );
        })}
      </div>

      <span className="font-mono text-[11px] leading-none tracking-[0.18em] text-gray-600 uppercase">
        Upcoming
      </span>

      {filtered.length === 0 ? (
        <p className="border-t border-gray-300 py-8 font-body text-[15px] text-gray-600">
          No upcoming events in this category yet — check back soon.
        </p>
      ) : (
        <ul className="flex flex-col border-t border-gray-300">
          {filtered.map((event) => {
            const { day, month } = dayMonth(event.date);
            return (
              <li
                key={event.slug}
                className="grid grid-cols-[100px_1fr_auto] items-center gap-6 border-b border-gray-300 py-6"
              >
                <div className="flex w-[100px] flex-col items-center justify-center bg-blue-900 py-2.5 text-white">
                  <span className="font-display text-[22px] leading-none font-bold tracking-[-0.02em]">
                    {day}
                  </span>
                  <span className="font-mono text-[11px] leading-relaxed tracking-[0.1em] text-blue-200">
                    {month}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span
                    className="w-fit px-3 py-[5px] font-mono text-[11px] leading-none font-semibold tracking-[0.05em] text-white"
                    style={{ background: CATEGORY_COLOR[event.category] }}
                  >
                    {event.category}
                  </span>
                  <h3 className="font-display text-[19px] leading-tight font-semibold text-blue-900">
                    {event.title}
                  </h3>
                  <span className="font-body text-sm text-gray-600">
                    {event.time} · {event.location}
                  </span>
                </div>

                <a
                  href={event.signupUrl ?? "/join"}
                  className="font-display text-sm font-semibold whitespace-nowrap text-blue-600 hover:text-blue-800"
                >
                  RSVP →
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
