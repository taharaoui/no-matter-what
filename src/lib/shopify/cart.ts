import { cookies } from "next/headers";
import { getCart } from "./index";
import type { Cart } from "./types";

export const CART_COOKIE_NAME = "nmw_cart_id";

/* Read-only — safe to call from a Server Component during render (layout.tsx).
   Cookie *writes* only ever happen inside the Server Actions in ./actions,
   never here. */
export async function getInitialCart(): Promise<Cart | null> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE_NAME)?.value;
  if (!cartId) return null;

  try {
    return await getCart(cartId);
  } catch (err) {
    console.error("[shopify] getInitialCart failed:", err);
    return null;
  }
}
