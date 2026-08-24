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

const TEAM_IDS = ["ctf", "consultancy", "marketing", "swe"] as const;
type TeamId = (typeof TEAM_IDS)[number];

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

    // One endpoint, two shapes: the join form (default) and the software
    // team's commission form ("kind": "commission"). Keeping them on the
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
