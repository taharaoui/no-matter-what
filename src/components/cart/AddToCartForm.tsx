"use client";

import { useMemo, useState } from "react";
import { useCart } from "./CartContext";
import type { Product } from "@/lib/shopify";

/* Generic across any product shape — not hardcoded to the demo store's
   single "Tote Bag" variant. A product whose only option is Shopify's
   synthetic "Title"/"Default Title" (today's case) skips the picker
   entirely; a real store's Size/Color options render as buttons with no
   code change needed here. */
export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem, isPending } = useCart();

  const hasRealOptions = product.options.some(
    (option) => !(option.name === "Title" && option.values.length === 1)
  );

  const firstAvailable = product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (firstAvailable?.selectedOptions ?? []).map((o) => [o.name, o.value])
    )
  );
  const [quantity, setQuantity] = useState(1);

  const matchedVariant = useMemo(
    () =>
      product.variants.find((variant) =>
        variant.selectedOptions.every((o) => selected[o.name] === o.value)
      ),
    [product.variants, selected]
  );

  const canAdd = !!matchedVariant && matchedVariant.availableForSale && !isPending;

  return (
    <div className="mt-8">
      {hasRealOptions &&
        product.options.map((option) => (
          <div key={option.id} className="mb-6">
            <p className="font-utility text-[11px] uppercase tracking-[0.14em] text-ink-soft/60 mb-3">
              {option.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const active = selected[option.name] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                    className={`border px-4 py-2 font-utility text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-ink bg-ink text-paper-light"
                        : "border-ink/25 text-ink-soft/80 hover:border-ink"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-ink/20">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-11 w-11 grid place-items-center font-utility text-sm hover:bg-ink/5 transition-colors"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span className="font-utility text-sm w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-11 w-11 grid place-items-center font-utility text-sm hover:bg-ink/5 transition-colors"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>

        <button
          type="button"
          disabled={!canAdd}
          onClick={() => matchedVariant && addItem(matchedVariant.id, quantity)}
          className="flex-1 border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          {matchedVariant?.availableForSale === false
            ? "Épuisé"
            : isPending
              ? "Ajout…"
              : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}
