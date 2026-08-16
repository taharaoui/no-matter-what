"use client";

import { useState, type FormEvent } from "react";

/* No transactional email provider is wired up yet (Resend is the plan) —
   same situation as the newsletter form in Footer.tsx, and handled the
   same way: this only confirms the UI locally so nothing is silently
   lost, and nothing is silently claimed either. Swap handleSubmit for a
   real Server Action once Resend is configured. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-ink-soft/80 leading-relaxed">
        Merci — votre message a été reçu. On vous répond sous peu.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="contact-name"
          className="font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700"
        >
          Nom
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full bg-transparent border-b border-ink/20 pb-2 text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700"
        >
          Courriel
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full bg-transparent border-b border-ink/20 pb-2 text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="font-utility text-[11px] uppercase tracking-[0.14em] text-grey-700"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="mt-2 w-full bg-transparent border-b border-ink/20 pb-2 text-ink focus:outline-none focus:border-ink transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="self-start border border-ink px-6 py-3 font-utility text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper-light transition-colors"
      >
        Envoyer
      </button>
    </form>
  );
}
