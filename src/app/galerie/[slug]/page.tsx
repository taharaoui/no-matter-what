import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Plate from "@/components/ui/Plate";
import WallLabel from "@/components/ui/WallLabel";
import { PIECES, PIECE_BY_SLUG, ARTIST_BY_SLUG } from "@/lib/gallery";

const ASPECT = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[5/3]",
} as const;

export function generateStaticParams() {
  return PIECES.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = PIECE_BY_SLUG[slug];
  if (!piece) return {};

  const artist = ARTIST_BY_SLUG[piece.artist];
  return {
    title: `${piece.title} — ${artist?.name ?? ""}`.trim(),
    description: piece.label,
  };
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = PIECE_BY_SLUG[slug];
  if (!piece) notFound();

  const artist = ARTIST_BY_SLUG[piece.artist];
  const index = PIECES.findIndex((p) => p.slug === piece.slug);
  const next = PIECES[(index + 1) % PIECES.length];
  const others = PIECES.filter(
    (p) => p.artist === piece.artist && p.slug !== piece.slug
  );

  return (
    <>
      {/* The work on an ink wall, its label beside it — the page is the
          piece hung, nothing more. The label component is the same one the
          grid uses, so a work reads identically wherever it appears. */}
      <section className="bg-ink text-paper-light">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
          <Link
            href="/galerie"
            className="inline-block font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light/50 hover:text-paper-light transition-colors mb-12"
          >
            ← L&apos;accrochage
          </Link>

          <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-20 items-center">
            <Plate
              tone={piece.tone}
              matted
              className={`${ASPECT[piece.format]} w-full`}
            />
            <div className="max-w-md">
              <WallLabel piece={piece} dark full />
              {!piece.sold && (
                <p className="mt-6 text-[0.95rem] text-paper-light/60 leading-relaxed">
                  Vente au comptoir, sans commission d&apos;intermédiaire.
                  Demandez la fiche.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <div className="md:grid md:grid-cols-[10rem_1fr] md:gap-20 max-w-4xl">
          <p className="font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700 mb-5 md:mb-0 md:pt-2">
            L&apos;artiste
          </p>
          <div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              {artist?.name}
            </h2>
            <p className="font-utility text-[11px] uppercase tracking-[0.12em] text-ink-soft/50 mt-2">
              {artist?.based}
            </p>
            <p className="mt-6 text-ink-soft/85 leading-relaxed max-w-xl">
              {artist?.bio}
            </p>

            {others.length > 0 && (
              <div className="mt-10">
                <p className="font-utility text-[11px] uppercase tracking-[0.14em] text-ink-soft/50 mb-4">
                  Aussi dans l&apos;accrochage
                </p>
                <ul className="flex flex-col gap-3">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/galerie/${other.slug}`}
                        className="font-display text-xl border-b border-ink/20 hover:border-ink transition-colors"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper-light border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.14em] text-ink-soft/50 mb-3">
              Pièce suivante
            </p>
            <Link
              href={`/galerie/${next.slug}`}
              className="font-display text-3xl md:text-4xl leading-tight"
            >
              {next.title}
              <span className="text-ink-soft/50">, {next.year}</span>
            </Link>
          </div>
          <Link
            href="/galerie"
            className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-ink pb-1 w-fit"
          >
            Tout l&apos;accrochage
          </Link>
        </div>
      </section>
    </>
  );
}
