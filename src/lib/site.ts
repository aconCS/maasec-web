/**
 * Single place for the handful of values that appear across every page.
 * Anything editable by the board without a code change belongs in /content
 * instead — this is only for structural/site-wide constants.
 */
export const site = {
  name: "MaaSec",
  tagline: "Free cybersecurity for those who can't afford it.",
  description:
    "MaaSec is a non-profit association that protects small businesses, non-profits and community organisations in the Maastricht and Heuvelland region with free security assessments, advice and awareness training.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maasec.com",
  email: "acm@maasec.com",
  social: {
    discord: "https://discord.gg/VpsVY8bDpu",
    whatsapp: "https://chat.whatsapp.com/BTT4rA347J301PrYCBe9A6",
    linkedin: "https://www.linkedin.com/company/maasec/",
    instagram: "https://www.instagram.com/maasec.acm/",
    github: "https://github.com/MaaSecLab",
  },
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/ctf", label: "CTF" },
  { href: "/software", label: "Software" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/learn", label: "Learn" },
] as const;

/** The teams a member can apply to. Keep ids in sync with content/teams. */
export const teamIds = ["ctf", "consultancy", "marketing", "swe", "events"] as const;
export type TeamId = (typeof teamIds)[number];

/** Everything a candidate can apply to through the recruitment form: the
 * teams above plus the project programs in content/hiring.json. Keep in sync
 * with HIRING_PROGRAMS in worker/src/index.ts. */
export const hiringProgramIds = [...teamIds, "nightjar", "collab"] as const;
export type HiringProgramId = (typeof hiringProgramIds)[number];
