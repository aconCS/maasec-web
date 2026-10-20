"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "What is MaaSec?",
    a: "MaaSec is a non-profit association that protects small businesses, non-profits and community organisations in the Maastricht and Heuvelland region that can't afford professional cybersecurity services.",
  },
  {
    q: "Who can get help from MaaSec?",
    a: "Small businesses, non-profits, foundations, clubs and other community organisations in the Maastricht and Heuvelland region that don't have the budget for a professional security provider.",
  },
  {
    q: "Is it really free?",
    a: "Yes. Our assessments, advice and awareness training cost you nothing. Our members volunteer their time, and all of our income is reinvested in our activities. None of it is distributed to members.",
  },
  {
    q: "What does a security assessment involve?",
    a: "We look at how your organisation works day to day, from accounts and devices to your website and the way you handle data, and point out the weak spots. You get practical advice, ordered by what matters most. Experienced members check every review before it reaches you.",
  },
  {
    q: "How do we request an assessment?",
    a: `Email us at ${site.email} with a short description of your organisation and what worries you. We'll get back to you to plan the next steps.`,
  },
  {
    q: "Do you run events for the public?",
    a: "Yes. We organise public talks, workshops and capture-the-flag events. Check the Events page for what's coming up.",
  },
  {
    q: "Can I volunteer with MaaSec?",
    a: "Yes. Apply through the Join page and pick a team: CTF, Consultancy, Software Development or Events. You don't need certifications, and experienced members help you get started.",
  },
  {
    q: "How competitive is MaaSec's CTF team?",
    a: "We're one of the Netherlands' top-ranked CTF teams and compete internationally as MaaSec.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-blue-100 px-6 py-24 md:px-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto flex max-w-[840px] flex-col gap-10">
        <h2
          data-reveal
          className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900"
        >
          Frequently asked questions
        </h2>

        <div className="flex flex-col border-t border-blue-200">
          {faqs.map((item, i) => {
            const isOpen = i === open;
            return (
              <div key={item.q} className="border-b border-blue-200">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg leading-tight font-bold text-blue-900 md:text-xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="flex-none font-display text-2xl leading-none font-semibold text-blue-600 transition-transform duration-[220ms]"
                    style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                  >
                    ⌄
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[260ms] ease-[var(--ease-out-soft)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="font-body text-[15px] leading-relaxed text-gray-700 transition-[padding] duration-200"
                      style={{ paddingBottom: isOpen ? 22 : 0 }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
