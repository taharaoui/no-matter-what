import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <PageIntro
        eyebrow="Au menu"
        title="La carte"
        lede="Un rayon par nature de produit — cliquez une photo pour aller directement à ce qu'elle annonce."
      />

      {/* Section covers — a photo per category rather than per printed
          list, in the same tile grammar as the homepage's Pillars grid.
          Anchors scroll down to the full listing below rather than
          filtering it out; every other jump-link on the site (Manifesto,
          Menu complet, homepage tiles) works the same way, so this stays
          one interaction pattern instead of inventing a second. */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {MENU.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden grain border border-ink/10">
                <Image
                  src={section.cover.src}
                  alt={section.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 32vw, 48vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Voir la section →
                </span>
              </div>
              <p className="mt-4 font-display text-xl leading-snug">
                {section.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32 flex flex-col gap-24 md:gap-32">
        {MENU.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 md:scroll-mt-28"
          >
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
