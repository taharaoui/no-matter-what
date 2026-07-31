import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper-light">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          {/* The full signature, sized as a mark rather than as a heading —
              the page closes the way a letter closes. */}
          <Logo variant="lockup" className="w-[190px] h-auto" />
          <p className="mt-6 text-[0.95rem] text-paper-light/60 max-w-xs leading-relaxed">
            Trois générations, une même adresse.
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
            <li><Link href="/histoire" className="hover:text-paper-light transition-colors">Notre histoire</Link></li>
            <li><Link href="/menu" className="hover:text-paper-light transition-colors">Menu</Link></li>
            <li><Link href="/galerie" className="hover:text-paper-light transition-colors">Galerie</Link></li>
            <li><Link href="/boutique" className="hover:text-paper-light transition-colors">Boutique</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-utility text-[11px] uppercase tracking-[0.16em] text-grey-300">Suivre</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-paper-light/75">
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
