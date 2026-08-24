/**
 * Syncs the CTF team's public record into content/ctftime.json.
 *
 * Run by .github/workflows/sync-ctftime.yml on a schedule. The site is a
 * static export, so there is no server to query CTFtime at request time —
 * the data has to be fetched ahead of the build and committed.
 *
 * Three things worth knowing before editing:
 *
 *  1. CTFtime returns 403 to requests without a browser-like User-Agent.
 *     The header below is load-bearing, not decoration.
 *  2. The season standings (country/global place) come from the official
 *     JSON API. Per-event results (place, total teams, points) have no API
 *     — CTFtime only exposes them on the team's HTML page and each event's
 *     own HTML page — so those are scraped. Both sources are narrow,
 *     line-anchored regexes rather than an HTML parser dependency; a
 *     CTFtime markup change breaks the scrape loudly (the script throws)
 *     rather than silently returning zero results.
 *  3. The script writes nothing unless every fetch succeeded. A CTFtime
 *     outage must leave the last known-good file in place rather than
 *     blanking the standings on the live site.
 */

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "content", "ctftime.json");

const TEAM_ID = 365940;
const WRITEUPS_REPO = "MaaSecLab/CTF-Writeups";

/**
 * Years the team was genuinely competing. CTFtime carries a country place
 * for this account back to 2012, but those earlier placements predate the
 * current organisation — showing them would claim a history that isn't
 * ours. Extend this list only for years MaaSec actually played.
 */
const ACTIVE_YEARS = [2025, 2026];

const UA =
  "Mozilla/5.0 (compatible; MaaSecBot/1.0; +https://maasec.com) sync-ctftime";

async function getJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json", ...headers },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

async function getHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.text();
}

/**
 * Every row in the team page's rating tables looks like:
 *   <tr><td class="place_ico"></td><td class="place">15</td>
 *       <td><a href="/event/3209">THEM?!CTF 2026</a></td>
 *       <td>8056.0000</td><td>13.394</td></tr>
 * — one row per event played, across every year's table on the page.
 */
const ROW_RE =
  /<tr><td class="place_ico"><\/td><td class="place">(\d+)<\/td><td><a href="\/event\/(\d+)">([^<]+)<\/a><\/td><td>([\d.]+)<\/td><td>([\d.]+)<\/td><\/tr>/g;

/** An event's own page states its field size as e.g. "865 teams total". */
const TOTAL_RE = /(\d+)\s+teams total/;

async function getEventResults() {
  const html = await getHtml(`https://ctftime.org/team/${TEAM_ID}`);
  const rows = [...html.matchAll(ROW_RE)].map((m) => {
    const [, place, eventId, label, ctfPoints] = m;
    const year = label.match(/\b(\d{4})\b$/)?.[1];
    if (!year) {
      throw new Error(`Couldn't read a year off of event label "${label}"`);
    }
    return {
      place: Number(place),
      eventId: Number(eventId),
      name: label.slice(0, -year.length).trim(),
      year: Number(year),
      points: Number(ctfPoints),
    };
  });

  if (!rows.length) {
    throw new Error("Found no event rows on the team page — markup may have changed");
  }

  // Sequential, not Promise.all: this is a weekly cron job, not a hot path,
  // and there's no reason to hit CTFtime with a burst of ~13 concurrent
  // requests when one at a time costs a few extra seconds.
  const results = [];
  for (const row of rows) {
    const eventHtml = await getHtml(`https://ctftime.org/event/${row.eventId}`);
    const total = eventHtml.match(TOTAL_RE)?.[1];
    if (!total) {
      throw new Error(`Couldn't find team total on event ${row.eventId} (${row.name})`);
    }
    const totalTeams = Number(total);
    results.push({
      event: row.name,
      year: row.year,
      place: row.place,
      totalTeams,
      topPercent: Math.round((row.place / totalTeams) * 1000) / 10,
      points: Math.round(row.points),
    });
  }

  return results.sort((a, b) => b.year - a.year || a.place - b.place);
}

