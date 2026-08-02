"use client";

import { useReveal } from "@/lib/useReveal";

/* No real customer reviews exist yet. Rather than invent quotes and names
   — which would break the no-fabrication rule kept everywhere else on this
   site — the three slots ship as a visible pending state: honest about
   being empty, ready to take real testimonials the moment they're
   collected. Replace SLOTS' content with real quotes when they exist. */

const SLOTS = [1, 2, 3];

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-paper text-ink py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-xl mb-14">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
            Ce qu&apos;on en dit
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Les premiers avis, <span className="italic">bientôt ici.</span>
          </h2>
          <p className="mt-5 text-ink-soft/70 leading-relaxed max-w-md">
            On préfère attendre de vrais mots plutôt que d&apos;en inventer.
            Cette section s&apos;ouvrira avec les avis de nos premiers
            visiteurs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SLOTS.map((i) => (
            <div
              key={i}
              className="reveal border border-ink/10 p-8 flex flex-col gap-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="text-grey-300 tracking-[0.2em] text-sm" aria-hidden="true">
                ★★★★★
              </p>
              <p className="font-display italic text-lg text-ink-soft/40 leading-relaxed">
                — avis à venir —
              </p>
              <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-500">
                Client NMW
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
