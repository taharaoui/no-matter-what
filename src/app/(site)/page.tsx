import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Pillars from "@/components/sections/Pillars";
import MenuPreview from "@/components/sections/MenuPreview";
import Gallery from "@/components/sections/Gallery";
import Boutique from "@/components/sections/Boutique";
import Fleurs from "@/components/sections/Fleurs";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Visit from "@/components/sections/Visit";
import { getPieces, getArtists } from "@/lib/gallery";

export default async function Home() {
  const [pieces, artists] = await Promise.all([getPieces(), getArtists()]);

  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <MenuPreview />
      <Gallery pieces={pieces} artists={artists} />
      <Boutique />
      <Fleurs />
      <Testimonials />
      <InstagramFeed />
      <Visit />
    </>
  );
}
