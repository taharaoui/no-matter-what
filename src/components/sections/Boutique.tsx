"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

export default function Boutique() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
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

      {/* La fleuristerie — un encart séparé plutôt que noyé dans la boutique
          générale : c'est un produit à échéance (précommande hebdomadaire),
          pas un objet en rayon. */}
      <section className="bg-grey-100 text-ink py-20 md:py-24 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal aspect-[4/3] relative overflow-hidden grain border border-ink/10">
            <Image
              src="/images/boutique-precommande-roses.jpg"
              alt="Bouquets de roses sur précommande, NMW"
              fill
              className="object-cover"
            />
          </div>
          <div className="reveal">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              La fleuristerie · précommande
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5">
              Des bouquets préparés <span className="italic">sur demande, chaque semaine.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md mb-8">
              Bouquet de 3 roses avec petites fleurs blanches et verdure —
              26,95&nbsp;$. Bouquet de 6 roses — 41,95&nbsp;$. Préparés avec
              soin chez NMW ; la fenêtre de précommande change chaque semaine.
            </p>
            <Link
              href="/#visite"
              className="inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
            >
              Précommander un bouquet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
