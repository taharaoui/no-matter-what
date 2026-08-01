"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* The site's concept condensed into one screen — replaces what used to be
   two separate, redundant beats ("notre univers" / "les trois expériences").
   Four distinct pillars, each with a clear boundary: la galerie n'expose que
   des tableaux, la boutique que des articles/merch, les fleurs sont leur
   propre univers plutôt qu'une ligne sous "boutique". */

const PILLARS = [
  {
    name: "Café",
    text: "Espresso, filtre, une carte courte tenue avec soin.",
    href: "/menu",
    image: "/images/equipe-smoothie.jpg",
  },
  {
    name: "Galerie",
    text: "Un accrochage d'artistes montréalais, en rotation.",
    href: "/galerie",
    image: "/images/galerie-portrait-1.jpg",
    imagePosition: "object-[35%_30%]",
  },
  {
    name: "Boutique",
    text: "Articles choisis, et la prochaine collection NMW.",
    href: "/boutique",
    tone: "bg-gradient-to-br from-grey-500 to-ink",
  },
  {
    name: "Fleurs",
    text: "Roses éternelles, bouquets sur précommande.",
    href: "/fleurs",
    image: "/images/fleurs-precommande-roses.jpg",
  },
] as const;

export default function Pillars() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-paper text-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-xl mb-14">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
            Un même fil
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Quatre matières, <span className="italic">une seule adresse.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {PILLARS.map((pillar, i) => (
            <Link
              key={pillar.name}
              href={pillar.href}
              className="reveal group block"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className={`relative aspect-[3/4] overflow-hidden grain border border-ink/10 ${
                  "tone" in pillar ? pillar.tone : ""
                }`}
              >
                {"image" in pillar && (
                  <Image
                    src={pillar.image}
                    alt={pillar.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                      "imagePosition" in pillar ? pillar.imagePosition : ""
                    }`}
                  />
                )}
              </div>
              <p className="mt-4 font-display text-xl">{pillar.name}</p>
              <p className="mt-1 text-[0.9rem] text-ink-soft/70 leading-snug">
                {pillar.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
