import Image from "next/image";
import { TestimonialBackdrop } from "@/components/home/testimonial-backdrop";
import { getSpeakers } from "@/lib/content";

const quote = {
  name: "Ivan Fratric",
  role: "Guest speaker · Google Project Zero",
  lead: "Competing in CTFs is the best way to get yourself",
  highlight: "FAANG ready.",
  photo: "/images/speakers/ivan.jpg",
};

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
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Heading */}
          <div className="relative flex flex-col" data-reveal>
            <span
              aria-hidden
              className="font-display text-[160px] leading-none font-extrabold text-gray-200 select-none"
            >
              &ldquo;
            </span>
            <h2 className="-mt-16 font-display text-[clamp(38px,4.6vw,58px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-blue-900">
              What the experts are&nbsp;
              <span className="text-blue-600">saying</span>
            </h2>
          </div>

          {/* Testimonial card — sized off the golden ratio (φ ≈ 1.618):
              a golden-rectangle card, split into a 1/φ² : 1/φ column pair
              (38.2% / 61.8%), with the avatar at 61.8% of the photo panel. */}
          <figure
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="grid aspect-[1.618/1] w-full overflow-hidden rounded-card bg-white shadow-[0_12px_30px_rgba(13,36,56,.12)] sm:grid-cols-[38.2%_61.8%]"
          >
            <div className="relative hidden items-center justify-center overflow-hidden bg-blue-100 sm:flex">
              <TestimonialBackdrop />
              <span className="relative aspect-square h-[61.8%] overflow-hidden rounded-full shadow-[0_6px_16px_rgba(13,36,56,.18)]">
                <Image
                  src={quote.photo}
                  alt={quote.name}
                  fill
                  className="object-cover"
                />
              </span>
              <span className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_4px_10px_rgba(13,36,56,.15)]">
                <Image
                  src="/images/logos/google.svg"
                  alt="Google"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </span>
            </div>

            <figcaption className="flex flex-col justify-center gap-4 p-6 md:p-8">
              <span
                aria-hidden
                className="font-display text-4xl leading-none font-extrabold text-blue-600"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-xl leading-[1.35] font-bold tracking-[-0.01em] text-blue-900">
                {quote.lead} <span className="text-blue-600">{quote.highlight}</span>
              </blockquote>
              <span aria-hidden className="h-[2px] w-10 bg-blue-600" />
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-base leading-tight font-bold text-blue-900">
                  {quote.name}
                </span>
                <span className="font-body text-[13px] leading-tight text-gray-600">
                  {quote.role}
                </span>
              </div>
            </figcaption>
          </figure>
        </div>

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
