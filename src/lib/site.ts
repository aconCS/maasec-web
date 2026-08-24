/**
 * Single place for the handful of values that appear across every page.
 * Anything editable by the board without a code change belongs in /content
 * instead — this is only for structural/site-wide constants.
 */
export const site = {
  name: "MaaSec",
  tagline: "Break things. And then learn to defend them.",
  description:
    "Maastricht University's student cybersecurity organisation and ACM chapter. Weekly hands-on labs, an international CTF team, bug bounty hunting, and supervised security consultancy.",
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
  { href: "/events", label: "Events" },
  { href: "/learn", label: "Learn" },
] as const;

/** The teams a member can apply to. Keep ids in sync with content/teams. */
export const teamIds = ["ctf", "consultancy", "marketing", "swe"] as const;
export type TeamId = (typeof teamIds)[number];
