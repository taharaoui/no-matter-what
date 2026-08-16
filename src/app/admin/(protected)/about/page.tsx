import type { Metadata } from "next";
import { getAboutContent } from "@/lib/about";
import AboutForm from "./AboutForm";

export const metadata: Metadata = { title: "À propos" };

export default async function AdminAboutPage() {
  const content = await getAboutContent();

  return (
    <div>
      <h1 className="font-display text-3xl mb-10">À propos</h1>
      {content ? (
        <AboutForm content={content} />
      ) : (
        <p className="text-ink-soft/70">
          Impossible de charger le contenu — vérifiez la connexion Supabase.
        </p>
      )}
    </div>
  );
}
