import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Pillars from "@/components/sections/Pillars";
import MenuPreview from "@/components/sections/MenuPreview";
import Gallery from "@/components/sections/Gallery";
import Boutique from "@/components/sections/Boutique";
import Fleurs from "@/components/sections/Fleurs";
import Events from "@/components/sections/Events";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Visit from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <MenuPreview />
      <Gallery />
      <Boutique />
      <Fleurs />
      <Events />
      <Testimonials />
      <InstagramFeed />
      <Visit />
    </>
  );
}
