import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Plate from "@/components/ui/Plate";
import AddToCartForm from "@/components/cart/AddToCartForm";
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

  return {
    title: product.title,
    description: product.description || undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const [primaryImage, ...restImages] = product.images;

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
      <Link
        href="/boutique"
        className="inline-block font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/50 hover:text-ink transition-colors mb-12"
      >
        ← La boutique
      </Link>

      <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-20">
        <div>
          {primaryImage ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden grain border border-ink/10">
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText ?? product.title}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <Plate tone="grey300" className="aspect-[4/5] w-full" />
          )}

          {restImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {restImages.map((image) => (
                <div
                  key={image.url}
                  className="relative aspect-square overflow-hidden grain border border-ink/10"
                >
                  <Image
                    src={image.url}
                    alt={image.altText ?? product.title}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-md">
          <h1 className="font-display text-3xl md:text-4xl leading-tight">{product.title}</h1>
          <p className="font-utility text-sm text-grey-700 mt-4">
            {formatMoney(product.priceRange.min)}
          </p>

          {product.description && (
            <p className="mt-6 text-ink-soft/85 leading-relaxed">{product.description}</p>
          )}

          <AddToCartForm product={product} />
        </div>
      </div>
    </section>
  );
}
