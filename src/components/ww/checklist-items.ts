/**
 * The free 1-page security checklist for small organisations. Shown as a
 * preview on /grants/ai-pentest/ww/checklist and in full on its /download
 * page, which the confirmation email links to.
 */
export type ChecklistItem = {
  title: string;
  /** One-line summary for the preview. */
  summary: string;
  /** Concrete things to tick off, for the printable checklist. */
  checks: string[];
};

export const checklistItems: ChecklistItem[] = [
  {
    title: "Passwords and a password manager",
    summary: "A different, long password for every account, kept in a password manager.",
    checks: [
      "Everyone uses a password manager instead of a notebook or spreadsheet",
      "No password is reused across accounts",
      "Shared accounts are shared through the password manager, not by email or chat",
    ],
  },
  {
    title: "Two-factor authentication everywhere",
    summary: "Turn on 2FA for email, banking, social media and your website's admin.",
    checks: [
      "2FA is on for every email account first, then banking, payroll and social media",
      "An authenticator app, security key or passkey is used where possible instead of SMS",
      "Backup codes are stored somewhere safe and offline",
    ],
  },
  {
    title: "Backups you have tested",
    summary: "Automatic backups, one copy offline, and a restore you have actually tried.",
    checks: [
      "Important files and your website are backed up automatically",
      "At least one backup is offline or can't be changed from your normal accounts",
      "You've restored something from a backup in the last six months",
    ],
  },
  {
    title: "Updates switched on",
    summary: "Computers, phones, routers and software update themselves, quickly.",
    checks: [
      "Automatic updates are on for operating systems and browsers",
      "Devices that no longer get security updates are replaced or taken offline",
      "The router's firmware is up to date and its default password changed",
    ],
  },
  {
    title: "Phishing awareness",
    summary: "Everyone knows the warning signs and who to tell about a strange email.",
    checks: [
      "People know to check the sender address and hover over links before clicking",
      "Payment or bank detail changes are always confirmed by phone, on a known number",
      "Everyone knows who to forward a suspicious email to, without being blamed",
    ],
  },
  {
    title: "Fewer admin accounts",
    summary: "Admin rights only for the people who need them, used only when needed.",
    checks: [
      "Only a small number of people have admin access to email, website and devices",
      "Day-to-day work is done from a normal account, not an admin account",
      "Admin accounts have 2FA and are reviewed at least once a year",
    ],
  },
  {
    title: "Secure Wi-Fi",
    summary: "WPA2 or WPA3, a strong password, and a separate network for guests.",
    checks: [
      "The Wi-Fi uses WPA2 or WPA3 with a long password",
      "Guests and personal devices use a separate guest network",
      "The router's admin panel isn't reachable from the internet",
    ],
  },
  {
    title: "Website updates",
    summary: "Your CMS, plugins and themes are current, and unused ones are removed.",
    checks: [
      "The CMS, plugins and themes update automatically or are checked monthly",
      "Plugins and themes you don't use are deleted, not just switched off",
      "Old admin and FTP accounts on the website and hosting are removed",
    ],
  },
  {
    title: "Incident contacts",
    summary: "A short list of who to call if something goes wrong, kept offline.",
    checks: [
      "There's a written list: IT help, web developer, hosting company, bank, insurer",
      "The list is printed or stored somewhere you can reach if email is down",
      "You know where to report cybercrime and fraud in your country",
    ],
  },
  {
    title: "Offboarding",
    summary: "When someone leaves, their access leaves with them, on their last day.",
    checks: [
      "There's a checklist of every account and device a person can access",
      "Access is removed and shared passwords are changed on their last day",
      "Company devices and keys are returned and wiped",
    ],
  },
];
