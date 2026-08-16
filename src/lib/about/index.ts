import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "../supabase";

/**
 * Real content, backed by Supabase (table: about_content — a single row,
 * id = 1, enforced by a check constraint). /a-propos's prose used to be
 * hardcoded JSX; it's now editable from the admin panel the same way
 * menu and gallery content are.
 */

export type AboutContent = {
  manifestoQuote: string;
  storyEyebrow: string;
  storyHeading: string;
  storyHeadingAccent: string;
  storyParagraphs: string[];
  storyPullquote: string;
  storyImage: string;
  whyNameHeading: string;
  whyNameHeadingAccent: string;
  whyNameParagraphs: string[];
  closingText: string;
};

type AboutContentRow = {
  id: number;
  manifesto_quote: string;
  story_eyebrow: string;
  story_heading: string;
  story_heading_accent: string;
  story_paragraphs: string[];
  story_pullquote: string;
  story_image: string;
  why_name_heading: string;
  why_name_heading_accent: string;
  why_name_paragraphs: string[];
  closing_text: string;
};

function reshape(row: AboutContentRow): AboutContent {
  return {
    manifestoQuote: row.manifesto_quote,
    storyEyebrow: row.story_eyebrow,
    storyHeading: row.story_heading,
    storyHeadingAccent: row.story_heading_accent,
    storyParagraphs: row.story_paragraphs,
    storyPullquote: row.story_pullquote,
    storyImage: row.story_image,
    whyNameHeading: row.why_name_heading,
    whyNameHeadingAccent: row.why_name_heading_accent,
    whyNameParagraphs: row.why_name_paragraphs,
    closingText: row.closing_text,
  };
}

/* Degrades to null rather than throw — same policy as lib/menu and
   lib/gallery: a broken Supabase connection must not take /a-propos
   down. The page falls back to the last-known copy baked in at the call
   site if this returns null (see app/a-propos/page.tsx). */
export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const { data, error } = await getSupabase()
      .from("about_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return data ? reshape(data as AboutContentRow) : null;
  } catch (err) {
    console.error("[supabase] getAboutContent failed:", err);
    return null;
  }
}

export type AboutContentInput = Omit<AboutContent, never>;

/* Admin write — takes an authenticated, request-scoped client (see
   lib/menu/index.ts's writes for why) and throws on failure; caught by
   lib/about/actions.ts. */
export async function updateAboutContent(
  db: SupabaseClient,
  input: AboutContentInput
): Promise<void> {
  const { error } = await db
    .from("about_content")
    .update({
      manifesto_quote: input.manifestoQuote,
      story_eyebrow: input.storyEyebrow,
      story_heading: input.storyHeading,
      story_heading_accent: input.storyHeadingAccent,
      story_paragraphs: input.storyParagraphs,
      story_pullquote: input.storyPullquote,
      story_image: input.storyImage,
      why_name_heading: input.whyNameHeading,
      why_name_heading_accent: input.whyNameHeadingAccent,
      why_name_paragraphs: input.whyNameParagraphs,
      closing_text: input.closingText,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) throw error;
}
