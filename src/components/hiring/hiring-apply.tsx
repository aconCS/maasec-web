"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { HiringProgram } from "@/lib/content";
import { site } from "@/lib/site";

export function HiringApply({ programs }: { programs: HiringProgram[] }) {
  const params = useSearchParams();
  const requested = params.get("program") ?? params.get("team");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(
    programs.some((p) => p.id === requested) ? requested! : programs[0]?.id,
  );

  // The hash never reaches the server, so it can only be read after mount.
  useEffect(() => {
    function open(programId: string | null | undefined) {
      if (!programs.some((p) => p.id === programId)) return;
      setActiveId(programId as string);
      setStatus("idle");
      setError("");
      // The section's top edge doesn't move when the panel swaps, so there's
      // nothing to wait for before scrolling to it.
      sectionRef.current?.scrollIntoView({ block: "start" });
    }
    const fromHash = () =>
      decodeURIComponent(window.location.hash.slice(1)) || null;

    open(fromHash() ?? requested);
    const onHashChange = () => open(fromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [programs, requested]);

  const active = programs.find((p) => p.id === activeId) ?? programs[0];

  // Load Tally's embed script so the iframe resizes correctly on all devices
  // (a fixed-height raw iframe renders blank/collapsed on mobile Safari).
  useEffect(() => {
    const load = () => {
      // @ts-expect-error - Tally is injected by the external script
      if (typeof window.Tally !== "undefined") window.Tally.loadEmbeds();
    };
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://tally.so/widgets/embed.js"]',
    );
    if (existing) {
      load();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.onload = load;
    document.body.appendChild(script);
  }, [activeId]);

  if (!active) return null;
  const openRoles = active.roles.filter((r) => r.open);
  const accepting = active.open && openRoles.length > 0;
  const isTeam = active.kind === "team";

  function select(id: string) {
    setActiveId(id);
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label="Open roles and application"
      className="scroll-mt-20 px-6 pb-24 md:px-14"
    >
      <div className="mx-auto flex max-w-[1160px] flex-col gap-12">
        {programs.length > 1 && (
          <div
            role="tablist"
            aria-label="Programs"
            className={`flex flex-wrap gap-x-10 gap-y-2 border-b ${t.rule}`}
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
                    selected ? t.tabOn : t.tab
                  }`}
                >
                  {program.title}
                  {!program.open && (
                    <span className={`font-body text-xs font-medium ${t.muted}`}>
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
              <h2 className={`font-display text-[clamp(32px,3.6vw,48px)] leading-[1.05] font-bold tracking-[-0.03em] text-balance ${t.heading}`}>
                {active.title}
              </h2>
              <p className={`max-w-[46ch] font-serif text-[20px] leading-[1.5] italic ${t.tagline}`}>
                {active.tagline}
              </p>
              {active.about && (
                <p className={`max-w-[60ch] font-body text-base leading-relaxed ${t.body}`}>
                  {active.about}
                </p>
              )}
              {active.repoUrl && (
                <a
                  href={active.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`w-fit font-body text-[15px] font-semibold underline underline-offset-4 ${t.link}`}
                >
                  Read the {active.title} repository
                </a>
              )}
            </div>

            {active.benefits.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className={`font-display text-lg font-semibold ${t.heading}`}>
                  What you get
                </h3>
                <ul className={`flex flex-col border-t ${t.rule}`}>
                  {active.benefits.map((benefit, i) => (
                    <li
                      key={benefit}
                      className={`flex items-baseline gap-5 border-b py-4 ${t.rule}`}
                    >
                      <span className={`flex-none font-mono text-xs leading-none ${t.accent}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-body text-base leading-relaxed ${t.heading}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!isTeam && (
              <div className="flex flex-col gap-4">
                <h3 className={`font-display text-lg font-semibold ${t.heading}`}>
                  Roles
                </h3>
                <ul className={`flex flex-col border-t ${t.rule}`}>
                  {active.roles.map((role) => (
                    <li
                      key={role.id}
                      className={`grid gap-1 border-b py-4 sm:grid-cols-[200px_1fr] sm:gap-6 ${t.rule}`}
                    >
                      <span
                        className={`font-display text-base font-semibold ${
                          role.open ? t.heading : t.filled
                        }`}
                      >
                        {role.title}
                        {!role.open && (
                          <span className="ml-2 font-body text-xs font-medium">
                            Filled
                          </span>
                        )}
                      </span>
                      <span className={`font-body text-[15px] leading-relaxed ${t.body}`}>
                        {role.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {active.lookingFor.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className={`font-display text-lg font-semibold ${t.heading}`}>
                  What helps
                </h3>
                <ul className="flex flex-col gap-3">
                  {active.lookingFor.map((line) => (
                    <li
                      key={line}
                      className={`border-l-2 py-0.5 pl-4 font-body text-[15px] leading-snug ${t.bar} ${t.heading}`}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

                {/* Tally embed — embed.js controls height so it works on mobile */}
                <iframe
                  data-tally-src="https://tally.so/embed/eqbPek?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="500"
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