import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "../supabase";

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

/* Raw row shapes, exported for the admin panel — the public MenuSection/
   MenuItem types above deliberately drop section_id/sort_order/row id
   since public pages never link to or reorder a single row, but the
   admin list/edit views need exactly those to know what they're editing. */
export type MenuSectionRow = {
  id: string;
  title: string;
  intro: string | null;
  cover_src: string;
  cover_alt: string;
  sort_order: number;
};

export type MenuItemRow = {
  id: number;
  section_id: string;
  name: string;
  description: string | null;
  price: string | null;
  note: string | null;
  image: string | null;
  tags: string[] | null;
  sort_order: number;
};

type SectionRow = MenuSectionRow;
type ItemRow = Omit<MenuItemRow, "id">;

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

/* --- Admin reads/writes below. Reads still degrade to empty on error
   (the admin list page shouldn't hard-crash on a network blip either),
   but writes throw — lib/menu/actions.ts is the layer that catches them
   and turns them into a UI-facing { error } result, same split as
   lib/shopify/index.ts's cart reads vs. writes. Every write takes an
   authenticated, request-scoped client (from requireAdmin()) rather than
   the anon singleton above, so RLS's "authenticated" policies actually
   see the signed-in admin. */

export async function getMenuSections(): Promise<MenuSectionRow[]> {
  try {
    const { data, error } = await getSupabase()
      .from("menu_sections")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data as MenuSectionRow[];
  } catch (err) {
    console.error("[supabase] getMenuSections failed:", err);
    return [];
  }
}

export async function getMenuItems(): Promise<MenuItemRow[]> {
  try {
    const { data, error } = await getSupabase()
      .from("menu_items")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data as MenuItemRow[];
  } catch (err) {
    console.error("[supabase] getMenuItems failed:", err);
    return [];
  }
}

export type SectionInput = Omit<MenuSectionRow, "id"> & { id: string };

export async function createSection(db: SupabaseClient, input: SectionInput): Promise<void> {
  const { error } = await db.from("menu_sections").insert(input);
  if (error) throw error;
}

export async function updateSection(
  db: SupabaseClient,
  id: string,
  input: Partial<SectionInput>
): Promise<void> {
  const { error } = await db.from("menu_sections").update(input).eq("id", id);
  if (error) throw error;
}

/** ON DELETE CASCADE on menu_items.section_id — deleting a section takes
 *  its items with it. The confirm UI warns about this before calling in. */
export async function deleteSection(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from("menu_sections").delete().eq("id", id);
  if (error) throw error;
}

export type ItemInput = Omit<MenuItemRow, "id">;

export async function createItem(db: SupabaseClient, input: ItemInput): Promise<void> {
  const { error } = await db.from("menu_items").insert(input);
  if (error) throw error;
}

export async function updateItem(
  db: SupabaseClient,
  id: number,
  input: Partial<ItemInput>
): Promise<void> {
  const { error } = await db.from("menu_items").update(input).eq("id", id);
  if (error) throw error;
}

export async function deleteItem(db: SupabaseClient, id: number): Promise<void> {
  const { error } = await db.from("menu_items").delete().eq("id", id);
  if (error) throw error;
}
