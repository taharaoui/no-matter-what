"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";

const LINKS = [
  { href: "/histoire", label: "Notre Histoire" },
  { href: "/galerie", label: "Galerie" },
  { href: "/boutique", label: "Boutique" },
  { href: "/fleurs", label: "Fleurs" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Only the homepage opens on a full-bleed ink hero, so only there does
     the header start transparent. Interior pages open on paper and get a
     solid header from the first frame — no flash of light-on-light. */
  const overHero = pathname === "/";

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  /* Close the panel on navigation. Adjusted during render rather than in
     an effect, per React's guidance on resetting state on prop change —
     avoids the extra render an effect-based reset would trigger. */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  /* Stop the page scrolling behind the open panel. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !overHero || scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-paper/90 backdrop-blur-sm shadow-[0_1px_0_rgba(21,19,15,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          aria-label="No Matter What — accueil"
          aria-hidden={!solid}
          tabIndex={solid ? undefined : -1}
          className={`transition-all duration-500 ${
            solid ? "text-ink opacity-100" : "text-paper-light opacity-0 pointer-events-none"
          }`}
        >
          <Logo className="h-[22px] w-auto" />
        </Link>

        <nav
          className={`hidden md:flex items-center gap-8 font-utility text-[11px] uppercase tracking-[0.16em] transition-colors ${
            solid ? "text-grey-700" : "text-paper-light/85"
          }`}
        >
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-current after:transition-all after:duration-300 ${
                  active ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/menu"
          className={`hidden md:inline-flex items-center border px-5 py-2 font-utility text-[11px] uppercase tracking-[0.16em] transition-colors ${
            solid
              ? "border-ink text-ink hover:bg-ink hover:text-paper-light"
              : "border-paper-light/70 text-paper-light hover:bg-paper-light hover:text-ink"
          }`}
        >
          Menu
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-mobile"
          className={`md:hidden font-utility text-[11px] uppercase tracking-[0.16em] transition-colors ${
            solid ? "text-ink" : "text-paper-light"
          }`}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {/* Mobile navigation. One panel, one transition — the links are set
          in the display face at reading size rather than shrunk into a
          list, so the sheet reads as part of the site, not as chrome. */}
      <div
        id="nav-mobile"
        hidden={!open}
        className="md:hidden bg-paper border-t border-ink/10"
      >
        <nav className="mx-auto max-w-7xl px-6 py-8 flex flex-col">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-3xl py-3 border-b border-ink/10 text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/menu"
            className="mt-8 inline-flex items-center justify-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            Menu
          </Link>
        </nav>
      </div>
    </header>
  );
}
