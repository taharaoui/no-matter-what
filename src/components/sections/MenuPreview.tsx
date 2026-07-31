"use client";

import { useReveal } from "@/lib/useReveal";

const MENU = [
  { name: "Espresso", desc: "Mélange maison, torréfié en petit lot", price: "3,75" },
  { name: "Cortado", desc: "Espresso, lait vapeur à parts égales", price: "4,75" },
  { name: "Filtre du jour", desc: "Origine unique, changée chaque semaine", price: "5,25" },
  { name: "Chocolat chaud", desc: "Cacao fondu, sans mélange en poudre", price: "5,50" },
  { name: "Thé à la théière", desc: "Sélection en feuilles, infusion lente", price: "5,00" },
  { name: "Pâtisserie du jour", desc: "Four maison, recette en évolution", price: "4,50" },
];

export default function MenuPreview() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="menu" ref={ref} className="bg-paper text-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-walnut mb-4">
              Au menu
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Simple, <span className="italic">fait avec soin.</span>
            </h2>
          </div>
          <a
            href="#visite"
            className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-ink pb-1 self-start md:self-auto w-fit"
          >
            Menu complet
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16">
          {MENU.map((item, i) => (
            <div
              key={item.name}
              className="reveal flex items-baseline gap-4 py-5 border-b border-ink/10"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="flex-1">
                <p className="font-display text-lg">{item.name}</p>
                <p className="text-sm text-ink-soft/70 mt-1">{item.desc}</p>
              </div>
              <p className="font-utility text-sm text-walnut whitespace-nowrap">{item.price} $</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
