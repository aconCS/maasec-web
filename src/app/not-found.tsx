import { ButtonLink } from "@/components/ui/button";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex flex-1 items-center px-6 py-32 md:px-14">
        <div className="mx-auto flex max-w-[560px] flex-col items-start gap-6">
          <Eyebrow className="text-blue-600">Error 404</Eyebrow>
          <h1 className="font-display text-[clamp(48px,9vw,96px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-blue-900">
            Flag not found
            <span className="text-blue-400">.</span>
          </h1>
          <p className="font-body text-[17px] leading-relaxed text-gray-700">
            This page doesn&rsquo;t exist — or it&rsquo;s well hidden. Head back
            and try another path.
          </p>
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
