"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

export default function Fleurs() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <section id="fleurs" className="bg-grey-100 text-ink py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal order-2 md:order-1">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Les fleurs
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">
              Des roses <span className="italic">qui ne meurent pas.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md">
              Roses éternelles sous cloche de verre, bouquets frais composés
              sur place. Le bar à fleurs a sa propre logique, à part du reste
              de la boutique — un rayon, pas une ligne de texte.
            </p>
            <Link
              href="/fleurs"
              className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
            >
              Découvrir le bar à fleurs
            </Link>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="reveal aspect-[3/4] relative overflow-hidden grain border border-ink/10">
              <Image
                src="/images/fleurs-rose-eternelle.jpg"
                alt="Rose éternelle sous cloche de verre, bar à fleurs NMW"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              className="reveal aspect-[3/4] relative overflow-hidden grain border border-ink/10 mt-8"
              style={{ transitionDelay: "100ms" }}
            >
              <Image
                src="/images/fleurs-bouquet-mixte.jpg"
                alt="Bouquet de fleurs fraîches composé au bar à fleurs NMW"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* La précommande — un produit à échéance hebdomadaire, pas un objet
          en rayon : traité comme une offre distincte, avec sa propre image
          et son propre CTA. */}
      <section className="bg-paper text-ink py-20 md:py-24 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal aspect-[4/3] relative overflow-hidden grain border border-ink/10">
            <Image
              src="/images/fleurs-precommande-roses.jpg"
              alt="Bouquets de roses sur précommande au bar à fleurs NMW"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="reveal">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Précommande de la semaine
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5">
              Un bouquet préparé <span className="italic">pour vous, chaque semaine.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md mb-8">
              Bouquet de 3 roses avec petites fleurs blanches et verdure —
              26,95&nbsp;$. Bouquet de 6 roses — 41,95&nbsp;$. Composés à la
              main chez NMW ; la fenêtre de précommande change chaque
              semaine.
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
