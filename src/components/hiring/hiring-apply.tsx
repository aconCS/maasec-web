"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import type { HiringProgram } from "@/lib/content";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

// Same Worker as the join and commission forms — dispatched by "kind".
const APPLY_ENDPOINT = process.env.NEXT_PUBLIC_APPLY_ENDPOINT;

const affiliations = [
  { id: "um-student", label: "Maastricht University student" },
  { id: "other-student", label: "Student elsewhere" },
  { id: "industry", label: "Working in industry" },
  { id: "other", label: "Other" },
] as const;

const hours = ["Under 5", "5–10", "10–20", "20+"] as const;

const selectClass =
  "h-12 w-full rounded-sm border border-gray-300 bg-white px-4 font-body text-[15px] text-blue-900 transition-[border-color,box-shadow] duration-[180ms] focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-600/35";

const labelClass = "font-body text-[13px] font-medium text-blue-900";

export function HiringApply({ programs }: { programs: HiringProgram[] }) {
  const params = useSearchParams();
  const requested = params.get("program");
  const [activeId, setActiveId] = useState(
    programs.some((p) => p.id === requested) ? requested! : programs[0]?.id,
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [affiliation, setAffiliation] = useState("");

  const active = programs.find((p) => p.id === activeId) ?? programs[0];
  if (!active) return null;
  const openRoles = active.roles.filter((r) => r.open);
  const accepting = active.open && openRoles.length > 0;

  function select(id: string) {
    setActiveId(id);
    setStatus("idle");
    setError("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!APPLY_ENDPOINT || !accepting) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — see components/join/apply.tsx.
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
          kind: "hiring",
          program: active.id,
          role: data.get("role"),
          name: data.get("name"),
          surname: data.get("surname"),
          email: data.get("email"),
          affiliation: data.get("affiliation"),
          studentNumber: data.get("studentNumber") ?? "",
          links: data.get("links"),
          hours: data.get("hours"),
          motivation: data.get("motivation"),
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setStatus("error");
        setError(
          body?.error ??
            `The application didn't go through. Try again, or email ${site.email}.`,
        );
        return;
      }
      setStatus("done");
      form.reset();
      setAffiliation("");
    } catch {
      setStatus("error");
      setError("You appear to be offline. Check your connection and try again.");
    }
  }

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
          {/* Program detail */}
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

          {/* Form panel */}
          <div className="rounded-[var(--radius-card)] bg-blue-100 p-6 sm:p-8 lg:sticky lg:top-28">
            {status === "done" ? (
              <div className="flex flex-col gap-2" role="status">
                <span className="font-display text-[22px] leading-tight font-bold text-blue-900">
                  Application sent.
                </span>
                <span className="font-body text-[15px] leading-relaxed text-gray-700">
                  The {active.title} leads read every application and reply by
                  email, usually within a week.
                </span>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 w-fit font-body text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
                >
                  Send another application
                </button>
              </div>
            ) : !accepting ? (
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
            ) : !APPLY_ENDPOINT ? (
              <div className="flex flex-col gap-2">
                <span className="font-display text-[22px] leading-tight font-bold text-blue-900">
                  Apply by email
                </span>
                <span className="font-body text-[15px] leading-relaxed text-gray-700">
                  Send your name, the role you want, and links to your work to{" "}
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`${active.title} application`)}`}
                    className="font-semibold text-blue-700 underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                  .
                </span>
              </div>
            ) : (
              <form
                key={active.id}
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
              >
                <h3 className="font-display text-[22px] leading-tight font-bold text-blue-900">
                  Apply to {active.title}
                </h3>

                <fieldset className="flex flex-col gap-2">
                  <legend className={`${labelClass} mb-2`}>Role</legend>
                  {openRoles.map((role, i) => (
                    <label
                      key={role.id}
                      className="flex cursor-pointer items-center gap-3 rounded-sm border border-gray-300 bg-white px-4 py-3 font-body text-[15px] text-blue-900 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-blue-600/35"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        required
                        defaultChecked={i === 0 && openRoles.length === 1}
                        className="accent-blue-600"
                      />
                      {role.title}
                    </label>
                  ))}
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-name" className={labelClass}>
                      First name
                    </label>
                    <Input id="hire-name" name="name" required autoComplete="given-name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-surname" className={labelClass}>
                      Surname
                    </label>
                    <Input id="hire-surname" name="surname" required autoComplete="family-name" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hire-email" className={labelClass}>
                    Email
                  </label>
                  <Input id="hire-email" name="email" type="email" required autoComplete="email" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-affiliation" className={labelClass}>
                      You are
                    </label>
                    <select
                      id="hire-affiliation"
                      name="affiliation"
                      required
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {affiliations.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-hours" className={labelClass}>
                      Hours per week
                    </label>
                    <select
                      id="hire-hours"
                      name="hours"
                      required
                      defaultValue=""
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {hours.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {affiliation === "um-student" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hire-student-number" className={labelClass}>
                      Student number
                    </label>
                    <Input
                      id="hire-student-number"
                      name="studentNumber"
                      required
                      inputMode="numeric"
                      autoComplete="off"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hire-links" className={labelClass}>
                    GitHub, portfolio, or CTFtime profile
                  </label>
                  <Input
                    id="hire-links"
                    name="links"
                    placeholder="https://github.com/you"
                    autoComplete="url"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hire-motivation" className={labelClass}>
                    What would you work on, and what have you done that&rsquo;s
                    close to it?
                  </label>
                  <Textarea id="hire-motivation" name="motivation" rows={5} required />
                </div>

                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "Sending application…" : "Send application"}
                </Button>
                {status === "error" && (
                  <p
                    role="alert"
                    className="font-body text-[13px] text-[var(--color-danger)]"
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
