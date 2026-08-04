import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Logo from "@/components/brand/Logo";

const ADDRESS_QUERY = "3054A Chemin d'Oka, Sainte-Marthe-sur-le-Lac, QC J0N 1P0";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`;

const PRECOMMANDE = [
  {
    name: "Bouquet de 3 roses",
    desc: "Petites fleurs blanches et verdure",
    price: "26,95",
  },
  {
    name: "Bouquet de 6 roses",
    desc: "Petites fleurs blanches et verdure",
    price: "41,95",
  },
];

export const metadata: Metadata = {
  title: "Fleurs",
  description:
    "Roses éternelles sous cloche de verre et bouquets frais composés sur place — le bar à fleurs du café No Matter What, à Sainte-Marthe-sur-le-Lac.",
};

export default function FleursPage() {
  return (
    <>
      <PageIntro
        eyebrow="Le bar à fleurs"
        title="Des roses"
        titleAccent="qui ne meurent pas."
        lede="Roses éternelles sous cloche de verre, bouquets frais composés sur place — le bar à fleurs a sa propre logique, à part du reste de la boutique."
      />

      <div className="flex flex-col gap-24 md:gap-32 pb-24 md:pb-32">
        {/* Roses éternelles */}
        <section className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Roses éternelles
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5">
              Sous cloche de verre, <span className="italic">sans entretien.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md">
              Des roses préservées, présentées sous cloche — un objet autant
              qu&apos;un bouquet, qui reste sur la tablette bien après que des
              fleurs fraîches auraient fané.
            </p>
          </div>
          <div className="order-1 md:order-2 aspect-[4/5] relative overflow-hidden grain border border-ink/10">
            <Image
              src="/images/fleurs-rose-eternelle.jpg"
              alt="Rose éternelle sous cloche de verre, bar à fleurs NMW"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Bouquets frais */}
        <section className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] relative overflow-hidden grain border border-ink/10">
              <Image
                src="/images/fleurs-bouquet-mixte.jpg"
                alt="Bouquet de fleurs fraîches composé au bar à fleurs NMW"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="aspect-[3/4] relative overflow-hidden grain border border-ink/10 mt-8">
              <Image
                src="/images/fleurs-bouquet-roses.jpg"
                alt="Bouquet de roses fraîches, bar à fleurs NMW"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Bouquets frais
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5">
              Composés sur place, <span className="italic">à la commande.</span>
            </h2>
            <p className="text-ink-soft/85 leading-relaxed max-w-md">
              Assemblés au comptoir plutôt que livrés déjà faits — le bar à
              fleurs compose au fil des arrivages, à côté du café et de la
              galerie.
            </p>
          </div>
        </section>

        {/* Précommande de la semaine */}
        <section className="bg-grey-100 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 md:order-1">
              <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
                Précommande de la semaine
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
                Un bouquet préparé <span className="italic">pour vous, chaque semaine.</span>
              </h2>

              <ul className="max-w-md">
                {PRECOMMANDE.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline gap-6 py-5 border-b border-ink/10 first:border-t first:border-ink/10"
                  >
                    <div className="flex-1">
                      <p className="font-display text-xl">{item.name}</p>
                      <p className="text-[0.95rem] leading-snug text-ink-soft/70 mt-1">
                        {item.desc}
                      </p>
                    </div>
                    <p className="font-utility text-sm text-grey-700 whitespace-nowrap">
                      {item.price} $
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-md text-[0.9rem] text-ink-soft/70 leading-relaxed">
                Composés à la main chez NMW — la fenêtre de précommande
                change chaque semaine.
              </p>

              <Link
                href="/#visite"
                className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
              >
                Précommander un bouquet
              </Link>
            </div>

            <div className="order-1 md:order-2 aspect-[4/5] relative overflow-hidden grain border border-ink/10">
              <Image
                src="/images/fleurs-precommande-roses.jpg"
                alt="Bouquets de roses sur précommande au bar à fleurs NMW"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      {/* La page se referme comme /histoire — la porte, pas un formulaire :
          le bar à fleurs n'a pas de vente en ligne, on renvoie sur place. */}
      <section className="bg-ink text-paper-light grain">
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36 flex flex-col items-center text-center">
          <Logo variant="lockup" className="w-[min(58vw,340px)] h-auto" />

          <p className="mt-14 max-w-md text-paper-light/70 leading-relaxed">
            Le bar à fleurs se trouve au comptoir, avec le café et la galerie
            — une même porte, 3054A Chemin d&apos;Oka.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors"
            >
              Obtenir l&apos;itinéraire
            </a>
            <Link
              href="/boutique"
              className="inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors"
            >
              Voir la boutique
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
