import type { Metadata } from "next";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { AlmoScatter } from "@/components/swe/almo-scatter";
import { CommissionForm } from "@/components/swe/commission-form";
import { Process } from "@/components/swe/process";
import { ButtonLink } from "@/components/ui/button";
import { getJoinTeams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Software Development",
  description:
    "MaaSec's student software team: a supervised discover-design-build-ship process for organisations that need something real built, and the team behind Almo.",
};

export default async function SoftwarePage() {
  const teams = await getJoinTeams();
  const sweJoinTeam = teams.find((t) => t.id === "swe");

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {/* --- Statement ---------------------------------------------------
            A capability statement, not a team introduction: the reader this
            page is written for is an organisation deciding whether to trust
            a student team with a real build, not a student deciding whether
            to join one. That case comes later, on its own terms. */}
        {/* Outer padding full-bleed, inner div caps the width — the site's
            standard two-layer margin, so this header's left edge lands on the
            same x as every section below it rather than floating in a
            narrower centred box of its own. */}
        <header className="px-6 pt-24 pb-9 md:px-14">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-6">
            <h1
              data-reveal
              className="max-w-[900px] font-display text-[clamp(38px,5.6vw,68px)] leading-[1.05] font-extrabold tracking-[-0.04em] text-blue-900 text-balance"
            >
              We build software for organisations.
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
              className="max-w-[600px] font-body text-[17px] leading-relaxed text-gray-700"
            >
              A focused, dedicated student team building, and delivering
              meaningful digital products. Our expertise is currently being
              applied to Almo — an interactive study app designed around the
              real needs of medical students.
            </p>
          </div>
        </header>

        {/* --- How we work ---------------------------------------------------
            The trust-building section: a real, repeatable process laid out
            plainly, not a tech-stack list. The connecting line draws itself
            in as you scroll — the one place motion is a showpiece rather
            than a decoration, since the section's whole point is sequence. */}
        <section
          aria-labelledby="process-heading"
          className="px-6 py-22 md:px-14"
        >
          {/* Heading and intro hold the left column and stick while the
              stages scroll past, rather than sitting above a spine that used
              only the left half of the width and left the rest empty. Same
              pattern as the About page's Mission section. */}
          <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[minmax(300px,1fr)_1fr] lg:gap-20">
            <div className="flex flex-col gap-3.5 lg:sticky lg:top-32 lg:self-start">
              <h2
                id="process-heading"
                className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                How we work
              </h2>
              <p className="max-w-[52ch] font-body text-base leading-relaxed text-gray-700">
                Designed with intention. Each stage is completed before the next begins, with regular feedback throughout development.
              </p>
            </div>

            <Process />
          </div>
        </section>

        {/* --- Almo ----------------------------------------------------------
            Almo isn't shipped, so it's framed as the problem it's solving
            rather than a product tour — proof the process above is actually
            running on something, without pretending there's a finished
            product to show. */}
        <section
          aria-labelledby="almo-heading"
          className="bg-blue-100 px-6 py-22 md:px-14"
        >
          {/* Two rows, not three: the heading and its copy share the top row
              so the full width is used, rather than a 720px heading with 430px
              of blank beside it stacked over a 560px paragraph with 600px of
              blank beside that. Copy sits baseline-aligned to the bottom of
              the heading so both rows read as one block. */}
          <div className="mx-auto flex max-w-[1160px] flex-col gap-8">
            <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,430px)] md:items-end md:gap-16">
              <h2
                id="almo-heading"
                className="font-display text-[clamp(36px,4.5vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                Revision is a mess.
                <br />
                It doesn&rsquo;t have to be.
              </h2>

              {/* The card below is a design, not a screenshot — said plainly
                  rather than left for the reader to assume, since the whole
                  page's credibility rests on not overclaiming. */}
              <p className="font-body text-[15px] leading-relaxed text-gray-700">
                Almo is an interactive study app for medical students, shaped with real students in mind and shipped iteratively based on their needs, feedback, and evolving study habits.
              </p>
            </div>

            <AlmoScatter />
          </div>
        </section>

        {/* --- How to get in --------------------------------------------------
            The secondary ask, for students rather than organisations. Copy
            pulled from content/join-teams.json so this isn't a second,
            driftable version of what /join already says for this team.
            The two blocks sit at their natural width rather than stretched
            across a 1fr track — with no tagline, the left block is just a
            heading and a button, so a forced-wide column left an empty gap
            between the button and the benefit cards instead of trailing
            space after them. Centered vertically since the benefit stack is
            now taller than the text block next to it. */}
        <section
          aria-labelledby="recruit-heading"
          className="px-6 py-22 md:px-14"
        >
          {/* A grid rather than nested flex columns so the button can be a
              direct sibling of the benefit list: stacked, DOM order puts it
              last (heading, benefits, then the ask), while on lg it is placed
              back under the heading in column one. Nesting it with the
              heading instead would strand it between the two on narrow
              screens, where the ask belongs after what it's asking for. */}
          <div className="mx-auto grid max-w-[1160px] gap-8 lg:grid-cols-[minmax(0,480px)_360px] lg:items-center lg:justify-between lg:gap-x-16 lg:gap-y-7">
            <h2
              id="recruit-heading"
              className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance lg:col-start-1 lg:row-start-1"
            >
              Want to build with us?
            </h2>

            {/* An accent rule per item rather than a bordered, tinted box:
                gray-700 on blue-50 inside a blue-200 border stacked three
                low-contrast greys on each other and read as disabled. Text
                carries the weight here — blue-900 at 600 — and the single
                blue-600 rule is the only colour, marking each item as its own
                without drawing a container around it. Square by necessity:
                a radius on a one-sided border clips to nothing. */}
            {sweJoinTeam && sweJoinTeam.benefits.length > 0 && (
              <ul className="flex flex-col gap-[18px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
                {sweJoinTeam.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="border-l-2 border-blue-600 py-0.5 pl-4 font-display text-base leading-[1.4] font-semibold text-blue-900"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-3.5 lg:col-start-1 lg:row-start-2">
              <ButtonLink href="/join?team=swe" size="lg">
                Apply to the software team
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* --- Work with us ---------------------------------------------------
            The primary conversion point on the page. A form, not just an
            email address, because "email us" is what every page already
            offers via the footer — this one is specific to commissioning
            work, and says so. */}
        <section
          aria-labelledby="commission-heading"
          className="bg-blue-100 px-6 py-22 md:px-14"
        >
          <div className="mx-auto grid max-w-[1160px] gap-14 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col gap-4">
              <h2
                id="commission-heading"
                className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                Have something you need built?
              </h2>
              <p className="max-w-[440px] font-body text-base leading-relaxed text-gray-700">
                Tell us what you’re looking for, and we’ll guide you through from an
                initial briefing and discovery meeting to a clear plan tailored to your needs.
              </p>
              <ul className="flex flex-col gap-3 pt-2">
                {[
                  "Direct access to the team",
                  "A clear, consistent process ",
                  "Transparent from day one",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 font-body text-[15px] leading-snug text-gray-700"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-1 w-1 flex-none rounded-full bg-blue-600"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <CommissionForm />
          </div>
        </section>
      </main>
      <JoinCta />
      <Footer />
    </>
  );
}
