import { getSpeakers } from "@/lib/content";

// Static brand marks — see public/images/logos/.
const speakerLogos: Record<string, string> = {
  Google: "/images/logos/google.svg",
  Microsoft: "/images/logos/microsoft.svg",
  EA: "/images/logos/ea.svg",
  Boeing: "/images/logos/boeing.svg",
  Moderna: "/images/logos/moderna.svg",
  Cuccibu: "/images/logos/cuccibu.svg",
};

export async function Experts() {
  const speakers = await getSpeakers();

  return (
    <section className="bg-white px-6 py-22 md:px-14">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-16">
        {/* The quote card that used to sit beside this heading is gone:
            the section now simply credits the companies our speakers
            came from. */}
        <h2
          data-reveal
          className="text-center font-display text-[clamp(38px,4.6vw,58px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900"
        >
          Speakers we&rsquo;ve&nbsp;
          <span className="text-blue-600">hosted</span>
        </h2>

        {/* Logo strip */}
        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "160ms" }}
          className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 px-6 md:px-12"
        >
          {speakers.map((name) => {
            const src = speakerLogos[name];
            return src ? (
              // eslint-disable-next-line @next/next/no-img-element -- variable intrinsic size per logo, next/image would need per-logo dimensions
              <img key={name} src={src} alt={name} className="h-9 w-auto" />
            ) : (
              <span
                key={name}
                className="font-display text-xl font-bold tracking-[-0.02em] text-gray-400"
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
