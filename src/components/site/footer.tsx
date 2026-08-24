import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  {
    heading: "Navigate",
    links: [
      { href: "/about", label: "About us" },
      { href: "/team", label: "Our team" },
      { href: "/events", label: "Events" },
      { href: "/learn", label: "Learn" },
    ],
  },
  {
    heading: "Join a team",
    links: [
      { href: "/join?team=ctf", label: "CTF team" },
      { href: "/join?team=consultancy", label: "Consultancy" },
      { href: "/join?team=marketing", label: "Marketing" },
      { href: "/join?team=swe", label: "Software Development" },
    ],
  },
  {
    heading: "Find us",
    links: [
      { href: site.social.discord, label: "Discord", external: true },
      { href: site.social.whatsapp, label: "WhatsApp", external: true },
      { href: site.social.linkedin, label: "LinkedIn", external: true },
      { href: site.social.instagram, label: "Instagram", external: true },
      { href: site.social.github, label: "GitHub", external: true },
    ],
  },
];

const eyebrow =
  "font-mono text-[10.5px] leading-none font-medium tracking-[0.18em] text-gray-500 uppercase";
const footerLink =
  "font-body text-base leading-normal text-blue-100 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="flex flex-col gap-14 border-t border-white/10 bg-blue-900 px-6 pt-14 pb-8 md:px-14">
      <div className="grid items-start gap-12 md:grid-cols-[minmax(280px,1.1fr)_repeat(3,minmax(150px,1fr))]">
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-3.5">
            <Image
              src="/logo-mark-white.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-display text-2xl leading-none font-bold tracking-[-0.02em] text-white">
              MaaSec
            </span>
          </div>
          <p className="max-w-[300px] font-body text-[15px] leading-relaxed text-blue-200">
            Maastricht University&rsquo;s student cybersecurity organisation and
            ACM chapter.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3.5">
            <span className={eyebrow}>{column.heading}</span>
            {column.links.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={footerLink}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-blue-200/16 pt-10">
        <span className={`${eyebrow} !text-white`}>Work with us</span>
        <span className="max-w-[420px] font-body text-base leading-relaxed text-blue-200">
          Guest speaking, sponsorship, or a security review. Write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-white underline underline-offset-2"
          >
            {site.email}
          </a>
          .
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <span className="font-body text-[13px] leading-normal text-gray-500">
          © {new Date().getFullYear()} MaaSec · Maastricht University · ACM
          student chapter
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="font-body text-[13px] text-gray-500 hover:text-blue-100"
          >
            Privacy
          </Link>
          <Link
            href="/code-of-conduct"
            className="font-body text-[13px] text-gray-500 hover:text-blue-100"
          >
            Code of conduct
          </Link>
        </div>
      </div>
    </footer>
  );
}
