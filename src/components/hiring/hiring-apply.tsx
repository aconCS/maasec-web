"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { HiringProgram } from "@/lib/content";
import { site } from "@/lib/site";

export function HiringApply({ programs }: { programs: HiringProgram[] }) {
  const params = useSearchParams();
  const requested = params.get("program");
  const [activeId, setActiveId] = useState(
    programs.some((p) => p.id === requested) ? requested! : programs[0]?.id,
  );

  const active = programs.find((p) => p.id === activeId) ?? programs[0];
  if (!active) return null;
  const openRoles = active.roles.filter((r) => r.open);
  const accepting = active.open && openRoles.length > 0;

  function select(id: string) {
    setActiveId(id);
  }

  //embed for tally url
  const tallyUrl = "https://tally.so/embed/eqbPek?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

  return (
    <section
      id="apply"
      aria-label="Open roles and application"
      className="px-6 pb-24 md:px-14"
    >
      <div className="mx-auto flex max-w-[1160px] flex-col gap-12">
        {programs.length > 1 && (
          <div
            role="tablist"
            aria-label="Programs"
            className="flex flex-wrap gap-x-10 gap-y-2 border-b border-gray-300"
          >
            {programs.map((program) => {
              const selected = program.id === active.id;
              return (
                <button
                  key={program.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="hiring-panel"
                  onClick={() => select(program.id)}
                  className={`-mb-px flex cursor-pointer items-baseline gap-2 border-b-2 py-4 font-display text-xl leading-none font-bold tracking-[-0.025em] transition-[color,border-color] duration-[160ms] ${
                    selected
                      ? "border-blue-600 text-blue-900"
                      : "border-transparent text-gray-600 hover:text-blue-900"
                  }`}
                >
                  {program.title}
                  {!program.open && (
                    <span className="font-body text-xs font-medium text-gray-600">
                      Closed
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div
          id="hiring-panel"
          role="tabpanel"
          className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-20"
        >
          {/* Left Panel: Program details and roles */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[clamp(32px,3.6vw,48px)] leading-[1.05] font-bold tracking-[-0.03em] text-blue-900 text-balance">
                {active.title}
              </h2>
              <p className="max-w-[46ch] font-serif text-[20px] leading-[1.5] text-blue-800 italic">
                {active.tagline}
              </p>
              <p className="max-w-[60ch] font-body text-base leading-relaxed text-gray-700">
                {active.about}
              </p>
              {active.repoUrl && (
                <a
                  href={active.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-fit font-body text-[15px] font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
                >
                  Read the {active.title} repository
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-semibold text-blue-900">
                Roles
              </h3>
              <ul className="flex flex-col border-t border-gray-300">
                {active.roles.map((role) => (
                  <li
                    key={role.id}
                    className="grid gap-1 border-b border-gray-300 py-4 sm:grid-cols-[200px_1fr] sm:gap-6"
                  >
                    <span
                      className={`font-display text-base font-semibold ${
                        role.open ? "text-blue-900" : "text-gray-500"
                      }`}
                    >
                      {role.title}
                      {!role.open && (
                        <span className="ml-2 font-body text-xs font-medium">
                          Filled
                        </span>
                      )}
                    </span>
                    <span className="font-body text-[15px] leading-relaxed text-gray-700">
                      {role.summary}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-semibold text-blue-900">
                What helps
              </h3>
              <ul className="flex flex-col gap-3">
                {active.lookingFor.map((line) => (
                  <li
                    key={line}
                    className="border-l-2 border-blue-600 py-0.5 pl-4 font-body text-[15px] leading-snug text-blue-900"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: The Form */}
          <div className="rounded-[var(--radius-card)] bg-blue-100 p-6 sm:p-8 lg:sticky lg:top-28">
            {!accepting ? (
              <div className="flex flex-col gap-2">
                <span className="font-display text-[22px] leading-tight font-bold text-blue-900">
                  {active.title} isn&rsquo;t hiring right now.
                </span>
                <span className="font-body text-[15px] leading-relaxed text-gray-700">
                  Email{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-blue-700 underline underline-offset-4"
                  >
                    {site.email}
                  </a>{" "}
                  and we&rsquo;ll tell you when roles open again.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-[22px] leading-tight font-bold text-blue-900">
                  Apply to {active.title}
                </h3>
                
                {/* Tally Iframe Embed */}
                <iframe 
                  src={tallyUrl}
                  width="100%" 
                  height="800" 
                  style={{ border: 0, margin: 0, padding: 0 }} 
                  title="MaaSec Hiring Form"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}