import type { Money } from "./types";

/* Matches the site's existing price convention (fr-CA, comma decimal,
   dollar-sign suffix — "26,95 $"), already used throughout src/lib/menu.ts
   and the flower pre-order copy. */
export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}
