"use client";

import { useState, type FormEvent } from "react";

/* No form backend is wired up yet (no inbox / CRM integration) — this only
   confirms the UI locally, same honesty as the footer newsletter form.
   Wire a real submit handler before launch. */
export default function GalerieContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-paper-light/80 leading-relaxed">
        Merci — votre message est noté. On vous répond sous peu.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm">
      <div>
        <label htmlFor="galerie-nom" className="sr-only">
          Nom
        </label>
        <input
          id="galerie-nom"
          name="nom"
          type="text"
          required
          placeholder="Nom"
          className="w-full bg-transparent border-b border-paper-light/30 pb-2 text-[0.95rem] text-paper-light placeholder:text-paper-light/40 focus:outline-none focus:border-paper-light"
        />
      </div>

      <div>
        <label htmlFor="galerie-courriel" className="sr-only">
          Courriel
        </label>
        <input
          id="galerie-courriel"
          name="courriel"
          type="email"
          required
          placeholder="Courriel"
          className="w-full bg-transparent border-b border-paper-light/30 pb-2 text-[0.95rem] text-paper-light placeholder:text-paper-light/40 focus:outline-none focus:border-paper-light"
        />
      </div>

      <div>
        <label htmlFor="galerie-message" className="sr-only">
          Message
        </label>
        <textarea
          id="galerie-message"
          name="message"
          required
          rows={4}
          placeholder="Une œuvre qui vous intéresse, une question — écrivez-nous"
          className="w-full resize-none bg-transparent border-b border-paper-light/30 pb-2 text-[0.95rem] text-paper-light placeholder:text-paper-light/40 focus:outline-none focus:border-paper-light"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center border border-paper-light/40 px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-paper-light hover:text-ink transition-colors w-fit"
      >
        Envoyer
      </button>
    </form>
  );
}
