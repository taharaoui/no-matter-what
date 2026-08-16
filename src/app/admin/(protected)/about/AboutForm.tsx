"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateAboutContentAction } from "@/lib/about/actions";
import type { AboutContent } from "@/lib/about";
import Field from "@/components/admin/Field";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { buttonClass, inputClass } from "@/components/admin/formStyles";

const schema = z.object({
  manifestoQuote: z.string().min(1, "Requis"),
  storyEyebrow: z.string().min(1, "Requis"),
  storyHeading: z.string().min(1, "Requis"),
  storyHeadingAccent: z.string().min(1, "Requis"),
  storyParagraphs: z.string().min(1, "Requis"),
  storyPullquote: z.string().min(1, "Requis"),
  storyImage: z.string().min(1, "Requis"),
  whyNameHeading: z.string().min(1, "Requis"),
  whyNameHeadingAccent: z.string().min(1, "Requis"),
  whyNameParagraphs: z.string().min(1, "Requis"),
  closingText: z.string().min(1, "Requis"),
});

type FormValues = z.infer<typeof schema>;

/* storyParagraphs/whyNameParagraphs are text[] columns — edited here as
   one textarea per field, paragraphs separated by a blank line, rather
   than an add/remove-row UI for what's really just "the story, in a few
   paragraphs." Split back into an array on submit. */
function toFormValues(content: AboutContent): FormValues {
  return {
    manifestoQuote: content.manifestoQuote,
    storyEyebrow: content.storyEyebrow,
    storyHeading: content.storyHeading,
    storyHeadingAccent: content.storyHeadingAccent,
    storyParagraphs: content.storyParagraphs.join("\n\n"),
    storyPullquote: content.storyPullquote,
    storyImage: content.storyImage,
    whyNameHeading: content.whyNameHeading,
    whyNameHeadingAccent: content.whyNameHeadingAccent,
    whyNameParagraphs: content.whyNameParagraphs.join("\n\n"),
    closingText: content.closingText,
  };
}

function splitParagraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function AboutForm({ content }: { content: AboutContent }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(content),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    setSaved(false);
    const result = await updateAboutContentAction({
      manifestoQuote: values.manifestoQuote,
      storyEyebrow: values.storyEyebrow,
      storyHeading: values.storyHeading,
      storyHeadingAccent: values.storyHeadingAccent,
      storyParagraphs: splitParagraphs(values.storyParagraphs),
      storyPullquote: values.storyPullquote,
      storyImage: values.storyImage,
      whyNameHeading: values.whyNameHeading,
      whyNameHeadingAccent: values.whyNameHeadingAccent,
      whyNameParagraphs: splitParagraphs(values.whyNameParagraphs),
      closingText: values.closingText,
    });

    if (result.error) {
      setServerError(result.error);
      return;
    }
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 max-w-2xl">
      <Field label="Citation manifeste (section noire)" htmlFor="manifestoQuote" error={errors.manifestoQuote?.message}>
        <textarea id="manifestoQuote" rows={2} className={`${inputClass} resize-none`} {...register("manifestoQuote")} />
      </Field>

      <fieldset className="border-t border-ink/10 pt-8 flex flex-col gap-6">
        <legend className="font-display text-xl -mt-[3.25rem] bg-paper pr-4">L&apos;histoire de Julie</legend>

        <Field label="Sur-titre" htmlFor="storyEyebrow" error={errors.storyEyebrow?.message}>
          <input id="storyEyebrow" className={inputClass} {...register("storyEyebrow")} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Titre" htmlFor="storyHeading" error={errors.storyHeading?.message}>
            <input id="storyHeading" className={inputClass} {...register("storyHeading")} />
          </Field>
          <Field label="Titre (italique)" htmlFor="storyHeadingAccent" error={errors.storyHeadingAccent?.message}>
            <input id="storyHeadingAccent" className={inputClass} {...register("storyHeadingAccent")} />
          </Field>
        </div>

        <Field
          label="Paragraphes (séparer par une ligne vide)"
          htmlFor="storyParagraphs"
          error={errors.storyParagraphs?.message}
        >
          <textarea
            id="storyParagraphs"
            rows={10}
            className={`${inputClass} resize-none`}
            {...register("storyParagraphs")}
          />
        </Field>

        <Field label="Citation (encadré)" htmlFor="storyPullquote" error={errors.storyPullquote?.message}>
          <textarea id="storyPullquote" rows={2} className={`${inputClass} resize-none`} {...register("storyPullquote")} />
        </Field>

        <ImageUploadField
          label="Portrait"
          value={watch("storyImage")}
          onChange={(url) => setValue("storyImage", url, { shouldDirty: true })}
          pathPrefix="about"
        />
        {errors.storyImage && <p className="text-[0.85rem] text-red-700">{errors.storyImage.message}</p>}
      </fieldset>

      <fieldset className="border-t border-ink/10 pt-8 flex flex-col gap-6">
        <legend className="font-display text-xl -mt-[3.25rem] bg-paper pr-4">Pourquoi ce nom</legend>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Titre" htmlFor="whyNameHeading" error={errors.whyNameHeading?.message}>
            <input id="whyNameHeading" className={inputClass} {...register("whyNameHeading")} />
          </Field>
          <Field label="Titre (italique)" htmlFor="whyNameHeadingAccent" error={errors.whyNameHeadingAccent?.message}>
            <input id="whyNameHeadingAccent" className={inputClass} {...register("whyNameHeadingAccent")} />
          </Field>
        </div>

        <Field
          label="Paragraphes (séparer par une ligne vide)"
          htmlFor="whyNameParagraphs"
          error={errors.whyNameParagraphs?.message}
        >
          <textarea
            id="whyNameParagraphs"
            rows={8}
            className={`${inputClass} resize-none`}
            {...register("whyNameParagraphs")}
          />
        </Field>
      </fieldset>

      <Field label="Texte de fermeture (section noire finale)" htmlFor="closingText" error={errors.closingText?.message}>
        <textarea id="closingText" rows={3} className={`${inputClass} resize-none`} {...register("closingText")} />
      </Field>

      {serverError && <p className="text-[0.9rem] text-red-700">{serverError}</p>}
      {saved && !serverError && <p className="text-[0.9rem] text-ink-soft/70">Enregistré.</p>}

      <button type="submit" disabled={isSubmitting} className={`${buttonClass} self-start`}>
        {isSubmitting ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
