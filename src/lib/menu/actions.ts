"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import {
  createItem,
  createSection,
  deleteItem,
  deleteSection,
  updateItem,
  updateSection,
  type ItemInput,
  type SectionInput,
} from "./index";

/* Same shape as lib/shopify/actions.ts — requireAdmin() first (never trust
   that middleware.ts already checked), then the actual write, caught into
   a UI-facing { error } rather than left to throw across the client
   boundary. */

type ActionResult = { error?: string };

export async function createSectionAction(input: SectionInput): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await createSection(supabase, input);
    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    return {};
  } catch (err) {
    console.error("[admin] createSectionAction failed:", err);
    return { error: "Impossible de créer la section." };
  }
}

export async function updateSectionAction(
  id: string,
  input: Partial<SectionInput>
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await updateSection(supabase, id, input);
    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    return {};
  } catch (err) {
    console.error("[admin] updateSectionAction failed:", err);
    return { error: "Impossible de modifier la section." };
  }
}

export async function deleteSectionAction(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await deleteSection(supabase, id);
    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    return {};
  } catch (err) {
    console.error("[admin] deleteSectionAction failed:", err);
    return { error: "Impossible de supprimer la section." };
  }
}

export async function createItemAction(input: ItemInput): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await createItem(supabase, input);
    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    return {};
  } catch (err) {
    console.error("[admin] createItemAction failed:", err);
    return { error: "Impossible de créer l'item." };
  }
}

export async function updateItemAction(
  id: number,
  input: Partial<ItemInput>
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await updateItem(supabase, id, input);
    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    return {};
  } catch (err) {
    console.error("[admin] updateItemAction failed:", err);
    return { error: "Impossible de modifier l'item." };
  }
}

export async function deleteItemAction(id: number): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await deleteItem(supabase, id);
    revalidatePath("/menu");
    revalidatePath("/admin/menu");
    return {};
  } catch (err) {
    console.error("[admin] deleteItemAction failed:", err);
    return { error: "Impossible de supprimer l'item." };
  }
}
