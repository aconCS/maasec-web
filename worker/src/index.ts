/**
 * MaaSec application form backend.
 *
 * The website is a static export on GitHub Pages, which cannot run server
 * code, so this Worker is the one piece of backend the site has. It receives
 * the join form, validates it, and emails the board via Resend.
 *
 * Deploy from the `worker/` directory:
 *   npx wrangler deploy
 *   npx wrangler secret put RESEND_API_KEY
 */

type Env = {
  /** Comma-separated list of origins allowed to POST here. */
  ALLOWED_ORIGINS: string;
  /** Verified Resend sender, e.g. "MaaSec <noreply@maasec.com>". */
  MAIL_FROM: string;
  /** Where applications land. */
  MAIL_TO: string;
  /** Where AI pentest requests land; falls back to MAIL_TO. */
  PENTEST_MAIL_TO?: string;
  /** Resend API key — set via `wrangler secret put`, never in wrangler.jsonc. */
  RESEND_API_KEY?: string;
  /**
   * Optional KV namespace; when bound, enables per-IP rate limiting. Typed
   * structurally so this Worker needs no Cloudflare types package.
   */
  RATE_LIMIT?: {
    get(key: string): Promise<string | null>;
    put(
      key: string,
      value: string,
      options?: { expirationTtl?: number },
    ): Promise<void>;
  };
};

const TEAM_IDS = ["ctf", "consultancy", "marketing", "swe", "events"] as const;
type TeamId = (typeof TEAM_IDS)[number];

/** Keep in sync with hiringProgramIds in src/lib/site.ts. */
const HIRING_PROGRAMS = [...TEAM_IDS, "nightjar", "collab"] as const;
type HiringProgramId = (typeof HIRING_PROGRAMS)[number];

const AFFILIATIONS = ["um-student", "other-student", "industry", "other"] as const;

/** Keep in sync with orgTypes in src/components/pentest/request-form.tsx. */
const PENTEST_ORG_TYPES = ["small-business", "non-profit", "community", "other"] as const;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60;

function allowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

/**
 * CORS is the actual access control here: without it, anyone could point a
 * script at this endpoint and burn the Resend quota. Only echo back an
 * origin we explicitly allow — never a wildcard.
 */
function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  if (!allowedOrigins(env).includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(
  body: unknown,
  status: number,
  cors: Record<string, string>,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors, ...extra },
  });
}

type Application = {
  name: string;
  surname: string;
  email: string;
  studentNumber: string;
  team: TeamId;
  motivation: string;
};

type Commission = {
  organisation: string;
  contactName: string;
  email: string;
  message: string;
};

type HiringApplication = {
  program: HiringProgramId;
  role: string;
  name: string;
  surname: string;
  email: string;
  affiliation: string;
  studentNumber: string;
  links: string;
  hours: string;
  motivation: string;
};

type PentestRequest = {
  lang: "nl" | "en";
  name: string;
  email: string;
  organisation: string;
  orgType: string;
  website: string;
  location: string;
  message: string;
  tracking: Record<string, string>;
};

/**
 * Hand-rolled rather than pulled from a schema library: a handful of fields
 * do not justify a dependency in a Worker bundle, and the rules are the same
 * ones the old Next route enforced.
 */
function parseApplication(input: unknown): Application | string {
  if (typeof input !== "object" || input === null) return "Invalid request.";
  const data = input as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(data.name);
  if (name.length < 1 || name.length > 120) return "Tell us your name.";

  const surname = str(data.surname);
  if (surname.length < 1 || surname.length > 120) return "Tell us your surname.";

  const email = str(data.email);
  // Deliberately loose: the real check is whether the reply lands.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return "That email looks off.";
  }

  const studentNumber = str(data.studentNumber);
  if (studentNumber.length < 1 || studentNumber.length > 32) {
    return "Tell us your student number.";
  }

  const team = str(data.team);
  if (!(TEAM_IDS as readonly string[]).includes(team)) {
    return "Pick a team.";
  }

  const motivation = str(data.motivation).slice(0, 1000);

  return { name, surname, email, studentNumber, team: team as TeamId, motivation };
}

function parseCommission(input: unknown): Commission | string {
  if (typeof input !== "object" || input === null) return "Invalid request.";
  const data = input as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const organisation = str(data.organisation);
  if (organisation.length < 1 || organisation.length > 160) {
    return "Tell us the organisation.";
  }

  const contactName = str(data.contactName);
  if (contactName.length < 1 || contactName.length > 120) {
    return "Tell us your name.";
  }

  const email = str(data.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return "That email looks off.";
  }

  const message = str(data.message).slice(0, 2000);
  if (message.length < 1) return "Tell us what you're looking to build.";

  return { organisation, contactName, email, message };
}

