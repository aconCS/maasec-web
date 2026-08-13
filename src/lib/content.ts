import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readDir(sub: string): { slug: string; file: string; raw: string }[] {
  const dir = path.join(CONTENT_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((file) => ({
      slug: file.replace(/\.(md|mdx)$/, ""),
      file,
      raw: fs.readFileSync(path.join(dir, file), "utf8"),
    }));
}

// --- Events -------------------------------------------------------------

export type EventCategory =
  | "CTF"
  | "Bug Bounty"
  | "Lab"
  | "Workshop"
  | "Community";
export type EventStatus = "open" | "limited" | "closed";

export type EventMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  time: string;
  location: string;
  category: EventCategory;
  status?: EventStatus;
  result?: string;
  signupUrl?: string;
};

export type EventEntry = EventMeta & { body: string };

function parseEvent(slug: string, raw: string): EventEntry {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title),
    date: new Date(data.date).toISOString(),
    time: String(data.time ?? ""),
    location: String(data.location ?? ""),
    category: data.category as EventCategory,
    status: data.status as EventStatus | undefined,
    result: data.result ? String(data.result) : undefined,
    signupUrl: data.signupUrl ? String(data.signupUrl) : undefined,
    body: content.trim(),
  };
}

export function getEvents(): EventEntry[] {
  return readDir("events")
    .map(({ slug, raw }) => parseEvent(slug, raw))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Events dated today or later, soonest first. */
export function getUpcomingEvents(now = new Date()): EventEntry[] {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  return getEvents()
    .filter((e) => +new Date(e.date) >= +start)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

/** Events before today, most recent first. */
export function getPastEvents(now = new Date()): EventEntry[] {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  return getEvents().filter((e) => +new Date(e.date) < +start);
}

// --- Learn (resources, guides, writeups, blogs) --------------------------

export type LearnCategory = "Resource" | "Guide" | "Writeup" | "Blog";

export type LearnMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  team?: string;
  tags: string[];
  excerpt: string;
  category: LearnCategory;
};

export type LearnEntry = LearnMeta & { body: string };

function parseLearnEntry(slug: string, raw: string): LearnEntry {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title),
    date: new Date(data.date).toISOString(),
    author: String(data.author ?? "MaaSec"),
    team: data.team ? String(data.team) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ""),
    category: (data.category as LearnCategory) ?? "Writeup",
    body: content.trim(),
  };
}

export function getLearnEntries(): LearnEntry[] {
  return readDir("learn")
    .map(({ slug, raw }) => parseLearnEntry(slug, raw))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getLearnEntry(slug: string): LearnEntry | undefined {
  return getLearnEntries().find((w) => w.slug === slug);
}

// --- Team & teams (JSON) ------------------------------------------------

export type Member = { name: string; role: string; photo?: string };

/**
 * A group lists either named `members` (with photos) or, where we don't
 * publish individuals, just the `roles` the team covers. Exactly one of the
 * two is set per group.
 */
export type TeamGroup = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  surface: "white" | "blue";
  members?: Member[];
  roles?: string[];
};

export type JoinTeam = {
  id: string;
  title: string;
  tagline: string;
  benefits: string[];
};

function readJson<T>(file: string): T {
  return JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"),
  ) as T;
}

export function getTeamGroups(): TeamGroup[] {
  return readJson<TeamGroup[]>("team.json");
}

export function getJoinTeams(): JoinTeam[] {
  return readJson<JoinTeam[]>("teams.json");
}

/** Guest-speaker company names — the "hosted industry experts from" list. */
export function getSpeakers(): string[] {
  return readJson<string[]>("speakers.json");
}
