import { BeginnerPath } from "@/components/home/beginner-path";
import { Experts } from "@/components/home/experts";
import { Faq } from "@/components/home/faq";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { JoinCta } from "@/components/home/join-cta";
import { Mission } from "@/components/home/mission";
import { Offers } from "@/components/home/offers";
import { StatBand } from "@/components/home/stat-band";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <StatBand />
        <Mission />
        <Offers />
        <Gallery />
        <BeginnerPath
          heading={
            <>
              CTFs look impossible from the outside.
              <br />
              We&rsquo;re bringing you in.
            </>
          }
          buttonHref="/events"
          buttonLabel="Start at your first lab"
          steps={[
            {
              num: "01",
              title: "Show up to a lab",
              body: "No prep needed, bring a laptop.",
            },
            {
              num: "02",
              title: "Learn the tools",
              body: "A mentor will guide you through the process.",
            },
            {
              num: "03",
              title: "Solve your first flag",
              body: "It only gets better from here.",
            },
          ]}
        />
        <Experts />
        <Faq />
        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
