"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/auth/actions";

const LINKS = [
  { href: "/admin/galerie", label: "Galerie" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/about", label: "À propos" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <nav className="flex items-center gap-6 font-utility text-[11px] uppercase tracking-[0.16em]">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 border-b transition-colors ${
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-soft/60 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form action={signOutAction}>
          <button
            type="submit"
            className="font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/60 hover:text-ink transition-colors"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </header>
  );
}
