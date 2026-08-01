"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* Deliberately light on specifics: NMW doesn't have published event
   packages, pricing, or capacity yet. Rather than invent them, this
   section states the fact (the room is available) and routes to the one
   real contact point the site has (/#visite) until a dedicated inquiry
   channel exists. */

export default function Events() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="relative bg-ink text-paper-light py-28 md:py-36 grain overflow-hidden">
      <Image
        src="/images/bar-cafe.jpg"
        alt="La salle NMW — comptoir, piano et galerie"
        fill
        className="object-cover object-[15%_45%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-lg">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-4">
            Les événements
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
            Un café, une galerie,
            <br />
            <span className="italic">une même salle — à vous.</span>
          </h2>
          <p className="text-paper-light/75 leading-relaxed mb-8">
            Piano, galerie tournante, places assises pour un groupe — la
            salle se prête à un 5 à 7, un lancement, un atelier. Écrivez-nous
            pour en discuter.
          </p>
          <Link
            href="/#visite"
            className="inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors w-fit"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
