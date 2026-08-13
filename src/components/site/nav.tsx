"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { navLinks } from "@/lib/site";

/**
 * Sticky nav. Transparent at the top of every page, turns white once the
 * page scrolls — matching the `trackStatement` scroll handler in the design
 * source.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [priorPathname, setPriorPathname] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation without a setState-in-effect cascade:
  // reset during render when the pathname itself changes.
  if (pathname !== priorPathname) {
    setPriorPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,box-shadow,backdrop-filter] duration-[220ms] ease-[var(--ease-out-soft)] ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_rgba(17,51,87,.08)] backdrop-blur-[10px]"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-14 lg:px-21 lg:py-[22px]">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-nav-icon.svg"
            alt=""
            width={56}
            height={56}
            priority
            className="h-11 w-11 lg:h-14 lg:w-14"
          />
          <span className="font-display text-[22px] leading-none font-bold tracking-[-0.01em] text-blue-600">
            MaaSec
          </span>
        </Link>

        <nav className="hidden items-center gap-[30px] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className="font-body text-sm leading-none font-medium text-gray-700 transition-colors duration-[160ms] hover:text-blue-900 aria-[current=page]:text-blue-900"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/join">Join us</ButtonLink>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md text-blue-900 md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-[180ms] ${
                menuOpen ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-[7px] left-0 block h-0.5 w-6 bg-current transition-opacity duration-[180ms] ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-[180ms] ${
                menuOpen ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-gray-300 bg-canvas px-6 pb-6 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-lg font-semibold text-blue-900 py-3"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/join" size="lg" className="mt-2 w-full">
            Join us
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
