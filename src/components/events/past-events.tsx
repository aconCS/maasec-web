import type { EventEntry } from "@/lib/content";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { monthYear } from "@/lib/format";

export function PastEvents({ events }: { events: EventEntry[] }) {
  return (
    <ScrollRail fadeFrom="from-blue-100" arrows ariaLabel="Past events">
      {events.map((event) => (
        <article
          key={event.slug}
          className="flex w-[min(240px,75vw)] flex-none snap-start flex-col gap-2.5 border-t border-blue-200 py-6"
        >
          <span className="font-mono text-xs leading-none text-gray-700">
            {monthYear(event.date)}
          </span>
          <h3 className="font-display text-[18px] leading-tight font-semibold text-blue-900">
            {event.title}
          </h3>
          <p className="font-body text-[14.5px] leading-relaxed text-gray-700">
            {event.result ?? event.body}
          </p>
        </article>
      ))}
    </ScrollRail>
  );
}
