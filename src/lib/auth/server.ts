import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/* Session-aware client for Server Components and Server Actions — unlike
   lib/supabase.ts's anon singleton (public reads only, no session), this
   one carries the admin's own cookies, so RLS's "authenticated" policies
   see the real signed-in user rather than the anon role. Every admin
   write must go through this, not the singleton. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render, where cookies can't
            // be written — middleware.ts is what actually refreshes the
            // session cookie on the way in, so this is safe to ignore.
          }
        },
      },
    }
  );
}
