export default function Footer() {
  return (
    <footer className="bg-ink text-paper-light">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display italic text-2xl">No Matter What</p>
          <p className="mt-3 text-sm text-paper-light/60 max-w-xs leading-relaxed">
            Café, galerie et boutique. Trois générations, une même adresse.
          </p>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-brass">Visiter</p>
          <ul className="mt-4 space-y-2 text-sm text-paper-light/75">
            <li>À préciser, Montréal, QC</li>
            <li>Lun – Ven — 7h à 18h</li>
            <li>Sam – Dim — 8h à 17h</li>
          </ul>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-brass">Explorer</p>
          <ul className="mt-4 space-y-2 text-sm text-paper-light/75">
            <li><a href="#histoire" className="hover:text-paper-light transition-colors">Notre histoire</a></li>
            <li><a href="#menu" className="hover:text-paper-light transition-colors">Menu</a></li>
            <li><a href="#galerie" className="hover:text-paper-light transition-colors">Galerie</a></li>
            <li><a href="#boutique" className="hover:text-paper-light transition-colors">Boutique</a></li>
          </ul>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-brass">Suivre</p>
          <ul className="mt-4 space-y-2 text-sm text-paper-light/75">
            <li><a href="#" className="hover:text-paper-light transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-paper-light transition-colors">Infolettre</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper-light/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row gap-2 items-center justify-between font-utility text-[11px] uppercase tracking-[0.12em] text-paper-light/45">
          <p>© {new Date().getFullYear()} No Matter What</p>
          <p>Fait à Montréal, avec continuité</p>
        </div>
      </div>
    </footer>
  );
}
