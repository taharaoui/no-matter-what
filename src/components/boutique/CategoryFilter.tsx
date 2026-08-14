"use client";

import { useRouter } from "next/navigation";
import type { Collection } from "@/lib/shopify";

type CategoryFilterProps = {
  collections: Collection[];
  selected: string | null;
};

/* Native <select> rather than a button row (unlike /menu's MenuBrowser) —
   this was asked for as "une liste déroulante", and it scales better once
   there are more than a handful of collections. Picking an option
   navigates to /boutique?categorie=<handle>, so the filtered grid is a
   plain server-rendered page and stays linkable/shareable. */
export default function CategoryFilter({ collections, selected }: CategoryFilterProps) {
  const router = useRouter();

  if (collections.length === 0) return null;

  return (
    <div className="mb-10 md:mb-14">
      <label htmlFor="categorie" className="sr-only">
        Filtrer par catégorie
      </label>
      <select
        id="categorie"
        value={selected ?? ""}
        onChange={(e) => {
          const handle = e.target.value;
          router.push(handle ? `/boutique?categorie=${handle}` : "/boutique");
        }}
        className="font-utility text-[11px] uppercase tracking-[0.14em] border border-ink/15 bg-paper text-ink px-4 py-2.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-ink/40"
      >
        <option value="">Toutes les catégories</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.handle}>
            {collection.title}
          </option>
        ))}
      </select>
    </div>
  );
}
