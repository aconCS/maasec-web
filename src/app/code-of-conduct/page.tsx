import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Code of conduct",
  description:
    "What we expect of MaaSec members, and where the ethical and legal lines are.",
};

const p = "font-body text-[17px] leading-[1.7] text-gray-700";
const h2 =
  "mt-10 mb-3 font-display text-[24px] font-bold tracking-[-0.02em] text-blue-900";
const li = "font-body text-[17px] leading-[1.7] text-gray-700";

export default function CodeOfConductPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-28 pb-20 md:px-14">
        <div className="mx-auto flex max-w-[720px] flex-col">
          <h1 className="mb-2 font-display text-[clamp(36px,5vw,56px)] leading-tight font-extrabold tracking-[-0.04em] text-blue-900">
            Code of conduct
          </h1>
          <p className="mb-6 font-body text-sm text-gray-600">
            The short version: be decent, and only hack what you&rsquo;re allowed
            to.
          </p>

          <p className={p}>
            MaaSec teaches offensive and defensive security. That knowledge comes
            with responsibility, and membership means agreeing to use it well.
          </p>

          <h2 className={h2}>Be respectful</h2>
          <p className={p}>
            Everyone starts somewhere. No gatekeeping, no harassment, no
            condescension toward beginners. Labs are a place to ask &ldquo;dumb&rdquo;
            questions safely.
          </p>

          <h2 className={h2}>Stay legal and authorised</h2>
          <ul className="mb-4 flex list-disc flex-col gap-2 pl-6">
            <li className={li}>
              Only test systems you own or are explicitly authorised to test —
              CTF targets, our lab environment, or in-scope bug bounty programs.
            </li>
            <li className={li}>
              Report vulnerabilities responsibly through official channels, and
              stop the moment impact is demonstrated.
            </li>
            <li className={li}>
              Never use skills learned here to access, damage, or exfiltrate data
              without permission.
            </li>
          </ul>

          <h2 className={h2}>Reporting</h2>
          <p className={p}>
            If something crosses a line — conduct or ethics — tell a board member
            or write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              {site.email}
            </a>
            . Reports are handled discreetly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
