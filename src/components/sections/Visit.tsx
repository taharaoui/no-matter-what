"use client";

import { useReveal } from "@/lib/useReveal";

export default function Visit() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="visite" ref={ref} className="relative bg-walnut-deep text-paper-light py-28 md:py-36 grain overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-[1.1fr_1fr] gap-16 items-end">
        <div className="reveal">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-brass mb-4">
            Venez voir par vous-même
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Un café, une galerie,
            <br />
            <span className="italic">une même porte.</span>
          </h2>
        </div>

        <div className="reveal grid grid-cols-2 gap-x-8 gap-y-6 font-utility text-sm">
          <div>
            <p className="uppercase tracking-[0.14em] text-brass mb-2 text-[11px]">Adresse</p>
            <p className="text-paper-light/80 leading-relaxed">
              À préciser<br />Montréal, QC
            </p>
          </div>
          <div>
            <p className="uppercase tracking-[0.14em] text-brass mb-2 text-[11px]">Heures</p>
            <p className="text-paper-light/80 leading-relaxed">
              Lun–Ven — 7h à 18h<br />Sam–Dim — 8h à 17h
            </p>
          </div>
          <div className="col-span-2">
            <a
              href="#"
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
