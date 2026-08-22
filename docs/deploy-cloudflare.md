# Deploying to Cloudflare Pages

The site has two pieces:

1. **The static site** (this repo, built with `npm run build`) — the maasec.com pages visitors see. No server, no database — content lives in [`content/`](../content) and is baked in at build time.
2. **The Join-form Worker** ([`worker/`](../worker)) — the one piece of backend the site has. It receives Join-form submissions and emails the board via Resend.

Both deploy to Cloudflare, both free at this scale.

## 0. What you need first

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free).
- The `maasec.com` domain registered at Namecheap (or wherever it currently lives).
- A [Resend](https://resend.com) account (free tier) — used to actually send the Join-form emails. You'll verify `maasec.com` as a sending domain there.

## 1. Point the domain at Cloudflare

1. Cloudflare dashboard → **Add a domain** → enter `maasec.com` → pick the **Free** plan.
2. Cloudflare scans existing DNS and shows you two nameservers (something like `aria.ns.cloudflare.com` / `walt.ns.cloudflare.com`).
3. In Namecheap: **Domain List** → `maasec.com` → **Manage** → **Nameservers** → **Custom DNS** → paste in Cloudflare's two nameservers → save.
4. Back in Cloudflare, click **Check nameservers** (or just wait — propagation is usually under an hour, sometimes up to 24h). Cloudflare emails you once it's active.

You can continue the rest of this guide while that propagates.

## 2. Deploy the static site to Cloudflare Pages

1. Push this repo to GitHub (if it isn't already).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. **Environment variables** (Settings → Environment variables, for the Production environment):
   - `NEXT_PUBLIC_SITE_URL` = `https://maasec.com`
   - `NEXT_PUBLIC_APPLY_ENDPOINT` = the Worker URL from step 3 below (you can leave this unset for the first deploy and add it once the Worker exists — the Join form just shows its direct-contact fallback until then)
5. **Save and Deploy**. First build takes a couple of minutes; Cloudflare gives you a `*.pages.dev` URL immediately to sanity-check before the custom domain is live.
6. Once it builds cleanly: **Custom domains** tab on the Pages project → **Set up a custom domain** → `maasec.com` (and `www.maasec.com` if you want that to work too — Cloudflare will offer to redirect it). This only works once the domain's nameservers point at Cloudflare (step 1).

Every push to your main branch redeploys automatically from here on — no manual upload step, unlike the old Namecheap/WordPress setup.

## 3. Deploy the Join-form Worker

This replaces the old "third-party form backend" approach — the Worker in `worker/` is first-party, sends mail via Resend, and includes its own rate-limiting/honeypot/CORS.

1. **Verify your sending domain in Resend**: Resend dashboard → **Domains** → **Add Domain** → `maasec.com` → add the DNS records it gives you (in Cloudflare's DNS tab, same place as any other DNS record) → wait for it to verify.
2. **Get a Resend API key**: Resend dashboard → **API Keys** → **Create API Key**.
3. From the `worker/` directory, log in and deploy:
   ```bash
   cd worker
   npx wrangler login
   npx wrangler deploy
   ```
4. Set the Resend key as a secret (never in `wrangler.jsonc`, which is committed):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   ```
   Paste the key from step 2 when prompted.
5. Check `worker/wrangler.jsonc` — `MAIL_FROM` and `MAIL_TO` should already be set to real `@maasec.com` addresses; `ALLOWED_ORIGINS` should include `https://maasec.com`. Redeploy (`npx wrangler deploy`) if you change any of these.
6. `wrangler deploy` prints the Worker's URL, something like `https://maasec-apply.<your-subdomain>.workers.dev`. Take that URL and set it as `NEXT_PUBLIC_APPLY_ENDPOINT` in the Pages project's environment variables (step 2.4 above), then trigger a redeploy of the Pages project (Cloudflare dashboard → the Pages project → **Deployments** → **Retry deployment**, or just push a commit).

Optional: **Custom domain for the Worker** — Workers & Pages → the Worker → **Settings** → **Domains & Routes** → add a route like `apply.maasec.com/*`, so the endpoint isn't a `workers.dev` URL. Not required, just tidier.

Optional: **Per-IP rate limiting** — the Worker already rate-limits if a KV namespace is bound:
```bash
cd worker
npx wrangler kv namespace create RATE_LIMIT
```
Take the `id` it prints and uncomment/fill in the `kv_namespaces` block at the bottom of `wrangler.jsonc`, then `npx wrangler deploy` again.

## 4. Post-launch checklist

- [ ] `https://maasec.com` loads over HTTPS with a valid padlock (Cloudflare issues this automatically — no manual SSL step needed, unlike shared hosting)
- [ ] `/team`, `/events`, `/learn` show the real content (check against `content/*.json`)
- [ ] Submit a real test application through `/join` and confirm the email arrives
- [ ] `NEXT_PUBLIC_APPLY_ENDPOINT` points at the deployed Worker, not empty
- [ ] `RESEND_API_KEY` is set as a Worker **secret**, not committed anywhere
- [ ] `/privacy` still matches reality (it already reflects the Resend-based flow — update it if that ever changes)
- [ ] Cloudflare dashboard → your domain → **SSL/TLS** → mode is "Full" or "Full (strict)"

## 5. Publishing new content later

Since `content/` is just JSON in this repo, publishing changes is: edit the file, commit, push. Cloudflare Pages rebuilds and deploys automatically — no rebuild-and-reupload step, no CMS login required.
