"use client";

import Link from "next/link";
import { useState } from "react";
import { readTracking } from "@/components/pentest/request-form";
import {
  affiliationIds,
  hourValues,
  studentCopy,
  studentPaths,
  type StudentLang,
  type StudentTeamId,
} from "@/components/students/copy";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";

type Status = "idle" | "sending" | "done" | "error";

// Same Worker request as the team form on /join (HiringApply): "kind":
// "hiring" with the team as the program and its single "member" role, so
// applications reach the board exactly as before. Ad attribution, the page
// and the language travel with it for the leads Sheet.
const APPLY_ENDPOINT = process.env.NEXT_PUBLIC_APPLY_ENDPOINT;

const selectClass =
  "h-12 w-full rounded-sm border border-gray-300 bg-white px-4 font-body text-[15px] text-blue-900 transition-[border-color,box-shadow] duration-[180ms] focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-600/35";

const labelClass = "font-body text-[13px] font-medium text-blue-900";

/**
 * Application form for /join/students and /join/studenten. On success it
 * does a full page load to the matching thanks page, which Google Ads counts
 * as a conversion; honeypot hits get an inline message instead.
 */
export function VolunteerForm({
  lang,
  teams,
}: {
  lang: StudentLang;
  /** Teams currently accepting applications, in display order. */
  teams: StudentTeamId[];
}) {
  const copy = studentCopy[lang];
  const t = copy.form;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [affiliation, setAffiliation] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!APPLY_ENDPOINT) return;

    const form = event.currentTarget;
    const data = new FormData(form);

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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kind: "hiring",
          program: data.get("team"),
          role: "member",
          name: data.get("name"),
          surname: data.get("surname"),
          email: data.get("email"),
          affiliation: data.get("affiliation"),
          studentNumber: data.get("studentNumber") ?? "",
          links: data.get("links"),
          hours: data.get("hours"),
          motivation: data.get("motivation"),
          lead_type: "volunteer",
          lang,
          source_page: window.location.pathname,
          tracking: readTracking(),
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setError(body?.error ?? t.sendError);
        return;
      }
      window.location.assign(studentPaths.thanks[lang]);
    } catch {
      setStatus("error");
      setError(t.networkError);
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col gap-2" role="status">
        <span className="font-display text-[22px] leading-tight font-bold text-blue-900">
          {t.doneTitle}
        </span>
        <span className="font-body text-[15px] leading-relaxed text-gray-700">{t.doneBody}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="vol-team" className={labelClass}>
          {t.team}
        </label>
        <select id="vol-team" name="team" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            {t.chooseTeam}
          </option>
          {teams.map((id) => (
            <option key={id} value={id}>
              {copy.roles.teams[id].title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vol-name" className={labelClass}>
            {t.firstName}
          </label>
          <Input id="vol-name" name="name" required autoComplete="given-name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vol-surname" className={labelClass}>
            {t.surname}
          </label>
          <Input id="vol-surname" name="surname" required autoComplete="family-name" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="vol-email" className={labelClass}>
          {t.email}
        </label>
        <Input id="vol-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vol-affiliation" className={labelClass}>
            {t.affiliation}
          </label>
          <select
            id="vol-affiliation"
            name="affiliation"
            required
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>
              {t.choose}
            </option>
            {affiliationIds.map((id) => (
              <option key={id} value={id}>
                {t.affiliations[id]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vol-hours" className={labelClass}>
            {t.hours}
          </label>
          <select id="vol-hours" name="hours" required defaultValue="" className={selectClass}>
            <option value="" disabled>
              {t.choose}
            </option>
            {hourValues.map((h) => (
              <option key={h} value={h}>
                {t.hourLabels[h]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {affiliation === "um-student" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vol-student-number" className={labelClass}>
            {t.studentNumber}
          </label>
          <Input
            id="vol-student-number"
            name="studentNumber"
            required
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="vol-links" className={labelClass}>
          {t.links}
        </label>
        <Input id="vol-links" name="links" placeholder="https://github.com/you" autoComplete="url" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="vol-motivation" className={labelClass}>
          {t.motivation}
        </label>
        <Textarea id="vol-motivation" name="motivation" rows={4} required />
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
        {status === "sending" ? t.sending : t.submit}
      </Button>

      {status === "error" && (
        <p role="alert" className="font-body text-[13px] text-[var(--color-danger)]">
          {error}
        </p>
      )}

      <p className="font-body text-[12.5px] leading-relaxed text-gray-600">
        {t.privacyNote}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-blue-800">
          {t.privacyLink}
        </Link>
        .
      </p>
    </form>
  );
}
