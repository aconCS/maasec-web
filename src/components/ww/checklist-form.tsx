"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { readTracking } from "@/components/pentest/request-form";
import { wwPaths } from "@/components/ww/paths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

// Same Worker as every other form, dispatched by "kind": "checklist". The
// Worker emails the subscriber a link to the checklist and logs the signup.
const APPLY_ENDPOINT = process.env.NEXT_PUBLIC_APPLY_ENDPOINT;

const labelClass = "font-body text-[13px] font-medium text-blue-900";

/**
 * Signup for the free security checklist — the conversion on every guide
 * page. Appears more than once per page, so every id comes from useId.
 * The tips newsletter is a separate, unticked checkbox; the checklist is
 * sent either way.
 */
export function ChecklistForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!APPLY_ENDPOINT) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots get an inline confirmation, never the thanks page.
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
          kind: "checklist",
          lead_type: "checklist",
          lang: "ww",
          source_page: window.location.pathname,
          email: data.get("email"),
          name: data.get("name"),
          organisation: data.get("organisation"),
          location: data.get("location"),
          newsletter: data.get("newsletter") === "on",
          tracking: readTracking(),
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setStatus("error");
        setError(body?.error ?? "We couldn't send that. Try again in a moment.");
        return;
      }
      // Full page load: Google Ads counts a visit to the thanks page.
      window.location.assign(wwPaths.checklistThanks);
    } catch {
      setStatus("error");
      setError("Network error. Try again?");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="font-body text-[15px] leading-relaxed text-gray-700">
        Thanks. Check your inbox for the checklist.
      </p>
    );
  }

  if (!APPLY_ENDPOINT) {
    return (
      <p className="font-body text-[15px] leading-relaxed text-gray-700">
        Email{" "}
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent("Security checklist")}`}
          className="font-semibold text-blue-700 underline underline-offset-4"
        >
          {site.email}
        </a>{" "}
        and we&rsquo;ll send you the checklist.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-email`} className={labelClass}>
          Email
        </label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.org"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-name`} className={labelClass}>
            First name <span className="text-gray-600">(optional)</span>
          </label>
          <Input id={`${id}-name`} name="name" autoComplete="given-name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-org`} className={labelClass}>
            Organisation <span className="text-gray-600">(optional)</span>
          </label>
          <Input id={`${id}-org`} name="organisation" autoComplete="organization" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-country`} className={labelClass}>
            Country <span className="text-gray-600">(optional)</span>
          </label>
          <Input id={`${id}-country`} name="location" autoComplete="country-name" />
        </div>
      </div>

      <label
        htmlFor={`${id}-newsletter`}
        className="flex cursor-pointer items-start gap-3 font-body text-[14px] leading-snug text-gray-700"
      >
        <input
          id={`${id}-newsletter`}
          name="newsletter"
          type="checkbox"
          className="mt-0.5 h-[18px] w-[18px] flex-none accent-blue-600"
        />
        <span>
          Also send me MaaSec&rsquo;s monthly security tips. You can unsubscribe
          at any time.
        </span>
      </label>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send me the free checklist"}
      </Button>

      {status === "error" && (
        <p role="alert" className="font-body text-[13px] text-[var(--color-danger)]">
          {error}
        </p>
      )}

      <p className="font-body text-[12.5px] leading-relaxed text-gray-600">
        We email you a link to the checklist. No spam, and we never share your
        address. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-blue-800">
          privacy page
        </Link>
        .
      </p>
    </form>
  );
}