function parseHiring(input: unknown): HiringApplication | string {
  if (typeof input !== "object" || input === null) return "Invalid request.";
  const data = input as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const program = str(data.program);
  if (!(HIRING_PROGRAMS as readonly string[]).includes(program)) {
    return "Pick a program.";
  }

  // Role ids live in content/hiring.json and change without a Worker
  // deploy, so only their shape is checked here.
  const role = str(data.role);
  if (!/^[a-z0-9-]{1,40}$/.test(role)) return "Pick a role.";

  const name = str(data.name);
  if (name.length < 1 || name.length > 120) return "Enter your first name.";

  const surname = str(data.surname);
  if (surname.length < 1 || surname.length > 120) return "Enter your surname.";

  const email = str(data.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return "Enter a valid email address.";
  }

  const affiliation = str(data.affiliation);
  if (!(AFFILIATIONS as readonly string[]).includes(affiliation)) {
    return "Tell us whether you're a student or working.";
  }

  const studentNumber = str(data.studentNumber).slice(0, 32);
  if (affiliation === "um-student" && studentNumber.length < 1) {
    return "Enter your student number.";
  }

  const links = str(data.links).slice(0, 500);
  const hours = str(data.hours).slice(0, 20);
  if (hours.length < 1) return "Tell us how many hours a week you have.";

  const motivation = str(data.motivation).slice(0, 3000);
  if (motivation.length < 1) return "Tell us what you'd work on.";

  return {
    program: program as HiringProgramId,
    role,
    name,
    surname,
    email,
    affiliation,
    studentNumber,
    links,
    hours,
    motivation,
  };
}

type PentestLang = "nl" | "en";

/** Validation messages for the pentest form, in the language of the page. */
const PENTEST_MESSAGES: Record<PentestLang, Record<string, string>> = {
  en: {
    invalid: "Invalid request.",
    name: "Tell us your name.",
    email: "Enter a valid email address.",
    organisation: "Tell us your organisation's name.",
    orgType: "Pick the type of organisation.",
    website: "Enter your website address, for example www.example.nl.",
    location: "Tell us your city or town.",
    authorised: "Confirm you're allowed to request a test of this website.",
    sendFailed: "We couldn't send that right now. Try again shortly.",
  },
  nl: {
    invalid: "Ongeldige aanvraag.",
    name: "Vul je naam in.",
    email: "Vul een geldig e-mailadres in.",
    organisation: "Vul de naam van je organisatie in.",
    orgType: "Kies het soort organisatie.",
    website: "Vul het adres van je website in, bijvoorbeeld www.voorbeeld.nl.",
    location: "Vul je plaats in.",
    authorised: "Bevestig dat je een test van deze website mag aanvragen.",
    sendFailed: "We konden dit nu niet versturen. Probeer het zo opnieuw.",
  },
};

function pentestLang(input: unknown): PentestLang {
  const lang = (input as Record<string, unknown> | null)?.lang;
  return lang === "nl" ? "nl" : "en";
}

/** URL parameters the landing page forwards for ad attribution. */
const TRACKING_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function parseTracking(input: unknown): Record<string, string> {
  if (typeof input !== "object" || input === null) return {};
  const data = input as Record<string, unknown>;
  const tracking: Record<string, string> = {};
  for (const key of TRACKING_KEYS) {
    const value = data[key];
    if (typeof value !== "string") continue;
    // Printable characters only, so nothing odd ends up in the email.
    const clean = value.replace(/[^\x20-\x7E -￿]/g, "").trim().slice(0, 512);
    if (clean) tracking[key] = clean;
  }
  return tracking;
}

/**
 * Lead form on /grants/ai-pentest/{nl,en}. The authorisation box must be
 * ticked: we only ever test a site its owner has asked us to, and the signed
 * scope agreement that follows is the real permission.
 */
