"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { createPiece, deletePiece, updatePiece, type PieceInput } from "./index";

type ActionResult = { error?: string };

export async function createPieceAction(input: PieceInput): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await createPiece(supabase, input);
    revalidatePath("/galerie");
    revalidatePath("/");
    revalidatePath("/admin/galerie");
    return {};
  } catch (err) {
    console.error("[admin] createPieceAction failed:", err);
    return { error: "Impossible de créer l'œuvre." };
  }
}

export async function updatePieceAction(
  slug: string,
  input: Partial<PieceInput>
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await updatePiece(supabase, slug, input);
    revalidatePath("/galerie");
    revalidatePath(`/galerie/${slug}`);
    revalidatePath("/");
    revalidatePath("/admin/galerie");
    return {};
  } catch (err) {
    console.error("[admin] updatePieceAction failed:", err);
    return { error: "Impossible de modifier l'œuvre." };
  }
}

export async function deletePieceAction(slug: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await deletePiece(supabase, slug);
    revalidatePath("/galerie");
    revalidatePath("/");
    revalidatePath("/admin/galerie");
    return {};
  } catch (err) {
    console.error("[admin] deletePieceAction failed:", err);
    return { error: "Impossible de supprimer l'œuvre." };
  }
}
