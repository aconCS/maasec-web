import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Prose } from "@/components/learn/prose";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getLearnEntries, getLearnEntry } from "@/lib/content";
import { longDate } from "@/lib/format";
import { LEARN_CATEGORY_COLOR } from "@/lib/learn";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getLearnEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLearnEntry(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.excerpt,
    openGraph: { title: entry.title, description: entry.excerpt },
  };
}

export default async function LearnEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getLearnEntry(slug);
  if (!entry) notFound();

  return (
    <>
      <Nav />
      <main>
        <article className="px-6 pt-28 pb-20 md:px-14">
          <div className="mx-auto flex max-w-[720px] flex-col gap-6">
            <Link
              href="/learn"
              className="font-body text-sm text-blue-600 hover:text-blue-800"
            >
              ← All of Learn
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[11px] leading-none text-white"
                style={{ background: LEARN_CATEGORY_COLOR[entry.category] }}
              >
                {entry.category}
              </span>
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-2.5 py-1 font-mono text-[11px] leading-none text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-[clamp(30px,4.5vw,46px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-blue-900">
              {entry.title}
            </h1>

            <div className="flex items-center gap-2 border-b border-gray-300 pb-6">
              <Eyebrow className="text-gray-600">
                {entry.author}
                {entry.team ? ` · ${entry.team}` : ""} ·{" "}
                {longDate(entry.date)}
              </Eyebrow>
            </div>

            <Prose source={entry.body} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
