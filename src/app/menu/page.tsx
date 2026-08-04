import type { Metadata } from "next";
import PageIntro from "@/components/layout/PageIntro";
import { MENU, type MenuItem } from "@/lib/menu";

/* One row of the carte. The list is bracketed top and bottom by a rule
   rather than boxed — the carte reads as a printed bill of fare. */
function Row({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-baseline gap-6 py-5 border-b border-ink/10 first:border-t first:border-ink/10">
      <div className="flex-1">
        <p className="font-display text-xl">{item.name}</p>
        {item.desc && (
          <p className="text-[0.95rem] leading-snug text-ink-soft/70 mt-1">
            {item.desc}
          </p>
        )}
      </div>
      <div className="text-right whitespace-nowrap">
        {item.price ? (
          <p className="font-utility text-sm text-grey-700">{item.price} $</p>
        ) : (
          <p className="font-utility text-[11px] uppercase tracking-[0.12em] text-grey-500">
            Nouveau
          </p>
        )}
        {item.note && (
          <p className="font-utility text-[10px] uppercase tracking-[0.12em] text-ink-soft/55 mt-1">
            {item.note}
          </p>
        )}
      </div>
    </li>
  );
}

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Café de spécialité, brioches, croissants, foccacias, sandwichs et salade — la carte complète du café No Matter What, à Sainte-Marthe-sur-le-Lac.",
};

export default function MenuPage() {
  return (
    <>
      <PageIntro eyebrow="Au menu" title="La carte" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32 flex flex-col gap-24 md:gap-32">
        {MENU.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="md:grid md:grid-cols-[18rem_1fr] md:gap-20">
              <div className="mb-10 md:mb-0">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  {section.title}
                </h2>
                {section.intro && (
                  <p className="mt-4 text-[0.95rem] text-ink-soft/70 leading-relaxed md:max-w-[15rem]">
                    {section.intro}
                  </p>
                )}
              </div>

              <ul>
                {section.items.map((item) => (
                  <Row key={item.name} item={item} />
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