function parsePentest(input: unknown, lang: PentestLang): PentestRequest | string {
  const m = PENTEST_MESSAGES[lang];
  if (typeof input !== "object" || input === null) return m.invalid;
  const data = input as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(data.name);
  if (name.length < 1 || name.length > 120) return m.name;

  const email = str(data.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return m.email;
  }

  const organisation = str(data.organisation);
  if (organisation.length < 1 || organisation.length > 160) {
    return m.organisation;
  }

  const orgType = str(data.orgType);
  if (!(PENTEST_ORG_TYPES as readonly string[]).includes(orgType)) {
    return m.orgType;
  }

  // A domain with an optional scheme and path. Loose on purpose: the
  // volunteer confirms the exact scope with the owner before anything runs.
  const website = str(data.website);
  if (
    website.length > 200 ||
    !/^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(:\d+)?(\/\S*)?$/i.test(website)
  ) {
    return m.website;
  }

  const location = str(data.location);
  if (location.length < 1 || location.length > 120) {
    return m.location;
  }

  if (data.authorised !== true) {
    return m.authorised;
  }

  const message = str(data.message).slice(0, 2000);
  const tracking = parseTracking(data.tracking);

  return {
    lang,
    name,
    email,
    organisation,
    orgType,
    website,
    location,
    message,
    tracking,
  };
}

