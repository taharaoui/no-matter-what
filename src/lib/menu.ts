import { getSupabase } from "./supabase";

/**
 * Real content, backed by Supabase (tables: menu_sections, menu_items).
 * Content now gets added/edited by editing those tables directly, not by
 * a code deploy.
 */

export type MenuItem = {
  name: string;
  /** Not every item has one — only set where there's real copy to show. */
  desc?: string;
  /** Left unset for newly-announced items whose price hasn't been confirmed yet. */
  price?: string;
  /** Shown as a small mono note beside the price — second size, allergens, etc. */
  note?: string;
  /** Real product photo. Most items don't have one yet — MenuItemCard falls
   *  back to a plain card with the name set in Playfair Display rather than
   *  a generic "missing image" placeholder, so this is safe to leave unset. */
  image?: string;
  /** Small badges on the card — e.g. "signature", "végane", "sans gluten".
   *  Free-form rather than a fixed enum, but only ever set when true of the
   *  actual item; never used to imply a claim (allergen-free, etc.) that
   *  hasn't been confirmed. */
  tags?: string[];
};

export type MenuSection = {
  id: string;
  title: string;
  /** One line on why the section exists. Optional — not invented where none was given. */
  intro?: string;
  /** The section's cover tile on /menu — reuses one of the section's own
   *  photographed items rather than a separate category shot, so every
   *  cover is still a real product. Every section has at least one
   *  photographed item, so this is never a placeholder. */
  cover: { src: string; alt: string };
  items: MenuItem[];
};

type SectionRow = {
  id: string;
  title: string;
  intro: string | null;
  cover_src: string;
  cover_alt: string;
  sort_order: number;
};

type ItemRow = {
  section_id: string;
  name: string;
  description: string | null;
  price: string | null;
  note: string | null;
  image: string | null;
  tags: string[] | null;
  sort_order: number;
};

function reshapeItem(row: ItemRow): MenuItem {
  return {
    name: row.name,
    desc: row.description ?? undefined,
    price: row.price ?? undefined,
    note: row.note ?? undefined,
    image: row.image ?? undefined,
    tags: row.tags ?? undefined,
  };
}

/* Degrades to empty rather than throw — same policy as lib/shopify and
   lib/gallery: a broken Supabase connection must not take the page down. */
export async function getMenu(): Promise<MenuSection[]> {
  try {
    const db = getSupabase();
    const [sectionsRes, itemsRes] = await Promise.all([
      db.from("menu_sections").select("*").order("sort_order"),
      db.from("menu_items").select("*").order("sort_order"),
    ]);
    if (sectionsRes.error) throw sectionsRes.error;
    if (itemsRes.error) throw itemsRes.error;

    const sections = sectionsRes.data as SectionRow[];
    const items = itemsRes.data as ItemRow[];

    return sections.map((s) => ({
      id: s.id,
      title: s.title,
      intro: s.intro ?? undefined,
      cover: { src: s.cover_src, alt: s.cover_alt },
      items: items.filter((i) => i.section_id === s.id).map(reshapeItem),
    }));
  } catch (err) {
    console.error("[supabase] getMenu failed:", err);
    return [];
  }
}
