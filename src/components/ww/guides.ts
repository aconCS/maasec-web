import type { Guide } from "@/components/ww/guide-page";
import {
  emailHacked,
  websiteHacked,
  websiteMalwareCheck,
} from "@/components/ww/guides-incidents";
import {
  isThisLinkSafe,
  phishing,
  strongPasswords,
  twoFactorAuthentication,
} from "@/components/ww/guides-prevention";

/** Every worldwide guide, served at /grants/ai-pentest/ww/<slug>. */
export const guides: Guide[] = [
  emailHacked,
  websiteHacked,
  websiteMalwareCheck,
  isThisLinkSafe,
  phishing,
  strongPasswords,
  twoFactorAuthentication,
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
