import type { PlateTone } from "@/components/ui/Plate";

/**
 * Real content. Julie Lalonde is the artist whose work hangs at NMW — a
 * permanent wall, not a rotating accrochage, so there's no exhibition
 * date range here (there was in the old four-artist placeholder version;
 * don't reintroduce it). Two pieces are catalogued with confirmed details
 * (photographed, medium, dimensions, availability) — more get added as
 * they're documented, never invented ahead of that.
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

export const ARTISTS: Artist[] = [
  {
    slug: "julie-lalonde",
    name: "Julie Lalonde",
    based:
      "Née à Huberdeau, dans les Laurentides — artiste multidisciplinaire : peinture, aquarelle, sculpture, photographie, tatouage",
    bio: [
      "Dès l'enfance, l'art fait partie de sa vie — toujours un crayon à la main, un agenda d'école qui débordait de croquis et de poèmes. Autodidacte, elle n'a jamais cessé de créer, explorer, expérimenter.",
      "La peinture arrive plus tard, dans un moment de rupture : lorsque son père reçoit un diagnostic de cancer, puis meurt trois mois plus tard, elle cherche un souffle. En prenant un pinceau, elle découvre un langage qui lui manquait — créer devient une façon de survivre, de comprendre, de déposer.",
      "Un certificat en arts visuels consolide ensuite sa pratique, qu'elle élargit à la photographie, la sculpture et le tatouage. En 2014, elle organise son premier événement artistique, un rassemblement d'artistes d'ici — le début d'un travail sur la communauté autant que sur la toile.",
    ],
    statement:
      "Renaître n'est pas recommencer. Renaître, c'est devenir soi-même — même dans l'imperfection.",
  },
];

export const ARTIST_BY_SLUG = Object.fromEntries(
  ARTISTS.map((a) => [a.slug, a])
) as Record<string, Artist>;

export const PIECES: Piece[] = [
  {
    slug: "silence",
    title: "Silence",
    artist: "julie-lalonde",
    medium: "Technique mixte",
    dimensions: "24 × 36 po",
    price: "Disponible — prix au comptoir",
    label:
      "Une exploration de l'absence et de la trace invisible laissée par l'humain. Le noir et blanc accentue l'émotion, comme figée dans le temps.",
    image: {
      src: "/images/SILENCE.jpg",
      alt: "Silence, œuvre de Julie Lalonde, technique mixte, exposée au café No Matter What",
    },
    tone: "ink",
    format: "portrait",
    featured: true,
  },
  {
    slug: "regarde-moi",
    title: "Regarde-moi",
    artist: "julie-lalonde",
    medium: "Acrylique",
    dimensions: "24 × 36 po",
    price: "Disponible — prix au comptoir",
    label:
      "Une œuvre qui capte l'âme et interpelle. Ce regard intense, chargé d'émotion, semble percer le silence et raconter mille histoires.",
    image: {
      src: "/images/regarde-moi.jpg",
      alt: "Regarde-moi, œuvre de Julie Lalonde, acrylique, exposée au café No Matter What",
    },
    tone: "grey900",
    format: "portrait",
  },
  {
    slug: "erosion",
    title: "Érosion",
    artist: "julie-lalonde",
    medium: "Acrylique",
    dimensions: "30 × 40 po",
    price: "Disponible — prix au comptoir",
    label:
      "Cette œuvre intitulée Érosion explore la fragilité du corps et de l'âme. Le corps féminin, à moitié effacé par des coulures sombres, devient le symbole d'une identité en transformation, marquée par le temps, la douleur et le silence. Entre disparition et résilience, ce tableau cherche à faire ressentir un effacement lent, mais profondément humain.",
    image: {
      src: "/images/erosion.png",
      alt: "Érosion, œuvre de Julie Lalonde, acrylique, exposée au café No Matter What",
    },
    tone: "grey700",
    format: "portrait",
  },
  {
    slug: "ce-que-nous-sommes",
    title: "Ce que nous sommes",
    artist: "julie-lalonde",
    medium: "Acrylique",
    dimensions: "30 × 40 po",
    price: "Disponible — prix au comptoir",
    label:
      "Une silhouette féminine sans visage, car elle est nous, toutes ces femmes. Cette œuvre explore la sensualité, la mémoire du corps et la puissance silencieuse de la féminité. Elle invite à ressentir, plus qu'à comprendre — à se reconnaître dans ce que nous sommes, au-delà des formes.",
    image: {
      src: "/images/ce-que-nous-sommes.jpg",
      alt: "Ce que nous sommes, œuvre de Julie Lalonde, acrylique, exposée au café No Matter What",
    },
    tone: "grey500",
    format: "portrait",
  },
];

export const PIECE_BY_SLUG = Object.fromEntries(
  PIECES.map((p) => [p.slug, p])
) as Record<string, Piece>;

/** The page's opening section. Permanent wall, not a dated accrochage. */
export const GALERIE_INTRO = {
  eyebrow: "L'artiste exposée",
  title: "Julie Lalonde,",
  titleAccent: "sur les murs du café.",
  lede: "Peinture, aquarelle, sculpture, photographie, tatouage — une pratique multidisciplinaire ancrée dans l'émotion et l'instinct. Ses œuvres sont accrochées en continu au café.",
};
