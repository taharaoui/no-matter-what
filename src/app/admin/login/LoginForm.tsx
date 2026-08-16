"use client";

import { useActionState } from "react";
import { signInAction } from "@/lib/auth/actions";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-6 w-full max-w-sm">
      <div>
        <label htmlFor="email" className={labelClass}>
          Courriel
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state.error && <p className="text-[0.9rem] text-red-700">{state.error}</p>}

      <button type="submit" disabled={isPending} className={`${buttonClass} self-start`}>
        {isPending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
