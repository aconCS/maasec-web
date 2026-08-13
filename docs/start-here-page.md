# Implementation brief: "Start here" page

## Why this page exists

MaaSec's own mission pillar #1 (`src/app/about/page.tsx`, `mission` array) is
"Lower the barrier to entry" — but today there's no page that actually serves
someone with zero cybersecurity background. `/writeups` assumes existing
skill, and `/join` is a conversion form, not an onboarding resource. This
page fills that gap: a beginner's landing spot that says "you don't know
anything yet, here's exactly where to start."

Comparable orgs (HackTheBox Academy, OWASP) separate this from their
blog/writeups content for the same reason — "I'm new" and "show me the
technical work" are different visitor intents.

## Scope

- New route: `/start-here` (or `/learn` — pick whichever reads better; both
  are used by comparable sites. Do not use `/resources`, it undersells the
  beginner-onboarding intent).
- Add it to the primary nav (`src/lib/site.ts` → `navLinks`,
  `src/components/site/nav.tsx`) and to the footer "Navigate" column
  (`src/components/site/footer.tsx`).
- Do NOT remove or rename any existing nav item — this is additive.

## Content outline (sections, in order)

1. **Hero** — short, direct headline speaking to someone with zero
   experience. Reuse the hero pattern from `src/app/about/page.tsx` (`<h1>`
   + supporting `<p>`), not the landing page's giant display type — this
   page should feel calmer/more instructional than the marketing pages.
2. **"What is a CTF?" / core concepts** — 3-4 short explainer cards (what's a
   CTF, what's a flag, what's a lab night, what's bug bounty). Reuse the
   3-card grid pattern from the "Our mission" section
   (`src/app/about/page.tsx`) — icon + title + body — sourced from
   `lucide-react` per this project's existing convention (see
   `BicepsFlexed`/`Construction`/`Users` usage in that file).
3. **Your first steps** — a short numbered checklist (e.g. "Come to a lab",
   "Try your first flag", "Join Discord and ask questions"). Reuse the
   numbered-step pattern from `src/app/join/page.tsx` (`process` array +
   its rendering), which already does exactly this kind of "3 numbered
   steps" layout.
4. **Learning resources** — curated external links (learning platforms,
   beginner CTF sites, etc.).
   **IMPORTANT: do not invent specific resource names/URLs.** Before writing
   this section, ask the user which resources they actually want to
   recommend (this is exactly the kind of unverifiable-fact risk flagged
   earlier in this project's history — do not fabricate endorsements or
   external links on the user's behalf).
5. **CTA band** — reuse the existing `<JoinCta />` component
   (`src/components/home/join-cta.tsx`) at the bottom, same as every other
   top-level page in this app.

## Data model

Keep content inline as typed consts in `page.tsx` (matching the pattern in
`src/app/about/page.tsx`'s `mission`/`members` arrays and
`src/app/join/page.tsx`'s `process` array) unless the "Learning resources"
list grows long enough to warrant its own `content/start-here-resources.json`
consumed via a new `getStartHereResources()` in `src/lib/content.ts` — follow
the existing `getTeamGroups()`/`getJoinTeams()` pattern in that file if so.

## Conventions to follow (already established in this codebase)

- Page shell: `<Nav /><main>...sections...</main><JoinCta /><Footer />`,
  exactly like every other top-level page (see `src/app/about/page.tsx`).
- Section padding: `px-6 md:px-14` horizontal on every section (this was
  explicitly normalized across the landing page earlier in this project —
  match it here too), with per-section vertical padding as needed.
- Card corner radius: `rounded-[10px]` (not `18px` — the whole site was
  moved to less rounding on images/cards; check current `ImageSlot` default
  in `src/components/ui/image-slot.tsx` before hardcoding a value).
- Icons: `lucide-react`, sized/colored via `className` (e.g.
  `"h-7 w-7 text-blue-900"`), matching `src/app/about/page.tsx`. Do not
  hand-draw new SVG icon paths — this project moved away from that after
  hand-drawn icons broke.
- `data-reveal` attribute on scroll-in elements (the site-wide
  `Reveal` component in `src/components/site/reveal.tsx` handles the
  IntersectionObserver-driven fade-in automatically — no per-page wiring
  needed beyond adding the attribute).
- `export const metadata: Metadata = {...}` with a real `title`/`description`
  for SEO, matching every other page.
- Add the new route to `src/app/sitemap.ts`'s static routes list.

## Acceptance criteria

- `npx tsc --noEmit`, `npx eslint .`, and `npx next build` all pass clean.
- New page reachable from primary nav and footer.
- Page follows the section order above and reuses existing components/
  patterns rather than introducing new one-off styling.
- No fabricated external resource links/names — confirmed with the user
  first.
