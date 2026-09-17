import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/button";
import { getProjects, type Project } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Everything MaaSec builds in the open: Nightjar, Big Sister, our CTF tooling, writeups, and workshop material.",
};

function updated(iso?: string): string | undefined {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Facts from GitHub, only the ones that exist for this repo. */
function Meta({ project, tone }: { project: Project; tone: "light" | "dark" }) {
  const facts = [
    project.language,
    project.stars > 0
      ? `${project.stars} star${project.stars === 1 ? "" : "s"}`
      : undefined,
    project.license,
    project.fork ? "Fork" : undefined,
    project.pushedAt ? `Updated ${updated(project.pushedAt)}` : undefined,
  ].filter(Boolean) as string[];
  if (!facts.length) return null;
  return (
    <ul
      className={`flex flex-wrap gap-x-4 gap-y-1 font-body text-[13px] leading-snug ${
        tone === "dark" ? "text-blue-200" : "text-gray-600"
      }`}
    >
      {facts.map((fact) => (
        <li key={fact}>{fact}</li>
      ))}
    </ul>
  );
}

function ProjectLink({
  project,
  className,
  children,
}: {
  project: Project;
  className: string;
  children: React.ReactNode;
}) {
  const external = /^https?:\/\//.test(project.href);
  return external ? (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children}
    </a>
  ) : (
    <Link href={project.href} className={className}>
      {children}
    </Link>
  );
}

export default async function ProjectsPage() {
  const { categories, projects, orgUrl, syncedAt } = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <header className="px-6 pt-24 pb-14 md:px-14">
          <div className="mx-auto grid max-w-[1160px] gap-6 md:grid-cols-[1fr_minmax(0,400px)] md:items-end md:gap-16">
            <h1
              data-reveal
              className="font-display text-[clamp(38px,5.6vw,68px)] leading-[1.05] font-extrabold tracking-[-0.04em] text-blue-900 text-balance"
            >
              What we&rsquo;re building.
            </h1>
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
              className="flex flex-col items-start gap-5"
            >
              <p className="font-body text-[17px] leading-relaxed text-gray-700">
                Nearly everything we make is public on GitHub. This page
                updates itself when a new repository appears.
              </p>
              <ButtonLink
                href={orgUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="ghost"
              >
                MaaSecLab on GitHub
              </ButtonLink>
            </div>
          </div>
        </header>

        {/* --- Flagship -------------------------------------------------------
            The dark band is the one loud moment on the page: the builds we
            want a visitor to remember, each given a full row rather than a
            card so the summary has room to say what the thing actually is. */}
        {featured.length > 0 && (
          <section
            aria-labelledby="flagship-heading"
            className="bg-blue-900 px-6 py-20 md:px-14"
          >
            <div className="mx-auto flex max-w-[1160px] flex-col gap-10">
              <h2
                id="flagship-heading"
                className="font-display text-[clamp(28px,3.2vw,40px)] leading-[1.1] font-bold tracking-[-0.03em] text-white"
              >
                Our biggest builds
              </h2>
              <ul className="flex flex-col border-t border-white/14">
                {featured.map((project) => (
                  <li
                    key={project.id}
                    className="grid gap-5 border-b border-white/14 py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_180px] md:items-start md:gap-12"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-[clamp(30px,3.4vw,44px)] leading-none font-extrabold tracking-[-0.035em] text-white">
                        {project.title}
                      </h3>
                      {project.status && (
                        <span className="font-body text-sm text-green-400">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="max-w-[56ch] font-body text-base leading-relaxed text-blue-100">
                        {project.summary}
                      </p>
                      <Meta project={project} tone="dark" />
                    </div>
                    <div className="flex flex-wrap gap-2.5 md:flex-col md:items-stretch">
                      {project.hiringProgram && (
                        <ButtonLink
                          href={`/hiring?program=${project.hiringProgram}`}
                        >
                          Apply to {project.title}
                        </ButtonLink>
                      )}
                      <ProjectLink
                        project={project}
                        className="inline-flex h-10 items-center justify-center rounded-md border border-white/40 px-5 font-display text-sm font-semibold whitespace-nowrap text-white transition-[background-color,color] duration-[180ms] hover:bg-white hover:text-blue-900"
                      >
                        {project.repoUrl ? "View on GitHub" : "Learn more"}
                      </ProjectLink>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* --- Everything else, grouped ------------------------------------ */}
        <section className="px-6 py-20 md:px-14">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-16">
            {categories
              .filter((c) => c.id !== "flagship")
              .map((category) => {
                const items = rest.filter((p) => p.category === category.id);
                if (!items.length) return null;
                const muted = category.id === "archive";
                return (
                  <section
                    key={category.id}
                    aria-labelledby={`cat-${category.id}`}
                    className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-16"
                  >
                    <div className="flex flex-col gap-2 lg:sticky lg:top-32 lg:self-start">
                      <h2
                        id={`cat-${category.id}`}
                        className="font-display text-[26px] leading-tight font-bold tracking-[-0.02em] text-blue-900"
                      >
                        {category.title}
                      </h2>
                      <p className="font-body text-[15px] leading-relaxed text-gray-700">
                        {category.blurb}
                      </p>
                    </div>
                    <ul className="flex flex-col border-t border-gray-300">
                      {items.map((project) => (
                        <li
                          key={project.id}
                          className="border-b border-gray-300"
                        >
                          <ProjectLink
                            project={project}
                            className="group grid gap-2 py-6 transition-colors duration-[160ms] sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8"
                          >
                            <span
                              className={`font-display text-lg leading-snug font-semibold underline-offset-4 group-hover:underline ${
                                muted ? "text-gray-700" : "text-blue-900"
                              }`}
                            >
                              {project.title}
                            </span>
                            <span className="flex flex-col gap-2">
                              <span
                                className={`font-body text-[15px] leading-relaxed ${
                                  muted ? "text-gray-600" : "text-gray-700"
                                }`}
                              >
                                {project.summary}
                              </span>
                              <Meta project={project} tone="light" />
                            </span>
                          </ProjectLink>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}

            <p className="font-body text-[13px] text-gray-600">
              Repository details last synced from GitHub on{" "}
              {new Date(syncedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
              .
            </p>
          </div>
        </section>

        {/* --- Hand-off to hiring --------------------------------------------- */}
        <section
          aria-labelledby="projects-hiring-heading"
          className="bg-blue-100 px-6 py-20 md:px-14"
        >
          <div className="mx-auto flex max-w-[1160px] flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-16">
            <div className="flex max-w-[560px] flex-col gap-3">
              <h2
                id="projects-hiring-heading"
                className="font-display text-[clamp(28px,3.2vw,40px)] leading-[1.1] font-bold tracking-[-0.03em] text-blue-900 text-balance"
              >
                Want to work on one of these?
              </h2>
              <p className="font-body text-base leading-relaxed text-gray-700">
                We&rsquo;re recruiting for Nightjar, and we take collaborators
                on everything else.
              </p>
            </div>
            <ButtonLink href="/hiring" size="lg">
              See open roles
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
