import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HiringApply } from "@/components/hiring/hiring-apply";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { getHiringPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hiring",
  description:
    "Open roles on Nightjar, MaaSec's web-exploitation model, and on our other open-source security projects.",
};

export default async function HiringPage() {
  const programs = await getHiringPrograms();

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <header className="px-6 pt-24 pb-14 md:px-14">
          <div className="mx-auto grid max-w-[1160px] gap-6 md:grid-cols-[1fr_minmax(0,400px)] md:items-end md:gap-16">
            <h1
              data-reveal
              className="font-display text-[clamp(38px,5.6vw,68px)] leading-[1.05] font-extrabold tracking-[-0.04em] text-blue-900 text-balance"
            >
              Build security tools with us.
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
              className="font-body text-[17px] leading-relaxed text-gray-700"
            >
              These are project roles, not general membership. If you just
              want to join a MaaSec team, use{" "}
              <Link
                href="/join"
                className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
              >
                the join form
              </Link>{" "}
              instead.
            </p>
          </div>
        </header>

        <Suspense fallback={null}>
          <HiringApply programs={programs} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
