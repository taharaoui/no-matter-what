"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { formatMoney } from "@/lib/shopify/format";

/* Reuses the same body-scroll-lock pattern as Header.tsx's mobile nav
   panel — the two overlays never open at once, but the mechanism is
   identical, so it's copied rather than shared through a hook for two
   call sites. */
export default function CartDrawer() {
  const { cart, isOpen, closeCart, isPending, error, removeItem, updateItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const lines = cart?.lines ?? [];

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-paper text-ink flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-ink/10">
          <p className="font-display text-2xl">Panier</p>
          <button
            type="button"
            onClick={closeCart}
            className="font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink transition-colors"
          >
            Fermer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="text-ink-soft/70 leading-relaxed">Votre panier est vide.</p>
          ) : (
            <ul className="flex flex-col gap-8">
              {lines.map((line) => {
                const variantLabel =
                  line.merchandise.title !== "Default Title" ? line.merchandise.title : null;
                const image = line.merchandise.product.featuredImage;
                return (
                  <li key={line.id} className="flex gap-4">
                    <div className="relative w-20 aspect-[4/5] shrink-0 overflow-hidden grain border border-ink/10">
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText ?? line.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg leading-snug">
                        {line.merchandise.product.title}
                      </p>
                      {variantLabel && (
                        <p className="font-utility text-[11px] uppercase tracking-[0.1em] text-ink-soft/50 mt-1">
                          {variantLabel}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={isPending}
                          className="h-7 w-7 border border-ink/20 grid place-items-center font-utility text-sm hover:border-ink transition-colors disabled:opacity-40"
                          aria-label="Diminuer la quantité"
                        >
                          −
                        </button>
                        <span className="font-utility text-sm w-4 text-center">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={isPending}
                          className="h-7 w-7 border border-ink/20 grid place-items-center font-utility text-sm hover:border-ink transition-colors disabled:opacity-40"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(line.id)}
                          disabled={isPending}
                          className="ml-auto font-utility text-[10px] uppercase tracking-[0.12em] text-ink-soft/50 hover:text-ink transition-colors disabled:opacity-40"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                    <p className="font-utility text-sm text-grey-700 whitespace-nowrap">
                      {formatMoney(line.cost.totalAmount)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}

          {error && (
            <p className="mt-6 font-utility text-[11px] uppercase tracking-[0.1em] text-ink-soft/70 border-t border-ink/10 pt-4">
              {error}
            </p>
          )}
        </div>

        {cart && lines.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6">
            <div className="flex items-center justify-between font-utility text-sm mb-5">
              <span className="uppercase tracking-[0.14em] text-ink-soft/60">Sous-total</span>
              <span>{formatMoney(cart.cost.subtotalAmount)}</span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="flex items-center justify-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors"
            >
              Passer à la caisse
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
