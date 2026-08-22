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

const ul = "mb-4 flex list-disc flex-col gap-1.5 pl-6";
const li = "font-body text-[17px] leading-[1.7] text-gray-700";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="px-6 pt-28 pb-20 md:px-14">
        <div className="mx-auto flex max-w-[720px] flex-col">
          <h1 className="mb-2 font-display text-[clamp(36px,5vw,56px)] leading-tight font-extrabold tracking-[-0.04em] text-blue-900">
            Privacy
          </h1>
          <p className="mb-6 font-body text-sm text-gray-600">
            Last updated August 2026
          </p>

          <p className={p}>
            MaaSec is a student organisation, not a company. We collect as
            little personal data as we can get away with, and never sell it
            or use it for advertising. This page explains what we collect,
            why, and what you can do about it — in line with the EU General
            Data Protection Regulation (GDPR), as we&rsquo;re based in the
            Netherlands.
          </p>

          <h2 className={h2}>Who&rsquo;s responsible for your data</h2>
          <p className={p}>
            MaaSec, Maastricht University&rsquo;s student cybersecurity
            organisation and ACM chapter, is the data controller for the
            information described on this page. Reach us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              {site.email}
            </a>{" "}
            for anything below.
          </p>

          <h2 className={h2}>What we collect</h2>
          <p className={p}>
            The only place this site asks you for personal information is
            the <a href="/join" className="text-blue-600 underline underline-offset-2 hover:text-blue-800">Join</a>{" "}
            form. If you use it, we receive:
          </p>
          <ul className={ul}>
            <li className={li}>your first name and surname</li>
            <li className={li}>your email address</li>
            <li className={li}>
              your student number (used only to confirm you&rsquo;re a
              Maastricht University student)
            </li>
            <li className={li}>
              whatever you write in the optional motivation field
            </li>
            <li className={li}>which team you&rsquo;re applying to</li>
          </ul>
          <p className={p}>
            That&rsquo;s the complete list. This site sets no cookies, runs
            no analytics, and has no tracking pixels or advertising scripts —
            there is nothing else being collected in the background.
          </p>

          <h2 className={h2}>How we use it, and who sees it</h2>
          <p className={p}>
            Submitting the Join form sends your details, over an encrypted
            connection, straight to an email inbox the board reads — MaaSec&rsquo;s
            own website has no database that stores your submission. That
            email is delivered via Resend, an email-sending service acting
            only on our instructions as a data processor; we don&rsquo;t use it
            for anything beyond delivering your application. We keep
            applications only for as long as it takes to process them
            (typically a few weeks), then delete them.
          </p>
          <p className={p}>
            If you message us on Discord, WhatsApp, or by email instead, that
            conversation is governed by that platform&rsquo;s own privacy
            policy, not this one.
          </p>

          <h2 className={h2}>Your rights</h2>
          <p className={p}>Under GDPR, you can ask us at any time to:</p>
          <ul className={ul}>
            <li className={li}>see what data we hold about you</li>
            <li className={li}>correct anything that&rsquo;s wrong</li>
            <li className={li}>delete your data</li>
            <li className={li}>
              get a copy of your data in a portable format
            </li>
            <li className={li}>
              object to how we&rsquo;re using it
            </li>
          </ul>
          <p className={p}>
            Email {site.email} for any of these — we&rsquo;ll respond within
            a month. If you think we&rsquo;ve mishandled your data, you can
            also lodge a complaint with the Dutch Data Protection Authority
            (Autoriteit Persoonsgegevens).
          </p>

          <h2 className={h2}>Contact</h2>
          <p className={p}>
            Questions, or a request about your data? Write to{" "}
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
