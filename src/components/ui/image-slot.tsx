import Image from "next/image";

/**
 * Mirrors the design's <image-slot> drop zones. When `src` is set it renders
 * the image; otherwise a labelled placeholder marks where a real photo goes.
 */
export function ImageSlot({
  src,
  alt = "",
  label,
  shape = "rounded",
  radius = 10,
  className = "",
}: {
  src?: string;
  alt?: string;
  label?: string;
  shape?: "rounded" | "circle" | "rect";
  radius?: number;
  className?: string;
}) {
  const rounded =
    shape === "circle" ? "9999px" : shape === "rect" ? "0px" : `${radius}px`;

  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ borderRadius: rounded }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center border border-dashed border-blue-300 bg-blue-100 p-4 text-center ${className}`}
      style={{ borderRadius: rounded }}
    >
      {label && (
        <span className="font-mono text-[11px] leading-snug tracking-[0.04em] text-blue-600">
          {label}
        </span>
      )}
    </div>
  );
}