/** Fixed-window per-IP limit. No-op unless a KV namespace is bound. */
async function overRateLimit(ip: string, env: Env): Promise<boolean> {
  if (!env.RATE_LIMIT) return false;
  const key = `apply:${ip}`;
  const current = Number((await env.RATE_LIMIT.get(key)) ?? "0");
  if (current >= RATE_LIMIT_MAX) return true;
  await env.RATE_LIMIT.put(key, String(current + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return false;
}

async function sendMail(app: Application, env: Env): Promise<boolean> {
  // No key configured (e.g. a scratch deploy): log and report success so the
  // form can be exercised without credentials.
  if (!env.RESEND_API_KEY) {
    console.info("[apply] RESEND_API_KEY unset — would have sent:", app);
    return true;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      subject: `New MaaSec application — ${app.team}`,
      reply_to: app.email,
      text: [
        `Team:            ${app.team}`,
        `Name:            ${app.name} ${app.surname}`,
        `Email:           ${app.email}`,
        `Student number:  ${app.studentNumber}`,
        "",
        "Motivation:",
        app.motivation || "(none provided)",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[apply] Resend error", response.status, await response.text());
    return false;
  }
  return true;
}

async function sendCommissionMail(commission: Commission, env: Env): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    console.info("[commission] RESEND_API_KEY unset — would have sent:", commission);
    return true;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      subject: `New project inquiry — ${commission.organisation}`,
      reply_to: commission.email,
      text: [
        `Organisation:  ${commission.organisation}`,
        `Contact:       ${commission.contactName}`,
        `Email:         ${commission.email}`,
        "",
        "Message:",
        commission.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[commission] Resend error", response.status, await response.text());
    return false;
  }
  return true;
}

async function sendHiringMail(app: HiringApplication, env: Env): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    console.info("[hiring] RESEND_API_KEY unset — would have sent:", app);
    return true;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      // Prefixed so the board can filter each program into its own label.
      subject: `[Hiring: ${app.program}] ${app.role} — ${app.name} ${app.surname}`,
      reply_to: app.email,
      text: [
        `Program:         ${app.program}`,
        `Role:            ${app.role}`,
        `Name:            ${app.name} ${app.surname}`,
        `Email:           ${app.email}`,
        `Affiliation:     ${app.affiliation}`,
        `Student number:  ${app.studentNumber || "(n/a)"}`,
        `Hours per week:  ${app.hours}`,
        `Links:           ${app.links || "(none)"}`,
        "",
        "Motivation:",
        app.motivation,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[hiring] Resend error", response.status, await response.text());
    return false;
  }
  return true;
}

/** Google Ads offline-conversion time format: "yyyy-mm-dd hh:mm:ss+00:00". */
function adsConversionTime(date: Date): string {
  return `${date.toISOString().slice(0, 19).replace("T", " ")}+00:00`;
}

async function sendPentestMail(lead: PentestRequest, env: Env): Promise<boolean> {
  const receivedAt = new Date();
  const { gclid, gbraid, wbraid } = lead.tracking;
  const clickId = gclid ?? gbraid ?? wbraid;
  const clickIdName = gclid ? "gclid" : gbraid ? "gbraid" : wbraid ? "wbraid" : "";
  const utm = Object.entries(lead.tracking).filter(([key]) => key.startsWith("utm_"));

  const text = [
    `Organisation:  ${lead.organisation} (${lead.orgType})`,
    `Website:       ${lead.website}`,
    `Location:      ${lead.location}`,
    `Contact:       ${lead.name}`,
    `Email:         ${lead.email}`,
    `Language:      ${lead.lang}`,
    `Received:      ${receivedAt.toISOString()}`,
    "",
    "Message:",
    lead.message || "(none provided)",
    "",
    "Source:",
    ...(utm.length > 0
      ? utm.map(([key, value]) => `  ${key.padEnd(13)} ${value}`)
      : ["  (no utm tags)"]),
    ...(clickId
      ? [
          "",
          "Google Ads conversion (upload under Goals > Conversions > Uploads):",
          `  ${clickIdName}:${" ".repeat(Math.max(1, 14 - clickIdName.length))}${clickId}`,
          `  Conversion time: ${adsConversionTime(receivedAt)}`,
        ]
      : ["", "Google Ads: no ad click ID (not from an ad, or auto-tagging off)."]),
    "",
    "The requester confirmed they're authorised to request this test.",
    "Do not start testing until the scope agreement is signed and you've",
    "confirmed the organisation controls the website.",
  ].join("\n");

  if (!env.RESEND_API_KEY) {
    console.info("[pentest] RESEND_API_KEY unset — would have sent:\n" + text);
    return true;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: env.PENTEST_MAIL_TO || env.MAIL_TO,
      // Prefixed so requests can be filtered into their own label.
      subject: `[Pentest request] ${lead.organisation} — ${lead.website}`,
      reply_to: lead.email,
      text,
    }),
  });

  if (!response.ok) {
    console.error("[pentest] Resend error", response.status, await response.text());
    return false;
  }
  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, cors);
    }
    // An unrecognised Origin gets no CORS headers, so the browser would block
    // the response anyway — reject outright rather than doing the work.
    if (Object.keys(cors).length === 0) {
      return json({ error: "Not allowed." }, 403, {});
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (await overRateLimit(ip, env)) {
      return json({ error: "Too many attempts. Give it a minute." }, 429, cors, {
        "Retry-After": String(RATE_LIMIT_WINDOW_SECONDS),
      });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400, cors);
    }

    // Honeypot: hidden from people, irresistible to bots. Report success so
    // they get no signal that the submission was dropped.
    const honeypot = (body as Record<string, unknown> | null)?.company;
    if (typeof honeypot === "string" && honeypot.length > 0) {
      return json({ ok: true }, 200, cors);
    }

    // One endpoint, several shapes: the join form (default), the software
    // team's commission form ("kind": "commission"), project hiring on
    // /hiring ("kind": "hiring"), and pentest requests from
    // /grants/ai-pentest ("kind": "pentest"). Keeping them on the
    // same Worker avoids a second URL, secret, and deploy for one more
    // form with an identical trust boundary.
    const kind = (body as Record<string, unknown> | null)?.kind;
    if (kind === "commission") {
      const parsed = parseCommission(body);
      if (typeof parsed === "string") {
        return json({ error: parsed }, 400, cors);
      }
      const sent = await sendCommissionMail(parsed, env);
      if (!sent) {
        return json(
          { error: "We couldn't send that right now. Try again shortly." },
          502,
          cors,
        );
      }
      return json({ ok: true }, 200, cors);
    }

    if (kind === "pentest") {
      const lang = pentestLang(body);
      const parsed = parsePentest(body, lang);
      if (typeof parsed === "string") {
        return json({ error: parsed }, 400, cors);
      }
      const sent = await sendPentestMail(parsed, env);
      if (!sent) {
        return json({ error: PENTEST_MESSAGES[lang].sendFailed }, 502, cors);
      }
      return json({ ok: true }, 200, cors);
    }

    if (kind === "hiring") {
      const parsed = parseHiring(body);
      if (typeof parsed === "string") {
        return json({ error: parsed }, 400, cors);
      }
      const sent = await sendHiringMail(parsed, env);
      if (!sent) {
        return json(
          { error: "We couldn't send that right now. Try again shortly." },
          502,
          cors,
        );
      }
      return json({ ok: true }, 200, cors);
    }

    const parsed = parseApplication(body);
    if (typeof parsed === "string") {
      return json({ error: parsed }, 400, cors);
    }

    const sent = await sendMail(parsed, env);
    if (!sent) {
      return json(
        { error: "We couldn't send that right now. Try again shortly." },
        502,
        cors,
      );
    }

    return json({ ok: true }, 200, cors);
  },
};
