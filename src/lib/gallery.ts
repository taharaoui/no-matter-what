import type { PlateTone } from "@/components/ui/Plate";

/**
 * PLACEHOLDER CONTENT. Artists, works and dates are invented stand-ins
 * written at realistic length so the wall labels and detail pages can be
 * judged. Replace with the real accrochage before launch — and note that
 * the `sold` and `price` fields imply a commercial claim, so those in
 * particular must not ship as-is.
 */

export type Piece = {
  slug: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  edition?: string;
  price?: string;
  sold?: boolean;
  /** Wall-label text: two or three sentences, read standing up. */
  label: string;
  /** Longer text for the piece's own page. */
  note?: string;
  tone: PlateTone;
  /** Portrait, square or landscape — drives the grid. */
  format: "portrait" | "square" | "landscape";
  featured?: boolean;
};

export type Artist = {
  slug: string;
  name: string;
  based: string;
  bio: string;
};

export const ARTISTS: Artist[] = [
  {
    slug: "m-lortie",
    name: "M. Lortie",
    based: "Montréal (Villeray)",
    bio: "Travaille la gouache sur papier préparé, à petite échelle, presque toujours d'après des façades de ruelle photographiées l'hiver. Expose depuis 2016.",
  },
  {
    slug: "a-nkusi",
    name: "A. Nkusi",
    based: "Montréal (Parc-Extension)",
    bio: "Photographie argentique, tirages faits à la main dans une chambre noire partagée rue Jean-Talon. Travaille par séries longues, sur plusieurs années.",
  },
  {
    slug: "j-tremblay",
    name: "J. Tremblay",
    based: "Sainte-Anne-des-Monts",
    bio: "Céramiste. Cuisson au bois, deux fournées par an. Les pièces exposées ici sortent de la fournée d'octobre.",
  },
  {
    slug: "s-ferrante",
    name: "S. Ferrante",
    based: "Montréal (Mile End)",
    bio: "Dessin à l'encre et lavis. Fait des séries de mains — celles de gens qui travaillent debout, principalement en cuisine et en atelier.",
  },
];

export const ARTIST_BY_SLUG = Object.fromEntries(
  ARTISTS.map((a) => [a.slug, a])
) as Record<string, Artist>;

export const PIECES: Piece[] = [
  {
    slug: "ruelle-en-fevrier",
    title: "Ruelle en février",
    artist: "m-lortie",
    year: "2024",
    medium: "Gouache sur papier préparé",
    dimensions: "76 × 96 cm",
    price: "2 400 $",
    label:
      "Une façade arrière de Villeray, peinte d'après une photographie prise à sept heures du matin. La neige n'est pas blanche : elle est le papier, laissé nu.",
    note:
      "C'est la plus grande pièce que l'artiste ait peinte, et la seule à cette échelle dans la série. Les six autres tiennent dans une main. Elle a été accrochée face à la fenêtre, volontairement : à certaines heures d'hiver, la lumière dans la salle et la lumière dans le tableau sont la même.",
    tone: "ink",
    format: "portrait",
    featured: true,
  },
  {
    slug: "jean-talon-6h40",
    title: "Jean-Talon, 6 h 40",
    artist: "a-nkusi",
    year: "2023",
    medium: "Tirage argentique sur papier baryté",
    dimensions: "40 × 50 cm",
    edition: "3 / 12",
    price: "900 $",
    label:
      "Premier de la série sur les commerces qui ouvrent avant le jour. Tiré à la main, contraste poussé au développement plutôt qu'au tirage.",
    note:
      "L'artiste a photographié le même trottoir pendant quatre hivers. Cette image est la seule de la série où quelqu'un regarde l'objectif, et c'était un accident.",
    tone: "grey900",
    format: "landscape",
  },
  {
    slug: "bol-a-cafe-i-vi",
    title: "Bols à café I – VI",
    artist: "j-tremblay",
    year: "2024",
    medium: "Grès, cuisson au bois, cendre naturelle",
    dimensions: "9 × 11 cm chacun",
    price: "140 $ la pièce",
    label:
      "Six bols de la fournée d'octobre. Aucun n'est identique : la cendre se dépose selon la position dans le four, et personne ne décide de ça.",
    note:
      "Ce sont les bols dans lesquels on sert le filtre du jour. Ils ne sont pas décoratifs — ils sont en service, ils s'ébrèchent, et on les remplace par la fournée suivante.",
    tone: "grey700",
    format: "square",
  },
  {
    slug: "mains-i",
    title: "Mains I",
    artist: "s-ferrante",
    year: "2025",
    medium: "Encre et lavis sur papier",
    dimensions: "30 × 40 cm",
    price: "600 $",
    sold: true,
    label:
      "Les mains d'un boulanger, dessinées en trois séances d'observation dans un fournil de la rue Saint-Zotique.",
    tone: "grey500",
    format: "portrait",
  },
  {
    slug: "mains-iv",
    title: "Mains IV",
    artist: "s-ferrante",
    year: "2025",
    medium: "Encre et lavis sur papier",
    dimensions: "30 × 40 cm",
    price: "600 $",
    label:
      "Quatrième de la même série. Celles-ci sont les mains de la deuxième génération, dessinées derrière le comptoir un mardi après-midi.",
    note:
      "L'artiste a demandé à dessiner pendant le service plutôt qu'en pose. Il a fallu six visites pour obtenir vingt minutes où les mains ne bougeaient pas.",
    tone: "grey300",
    format: "portrait",
  },
  {
    slug: "chantier-nord",
    title: "Chantier, nord",
    artist: "a-nkusi",
    year: "2022",
    medium: "Tirage argentique sur papier baryté",
    dimensions: "50 × 60 cm",
    edition: "1 / 8",
    price: "1 100 $",
    label:
      "Le chantier d'en face, photographié depuis l'intérieur, à travers la vitre. La buée est celle de la salle.",
    tone: "grey100",
    format: "landscape",
  },
];

export const PIECE_BY_SLUG = Object.fromEntries(
  PIECES.map((p) => [p.slug, p])
) as Record<string, Piece>;

/** The current hanging — dates shown on the gallery page.
 *  The title is stored pre-split because the site's headline mannerism is
 *  an italic closing phrase; splitting it in the view would mean parsing
 *  editorial copy at render time. */
export const ACCROCHAGE = {
  title: "Ce qui ouvre",
  titleAccent: "avant le jour.",
  from: "14 janvier",
  to: "10 mars 2026",
  text: "Quatre artistes montréalais, une même question : à quoi ressemble le travail qui commence pendant que la ville dort encore. L'accrochage change toutes les huit semaines.",
};
