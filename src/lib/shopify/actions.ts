"use server";

import { cookies } from "next/headers";
import { addCartLines, createCart, removeCartLines, updateCartLines } from "./index";
import { CART_COOKIE_NAME } from "./cart";
import type { Cart } from "./types";

/* Not exported — every export from a "use server" file becomes a callable
   Server Action, so cookie plumbing stays private and only the three
   actions below are reachable from the client. */

async function readCartId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(CART_COOKIE_NAME)?.value;
}

async function persistCartId(cartId: string): Promise<void> {
  const store = await cookies();
  store.set(CART_COOKIE_NAME, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 60, // 60 days
  });
}

type CartActionResult = { cart?: Cart; error?: string };

export async function addToCartAction(
  merchandiseId: string,
  quantity: number = 1
): Promise<CartActionResult> {
  try {
    const cartId = await readCartId();
    if (!cartId) {
      const cart = await createCart([{ merchandiseId, quantity }]);
      await persistCartId(cart.id);
      return { cart };
    }

    try {
      const cart = await addCartLines(cartId, [{ merchandiseId, quantity }]);
      return { cart };
    } catch {
      // Stored cart id is stale (expired/completed) — self-heal with a fresh cart.
      const cart = await createCart([{ merchandiseId, quantity }]);
      await persistCartId(cart.id);
      return { cart };
    }
  } catch (err) {
    console.error("[shopify] addToCartAction failed:", err);
    return { error: "Impossible d'ajouter cet article au panier." };
  }
}

export async function removeFromCartAction(lineId: string): Promise<CartActionResult> {
  try {
    const cartId = await readCartId();
    if (!cartId) return { error: "Panier introuvable." };
    const cart = await removeCartLines(cartId, [lineId]);
    return { cart };
  } catch (err) {
    console.error("[shopify] removeFromCartAction failed:", err);
    return { error: "Impossible de retirer cet article." };
  }
}

export async function updateCartLineAction(
  lineId: string,
  quantity: number
): Promise<CartActionResult> {
  try {
    const cartId = await readCartId();
    if (!cartId) return { error: "Panier introuvable." };

    if (quantity <= 0) {
      const cart = await removeCartLines(cartId, [lineId]);
      return { cart };
    }

    const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
    return { cart };
  } catch (err) {
    console.error("[shopify] updateCartLineAction failed:", err);
    return { error: "Impossible de mettre à jour la quantité." };
  }
}
