import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Lineage from "@/components/sections/Lineage";
import Philosophy from "@/components/sections/Philosophy";
import MenuPreview from "@/components/sections/MenuPreview";
import GalleryBoutique from "@/components/sections/GalleryBoutique";
import Visit from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lineage />
        <Philosophy />
        <MenuPreview />
        <GalleryBoutique />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
