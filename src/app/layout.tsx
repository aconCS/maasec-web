import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/site";
import "./globals.css";

// Poppins drives everything structural; Lora is reserved for editorial moments
// (taglines, pull quotes) — never UI chrome. Per the design system readme.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Maastricht University cybersecurity organisation`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Break things. And then learn to defend them.`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo-nav-icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Reveal />
      </body>
    </html>
  );
}
