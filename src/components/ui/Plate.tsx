/**
 * Stand-in for photography that hasn't been shot yet.
 *
 * Deliberately a flat field of one palette tone under the existing grain
 * overlay, not a gradient. Gradient placeholders multiply badly: five of
 * them in a grid stop reading as "photo pending" and start reading as a
 * decorative choice — the exact soft-gradient wallpaper this project is
 * trying to avoid. A flat tone behaves like an unlit printed surface,
 * holds its own next to a mono wall label, and is unmistakably a
 * placeholder.
 *
 * Swap for <Image /> when the real photography lands; keep the aspect
 * ratio on the wrapper and the layouts hold.
 */

const TONES = {
  ink: "bg-ink",
  grey900: "bg-grey-900",
  grey700: "bg-grey-700",
  grey500: "bg-grey-500",
  grey300: "bg-grey-300",
  grey100: "bg-grey-100",
  paper: "bg-paper",
} as const;

export type PlateTone = keyof typeof TONES;

type PlateProps = {
  tone?: PlateTone;
  className?: string;
  /** Draws an inset hairline — a mat line, for works shown as hung. */
  matted?: boolean;
};

export default function Plate({
  tone = "grey500",
  className = "",
  matted = false,
}: PlateProps) {
  return (
    <div
      className={`relative overflow-hidden grain ${TONES[tone]} ${className}`}
      aria-hidden="true"
    >
      {matted && (
        <span className="absolute inset-3 md:inset-4 border border-paper-light/20" />
      )}
    </div>
  );
}