/** Repo entries that aren't competitions. */
const NOT_A_COMPETITION = new Set([".github", "assets", "images", "templates"]);

async function main() {
  const thisYear = new Date().getFullYear();

  // --- CTFtime standings ------------------------------------------------
  const team = await getJson(`https://ctftime.org/api/v1/teams/${TEAM_ID}/`);

  const seasons = ACTIVE_YEARS.map((year) => {
    const r = team.rating?.[String(year)] ?? {};
    const inProgress = year >= thisYear;

    // The API carries a `country_place` for the running year, but it does
    // NOT agree with CTFtime's published country scoreboard: in 2026 the
    // API reported country_place 1 while the public NL board listed only
    // one team and did not include MaaSec at all, and the team's own
    // CTFtime page headlined the 2025 figure instead. An unfinished
    // season's placement is therefore treated as unpublished rather than
    // quoted — only completed seasons carry a placement the site states.
    if (inProgress) {
      return { year, countryPlace: null, globalPlace: null, points: null, inProgress: true };
    }

    if (typeof r.country_place !== "number") return null;
    return {
      year,
      countryPlace: r.country_place,
      globalPlace: typeof r.rating_place === "number" ? r.rating_place : null,
      points:
        typeof r.rating_points === "number"
          ? Math.round(r.rating_points * 1000) / 1000
          : null,
      inProgress: false,
    };
  })
    .filter(Boolean)
    .sort((a, b) => b.year - a.year);

  if (!seasons.some((s) => s.countryPlace !== null)) {
    throw new Error(
      `No completed-season placement found in active years ${ACTIVE_YEARS.join(", ")}`,
    );
  }

  // --- Per-event results -------------------------------------------------
  const results = await getEventResults();

  // --- Writeups repository ---------------------------------------------
  const [repo, contents] = await Promise.all([
    getJson(`https://api.github.com/repos/${WRITEUPS_REPO}`),
    getJson(`https://api.github.com/repos/${WRITEUPS_REPO}/contents/`),
  ]);

  const competitions = contents
    .filter((e) => e.type === "dir" && !NOT_A_COMPETITION.has(e.name))
    .map((e) => e.name)
    .sort();

  const data = {
    // Regenerated file — edit scripts/sync-ctftime.mjs, not this output.
    syncedAt: new Date().toISOString(),
    team: {
      id: TEAM_ID,
      name: team.primary_alias ?? team.name,
      country: team.country ?? "NL",
      academic: team.academic === true,
      university: team.university ?? null,
      url: `https://ctftime.org/team/${TEAM_ID}`,
    },
    seasons,
    results,
    writeups: {
      repo: WRITEUPS_REPO,
      url: repo.html_url,
      lastPushedAt: repo.pushed_at,
      stars: repo.stargazers_count,
      competitions,
    },
  };

  // Only rewrite when something actually changed, so the scheduled run
  // doesn't produce an empty commit every week.
  const next = JSON.stringify(data, null, 2) + "\n";
  let prev = null;
  try {
    prev = await readFile(OUT, "utf8");
  } catch {
    /* first run */
  }

  if (prev && stripTimestamp(prev) === stripTimestamp(next)) {
    console.log("No change — leaving content/ctftime.json alone.");
    return;
  }

  await writeFile(OUT, next, "utf8");
  console.log(
    `Wrote ${OUT}\n  seasons: ${seasons
      .map((s) => `${s.year}=${s.countryPlace}${s.inProgress ? "*" : ""}`)
      .join(", ")}\n  results: ${results.length} events\n  competitions: ${competitions.length}`,
  );
}

/** syncedAt changes every run; ignore it when deciding whether to commit. */
function stripTimestamp(json) {
  return json.replace(/"syncedAt": "[^"]*",?\n/, "");
}

main().catch((err) => {
  console.error(`sync-ctftime failed: ${err.message}`);
  console.error("Leaving the existing content/ctftime.json untouched.");
  process.exit(1);
});
