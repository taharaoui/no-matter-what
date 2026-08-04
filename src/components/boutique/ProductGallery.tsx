"use client";

import { useState } from "react";
import Image from "next/image";
import Plate from "@/components/ui/Plate";
import type { ProductImage } from "@/lib/shopify";

export default function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden grain border border-ink/10">
        {active ? (
          <Image
            key={active.url}
            src={active.url}
            alt={active.altText ?? title}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
        ) : (
          <Plate tone="grey300" className="absolute inset-0" />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Voir la photo ${i + 1} de ${title}`}
              aria-current={i === activeIndex}
              className={`relative aspect-square overflow-hidden grain border transition-colors ${
                i === activeIndex ? "border-ink" : "border-ink/10 hover:border-ink/40"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? title}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
