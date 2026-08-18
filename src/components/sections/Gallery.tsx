"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import type { Artist, Piece } from "@/lib/gallery";

type GalleryProps = {
  pieces: Piece[];
  artists: Artist[];
};

/* Sourced straight from the real catalogue (lib/gallery.ts, backed by
   Supabase) rather than a separate hardcoded list — a card that links to
   a piece and previews its wall label has to be backed by a real piece,
   so this can't drift from what /galerie actually has.

   Model: one piece announced, the rest indexed — a gallery wall's "on
   view now" sign rather than a filmstrip you scroll past. The announced
   piece is whichever row has `featured` set in Supabase (editable from
   /admin/galerie's "Mise en avant" checkbox); falls back to the first
   piece if nothing's been marked yet, so this never renders empty. */
export default function Gallery({ pieces, artists }: GalleryProps) {
  const ref = useReveal<HTMLDivElement>();
  const artistBySlug = Object.fromEntries(artists.map((a) => [a.slug, a]));

  if (pieces.length === 0) return null;

  const featured = pieces.find((p) => p.featured) ?? pieces[0];
  const rest = pieces.filter((p) => p.slug !== featured.slug);

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

          <Link
            href="/galerie"
            className="shrink-0 font-utility text-[11px] uppercase tracking-[0.16em] border-b border-paper-light/50 pb-1"
          >
            Voir l&apos;accrochage
          </Link>
        </div>

        <div className="reveal grid md:grid-cols-[1.5fr_1fr] gap-7 md:gap-10">
          {/* The piece "on view now" — always visible caption, not a
              hover reveal, since this one is being announced rather than
              browsed. */}
          <Link
            href={`/galerie/${featured.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden grain"
          >
            {featured.image && (
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 from-15% via-ink/10 to-ink/0 to-60%" />
            <div className="absolute left-5 right-5 bottom-5 z-[1]">
              <p className="font-utility text-[10px] uppercase tracking-[0.16em] text-grey-300 mb-1">
                En ce moment
              </p>
              <p className="font-display italic text-2xl text-paper-light leading-snug">
                {featured.title}
              </p>
            </div>
          </Link>

          {/* The rest, as an index rather than a second row of frames —
              same grammar as a checklist by the door. */}
          <div className="flex flex-col">
            {rest.map((piece) => {
              const artist = artistBySlug[piece.artist];
              return (
                <Link
                  key={piece.slug}
                  href={`/galerie/${piece.slug}`}
                  className="group flex items-center gap-4 py-[0.85rem] border-t border-paper-light/15 last:border-b"
                >
                  <div className="w-14 aspect-square shrink-0 overflow-hidden grain">
                    {piece.image && (
                      <Image
                        src={piece.image.src}
                        alt=""
                        width={56}
                        height={56}
                        sizes="56px"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-snug truncate">{piece.title}</p>
                    <p className="font-utility text-[10px] uppercase tracking-[0.1em] text-grey-300 mt-1">
                      {artist?.name ?? piece.artist} — {piece.medium}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
