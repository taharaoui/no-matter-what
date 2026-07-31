import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Plate from "@/components/ui/Plate";
import WallLabel from "@/components/ui/WallLabel";
import { PIECES, ARTISTS, ACCROCHAGE, ARTIST_BY_SLUG } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description: `${ACCROCHAGE.title} ${ACCROCHAGE.titleAccent} — l'accrochage en cours à la galerie No Matter What, du ${ACCROCHAGE.from} au ${ACCROCHAGE.to}.`,
};

const ASPECT = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[5/3]",
} as const;

export default function GaleriePage() {
  const featured = PIECES.find((p) => p.featured) ?? PIECES[0];
  const rest = PIECES.filter((p) => p !== featured);

  return (
    <>
      <PageIntro
        eyebrow={`Accrochage en cours · ${ACCROCHAGE.from} – ${ACCROCHAGE.to}`}
        title={ACCROCHAGE.title}
        titleAccent={ACCROCHAGE.titleAccent}
        lede={ACCROCHAGE.text}
      />

      {/* The signature moment: one work given the room it would get on the
          wall, with its label beside it at reading distance. Everything
          below is the rest of the hang, set smaller and evenly — a gallery
          gives one piece the long wall, not all of them. */}
      <section className="bg-ink text-paper-light">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Capped rather than filling its column: a portrait work at full
              column width runs ~750px tall and strands its own label in the
              middle of an empty ink field. The work should be large enough
              to read as hung, not large enough to be the section. */}
          <Link
            href={`/galerie/${featured.slug}`}
            className="block group w-full max-w-[430px] mx-auto md:mx-0 md:justify-self-end"
          >
            <Plate
              tone={featured.tone}
              matted
              className={`${ASPECT[featured.format]} w-full transition-opacity group-hover:opacity-90`}
            />
          </Link>

          <div className="max-w-md">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-8">
              Pièce en vedette
            </p>
            <WallLabel piece={featured} dark full />
            <Link
              href={`/galerie/${featured.slug}`}
              className="mt-8 inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors"
            >
              La fiche complète
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <h2 className="font-display text-3xl md:text-4xl leading-tight mb-16">
          Le reste de l&apos;accrochage
        </h2>

        {/* One frame size for the whole index. Letting each cell take the
            work's true aspect left short pieces stranded above a hole the
            height of a tall neighbour — and an index is a catalogue, read
            by scanning. The real proportions are on each piece's own page,
            where the work stands on its own. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {rest.map((piece) => (
            <Link
              key={piece.slug}
              href={`/galerie/${piece.slug}`}
              className="group block"
            >
              <Plate
                tone={piece.tone}
                matted
                className="aspect-[4/5] w-full transition-opacity group-hover:opacity-90"
              />
              <div className="mt-6">
                <WallLabel piece={piece} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper-light border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
            Les artistes
          </h2>
          <p className="max-w-xl text-ink-soft/80 leading-relaxed mb-14">
            Chaque artiste est nommé, payé sur vente au taux convenu à
            l&apos;accrochage, et présenté avec ses conditions de travail. La
            même fiche que pour un producteur de café.
          </p>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {ARTISTS.map((artist) => (
              <div
                key={artist.slug}
                className="border-t border-ink/12 pt-6 md:grid md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <div className="mb-3 md:mb-0">
                  <p className="font-display text-xl">{artist.name}</p>
                  <p className="font-utility text-[10px] uppercase tracking-[0.12em] text-ink-soft/50 mt-1">
                    {artist.based}
                  </p>
                </div>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft/80">
                  {artist.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 border-t border-ink/10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-md">
            <h2 className="font-display text-2xl md:text-3xl leading-snug">
              Une pièce vous intéresse ?
            </h2>
            <p className="mt-4 text-ink-soft/80 leading-relaxed">
              Les ventes se font au comptoir, sans commission d&apos;intermédiaire.
              Demandez à voir la fiche — celle de{" "}
              {ARTIST_BY_SLUG[featured.artist]?.name} est derrière la caisse.
            </p>
          </div>
          <Link
            href="/#visite"
            className="inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit whitespace-nowrap"
          >
            Passer nous voir
          </Link>
        </div>
      </section>
    </>
  );
}
