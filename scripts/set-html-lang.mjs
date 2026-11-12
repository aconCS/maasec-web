// Runs after `next build`. The site is a static export with one root layout,
// which always renders <html lang="en">. Pages whose route ends in /nl, and
// the student pages under /join/studenten, are Dutch, so rewrite their exported HTML to lang="nl" — what screen readers,
// browsers' translate prompts and search engines read before any script runs.
// src/components/site/html-lang.tsx keeps the attribute in sync after
// client-side navigation.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

let changed = 0;
for await (const file of htmlFiles(OUT)) {
  // out/grants/ai-pentest/nl.html, or out/…/nl/index.html with trailing slashes.
  const isDutch =
    /[\\/]nl(\.html|[\\/]index\.html)$/.test(file) ||
    /[\\/]join[\\/]studenten(\.html|[\\/].*\.html)$/.test(file);
  if (!isDutch) continue;

  const html = await readFile(file, "utf8");
  const updated = html.replace(/<html lang="en"/, '<html lang="nl"');
  if (updated === html) {
    throw new Error(`${file}: no <html lang="en"> to rewrite`);
  }
  await writeFile(file, updated);
  changed += 1;
}

if (changed === 0) throw new Error("set-html-lang: no Dutch pages found in out/");
console.log(`set-html-lang: set lang="nl" on ${changed} page(s)`);
