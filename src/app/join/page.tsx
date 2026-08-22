import { Suspense } from "react";
import type { Metadata } from "next";
import { Apply } from "@/components/join/apply";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ImageSlot } from "@/components/ui/image-slot";
import { getJoinTeams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Apply to MaaSec's CTF, Bug Bounty, Marketing, or Consultancy team. No experience needed — low-friction application, fast response.",
};

const process = [
  {
    num: "01",
    title: "Send your application",
    body: "Name, email, and the team you're curious about. Takes 30 seconds, no CV required.",
  },
  {
    num: "02",
    title: "Have a short chat",
    body: "A 15-minute call with the team lead. Tell us about your interests and experience.",
  },
  {
    num: "03",
    title: "Onboard and show up",
    body: "Join the community and start learning.",
  },
];

export default async function JoinPage() {
  const teams = await getJoinTeams();

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <section className="px-6 pt-28 pb-28 md:px-14">
          <div className="mx-auto grid w-full max-w-[1240px] items-center gap-14 md:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-8 py-6">
              <div className="flex flex-col gap-2.5">
                <h1 className="font-display text-[clamp(56px,9vw,96px)] leading-[0.92] font-extrabold tracking-[-0.045em] text-blue-900">
                  PICK A TEAM
                  <span className="text-blue-400">.</span>
                </h1>
              </div>
              <ImageSlot
                src="/images/gallery/ctf.jpg"
                alt="MaaSec members at a CTF session"
                label="Photo — a lab or CTF session"
                shape="rounded"
                radius={10}
                className="aspect-[16/9] w-full"
              />
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="font-display text-[clamp(24px,2.4vw,32px)] leading-[1.1] font-bold tracking-[-0.02em] text-blue-900">
                Onboarding process
              </h2>
              <div className="flex flex-col gap-5">
                {process.map((step) => (
                  <div key={step.num} className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs leading-none text-blue-900">
                      {step.num}
                    </span>
                    <h3 className="font-display text-[17px] leading-tight font-semibold text-blue-900">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-gray-700">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <Apply teams={teams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
