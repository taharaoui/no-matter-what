"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* NOTE: the gallery grid below still stands in for real artwork photography
   (the pieces themselves aren't shot yet — see /lib/gallery.ts). The boutique
   pair now uses real photos. Keeping the aspect ratios intact preserves the
   layout when the gallery placeholders are swapped for real photos later. */

export default function GalleryBoutique() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <section id="galerie" className="bg-ink text-paper-light py-28 md:py-32">
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
            <div className="reveal col-span-2 row-span-2 aspect-[4/5] relative overflow-hidden grain bg-gradient-to-br from-grey-700 to-ink" />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-grey-500 to-ink" />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-grey-300/70 to-ink" />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-grey-900 to-ink" style={{ transitionDelay: "80ms" }} />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-grey-700 to-ink" style={{ transitionDelay: "80ms" }} />
          </div>
        </div>
      </section>

      <section id="boutique" className="bg-paper text-ink py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal order-2 md:order-1">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              La boutique
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">
              Des objets qu&apos;on garde, <span className="italic">pas qu&apos;on jette.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md">
              Céramique, cafetières, roses éternelles, quelques pièces
              d&apos;artistes exposés à la galerie. Chaque objet est choisi
              pour durer — la même logique qui guide le café depuis le début.
            </p>
            <Link
              href="/boutique"
              className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
            >
              Visiter la boutique
            </Link>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="reveal aspect-[3/4] relative overflow-hidden grain border border-ink/10">
              <Image
                src="/images/boutique-rose-eternelle.jpg"
                alt="Rose éternelle sous cloche de verre, boutique NMW"
                fill
                className="object-cover"
              />
            </div>
            <div
              className="reveal aspect-[3/4] relative overflow-hidden grain border border-ink/10 mt-8"
              style={{ transitionDelay: "100ms" }}
            >
              <Image
                src="/images/boutique-bouquet-mixte.jpg"
                alt="Bouquet de fleurs, boutique NMW"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
