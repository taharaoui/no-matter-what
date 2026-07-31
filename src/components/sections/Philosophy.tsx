"use client";

import { useReveal } from "@/lib/useReveal";

export default function Philosophy() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="relative bg-ink text-paper-light py-32 md:py-40 grain overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center">
        <p className="reveal font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-8">
          Notre philosophie
        </p>
        <p className="reveal font-display italic text-3xl md:text-5xl leading-snug">
          &ldquo;On ne sert pas du café. On sert la même attention,
          tasse après tasse, génération après génération.&rdquo;
        </p>
        <p className="reveal mt-10 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light/60">
          — La famille, No Matter What
        </p>
      </div>
    </section>
  );
}
