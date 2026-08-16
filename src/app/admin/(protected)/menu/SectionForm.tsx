"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSectionAction, updateSectionAction } from "@/lib/menu/actions";
import type { MenuSectionRow } from "@/lib/menu";
import Field from "@/components/admin/Field";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { buttonClass, buttonGhostClass, inputClass } from "@/components/admin/formStyles";

const schema = z.object({
  id: z
    .string()
    .min(1, "Requis")
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets seulement"),
  title: z.string().min(1, "Requis"),
  intro: z.string(),
  coverSrc: z.string().min(1, "Requis — une photo de couverture est nécessaire"),
  coverAlt: z.string().min(1, "Requis"),
  sortOrder: z.string().regex(/^-?\d+$/, "Doit être un nombre entier"),
});

type FormValues = z.infer<typeof schema>;

function toFormValues(section?: MenuSectionRow): FormValues {
  return {
    id: section?.id ?? "",
    title: section?.title ?? "",
    intro: section?.intro ?? "",
    coverSrc: section?.cover_src ?? "",
    coverAlt: section?.cover_alt ?? "",
    sortOrder: String(section?.sort_order ?? 0),
  };
}

type SectionFormProps = { section?: MenuSectionRow };

export default function SectionForm({ section }: SectionFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(section);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(section),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const input = {
      id: values.id,
      title: values.title,
      intro: values.intro || null,
      cover_src: values.coverSrc,
      cover_alt: values.coverAlt,
      sort_order: Number(values.sortOrder),
    };
    const result = isEditing
      ? await updateSectionAction(section!.id, input)
      : await createSectionAction(input);

    if (result.error) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/menu");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Titre" htmlFor="title" error={errors.title?.message}>
          <input id="title" className={inputClass} {...register("title")} />
        </Field>
        <Field label="Identifiant" htmlFor="id" error={errors.id?.message}>
          <input id="id" className={inputClass} disabled={isEditing} {...register("id")} />
        </Field>
      </div>

      <Field label="Introduction (optionnel)" htmlFor="intro">
        <textarea id="intro" rows={2} className={`${inputClass} resize-none`} {...register("intro")} />
      </Field>

      <ImageUploadField
        label="Photo de couverture"
        value={watch("coverSrc")}
        onChange={(url) => setValue("coverSrc", url, { shouldDirty: true })}
        pathPrefix="menu"
      />
      {errors.coverSrc && <p className="text-[0.85rem] text-red-700">{errors.coverSrc.message}</p>}

      <Field label="Texte alternatif de la couverture" htmlFor="coverAlt" error={errors.coverAlt?.message}>
        <input id="coverAlt" className={inputClass} {...register("coverAlt")} />
      </Field>

      <Field label="Ordre" htmlFor="sortOrder">
        <input id="sortOrder" type="number" className={inputClass} {...register("sortOrder")} />
      </Field>

      {serverError && <p className="text-[0.9rem] text-red-700">{serverError}</p>}

      <div className="flex items-center gap-6">
        <button type="submit" disabled={isSubmitting} className={buttonClass}>
          {isSubmitting ? "Enregistrement…" : isEditing ? "Enregistrer" : "Créer la section"}
        </button>
        <button type="button" onClick={() => router.push("/admin/menu")} className={buttonGhostClass}>
          Annuler
        </button>
      </div>
    </form>
  );
}
