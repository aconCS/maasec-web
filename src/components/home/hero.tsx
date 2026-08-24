import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { getSpeakers } from "@/lib/content";

export async function Hero() {
  const speakers = await getSpeakers();

  return (
    <section className="relative overflow-hidden">
      <div className="px-6 pt-6 pb-16 md:px-14 md:pb-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col gap-8">
            <div className="flex w-fit flex-col gap-2">
              <h1 className="font-display text-[clamp(88px,10.5vw,150px)] leading-[0.82] font-extrabold tracking-[-0.055em] text-blue-900">
                BREAK
                <br />
                THINGS
                <span className="text-blue-400">.</span>
              </h1>
              <p className="w-full text-justify [text-align-last:justify] font-serif text-[clamp(18px,4vw,46px)] leading-[1.12] font-medium tracking-[-0.015em] text-gray-800 italic">
                and learn to defend them.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/join" size="lg">
                Pick your team
              </ButtonLink>
              <ButtonLink href="/events" variant="ghost" size="lg">
                <CalendarIcon />
                Upcoming events
              </ButtonLink>
            </div>

            <div className="flex flex-col gap-3.5 pt-2">
              <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-gray-600 uppercase">
                MaaSec has hosted industry experts from
              </span>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                {speakers.map((name) => (
                  <span
                    key={name}
                    className="font-display text-lg leading-none font-semibold tracking-[-0.01em] text-gray-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Graphic — hidden entirely until the grid actually goes two-column,
              so it never stacks below the copy at intermediate widths. */}
          <div className="relative hidden lg:block">
            <div className="relative flex aspect-square w-full items-center justify-center">
              <div className="relative w-[86%] overflow-hidden rounded-card shadow-[0_12px_30px_rgba(17,51,87,.14)]">
                <Image
                  src="/images/gallery/team2.jpg"
                  alt="The MaaSec club"
                  width={640}
                  height={640}
                  priority
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  );
}
