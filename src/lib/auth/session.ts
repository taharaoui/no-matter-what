import "server-only";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "./server";

/* Called at the top of every admin mutation (see menu/gallery/about's
   actions.ts files) — never trust that middleware.ts already checked, in
   case a Server Action is ever invoked from somewhere it doesn't run.
   Single admin user, so "authenticated" and "admin" are the same thing;
   there's no separate role table to check. */
export async function requireAdmin(): Promise<{ supabase: SupabaseClient; user: User }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return { supabase, user };
}
