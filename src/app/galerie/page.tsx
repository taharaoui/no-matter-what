import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Plate from "@/components/ui/Plate";
import WallLabel from "@/components/ui/WallLabel";
import GalerieContactForm from "@/components/gallery/GalerieContactForm";
import { PIECES, ARTISTS, GALERIE_INTRO, ARTIST_BY_SLUG } from "@/lib/gallery";

const ADDRESS_QUERY = "3054A Chemin d'Oka, Sainte-Marthe-sur-le-Lac, QC J0N 1P0";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`;

export const metadata: Metadata = {
  title: "Galerie",
  description: `${GALERIE_INTRO.title} ${GALERIE_INTRO.titleAccent} — les œuvres de Julie Lalonde exposées en continu à la galerie No Matter What.`,
};

const ASPECT = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[5/3]",
} as const;

export default function GaleriePage() {
  const artist = ARTISTS[0];
  const featured = PIECES.find((p) => p.featured) ?? PIECES[0];
  const rest = PIECES.filter((p) => p !== featured);

  return (
    <>
      <PageIntro
        eyebrow={GALERIE_INTRO.eyebrow}
        title={GALERIE_INTRO.title}
        titleAccent={GALERIE_INTRO.titleAccent}
        lede={GALERIE_INTRO.lede}
      />

      {/* Hero — one real photo given the room, a line from her own artist
          statement as the headline. Not a piece in the catalogue below
          (deliberately, so nothing is shown twice back to back): the
          gallery wall itself, the space the works actually hang in. */}
      <section className="relative bg-ink text-paper-light grain overflow-hidden">
        <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] w-full">
          <Image
            src="/images/galerie-portrait-1.jpg"
            alt="Mur de la galerie d'art No Matter What"
            fill
            sizes="100vw"
            className="object-cover object-[35%_30%]"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-20">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] max-w-2xl">
            Rendre visible <span className="italic">l&apos;invisible.</span>
          </h2>
          <p className="mt-6 max-w-md text-paper-light/70 leading-relaxed">
            Chaque œuvre est une tentative de rendre visible l&apos;invisible,
            entre fragilité et intensité.
          </p>
          <Link
            href="#oeuvres"
            className="mt-8 inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors w-fit"
          >
            Voir les œuvres ↓
          </Link>
        </div>
      </section>

      {/* The signature moment: one work given the room it would get on the
          wall, with its label beside it at reading distance. Everything
          below is the rest of the hang, set smaller and evenly. */}
      <section id="oeuvres" className="bg-ink text-paper-light scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Link
            href={`/galerie/${featured.slug}`}
            className="block group w-full max-w-[430px] mx-auto md:mx-0 md:justify-self-end"
          >
            {featured.image ? (
              <div
                className={`relative ${ASPECT[featured.format]} w-full overflow-hidden grain border border-paper-light/15 transition-opacity group-hover:opacity-90`}
              >
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(min-width: 768px) 430px, 90vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <Plate
                tone={featured.tone}
                matted
                className={`${ASPECT[featured.format]} w-full transition-opacity group-hover:opacity-90`}
              />
            )}
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

      {rest.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-16">
            Le reste de l&apos;accrochage
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {rest.map((piece) => (
              <Link
                key={piece.slug}
                href={`/galerie/${piece.slug}`}
                className="group block"
              >
                {piece.image ? (
                  <div className="relative aspect-[4/5] w-full overflow-hidden grain border border-ink/10 transition-opacity group-hover:opacity-90">
                    <Image
                      src={piece.image.src}
                      alt={piece.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Plate
                    tone={piece.tone}
                    matted
                    className="aspect-[4/5] w-full transition-opacity group-hover:opacity-90"
                  />
                )}
                <div className="mt-6">
                  <WallLabel piece={piece} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-paper-light border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
            L&apos;artiste
          </h2>
          <p className="max-w-xl text-ink-soft/80 leading-relaxed mb-14">
            Nommée, payée sur vente au taux convenu — la même logique qui
            guide le café depuis le début.
          </p>

          <div className="md:grid md:grid-cols-[16rem_1fr] md:gap-16">
            <div className="mb-8 md:mb-0">
              <p className="font-display text-2xl md:text-3xl">{artist.name}</p>
              <p className="font-utility text-[11px] uppercase tracking-[0.12em] text-ink-soft/55 mt-2 leading-relaxed">
                {artist.based}
              </p>
            </div>

            <div className="max-w-2xl">
              <div className="flex flex-col gap-5 text-[0.95rem] leading-relaxed text-ink-soft/85">
                {artist.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {artist.statement && (
                <p className="mt-8 border-l border-ink/40 pl-6 font-display italic text-xl md:text-2xl leading-snug text-ink">
                  {artist.statement}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact + visit, in one closing block above the footer — write in,
          or come see the work in person. Same honesty as the footer's
          newsletter form: nothing is claimed to be wired up that isn't. */}
      <section className="relative bg-ink text-paper-light py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-300 mb-4">
              Une œuvre vous intéresse ?
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
              Écrivez-nous, <span className="italic">ou passez au comptoir.</span>
            </h2>
            <p className="max-w-sm text-paper-light/70 leading-relaxed mb-10">
              Les ventes se font sans commission d&apos;intermédiaire.
              Demandez à voir la fiche complète — elle est derrière la caisse.
            </p>
            <GalerieContactForm />
          </div>

          <div className="font-utility text-sm">
            <p className="uppercase tracking-[0.14em] text-grey-300 mb-2 text-[11px]">
              Venir voir les œuvres
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
              <div>
                <p className="uppercase tracking-[0.14em] text-grey-300 mb-2 text-[11px]">
                  Adresse
                </p>
                <p className="text-paper-light/80 leading-relaxed">
                  3054A Chemin d&apos;Oka
                  <br />
                  Sainte-Marthe-sur-le-Lac, QC J0N 1P0
                </p>
              </div>
              <div>
                <p className="uppercase tracking-[0.14em] text-grey-300 mb-2 text-[11px]">
                  Heures
                </p>
                <p className="text-paper-light/80 leading-relaxed">
                  Lun–Ven — 7h à 18h
                  <br />
                  Sam–Dim — 8h à 17h
                </p>
              </div>
              <div className="col-span-2">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-paper-light/40 px-6 py-3 uppercase tracking-[0.16em] text-[11px] hover:bg-paper-light hover:text-ink transition-colors"
                >
                  Obtenir l&apos;itinéraire
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
