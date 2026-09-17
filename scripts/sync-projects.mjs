/**
 * Syncs every public repository in the MaaSecLab GitHub organisation into
 * content/projects.json.
 *
 * Run by .github/workflows/sync-projects.yml on a schedule (and by hand with
 * `node scripts/sync-projects.mjs`). Same rules as sync-ctftime.mjs:
 *
 *  1. The site is a static export, so repo data is fetched ahead of the
 *     build and committed — nothing queries GitHub at request time.
 *  2. This file is machine-owned. Editorial copy (titles, summaries,
 *     categories, what to hide) lives in content/project-overrides.json,
 *     which this script never touches. A new repo in the org therefore shows
 *     up on /projects automatically, under "Other", until someone curates it.
 *  3. Nothing is written unless the fetch succeeded, and an unchanged result
 *     leaves the file alone so the scheduled run makes no empty commits.
 *
 * Only public repositories are listed — deliberately. Private work stays off
 * the public site even if the token could see it.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "content", "projects.json");

const ORG = "MaaSecLab";
const UA = "Mozilla/5.0 (compatible; MaaSecBot/1.0; +https://maasec.com) sync-projects";

async function getJson(url) {
  const headers = {
    "User-Agent": UA,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

async function listRepos() {
  const repos = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await getJson(
      `https://api.github.com/orgs/${ORG}/repos?type=public&per_page=100&page=${page}`,
    );
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function main() {
  const raw = await listRepos();
  if (!raw.length) {
    throw new Error(`GitHub returned no public repositories for ${ORG}`);
  }

  const repos = raw
    .filter((r) => !r.private)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description ?? "",
      homepage: r.homepage || null,
      language: r.language ?? null,
      topics: r.topics ?? [],
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      license: r.license?.name ?? null,
      fork: r.fork === true,
      archived: r.archived === true,
      pushedAt: r.pushed_at,
    }))
    .sort((a, b) => +new Date(b.pushedAt) - +new Date(a.pushedAt));

  const data = {
    // Regenerated file — edit scripts/sync-projects.mjs or
    // content/project-overrides.json, not this output.
    syncedAt: new Date().toISOString(),
    org: ORG,
    orgUrl: `https://github.com/${ORG}`,
    repos,
  };

  const next = JSON.stringify(data, null, 2) + "\n";
  let prev = null;
  try {
    prev = await readFile(OUT, "utf8");
  } catch {
    /* first run */
  }

  if (prev && stripTimestamp(prev) === stripTimestamp(next)) {
    console.log("No change — leaving content/projects.json alone.");
    return;
  }

  await writeFile(OUT, next, "utf8");
  console.log(`Wrote ${OUT}\n  repos: ${repos.map((r) => r.name).join(", ")}`);
}

/** syncedAt changes every run; ignore it when deciding whether to commit. */
function stripTimestamp(json) {
  return json.replace(/"syncedAt": "[^"]*",?\n/, "");
}

main().catch((err) => {
  console.error(`sync-projects failed: ${err.message}`);
  console.error("Leaving the existing content/projects.json untouched.");
  process.exit(1);
});
