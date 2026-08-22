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
  background,
  fit = "cover",
}: {
  src?: string;
  alt?: string;
  label?: string;
  shape?: "rounded" | "circle" | "rect";
  radius?: number;
  className?: string;
  /** Fill colour behind the image — for `fit="contain"` marks/logos that
   * don't cover their own frame and need a surface to sit on. */
  background?: string;
  /** `cover` crops to fill (photos); `contain` fits the whole asset with
   * padding, for logo marks used as placeholders. */
  fit?: "cover" | "contain";
}) {
  const rounded =
    shape === "circle" ? "9999px" : shape === "rect" ? "0px" : `${radius}px`;

  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${background ?? ""} ${className}`}
        style={{ borderRadius: rounded }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          draggable={false}
          className={`${fit === "contain" ? "object-contain p-[18%]" : "object-cover"} select-none`}
        />
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
