/**
 * The NMW mark, inlined as SVG rather than referenced from
 * /public/nmw-logo.svg via <img> or background-image.
 *
 * This is deliberate. The source file sets its wordmark in live <text>
 * with font-family "Playfair Display" — but an SVG loaded through <img>
 * or CSS is an isolated document that cannot see the host page's
 * webfonts. Served that way the mark would silently fall back to
 * Georgia on every visitor's screen. Inlined, it resolves against the
 * fonts the page has already loaded, takes `currentColor`, and scales
 * as one locked unit — the letter-spacing-to-size ratio of the wordmark
 * stays fixed instead of drifting with the viewport.
 *
 * /public/nmw-logo.svg is kept as the standalone/export asset (favicons,
 * social cards, anything rendered outside this document).
 *
 * Geometry below is measured from the source file's ink bounds, not its
 * 1024×1024 canvas, so the component has no phantom padding and callers
 * control their own spacing.
 */

type LogoProps = {
  /** `mark` is the NMW wordmark alone; `lockup` is the full signature. */
  variant?: "mark" | "lockup";
  className?: string;
};

/* The source file centres "NMW" with text-anchor="middle" at x=512 while
   carrying letter-spacing="20". The trailing letter-space is counted in
   the advance width, so the visible glyphs land 10 units left of centre —
   measured ink centre 501.5 against 511.5 for the subtext and tagline.
   Every renderer reproduces this, so it is corrected here rather than
   inherited: the wordmark is nudged back onto the axis of the rule and
   the lines beneath it. */
const TRACKING_CENTER_FIX = 10;

const INK = {
  mark: { x: 297, y: 291, w: 429, h: 103 },
  lockup: { x: 248, y: 291, w: 528, h: 316 },
} as const;

export default function Logo({ variant = "mark", className }: LogoProps) {
  const box = INK[variant];
  const full = variant === "lockup";

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      role="img"
      aria-label={
        full
          ? "No Matter What — caffè, galerie, boutique"
          : "No Matter What"
      }
      className={className}
      fill="none"
    >
      <g transform={`translate(${TRACKING_CENTER_FIX} 0)`}>
        <text
          x="512"
          y="392"
          textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontWeight="600"
          fontSize="148"
          letterSpacing="20"
          fill="currentColor"
        >
          NMW
        </text>
      </g>

      {full && (
        <>
          <text
            x="512"
            y="508"
            textAnchor="middle"
            fontFamily="var(--font-body), Georgia, serif"
            fontWeight="400"
            fontSize="42"
            fill="currentColor"
          >
            {"caffè  |  galerie  |  boutique"}
          </text>

          {/* The source rule is a fixed warm grey (#B9B2A4), which only
              works on paper. Drawn in currentColor at the same optical
              weight it adapts to the ink fields the mark also sits on. */}
          <line
            x1="248"
            y1="548"
            x2="776"
            y2="548"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />

          <text
            x="512"
            y="607"
            textAnchor="middle"
            fontFamily="var(--font-body), Georgia, serif"
            fontWeight="400"
            fontStyle="italic"
            fontSize="38"
            fill="currentColor"
          >
            No Matter What
          </text>
        </>
      )}
    </svg>
  );
}
