import type { Metadata } from "next";
import { PastEvents } from "@/components/events/past-events";
import { UpcomingEvents } from "@/components/events/upcoming";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { getPastEvents, getUpcomingEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming CTF sessions, bug bounty pairings, and labs from MaaSec — Maastricht University's cybersecurity student organisation.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const todayDay = String(new Date().getDate()).padStart(2, "0");

  return (
    <>
      <Nav />
      <main>
        <section className="relative mx-auto max-w-[1160px] overflow-hidden px-6 pt-20 pb-14 md:px-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-8 right-0 z-0 font-display text-[220px] leading-none font-extrabold tracking-[-0.04em] text-blue-900/5"
          >
            {todayDay}
          </span>
          <div className="relative z-10 flex flex-col gap-5">
            <h1 className="font-display text-[clamp(40px,5vw,68px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900">
              What&rsquo;s next?
            </h1>
            <p className="max-w-[560px] font-body text-[17px] leading-relaxed text-gray-700">
              Weekly training, live CTFs, hands-on labs, and community events.
            </p>
            <div className="pt-2">
              <UpcomingEvents events={upcoming} />
            </div>
          </div>
        </section>

        <section className="bg-blue-100 px-6 py-22 md:px-14">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-6">
            <span className="font-mono text-[11px] leading-none tracking-[0.18em] text-gray-600 uppercase">
              Past events
            </span>
            <PastEvents events={past} />
          </div>
        </section>

        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
