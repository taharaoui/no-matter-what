"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* NOTE: one square tile still stands in for real artwork photography (the
   accrochage catalogued in /lib/gallery.ts isn't shot yet). The rest below
   are real pieces, in place as they get photographed. */

export default function Gallery() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="galerie" ref={ref} className="bg-ink text-paper-light py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-xl mb-14">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-4">
            La galerie
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            L&apos;art a sa place, <span className="italic">au même titre que le café.</span>
          </h2>
          <p className="mt-5 text-paper-light/70 leading-relaxed">
            Une rotation d&apos;artistes montréalais, exposée entre les tables.
            La galerie change ; l&apos;attention portée à chaque pièce, non.
          </p>
          <Link
            href="/galerie"
            className="mt-7 inline-block font-utility text-[11px] uppercase tracking-[0.16em] border-b border-paper-light/50 pb-1"
          >
            Voir l&apos;accrochage
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <div className="reveal col-span-2 row-span-2 aspect-[4/5] relative overflow-hidden grain">
            <Image
              src="/images/galerie-portrait-3.jpg"
              alt="Portrait, accrochage en cours à la galerie NMW"
              fill
              className="object-cover"
            />
          </div>
          <div className="reveal aspect-square relative overflow-hidden grain">
            <Image
              src="/images/galerie-portrait-1.jpg"
              alt="Portrait, accrochage en cours à la galerie NMW"
              fill
              className="object-cover object-[35%_30%]"
            />
          </div>
          <div className="reveal aspect-square relative overflow-hidden grain">
            <Image
              src="/images/galerie-fleur-bois.jpg"
              alt="Peinture sur bois, accrochage en cours à la galerie NMW"
              fill
              className="object-cover"
            />
          </div>
          <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-grey-900 to-ink" style={{ transitionDelay: "80ms" }} />
          <div className="reveal aspect-square relative overflow-hidden grain" style={{ transitionDelay: "80ms" }}>
            <Image
              src="/images/galerie-portrait-2.jpg"
              alt="Peinture, accrochage en cours à la galerie NMW"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
