/* Single source for the café's address and hours — was drifting into a
   third independent copy (Footer, /a-propos's CTA) as this file didn't
   exist yet. Update once here rather than in every place it's quoted. */

export const ADDRESS_LINES = [
  "3054A Chemin d'Oka",
  "Sainte-Marthe-sur-le-Lac, QC J0N 1P0",
] as const;

export const HOURS_LINES = [
  "Lun – Ven — 7h à 18h",
  "Sam – Dim — 8h à 17h",
] as const;

const ADDRESS_QUERY = ADDRESS_LINES.join(", ");

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`;
