"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

/**
 * Oversized, monochrome Google "G" silhouette bleeding off the card edge —
 * the brand-mark-behind-the-speaker motif from the reference design, redone
 * in a single flat tone so it reads as a graphic instead of a real logo.
 */
export function TestimonialBackdrop() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(svgRef.current, {
          rotation: 8,
          scale: 1.05,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
      });
      return () => mm.revert();
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox="0 0 24 24"
      fill="#8babc9"
      className="absolute -bottom-10 -left-12 h-56 w-56 opacity-40"
    >
      <path d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.64h6.458a5.52 5.52 0 0 1-2.395 3.622v3.01h3.878c2.269-2.09 3.578-5.166 3.578-8.817ZM12 24c3.24 0 5.956-1.075 7.942-2.909l-3.878-3.01c-1.075.72-2.45 1.147-4.064 1.147-3.126 0-5.77-2.11-6.715-4.947H1.28v3.11A11.997 11.997 0 0 0 12 24ZM5.285 14.281a7.19 7.19 0 0 1 0-4.562V6.61H1.28a11.997 11.997 0 0 0 0 10.78l4.005-3.109ZM12 4.77c1.762 0 3.343.606 4.588 1.795l3.441-3.441C17.951 1.19 15.236 0 12 0A11.997 11.997 0 0 0 1.28 6.61l4.005 3.109C6.23 6.882 8.874 4.77 12 4.77Z" />
    </svg>
  );
}
