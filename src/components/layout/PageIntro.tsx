/**
 * The opening of every interior page. Shared so the four sections read as
 * one site: same eyebrow, same display size, same measure on the lede,
 * same amount of air before the content starts.
 *
 * No rule, no thread, no ornament under the title. The lineage thread
 * (components/brand/Thread.tsx) was tried here and pulled: stretched to
 * page width it flattens into a plain dotted line, and a motif that means
 * "continuity across generations" under the word "Menu" is decoration
 * wearing a concept's clothes. It described the old placeholder
 * three-generations story on /histoire; that page is gone (replaced by
 * /a-propos, the real single-founder story), so the motif is currently
 * unused rather than reassigned to somewhere it doesn't fit.
 */

type PageIntroProps = {
  eyebrow: string;
  /** Set in the display face, upright. */
  title: string;
  /** Trailing phrase set in italic — the site's one headline mannerism. */
  titleAccent?: string;
  lede?: string;
};

export default function PageIntro({
  eyebrow,
  title,
  titleAccent,
  lede,
}: PageIntroProps) {
  return (
    <header className="mx-auto max-w-7xl px-6 md:px-10 pt-36 md:pt-44 pb-14 md:pb-20">
      <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-5">
        {eyebrow}
      </p>

      <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="italic">{titleAccent}</span>
          </>
        )}
      </h1>

      {lede && (
        <p className="mt-9 max-w-xl text-ink-soft/85 leading-relaxed">{lede}</p>
      )}
    </header>
  );
}
