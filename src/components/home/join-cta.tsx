import { DiscordIcon, WhatsAppIcon } from "@/components/icons/brand";
import { site } from "@/lib/site";

/** The dark "Join our team" call to action with Discord / WhatsApp buttons. */
export function JoinCta() {
  return (
    <section className="flex flex-col items-center gap-7 bg-blue-900 px-6 pt-22 pb-16 text-center md:px-14">
      <h2
        data-reveal
        className="font-display text-[clamp(30px,4.6vw,64px)] leading-[1.15] font-bold tracking-[-0.035em] text-white"
      >
        <span className="whitespace-nowrap">Join our team.</span>
        <br />
        <span className="whitespace-nowrap">Learn from professionals.</span>
      </h2>
      <p
        data-reveal
        style={{ ["--reveal-delay" as string]: "120ms" }}
        className="max-w-[480px] font-body text-base leading-relaxed text-blue-100"
      >
        Weekly meetups, a well-established cybersecurity presence, and an
        ever-growing community.
      </p>
      <div
        data-reveal
        style={{ ["--reveal-delay" as string]: "160ms" }}
        className="mt-2 flex flex-wrap justify-center gap-3.5"
      >
        <a
          href={site.social.discord}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-12 items-center gap-2.5 rounded-md bg-[#5865F2] px-6.5 transition-[filter] duration-[160ms] hover:brightness-110"
        >
          <DiscordIcon />
          <span className="font-display text-[15px] font-semibold text-white">
            Join Discord
          </span>
        </a>
        <a
          href={site.social.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-12 items-center gap-2.5 rounded-md bg-[#25D366] px-6.5 transition-[filter] duration-[160ms] hover:brightness-105"
        >
          <WhatsAppIcon />
          <span className="font-display text-[15px] font-semibold text-white">
            Join WhatsApp
          </span>
        </a>
      </div>
      <a
        href={`mailto:${site.email}`}
        data-reveal
        style={{ ["--reveal-delay" as string]: "200ms" }}
        className="font-mono text-sm leading-none text-blue-100 hover:text-white"
      >
        {site.email}
      </a>
    </section>
  );
}
