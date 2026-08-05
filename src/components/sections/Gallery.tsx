"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import { PIECES, ARTIST_BY_SLUG } from "@/lib/gallery";

/* Sourced straight from the real catalogue (lib/gallery.ts) rather than a
   separate hardcoded list — a card that links to a piece and previews its
   wall label has to be backed by a real piece, so this can't drift from
   what /galerie actually has. (This replaced an earlier version mixing in
   uncatalogued/placeholder photos with invented captions.)

   Model: a horizontal filmstrip rather than a fixed bento grid — walking
   past a gallery wall, one frame at a time. Every frame shares the same
   aspect ratio, so new pieces just append to the array instead of forcing
   a grid reshuffle to fit an odd count. */
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
              Une galerie d&apos;art indépendante, en rotation, exposée entre
              les tables. L&apos;accrochage change ; l&apos;attention portée
              à chaque pièce, non.
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
        {PIECES.map((piece) => {
          const artist = ARTIST_BY_SLUG[piece.artist];
          return (
            <Link
              key={piece.slug}
              href={`/galerie/${piece.slug}`}
              className="group relative shrink-0 snap-start w-[72vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] aspect-[4/5] overflow-hidden grain"
            >
              {piece.image && (
                <Image
                  src={piece.image.src}
                  alt={piece.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, (min-width: 640px) 42vw, 72vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}

              {/* Preview: the wall label's short form, revealed on hover
                  rather than printed under the frame — the filmstrip stays
                  a wall of images at rest, and identifies a piece only once
                  you're looking at it. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {artist && (
                  <p className="font-utility text-[10px] uppercase tracking-[0.14em] text-grey-300">
                    {artist.name}
                  </p>
                )}
                <p className="font-display text-xl text-paper-light leading-snug mt-1">
                  {piece.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
