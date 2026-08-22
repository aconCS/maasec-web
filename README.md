MaaSec's website — Maastricht University's student cybersecurity organisation. Next.js App Router, static export, deployed on Cloudflare Pages.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content management

Team, events, and writeups are plain JSON files in [`content/`](content/), imported directly by [`src/lib/content.ts`](src/lib/content.ts) at build time. Edit a file there and rebuild — there is no CMS or database.

## The Join form

The site is a static export with no server, so applications submitted via [`src/components/join/apply.tsx`](src/components/join/apply.tsx) POST to a small Cloudflare Worker in [`worker/`](worker/), which emails the board through Resend. See [`docs/deploy-cloudflare.md`](docs/deploy-cloudflare.md) for deploying it.

## Deployment

See [`docs/deploy-cloudflare.md`](docs/deploy-cloudflare.md) for the full Cloudflare Pages + Namecheap domain walkthrough.
