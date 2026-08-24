import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

export type BeginnerPathStep = { num: string; title: string; body: string };

/**
 * A headline + CTA opposite a numbered path — reused wherever the pitch is
 * "here's exactly how you start," not just "here's why to join." The
 * numbers are load-bearing here (a real first/second/third), unlike the
 * old 01-04 markers on the Offers accordion, which numbered four parallel
 * options rather than a sequence.
 */
export function BeginnerPath({
  headingId,
  heading,
  buttonHref,
  buttonLabel,
  steps,
}: {
  /** Applied to the heading and referenced by the section's
   *  aria-labelledby, matching how every other section on a page like
   *  /ctf names itself. Omit where the page doesn't label sections this
   *  way (the homepage doesn't). */
  headingId?: string;
  heading: ReactNode;
  buttonHref: string;
  buttonLabel: string;
  steps: BeginnerPathStep[];
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-blue-100 px-6 py-14 md:px-14"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-2 md:gap-22">
        <div className="flex flex-col items-start gap-6">
          <h3
            id={headingId}
            className="max-w-[440px] font-display text-[clamp(30px,3vw,38px)] leading-[1.2] font-semibold tracking-[-0.02em] text-blue-900"
          >
            {heading}
          </h3>
          <ButtonLink href={buttonHref} size="lg">
            {buttonLabel}
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
