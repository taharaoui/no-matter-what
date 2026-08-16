"use client";

import { useEffect } from "react";
import Plate from "@/components/ui/Plate";

/* Defense-in-depth: getProducts/getProduct already catch fetch/API errors
   and degrade to []/null, so this only fires on a genuinely unexpected
   render-time error — it should never be the normal path to an empty page. */
export default function BoutiqueError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[boutique] render error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 pt-40 pb-24 md:pb-32 flex flex-col items-center text-center">
      <Plate tone="grey100" matted className="w-24 h-24 mb-10" />
      <h1 className="font-display text-2xl md:text-3xl leading-snug max-w-md">
        La boutique est momentanément indisponible.
      </h1>
      <p className="mt-4 max-w-sm text-ink-soft/70 leading-relaxed">
        Un problème est survenu en chargeant les articles. Réessayez, ou
        passez nous voir au comptoir en attendant.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
