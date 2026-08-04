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

/** Card-length excerpt — cuts on a word boundary rather than mid-word. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
