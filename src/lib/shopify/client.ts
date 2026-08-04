const API_VERSION = "2024-10";

/** Domain env var is occasionally written with a scheme/trailing slash by
 *  Vercel's Shopify auto-sync — stripped defensively rather than assumed. */
function endpoint(): string {
  const raw = process.env.NMW_SHOP_SHOPIFY_STORE_DOMAIN;
  if (!raw) throw new ShopifyApiError("NMW_SHOP_SHOPIFY_STORE_DOMAIN is not set");
  const domain = raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
}

export class ShopifyApiError extends Error {}

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

export async function shopifyFetch<TData>(
  query: string,
  variables?: Record<string, unknown>,
  opts?: { cache?: RequestCache }
): Promise<TData> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NMW_SHOP_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
    },
    body: JSON.stringify({ query, variables }),
    cache: opts?.cache ?? "no-store",
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
