"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

// Same Worker as the join form (see components/join/apply.tsx) — one POST
// endpoint, dispatched by the "kind" field in the body. No server on a
// static export, so the fallback below is what a reader sees until this is
// configured at build time.
const APPLY_ENDPOINT = process.env.NEXT_PUBLIC_APPLY_ENDPOINT;

export function CommissionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!APPLY_ENDPOINT) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — see apply.tsx for why this is checked client-side.
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
          kind: "commission",
          organisation: data.get("organisation"),
          contactName: data.get("contactName"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!response.ok) {
        setStatus("error");
        setError("We couldn't send that. Try again, or email us directly.");
        return;
      }
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Try again?");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-[22px] leading-tight font-bold text-blue-900">
          Got it.
        </span>
        <span className="font-body text-[15px] leading-relaxed text-gray-700">
          We&rsquo;ll reply from a real person, not a form receipt — usually
          within a few days.
        </span>
      </div>
    );
  }

  if (!APPLY_ENDPOINT) {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-body text-[15px] leading-relaxed text-gray-700">
          Tell us about the project at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
          >
            {site.email}
          </a>
          .
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="commission-org" className="sr-only">
            Organisation
          </label>
          <Input
            id="commission-org"
            name="organisation"
            required
            autoComplete="organization"
            placeholder="Organisation"
          />
        </div>
        <div>
          <label htmlFor="commission-name" className="sr-only">
            Your name
          </label>
          <Input
            id="commission-name"
            name="contactName"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
      </div>
      <label htmlFor="commission-email" className="sr-only">
        Email
      </label>
      <Input
        id="commission-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@organisation.com"
      />
      <label htmlFor="commission-message" className="sr-only">
        Project brief
      </label>
      <Textarea
        id="commission-message"
        name="message"
        rows={4}
        required
        placeholder="What are you looking to build?"
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
        {status === "sending" ? "Sending…" : "Send project inquiry"}
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
  );
}
