import type { Metadata } from "next";
import { Achievements } from "@/components/about/achievements";
import { Mission } from "@/components/about/mission";
import { UrgencyStats } from "@/components/about/urgency-stats";
import { WhatWeDo } from "@/components/about/what-we-do";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ImageSlot } from "@/components/ui/image-slot";
import { getJoinTeams } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why MaaSec exists: lower the barrier into cybersecurity, build provable skill, and help close the security workforce gap.",
};

const members = [
  {
    name: "Andreas Constantinou",
    role: "3rd year, Computer Science",
    quote:
      "I always wanted to compete in CTFs, but they looked too difficult. After joining a competition with MaaSec, I helped the CTF team achieve a top 3% international placement.",
  },
  {
    name: "Theodotos Neokleous",
    role: "3rd year, Computer Science",
    quote:
      "Our CTF captain’s dedication and work ethic were crucial in helping MaaSec secure 2nd place in the Netherlands in 2026.",
  },
];

export default function AboutPage() {
  const teams = getJoinTeams();

  return (
    <>
      <Nav />
      <main>
        <header className="mx-auto flex max-w-[840px] flex-col items-center gap-5 px-6 pt-24 pb-9 text-center">
          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900">
            Our story
          </h1>
        </header>

        {/* Story card */}
        <div className="mx-auto mb-16 max-w-[1160px] rounded-[25px] bg-blue-100 px-6 py-12 md:px-14">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <ImageSlot
              src="/images/gallery/team2.jpg"
              alt="The MaaSec club"
              label="Photo — the team"
              radius={10}
              className="aspect-[4/3] w-full"
            />
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-4">
                <p className="font-body text-[17px] leading-[1.65] text-gray-700">
                  We started MaaSec because we kept meeting students who were
                  genuinely interested in cybersecurity, but didn&rsquo;t know
                  where to begin. The resources exist out there, but the journey
                  wasn&rsquo;t always clear. Many had the curiosity to learn, but
                  lacked the guidance and community to take their first steps.
                </p>
                <p className="font-body text-[17px] leading-[1.65] text-gray-700">
                  Today, MaaSec creates a pathway from complete beginner to
                  discovering real-world vulnerabilities through weekly labs, our
                  CTF team, and real consultancy services.
                </p>
              </div>
              <p className="font-display text-[26px] leading-[1.32] font-semibold tracking-[-0.02em] text-blue-900 text-pretty">
                Build practical skills through projects, CTFs, and real-world
                research.
              </p>
            </div>
          </div>
        </div>

        <UrgencyStats />

        <Mission />

        <WhatWeDo teams={teams} />

        <Achievements />

        {/* Gallery */}
        <section className="mx-auto flex max-w-[1160px] flex-col gap-10 px-6 py-24 md:px-14">
          <h2
            data-reveal
            className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900"
          >
            Labs, competitions, and everything between
          </h2>
          {/*
            Bento grid sized to each photo's real aspect ratio (checked via
            sharp): landscape/square photos get wide 2x2 tiles, portraits
            get tall 1x2 tiles. This exact combination — three 2x2s and two
            1x2s — fills a 4-col grid with zero empty cells (16 of 16
            cells occupied); reordering or swapping spans breaks that.
          */}
          <div className="grid auto-rows-[130px] grid-cols-2 gap-4 md:auto-rows-[180px] md:grid-cols-4">
            <ImageSlot
              src="/images/gallery/ctf.jpg"
              alt="CTF weekend"
              label="CTF weekend"
              radius={10}
              className="col-span-2 row-span-2 transition-transform duration-[260ms] hover:scale-[1.015]"
            />
            <ImageSlot
              src="/images/gallery/back_speaker.jpeg"
              alt="Guest talk"
              label="Guest talk"
              radius={10}
              className="row-span-2 transition-transform duration-[260ms] hover:scale-[1.015]"
            />
            <ImageSlot
              src="/images/gallery/team1.jpg"
              alt="Team photo"
              label="Team photo"
              radius={10}
              className="row-span-2 transition-transform duration-[260ms] hover:scale-[1.015]"
            />
            <ImageSlot
              src="/images/gallery/speaker.jpg"
              alt="Lab night"
              label="Lab night"
              radius={10}
              className="col-span-2 row-span-2 transition-transform duration-[260ms] hover:scale-[1.015]"
            />
            <ImageSlot
              src="/images/graphics/gallery-1.png"
              alt="Awards moment"
              label="Awards moment"
              radius={10}
              className="col-span-2 row-span-2 transition-transform duration-[260ms] hover:scale-[1.015]"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-blue-100 px-6 py-24 md:px-14">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <h2
              data-reveal
              className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900"
            >
              What our members say
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {members.map((member, i) => (
                <figure
                  key={member.name}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
                  className="flex flex-col gap-[18px] rounded-[20px] bg-white p-8"
                >
                  <figcaption className="flex flex-col">
                    <span className="font-display text-sm leading-tight font-semibold text-blue-900">
                      {member.name}
                    </span>
                    <span className="font-body text-[12.5px] leading-tight text-gray-600">
                      {member.role}
                    </span>
                  </figcaption>
                  <blockquote className="font-display text-lg leading-[1.4] font-bold tracking-[-0.01em] text-blue-900">
                    &ldquo;{member.quote}&rdquo;
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
