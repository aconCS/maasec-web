import type { Metadata } from "next";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { getJoinTeams, getTeamGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet MaaSec's board, CTF team, marketing, and consultancy teams — Maastricht University's student cybersecurity organisation.",
};

/**
 * Teams with a page of their own. Only these get a "Learn more" — the rest
 * have nowhere deeper to send the reader, and a button that leads back to
 * the same information is worse than no button.
 */
const teamPages: Record<string, string> = {
  ctf: "/ctf",
  swe: "/software",
};

export default async function TeamPage() {
  const [groups, joinTeams] = await Promise.all([
    getTeamGroups(),
    getJoinTeams(),
  ]);

  // Recruiting status comes from content/join-teams.json, the same source
  // /join reads, so a team that stops taking applications loses its Join
  // button here without a code change.
  const openTeams = new Set(
    joinTeams.filter((team) => team.open).map((team) => team.id),
  );

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <header className="mx-auto flex max-w-[840px] flex-col items-center gap-5 px-6 pt-24 pb-16 text-center">
          <div className="flex" aria-hidden>
            <ImageSlot
              src="/images/board/luka.jpg"
              alt=""
              shape="circle"
              className="-ml-3 h-14 w-14 border-2 border-white first:ml-0"
            />
            <ImageSlot
              src="/images/board/theo.jpg"
              alt=""
              shape="circle"
              className="-ml-3 h-14 w-14 border-2 border-white"
            />
            <ImageSlot
              src="/images/board/ivan.png"
              alt=""
              shape="circle"
              className="-ml-3 h-14 w-14 border-2 border-white"
            />
            <ImageSlot
              src="/images/board/andreas.png"
              alt=""
              shape="circle"
              className="-ml-3 h-14 w-14 border-2 border-white"
            />
            <span className="-ml-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-blue-900 font-display text-[13px] font-semibold text-white">
              +121
            </span>
          </div>

          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900">
            The people behind MaaSec
          </h1>

          <p className="font-serif text-[22px] leading-[1.5] font-medium text-gray-800 italic">
            One board, three teams, more than a hundred members.
          </p>
        </header>

        {groups.map((group) => {
          const learnHref = teamPages[group.id];
          const canJoin = openTeams.has(group.id);

          return (
            <section
              key={group.id}
              aria-labelledby={`${group.id}-heading`}
              className={`px-6 py-22 md:px-14 ${
                group.surface === "blue" ? "bg-blue-100" : "bg-white"
              }`}
            >
              <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-start
 md:justify-between">
                  <div className="flex flex-col gap-3.5">
                    <h2
                      id={`${group.id}-heading`}
                      className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900"
                    >
                      {group.title}
                    </h2>

                    <p className="max-w-[600px] font-body text-base leading-relaxed text-gray-700">
                      {group.blurb}
                    </p>
                  </div>

                  {(learnHref || canJoin) && (
                    <div className="flex shrink-0 flex-wrap gap-3.5">
                      {learnHref && (
                        <ButtonLink href={learnHref} size="lg">
                          Learn more
                        </ButtonLink>
                      )}

                      {canJoin && (
                        <ButtonLink
                          href={`/join?team=${group.id}`}
                          size="lg"
                          variant={learnHref ? "ghost" : "primary"}
                        >
                          Join
                        </ButtonLink>
                      )}
                    </div>
                  )}
                </div>

                {group.members ? (
                  <ScrollRail
                    fadeFrom={
                      group.surface === "blue" ? "from-blue-100" : "from-white"
                    }
                    gapClassName="gap-6"
                    ariaLabel={`${group.title} members`}
                  >
                    {group.members.map((member) => {
                      const isPlaceholder =
                        member.photo === "/logo-mark-dark.svg";

                      return (
                        <div
                          key={`${member.name}-${member.role}`}
                          className="flex w-[164px] flex-none snap-start flex-col gap-3.5 sm:w-[188px]"
                        >
                          <ImageSlot
                            src={member.photo}
                            alt={member.name}
                            label={`Photo — ${member.role}`}
                            radius={10}
                            className="aspect-square w-full"
                            fit={isPlaceholder ? "contain" : "cover"}
                            background={
                              isPlaceholder
                                ? group.surface === "blue"
                                  ? "bg-white"
                                  : "bg-blue-100"
                                : undefined
                            }
                          />

                          <div className="flex flex-col gap-0.5">
                            <span className="font-display text-base leading-tight font-semibold text-blue-900">
                              {member.name}
                            </span>
                            <span className="font-body text-[13.5px] leading-tight text-gray-700">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {!!group.memberCount &&
                      group.memberCount > group.members.length && (
                        <div className="flex w-[164px] flex-none snap-start flex-col gap-3.5 sm:w-[188px]">
                          <div
                            className={`flex aspect-square w-full items-center justify-center rounded-[10px] border ${
                              group.surface === "blue"
                                ? "border-blue-900/15 bg-white"
                                : "border-blue-200 bg-blue-100"
                            }`}
                          >
                            <span className="font-display text-[28px] leading-none font-extrabold tracking-[-0.02em] text-blue-900">
                              +{group.memberCount - group.members.length}
                            </span>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="font-display text-base leading-tight font-semibold text-blue-900">
                              contributing members
                            </span>
                          </div>
                        </div>
                      )}
                  </ScrollRail>
                ) : null}
              </div>
            </section>
          );
        })}

        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
