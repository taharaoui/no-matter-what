"use client";

import { useState } from "react";
import Image from "next/image";
import MenuItemCard from "./MenuItemCard";
import type { MenuSection } from "@/lib/menu";

type MenuBrowserProps = {
  sections: MenuSection[];
};

/* Clicking a section cover swaps the view in place — no anchor scroll.
   Only one section (or the grid of all of them) is ever on screen, so
   this needs client state; the rest of /menu stays a server component. */
export default function MenuBrowser({ sections }: MenuBrowserProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = sections.find((s) => s.id === activeId) ?? null;

  if (active) {
    return (
      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32">
        <button
          type="button"
          onClick={() => setActiveId(null)}
          className="mb-10 inline-flex items-center font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink transition-colors"
        >
          ← Toutes les sections
        </button>

        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            {active.title}
          </h2>
          {active.intro && (
            <p className="mt-4 max-w-lg text-[0.95rem] text-ink-soft/70 leading-relaxed">
              {active.intro}
            </p>
          )}
        </div>

        {/* Same grid rhythm as /boutique — one product grammar across
            the site rather than a second one invented for photos. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {active.items.map((item) => (
            <MenuItemCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 pb-24 md:pb-32">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveId(section.id)}
            className="group block text-left"
          >
            <div className="relative aspect-[4/5] overflow-hidden grain border border-ink/10">
              <Image
                src={section.cover.src}
                alt={section.cover.alt}
                fill
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 32vw, 48vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Voir la section →
              </span>
            </div>
            <p className="mt-4 font-display text-xl leading-snug">
              {section.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
