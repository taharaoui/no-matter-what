import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Thread from "@/components/brand/Thread";
import Logo from "@/components/brand/Logo";
import { CHAPTERS, PROLOGUE } from "@/lib/story";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "Trois générations, une même adresse à Sainte-Marthe-sur-le-Lac — et l'histoire derrière le nom No Matter What.",
};

/* Width of the year column, and therefore where the thread and its nodes
   sit. Kept as one value in one place and applied through inline styles:
   the thread is positioned against the page container and the nodes
   against each article, so if these ever disagreed the nodes would float
   off the line. (Tailwind arbitrary values are avoided here on purpose —
   `calc(2.5rem+9rem)` is invalid CSS without spaces around the operator
   and gets silently dropped, which is exactly how the line first broke.) */
const GUTTER = "9rem";
const PAGE_PAD = "2.5rem"; // md:px-10
const THREAD_HALF = "12px"; // half the thread's 24px box — its centreline

export default function HistoirePage() {
  return (
    <>
      <PageIntro
        eyebrow="Notre histoire"
        title="Trois générations,"
        titleAccent="un seul fil."
      />

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32">
        <p className="max-w-4xl font-display text-2xl md:text-[2rem] leading-[1.5] text-ink-soft">
          {PROLOGUE}
        </p>
      </section>

      {/* This is the one page where the thread is literal: it runs the full
          length of the narrative, in the gutter, with a node at each
          chapter. Same motif as the homepage lineage section, at the scale
          it was actually designed for — a line you follow from 1968 to now
          without it ever breaking. */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pb-28 md:pb-36">
        <div
          className="hidden md:block absolute top-4 bottom-24 w-6 text-ink pointer-events-none"
          style={{ left: `calc(${PAGE_PAD} + ${GUTTER})` }}
        >
          <Thread className="h-full w-full" />
        </div>

        <div className="flex flex-col gap-28 md:gap-40">
          {CHAPTERS.map((chapter) => (
            <article
              key={chapter.id}
              id={chapter.id}
              className="relative md:grid md:gap-24 scroll-mt-28"
              style={{ gridTemplateColumns: `${GUTTER} 1fr` }}
            >
              {/* The node sits on the thread's centreline, not beside it. */}
              <span
                className="hidden md:block absolute top-[0.6rem] -translate-x-1/2 h-3 w-3 rounded-full bg-ink ring-4 ring-paper"
                style={{ left: `calc(${GUTTER} + ${THREAD_HALF})` }}
              />

              <p className="font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700 mb-6 md:mb-0 md:pt-1">
                {chapter.years}
              </p>

              <div className="max-w-2xl">
                <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-700 mb-4">
                  {chapter.eyebrow}
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
                  {chapter.title}
                </h2>

                <div className="flex flex-col gap-6 text-ink-soft/90 leading-[1.75]">
                  {chapter.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {chapter.pull && (
                  <p className="mt-10 border-l border-ink/40 pl-6 font-display italic text-2xl md:text-3xl leading-snug text-ink">
                    {chapter.pull}
                  </p>
                )}

                {chapter.photo && (
                  <div className="relative mt-10 aspect-[3/4] md:aspect-[4/3] overflow-hidden grain">
                    <Image
                      src={chapter.photo}
                      alt="Trois générations de la famille derrière le comptoir NMW"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* The story ends where the mark begins — the phrase explained four
          chapters ago, now shown as the thing it became. */}
      <section className="bg-ink text-paper-light grain">
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36 flex flex-col items-center text-center">
          <Logo variant="lockup" className="w-[min(58vw,340px)] h-auto" />

          <p className="mt-14 max-w-md text-paper-light/70 leading-relaxed">
            La suite s&apos;écrit au comptoir, entre sept heures et six heures,
            du lundi au dimanche.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/galerie"
              className="inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors"
            >
              L&apos;accrochage en cours
            </Link>
            <Link
              href="/#visite"
              className="inline-flex items-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors"
            >
              Venir nous voir
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
