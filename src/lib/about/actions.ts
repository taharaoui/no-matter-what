"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { updateAboutContent, type AboutContentInput } from "./index";

type ActionResult = { error?: string };

export async function updateAboutContentAction(input: AboutContentInput): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    await updateAboutContent(supabase, input);
    revalidatePath("/a-propos");
    revalidatePath("/admin/about");
    return {};
  } catch (err) {
    console.error("[admin] updateAboutContentAction failed:", err);
    return { error: "Impossible d'enregistrer les modifications." };
  }
}
