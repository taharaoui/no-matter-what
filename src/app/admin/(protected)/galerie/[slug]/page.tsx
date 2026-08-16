import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtists, getPieceRowBySlug } from "@/lib/gallery";
import PieceForm from "../PieceForm";

export const metadata: Metadata = { title: "Modifier l'œuvre" };

export default async function EditPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [piece, artists] = await Promise.all([getPieceRowBySlug(slug), getArtists()]);

  if (!piece) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl mb-10">{piece.title}</h1>
      <PieceForm piece={piece} artists={artists} />
    </div>
  );
}
