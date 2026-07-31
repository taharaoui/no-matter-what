"use client";

import { useReveal } from "@/lib/useReveal";

const GENERATIONS = [
  {
    mark: "Le commencement",
    title: "Un comptoir, une théière, un quartier",
    text:
      "Tout a débuté avec un espace modeste et une idée simple : servir les gens comme on sert sa propre famille. Pas de raccourci, pas de compromis sur la qualité — seulement du café bien fait et un accueil sincère.",
    align: "left",
  },
  {
    mark: "La suite",
    title: "Faire grandir sans perdre l'essentiel",
    text:
      "La génération suivante a repris le flambeau et posé une question difficile : comment grandir sans diluer ce qui rendait l'endroit unique ? La réponse est devenue une discipline — chaque décision testée contre une seule mesure, l'intégrité du geste d'origine.",
    align: "right",
  },
  {
    mark: "Aujourd'hui",
    title: "Café, galerie, boutique — un même fil",
    text:
      "Aujourd'hui, l'histoire s'élargit : le café reste au centre, entouré d'une galerie et d'une boutique qui portent la même exigence. Peu importe la forme que ça prend, l'engagement d'origine ne change pas. No Matter What.",
    align: "left",
  },
];

export default function Lineage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="histoire" ref={ref} className="relative bg-paper text-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal mb-20 md:mb-28 max-w-xl">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-walnut mb-4">
            Notre histoire
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Trois générations,
            <br />
            <span className="italic">un seul fil.</span>
          </h2>
        </div>

        <div className="relative">
          {/* The thread — a literal line of lineage running through the three
              generations. This is the signature element: not decoration, the
              actual continuity the brand is named for. */}
          <svg
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-6 pointer-events-none"
            viewBox="0 0 24 900"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M12 0 C 12 120, 4 160, 12 280 C 20 400, 4 460, 12 580 C 20 700, 4 760, 12 900"
              stroke="var(--color-walnut)"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeDasharray="4 7"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col gap-20 md:gap-28">
            {GENERATIONS.map((gen, i) => (
              <div
                key={gen.mark}
                className={`reveal relative md:grid md:grid-cols-2 md:gap-16 items-center`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Node on the thread */}
                <span className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-brass ring-4 ring-paper z-10" />

                <div className={gen.align === "right" ? "md:col-start-2" : "md:col-start-1"}>
                  <div
                    className={`max-w-md ${
                      gen.align === "right" ? "md:ml-auto md:text-left" : ""
                    }`}
                  >
                    <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-brass mb-3">
                      {gen.mark}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl leading-snug mb-4">
                      {gen.title}
                    </h3>
                    <p className="text-ink-soft/85 leading-relaxed">{gen.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
