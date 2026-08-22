import type { Metadata } from "next";
import { JoinCta } from "@/components/home/join-cta";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { LearnGrid } from "@/components/learn/learn-grid";
import { getLearnEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Resources, guides, writeups, and blogs from MaaSec members — everything we've learned, published as we learn it.",
};

export default async function LearnPage() {
  const entries = await getLearnEntries();

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <section className="relative mx-auto max-w-[1160px] overflow-hidden px-6 pt-20 pb-14 md:px-14">
          <div className="relative z-10 flex flex-col gap-[18px]">
            <h1 className="font-display text-[clamp(40px,5vw,68px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900">
              Cybersecurity cheatsheet
            </h1>
            <p className="max-w-[520px] font-body text-[17px] leading-relaxed text-gray-700">
              Resources, guides, writeups, and blogs. Everything you need to get started.
            </p>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1160px] flex-col gap-6 px-6 pb-24 md:px-14">
          <span className="font-mono text-[11px] leading-none tracking-[0.18em] text-gray-600 uppercase">
            Learn
          </span>
          <LearnGrid entries={entries} />
        </section>

        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
