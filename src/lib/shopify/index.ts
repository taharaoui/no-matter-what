import { shopifyFetch, ShopifyApiError } from "./client";
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  PRODUCTS_BY_COLLECTION_QUERY,
  CART_QUERY,
} from "./queries";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
} from "./mutations";
import {
  edgesToNodes,
  reshapeCart,
  reshapeCollection,
  reshapeProduct,
  reshapeProductListItem,
  type RawCart,
  type RawCollectionsData,
  type RawProductByHandleData,
  type RawProductsByCollectionData,
  type RawProductsData,
} from "./reshape";
import type { Cart, CartLineInput, Collection, Product, ProductListItem } from "./types";

export type {
  Cart,
  CartLine,
  CartLineInput,
  Collection,
  Product,
  ProductListItem,
  ProductImage,
  Money,
} from "./types";
export { ShopifyApiError };

type UserError = { field: string[] | null; message: string };

/* List/detail reads degrade to empty rather than throw — these pages
   depend on an external store that may be unreachable or, today, a
   placeholder with a tiny catalog; a broken Shopify connection must not
   break the page. */

export async function getProducts(): Promise<ProductListItem[]> {
  try {
    const data = await shopifyFetch<RawProductsData>(PRODUCTS_QUERY, { first: 100 });
    return edgesToNodes(data.products).map(reshapeProductListItem);
  } catch (err) {
    console.error("[shopify] getProducts failed:", err);
    return [];
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const data = await shopifyFetch<RawCollectionsData>(COLLECTIONS_QUERY, { first: 20 });
    return edgesToNodes(data.collections).map(reshapeCollection);
  } catch (err) {
    console.error("[shopify] getCollections failed:", err);
    return [];
  }
}

export async function getProductsByCollection(handle: string): Promise<ProductListItem[]> {
  try {
    const data = await shopifyFetch<RawProductsByCollectionData>(PRODUCTS_BY_COLLECTION_QUERY, {
      handle,
      first: 100,
    });
    if (!data.collection) return [];
    return edgesToNodes(data.collection.products).map(reshapeProductListItem);
  } catch (err) {
    console.error("[shopify] getProductsByCollection failed:", err);
    return [];
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<RawProductByHandleData>(PRODUCT_BY_HANDLE_QUERY, { handle });
    return data.product ? reshapeProduct(data.product) : null;
  } catch (err) {
    console.error("[shopify] getProduct failed:", err);
    return null;
  }
}

/* Cart reads/writes throw — src/lib/shopify/actions.ts is the layer that
   catches these and turns them into a UI-facing { error } result. */

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(CART_QUERY, { cartId }, {
    cache: "no-store",
  });
  return data.cart ? reshapeCart(data.cart) : null;
}

function assertNoUserErrors(userErrors: UserError[], action: string) {
  if (userErrors.length > 0) {
    throw new ShopifyApiError(`${action}: ${userErrors.map((e) => e.message).join("; ")}`);
  }
}

export async function createCart(lines?: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart | null; userErrors: UserError[] };
  }>(CART_CREATE_MUTATION, { lines }, { cache: "no-store" });
  assertNoUserErrors(data.cartCreate.userErrors, "cartCreate");
  if (!data.cartCreate.cart) throw new ShopifyApiError("cartCreate returned no cart");
  return reshapeCart(data.cartCreate.cart);
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart | null; userErrors: UserError[] };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines }, { cache: "no-store" });
  assertNoUserErrors(data.cartLinesAdd.userErrors, "cartLinesAdd");
  if (!data.cartLinesAdd.cart) throw new ShopifyApiError("cartLinesAdd returned no cart");
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart | null; userErrors: UserError[] };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds }, { cache: "no-store" });
  assertNoUserErrors(data.cartLinesRemove.userErrors, "cartLinesRemove");
  if (!data.cartLinesRemove.cart) throw new ShopifyApiError("cartLinesRemove returned no cart");
  return reshapeCart(data.cartLinesRemove.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart | null; userErrors: UserError[] };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines }, { cache: "no-store" });
  assertNoUserErrors(data.cartLinesUpdate.userErrors, "cartLinesUpdate");
  if (!data.cartLinesUpdate.cart) throw new ShopifyApiError("cartLinesUpdate returned no cart");
  return reshapeCart(data.cartLinesUpdate.cart);
}
