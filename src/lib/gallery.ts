import type { PlateTone } from "@/components/ui/Plate";
import { getSupabase } from "./supabase";

/**
 * Real content, backed by Supabase (tables: artists, pieces — see the
 * migration this was seeded from for the schema). Julie Lalonde is the
 * artist whose work hangs at NMW — a permanent wall, not a rotating
 * accrochage, so there's no exhibition date range here. Pieces are
 * catalogued with confirmed details (photographed, medium, dimensions,
 * availability) as they're documented, never invented ahead of that —
 * content now gets added by editing the Supabase table directly, not by
 * a code deploy.
 */

export type Piece = {
  slug: string;
  title: string;
  artist: string;
  /** Left off rather than guessed when the year isn't confirmed. */
  year?: string;
  medium: string;
  dimensions: string;
  edition?: string;
  /** A price, or an availability phrase (e.g. "Disponible — prix au comptoir"). */
  price?: string;
  sold?: boolean;
  /** Wall-label text: two or three sentences, read standing up. */
  label: string;
  /** Longer text for the piece's own page. */
  note?: string;
  /** The real photo. Falls back to a flat Plate tone for pieces not shot yet. */
  image?: { src: string; alt: string };
  tone: PlateTone;
  /** Portrait, square or landscape — drives the grid. */
  format: "portrait" | "square" | "landscape";
  featured?: boolean;
};

export type Artist = {
  slug: string;
  name: string;
  based: string;
  /** One paragraph per entry, printed in order. */
  bio: string[];
  /** A closing line from her artist statement, set as a pull-quote. */
  statement?: string;
};

type ArtistRow = {
  slug: string;
  name: string;
  based: string;
  bio: string[];
  statement: string | null;
};

type PieceRow = {
  slug: string;
  title: string;
  artist_slug: string;
  year: string | null;
  medium: string;
  dimensions: string;
  edition: string | null;
  price: string | null;
  sold: boolean;
  label: string;
  note: string | null;
  image_src: string | null;
  image_alt: string | null;
  tone: string;
  format: string;
  featured: boolean;
};

function reshapeArtist(row: ArtistRow): Artist {
  return {
    slug: row.slug,
    name: row.name,
    based: row.based,
    bio: row.bio,
    statement: row.statement ?? undefined,
  };
}

function reshapePiece(row: PieceRow): Piece {
  return {
    slug: row.slug,
    title: row.title,
    artist: row.artist_slug,
    year: row.year ?? undefined,
    medium: row.medium,
    dimensions: row.dimensions,
    edition: row.edition ?? undefined,
    price: row.price ?? undefined,
    sold: row.sold,
    label: row.label,
    note: row.note ?? undefined,
    image:
      row.image_src && row.image_alt
        ? { src: row.image_src, alt: row.image_alt }
        : undefined,
    tone: row.tone as PlateTone,
    format: row.format as Piece["format"],
    featured: row.featured,
  };
}

/* Reads degrade to empty rather than throw — same policy as
   lib/shopify/index.ts's getProducts: a broken/unreachable Supabase
   connection must not take the whole page down. */

export async function getArtists(): Promise<Artist[]> {
  try {
    const { data, error } = await getSupabase()
      .from("artists")
      .select("*")
      .order("slug");
    if (error) throw error;
    return (data as ArtistRow[]).map(reshapeArtist);
  } catch (err) {
    console.error("[supabase] getArtists failed:", err);
    return [];
  }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  try {
    const { data, error } = await getSupabase()
      .from("artists")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? reshapeArtist(data as ArtistRow) : null;
  } catch (err) {
    console.error("[supabase] getArtistBySlug failed:", err);
    return null;
  }
}

export async function getPieces(): Promise<Piece[]> {
  try {
    const { data, error } = await getSupabase()
      .from("pieces")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return (data as PieceRow[]).map(reshapePiece);
  } catch (err) {
    console.error("[supabase] getPieces failed:", err);
    return [];
  }
}

export async function getPieceBySlug(slug: string): Promise<Piece | null> {
  try {
    const { data, error } = await getSupabase()
      .from("pieces")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? reshapePiece(data as PieceRow) : null;
  } catch (err) {
    console.error("[supabase] getPieceBySlug failed:", err);
    return null;
  }
}

/** The page's opening section. Permanent wall, not a dated accrochage.
 *  Page copy, not itemized content — stays in code rather than a table. */
export const GALERIE_INTRO = {
  eyebrow: "L'artiste exposée",
  title: "Julie Lalonde,",
  titleAccent: "sur les murs du café.",
  lede: "Peinture, aquarelle, sculpture, photographie, tatouage — une pratique multidisciplinaire ancrée dans l'émotion et l'instinct. Ses œuvres sont accrochées en continu au café.",
};
