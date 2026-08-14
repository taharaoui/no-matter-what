import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client for menu and gallery content (see lib/menu.ts,
 * lib/gallery.ts) — both are read exclusively from Server Components, so
 * this deliberately uses the non-public SUPABASE_URL / SUPABASE_ANON_KEY
 * rather than the NEXT_PUBLIC_ variants: nothing here ever needs to reach
 * the browser bundle. Row Level Security on every table only grants
 * public SELECT, so the anon key can't do anything beyond reading the
 * same content this site already shows publicly.
 *
 * Lazily created (same defensive pattern as lib/shopify/client.ts's
 * endpoint()) rather than built at module scope, so importing this file
 * never throws before the env vars are actually needed.
 */
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY are not set");
  }

  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
