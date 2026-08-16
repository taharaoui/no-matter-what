"use client";

import { createBrowserClient } from "@supabase/ssr";

/* Client Component client — only used by the login form and the image
   upload widget, both of which need the admin's session in the browser
   (Storage uploads go straight from the browser to Supabase, not through
   a Server Action, so the RLS check needs the session to be here too). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
