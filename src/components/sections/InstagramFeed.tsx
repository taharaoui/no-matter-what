"use client";

import Image from "next/image";
import { useReveal } from "@/lib/useReveal";

/* Replaces a "testimonials" section: NMW has no volume of real customer
   reviews to show today, and inventing quotes would break the honesty kept
   everywhere else on this site. A real photo grid does the same trust-
   building work without fabricating anything. Swap for a live embed once
   the Instagram handle is confirmed — see the TODO on FOLLOW_HREF below. */

const FOLLOW_HREF = "#"; // TODO: replace with the real @handle URL once confirmed

const SHOTS = [
  { image: "/images/menu-matcha-1.jpg", alt: "Matcha latté préparé au comptoir NMW" },
  { image: "/images/ai-porchetta.png", alt: "Sandwich porchetta du café NMW" },
  { image: "/images/menu-matcha-2.jpg", alt: "Matcha lavande, café No Matter What" },
  { image: "/images/fleurs-rose-eternelle.jpg", alt: "Rose éternelle du bar à fleurs NMW" },
  { image: "/images/menu-matcha-3.jpg", alt: "Matcha fraise et vanille, café NMW" },
  { image: "/images/equipe-cappuccino.jpg", alt: "Latte art préparé au comptoir NMW" },
];

export default function InstagramFeed() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-paper text-ink py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              La vie du café
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Ça se passe aussi ici, <span className="italic">entre deux visites.</span>
            </h2>
          </div>
          <a
            href={FOLLOW_HREF}
            className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-ink pb-1 self-start md:self-auto w-fit"
          >
            Suivre sur Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {SHOTS.map((shot, i) => (
            <div
              key={shot.image}
              className="reveal group relative aspect-square overflow-hidden grain"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
