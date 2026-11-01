import type { MetadataRoute } from "next";
import { guides } from "@/components/ww/guides";
import { wwPaths } from "@/components/ww/paths";
import { getLearnEntries } from "@/lib/content";
import { site } from "@/lib/site";

// Required by `output: "export"` — see the note in robots.ts.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/team",
    "/ctf",
    "/software",
    "/projects",
    "/hiring",
    "/events",
    "/learn",
    "/join",
    "/grants/ai-pentest/nl",
    "/grants/ai-pentest/en",
    wwPaths.pentest,
    wwPaths.checklist,
    ...guides.map((guide) => wwPaths.guide(guide.slug)),
    "/privacy",
    "/code-of-conduct",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const learnEntries = await getLearnEntries();
  const entries = learnEntries.map((entry) => ({
    url: `${site.url}/learn/${entry.slug}`,
    lastModified: new Date(entry.date),
  }));

  return [...routes, ...entries];
}
