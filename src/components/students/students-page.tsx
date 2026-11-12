import type { Metadata } from "next";
import Link from "next/link";
import {
  studentCopy,
  studentPaths,
  studentTeamIds,
  type StudentLang,
  type StudentTeamId,
} from "@/components/students/copy";
import { VolunteerForm } from "@/components/students/volunteer-form";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/button";
import { getJoinTeams } from "@/lib/content";
import { site } from "@/lib/site";

// Recruitment landing pages for students in Maastricht, in English
// (/join/students) and Dutch (/join/studenten). Same look as the AI pentest
// landing pages; the form sits in the first screen.

/** hreflang between the two language versions; English is the default. */
export function studentAlternates(
  paths: Record<StudentLang, string>,
  lang: StudentLang,
): Metadata["alternates"] {
  return {
    canonical: paths[lang],
    languages: { en: paths.en, nl: paths.nl, "x-default": paths.en },
  };
}

export function studentsMetadata(lang: StudentLang): Metadata {
  const t = studentCopy[lang].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: studentAlternates(studentPaths.landing, lang),
  };
}

export function StudentLangSwitch({
  current,
  paths,
}: {
  current: StudentLang;
  paths: Record<StudentLang, string>;
}) {
  const langs: StudentLang[] = ["nl", "en"];
  return (
    <nav
      aria-label={current === "nl" ? "Taal" : "Language"}
      className="flex items-center gap-2 font-mono text-[12px] leading-none font-medium tracking-[0.14em]"
    >
      {langs.map((lang, i) => (
        <span key={lang} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-gray-400">
              |
            </span>
          )}
          {lang === current ? (
            <span aria-current="true" className="text-blue-900">
              {lang.toUpperCase()}
            </span>
          ) : (
            <a
              href={paths[lang]}
              hrefLang={lang}
              lang={lang}
              className="text-blue-600 underline underline-offset-4 hover:text-blue-800"
            >
              {lang.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}

const sectionHeading =
  "font-display text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-bold tracking-[-0.03em] text-blue-900 text-balance";

export async function StudentsPage({ lang }: { lang: StudentLang }) {
  const t = studentCopy[lang];
  const open = new Set((await getJoinTeams()).filter((team) => team.open).map((team) => team.id));
  const teams = studentTeamIds.filter((id): id is StudentTeamId => open.has(id));

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {/* --- Hero + form ------------------------------------------------- */}
        <section className="bg-blue-50 px-6 pt-24 pb-20 md:px-14">
          <div className="mx-auto grid max-w-[1160px] items-start gap-12 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-16">
            <div className="flex flex-col gap-7 lg:pt-8">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <span className="font-mono text-[11px] leading-snug font-medium tracking-[0.16em] text-blue-600 uppercase">
                  {t.hero.eyebrow}
                </span>
                <StudentLangSwitch current={lang} paths={studentPaths.landing} />
              </div>
              <h1 className="font-display text-[clamp(40px,5.4vw,66px)] leading-[1.03] font-extrabold tracking-[-0.04em] text-blue-900 text-balance">
                {t.hero.title}
              </h1>
              <p className="max-w-[56ch] font-body text-[18px] leading-relaxed text-gray-700">
                {t.hero.intro}
              </p>
              <ul className="flex flex-col gap-3">
                {t.hero.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 font-display text-[16px] font-semibold text-blue-900"
                  >
                    <span
                      aria-hidden
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-600 text-[13px] text-white"
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="apply"
              className="scroll-mt-28 rounded-card bg-white p-6 shadow-[0_12px_30px_rgba(13,36,56,.12)] md:p-8"
            >
              <h2 className="mb-1 font-display text-[24px] leading-tight font-bold text-blue-900">
                {t.formCard.title}
              </h2>
              <p className="mb-6 font-body text-[14px] leading-relaxed text-gray-600">
                {t.formCard.intro}
              </p>
              {teams.length > 0 ? (
                <VolunteerForm lang={lang} teams={teams} />
              ) : (
                <p className="font-body text-[15px] text-gray-700">
                  <a href={`mailto:${site.email}`} className="font-semibold text-blue-700 underline">
                    {site.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* --- What MaaSec does -------------------------------------------- */}
        <section className="px-6 py-22 md:px-14">
          <div className="mx-auto grid max-w-[1160px] items-start gap-8 md:grid-cols-2 md:gap-16">
            <h2 className={sectionHeading}>{t.about.title}</h2>
            <div className="flex flex-col gap-4">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="font-body text-[17px] leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* --- Roles ------------------------------------------------------- */}
        <section aria-labelledby="roles-heading" className="bg-blue-100 px-6 py-22 md:px-14">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <div className="flex max-w-[720px] flex-col gap-4">
              <h2 id="roles-heading" className={sectionHeading}>
                {t.roles.title}
              </h2>
              <p className="font-body text-[17px] leading-relaxed text-gray-700">{t.roles.intro}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studentTeamIds.map((id) => (
                <li key={id} className="flex flex-col gap-2 rounded-card border border-blue-200 bg-white p-6">
                  <h3 className="font-display text-[19px] leading-tight font-bold text-blue-900">
                    {t.roles.teams[id].title}
                  </h3>
                  <p className="font-body text-[15px] leading-relaxed text-gray-700">
                    {t.roles.teams[id].body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- What you get + time ---------------------------------------- */}
        <section className="px-6 py-22 md:px-14">
          <div className="mx-auto grid max-w-[1160px] items-start gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-5">
              <h2 className={sectionHeading}>{t.benefits.title}</h2>
              <ul className="flex flex-col gap-3">
                {t.benefits.items.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-[17px] leading-snug text-gray-800">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-600 text-[11px] text-white"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5 rounded-card bg-blue-900 p-7 md:p-9">
              <h2 className="font-display text-[clamp(26px,2.8vw,34px)] leading-[1.1] font-bold tracking-[-0.02em] text-white">
                {t.time.title}
              </h2>
              <p className="font-body text-[17px] leading-relaxed text-blue-100">{t.time.body}</p>
            </div>
          </div>
        </section>

        {/* --- How it works ------------------------------------------------ */}
        <section aria-labelledby="steps-heading" className="bg-blue-100 px-6 py-22 md:px-14">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
            <h2 id="steps-heading" className={sectionHeading}>
              {t.steps.title}
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {t.steps.items.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-2">
                  <span className="font-mono text-base leading-none font-medium text-blue-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[21px] leading-tight font-semibold text-blue-900">
                    {step.title}
                  </h3>
                  <p className="font-body text-[16px] leading-relaxed text-gray-700">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --- FAQ --------------------------------------------------------- */}
        <section aria-labelledby="students-faq-heading" className="px-6 py-22 md:px-14">
          <div className="mx-auto flex max-w-[840px] flex-col gap-8">
            <h2 id="students-faq-heading" className={sectionHeading}>
              {t.faq.title}
            </h2>
            <div className="flex flex-col border-t border-blue-200">
              {t.faq.items.map((item) => (
                <details key={item.q} className="group border-b border-blue-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg leading-tight font-bold text-blue-900 md:text-xl">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="flex-none font-display text-2xl leading-none font-semibold text-blue-600 transition-transform duration-[220ms] group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>
                  <p className="pb-6 font-body text-[15px] leading-relaxed text-gray-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final call to action --------------------------------------- */}
        <section className="flex flex-col items-center gap-6 bg-blue-900 px-6 py-20 text-center md:px-14">
          <h2 className="max-w-[720px] font-display text-[clamp(30px,4vw,52px)] leading-[1.1] font-bold tracking-[-0.03em] text-white text-balance">
            {t.cta.title}
          </h2>
          <p className="max-w-[480px] font-body text-base leading-relaxed text-blue-100">{t.cta.body}</p>
          <ButtonLink href="#apply" variant="outline" size="lg">
            {t.cta.button}
          </ButtonLink>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function studentsThanksMetadata(lang: StudentLang): Metadata {
  return {
    title: studentCopy[lang].thanks.metaTitle,
    robots: { index: false, follow: false },
    alternates: studentAlternates(studentPaths.thanks, lang),
  };
}

/** Conversion page after a successful application. Not indexed. */
export function StudentsThanksPage({ lang }: { lang: StudentLang }) {
  const t = studentCopy[lang].thanks;
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-blue-50 px-6 pt-28 pb-24 md:px-14">
          <div className="mx-auto flex max-w-[720px] flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-6">
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-[26px] text-white"
                >
                  ✓
                </span>
                <StudentLangSwitch current={lang} paths={studentPaths.thanks} />
              </div>
              <h1 className="font-display text-[clamp(36px,5vw,56px)] leading-[1.05] font-extrabold tracking-[-0.04em] text-blue-900 text-balance">
                {t.title}
              </h1>
              <p className="font-body text-[18px] leading-relaxed text-gray-700">{t.intro}</p>
            </div>
            <ol className="flex flex-col gap-7">
              {t.steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-5">
                  <span className="pt-1 font-mono text-base leading-none font-medium text-blue-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-display text-[21px] leading-[1.3] font-semibold text-blue-900">
                      {step.title}
                    </h2>
                    <p className="font-body text-[16px] leading-relaxed text-gray-700">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="font-body text-[15px] leading-relaxed text-gray-700">
              {t.noReply[0]}{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
              >
                {site.email}
              </a>
              {t.noReply[1]}
            </p>
            <div>
              <Link
                href="/about"
                className="inline-flex h-12 items-center rounded-md border border-black px-7 font-display text-[15px] font-semibold text-blue-900 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                {t.aboutButton}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
