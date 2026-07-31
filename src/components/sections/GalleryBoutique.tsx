"use client";

import { useReveal } from "@/lib/useReveal";

/* NOTE: the textured blocks below stand in for real photography.
   Swap each <div className="frame ..."> for an <Image /> pointing at
   /public/images/... once photos of the space, art, and boutique
   pieces are ready. Keeping the aspect ratios intact will preserve
   the layout. */

export default function GalleryBoutique() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <section id="galerie" className="bg-ink text-paper-light py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal max-w-xl mb-14">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-brass mb-4">
              La galerie
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              L&apos;art a sa place, <span className="italic">au même titre que le café.</span>
            </h2>
            <p className="mt-5 text-paper-light/70 leading-relaxed">
              Une rotation d&apos;artistes montréalais, exposée entre les tables.
              La galerie change ; l&apos;attention portée à chaque pièce, non.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            <div className="reveal col-span-2 row-span-2 aspect-[4/5] relative overflow-hidden grain bg-gradient-to-br from-walnut to-ink" />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-sage to-ink" />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-brass/70 to-ink" />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-ink-soft to-walnut-deep" style={{ transitionDelay: "80ms" }} />
            <div className="reveal aspect-square relative overflow-hidden grain bg-gradient-to-br from-sage-deep to-ink" style={{ transitionDelay: "80ms" }} />
          </div>
        </div>
      </section>

      <section id="boutique" className="bg-paper text-ink py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal order-2 md:order-1">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-walnut mb-4">
              La boutique
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">
              Des objets qu&apos;on garde, <span className="italic">pas qu&apos;on jette.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md">
              Céramique, cafetières, grains en sac de toile, quelques pièces
              d&apos;artistes exposés à la galerie. Chaque objet est choisi
              pour durer — la même logique qui guide le café depuis le début.
            </p>
            <a
              href="#visite"
              className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
            >
              Visiter la boutique
            </a>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="reveal aspect-[3/4] relative overflow-hidden grain bg-gradient-to-b from-paper-light to-walnut/40 border border-ink/10" />
            <div className="reveal aspect-[3/4] relative overflow-hidden grain bg-gradient-to-b from-sage/30 to-paper-light border border-ink/10 mt-8" style={{ transitionDelay: "100ms" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
