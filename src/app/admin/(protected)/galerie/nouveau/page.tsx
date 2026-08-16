import type { Metadata } from "next";
import { getArtists } from "@/lib/gallery";
import PieceForm from "../PieceForm";

export const metadata: Metadata = { title: "Nouvelle œuvre" };

export default async function NewPiecePage() {
  const artists = await getArtists();

  return (
    <div>
      <h1 className="font-display text-3xl mb-10">Nouvelle œuvre</h1>
      <PieceForm artists={artists} />
    </div>
  );
}
