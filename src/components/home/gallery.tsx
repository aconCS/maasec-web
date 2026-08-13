import Image from "next/image";

/**
 * "Our team in action" — two photo rows drifting in opposite directions,
 * inspired by the marquee gallery on focus-new's landing page. Pure CSS
 * (no scroll listener): each row repeats its photo set REPEAT times
 * end-to-end and animates by exactly 1/REPEAT of its own width, which
 * loops invisibly forever. REPEAT is high enough that the row's total
 * width always exceeds even ultra-wide viewports, so there's never a
 * gap of bare background before the loop catches up.
 */
const REPEAT = 6;

const rowA = [
  { src: "/images/gallery/ctf.jpg", alt: "CTF training session" },
  { src: "/images/gallery/team2.jpg", alt: "The MaaSec club" },
  { src: "/images/gallery/back_speaker.jpeg", alt: "A guest speaker session" },
];

const rowB = [
  { src: "/images/gallery/speaker.jpg", alt: "A workshop session" },
  { src: "/images/gallery/team1.jpg", alt: "MaaSec team at a competition" },
  { src: "/images/graphics/gallery-1.png", alt: "THEM?!CTF 2026 results" },
];

function MarqueeRow({
  photos,
  reverse = false,
}: {
  photos: typeof rowA;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-gallery-marquee-reverse" : "animate-gallery-marquee"}`}
      >
        {Array.from({ length: REPEAT }, (_, setIndex) =>
          photos.map((photo, i) => (
            <div
              key={`${setIndex}-${photo.src}-${i}`}
              className="relative h-[200px] w-[280px] shrink-0 overflow-hidden rounded-[10px] md:h-[240px] md:w-[340px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 340px, 280px"
                className="object-cover"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="flex flex-col gap-10 bg-white py-22 md:py-28">
      <div className="px-6 md:px-14">
        <h2
          data-reveal
          className="font-display text-[clamp(34px,3.6vw,52px)] leading-[1.06] font-bold tracking-[-0.035em] text-blue-900"
        >
          Our team in action
        </h2>
        <p className="mt-3 font-body text-base leading-relaxed text-gray-700">
          Labs, competitions, and the people behind MaaSec.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow photos={rowA} />
        <MarqueeRow photos={rowB} reverse />
      </div>
    </section>
  );
}
