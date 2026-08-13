"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is MaaSec?",
    a: "MaaSec is Maastricht University's student cybersecurity organisation and ACM chapter — the Netherlands' 3rd-ranked university CTF team, running weekly labs, competitions, and real consultancy work.",
  },
  {
    q: "Is there a student cybersecurity club at Maastricht University?",
    a: "Yes — MaaSec. We're Maastricht University's cybersecurity organisation and ACM chapter, open to any student regardless of study background or prior experience.",
  },
  {
    q: "How do I join a CTF team in the Netherlands?",
    a: "Apply through MaaSec's Join page — no certifications or prior coursework needed. You'll have a short chat with the CTF team lead, then start training from wherever your current skill level is.",
  },
  {
    q: "Do I need coding or hacking experience to join?",
    a: "No. MaaSec welcomes complete beginners — no certifications or prior coursework needed. Mentorship from senior members takes you from your first lab to your first real competition.",
  },
  {
    q: "Which teams can I join?",
    a: "CTF, Marketing, or Consultancy — each with mentorship from senior members. Pick one on the Join page.",
  },
  {
    q: "What is ACM, and what does it mean that MaaSec is an ACM chapter?",
    a: "ACM (the Association for Computing Machinery) is the world's largest computing society. As Maastricht University's official ACM chapter, MaaSec's members get access to ACM's global network, resources, and events alongside everything we run locally.",
  },
  {
    q: "How competitive is MaaSec's CTF team?",
    a: "We're the Netherlands' 3rd-ranked CTF team, competing internationally as MaaSec. Our team trains members from complete beginner to competition-ready, with mentorship from senior players.",
  },
  {
    q: "What will I actually walk away with?",
    a: "Real, provable skill — CTF placements, bug bounty reports, and consultancy work you can put on your CV.",
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
