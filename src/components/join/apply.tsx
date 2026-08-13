"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DiscordIcon, WhatsAppIcon } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { site, teamIds, type TeamId } from "@/lib/site";
import type { JoinTeam } from "@/lib/content";

type Status = "idle" | "sending" | "done" | "error";

/**
 * The site is a static export (GitHub Pages), so there is no server to post
 * to — applications go to a third-party form backend instead. Set this at
 * build time to the endpoint URL your provider gives you (Formspree,
 * Formspark, Basin, and similar all accept a plain JSON POST of the fields).
 *
 * Left unset, the form is replaced by the direct-contact fallback rather than
 * rendering a submit button that silently drops every application.
 */
const APPLY_ENDPOINT = process.env.NEXT_PUBLIC_APPLY_ENDPOINT;

function isTeamId(value: string | null): value is TeamId {
  return !!value && (teamIds as readonly string[]).includes(value);
}

export function Apply({ teams }: { teams: JoinTeam[] }) {
  const params = useSearchParams();
  const initial = params.get("team");
  const [activeId, setActiveId] = useState<TeamId>(
    isTeamId(initial) ? initial : "ctf",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const active = teams.find((t) => t.id === activeId) ?? teams[0];
  const activeIndex =
    String(teams.findIndex((t) => t.id === activeId) + 1).padStart(2, "0");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!APPLY_ENDPOINT) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot, checked here because there is no longer a server to check it.
    // Bots fill every field they can see; report success so they get no signal.
    if (data.get("company")) {
      setStatus("done");
      form.reset();
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          surname: data.get("surname"),
          email: data.get("email"),
          studentNumber: data.get("studentNumber"),
          motivation: data.get("motivation"),
          team: activeId,
        }),
      });
      if (!response.ok) {
        setStatus("error");
        setError("We couldn't send that. Try again, or message us directly.");
        return;
      }
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Try again?");
    }
  }

  return (
    <section
      id="apply"
      className="relative overflow-hidden bg-blue-900 px-6 py-24 md:px-14"
    >
      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-14">
        <h2 className="font-display text-[clamp(40px,5.4vw,80px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-white">
          Choose where you&rsquo;d fit.
        </h2>

        {/* Team selector */}
        <div
          role="tablist"
          aria-label="Teams"
          className="flex flex-wrap gap-x-10 gap-y-2 border-b border-white/14"
        >
          {teams.map((team) => {
            const selected = team.id === activeId;
            return (
              <button
                key={team.id}
                role="tab"
                aria-selected={selected}
                type="button"
                onClick={() => {
                  setActiveId(team.id as TeamId);
                  setStatus("idle");
                }}
                className={`cursor-pointer border-b-2 py-4 font-display text-xl leading-none font-bold tracking-[-0.025em] transition-[color,border-color] duration-[160ms] ${
                  selected
                    ? "border-green-400 text-white"
                    : "border-transparent text-blue-300 hover:text-blue-100"
                }`}
              >
                {team.title}
              </button>
            );
          })}
        </div>

        <div className="relative grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-2 z-0 font-display text-[240px] leading-none font-extrabold tracking-[-0.04em] text-white/5"
          >
            {activeIndex}
          </span>

          {/* Team detail */}
          <div className="relative z-10 flex flex-col gap-7">
            <div className="flex flex-col gap-2.5">
              <h3 className="font-display text-[clamp(30px,3.2vw,42px)] leading-[1.05] font-bold tracking-[-0.03em] text-white">
                {active.title}
              </h3>
              <p className="max-w-[440px] font-serif text-[19px] leading-[1.5] font-medium text-blue-100 italic">
                {active.tagline}
              </p>
            </div>
            <ul className="flex flex-col border-t border-white/14">
              {active.benefits.map((benefit, i) => (
                <li
                  key={benefit}
                  className="flex items-baseline gap-5 border-b border-white/14 py-4"
                >
                  <span className="flex-none font-mono text-xs leading-none text-green-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-base leading-relaxed text-white">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="relative z-10 flex flex-col gap-5 pt-1.5">
            {status === "done" ? (
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-[22px] leading-tight font-bold text-white">
                  You&rsquo;re in the queue.
                </span>
                <span className="font-body text-[15px] leading-relaxed text-blue-200">
                  A team lead will reach out within a couple of days.
                </span>
              </div>
            ) : !APPLY_ENDPOINT ? (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-[22px] leading-tight font-bold text-white">
                    Come say hello.
                  </span>
                  <span className="font-body text-[15px] leading-relaxed text-blue-200">
                    Message us on Discord or WhatsApp, or email{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-white underline underline-offset-2"
                    >
                      {site.email}
                    </a>
                    . Tell us which team you&rsquo;re after.
                  </span>
                </div>
                <DirectContact label="Fastest ways to reach us:" />
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="apply-name" className="sr-only">
                      First name
                    </label>
                    <Input
                      id="apply-name"
                      name="name"
                      required
                      autoComplete="given-name"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-surname" className="sr-only">
                      Surname
                    </label>
                    <Input
                      id="apply-surname"
                      name="surname"
                      required
                      autoComplete="family-name"
                      placeholder="Surname"
                    />
                  </div>
                </div>
                <label htmlFor="apply-email" className="sr-only">
                  Student email
                </label>
                <Input
                  id="apply-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@student.maastrichtuniversity.nl"
                />
                <label htmlFor="apply-student-number" className="sr-only">
                  Student number
                </label>
                <Input
                  id="apply-student-number"
                  name="studentNumber"
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Student number"
                />
                <label htmlFor="apply-motivation" className="sr-only">
                  Why this team?
                </label>
                <Textarea
                  id="apply-motivation"
                  name="motivation"
                  rows={3}
                  placeholder="Why this team? (one or two sentences)"
                />
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending"
                    ? "Sending…"
                    : `Apply to ${active.title}`}
                </Button>
                {status === "error" && (
                  <p role="alert" className="font-body text-[13px] text-yellow-400">
                    {error}
                  </p>
                )}
                <DirectContact label="Prefer no forms? Say hi directly:" />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Discord / WhatsApp buttons, shown under the form and in its fallback. */
function DirectContact({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-body text-[13px] leading-snug text-blue-200">
        {label}
      </span>
      <div className="flex flex-wrap gap-2.5">
        <a
          href={site.social.discord}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-10 items-center gap-2 rounded-md bg-[#5865F2] px-4 transition-[filter] duration-[160ms] hover:brightness-110"
        >
          <DiscordIcon size={16} />
          <span className="font-display text-sm font-semibold text-white">
            Discord
          </span>
        </a>
        <a
          href={site.social.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-10 items-center gap-2 rounded-md bg-[#25D366] px-4 transition-[filter] duration-[160ms] hover:brightness-105"
        >
          <WhatsAppIcon size={15} />
          <span className="font-display text-sm font-semibold text-white">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
