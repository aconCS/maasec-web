import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/button";
import { ChecklistBox } from "@/components/ww/checklist-box";
import { wwPaths } from "@/components/ww/paths";

/**
 * One block of guide content. Text supports [links](/path), **bold**,
 * *italic* and `code`.
 */
export type GuideBlock =
  | { p: string }
  | { steps: string[] }
  | { list: string[] }
  | { note: string }
  | { example: { label: string; lines: string[] } };

export type GuideSection = { heading: string; blocks: GuideBlock[] };

export type Guide = {
  slug: string;
  /** The page's H1. */
  title: string;
  /** <title>, containing the main keyword. */
  metaTitle: string;
  /** Meta description, containing the main keyword. */
  description: string;
  intro: string[];
  sections: GuideSection[];
  /** Overrides the default "free AI pentest" call to action. */
  pentestCta?: { title: string; body: string; button: string };
  related: string[];
};

export const GUIDE_UPDATED = "1 November 2026";

/** Renders **bold**, *italic*, `code` and [text](href) inside a string. */
function rich(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i} className="font-semibold text-blue-900">{bold[1]}</strong>;
    const italic = part.match(/^\*([^*]+)\*$/);
    if (italic) return <em key={i}>{italic[1]}</em>;
    const code = part.match(/^`([^`]+)`$/);
    if (code)
      return (
        <code key={i} className="rounded-sm bg-gray-100 px-1.5 py-0.5 font-mono text-[0.88em] text-blue-900">
          {code[1]}
        </code>
      );
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className =
        "font-medium text-blue-700 underline underline-offset-[3px] hover:text-blue-900";
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      );
    }
    return part;
  });
}

function Block({ block }: { block: GuideBlock }) {
  const body = "font-body text-[17px] leading-[1.7] text-gray-800";
  if ("p" in block) return <p className={body}>{rich(block.p)}</p>;
  if ("steps" in block)
    return (
      <ol className="flex flex-col gap-3">
        {block.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-[3px] flex h-7 w-7 flex-none items-center justify-center rounded-full bg-blue-600 font-display text-[13px] font-bold text-white">
              {i + 1}
            </span>
            <span className={body}>{rich(step)}</span>
          </li>
        ))}
      </ol>
    );
  if ("list" in block)
    return (
      <ul className="flex flex-col gap-2.5 pl-1">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-blue-600" />
            <span className={body}>{rich(item)}</span>
          </li>
        ))}
      </ul>
    );
  if ("note" in block)
    return (
      <p className="rounded-card border-l-4 border-blue-600 bg-blue-50 px-5 py-4 font-body text-[16px] leading-[1.65] text-gray-800">
        {rich(block.note)}
      </p>
    );
  return (
    <figure className="flex flex-col gap-2 rounded-card border border-dashed border-gray-400 bg-gray-100 p-5">
      <figcaption className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-gray-600 uppercase">
        {block.example.label}
      </figcaption>
      <div className="flex flex-col gap-1 font-mono text-[14px] leading-relaxed break-words text-gray-800">
        {block.example.lines.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
    </figure>
  );
}

function Section({ section }: { section: GuideSection }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-[clamp(24px,2.6vw,30px)] leading-[1.2] font-bold tracking-[-0.02em] text-blue-900 text-balance">
        {section.heading}
      </h2>
      {section.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </section>
  );
}

/**
 * Layout for the worldwide guide pages. Each guide answers the searches in
 * its H2s, carries the checklist signup (the conversion) after the first
 * section and at the end, and points organisations to the free AI pentest.
 */
export function GuidePage({ guide, related }: { guide: Guide; related: Guide[] }) {
  const [first, ...rest] = guide.sections;
  const cta = guide.pentestCta ?? {
    title: "Run an organisation?",
    body: "Get a free AI pentest of your website. Our volunteer cybersecurity specialists check every finding and send you a plain-language report on what to fix first.",
    button: "Get a free AI pentest",
  };

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="px-6 pt-28 pb-20 md:px-14">
        <article className="mx-auto flex max-w-[760px] flex-col gap-10">
          <header className="flex flex-col gap-5">
            <span className="font-mono text-[11px] leading-none font-medium tracking-[0.16em] text-blue-600 uppercase">
              Free guide
            </span>
            <h1 className="font-display text-[clamp(36px,5vw,56px)] leading-[1.05] font-extrabold tracking-[-0.04em] text-blue-900 text-balance">
              {guide.title}
            </h1>
            {guide.intro.map((paragraph, i) => (
              <p key={i} className="font-body text-[19px] leading-[1.65] text-gray-700">
                {rich(paragraph)}
              </p>
            ))}
            <p className="font-body text-[13.5px] text-gray-600">
              Written and reviewed by MaaSec volunteers · Last updated {GUIDE_UPDATED}
            </p>
          </header>

          {first && <Section section={first} />}

          <ChecklistBox />

          {rest.map((section) => (
            <Section key={section.heading} section={section} />
          ))}

          <aside className="flex flex-col gap-4 rounded-card bg-blue-900 p-6 md:p-8">
            <h2 className="font-display text-[24px] leading-tight font-bold text-white">
              {cta.title}
            </h2>
            <p className="font-body text-[16px] leading-relaxed text-blue-100">{cta.body}</p>
            <div>
              <ButtonLink href={wwPaths.pentest} variant="outline" size="lg">
                {cta.button}
              </ButtonLink>
            </div>
          </aside>

          <ChecklistBox title="Keep the basics on one page" />

          {related.length > 0 && (
            <nav aria-label="More guides" className="flex flex-col gap-3 border-t border-blue-200 pt-8">
              <h2 className="font-display text-[18px] font-bold text-blue-900">More free guides</h2>
              <ul className="flex flex-col gap-2">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={wwPaths.guide(g.slug)}
                      className="font-body text-[16px] text-blue-700 underline underline-offset-[3px] hover:text-blue-900"
                    >
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
