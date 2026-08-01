import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Pillars from "@/components/sections/Pillars";
import Lineage from "@/components/sections/Lineage";
import MenuPreview from "@/components/sections/MenuPreview";
import Gallery from "@/components/sections/Gallery";
import Boutique from "@/components/sections/Boutique";
import Events from "@/components/sections/Events";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Visit from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <Lineage />
      <MenuPreview />
      <Gallery />
      <Boutique />
      <Events />
      <InstagramFeed />
      <Visit />
    </>
  );
}
