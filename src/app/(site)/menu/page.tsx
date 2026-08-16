import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import MenuBrowser from "@/components/menu/MenuBrowser";
import { getMenu } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Café de spécialité, brioches, croissants, foccacias, sandwichs et salade — la carte complète du café No Matter What, à Sainte-Marthe-sur-le-Lac.",
};

export default async function MenuPage() {
  const sections = await getMenu();

  return (
    <>
      <PageIntro
        eyebrow="Au menu"
        title="La carte"
        lede="Un rayon par nature de produit — cliquez une photo pour voir ce qu'elle annonce."
      />
      <MenuBrowser sections={sections} />
    </>
  );
}
