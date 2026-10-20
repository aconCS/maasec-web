import Link from "next/link";

/** "About us" statement + mission copy. */
export function Mission() {
  return (
    <section id="mission" className="bg-white px-6 pt-24 pb-22 md:px-14">
      <div className="mx-auto grid max-w-[1160px] items-start gap-16 md:grid-cols-2">
        <p className="max-w-[520px] font-display text-[clamp(24px,3vw,30px)] leading-[1.32] font-medium tracking-[-0.02em] text-blue-900">
          MaaSec is a non-profit association that protects small businesses,
          non-profits and community organisations in the Maastricht and
          Heuvelland region that can&rsquo;t afford professional
          cybersecurity services.
        </p>
        <div className="flex max-w-[540px] flex-col gap-5">
          <p className="font-body text-[17px] leading-[1.65] text-gray-700">
            Our volunteer members provide free security assessments, advice
            and awareness training. We also run public talks, workshops and
            capture-the-flag events for anyone who wants to understand how
            attacks work and how to stop them.
          </p>
          <p className="font-body text-[17px] leading-[1.65] text-gray-700">
            All of our income is reinvested in these activities. None of it
            is distributed to members.
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
