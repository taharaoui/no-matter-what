const API_VERSION = "2024-10";

/** Domain env var is occasionally written with a scheme/trailing slash by
 *  Vercel's Shopify auto-sync — stripped defensively rather than assumed.
 *
 *  Vercel's auto-sync has also changed which *name* it writes under between
 *  store connections: SHOPIFY_STORE_DOMAIN is what it provisions today,
 *  NMW_SHOP_SHOPIFY_STORE_DOMAIN was the name under an earlier connection
 *  (and is why the storefront went silently empty after reconnecting to a
 *  new store — the code was still reading the old name, which no longer
 *  existed). Both are checked, newest first, so a future re-sync back to
 *  the old naming doesn't break this again. */
function endpoint(): string {
  const raw =
    process.env.SHOPIFY_STORE_DOMAIN ?? process.env.NMW_SHOP_SHOPIFY_STORE_DOMAIN;
  if (!raw) {
    throw new ShopifyApiError(
      "SHOPIFY_STORE_DOMAIN (or NMW_SHOP_SHOPIFY_STORE_DOMAIN) is not set"
    );
  }
  const domain = raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
}

export class ShopifyApiError extends Error {}

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

type FetchOpts =
  /* Time-based revalidation (ISR) — the default for catalog reads. Tags let
     a future webhook call revalidateTag("products") for instant updates
     instead of waiting out the window. */
  | { cache?: never; revalidate: number | false; tags?: string[] }
  /* Always-fresh — required for cart reads/writes, which are per-session
     and must never be served from the shared Data Cache. */
  | { cache: "no-store"; revalidate?: never; tags?: never };

export async function shopifyFetch<TData>(
  query: string,
  variables?: Record<string, unknown>,
  opts: FetchOpts = { revalidate: 60, tags: ["products"] }
): Promise<TData> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
        process.env.NMW_SHOP_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
        "",
    },
    body: JSON.stringify({ query, variables }),
    ...(opts.cache === "no-store"
      ? { cache: "no-store" as const }
      : { next: { revalidate: opts.revalidate, tags: opts.tags } }),
  });

  if (!res.ok) {
    throw new ShopifyApiError(`Shopify API responded ${res.status}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new ShopifyApiError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new ShopifyApiError("Shopify API returned no data");
  }

  return json.data;
}
