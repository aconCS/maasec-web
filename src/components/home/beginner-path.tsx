import { ButtonLink } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    title: "Show up to a lab",
    body: "No prep needed, bring a laptop.",
  },
  {
    num: "02",
    title: "Learn the tools",
    body: "A mentor will guide you through the process.",
  },
  {
    num: "03",
    title: "Solve your first flag",
    body: "It only gets better from here.",
  },
];

export function BeginnerPath() {
  return (
    <section className="bg-blue-100 px-6 py-14 md:px-14">
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-2 md:gap-22">
        <div className="flex flex-col items-start gap-6">
          <h3 className="max-w-[440px] font-display text-[clamp(30px,3vw,38px)] leading-[1.2] font-semibold tracking-[-0.02em] text-blue-900">
            CTFs look impossible from the outside.
            <br />
            We&rsquo;re bringing you in.
          </h3>
          <ButtonLink href="/events" size="lg">
            Start at your first lab
          </ButtonLink>
        </div>

        <ol className="flex flex-col gap-[26px]">
          {steps.map((step) => (
            <li key={step.num} className="flex items-start gap-[22px]">
              <span className="pt-1 font-mono text-base leading-none font-medium text-blue-600">
                {step.num}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-[22px] leading-[1.35] font-semibold text-blue-900">
                  {step.title}
                </span>
                <span className="font-body text-[17px] leading-relaxed text-gray-700">
                  {step.body}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
