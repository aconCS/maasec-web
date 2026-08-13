import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How MaaSec handles the information you share with us.",
};

const p =
  "font-body text-[17px] leading-[1.7] text-gray-700";
const h2 =
  "mt-10 mb-3 font-display text-[24px] font-bold tracking-[-0.02em] text-blue-900";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-28 pb-20 md:px-14">
        <div className="mx-auto flex max-w-[720px] flex-col">
          <h1 className="mb-2 font-display text-[clamp(36px,5vw,56px)] leading-tight font-extrabold tracking-[-0.04em] text-blue-900">
            Privacy
          </h1>
          <p className="mb-6 font-body text-sm text-gray-600">
            Last updated August 2026
          </p>

          <p className={p}>
            MaaSec is a student organisation, not a company. We collect as little
            as possible and never sell or share your information.
          </p>

          <h2 className={h2}>What we collect</h2>
          <p className={p}>
            When you apply to a team or subscribe to event mail, we receive the
            name and email you enter, plus anything you write in the message
            field. That&rsquo;s it — no tracking pixels, no advertising cookies.
          </p>

          <h2 className={h2}>How we use it</h2>
          <p className={p}>
            Applications go to the relevant team lead so they can get back to
            you. Event-mail addresses are used only to send occasional notices
            about upcoming sessions. You can ask us to delete your details at any
            time.
          </p>

          <h2 className={h2}>Contact</h2>
          <p className={p}>
            Questions, or a deletion request? Write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
