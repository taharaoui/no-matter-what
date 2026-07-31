"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#histoire", label: "Notre Histoire" },
  { href: "#menu", label: "Menu" },
  { href: "#galerie", label: "Galerie" },
  { href: "#boutique", label: "Boutique" },
  { href: "#visite", label: "Visiter" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-paper/90 backdrop-blur-sm shadow-[0_1px_0_rgba(32,28,23,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          className={`font-display italic text-xl tracking-tight transition-colors ${
            scrolled ? "text-ink" : "text-paper-light"
          }`}
        >
          No Matter What
        </a>

        <nav
          className={`hidden md:flex items-center gap-8 font-utility text-[11px] uppercase tracking-[0.16em] transition-colors ${
            scrolled ? "text-ink-soft" : "text-paper-light/85"
          }`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#visite"
          className={`hidden md:inline-flex items-center border px-5 py-2 font-utility text-[11px] uppercase tracking-[0.16em] transition-colors ${
            scrolled
              ? "border-ink text-ink hover:bg-ink hover:text-paper-light"
              : "border-paper-light/70 text-paper-light hover:bg-paper-light hover:text-ink"
          }`}
        >
          Réserver
        </a>
      </div>
    </header>
  );
}
