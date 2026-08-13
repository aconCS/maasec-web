import type { Metadata } from "next";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageSlot } from "@/components/ui/image-slot";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { getTeamGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet MaaSec's board, CTF team, marketing, and consultancy teams — Maastricht University's student cybersecurity organisation.",
};

export default function TeamPage() {
  const groups = getTeamGroups();

  return (
    <>
      <Nav />
      <main>
        <header className="mx-auto flex max-w-[840px] flex-col items-center gap-5 px-6 pt-24 pb-16 text-center">
          <div className="flex" aria-hidden>
            <ImageSlot
              src="/images/board/luka.jpg"
              alt=""
              shape="circle"
              className="-ml-2 h-9 w-9 border-2 border-white first:ml-0"
            />
            <ImageSlot
              src="/images/board/theo.jpg"
              alt=""
              shape="circle"
              className="-ml-2 h-9 w-9 border-2 border-white"
            />
            <ImageSlot
              src="/images/board/ivan.png"
              alt=""
              shape="circle"
              className="-ml-2 h-9 w-9 border-2 border-white"
            />
            <ImageSlot
              src="/images/board/andreas.png"
              alt=""
              shape="circle"
              className="-ml-2 h-9 w-9 border-2 border-white"
            />
            <span className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-900 font-display text-[10px] font-semibold text-white">
              +121
            </span>
          </div>
          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900">
            The people behind MaaSec
          </h1>
          <p className="font-serif text-[22px] leading-[1.5] font-medium text-gray-800 italic">
            One board, three teams, more than a hundred members.
          </p>
          <ButtonLink href="/join" size="lg">
            Join us
          </ButtonLink>
        </header>

        {groups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`${group.id}-heading`}
            className={`px-6 py-22 md:px-14 ${
              group.surface === "blue" ? "bg-blue-100" : "bg-white"
            }`}
          >
            <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
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

              {group.members ? (
                <ScrollRail
                  fadeFrom={
                    group.surface === "blue" ? "from-blue-100" : "from-white"
                  }
                  gapClassName="gap-6"
                  ariaLabel={`${group.title} members`}
                >
                  {group.members.map((member) => (
                    <div
                      key={member.role}
                      className="flex w-[164px] flex-none snap-start flex-col gap-3.5 sm:w-[188px]"
                    >
                      <ImageSlot
                        src={member.photo}
                        alt={member.name}
                        label={`Photo — ${member.role}`}
                        radius={10}
                        className="aspect-square w-full"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display text-base leading-tight font-semibold text-blue-900">
                          {member.name}
                        </span>
                        <span className="font-body text-[13.5px] leading-tight text-gray-600">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </ScrollRail>
              ) : group.roles ? (
                /* Teams we don't list by name show the disciplines they cover
                   instead. Wrapping flex rather than a grid so a short list
                   never leaves empty cells sitting in the rule work, and no
                   numbering — these are parallel specialisms, not a sequence. */
                <div className="flex flex-col gap-4">
                  <Eyebrow className="text-gray-600">
                    Roles on this team
                  </Eyebrow>
                  <ul className="flex flex-wrap border-t border-b border-blue-200">
                    {group.roles.map((role) => (
                      <li
                        key={role}
                        className="border-r border-blue-200 px-6 py-5 font-display text-[15px] leading-snug font-semibold text-blue-900 first:pl-0"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        ))}

        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
