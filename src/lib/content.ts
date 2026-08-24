import ctfData from "../../content/ctf.json";
import ctftimeData from "../../content/ctftime.json";
import eventsData from "../../content/events.json";
import joinTeamsData from "../../content/join-teams.json";
import speakersData from "../../content/speakers.json";
import teamData from "../../content/team.json";
import writeupsData from "../../content/writeups.json";

/**
 * All content lives in the `content/` directory as JSON, imported directly
 * so it's baked into the static export at build time. Edit those files and
 * rebuild for changes to go live.
 */

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#8217;|&#8216;/g, "’")
    .replace(/&#8220;|&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
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

type RawEvent = {
  slug: string;
  title: string;
  content: string | null;
  eventDate: string | null;
  eventTime: string | null;
  location: string | null;
  category: string | null;
  status: string | null;
  result: string | null;
  signupUrl: string | null;
};

export async function getEvents(): Promise<EventEntry[]> {
  return (eventsData as RawEvent[])
    .map((n) => ({
      slug: n.slug,
      title: n.title,
      date: new Date(n.eventDate ?? "").toISOString(),
      time: n.eventTime ?? "",
      location: n.location ?? "",
      category: (n.category ?? "Lab") as EventCategory,
      status: (n.status || undefined) as EventStatus | undefined,
      result: n.result || undefined,
      signupUrl: n.signupUrl || undefined,
      body: stripHtml(n.content ?? ""),
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Events dated today or later, soonest first. */
export async function getUpcomingEvents(now = new Date()): Promise<EventEntry[]> {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const events = await getEvents();
  return events
    .filter((e) => +new Date(e.date) >= +start)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

/** Events before today, most recent first. */
export async function getPastEvents(now = new Date()): Promise<EventEntry[]> {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const events = await getEvents();
  return events.filter((e) => +new Date(e.date) < +start);
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

type RawWriteup = {
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  writeupDate: string | null;
  author: string | null;
  team: string | null;
  tags: string | null;
  category: string | null;
};

export async function getLearnEntries(): Promise<LearnEntry[]> {
  return (writeupsData as RawWriteup[])
    .map((n) => ({
      slug: n.slug,
      title: n.title,
      date: new Date(n.writeupDate ?? "").toISOString(),
      author: n.author || "MaaSec",
      team: n.team || undefined,
      tags: (n.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt: stripHtml(n.excerpt ?? ""),
      category: (n.category || "Writeup") as LearnCategory,
      body: (n.content ?? "").trim(),
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getLearnEntry(slug: string): Promise<LearnEntry | undefined> {
  const entries = await getLearnEntries();
  return entries.find((w) => w.slug === slug);
}

// --- Team & teams ---------------------------------------------------------

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
  /** Member count shown next to the section heading. Derived from
   * `members.length` when the group lists named members; otherwise read
   * from the group's own `memberCount` field (role-only groups have no
   * named members to count). Omitted entirely when neither is set. */
  memberCount?: number;
};

export type JoinTeam = {
  id: string;
  title: string;
  tagline: string;
  benefits: string[];
  /** False when the team isn't currently recruiting — the Join form shows a
   * "not accepting applications" message instead of the form for it. */
  open: boolean;
};

type RawTeamGroup = {
  title: string;
  eyebrow: string | null;
  groupId: string | null;
  blurb: string | null;
  surface: string | null;
  roles: string | null;
  memberCount?: number | null;
  order: number;
};

type RawTeamMember = {
  title: string;
  role: string | null;
  groupId: string | null;
  order: number;
  photo?: string;
};

export async function getTeamGroups(): Promise<TeamGroup[]> {
  const groups = teamData.groups as RawTeamGroup[];
  const members = [...(teamData.members as RawTeamMember[])].sort(
    (a, b) => a.order - b.order,
  );

  return [...groups]
    .sort((a, b) => a.order - b.order)
    .map((g) => {
      const id = g.groupId ?? "";
      const groupMembers = members
        .filter((m) => m.groupId === id)
        .map((m) => ({
          name: m.title,
          role: m.role ?? "",
          photo: m.photo,
        }));
      const roles = (g.roles ?? "")
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);

      return {
        id,
        eyebrow: g.eyebrow ?? "",
        title: g.title,
        blurb: g.blurb ?? "",
        surface: (g.surface ?? "white") as "white" | "blue",
        members: groupMembers.length ? groupMembers : undefined,
        roles: roles.length ? roles : undefined,
        // An explicit total (e.g. CTF's real headcount vs. its short list of
        // named members) always wins; otherwise fall back to counting the
        // named members actually listed.
        memberCount: g.memberCount ?? (groupMembers.length || undefined),
      };
    });
}

type RawJoinTeam = {
  title: string;
  teamId: string | null;
  tagline: string | null;
  benefits: string | null;
  open?: boolean;
  order: number;
};

export async function getJoinTeams(): Promise<JoinTeam[]> {
  return [...(joinTeamsData as RawJoinTeam[])]
    .sort((a, b) => a.order - b.order)
    .map((t) => ({
      id: t.teamId ?? "",
      title: t.title,
      tagline: t.tagline ?? "",
      benefits: (t.benefits ?? "")
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
      open: t.open ?? true,
    }));
}

// --- CTF team -------------------------------------------------------------

export type CtfSeason = {
  year: number;
  /** Null while a season is still being played. CTFtime's API reports a
   *  `country_place` for the running year that does not match its own
   *  published country scoreboard, so an unfinished season carries no
   *  placement here and the site never states one. */
  countryPlace: number | null;
  globalPlace: number | null;
  points: number | null;
  inProgress: boolean;
};

export type CtfCategory = { name: string; short: string; gloss: string };

/** One competition's published result. Unlike a season standing, an
 *  individual event's placement is final the moment the event ends — so
 *  these are shown regardless of which year they fall in. */
export type CtfResult = {
  event: string;
  year: number;
  place: number;
  totalTeams: number;
  topPercent: number;
  points: number;
};

export type CtfRecord = {
  profileUrl: string;
  /** Most recent season first. */
  seasons: CtfSeason[];
  /** The most recent season with a published placement — the only figure
   *  the site quotes. Never an in-progress season. */
  confirmed: CtfSeason & { countryPlace: number };
  /** Every synced competition result, most recent first. */
  results: CtfResult[];
  writeups: {
    url: string;
    /** How many competition folders the repo actually holds. */
    count: number;
    lastPushedAt: string;
    /** Competitions still present in the repo, curated in content/ctf.json
     *  but filtered against the synced folder list, so the page can never
     *  name — or link to — a competition that has been removed. `folder`
     *  is the exact path segment under the repo's tree, for linking straight
     *  into that competition's directory rather than just the repo root. */
    named: { name: string; folder: string }[];
  };
  syncedAt: string;
};

export async function getCtfRecord(): Promise<CtfRecord> {
  const seasons = [...ctftimeData.seasons].sort(
    (a, b) => b.year - a.year,
  ) as CtfSeason[];

  const present = new Set(ctftimeData.writeups.competitions);
  const named = ctfData.marqueeCompetitions
    .filter((c) => present.has(c.folder))
    .map((c) => ({ name: c.name, folder: c.folder }));

  const confirmed = seasons.find(
    (s): s is CtfSeason & { countryPlace: number } => s.countryPlace !== null,
  );
  if (!confirmed) {
    throw new Error("content/ctftime.json has no completed-season placement");
  }

  return {
    profileUrl: ctftimeData.team.url,
    seasons,
    confirmed,
    results: ctftimeData.results as CtfResult[],
    writeups: {
      url: ctftimeData.writeups.url,
      count: ctftimeData.writeups.competitions.length,
      lastPushedAt: ctftimeData.writeups.lastPushedAt,
      named,
    },
    syncedAt: ctftimeData.syncedAt,
  };
}

export async function getCtfCategories(): Promise<CtfCategory[]> {
  return [...ctfData.categories]
    .sort((a, b) => a.order - b.order)
    .map(({ name, short, gloss }) => ({ name, short, gloss }));
}

/** Headcount for the CTF squad, read from the same place /team reads it. */
export async function getCtfMemberCount(): Promise<number | undefined> {
  const groups = await getTeamGroups();
  return groups.find((g) => g.id === "ctf")?.memberCount;
}

type RawSpeaker = { title: string; order: number };

/** Guest-speaker company names — the "hosted industry experts from" list. */
export async function getSpeakers(): Promise<string[]> {
  return [...(speakersData as RawSpeaker[])]
    .sort((a, b) => a.order - b.order)
    .map((s) => s.title);
}
