import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Logo from "@/components/brand/Logo";
import ContactForm from "@/components/contact/ContactForm";
import { ADDRESS_LINES, HOURS_LINES, MAPS_URL } from "@/lib/business";

const OFFRE = [
  {
    title: "Le café de spécialité",
    text: "Cafés et matchas travaillés avec soin, smoothies, sandwichs grillés, croffles, salades fraîches et desserts maison.",
    href: "/menu",
    cta: "Voir le menu",
  },
  {
    title: "La galerie",
    text: "Les toiles de Julie habillent les murs entre les tables — l'art comme raison de s'attarder, pas comme décor.",
    href: "/galerie",
    cta: "Voir la galerie",
  },
  {
    title: "Le bar à fleurs",
    text: "Roses éternelles sous cloche de verre, bouquets frais composés sur place, précommandes chaque semaine.",
    href: "/fleurs",
    cta: "Voir les fleurs",
  },
  {
    title: "La boutique",
    text: "Céramique et créations choisies pour durer, plutôt que pour plaire une saison.",
    href: "/boutique",
    cta: "Voir la boutique",
  },
] as const;

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Café de spécialité, galerie d'art et bar à fleurs signés Julie Lalonde. Découvrez NMW, adresse hybride à Sainte-Marthe-sur-le-Lac, entre Laurentides et Deux-Montagnes.",
};

