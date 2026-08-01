"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* The one sentence the brand is named for, given a moment alone — no
   image, no product, right after the hero. Aesop / %Arabica pattern:
   the manifesto comes before the offer, not after it. */

export default function Manifesto() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-ink text-paper-light py-32 md:py-44">
      <div className="mx-auto max-w-2xl px-6 md:px-10 text-center">
        <p className="reveal font-display italic text-4xl md:text-6xl leading-[1.15]">
          &ldquo;Peu importe. On ouvre.&rdquo;
        </p>
        <p className="reveal mt-8 text-paper-light/65 leading-relaxed">
          Janvier 1998. La ville est sans électricité depuis cinq jours. Le
          café aussi — et il ouvre quand même, un réchaud sur le trottoir.
          Vingt ans plus tard, c&apos;est devenu un nom.
        </p>
        <Link
          href="/histoire#nom"
          className="reveal mt-8 inline-block font-utility text-[11px] uppercase tracking-[0.16em] border-b border-paper-light/40 pb-1"
        >
          Pourquoi ce nom
        </Link>
      </div>
    </section>
  );
}
