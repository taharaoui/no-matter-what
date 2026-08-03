"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* One frame still stands in for real artwork photography (the accrochage
   catalogued in /lib/gallery.ts isn't shot yet). The rest are real pieces,
   in place as they get photographed.

   Model: a horizontal filmstrip rather than a fixed bento grid — walking
   past a gallery wall, one frame at a time. Every frame shares the same
   aspect ratio, so new pieces just append to the array instead of forcing
   a grid reshuffle to fit an odd count. */
const FRAMES = [
  {
    image: "/images/galerie-portrait-1.jpg",
    alt: "Portrait, accrochage en cours à la galerie NMW",
    position: "object-[35%_30%]",
  },
  {
    image: "/images/galerie-portrait-2.jpg",
    alt: "Portrait, accrochage en cours à la galerie NMW",
    position: "object-[35%_30%]",
  },
  {
    image: "/images/galerie-fleur-bois.jpg",
    alt: "Peinture sur bois, accrochage en cours à la galerie NMW",
    position: "object-center",
  },
  {
    image: "/images/SILENCE.jpg",
    alt: "Peinture, accrochage en cours à la galerie NMW",
    position: "object-center",
  },
  {
    image: "/images/eveil-chromatique.jpg",
    alt: "Peinture, accrochage en cours à la galerie NMW",
    position: "object-center",
  },
] as const;

export default function Gallery() {
  const ref = useReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByFrame(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const tile = track.firstElementChild as HTMLElement | null;
    const gap = 20; // matches gap-5 at md+
    const amount = (tile?.offsetWidth ?? track.clientWidth * 0.8) + gap;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="galerie" ref={ref} className="bg-ink text-paper-light py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-xl mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-4">
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

          <div className="flex items-center gap-6 shrink-0">
            <Link
              href="/galerie"
              className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-paper-light/50 pb-1"
            >
              Voir l&apos;accrochage
            </Link>

            {/* Explicit slider affordance — the filmstrip scrolls on swipe
                or trackpad already, but the arrows say so at a glance. */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByFrame(-1)}
                aria-label="Œuvre précédente"
                className="h-10 w-10 rounded-full border border-paper-light/30 grid place-items-center transition-colors hover:border-paper-light hover:text-paper-light"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByFrame(1)}
                aria-label="Œuvre suivante"
                className="h-10 w-10 rounded-full border border-paper-light/30 grid place-items-center transition-colors hover:border-paper-light hover:text-paper-light"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="reveal no-scrollbar flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-2"
      >
        {FRAMES.map((frame) => (
          <div
            key={frame.image}
            className="relative shrink-0 snap-start w-[72vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] aspect-[4/5] overflow-hidden grain"
          >
            <Image
              src={frame.image}
              alt={frame.alt}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, (min-width: 640px) 42vw, 72vw"
              className={`object-cover ${frame.position}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
