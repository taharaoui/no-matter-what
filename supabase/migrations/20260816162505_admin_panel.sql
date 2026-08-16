-- Admin panel: RLS for the write access the /admin routes need, plus the
-- new about_content table that /a-propos's copy now lives in.
--
-- Already applied directly against the project (via the Postgres
-- connection string, since no Supabase CLI/psql was available in this
-- environment) — this file is the durable record of that change, so the
-- schema isn't only reproducible from a session's scrollback. Written to
-- be safe to re-run (drop-if-exists / if-not-exists throughout).

-- Public read stays open; writes restricted to the single authenticated
-- admin. Single admin user, so "authenticated" and "admin" are the same
-- thing — no separate role table.
alter table menu_sections enable row level security;
alter table menu_items    enable row level security;
alter table artists       enable row level security;
alter table pieces        enable row level security;

drop policy if exists "admin write" on menu_sections;
drop policy if exists "admin write" on menu_items;
drop policy if exists "admin write" on artists;
drop policy if exists "admin write" on pieces;
create policy "admin write" on menu_sections for all to authenticated using (true) with check (true);
create policy "admin write" on menu_items    for all to authenticated using (true) with check (true);
create policy "admin write" on artists       for all to authenticated using (true) with check (true);
create policy "admin write" on pieces        for all to authenticated using (true) with check (true);

-- New singleton table for /a-propos's prose, migrated out of the React
-- component so it's admin-editable. One row (id = 1) enforced by a check
-- constraint rather than a list — this content isn't a repeating list.
create table if not exists about_content (
  id int primary key default 1,
  manifesto_quote text not null,
  story_eyebrow text not null,
  story_heading text not null,
  story_heading_accent text not null,
  story_paragraphs text[] not null,
  story_pullquote text not null,
  story_image text not null,
  why_name_heading text not null,
  why_name_heading_accent text not null,
  why_name_paragraphs text[] not null,
  closing_text text not null,
  updated_at timestamptz not null default now(),
  constraint about_content_singleton check (id = 1)
);

alter table about_content enable row level security;
drop policy if exists "public read" on about_content;
drop policy if exists "admin write" on about_content;
create policy "public read" on about_content for select using (true);
create policy "admin write" on about_content for all to authenticated using (true) with check (true);

-- Storage: the "public" flag on the content-images bucket (created via
-- the Storage API, not SQL — see the setup notes in this migration's
-- companion PR/commit) already makes objects readable via the public URL
-- scheme without an RLS SELECT policy; this covers the admin's own
-- uploads/replacements/deletes.
drop policy if exists "content-images admin write" on storage.objects;
create policy "content-images admin write" on storage.objects
  for all to authenticated
  using (bucket_id = 'content-images')
  with check (bucket_id = 'content-images');

-- Seed about_content from the copy that was hardcoded in
-- src/app/a-propos/page.tsx at the time of this migration. Safe to
-- re-run: does nothing once the row exists.
insert into about_content (
  id, manifesto_quote, story_eyebrow, story_heading, story_heading_accent,
  story_paragraphs, story_pullquote, story_image,
  why_name_heading, why_name_heading_accent, why_name_paragraphs, closing_text
) values (
  1,
  'Renaître n''est pas recommencer. C''est ouvrir un café, no matter what.',
  'L''histoire de Julie Lalonde',
  'De la toile',
  'au comptoir.',
  array[
    'Tout commence à Huberdeau, dans les Laurentides, là où le silence et la forêt apprennent à regarder longtemps avant de parler. Julie Lalonde y grandit avec un crayon greffé à la main — les marges de son agenda d''école se remplissent de croquis et de poèmes bien avant qu''elle ne se dise artiste. Autodidacte, elle n''a jamais suivi d''école d''art. Elle a simplement continué à créer, envers et contre tout.',
    'La peinture, elle, arrive plus tard — dans la rupture. Le diagnostic de cancer de son père, puis son départ trois mois plus tard, la laissent sans souffle. Elle prend un pinceau pour la première fois non pas pour faire joli, mais pour survivre à ce qui n''a pas de mots. Peindre devient une manière de déposer ce qui pèse trop.',
    'De cette ouverture naît une pratique multidisciplinaire : un certificat en arts visuels, puis la photographie, la sculpture, le tatouage. En 2014, elle organise son premier événement artistique — un rassemblement d''artistes d''ici, déjà une façon de bâtir une communauté plutôt qu''une carrière en solo. Son parcours se poursuit avec Toutes c''Elles, une exposition intime portée par des histoires de femmes, de force et de transformation.'
  ],
  'Renaître n''est pas recommencer. Renaître, c''est devenir soi-même — même dans l''imperfection.',
  '/images/julie-lalonde.jpg',
  'No Matter What.',
  'Peu importe.',
  array[
    'C''est la phrase qui a porté Julie à travers la perte, le doute, les recommencements — et c''est celle qu''elle a choisie pour ouvrir un lieu. Pas un café de plus, mais une toile grandeur nature : un endroit où l''art, la matière et l''accueil vivent sous le même toit, avec la même logique que sa peinture — laisser une place à ce qui est brut, vrai, parfois imparfait.',
    'C''est ainsi qu''est né ce café à Sainte-Marthe-sur-le-Lac, au 3054A chemin d''Oka, entre Deux-Montagnes et Saint-Eustache, en plein cœur des Laurentides. NMW y a ouvert ses portes le 3 juillet — un café de spécialité pensé comme une extension de l''atelier, où l''on n''entre pas seulement pour commander un café, mais dans l''univers d''une artiste.'
  ],
  'NMW ne se raconte pas vraiment — ça se visite. Passez au 3054A chemin d''Oka, à Sainte-Marthe-sur-le-Lac, pour un café, une œuvre ou un bouquet. Peu importe la raison : la porte s''ouvre pareil.'
)
on conflict (id) do nothing;