export default function AProposPage() {
  return (
    <>
      <PageIntro
        eyebrow="À propos"
        title="Café à Sainte-Marthe-sur-le-Lac :"
        titleAccent="NMW, où le café, l'art et les fleurs se rencontrent."
        lede="L'histoire de Julie Lalonde, et de la porte qu'elle a choisi d'ouvrir."
      />

      {/* The one sentence the name is built on — same treatment as the
          homepage Manifesto section, scoped to this page. */}
      <section className="bg-ink text-paper-light py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 md:px-10 text-center">
          <p className="font-display italic text-3xl md:text-5xl leading-[1.15]">
            &ldquo;Renaître n&apos;est pas recommencer. C&apos;est ouvrir un
            café, no matter what.&rdquo;
          </p>
        </div>
      </section>

      {/* Julie's story — the founding event, told once, at length, with the
          real portrait rather than a stand-in photo. */}
      <section className="bg-paper text-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-[22rem_1fr] gap-12 md:gap-16">
          <div>
            <div className="aspect-[4/5] relative overflow-hidden grain border border-ink/10">
              <Image
                src="/images/julie-lalonde.jpg"
                alt="Julie Lalonde dans son atelier"
                fill
                sizes="(min-width: 768px) 22rem, 90vw"
                className="object-cover object-[58%_35%]"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              L&apos;histoire de Julie Lalonde
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
              De la toile <span className="italic">au comptoir.</span>
            </h2>

            <div className="flex flex-col gap-6 text-ink-soft/90 leading-[1.75]">
              <p>
                Tout commence à Huberdeau, dans les Laurentides, là où le
                silence et la forêt apprennent à regarder longtemps avant de
                parler. Julie Lalonde y grandit avec un crayon greffé à la
                main — les marges de son agenda d&apos;école se remplissent
                de croquis et de poèmes bien avant qu&apos;elle ne se dise
                artiste. Autodidacte, elle n&apos;a jamais suivi d&apos;école
                d&apos;art. Elle a simplement continué à créer, envers et
                contre tout.
              </p>
              <p>
                La peinture, elle, arrive plus tard — dans la rupture. Le
                diagnostic de cancer de son père, puis son départ trois mois
                plus tard, la laissent sans souffle. Elle prend un pinceau
                pour la première fois non pas pour faire joli, mais pour
                survivre à ce qui n&apos;a pas de mots. Peindre devient une
                manière de déposer ce qui pèse trop.
              </p>
              <p>
                De cette ouverture naît une pratique multidisciplinaire : un
                certificat en arts visuels, puis la photographie, la
                sculpture, le tatouage. En 2014, elle organise son premier
                événement artistique — un rassemblement d&apos;artistes
                d&apos;ici, déjà une façon de bâtir une communauté plutôt
                qu&apos;une carrière en solo. Son parcours se poursuit avec{" "}
                <em>Toutes c&apos;Elles</em>, une exposition intime portée par
                des histoires de femmes, de force et de transformation.
              </p>
            </div>

            <p className="mt-8 border-l border-ink/40 pl-6 font-display italic text-xl md:text-2xl leading-snug text-ink">
              Renaître n&apos;est pas recommencer. Renaître, c&apos;est
              devenir soi-même — même dans l&apos;imperfection.
            </p>
          </div>
        </div>
      </section>

      {/* Why the name, why this place. */}
      <section className="bg-grey-100 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 max-w-3xl">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
            Pourquoi ce nom
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
            No Matter What. <span className="italic">Peu importe.</span>
          </h2>
          <div className="flex flex-col gap-6 text-ink-soft/90 leading-[1.75]">
            <p>
              C&apos;est la phrase qui a porté Julie à travers la perte, le
              doute, les recommencements — et c&apos;est celle qu&apos;elle a
              choisie pour ouvrir un lieu. Pas un café de plus, mais une toile
              grandeur nature : un endroit où l&apos;art, la matière et
              l&apos;accueil vivent sous le même toit, avec la même logique
              que sa peinture — laisser une place à ce qui est brut, vrai,
              parfois imparfait.
            </p>
            <p>
              C&apos;est ainsi qu&apos;est né ce{" "}
              <strong className="font-semibold text-ink">
                café à Sainte-Marthe-sur-le-Lac
              </strong>
              , au 3054A chemin d&apos;Oka, entre Deux-Montagnes et
              Saint-Eustache, en plein cœur des Laurentides. NMW y a ouvert
              ses portes le 3 juillet — un café de spécialité pensé comme une
              extension de l&apos;atelier, où l&apos;on n&apos;entre pas
              seulement pour commander un café, mais dans l&apos;univers
              d&apos;une artiste.
            </p>
          </div>
        </div>
      </section>

      {/* What's actually here — four short cards, each linking out to its
          own page rather than repeating the homepage's Pillars grid. */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
            Sous un même toit
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-14 max-w-2xl">
            Ce qu&apos;on y trouve.
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {OFFRE.map((item) => (
              <div key={item.title} className="border-t border-ink/10 pt-6">
                <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                <p className="text-[0.95rem] text-ink-soft/80 leading-relaxed mb-4">
                  {item.text}
                </p>
                <Link
                  href={item.href}
                  className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-ink pb-1"
                >
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address + hours laid out plainly, and the one way to write in
          instead of showing up — grey-100 breaks the paper/ink alternation
          the same way "Pourquoi ce nom" does above it. */}
      <section className="bg-grey-100 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Nous trouver
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
              Passez nous voir.
            </h2>

            <div className="text-ink-soft/90 leading-[1.75]">
              {ADDRESS_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-6 text-ink-soft/90 leading-[1.75]">
              {HOURS_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors"
            >
              Obtenir l&apos;itinéraire
            </a>
          </div>

          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Nous écrire
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
              Une question, un projet ?
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Closing — same door-not-a-form pattern as /fleurs and /galerie. */}
      <section className="bg-ink text-paper-light grain">
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36 flex flex-col items-center text-center">
          <Logo variant="lockup" className="w-[min(58vw,340px)] h-auto" />

          <p className="mt-14 max-w-md text-paper-light/70 leading-relaxed">
            NMW ne se raconte pas vraiment — ça se visite. Passez au 3054A
            chemin d&apos;Oka, à Sainte-Marthe-sur-le-Lac, pour un café, une
            œuvre ou un bouquet. Peu importe la raison : la porte s&apos;ouvre
            pareil.
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
              href="/galerie"
              className="inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors"
            >
              L&apos;accrochage en cours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
