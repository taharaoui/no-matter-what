import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { MENU } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Café de spécialité, brioches, croissants, foccacias, sandwichs et salade — la carte complète du café No Matter What, à Sainte-Marthe-sur-le-Lac.",
};

export default function MenuPage() {
  return (
    <>
      <PageIntro eyebrow="Au menu" title="La carte" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32 flex flex-col gap-24 md:gap-32">
        {MENU.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                {section.title}
              </h2>
              {section.intro && (
                <p className="mt-4 max-w-lg text-[0.95rem] text-ink-soft/70 leading-relaxed">
                  {section.intro}
                </p>
              )}
            </div>

            {/* Same grid rhythm as /boutique — one product grammar across
                the site rather than a second one invented for photos. */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {section.items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
