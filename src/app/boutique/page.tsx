import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Plate from "@/components/ui/Plate";
import { getProducts } from "@/lib/shopify";
import { formatMoney } from "@/lib/shopify/format";

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
          <p className="text-ink-soft/70 leading-relaxed py-16 text-center">
            La boutique en ligne arrive bientôt — passez nous voir en attendant.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {products.map((product) => (
              <Link
                key={product.handle}
                href={`/boutique/${product.handle}`}
                className="group block"
              >
                {product.featuredImage ? (
                  <div className="relative aspect-[4/5] w-full overflow-hidden grain border border-ink/10">
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText ?? product.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                  </div>
                ) : (
                  <Plate tone="grey300" className="aspect-[4/5] w-full" />
                )}

                <div className="mt-6">
                  <h2 className="font-display text-2xl leading-snug">{product.title}</h2>
                  <p className="font-utility text-[11px] uppercase tracking-[0.12em] text-grey-700 mt-3">
                    {formatMoney(product.priceRange.min)}
                    {!product.availableForSale && " · Épuisé"}
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
