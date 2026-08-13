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
      <main>
        <Hero />
        <StatBand />
        <Mission />
        <Offers />
        <Gallery />
        <BeginnerPath />
        <Experts />
        <Faq />
        <JoinCta />
      </main>
      <Footer />
    </>
  );
}
