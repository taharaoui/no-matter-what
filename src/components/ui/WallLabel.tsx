import { ARTIST_BY_SLUG, type Piece } from "@/lib/gallery";

/**
 * The wall label. Same object printed beside the work in the room, so it
 * carries the same information in the same order: artist, title, year,
 * medium, dimensions, edition, price. Mono for the metadata, display for
 * the title — the one place the two voices sit directly on top of each
 * other, which is what makes it read as a label rather than a card.
 *
 * `dark` inverts it for the ink fields; everything else is shared so a
 * label never drifts between the grid and the piece's own page.
 */

type WallLabelProps = {
  piece: Piece;
  dark?: boolean;
  /** The piece page shows the full spec; the grid shows the short form. */
  full?: boolean;
};

export default function WallLabel({
  piece,
  dark = false,
  full = false,
}: WallLabelProps) {
  const artist = ARTIST_BY_SLUG[piece.artist];

  const meta = dark ? "text-paper-light/50" : "text-ink-soft/55";
  const body = dark ? "text-paper-light/80" : "text-ink-soft/80";
  const rule = dark ? "border-paper-light/15" : "border-ink/12";

  return (
    <div>
      <p
        className={`font-utility text-[11px] uppercase tracking-[0.16em] ${
          dark ? "text-grey-300" : "text-grey-700"
        }`}
      >
        {artist?.name ?? piece.artist}
      </p>

      <h3
        className={`font-display leading-snug mt-2 ${
          full ? "text-3xl md:text-4xl" : "text-2xl"
        }`}
      >
        {piece.title}
        {piece.year && (
          <span className={`not-italic font-normal ${meta}`}>, {piece.year}</span>
        )}
      </h3>

      <p className={`font-utility text-[11px] tracking-[0.06em] mt-3 ${meta}`}>
        {piece.medium} · {piece.dimensions}
        {piece.edition && ` · éd. ${piece.edition}`}
      </p>

      <p className={`mt-4 text-[0.95rem] leading-relaxed ${body}`}>
        {piece.label}
      </p>

      {full && piece.note && (
        <p className={`mt-4 text-[0.95rem] leading-relaxed ${body}`}>
          {piece.note}
        </p>
      )}

      {piece.price && (
        <p
          className={`mt-5 pt-4 border-t font-utility text-[11px] uppercase tracking-[0.14em] ${rule} ${
            piece.sold ? meta : dark ? "text-paper-light/80" : "text-ink-soft/80"
          }`}
        >
          {piece.sold ? "Vendu" : piece.price}
        </p>
      )}
    </div>
  );
}
