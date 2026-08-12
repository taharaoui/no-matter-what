"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* The homepage's one gourmand moment — photos, not a price list. The full
   carte at /menu stays text-only on purpose (a printed bill of fare); here,
   the job is appetite, not reference. Three real, new items carry it. */
const SIGNATURE = [
  { name: "Porchetta", desc: "Porc effiloché, mijoté aux herbes, croûte dorée — notre dernière arrivée en carte.", image: "/images/ai-porchetta.png", href: "/menu#sandwichs" },
  { name: "Crosti'Croissant", desc: "Un croissant doré garni de fromage fondant, grillé à la minute.", image: "/images/ai-crosti-croissant.png", href: "/menu#crosti-croissants" },
  { name: "Cappuccino glacé", desc: "Espresso sur glace, coiffé d'une mousse de lait froide.", image: "/images/ai-cappuccino-glace-studio.png", href: "/menu#cafes-glaces" },
];

export default function MenuPreview() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="menu" ref={ref} className="bg-paper text-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Au menu
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Simple, <span className="italic">fait avec soin.</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-ink pb-1 self-start md:self-auto w-fit"
          >
            Menu complet
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {SIGNATURE.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="reveal group block"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden grain border border-ink/10">
                <Image
                  src={item.image}
                  alt={`${item.name}, servi au café No Matter What`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Voir au menu →
                </span>
              </div>
              <p className="mt-5 font-display text-xl">{item.name}</p>
              <p className="mt-1 text-[0.9rem] text-ink-soft/70 leading-snug">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
