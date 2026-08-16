"use client";

import { useState, useTransition } from "react";

type ConfirmDeleteButtonProps = {
  onConfirm: () => Promise<{ error?: string } | void>;
  /** What's being deleted — filled into the confirm label. */
  label?: string;
  /** Extra warning shown once armed — e.g. cascade-delete side effects. */
  warning?: string;
};

/* Two-click confirm rather than a native confirm() popup — stays in the
   site's own visual register instead of a jarring browser dialog. Click
   once to arm, again within 4s to actually delete; arms back down on its
   own so a stray second click days later can't fire it. */
export default function ConfirmDeleteButton({
  onConfirm,
  label = "Supprimer",
  warning,
}: ConfirmDeleteButtonProps) {
  const [armed, setArmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function arm() {
    setArmed(true);
    setTimeout(() => setArmed(false), 4000);
  }

  function confirm() {
    setError(null);
    startTransition(async () => {
      const result = await onConfirm();
      if (result?.error) {
        setError(result.error);
        setArmed(false);
      }
    });
  }

  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={armed ? confirm : arm}
        disabled={isPending}
        className={`font-utility text-[11px] uppercase tracking-[0.16em] transition-colors disabled:opacity-40 ${
          armed ? "text-red-700 hover:text-red-800" : "text-ink-soft/70 hover:text-ink"
        }`}
      >
        {isPending ? "Suppression…" : armed ? "Confirmer ?" : label}
      </button>
      {armed && warning && (
        <span className="text-[0.8rem] text-red-700/80">{warning}</span>
      )}
      {error && <span className="text-[0.8rem] text-red-700">{error}</span>}
    </div>
  );
}
