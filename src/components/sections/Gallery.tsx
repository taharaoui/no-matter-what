"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import Plate from "@/components/ui/Plate";
import WallLabel from "@/components/ui/WallLabel";
import type { Artist, Piece } from "@/lib/gallery";

type GalleryProps = {
  pieces: Piece[];
  artists: Artist[];
};

/* Same aspect map as /galerie/[slug] — a piece keeps its real crop in the
   showcase instead of being forced into the grid's 4/5. */
const ASPECT = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[5/3]",
} as const;

/* Sourced straight from the real catalogue (lib/gallery.ts, backed by
   Supabase) rather than a separate hardcoded list — a card that links to
   a piece and previews its wall label has to be backed by a real piece,
   so this can't drift from what /galerie actually has.

   Model: one piece announced, the rest indexed — a gallery wall's "on
   view now" sign rather than a filmstrip you scroll past. The announced
   piece is whichever row has `featured` set in Supabase (editable from
   /admin/galerie's "Mise en avant" checkbox); falls back to the first
   piece if nothing's been marked yet, so this never renders empty.

   Clicking any piece opens it in a showcase overlay rather than
   navigating to /galerie/[slug] — same WallLabel the piece's own page
   uses, so it reads identically, but doesn't take someone off the
   homepage for a quick look. The full page is still one click away from
   inside the overlay, for the artist bio and "aussi exposé" list. */
export default function Gallery({ pieces, artists }: GalleryProps) {
  const ref = useReveal<HTMLDivElement>();
  const artistBySlug = Object.fromEntries(artists.map((a) => [a.slug, a]));
  const [selected, setSelected] = useState<Piece | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  if (pieces.length === 0) return null;

  const featured = pieces.find((p) => p.featured) ?? pieces[0];
  const rest = pieces.filter((p) => p.slug !== featured.slug);
  const selectedArtist = selected ? artistBySlug[selected.artist] : undefined;

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
          <button
            type="button"
            onClick={() => setSelected(featured)}
            className="group relative block w-full text-left aspect-[4/5] overflow-hidden grain"
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
          </button>

          {/* The rest, as an index rather than a second row of frames —
              same grammar as a checklist by the door. */}
          <div className="flex flex-col">
            {rest.map((piece) => {
              const artist = artistBySlug[piece.artist];
              return (
                <button
                  type="button"
                  key={piece.slug}
                  onClick={() => setSelected(piece)}
                  className="group flex items-center gap-4 py-[0.85rem] border-t border-paper-light/15 last:border-b w-full text-left"
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
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Showcase overlay — same scroll-lock / Escape-to-close / backdrop
          pattern as CartDrawer.tsx, Header.tsx's mobile panel, and
          PrecommandeModal.tsx (a fourth call site for the same
          mechanism). */}
      <div
        aria-hidden={!selected}
        onClick={() => setSelected(null)}
        className={`fixed inset-0 z-[60] bg-ink/80 transition-opacity duration-300 ${
          selected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={selected?.title}
        aria-hidden={!selected}
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
          selected ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {selected && (
          <div
            className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-ink text-paper-light border border-paper-light/15 transition-transform duration-300 ${
              selected ? "translate-y-0 scale-100" : "translate-y-2 scale-[0.98]"
            }`}
          >
            <div className="flex items-center justify-end px-6 md:px-10 py-5">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light/60 hover:text-paper-light transition-colors"
              >
                Fermer
              </button>
            </div>

            <div className="px-6 md:px-10 pb-10 md:pb-14 grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14 items-center">
              {selected.image ? (
                <div
                  className={`relative ${ASPECT[selected.format]} w-full overflow-hidden grain border border-paper-light/15`}
                >
                  <Image
                    src={selected.image.src}
                    alt={selected.image.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <Plate
                  tone={selected.tone}
                  matted
                  className={`${ASPECT[selected.format]} w-full`}
                />
              )}

              <div>
                <WallLabel piece={selected} artist={selectedArtist} dark full />
                <Link
                  href={`/galerie/${selected.slug}`}
                  className="mt-6 inline-flex items-center font-utility text-[11px] uppercase tracking-[0.16em] border-b border-paper-light/50 pb-1"
                >
                  Voir la fiche complète →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
