import type { MetadataRoute } from "next";
import { getLearnEntries } from "@/lib/content";
import { site } from "@/lib/site";

// Required by `output: "export"` — see the note in robots.ts.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/team",
    "/events",
    "/learn",
    "/join",
    "/privacy",
    "/code-of-conduct",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const entries = getLearnEntries().map((entry) => ({
    url: `${site.url}/learn/${entry.slug}`,
    lastModified: new Date(entry.date),
  }));

  return [...routes, ...entries];
}
