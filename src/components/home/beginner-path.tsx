import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

export type BeginnerPathStep = {
  num: string;
  title: string;
  body: string;
};

export function BeginnerPath({
  headingId,
  heading,
  buttonHref,
  buttonLabel,
  steps,
  className,
}: {
  headingId?: string;
  heading: ReactNode;
  buttonHref: string;
  buttonLabel: string;
  steps: BeginnerPathStep[];
  className?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={`px-6 py-14 md:px-14 ${className ?? "bg-blue-100"}`}
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
