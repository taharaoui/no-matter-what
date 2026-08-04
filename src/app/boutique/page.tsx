import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Plate from "@/components/ui/Plate";
import { getProducts } from "@/lib/shopify";
import { formatMoney, truncate } from "@/lib/shopify/format";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Céramique, cafetières et objets choisis pour durer — la boutique du café No Matter What, à Sainte-Marthe-sur-le-Lac.",
};

export default async function BoutiquePage() {
  const products = await getProducts();

  return (
    <>
      <PageIntro
        eyebrow="La boutique"
        title="Des objets"
        titleAccent="qu'on garde, pas qu'on jette."
        lede="Céramique, cafetières et articles choisis selon un critère unique : durer, plutôt que plaire une saison."
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/boutique/${product.handle}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden grain border border-ink/10">
                  {product.featuredImage ? (
                    <>
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                          product.secondaryImage ? "group-hover:opacity-0" : ""
                        }`}
                      />
                      {/* Second product photo crossfades in on hover — a quiet
                          "here's the other angle" beat, only when the store
                          actually has a second shot for this product. */}
                      {product.secondaryImage && (
                        <Image
                          src={product.secondaryImage.url}
                          alt={product.secondaryImage.altText ?? product.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      )}
                    </>
                  ) : (
                    <Plate tone="grey300" className="absolute inset-0" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {!product.availableForSale && (
                    <span className="absolute top-4 left-4 font-utility text-[10px] uppercase tracking-[0.14em] text-paper-light bg-ink/80 px-2.5 py-1">
                      Épuisé
                    </span>
                  )}

                  <span className="absolute bottom-4 left-4 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Voir le produit →
                  </span>
                </div>

                <div className="mt-6">
                  <h2 className="font-display text-2xl leading-snug">{product.title}</h2>
                  {product.description && (
                    <p className="mt-2 text-[0.9rem] text-ink-soft/70 leading-snug">
                      {truncate(product.description, 80)}
                    </p>
                  )}
                  <p className="font-utility text-[11px] uppercase tracking-[0.12em] text-grey-700 mt-3 flex items-center gap-2">
                    <span>{formatMoney(product.priceRange.min)}</span>
                    {product.compareAtPrice && (
                      <span className="text-grey-500 line-through">
                        {formatMoney(product.compareAtPrice)}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="py-16 md:py-24 flex flex-col items-center text-center">
      <Plate tone="grey100" matted className="w-24 h-24 mb-10" />
      <h2 className="font-display text-2xl md:text-3xl leading-snug max-w-md">
        La boutique en ligne arrive bientôt.
      </h2>
      <p className="mt-4 max-w-sm text-ink-soft/70 leading-relaxed">
        Aucun article n&apos;est publié à la vente en ligne pour le moment —
        passez nous voir au comptoir en attendant, ou revenez sous peu.
      </p>
    </div>
  );
}
