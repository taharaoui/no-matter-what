import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Plate from "@/components/ui/Plate";
import AddToCartForm from "@/components/cart/AddToCartForm";
import ProductGallery from "@/components/boutique/ProductGallery";
import { getProduct, getProducts } from "@/lib/shopify";
import { formatMoney } from "@/lib/shopify/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};

  const title = product.seo.title || product.title;
  const description = product.seo.description || product.description || undefined;
  const image = product.images[0];

  return {
    title,
    description,
    alternates: { canonical: `/boutique/${product.handle}` },
    openGraph: {
      title,
      description,
      url: `/boutique/${product.handle}`,
      images: image ? [{ url: image.url, width: image.width, height: image.height }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([getProduct(handle), getProducts()]);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.handle !== product.handle)
    .filter((p) => !product.productType || p.productType === product.productType)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || undefined,
    image: product.images.map((img) => img.url),
    sku: product.variants[0]?.id,
    brand: product.vendor ? { "@type": "Brand", name: product.vendor } : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.min.currencyCode,
      lowPrice: product.priceRange.min.amount,
      highPrice: product.priceRange.min.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      offerCount: product.variants.length,
    },
  };

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
      {/* Structured data: Shopify-authored merchant content, not user input —
          still escaped defensively so a stray "</script>" in a title/description
          can't break out of the tag. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link
        href="/boutique"
        className="inline-block font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/50 hover:text-ink transition-colors mb-12"
      >
        ← La boutique
      </Link>

      <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-20">
        <ProductGallery images={product.images} title={product.title} />

        <div className="max-w-md">
          {(product.vendor || product.productType) && (
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-3">
              {[product.vendor, product.productType].filter(Boolean).join(" · ")}
            </p>
          )}

          <h1 className="font-display text-3xl md:text-4xl leading-tight">{product.title}</h1>

          <p className="font-utility text-sm text-grey-700 mt-4 flex items-center gap-3">
            <span>{formatMoney(product.priceRange.min)}</span>
            {product.compareAtPrice && (
              <span className="text-grey-500 line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
            {!product.availableForSale && (
              <span className="text-ink-soft/50">· Épuisé</span>
            )}
          </p>

          {product.description && (
            <p className="mt-6 text-ink-soft/85 leading-relaxed">{product.description}</p>
          )}

          <AddToCartForm product={product} />

          {product.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-ink/10 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-utility text-[10px] uppercase tracking-[0.1em] text-ink-soft/50 border border-ink/15 px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 md:mt-32 pt-16 border-t border-ink/10">
          <h2 className="font-display text-2xl md:text-3xl leading-tight mb-10">
            À voir aussi
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {related.map((item) => (
              <Link key={item.id} href={`/boutique/${item.handle}`} className="group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden grain border border-ink/10">
                  {item.featuredImage ? (
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.altText ?? item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <Plate tone="grey300" className="absolute inset-0" />
                  )}
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-xl leading-snug">{item.title}</h3>
                  <p className="font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700 mt-2">
                    {formatMoney(item.priceRange.min)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
