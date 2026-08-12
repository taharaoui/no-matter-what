"use client";

import Image from "next/image";
import { useReveal } from "@/lib/useReveal";

const ADDRESS_QUERY = "3054A Chemin d'Oka, Sainte-Marthe-sur-le-Lac, QC J0N 1P0";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`;

export default function Visit() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="visite" ref={ref} className="relative bg-ink text-paper-light py-28 md:py-32 grain overflow-hidden">
      <Image
        src="/images/bar-cafe.jpg"
        alt="L'intérieur du café No Matter What à Sainte-Marthe-sur-le-Lac — comptoir, galerie et salle"
        fill
        className="object-cover object-[50%_35%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-[1.1fr_1fr] gap-16 items-end">
        <div className="reveal">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-4">
            Venez voir par vous-même
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Un café, une galerie,
            <br />
            <span className="italic">une même porte.</span>
          </h2>
          <p className="mt-6 max-w-sm text-paper-light/70 leading-relaxed">
            À Sainte-Marthe-sur-le-Lac, à deux pas de Deux-Montagnes et de
            Saint-Eustache, à une demi-heure de Laval et de Montréal.
          </p>
        </div>

        <div className="reveal grid grid-cols-2 gap-x-8 gap-y-6 font-utility text-sm">
          <div>
            <p className="uppercase tracking-[0.14em] text-grey-300 mb-2 text-[11px]">Adresse</p>
            <p className="text-paper-light/80 leading-relaxed">
              3054A Chemin d&apos;Oka<br />Sainte-Marthe-sur-le-Lac, QC J0N 1P0
            </p>
          </div>
          <div>
            <p className="uppercase tracking-[0.14em] text-grey-300 mb-2 text-[11px]">Heures</p>
            <p className="text-paper-light/80 leading-relaxed">
              Lun–Ven — 7h à 18h<br />Sam–Dim — 8h à 17h
            </p>
          </div>
          <div className="col-span-2">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-paper-light/40 px-6 py-3 uppercase tracking-[0.16em] text-[11px] hover:bg-paper-light hover:text-ink transition-colors"
            >
              Obtenir l&apos;itinéraire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
