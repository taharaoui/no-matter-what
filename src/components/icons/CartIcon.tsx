type CartIconProps = {
  className?: string;
};

/* A tote outline rather than a generic cart glyph — echoes the shop's own
   stock-in-trade and matches the thin-line, fill-none style used elsewhere
   (see Thread.tsx) instead of a filled icon-font glyph. */
export default function CartIcon({ className }: CartIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M9 8V6.5a3 3 0 0 1 6 0V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 8h11l-.9 11.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8L6.5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
