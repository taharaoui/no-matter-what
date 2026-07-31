/**
 * The lineage thread — the site's one recurring graphic device.
 *
 * It began on the homepage as the line running down through the three
 * generations. It is extracted here so the interior pages reuse the
 * same motif instead of each inventing a divider: the same dash rhythm,
 * the same drift off-axis and back, the same weight. Where it appears,
 * it means continuity — so it is used sparingly and never as filler.
 */

type ThreadProps = {
  className?: string;
  /** Wandering line for running alongside or between long content. */
  orientation?: "vertical" | "horizontal";
};

const VERTICAL =
  "M12 0 C 12 120, 4 160, 12 280 C 20 400, 4 460, 12 580 C 20 700, 4 760, 12 900";

const HORIZONTAL =
  "M0 12 C 120 12, 160 4, 280 12 C 400 20, 460 4, 580 12 C 700 20, 760 4, 900 12";

export default function Thread({
  className,
  orientation = "vertical",
}: ThreadProps) {
  const vertical = orientation === "vertical";

  return (
    <svg
      className={className}
      viewBox={vertical ? "0 0 24 900" : "0 0 900 24"}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={vertical ? VERTICAL : HORIZONTAL}
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="4 7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
