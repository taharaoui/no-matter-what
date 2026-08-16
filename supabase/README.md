# Supabase setup notes

No Supabase CLI is wired into this repo yet — `migrations/` here is a
manual record, applied directly against the project's Postgres connection
string, not run via `supabase db push`. If the CLI gets adopted later,
this file is the starting point for `supabase db pull`.

## What's *not* in a `.sql` file (done via the dashboard/API instead)

- **Auth user** — one admin (`raoui.taha03@gmail.com`), created via the
  GoTrue admin API. Change the password from **Authentication → Users**
  in the Supabase dashboard if a new one is needed; there's no
  in-product "forgot password" flow built for `/admin` yet.
- **Storage bucket** `content-images` — public read, 8MB limit, image
  MIME types only. Created via the Storage API
  (`POST /storage/v1/bucket`), not SQL. RLS on `storage.objects` for
  writes to this bucket *is* in the migration.

## Migrations

- `20260816162505_admin_panel.sql` — RLS for `/admin`'s write access on
  the four pre-existing content tables, the new `about_content` table
  (and its seed, seeded from what was hardcoded in `/a-propos` at the
  time), and the Storage write policy.
