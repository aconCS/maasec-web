import Link from "next/link";

/** "About us" statement + mission copy. */
export function Mission() {
  return (
    <section id="mission" className="bg-white px-6 pt-24 pb-22 md:px-14">
      <div className="mx-auto grid max-w-[1160px] items-start gap-16 md:grid-cols-2">
        <p className="max-w-[520px] font-display text-[clamp(24px,3vw,30px)] leading-[1.32] font-medium tracking-[-0.02em] text-blue-900">
          MaaSec is Maastricht University&rsquo;s cybersecurity organisation
          and ACM chapter, helping students build practical security skills
          through workshops, competitions, and real projects.
        </p>
        <div className="flex max-w-[540px] flex-col gap-5">
          <p className="font-body text-[17px] leading-[1.65] text-gray-700">
            Our mission is to bring more people into cybersecurity by making
            practical, hands-on learning accessible to everyone. Every week,
            our members tackle deliberately vulnerable systems, share what
            they&rsquo;ve learned, and build the skills needed for
            competitions, bug bounty programmes, and careers in cybersecurity.
          </p>
          <p className="font-body text-[17px] leading-[1.65] text-gray-700">
            You don&rsquo;t need prior experience or certifications. Our senior
            members will turn your curiosity into valuable security skills.
          </p>
          <Link
            href="/about"
            className="font-display text-[15px] font-semibold text-blue-600 hover:text-blue-800"
          >
            Read our story →
          </Link>
        </div>
      </div>
    </section>
  );
}
