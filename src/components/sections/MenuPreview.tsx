"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/* A hand-picked spread across the carte, not the whole thing — the full
   list lives at /menu. Pulled straight from the real menu data. */
const PREVIEW = [
  { name: "Espresso", price: "2,85" },
  { name: "Cappuccino", price: "4,75" },
  { name: "Croissant classique", price: "3,50" },
  { name: "La Burrata", desc: "Burrata, prosciutto, pesto, mélange de tomates, glaçage balsamique", price: "18,95" },
  { name: "Poulet toscan", desc: "Poulet, pesto-basilic, roquette, citron, stracciatella", price: "14,95" },
  { name: "Panzanella à la burrata", desc: "Salade & roquette, tomates NMW, concombre, burrata, croûtons", price: "15,95" },
];

export default function MenuPreview() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="menu" ref={ref} className="bg-paper text-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
              Au menu
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Simple, <span className="italic">fait avec soin.</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-ink pb-1 self-start md:self-auto w-fit"
          >
            Menu complet
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16">
          {PREVIEW.map((item, i) => (
            <div
              key={item.name}
              className="reveal flex items-baseline gap-4 py-5 border-b border-ink/10"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="flex-1">
                <p className="font-display text-lg">{item.name}</p>
                {item.desc && (
                  <p className="text-[0.95rem] leading-snug text-ink-soft/70 mt-1">{item.desc}</p>
                )}
              </div>
              <p className="font-utility text-sm text-grey-700 whitespace-nowrap">{item.price} $</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
