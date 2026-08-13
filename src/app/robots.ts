import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required by `output: "export"` — without it the build fails, since Next
// otherwise treats this route as server-rendered on demand.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
