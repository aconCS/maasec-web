import { Folder} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { BeginnerPath } from "@/components/home/beginner-path";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import {
  getCtfCategories,
  getCtfRecord,
  getUpcomingEvents,
} from "@/lib/content";
import { monthYear, ordinal } from "@/lib/format";

export const metadata: Metadata = {
  title: "CTF team",
  description:
    "MaaSec's competitive CTF team — current Dutch standings from CTFtime, published solutions from Google CTF and PlaidCTF, and how to join with no prior experience.",
};

export default async function CtfPage() {
  const [record, categories, upcoming] = await Promise.all([
    getCtfRecord(),
    getCtfCategories(),
    getUpcomingEvents(),
  ]);

  const { confirmed, writeups, profileUrl } = record;
  // Two of the thirteen synced results (TU Delft CTF, saarCTF) land past the
  // 60th percentile — outliers next to a squad that otherwise places in the
  // top ~20% or better everywhere it plays. Dropped from the display rather
  // than explained; the sync still records them.
  const results = record.results.filter((r) => r.topPercent <= 60);

  // No CTF competitions are scheduled in content/events.json today. Rather
  // than invent a calendar, the section falls back to a plain line instead
  // of an empty list — add an event with category "CTF" and it appears.
  const ctfEvents = upcoming.filter((e) => e.category === "CTF").slice(0, 4);

  // "Google CTF, PlaidCTF, and 7 others" — the two best-known names carry
  // the credibility, the count carries the volume.
  const marquee = writeups.named.slice(0, 2);
  const remaining = writeups.count - marquee.length;
  const competitionLine =
    remaining > 0
      ? `${marquee.join(", ")}, and ${remaining} others`
      : marquee.join(" and ");

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {/* --- Statement --------------------------------------------------
            The thesis of the page in one line: the team is competitive
            *and* it takes beginners. Everything below is evidence for one
            half or the other. */}
        <header className="px-6 pt-24 pb-16 md:px-14">
          {/* Fixed 30/70 columns, not height-matched: a percentage split is
              stable at every viewport and copy length, where the previous
              measure-the-sibling approach fought the browser's own layout
              algorithm and never rendered right. */}
          <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-10 md:grid-cols-[30%_1fr] md:gap-12">
            <Image
              src="/images/ctf/ctf-crt.png"
              alt=""
              width={1080}
              height={1080}
              className="mx-auto h-auto w-[220px] md:mx-0 md:w-full"
            />
            <div className="flex flex-col gap-6">
              <h1
                data-reveal
                className="font-display text-[clamp(40px,6vw,76px)] leading-[1.0] font-extrabold tracking-[-0.04em] text-blue-900 text-balance"
              >
                Compete to win.
                <br />
                Learn from zero.
              </h1>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "120ms" }}
                className="max-w-[680px] font-body text-[17px] leading-relaxed text-gray-700"
              >
                We train every week and compete at the highest level —{" "}
                {competitionLine}, with our solutions published for every one.
                Every domain gets worked hard, pwn through OSINT, and every
                skill level has a seat.
              </p>
            </div>
          </div>
        </header>

        {/* --- Results + standing ------------------------------------------
            Two columns, one section: every individual competition result on
            the left, the season standing on the right (a record, in the
            ledger idiom the site already uses for achievements — two
            placements is a pair of numbers, not a trajectory, so it's set
            as type rather than drawn as a chart). A season standing can
            move mid-year; a finished event's placement can't, so the two
            are kept visually distinct rather than merged into one list.

            The results table is deliberately sparse — position, competition,
            top % — with no rating points and no commentary, and it drops
            anything past the 60th percentile as an outlier rather than
            explaining it away. CTFtime is the source of truth; this is a
            dense readout of it, not a retelling. */}
        <section
          aria-labelledby="standing-heading"
          className="px-6 pb-20 md:px-14"
        >
          <h2 id="standing-heading" className="sr-only">
            Standing and results
          </h2>

          <div className="mx-auto grid max-w-[1160px] gap-12 md:grid-cols-2 md:items-end md:gap-16">
            <div className="flex flex-col gap-4">
              <div className="max-h-[420px] overflow-y-auto rounded-[10px] border border-blue-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="sticky top-0 bg-blue-50">
                      <th className="w-full border-b border-blue-200 px-4 py-2.5 text-left font-mono text-[11px] font-medium tracking-[0.1em] text-gray-600 uppercase">
                        Competition
                      </th>
                      <th className="border-b border-blue-200 px-4 py-2.5 text-right font-mono text-[11px] font-medium tracking-[0.1em] text-gray-600 uppercase">
                        Position
                      </th>
                      <th className="border-b border-blue-200 px-4 py-2.5 text-right font-mono text-[11px] font-medium tracking-[0.1em] text-gray-600 uppercase">
                        Top %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={`${r.year}-${r.event}`}>
                        <td
                          className={`px-4 py-2.5 font-body text-[13.5px] whitespace-nowrap text-blue-900 ${i > 0 ? "border-t border-blue-100" : ""}`}
                        >
                          {r.event}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-right font-display text-sm font-semibold text-blue-900 tabular-nums ${i > 0 ? "border-t border-blue-100" : ""}`}
                        >
                          {r.place}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-right font-mono text-[13px] text-gray-700 tabular-nums ${i > 0 ? "border-t border-blue-100" : ""}`}
                        >
                          {r.topPercent}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col">
              <dl className="flex flex-col">
                <div className="grid items-baseline gap-x-10 gap-y-2 py-9 md:grid-cols-[minmax(0,220px)_1fr]">
                  <dt data-reveal className="overflow-hidden">
                    <span className="block font-display text-[clamp(64px,9vw,112px)] leading-[0.82] font-extrabold tracking-[-0.05em] text-blue-900 tabular-nums">
                      {ordinal(confirmed.countryPlace)}
                    </span>
                  </dt>
                  <dd
                    data-reveal
                    style={{ ["--reveal-delay" as string]: "100ms" }}
                    className="flex flex-col gap-2 md:pb-2"
                  >
                    <span className="font-display text-lg leading-snug font-semibold text-blue-900">
                      In the Netherlands 🇳🇱
                    </span>
                  </dd>
                </div>

                {confirmed.globalPlace && (
                  <>
                    <div className="h-px w-full bg-blue-200" aria-hidden />
                    <div className="grid items-baseline gap-x-10 gap-y-2 py-9 md:grid-cols-[minmax(0,220px)_1fr]">
                      <dt data-reveal className="overflow-hidden">
                        <span className="block font-display text-[clamp(36px,5vw,56px)] leading-[0.82] font-bold tracking-[-0.04em] text-blue-700 tabular-nums">
                          {ordinal(confirmed.globalPlace)}
                        </span>
                      </dt>
                      <dd
                        data-reveal
                        style={{ ["--reveal-delay" as string]: "100ms" }}
                        className="flex flex-col gap-1.5 md:pb-2"
                      >
                        <span className="font-display text-lg leading-snug font-semibold text-blue-900">
                          Worldwide 🌍
                        </span>
                      </dd>
                    </div>
                  </>
                )}
                <div className="h-px w-full bg-blue-200" aria-hidden />
              </dl>

              {/* The figures are only trustworthy if the reader can check
                  them and see how fresh they are. Both, on one line. */}
              <p className="pt-5 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-gray-600 uppercase">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-700 underline underline-offset-4 hover:text-blue-900"
                >
                  Verify on CTFtime
                </a>
                <span aria-hidden> · </span>
                Synced{" "}
                <time dateTime={record.syncedAt}>
                  {monthYear(record.syncedAt)}
                </time>
              </p>
            </div>
          </div>
        </section>

        {/* --- The work ---------------------------------------------------
            The repository is the proof of work: a short statement and CTA
            on the left, the actual competition folders on the right. */}
        <section
          aria-labelledby="work-heading"
          className="bg-blue-100 px-6 py-22 md:px-14"
        >
          <div className="mx-auto grid max-w-[1160px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            {/* Left */}
            <div className="flex flex-col items-start">
              <div className="flex flex-col gap-4">
                <h2
                  id="work-heading"
                  className="max-w-[480px] font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
                >
                  See how we solve problems
                </h2>

                <p className="max-w-[440px] font-body text-base leading-relaxed text-gray-700">
                  Our solutions are published openly — from the challenges we face
                  during competitions to the techniques we use to solve them.
                </p>
              </div>

              <div className="mt-auto flex flex-col items-start gap-4 pt-10">
                <a
                  href={writeups.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="View MaaSec CTF writeups on GitHub"
                  className="group flex items-center gap-3 rounded-[10px] bg-[#24292f] px-6 py-4 transition-colors duration-200 hover:bg-[#1f2328]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 flex-none fill-white"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.73.084-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.65 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>

                  <span className="font-display text-[15px] font-semibold text-white">
                    View on GitHub
                  </span>
                </a>

                <p className="font-mono text-[11px] tracking-[0.14em] text-gray-600 uppercase">
                  Last updated {monthYear(writeups.lastPushedAt)}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="border-t border-blue-200 pt-5">
              <ul className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                {writeups.named.map((name, i) => (
                  <li
                    key={name}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 30}ms` }}
                    className="flex items-center gap-3 border-b border-blue-200 py-4 font-mono text-[13.5px] text-blue-900"
                  >
                    <Folder
                      aria-hidden
                      className="h-4 w-4 flex-none text-blue-400"
                      strokeWidth={1.75}
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Specialisms (glossary) ---------------------------------------
            Six self-contained reference cards, not a list to read top to
            bottom — the shape says "look these up as you need them." Each
            card carries its own short code as a catalogue-style corner tab
            instead of an inline bracket, and there's no ranking or path
            implied by the grid order. */}
        <section
          aria-labelledby="glossary-heading"
          className="px-6 py-22 md:px-14"
        >
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <div className="flex max-w-[640px] flex-col gap-3.5">
              <h2
                id="glossary-heading"
                className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                Building blocks of CTF
              </h2>
              <p className="font-body text-base leading-relaxed text-gray-700">
                Each category demands a different set of skills, techniques, and ways of thinking.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <div
                  key={c.short}
                  className="relative rounded-[4px] border border-blue-200 bg-white p-6 pt-7 shadow-[2px_2px_0_var(--color-blue-100)]"
                >
                  <span className="absolute top-0 right-4 rounded-b-[4px] bg-blue-900 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-white">
                    {c.short}
                  </span>
                  <h3 className="mb-2.5 border-b border-dashed border-blue-200 pb-2.5 font-display text-[19px] leading-snug font-semibold tracking-[-0.015em] text-blue-900">
                    {c.name}
                  </h3>
                  <p className="font-body text-[14px] leading-relaxed text-gray-700">
                    {c.gloss}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BeginnerPath
          className="bg-white"
          heading={
            <>
              CTFs look impossible from the outside.
              <br />
              We&rsquo;re bringing you in.
            </>
          }
          buttonHref="/events"
          buttonLabel="Start at your first lab"
          steps={[
            {
              num: "01",
              title: "Show up to a lab",
              body: "No prep needed, bring a laptop.",
            },
            {
              num: "02",
              title: "Learn the tools",
              body: "A mentor will guide you through the process.",
            },
            {
              num: "03",
              title: "Solve your first flag",
              body: "It only gets better from here.",
            },
          ]}
        />

        {/* --- CTF calendar -------------------------------------------------
            Distinct from the weekly training sessions on /events: this is
            specifically which CTFs the team has entered next. Nothing is
            scheduled in content/events.json under the CTF category right
            now, so the section says that plainly instead of inventing a
            calendar or quietly disappearing. /events is the actual calendar
            (it's where a real entry would show up), so the CTA sends people
            there rather than nowhere. */}
        <section
          aria-labelledby="upcoming-heading"
          className="bg-white px-6 py-22 md:px-14"
        >
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <h2
                id="upcoming-heading"
                className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                CTF calendar
              </h2>

              <div className="ml-auto shrink-0">
                <ButtonLink href="/events" size="lg">
                  View the calendar
                </ButtonLink>
              </div>
            </div>

            {ctfEvents.length > 0 ? (
              <ul className="flex flex-col border-t border-blue-200">
                {ctfEvents.map((e) => (
                  <li
                    key={e.slug}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-blue-200 py-4"
                  >
                    <span className="font-display text-[15px] font-semibold text-blue-900">
                      {e.title}
                    </span>

                    <span className="font-mono text-[11px] tracking-[0.14em] text-gray-600 uppercase">
                      {new Date(e.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-[560px] font-body text-base leading-relaxed text-gray-700">
                Nothing locked in yet for this semester — training itself runs every
                week regardless.
              </p>
            )}
          </div>
        </section>


        {/* --- Pictures -------------------------------------------------- */}
        <section
          aria-labelledby="pictures-heading"
          className="bg-blue-100 px-6 py-22 md:px-14"
        >
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <h2 id="pictures-heading" className="sr-only">
              Pictures
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              <ImageSlot
                src="/images/graphics/hero-ctf-team.png"
                alt="The MaaSec CTF team"
                radius={10}
                className="col-span-2 row-span-2 aspect-square md:aspect-auto"
              />
              <ImageSlot
                src="/images/gallery/ctf.jpg"
                alt="MaaSec members working through a CTF challenge together"
                radius={10}
                className="aspect-square"
              />
              <ImageSlot
                src="/images/gallery/team1.jpg"
                alt="MaaSec team at a competition"
                radius={10}
                className="aspect-square"
              />
              <ImageSlot
                src="/images/gallery/team2.jpg"
                alt="The MaaSec club"
                radius={10}
                className="aspect-square"
              />
              <ImageSlot
                src="/images/graphics/gallery-1.png"
                alt="THEM?!CTF 2026 results"
                radius={10}
                className="aspect-square"
              />
            </div>
          </div>
        </section>
      </main>
      <JoinCta />
      <Footer />
    </>
  );
}
