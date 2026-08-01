"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* Boutique = objets et merch, rien d'autre. Les fleurs ont leur propre
   section (Fleurs.tsx) — pas de photo produit réelle pour la boutique
   elle-même pour l'instant, donc un fond texturé plutôt qu'une image
   empruntée à un autre rayon. */

export default function Boutique() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="boutique" ref={ref} className="bg-paper text-ink py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="reveal order-2 md:order-1">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
            La boutique
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">
            Des objets qu&apos;on garde, <span className="italic">pas qu&apos;on jette.</span>
          </h2>
          <p className="text-ink-soft/85 leading-relaxed max-w-md">
            Céramique, cafetières, objets choisis pour durer — et bientôt, la
            première collection d&apos;articles NMW. Chaque pièce répond à la
            même logique qui guide le café depuis le début.
          </p>
          <Link
            href="/boutique"
            className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
          >
            Visiter la boutique
          </Link>
        </div>

        <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
          <div className="reveal aspect-[3/4] relative overflow-hidden grain border border-ink/10 bg-gradient-to-br from-grey-300 to-grey-700" />
          <div
            className="reveal aspect-[3/4] relative overflow-hidden grain border border-ink/10 mt-8 bg-gradient-to-br from-grey-500 to-ink"
            style={{ transitionDelay: "100ms" }}
          />
        </div>
      </div>
    </section>
  );
}
