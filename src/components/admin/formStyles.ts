/* Shared class strings for admin forms — same border-b input grammar as
   ContactForm.tsx, reused here rather than restyled, so the one form a
   site visitor sees and the many an admin sees still read as one system. */

export const inputClass =
  "mt-2 w-full bg-transparent border-b border-ink/20 pb-2 text-ink focus:outline-none focus:border-ink transition-colors";

export const labelClass = "font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700";

export const buttonClass =
  "border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors disabled:opacity-40 disabled:pointer-events-none";

export const buttonGhostClass =
  "font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink transition-colors";
