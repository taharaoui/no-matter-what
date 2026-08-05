"use client";

import { useEffect, useState, type FormEvent } from "react";

const ADDRESS_QUERY = "3054A Chemin d'Oka, Sainte-Marthe-sur-le-Lac, QC J0N 1P0";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`;

/* Centered popup rather than the CartDrawer's side panel — this is a one-off
   request, not persistent state to keep visible while browsing, so it
   doesn't need the drawer's "stays open across the site" affordance.
   Scroll-lock and Escape-to-close are copied from CartDrawer.tsx /
   Header.tsx's mobile panel, the same mechanism at a third call site. */
export default function PrecommandeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setSent(false);
  }

  /* No form backend is wired up yet (no inbox / CRM integration) — this
     only confirms the UI locally, same honesty as the footer newsletter
     form and the galerie contact form. Wire a real submit handler before
     launch. */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
      >
        Précommander un bouquet
      </button>

      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Précommander un bouquet"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-paper text-ink border border-ink/10 transition-transform duration-300 ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-2 scale-[0.98]"
          }`}
        >
          <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-ink/10">
            <p className="font-display text-2xl">Précommander un bouquet</p>
            <button
              type="button"
              onClick={close}
              className="font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink transition-colors"
            >
              Fermer
            </button>
          </div>

          <div className="px-6 md:px-10 py-8 grid md:grid-cols-2 gap-10">
            <div>
              <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-700 mb-4">
                Écrivez-nous
              </p>
              <p className="text-[0.9rem] text-ink-soft/70 leading-relaxed mb-6">
                Le nombre de roses, une couleur en tête — dites-le-nous, la
                fenêtre de précommande change chaque semaine.
              </p>

              {sent ? (
                <p className="text-ink-soft/80 leading-relaxed">
                  Merci — votre demande est notée. On vous répond sous peu.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="precommande-nom" className="sr-only">
                      Nom
                    </label>
                    <input
                      id="precommande-nom"
                      name="nom"
                      type="text"
                      required
                      placeholder="Nom"
                      className="w-full bg-transparent border-b border-ink/25 pb-2 text-[0.95rem] text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label htmlFor="precommande-courriel" className="sr-only">
                      Courriel
                    </label>
                    <input
                      id="precommande-courriel"
                      name="courriel"
                      type="email"
                      required
                      placeholder="Courriel"
                      className="w-full bg-transparent border-b border-ink/25 pb-2 text-[0.95rem] text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label htmlFor="precommande-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="precommande-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="3 roses ou 6 roses, couleur souhaitée..."
                      className="w-full resize-none bg-transparent border-b border-ink/25 pb-2 text-[0.95rem] text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-ink"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors w-fit"
                  >
                    Envoyer
                  </button>
                </form>
              )}
            </div>

            <div>
              <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-700 mb-4">
                Ou passez au comptoir
              </p>

              <div className="aspect-[4/3] w-full overflow-hidden border border-ink/10 mb-6">
                <iframe
                  title="Localisation de No Matter What sur Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-5 font-utility text-sm">
                <div>
                  <p className="uppercase tracking-[0.14em] text-grey-700 mb-2 text-[11px]">
                    Adresse
                  </p>
                  <p className="text-ink-soft/80 leading-relaxed">
                    3054A Chemin d&apos;Oka
                    <br />
                    Sainte-Marthe-sur-le-Lac, QC J0N 1P0
                  </p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.14em] text-grey-700 mb-2 text-[11px]">
                    Heures
                  </p>
                  <p className="text-ink-soft/80 leading-relaxed">
                    Lun–Ven — 7h à 18h
                    <br />
                    Sam–Dim — 8h à 17h
                  </p>
                </div>
                <div className="col-span-2">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border border-ink px-6 py-3 uppercase tracking-[0.16em] text-[11px] hover:bg-ink hover:text-paper-light transition-colors"
                  >
                    Obtenir l&apos;itinéraire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
