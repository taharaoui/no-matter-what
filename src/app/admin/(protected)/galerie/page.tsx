import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPieces } from "@/lib/gallery";
import { deletePieceAction } from "@/lib/gallery/actions";
import { buttonClass } from "@/components/admin/formStyles";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const metadata: Metadata = { title: "Galerie" };

export default async function AdminGaleriePage() {
  const pieces = await getPieces();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl">Galerie</h1>
        <Link href="/admin/galerie/nouveau" className={buttonClass}>
          + Nouvelle œuvre
        </Link>
      </div>

      {pieces.length === 0 ? (
        <p className="text-ink-soft/70">Aucune œuvre pour le moment.</p>
      ) : (
        <ul className="flex flex-col">
          {pieces.map((piece) => (
            <li
              key={piece.slug}
              className="flex items-center gap-4 py-4 border-b border-ink/10"
            >
              <div className="relative w-12 aspect-[4/5] shrink-0 overflow-hidden border border-ink/10 bg-grey-100">
                {piece.image && (
                  <Image
                    src={piece.image.src}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display text-lg leading-snug truncate">{piece.title}</p>
                <p className="font-utility text-[11px] uppercase tracking-[0.1em] text-ink-soft/50">
                  {piece.artist}
                  {piece.sold ? " — Vendue" : ""}
                </p>
              </div>

              <Link
                href={`/admin/galerie/${piece.slug}`}
                className="font-utility text-[11px] uppercase tracking-[0.16em] text-ink-soft/70 hover:text-ink transition-colors"
              >
                Éditer
              </Link>

              <ConfirmDeleteButton onConfirm={deletePieceAction.bind(null, piece.slug)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
