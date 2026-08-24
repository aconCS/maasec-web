import { Folder, FolderGit2 } from "lucide-react";
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
            No persuasion copy: the repo is the proof, so the section is
            built to send people to it, not to argue on its behalf. The
            heading states the one verifiable number; the list below is the
            actual folder names from the repo, not a curated highlight reel.
            Reveals with the page's existing scroll-in mechanism (see
            components/site/reveal.tsx) rather than a bespoke animation. */}
        <section
          aria-labelledby="work-heading"
          className="bg-blue-100 px-6 py-22 md:px-14"
        >
          <div className="mx-auto flex max-w-[1160px] flex-col gap-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
              <h2
                id="work-heading"
                className="max-w-[480px] font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                {writeups.count} competitions. Every one published.
              </h2>

              <a
                href={writeups.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex flex-none items-center gap-3 overflow-hidden rounded-[10px] bg-blue-900 px-7 py-5 transition-colors duration-200 hover:bg-blue-800"
              >
                <FolderGit2
                  aria-hidden
                  strokeWidth={1.25}
                  className="pointer-events-none absolute -right-3 -bottom-3 h-20 w-20 text-white/10 transition-transform duration-200 group-hover:scale-105"
                />
                <FolderGit2
                  aria-hidden
                  className="relative h-5 w-5 flex-none text-blue-200"
                />
                <span className="relative font-display text-[15px] font-semibold text-white">
                  View the writeups on GitHub
                </span>
              </a>
            </div>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 border-t border-blue-200 pt-6 sm:grid-cols-3">
              {writeups.named.map((name, i) => (
                <li
                  key={name}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 30}ms` }}
                  className="flex items-center gap-2 font-mono text-[13.5px] text-blue-900"
                >
                  <Folder
                    aria-hidden
                    className="h-3.5 w-3.5 flex-none text-blue-400"
                    strokeWidth={2}
                  />
                  {name}
                </li>
              ))}
            </ul>

            <p className="font-mono text-[11px] tracking-[0.14em] text-gray-600 uppercase">
              Last pushed {monthYear(writeups.lastPushedAt)}
            </p>
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
                The whole board
              </h2>
              <p className="font-body text-base leading-relaxed text-gray-700">
                Every CTF challenge falls into one of these.
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
          className="bg-blue-100 px-6 py-22 md:px-14"
        >
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <div className="flex max-w-[640px] flex-col gap-3.5">
              <h2
                id="upcoming-heading"
                className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                CTF calendar
              </h2>
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
                      {e.location ? ` · ${e.location}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-[560px] font-body text-base leading-relaxed text-gray-700">
                Nothing locked in yet for this semester — training itself
                runs every week regardless.
              </p>
            )}

            <div>
              <ButtonLink href="/events" size="lg">
                View the calendar
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* --- How we recruit + join ---------------------------------------
            Same headline+CTA-opposite-a-numbered-path pattern as the
            homepage's BeginnerPath, reused rather than re-invented — but
            the steps here are the actual join process (apply, get matched
            with a mentor, compete), not a first-timer's lab visit. Facts
            are the ones already established elsewhere on this page and in
            content/join-teams.json: no entry test, mentorship from senior
            players, local labs through to international CTFs. */}
        <BeginnerPath
          headingId="recruit-heading"
          heading={
            <>
              No entry test.
              <br />
              No experience required.
            </>
          }
          buttonHref="/join?team=ctf"
          buttonLabel="Apply to the CTF team"
          steps={[
            {
              num: "01",
              title: "Apply, any semester",
              body: "Intake is continuous — there's no cutoff to wait for.",
            },
            {
              num: "02",
              title: "Get matched with a mentor",
              body: "A senior player walks you through your first competition.",
            },
            {
              num: "03",
              title: "Play for real",
              body: "From weekly labs straight through to international CTFs.",
            },
          ]}
        />

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
                fit="contain"
                background="bg-white"
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
