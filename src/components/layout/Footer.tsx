"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function Footer() {
  const [sent, setSent] = useState(false);

  /* No newsletter provider is wired up yet (Mailchimp/Klaviyo/etc.) — this
     only confirms the UI locally so nothing is silently lost, and nothing
     is silently claimed either. Wire a real submit handler before launch. */
  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <footer className="bg-ink text-paper-light">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          {/* The full signature, sized as a mark rather than as a heading —
              the page closes the way a letter closes. */}
          <Logo variant="lockup" className="w-[190px] h-auto" />
          <p className="mt-6 text-[0.95rem] text-paper-light/60 max-w-xs leading-relaxed">
            Peu importe. On ouvre.
          </p>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-300">Visiter</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-paper-light/75">
            <li>3054A Chemin d&apos;Oka</li>
            <li>Sainte-Marthe-sur-le-Lac, QC J0N 1P0</li>
            <li>Lun – Ven — 7h à 18h</li>
            <li>Sam – Dim — 8h à 17h</li>
          </ul>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-300">Explorer</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-paper-light/75">
            <li><Link href="/a-propos" className="hover:text-paper-light transition-colors">À propos</Link></li>
            <li><Link href="/menu" className="hover:text-paper-light transition-colors">Menu</Link></li>
            <li><Link href="/galerie" className="hover:text-paper-light transition-colors">Galerie</Link></li>
            <li><Link href="/boutique" className="hover:text-paper-light transition-colors">Boutique</Link></li>
            <li><Link href="/fleurs" className="hover:text-paper-light transition-colors">Fleurs</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-300">Suivre</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-paper-light/75">
            <li><a href="#" className="hover:text-paper-light transition-colors">Instagram</a></li>
          </ul>

          <p className="mt-6 font-utility text-[11px] uppercase tracking-[0.16em] text-grey-300">
            Infolettre
          </p>
          {sent ? (
            <p className="mt-4 text-[0.9rem] text-paper-light/75">
              Merci — c&apos;est noté.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                placeholder="Courriel"
                aria-label="Adresse courriel"
                className="min-w-0 flex-1 bg-transparent border-b border-paper-light/30 pb-2 text-[0.9rem] text-paper-light placeholder:text-paper-light/40 focus:outline-none focus:border-paper-light"
              />
              <button
                type="submit"
                className="font-utility text-[11px] uppercase tracking-[0.16em] border-b border-paper-light pb-2 whitespace-nowrap"
              >
                S&apos;inscrire
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-paper-light/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row gap-2 items-center justify-between font-utility text-[11px] uppercase tracking-[0.12em] text-paper-light/45">
          <p>© {new Date().getFullYear()} No Matter What</p>
          <p>Sainte-Marthe-sur-le-Lac, avec continuité</p>
        </div>
      </div>
    </footer>
  );
}
