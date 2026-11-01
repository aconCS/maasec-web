import type { Metadata } from "next";
import Link from "next/link";
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
            Last updated November 2026
          </p>

          <p className={p}>
            MaaSec is a non-profit association, not a company. We collect as
            little personal data as we can get away with, and never sell it
            or use it for advertising. This page explains what we collect,
            why, and what you can do about it — in line with the EU General
            Data Protection Regulation (GDPR), as we&rsquo;re based in the
            Netherlands.
          </p>

          <h2 className={h2}>Who&rsquo;s responsible for your data</h2>
          <p className={p}>
            MaaSec, a non-profit cybersecurity association based in
            Maastricht, is the data controller for the
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
            If you apply through the{" "}
            <a href="/join" className="text-blue-600 underline underline-offset-2 hover:text-blue-800">Join</a>{" "}
            form, we receive:
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
            If you request a free penetration test on one of our{" "}
            <Link href="/grants/ai-pentest/en" className="text-blue-600 underline underline-offset-2 hover:text-blue-800">AI pentest</Link>{" "}
            pages, we receive:
          </p>
          <ul className={ul}>
            <li className={li}>your name and email address</li>
            <li className={li}>
              your organisation&rsquo;s name and type, and its city, town or
              country
            </li>
            <li className={li}>the website you&rsquo;d like us to test</li>
            <li className={li}>
              whatever you write in the optional message field
            </li>
            <li className={li}>
              your confirmation that you&rsquo;re allowed to request the test
            </li>
            <li className={li}>
              which page and language version you used
            </li>
            <li className={li}>
              if you reached the page through one of our ads: the ad click ID
              and campaign tags that were in the link you clicked (such as{" "}
              <code>gclid</code> and <code>utm_campaign</code>)
            </li>
          </ul>
          <p className={p}>
            If you sign up for our free{" "}
            <Link href="/grants/ai-pentest/ww/checklist" className="text-blue-600 underline underline-offset-2 hover:text-blue-800">security checklist</Link>,
            we receive:
          </p>
          <ul className={ul}>
            <li className={li}>your email address</li>
            <li className={li}>
              if you fill them in: your first name, organisation and country
            </li>
            <li className={li}>
              whether you ticked the box for our monthly security tips
            </li>
            <li className={li}>which page you signed up on</li>
            <li className={li}>
              if you came from one of our ads: the ad click ID and campaign
              tags from the link you clicked
            </li>
          </ul>
          <p className={p}>
            That&rsquo;s the complete list. This site sets no cookies, runs
            no analytics, and has no tracking pixels or advertising scripts —
            there is nothing else being collected in the background.
          </p>

          <h2 className={h2}>Google Ads</h2>
          <p className={p}>
            We advertise the free penetration test and the security
            checklist with Google Ads. When you click one of those ads, Google
            adds a click ID to the link. If you then send a form, that click
            ID is sent along with it, and we report to Google Ads that the ad
            led to a request or signup. We send Google only the click ID and
            the time, never what you wrote in the form. Nothing is stored on your device for this:
            no cookies and no Google scripts are used on our site.
          </p>

          <h2 className={h2}>How we use it, and who sees it</h2>
          <p className={p}>
            Submitting a form sends your details, over an encrypted
            connection, straight to the email inbox of the board member who
            handles it. That email is delivered via Resend, an
            email-sending service acting only on our instructions as a data
            processor; we don&rsquo;t use it for anything beyond delivering
            your message. Penetration test requests and checklist signups are
            also copied to a private Google Sheet that only the board can
            open, so we can follow up and see which of our ads lead to
            requests; Google stores that Sheet for us as a data processor.
            We keep applications only for as long as it takes to process them
            (typically a few weeks), then delete them. We keep test requests
            only for as long as we need them to arrange and carry out the
            test and any follow-up, then delete them.
          </p>

          <h2 className={h2}>Security checklist and monthly tips</h2>
          <p className={p}>
            When you sign up for the checklist, we send one email with a link
            to it. We only send our monthly security tips if you ticked that
            box; it is never ticked for you. Every tips email tells you how to
            stop them: reply with &ldquo;unsubscribe&rdquo;, or email{" "}
            <a href={`mailto:${site.email}`} className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
              {site.email}
            </a>
            , and we&rsquo;ll remove your address. If you didn&rsquo;t ask for
            tips, we won&rsquo;t email you again, and we delete your signup
            once we no longer need it to measure our campaigns.
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
